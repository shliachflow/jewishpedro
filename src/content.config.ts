import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    formUrl: z.string().url().optional(),
    contactForm: z.boolean().optional(),
    // home page only
    start: z.array(z.object({ title: z.string(), text: z.string(), href: z.string() })).optional(),
    featured: z
      .array(z.object({ title: z.string(), text: z.string(), href: z.string(), image: z.string().optional() }))
      .optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    rsvpUrl: z.string().url().optional(),
  }),
});

export const collections = { pages, events };
