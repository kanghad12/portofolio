import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const informatika = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/informatika" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    duration: z.number().default(5), // reading duration in minutes
  }),
});

const risalah = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/risalah" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    duration: z.number().default(5),
  }),
});

const tutorial = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/tutorial" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    duration: z.number().default(5), // reading duration in minutes
  }),
});

export const collections = { informatika, risalah, tutorial };
