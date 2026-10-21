import { HebrewCalendar, Location, flags, HDate } from '@hebcal/core';
import { site } from './site';

export interface JewishItem { kind: 'candles' | 'havdalah' | 'parsha' | 'holiday' | 'roshchodesh' | 'fast'; text: string; time?: string }
export interface JewishDay { hebrew: string; hebrewMonth: string; hday: number; items: JewishItem[] }

const loc = new Location(site.location.latitude, site.location.longitude, false, site.timezone);
// Minor observances nobody needs on a community calendar.
const HIDE = /^(Chag HaBanot|Rosh Hashana LaBehemot|Pesach Sheni|Leil Selichot|Shushan Purim|Purim Katan|Tu B.Av)/;

const t12 = (s?: string) => { const m = s?.match(/^(\d{1,2}):(\d{2})/); if (!m) return s; const h = Number(m[1]); return `${h % 12 || 12}:${m[2]}${h >= 12 ? 'pm' : 'am'}`; };
const iso = (d: Date) => d.toISOString().slice(0, 10);
const keyOf = (g: Date) => `${g.getFullYear()}-${String(g.getMonth() + 1).padStart(2, '0')}-${String(g.getDate()).padStart(2, '0')}`;

// Everything Hebcal knows for [start, end] (local dates), keyed by YYYY-MM-DD.
export function jewishDays(start: Date, end: Date): Map<string, JewishDay> {
  const out = new Map<string, JewishDay>();
  const events = HebrewCalendar.calendar({
    start, end, location: loc, sedrot: true, candlelighting: true,
    candleLightingMins: -site.shabbos.candleLightingMinutes,
    havdalahMins: site.shabbos.havdalah.method === 'minutes' ? site.shabbos.havdalah.minutes : undefined,
    havdalahDeg: site.shabbos.havdalah.method === 'degrees' ? 8.5 : undefined,
    noModern: true, noSpecialShabbat: true, il: false,
  } as any);
  const day = (g: Date): JewishDay => {
    const k = keyOf(g);
    let d = out.get(k);
    if (!d) {
      const h = new HDate(g);
      d = { hebrew: `${h.getDate()} ${h.getMonthName()}`, hebrewMonth: h.getMonthName(), hday: h.getDate(), items: [] };
      out.set(k, d);
    }
    return d;
  };
  for (let g = new Date(start); g <= end; g.setDate(g.getDate() + 1)) day(new Date(g));
  for (const e of events) {
    const f = e.getFlags();
    const text = e.render('en');
    const g = e.getDate().greg();
    const d = day(g);
    if (f & flags.PARSHA_HASHAVUA) d.items.push({ kind: 'parsha', text });
    else if (/^Candle lighting/.test(text)) d.items.push({ kind: 'candles', text: 'Candle lighting', time: t12((e as any).eventTimeStr) });
    else if (/^Havdalah/.test(text)) d.items.push({ kind: 'havdalah', text: 'Havdalah', time: t12((e as any).eventTimeStr) });
    else if (f & flags.ROSH_CHODESH) d.items.push({ kind: 'roshchodesh', text });
    else if (f & flags.MINOR_FAST || f & flags.MAJOR_FAST) { if (!HIDE.test(text)) d.items.push({ kind: 'fast', text }); }
    else if (!HIDE.test(text)) d.items.push({ kind: 'holiday', text: text.replace(/ \d{4}$/, '') });
  }
  return out;
}

export const monthKey = (y: number, m0: number) => `${y}-${String(m0 + 1).padStart(2, '0')}`;

// Jewish-calendar data for a whole Gregorian month.
export function jewishMonth(y: number, m0: number) {
  return jewishDays(new Date(y, m0, 1), new Date(y, m0 + 1, 0));
}

// Hebrew month name(s) spanned by a Gregorian month, e.g. "Cheshvan – Kislev 5787".
export function hebrewSpan(y: number, m0: number): string {
  const a = new HDate(new Date(y, m0, 1)), b = new HDate(new Date(y, m0 + 1, 0));
  const yr = a.getFullYear() === b.getFullYear() ? ` ${a.getFullYear()}` : '';
  const A = a.getMonthName() + (yr ? '' : ` ${a.getFullYear()}`), B = b.getMonthName() + ` ${b.getFullYear()}`;
  return a.getMonthName() === b.getMonthName() ? `${B}` : `${A} – ${B}`;
}
export { iso };
