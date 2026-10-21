// Adds width/height (no layout shift) and lazy loading to images written in markdown (/images/...).
import { visit } from 'unist-util-visit';
import sharp from 'sharp';
import { existsSync } from 'node:fs';

export function rehypeImgSize({ base = '' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return async (tree) => {
    const jobs = [];
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      const src = node.properties?.src;
      if (typeof src !== 'string' || !src.startsWith(prefix + '/images/')) return;
      const file = 'public' + src.slice(prefix.length);
      if (!existsSync(file)) return;
      jobs.push(
        sharp(file).metadata().then((m) => {
          node.properties.width = m.width;
          node.properties.height = m.height;
          node.properties.loading = 'lazy';
          node.properties.decoding = 'async';
        }),
      );
    });
    await Promise.all(jobs);
  };
}
