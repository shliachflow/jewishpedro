import { HebrewCalendar } from '@hebcal/core';
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
