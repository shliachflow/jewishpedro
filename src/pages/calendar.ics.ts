import type { APIRoute } from 'astro';
import { getUpcomingEvents } from '../lib/events';
import { vcalendar } from '../lib/ics';
import { site, url } from '../lib/site';

export const GET: APIRoute = async () => {
  const events = (await getUpcomingEvents()).map((o) => ({ e: o.event, pageUrl: new URL(url(`/events/${o.event.id}`), site.deploy.site).href }));
  return new Response(vcalendar(events), { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
