# sign-age

Internal Nx plugin for WallRun workspace.

## Generator

Create a BrightSign player app scaffold that matches the repository's `apps/player-minimal` template contract:

```bash
pnpm nx g sign-age:player-app --name player-arrivals
pnpm nx g sign-age:player-app --name player-menu-board --displayOrientation landscape --noStatusPage
```

The existing compatibility wrapper remains available:

```bash
pnpm scaffold:player --name player-arrivals
```

## Building

Run `nx build sign-age` to build the library.

## Running unit tests

Run `nx test sign-age` to execute the unit tests via [Jest](https://jestjs.io).
