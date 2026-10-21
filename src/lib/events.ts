import { getCollection } from 'astro:content';
import { site } from './site';

// Today's date (YYYY-MM-DD) in the center's timezone, evaluated at build time.
export function today(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: site.timezone }).format(new Date());
}

// Upcoming events only, soonest first. Past events are dropped at build time.
export async function getUpcomingEvents() {
  const cutoff = today();
  const all = await getCollection('events');
  return all
    .filter((e) => e.data.date.toISOString().slice(0, 10) >= cutoff)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
