# AstroLimitless: pushing Astro to its limits

This project intends to test some of the most common project requests/requirements I get on most of my jobs that I had in the past and see if Astro can handle them gracefully.

Why I'm doing this? I'm just curious, that's all.

### List of requirements

- [x] Has React & TypeScript
- [x] Static pages: Fetch content from headless CMS at build time
- [x] Global state management shared between components without prop drilling
- [x] Custom theme (global)
- [x] Scoped css (e.g. .module.css)
- [ ] Incremental Static Regeneration (ISR)
- [ ] SSR rendered content that needs to be changed or updated from the client (e.g. using `@tanstack/query`)
- [x] User Authentication with multiple hidden pages
    - [x] Server-side rendered page
    - [x] Client-side rendered page
- [x] Localisation and internationalisation
- [x] Embedding Google Analytics and other tracking tools
- [ ] ❌ Design System in a Storybook
- [ ] Testing
    - [ ] Unit
    - [ ] Visual (snapshot)
- [x] Server API function (or action) where secret keys are used
- [ ] Deploy to custom Docker based environment

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |
