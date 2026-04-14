# Update Nx To 22.6.5

## Goal

Upgrade the workspace from Nx 22.6.3 to Nx 22.6.5 on a dedicated branch.

## Steps

1. Generate package updates and migrations with `pnpm exec nx migrate 22.6.5`.
2. Install the updated dependency graph.
3. Apply generated migrations with `pnpm exec nx migrate --run-migrations`.
4. Run targeted validation and capture any follow-up breakages.

## Validation

- `pnpm exec nx report`
- `pnpm nx affected --target=test --outputStyle=static`
- additional lint or build checks if migrations touch those areas
