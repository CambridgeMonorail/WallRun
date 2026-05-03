# shadcnui-signage Registry

Component registry for digital signage components optimized for distance readability and always-on displays.

## Usage

### Using the CLI (Recommended)

Add the registry to your `components.json`:

```json
{
  "registries": {
    "shadcnui-signage": "https://wallrun.dev/registry"
  }
}
```

Then install components:

```bash
npx shadcn add shadcnui-signage/metric-card
npx shadcn add shadcnui-signage/event-card
npx shadcn add shadcnui-signage/signage-container
```

### Manual Installation

All component source code is available in this repository. Copy the component files directly from:

`https://github.com/CambridgeMonorail/WallRun/tree/main/libs/shadcnui-signage/src/lib`

## Available Components

### Primitives

- **metric-card** - Display KPIs with values, change indicators, and icons
- **screen-frame** - Preview container with aspect ratio enforcement
- **event-card** - Event information with time, title, speaker, and track
- **announcement-card** - Announcements with glass morphism effects

### Layouts

- **split-screen** - Two-panel layout with configurable ratio
- **signage-container** - Full-screen container with gradient backgrounds
- **signage-header** - Standard header with optional tag and subtitle

### Blocks

- **fullscreen-hero** - Hero sections for welcome screens
- **info-card-grid** - Grid layout for informational cards

## Documentation

Full documentation and live examples:

- **Demo Site**: <https://wallrun.dev/>
- **Components**: <https://wallrun.dev/#/components>
- **Storybook**: <https://wallrun.dev/storybook/>

## Dependencies

Most components require:

- `lucide-react` for icons
- Tailwind CSS v4 for styling

## Philosophy

Following shadcn/ui principles, these are not npm packages - they're source code you copy and own. Modify them to fit your needs.

## Maintainers

If you are updating the published registry entries rather than consuming them, use the repository maintainer guide:

- [`docs/guides/registry-maintenance.md`](../../../../docs/guides/registry-maintenance.md)
