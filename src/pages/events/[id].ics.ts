import type { APIRoute } from 'astro';
import { getUpcomingEvents } from '../../lib/events';
import { vcalendar } from '../../lib/ics';
import { site, url } from '../../lib/site';

export async function getStaticPaths() {
  return (await getUpcomingEvents()).map((o) => ({ params: { id: o.event.id }, props: { event: o.event } }));
}
export const GET: APIRoute = ({ props }) =>
  new Response(vcalendar([{ e: props.event, pageUrl: new URL(url(`/events/${props.event.id}`), site.deploy.site).href }], props.event.data.title), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
