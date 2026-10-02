# ZielTakt Client Website Template

This is a client website template for ZielTakt, a web agency for local businesses in Germany/Switzerland. Every site built from this template must look like it was designed by a senior studio, never like a generic AI-generated landing page.

## Stack

- Astro, Tailwind CSS, TypeScript
- Deploy target: Cloudflare Pages
- Content lives in `src/content/business.yaml` per client — never hardcode client-specific text directly into components.

## Hard rules for all design and code

### Visual design

- Never use a purple-to-blue or pink-to-purple gradient as a default background or hero treatment.
- Never default to a centered hero with one blob-shaped gradient behind it — vary hero composition per client, use asymmetric layouts.
- Never repeat the generic "3-column card grid, icon + bold title + one paragraph" pattern more than once per page — vary section layouts.
- Never use glassmorphism or soft-shadow cards as the default style for every element — use it deliberately or not at all.
- Never use emoji as icons. Use a proper icon set (lucide-react or heroicons) or no icon.
- Never use stock illustration styles (undraw-style humans, generic flat vector people). Use real photography placeholders clearly marked `[CLIENT PHOTO NEEDED]` instead of inventing fake imagery.
- Every major page needs at least one layout element that breaks the standard centered-container grid (an asymmetric split, an overlapping element, a pulled-left/right block) — avoid the "everything is a centered 1200px column of stacked cards" look.

### Typography

- Typography must have real hierarchy: one distinctive display/heading font paired with one clean body font, with a clear size scale — not uniform text sizes throughout.
- Always self-host fonts (no Google Fonts CDN link) — download woff2 files into `src/styles/fonts/`.

### Copy

- Never write filler marketing copy ("revolutionize," "seamless," "cutting-edge," "unlock your potential"). Copy must be specific, local, and concrete — real services, real numbers, real area names.

### Code & architecture

- Always build pages as static HTML by default. Only use server rendering for a specific route that needs it, never for the whole site.
- Always include real schema.org JSON-LD (`LocalBusiness`) driven by a single content file (`src/content/business.yaml`), never hardcoded per page.
- Never hardcode client-specific text in components — read it from `src/content/business.yaml`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
