// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

import keystatic from '@keystatic/astro';

const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), keystatic()],
  adapter: isBuild ? cloudflare() : undefined
});