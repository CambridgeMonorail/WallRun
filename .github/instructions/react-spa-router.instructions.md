---
name: 'React SPA Router Patterns'
description: 'Conventions for client React SPA'
applyTo: 'apps/client/**/*.{ts,tsx}, libs/shell/**/*.{ts,tsx}, libs/landing/**/*.{ts,tsx}'
---

# React SPA Router Patterns

## React Router Conventions

- Use `createBrowserRouter` with route-based code splitting
- Define routes in `app/app.tsx` using `createRoutesFromElements`
- Protected routes wrapped with `<ProtectedRoute>` component
- Error boundaries at route level with `errorElement={<ErrorBoundary />}`
- Nested routes for layouts with `<Outlet />`

## Route Structure

```tsx
<Route element={<BaseLayout />}>
  <Route errorElement={<ErrorBoundary />}>
    <Route path="/" element={<LandingPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  </Route>
</Route>
```

## Error Boundary Patterns

- Use `<ErrorBoundary />` component from `app/shared`
- Catch errors at route level to prevent full app crashes
- Display user-friendly error messages with recovery options

## State Management

- React Context for authentication state (`AuthProvider`)
- React Query for server state and data fetching
- URL state for filters and pagination
- Local component state with `useState` for UI-only state
- Avoid global state for data that can be fetched on demand

## Feature Module Integration

- Shared components from libs: `@wallrun/shadcnui`, `@wallrun/shadcnui-blocks`, `@wallrun/shell`, `@wallrun/landing`
- Each module exports components with consistent API
- Use workspace imports for cross-library dependencies

## Link Behavior and Navigation

### Internal vs External Links

**Critical**: Never use `target="_blank"` for internal SPA routes. This breaks client-side routing and causes full page reloads.

**Internal links** (routes within the app):

- Paths starting with `/` (e.g., `/getting-started`, `/library`, `/gallery`)
- Should navigate within the SPA without opening new tabs
- Should NOT have `target="_blank"`

**External links** (outside the app):

- URLs starting with `http://` or `https://`
- Should open in new tabs with `target="_blank"` and `rel="noopener noreferrer"`
- Examples: GitHub, Storybook (hosted elsewhere), documentation sites

### Component Patterns

When building components that accept navigation links (headers, footers, navigation menus):

✅ **Correct - Smart link handling**:

```tsx
const isExternalUrl = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://');
};

{
  navigationLinks.map((link) => {
    const isExternal = isExternalUrl(link.url);
    return (
      <a
        href={link.url}
        {...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
      >
        {link.text}
      </a>
    );
  });
}
```

❌ **Avoid - Hard-coded target="\_blank" for all links**:

```tsx
{
  /* This breaks internal navigation */
}
<a href={link.url} target="_blank" rel="noopener noreferrer">
  {link.text}
</a>;
```

### Testing Link Behavior

When implementing navigation components:

1. ✅ Test internal routes (`/gallery`) stay in same tab
2. ✅ Test external links (GitHub, Storybook) open new tabs
3. ✅ Verify no full page reload for internal routes
4. ✅ Ensure `rel="noopener noreferrer"` on external links for security

## Do NOT

- Don't use `target="_blank"` on internal routes (routes starting with `/`)
- Don't hard-code `target="_blank"` on all links in shared components (detect internal vs external)
- Don't use `button + window.open()` for links (use `<a href>` instead)
