import { site } from './site';
import { addDays, type EventEntry } from './events';

const iso = (d: Date) => d.toISOString().slice(0, 10);
const compact = (s: string) => s.replace(/-/g, '');
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

// Pull "9:45am - 12:15pm" apart. No times found means an all-day event.
export function parseTimes(time?: string): { start: string; end: string } | null {
  if (!time) return null;
  const hits = [...time.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi)];
  if (!hits.length) return null;
  const hm = (m: RegExpMatchArray) => {
    let h = Number(m[1]) % 12;
    if (m[3].toLowerCase() === 'pm') h += 12;
    return h * 60 + Number(m[2] ?? 0);
  };
  const fmt = (min: number) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}${String(min % 60).padStart(2, '0')}00`;
  const a = hm(hits[0]);
  const b = hits[1] ? hm(hits[1]) : a + 60;
  return { start: fmt(a), end: fmt(b) };
}

// UTC offsets for the common US zones (US daylight-saving rules).
const ZONES: Record<string, [number, string, string]> = {
  'America/Los_Angeles': [-8, 'PST', 'PDT'], 'America/Denver': [-7, 'MST', 'MDT'],
  'America/Chicago': [-6, 'CST', 'CDT'], 'America/New_York': [-5, 'EST', 'EDT'],
};
const off = (h: number) => `${h < 0 ? '-' : '+'}${String(Math.abs(h)).padStart(2, '0')}00`;

function vtimezone(): string {
  const z = ZONES[site.timezone];
  if (!z) return '';
  const [h, std, dst] = z;
  return [
    'BEGIN:VTIMEZONE', `TZID:${site.timezone}`,
    'BEGIN:DAYLIGHT', `TZOFFSETFROM:${off(h)}`, `TZOFFSETTO:${off(h + 1)}`, `TZNAME:${dst}`, 'DTSTART:19700308T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU', 'END:DAYLIGHT',
    'BEGIN:STANDARD', `TZOFFSETFROM:${off(h + 1)}`, `TZOFFSETTO:${off(h)}`, `TZNAME:${std}`, 'DTSTART:19701101T020000', 'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU', 'END:STANDARD',
    'END:VTIMEZONE',
  ].join('\r\n');
}

const place = (e: EventEntry) => e.data.location ?? `${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.zip}`;
const plain = (body: string) => body.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/^[-*]\s+/gm, '• ').replace(/[#*_`>]/g, '').trim();

export function vevent(e: EventEntry, pageUrl: string): string {
  const d = e.data, first = iso(d.date), t = parseTimes(d.time);
  const lines = ['BEGIN:VEVENT', `UID:${e.id}@${new URL(site.deploy.site).host}${site.deploy.base}`, `DTSTAMP:${compact(iso(new Date()))}T000000Z`];
  if (t) {
    lines.push(`DTSTART;TZID=${site.timezone}:${compact(first)}T${t.start}`, `DTEND;TZID=${site.timezone}:${compact(first)}T${t.end}`);
  } else {
    lines.push(`DTSTART;VALUE=DATE:${compact(first)}`, `DTEND;VALUE=DATE:${compact(addDays(first, 1))}`);
  }
  if (d.repeat) {
    lines.push(`RRULE:FREQ=WEEKLY;INTERVAL=${d.repeat === 'weekly' ? 1 : 2}${d.until ? `;UNTIL=${compact(d.until)}${t ? 'T235959Z' : ''}` : ''}`);
    for (const s of d.skip) lines.push(t ? `EXDATE;TZID=${site.timezone}:${compact(s)}T${t.start}` : `EXDATE;VALUE=DATE:${compact(s)}`);
  }
  lines.push(`SUMMARY:${esc(d.title)}`, `LOCATION:${esc(place(e))}`, `URL:${pageUrl}`, `DESCRIPTION:${esc((plain(e.body ?? '') + '\n\n' + pageUrl).trim())}`, 'END:VEVENT');
  return lines.join('\r\n');
}

const fold = (s: string) => s.split('\r\n').map((l) => { const o: string[] = []; let r = l; while (r.length > 74) { o.push(r.slice(0, 74)); r = ' ' + r.slice(74); } o.push(r); return o.join('\r\n'); }).join('\r\n');

export function vcalendar(events: { e: EventEntry; pageUrl: string }[], name = site.name): string {
  return fold([
    'BEGIN:VCALENDAR', 'VERSION:2.0', `PRODID:-//${site.shortName}//Events//EN`, 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    `X-WR-CALNAME:${esc(name)}`, `X-WR-TIMEZONE:${site.timezone}`, vtimezone(),
    ...events.map(({ e, pageUrl }) => vevent(e, pageUrl)), 'END:VCALENDAR',
  ].filter(Boolean).join('\r\n')) + '\r\n';
}

export function googleLink(e: EventEntry, date: string, pageUrl: string): string {
  const t = parseTimes(e.data.time);
  const dates = t ? `${compact(date)}T${t.start}/${compact(date)}T${t.end}` : `${compact(date)}/${compact(addDays(date, 1))}`;
  const q = new URLSearchParams({ action: 'TEMPLATE', text: e.data.title, dates, ctz: site.timezone, location: place(e), details: pageUrl });
  return `https://calendar.google.com/calendar/render?${q}`;
}
