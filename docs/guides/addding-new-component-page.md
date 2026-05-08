# Adding a New Component Page to the Client Demo Site

The client demo site does **not** generate its component docs from Storybook or from the registry automatically. To make a new component discoverable at `http://localhost:4200/components`, you need to update the app-level docs wiring in `apps/client` explicitly.

## Files You Must Update

For a new component doc page, the current source of truth spans these files:

- `apps/client/src/app/pages/components/**` - the doc page implementation itself
- `apps/client/src/app/constants/navigationConfig.ts` - path definition, sidebar entry, and route registration
- `apps/client/src/app/pages/components/ComponentIndex.tsx` - overview cards and category counts on `/components`
- `apps/client/src/app/seo/routeSeo.ts` - route metadata for the doc page

If any of these are skipped, the component may exist in Storybook or the registry but still be missing from the live demo-site documentation.

## 1. Create the Doc Page

Add a new page under the correct category folder:

- `apps/client/src/app/pages/components/primitives/`
- `apps/client/src/app/pages/components/layouts/`
- `apps/client/src/app/pages/components/blocks/`
- `apps/client/src/app/pages/components/behaviour/`

Match the existing convention:

- file name: `ComponentNameDoc.tsx`
- export: `ComponentNameDocPage`

The page should usually include:

- category label and title
- short description
- “Built On” section based on the real implementation
- live example using the exported component
- install snippet using the registry item name
- manual install notes only for real extra dependencies
- usage snippet
- signage-specific considerations
- links to Storybook and source

## 2. Add the Path, Sidebar Entry, and Route

Update `apps/client/src/app/constants/navigationConfig.ts` in three places:

1. Import the new doc page component.
2. Add the new path under the correct `paths.components` category.
3. Add the sidebar item under the `Components` navigation group.
4. Register the route with `createRoute(...)`.

Example shape:

```typescript
import { ExampleComponentDocPage } from '../pages/components/primitives/ExampleComponentDoc';

const paths = {
  components: {
    primitives: {
      exampleComponent: '/components/primitives/example-component',
    },
  },
};

// sidebar item
{ title: 'ExampleComponent', url: paths.components.primitives.exampleComponent }

// route registration
createRoute(
  paths.components.primitives.exampleComponent,
  ExampleComponentDocPage,
)
```

## 3. Add the Overview Card on `/components`

Update `apps/client/src/app/pages/components/ComponentIndex.tsx` and add the new component to the top-level `components` array.

That single array controls:

- the card shown on `/components`
- the category grouping
- the visible per-category counts

If the component is missing here, the route can exist and still remain undiscoverable from the overview page.

## 4. Add the SEO Entry

Update `apps/client/src/app/seo/routeSeo.ts` with a `buildComponentDocEntry(...)` entry for the new route.

This keeps the route metadata, canonical path, and breadcrumb schema aligned with the live docs page.

## 5. Verify the Demo Site, Not Just Storybook

After wiring the page, verify both surfaces:

```bash
pnpm type-check:client
pnpm lint:client
```

Then check in the browser:

- `http://localhost:4200/components`
- the new client route, for example `http://localhost:4200/components/primitives/example-component`
- the matching Storybook docs page

Storybook coverage alone is not enough. The client demo site has its own navigation and routing layer.

## 6. Keep the Docs Honest

When writing or updating the doc page:

- describe only props and behavior exported from the real component
- match “Built On” claims to actual imports in the implementation
- list only real manual-install dependencies
- use the real registry item name in CLI snippets
- avoid hard-coded component counts anywhere except where derived from `ComponentIndex.tsx`

## Summary

To update the client demo site for a new component, wire the page through the doc component, `navigationConfig.ts`, `ComponentIndex.tsx`, and `routeSeo.ts`, then validate the actual `/components` experience in the browser. Storybook and registry entries are necessary, but they do not update the client demo site automatically.
