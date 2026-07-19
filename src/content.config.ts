import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    urlSlug: z.string(),
    category: z.enum(['residential', 'commercial', 'both']),
    shortDescription: z.string(),
    icon: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    benefits: z.array(z.string()),
    ctaLabel: z.string().default('Request an Estimate'),
    seoTitle: z.string(),
    metaDescription: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(['general', 'repair', 'installation', 'maintenance', 'financing', 'emergency']),
    order: z.number().default(99),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    location: z.string().optional(),
    serviceType: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const serviceAreas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/serviceAreas' }),
  schema: z.object({
    city: z.string(),
    county: z.enum(['Broward', 'Palm Beach']),
    published: z.boolean().default(true),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    category: z.enum(['residential', 'commercial', 'installation', 'repair', 'maintenance']),
    published: z.boolean().default(true),
  }),
});

export const collections = { services, faqs, testimonials, serviceAreas, gallery };
