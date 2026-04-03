# Player Minimal - BrightSign React Demo

A minimal, production-ready React 19 + Tailwind v4 application demonstrating modern web development on BrightSign digital signage players.

## What This Demonstrates

✅ **React 19** - Latest React with hooks and modern patterns  
✅ **Tailwind v4** - Modern utility-first CSS with oklch colors and @layer directives  
✅ **BrightSign Compatibility** - File-based deployment with Chrome 120 runtime  
✅ **Modern CSS** - Gradients, backdrop blur, animations, and responsive design  
✅ **Developer Experience** - Fast builds with Vite, hot reload during development

## Quick Start

### Development

```bash
# Run locally in your browser
pnpm nx serve player-minimal

# Open http://localhost:4200
```

### Deploy to BrightSign Player

```bash
# Build, package, and deploy in one command
pnpm deploy:player

# Or step by step
pnpm nx build player-minimal          # Build production bundle
pnpm nx run player-minimal:package    # Create deployment ZIP
pnpm nx run player-minimal:deploy-local # Upload to player via REST API

# Target a different player app from the root scripts
pnpm deploy:player -- --app player-minimal
```

## What's Running on the Player

- **React 19.0.0** - Modern component framework
- **Tailwind v4.1.18** - Utility-first CSS with modern features
- **Vite 7.1.3** - Lightning-fast build tool
- **BrightSign OS 9.1.92** - Chrome 120.0.6099.225 runtime

## Project Structure

```text
apps/player-minimal/
├── src/
│   ├── app/
│   │   └── app.tsx           # Main demo component
│   ├── main.tsx              # React entry point
│   └── styles.css            # Global styles + Tailwind imports
├── public/
│   └── autorun.brs           # BrightSign bootstrap script
├── vite.config.mts           # Vite + Tailwind v4 configuration
└── tailwind.config.js        # Tailwind customization
```

## Key Configuration

### Vite Config

The Vite configuration is optimized for BrightSign deployment:

```typescript
// vite.config.mts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Critical for Tailwind v4!
  ],
  build: {
    target: ['chrome120', 'es2022'],
    rollupOptions: {
      output: {
        format: 'iife', // Required for file:// URLs
        inlineDynamicImports: true,
      },
    },
  },
});
```

### BrightSign Bootstrap

The `autorun.brs` script configures the BrightSign player and launches your app with production-safe defaults:

```brightscript
' autorun.brs - Enables Chrome 120 with inspector disabled by default
sub Main()
    reg = CreateObject("roRegistrySection", "html")
    reg.Write("widget type", "chromium120")
  reg.Write("enable_web_inspector", "0")
    reg.Flush()

    config = {
        url: "file:///sd:/index.html"
        javascript_enabled: true
    }

    html = CreateObject("roHtmlWidget", rect, config)
    html.Show()
end sub
```

### Display Rotation Configuration

**Important:** `roHtmlWidget` has no API for rotation. Rotation must be done inside the HTML/CSS.

This app uses CSS-based rotation, the standard BrightSign technique for portrait displays:

**1. Configure orientation in `src/config.ts`:**

```typescript
export const playerConfig: PlayerConfig = {
  displayOrientation: 'portrait-left', // Change this value
  debug: false,
};
```

**Available orientations:**

- `'landscape'` - Horizontal display (no rotation) - default
- `'portrait-left'` - Display rotated 90° counterclockwise (most common)
- `'portrait-right'` - Display rotated 90° clockwise
- `'inverted'` - Display rotated 180° (upside down)

**2. The `DisplayRotation` component applies CSS transforms:**

```tsx
<DisplayRotation orientation="portrait-left">
  <App />
</DisplayRotation>
```

**3. CSS handles the rotation:**

```css
.display-rotation-wrapper[data-orientation='portrait-left'] {
  width: 100vh;
  height: 100vw;
  transform: rotate(-90deg);
  transform-origin: top left;
  top: 100vh;
}
```

After changing the orientation, rebuild and redeploy:

```bash
pnpm nx run player-minimal:deploy
```

## Demo Features

The demo page showcases:

- **Live Clock** - Updates every second using React hooks
- **Gradient Typography** - Modern text effects with Tailwind
- **Glass Morphism** - Backdrop blur and transparency effects
- **Card Grid** - Responsive layout with feature cards
- **Status Indicators** - Animated pulse effects
- **System Info** - Build version and deployment metadata

## Development Tips

### Hot Reload During Development

Instead of deploying to the player every change, run a local dev server:

```bash
pnpm nx serve player-minimal
```

Then update `autorun.brs` to point to your dev machine:

```brightscript
config = {
    url: "http://YOUR_IP:4200"  ' Replace with your machine's IP
}
```

The player will load from your dev server with hot reload!

### App-Specific Packaging

The packaging and deploy scripts can now target a specific player app:

```bash
pnpm package:player -- --app player-minimal
pnpm deploy:local -- --app player-minimal
pnpm deploy:player -- --app player-minimal --player dev-player
```

Nx targets are also available on each player app scaffold:

```bash
pnpm nx run player-minimal:package
pnpm nx run player-minimal:deploy-local
pnpm nx run player-minimal:deploy
```

### Scaffolding New Player Apps

Use either scaffold entry point to create a new BrightSign player app from this template contract:

```bash
pnpm scaffold:player --name player-menu-board
pnpm nx g sign-age:player-app --name player-menu-board
```

Use `pnpm scaffold:player` when you want the existing script entry point. Use `pnpm nx g sign-age:player-app` when you want native Nx generator workflows.

### Debugging

- **Production bootstrap**: Inspector is disabled by default
- **Development bootstrap**: Use `tools/brightsign-test-files/autorun-dev.brs` or `pnpm deploy:dev-mode` for DevTools access on port 2999
- **Player Web UI**: [https://192.168.0.62/](https://192.168.0.62/) (Local DWS)

### Common Issues

#### Black Screen

- Check Chrome 120 is enabled in autorun.brs
- Verify `@tailwindcss/vite` plugin is loaded
- If using dev-mode bootstrap, check the Web Inspector console for errors

#### Tailwind Classes Not Rendering

- Ensure `@tailwindcss/vite` plugin is in vite.config.mts
- Verify `@import 'tailwindcss';` is in styles.css
- Check build output for app.css file

#### File Upload Fails

- Use HTTPS port 443, not HTTP port 80
- Verify player credentials in `.brightsign/players.json`
- Check player is not BSN-registered

## Learn More

- [BrightSign Deployment Guide](../../docs/guides/brightsign-deployment.md)
- [Tailwind v4 Solution](../../docs/troubleshooting/brightsign-tailwind-v4-solution.md)
- [React Deployment Findings](../../docs/troubleshooting/brightsign-react-deployment-findings.md)
- [BrightSign HTML Widget Docs](https://docs.brightsign.biz/developers/htmlwidget)

## Tech Stack

| Technology    | Version        | Purpose               |
| ------------- | -------------- | --------------------- |
| React         | 19.0.0         | UI framework          |
| Tailwind CSS  | 4.1.18         | Utility-first styling |
| Vite          | 7.1.3          | Build tool            |
| TypeScript    | 5.9.3          | Type safety           |
| BrightSign OS | 9.1.92         | Target platform       |
| Chrome        | 120.0.6099.225 | Browser engine        |

## License

Part of WallRun monorepo. See root LICENSE for details.
