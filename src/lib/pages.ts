import { getCollection } from 'astro:content';
import { today } from './events';

// Pages that are drafts, or past their "expires" date, are not published.
export async function getLivePages() {
  const cutoff = today();
  const pages = await getCollection('pages');
  return pages.filter((p) => !p.data.draft && !(p.data.expires && p.data.expires < cutoff));
}
