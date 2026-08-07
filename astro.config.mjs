// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://davanlyst.dev',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});