import { HebrewCalendar, Location, flags } from '@hebcal/core';
import { site } from './site';
import holidays from '../data/holidays.json';
import { getUpcomingEvents, today, addDays } from './events';

const ymd = (g: Date) => `${g.getFullYear()}-${String(g.getMonth() + 1).padStart(2, '0')}-${String(g.getDate()).padStart(2, '0')}`;
const fmt = (s: string, withYear = false) => new Date(`${s}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', ...(withYear ? { year: 'numeric' } : {}), timeZone: 'UTC' });

export type HolidayRow = (typeof holidays)[number] & { range: string; first: string; offers: Awaited<ReturnType<typeof getUpcomingEvents>> };

// Next occurrence of every holiday, calculated from the Hebrew calendar (nothing to maintain),
// plus any upcoming events tagged `holiday: <key>`.
export async function getHolidayRows(): Promise<HolidayRow[]> {
  const t = today();
  const evs = HebrewCalendar.calendar({ start: new Date(`${t}T12:00:00`), end: new Date(`${addDays(t, 800)}T12:00:00`), noModern: true, noRoshChodesh: true, noSpecialShabbat: true, sedrot: false } as any)
    .map((e) => ({ desc: e.getDesc(), date: ymd(e.getDate().greg()) }));
  const upcoming = await getUpcomingEvents();
  return holidays.map((h) => {
    const endOf = (d: string) => evs.find((e) => e.date >= d && new RegExp(h.ends).test(e.desc) && e.date <= addDays(d, 10));
    const start = evs.filter((e) => new RegExp(h.starts).test(e.desc)).find((s) => (endOf(s.date)?.date ?? s.date) >= t);
    const first = start?.date ?? '';
    const last = first ? endOf(first)?.date ?? first : '';
    const begin = first && h.eveBefore ? addDays(first, -1) : first;
    const range = !first ? '' : begin === last ? fmt(last, true) : `${fmt(begin)} (evening) – ${fmt(last, true)}`;
    return { ...h, range, first, offers: upcoming.filter((o) => o.event.data.holiday === h.key) };
  }).sort((a, b) => a.first.localeCompare(b.first));
}

// Chanukah: which night falls on which date, and the Friday candle-lighting time (before Shabbat).
export function chanukahNights(first: string) {
  if (!first) return [];
  const g = (s: string) => new Date(`${s}T12:00:00`);
  const loc = new Location(site.location.latitude, site.location.longitude, false, site.timezone);
  const evs = HebrewCalendar.calendar({ start: g(first), end: g(addDays(first, 8)), location: loc, candlelighting: true, candleLightingMins: -site.shabbos.candleLightingMinutes, noModern: true, noRoshChodesh: true } as any)
    .filter((e) => e.getFlags() & flags.CHANUKAH_CANDLES);
  return evs.map((e, i) => {
    const date = ymd(e.getDate().greg());
    const dow = new Date(`${date}T12:00:00Z`).getUTCDay();
    const t12 = (e as any).eventTimeStr?.replace(/^(\d{1,2}):(\d{2})$/, (_: string, h: string, m: string) => `${Number(h) % 12 || 12}:${m}${Number(h) >= 12 ? 'pm' : 'am'}`);
    return { night: i + 1, date, label: dow === 5 ? `Light before Shabbat candles, ${t12}` : dow === 6 ? 'Light after Shabbat ends' : 'Light after nightfall' };
  });
}
