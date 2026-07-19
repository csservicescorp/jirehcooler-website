import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jirehcooler.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
