# Safe Layout Implementation Examples

CSS utilities and React components for applying the safe layout constraints described in [SKILL.md](../SKILL.md).

## Safe Frame CSS Utility

Apply to any full-screen signage container to enforce the 5% safe margin:

```css
.safe-frame {
  padding: 5%;
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
}

/* Tighter utility for inner zones that already sit inside a safe frame */
.safe-frame-inner {
  padding: 2%;
  box-sizing: border-box;
}
```

## Full-Screen Signage Shell

A minimal CSS Grid shell that fills the viewport using resolution-independent units:

```css
.signage-shell {
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100dvh;
  padding: 5%;
  box-sizing: border-box;
  overflow: hidden;
}

/* Portrait reflow: stack zones vertically with equal spacing */
@media (orientation: portrait) {
  .signage-shell {
    grid-template-rows: auto 1fr 1fr auto;
  }
}
```

## Development Safe-Frame Overlay

A React component that renders the 5% safe frame boundary during development.
Add it to your root layout and remove before deployment.

```tsx
function SafeFrameOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {/* Safe margin boundary */}
      <div
        style={{
          position: 'absolute',
          inset: '5%',
          border: '2px dashed rgba(255, 0, 0, 0.5)',
        }}
      />
      {/* Corner labels */}
      <span
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          fontSize: '12px',
          color: 'rgba(255, 0, 0, 0.7)',
          fontFamily: 'monospace',
        }}
      >
        SAFE FRAME (5%)
      </span>
    </div>
  );
}
```

Usage during development:

```tsx
function SignageApp() {
  return (
    <div className="signage-shell">
      {import.meta.env.DEV && <SafeFrameOverlay />}
      <header>{/* header zone */}</header>
      <main>{/* primary content */}</main>
      <footer>{/* footer zone */}</footer>
    </div>
  );
}
```
