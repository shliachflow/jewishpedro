import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { remarkBase } from './src/lib/remark-base.mjs';
import { rehypeImgSize } from './src/lib/rehype-img-size.mjs';

const config = JSON.parse(readFileSync(new URL('./site.config.json', import.meta.url), 'utf-8'));

export default defineConfig({
  site: config.deploy.site,
  base: config.deploy.base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [[remarkBase, { base: config.deploy.base }]],
    rehypePlugins: [[rehypeImgSize, { base: config.deploy.base }]],
  },
});
