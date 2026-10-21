import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from './site';

export type EventEntry = CollectionEntry<'events'>;
export interface Occurrence { event: EventEntry; date: string }

// Today's date (YYYY-MM-DD) in the center's timezone, evaluated at build time.
export function today(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: site.timezone }).format(new Date());
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
export const addDays = (s: string, n: number) => iso(new Date(new Date(`${s}T00:00:00Z`).getTime() + n * 864e5));

// How far ahead we expand recurring events.
export function horizon(): string {
  const d = new Date(`${today()}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + site.calendar.horizonMonths + 1);
  return iso(d);
}

// Every date an event happens on, from `from` to `to` (inclusive).
export function occurrences(e: EventEntry, from: string, to: string): string[] {
  const first = iso(e.data.date);
  if (!e.data.repeat) return first >= from && first <= to ? [first] : [];
  const step = e.data.repeat === 'weekly' ? 7 : 14;
  const last = e.data.until && e.data.until < to ? e.data.until : to;
  const skip = new Set(e.data.skip);
  const out: string[] = [];
  for (let d = first; d <= last; d = addDays(d, step)) if (d >= from && !skip.has(d)) out.push(d);
  return out;
}

export async function getAllEvents(): Promise<EventEntry[]> {
  return getCollection('events');
}

// Every dated occurrence in [from, to], soonest first.
export async function getOccurrences(from = today(), to = horizon()): Promise<Occurrence[]> {
  const all = await getAllEvents();
  return all
    .flatMap((event) => occurrences(event, from, to).map((date) => ({ event, date })))
    .sort((a, b) => a.date.localeCompare(b.date) || a.event.id.localeCompare(b.event.id));
}

// Events still on the calendar, one row per event (a series shows once, at its next date).
export async function getUpcomingEvents(): Promise<Occurrence[]> {
  const seen = new Set<string>();
  return (await getOccurrences()).filter((o) => (seen.has(o.event.id) ? false : seen.add(o.event.id)));
}

export function formatDate(s: string): string {
  return new Date(`${s}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function repeatLabel(e: EventEntry): string {
  const day = new Date(`${iso(e.data.date)}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  return e.data.repeat === 'weekly' ? `Every ${day}` : e.data.repeat === 'biweekly' ? `Every other ${day}` : '';
}
