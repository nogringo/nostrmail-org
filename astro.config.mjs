import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nostrmail.org',
  integrations: [sitemap()],
  // Astro 7 defaults to 'jsx', which drops the spaces between inline elements.
  compressHTML: true,
  markdown: {
    smartypants: false,
  },
});
