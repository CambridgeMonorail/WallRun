# common-tailwind

Shared Tailwind v4 configuration and shadcn theme tokens for WallRun.

This package is intentionally generic and signage-safe. It may be consumed by
digital signage player apps and reusable signage libraries, so it must not carry
the WallRun demo website branding from `apps/client`.

Design contract:

- [DESIGN.md](./DESIGN.md)

App-specific brands should override shared tokens in the app stylesheet.
For example, the WallRun demo website applies its brand in
`apps/client/src/styles.css` and documents that scope in `apps/client/DESIGN.md`.

## Running unit tests

Run `nx test common-tailwind` to execute the unit tests via [Vitest](https://vitest.dev/).
