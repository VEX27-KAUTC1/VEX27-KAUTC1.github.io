import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({
    extend: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      member: z.string().optional(),
      robot: z.string().optional(),
      department: z.string().optional(),
    }),
  }) }),
};
