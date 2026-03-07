# BrightSign Display Rotation Guide

## The Problem

BrightSign players have **no API for rotating HTML widget content** at the BrightScript level. The `roHtmlWidget` object does not support a `transform` parameter.

**What doesn't work:**
```brightscript
' ❌ This parameter does not exist and will cause crashes
config = {
    url: "file:///sd:/index.html"
    transform: "90"  ' INVALID - causes boot loop
}
```

## The Solution

Use **CSS transforms inside your React app** to rotate the content. This is the standard BrightSign technique for portrait displays.

### Quick Start

**1. Configure display orientation** in `apps/player-minimal/src/config.ts`:

```typescript
export const playerConfig: PlayerConfig = {
  displayOrientation: 'portrait-left',  // ← Change this
  debug: false,
};
```

**2. Rebuild and redeploy:**

```bash
pnpm deploy:player
```

That's it! The `DisplayRotation` component automatically applies the correct CSS rotation.

---

## Available Orientations

| Value | Description | Use When |
|-------|-------------|----------|
| `'landscape'` | No rotation (default) | Horizontal displays |
| `'portrait-left'` | 90° CCW rotation | Display rotated left (**most common**) |
| `'portrait-right'` | 90° CW rotation | Display rotated right |
| `'inverted'` | 180° rotation | Upside-down displays |

---

## How It Works

### 1. Configuration File

`src/config.ts` defines the display orientation:

```typescript
export type DisplayOrientation = 'landscape' | 'portrait-left' | 'portrait-right' | 'inverted';

export const playerConfig: PlayerConfig = {
  displayOrientation: 'portrait-left',
  debug: false,
};
```

### 2. DisplayRotation Component

`src/components/DisplayRotation.tsx` wraps your app:

```tsx
export const DisplayRotation: FC<DisplayRotationProps> = ({ 
  children, 
  orientation = playerConfig.displayOrientation 
}) => {
  if (orientation === 'landscape') {
    return <>{children}</>;
  }

  return (
    <div className="display-rotation-wrapper" data-orientation={orientation}>
      {children}
    </div>
  );
};
```

### 3. CSS Transforms

`src/styles.css` applies the rotation:

```css
/* Portrait Left - Display rotated 90° counterclockwise */
.display-rotation-wrapper[data-orientation='portrait-left'] {
  position: absolute;
  width: 100vh;
  height: 100vw;
  transform: rotate(-90deg);
  transform-origin: top left;
  top: 100vh;
  left: 0;
}
```

**Why this works:**
- The wrapper swaps width/height (`100vh` × `100vw`)
- CSS `transform: rotate(-90deg)` rotates the content
- `transform-origin: top left` sets the rotation pivot point
- Positioning (`top: 100vh`) compensates for the rotation

### 4. React Entry Point

`src/main.tsx` wraps your app:

```tsx
root.render(
  <StrictMode>
    <DisplayRotation>
      <App />
    </DisplayRotation>
  </StrictMode>
);
```

---

## Alternative: Video Mode Rotation

You can also rotate at the **hardware output level** using `roVideoMode`:

```brightscript
vm = CreateObject("roVideoMode")
vm.SetMode("1920x1080x60p:90")  ' or :270
```

**Pros:**
- Rotates everything (not just HTML)
- No CSS needed

**Cons:**
- Requires player reboot when changed
- Less flexible than CSS
- Not all display modes support rotation
- Rotates **all** zones (video, graphics, etc.)

**When to use:**
- Multi-zone layouts with video players
- Content from multiple sources
- Hardware rotation is required

**Most signage apps use CSS rotation** because it's simpler and doesn't require reboots.

---

## Developer Experience

### During Development

Run locally and test different orientations:

```bash
pnpm nx serve player-minimal
```

Change `displayOrientation` in `config.ts` and hot reload will apply the rotation instantly.

### For Production

1. Set the correct orientation in `config.ts`
2. Build and deploy: `pnpm deploy:player`
3. Player reboots with correct rotation

### Testing Multiple Orientations

Use the `orientation` prop to override config:

```tsx
<DisplayRotation orientation="portrait-right">
  <App />
</DisplayRotation>
```

---

## Best Practices

### ✅ Do

- Configure orientation once in `config.ts`
- Use `portrait-left` for most portrait displays (90° CCW rotation)
- Test rotation during local development
- Document which orientation your signage uses

### ❌ Don't

- Add rotation parameters to `autorun.brs` (they don't exist)
- Use `roVideoMode` rotation unless you need multi-zone rotation
- Rotate individual components (rotate once at the root)
- Use inline transforms in your app code

---

## Troubleshooting

### Content Still Appears Sideways

1. **Check config.ts** - Verify `displayOrientation` is set
2. **Rebuild** - Run `pnpm nx build player-minimal`
3. **Clear cache** - Run `pnpm nx build player-minimal --skip-nx-cache`
4. **Try opposite orientation** - Switch `portrait-left` ↔ `portrait-right`

### Boot Loop After Deployment

This was caused by adding invalid `transform` parameter to `roHtmlWidget` config. The fix:

1. Power cycle the player
2. Re-provision if needed
3. Deploy corrected version (without transform in autorun.brs)

### Rotation Doesn't Apply

1. **Check DisplayRotation is imported** in `main.tsx`
2. **Verify CSS** is loaded (check network tab in Web Inspector)
3. **Check wrapper element** exists in DOM (inspect at http://player-ip:2999)

---

## Learn More

- [BrightSign HTML Widget Docs](https://docs.brightsign.biz/developers/htmlwidget)
- [roVideoMode API Reference](https://docs.brightsign.biz/developers/brightscript/object-reference/presentation-and-widget-objects/rovideomode)
- [CSS Transforms on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

---

## History

**2026-03-07:** Incorrect `transform` parameter added to `roHtmlWidget` config, causing boot loop. Resolved by implementing proper CSS-based rotation in React app.

**Root cause:** The `roHtmlWidget` API has no rotation parameter. Rotation must be done via CSS transforms or `roVideoMode` hardware rotation.

**Solution:** Created `DisplayRotation` component with configurable CSS-based rotation, following standard BrightSign best practices.
