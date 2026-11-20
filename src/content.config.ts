import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// An empty frontmatter line like `summary:` is parsed as null – treat it as "not set".
const orUnset = <T extends z.ZodTypeAny>(schema: T) => z.preprocess((v) => (v === null ? undefined : v), schema);

const md = (name: string) => glob({ pattern: '**/*.md', base: `./src/content/${name}` });

export const collections = {
  knowledge: defineCollection({
    loader: md('knowledge'),
    schema: z.object({
      title: z.string(),
      summary: orUnset(z.string().default('')),
      topic: orUnset(z.string().default('Dev')),
      tags: orUnset(z.array(z.string()).default([])),
      created: z.coerce.date(), // set by the sync from the note's frontmatter or file dates
      updated: z.coerce.date(),
    }),
  }),
  talks: defineCollection({
    loader: md('talks'),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      event: orUnset(z.string().default('')),
      slidesUrl: orUnset(z.string().url().optional()),
      videoUrl: orUnset(z.string().url().optional()),
    }),
  }),
  recommendations: defineCollection({
    loader: md('recommendations'),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(), // required: when this was recommended
      kind: orUnset(z.enum(['book', 'video', 'event', 'tool']).default('book')),
      url: orUnset(z.string().url().optional()),
      image: orUnset(z.string().url().optional()), // optional preview image; YouTube video links get one automatically
      why: orUnset(z.string().default('')),
    }),
  }),
  projects: defineCollection({
    loader: md('projects'),
    schema: z.object({
      title: z.string(),
      summary: orUnset(z.string().default('')),
      url: orUnset(z.string().url().optional()),
      status: orUnset(z.string().default('')),
    }),
  }),
};
