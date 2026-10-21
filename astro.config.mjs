import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { remarkBase } from './src/lib/remark-base.mjs';

const config = JSON.parse(readFileSync(new URL('./site.config.json', import.meta.url), 'utf-8'));

export default defineConfig({
  site: config.deploy.site,
  base: config.deploy.base,
  trailingSlash: 'always',
  markdown: { remarkPlugins: [[remarkBase, { base: config.deploy.base }]] },
});
