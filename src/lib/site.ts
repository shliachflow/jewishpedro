import config from '../../site.config.json';

export const site = config;

// Prefix a root-relative path with the deploy base (e.g. "/events" -> "/jewishpedro/events/").
export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(clean);
  return base + clean + (isFile || clean.endsWith('/') ? '' : '/');
}
