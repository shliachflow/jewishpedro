import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// YAML turns an unquoted 2027-03-22 into a Date; accept that (date only, no time) or a YYYY-MM-DD string.
const dateStr = z.preprocess(
  (v) => (v instanceof Date ? (v.getTime() % 86400000 === 0 ? v.toISOString().slice(0, 10) : 'has-a-time') : v),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a date like 2027-03-22 (YYYY-MM-DD), without a time')
    .refine((s) => new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) === s, 'That is not a real calendar date'),
);
const imagePath = z
  .string()
  .refine((p) => /^(https?:|\/)/.test(p), 'Start the image path with / (for example /images/photo.jpg)')
  .refine((p) => /^https?:/.test(p) || existsSync(join('public', p)), (p) => ({ message: `Image not found in public/: ${p}` }));

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().optional(),
      image: imagePath.optional(),
      formUrl: z.string().url().optional(),
      contactForm: z.boolean().optional(),
      layout: z.enum(['index', 'faq']).optional(),
      draft: z.boolean().optional(),
      expires: dateStr.optional(),
      // home page only
      accent: z.string().optional(),
      heroImage: imagePath.optional(),
      heroImageMobile: imagePath.optional(),
      heroAlt: z.string().optional(),
      heroFocus: z.string().optional(),
      heroFocusMobile: z.string().optional(),
      visitPhoto: imagePath.optional(),
      visitAlt: z.string().optional(),
      communityPhoto: imagePath.optional(),
      communityAlt: z.string().optional(),
      peoplePhoto: imagePath.optional(),
      peoplePhotoAlt: z.string().optional(),
      mission: z.string().optional(),
      people: z.array(z.object({ name: z.string(), role: z.string() }).strict()).optional(),
      feature: z
        .object({ title: z.string(), text: z.string(), href: z.string(), image: imagePath, alt: z.string() })
        .strict()
        .optional(),
      featured: z
        .array(z.object({ title: z.string(), text: z.string(), href: z.string(), image: imagePath.optional(), alt: z.string().optional() }).strict())
        .optional(),
    })
    .strict(),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z
    .object({
      title: z.string(),
      date: dateStr.transform((s) => new Date(`${s}T00:00:00Z`)),
      time: z.string().optional(),
      location: z.string().optional(),
      image: imagePath.optional(),
      rsvpUrl: z.string().url().optional(),
    })
    .strict(),
});

export const collections = { pages, events };
