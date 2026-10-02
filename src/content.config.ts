import { defineCollection, type CollectionEntry } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/**
 * All client-specific content lives in src/content/business.yaml under a single
 * top-level `business:` key. Read it with `getEntry("site", "business")`.
 */

const link = z.object({ label: z.string(), href: z.string() });
const fact = z.object({ value: z.string(), label: z.string() });

const site = defineCollection({
	loader: file("src/content/business.yaml"),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			/** BCP 47, e.g. "de-CH", "de", "ar". */
			lang: z.string().default("de"),
			/** schema.org type: LocalBusiness or a subtype like Plumber, Electrician, Dentist. */
			schemaType: z.string().default("LocalBusiness"),
			seo: z.object({ title: z.string(), description: z.string() }),

			phone: z.object({ display: z.string(), href: z.string() }),
			email: z.string().optional(),
			address: z.object({
				street: z.string(),
				postalCode: z.string(),
				city: z.string(),
				region: z.string().optional(),
				/** ISO 3166-1 alpha-2, e.g. "CH", "DE". */
				country: z.string(),
			}),
			geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
			mapsUrl: z.string().optional(),
			areaServed: z.array(z.string()).default([]),
			openingHours: z
				.array(
					z.object({
						/** Display label, e.g. "Mo–Fr". */
						days: z.string(),
						/** schema.org day names, e.g. ["Monday", "Tuesday"]. */
						dayOfWeek: z.array(z.string()),
						opens: z.string(),
						closes: z.string(),
					}),
				)
				.default([]),
			priceRange: z.string().optional(),
			foundingYear: z.number().optional(),
			social: z.array(link).default([]),

			nav: z.object({ links: z.array(link), cta: link }),

			hero: z.object({
				eyebrow: z.string().optional(),
				headline: z.string(),
				lede: z.string().optional(),
				cta: link,
				secondaryCta: link.optional(),
				facts: z.array(fact).default([]),
				image: image().optional(),
				imageAlt: z.string().optional(),
				imageBrief: z.string().optional(),
				badge: fact.optional(),
			}),

			services: z.object({
				eyebrow: z.string().optional(),
				heading: z.string(),
				intro: z.string().optional(),
				items: z
					.array(
						z.object({
							title: z.string(),
							summary: z.string(),
							includes: z.array(z.string()).optional(),
							price: z.string().optional(),
							duration: z.string().optional(),
							href: z.string().optional(),
							image: image().optional(),
							imageAlt: z.string().optional(),
							imageBrief: z.string().optional(),
						}),
					)
					.min(1),
			}),

			testimonials: z
				.object({
					heading: z.string(),
					rating: z
						.object({ value: z.string(), scale: z.string().optional(), label: z.string(), href: z.string().optional() })
						.optional(),
					items: z.array(z.object({ quote: z.string(), name: z.string(), context: z.string().optional() })).min(1),
				})
				.optional(),

			pricing: z
				.object({
					eyebrow: z.string().optional(),
					heading: z.string(),
					intro: z.string().optional(),
					note: z.string().optional(),
					cta: link.optional(),
					groups: z.array(
						z.object({
							title: z.string().optional(),
							items: z.array(z.object({ name: z.string(), detail: z.string().optional(), price: z.string() })),
						}),
					),
				})
				.optional(),

			faq: z
				.object({
					eyebrow: z.string().optional(),
					heading: z.string(),
					aside: z.object({ text: z.string(), cta: link }).optional(),
					items: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
				})
				.optional(),

			contact: z.object({
				eyebrow: z.string().optional(),
				heading: z.string(),
				intro: z.string().optional(),
				note: z.string().optional(),
				formAction: z.string(),
				/** Options for "Worum geht es?" — defaults to the service titles. */
				services: z.array(z.string()).optional(),
			}),

			footer: z.object({
				claim: z.string().optional(),
				hoursSummary: z.string().optional(),
				credit: link.optional(),
			}),

			privacyHref: z.string(),
			legal: z.array(link),

			consent: z
				.object({
					version: z.string().default("1"),
					settingsLabel: z.string().default("Cookie-Einstellungen"),
					categories: z.array(z.object({ id: z.string(), label: z.string(), description: z.string() })).default([]),
				})
				.optional(),
		}),
});

export const collections = { site };

export type Business = CollectionEntry<"site">["data"];
