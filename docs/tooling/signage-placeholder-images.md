# Signage Placeholder Images

Use this guide when a screen needs image zones before final creative assets are ready.

The goal is not to generate artwork. The goal is to give Copilot enough structure to make placeholder usage predictable across the repo: consistent dimensions, clear names, honest alt text, and obvious replacement notes.

## What This Is For

Use the `signage-placeholder-images` skill when you are:

- scaffolding a new signage screen with hero or promo imagery
- filling empty image zones in a menu board or kiosk
- adding temporary image references to a React component
- preparing a prototype for review before brand assets arrive

Use the `/create-signage-placeholders` prompt when you want a faster, repeatable starting point in Copilot Chat.

## Recommended Asset Paths

Keep placeholder files under a predictable public path so they are easy to replace later.

```text
public/placeholders/
public/placeholders/menu/
public/placeholders/promos/
public/placeholders/kiosk/
```

Use purpose-led names rather than generic image buckets.

## How To Ask

### 1. Plan placeholders for a whole screen

Prompt:

```text
Use the signage-placeholder-images skill.

I am building a landscape restaurant menu board with:
- two square food tiles on the left
- one large featured dish area on the right
- a small brand logo in the footer

For each image zone:
- infer purpose
- assign dimensions
- generate file name
- generate placeholder label
- generate alt text
- add a short replacement note
```

Expected output:

- a short list of placeholder assets with purpose, dimensions, file names, labels, alt text, and replacement notes
- names such as `menu-item-image-800x800.png` and `featured-hero-food-image-1920x1080.png`
- language that stays honest about placeholders rather than pretending the final image exists

### 2. Insert placeholders directly into a component

Prompt:

```text
Use the signage-placeholder-images skill.

Update this React signage component to use placeholder image paths for the hero area and the two supporting promo cards.
Use /placeholders/promos/ as the asset base path.
Keep the names deterministic and easy to replace later.
```

Expected output:

- the component updated to reference placeholder paths directly
- alt text such as `Placeholder for promotional hero image`
- file names that encode purpose and dimensions

Example result:

```tsx
<img
  src="/placeholders/promos/spring-promo-hero-image-1920x1080.png"
  alt="Placeholder for promotional hero image"
  className="h-full w-full object-cover"
/>
```

### 3. Ask for a single placeholder only

Prompt:

```text
Use the signage-placeholder-images skill.

I only need one placeholder for a footer brand logo on a portrait kiosk screen.
Give me the file name, suggested dimensions, alt text, label text, and a replacement note.
```

Expected output:

- one placeholder recommendation only
- a compact answer rather than a full screen plan
- a result such as `brand-logo-placeholder-600x240.png`

### 4. Check whether a screen needs placeholders at all

Prompt:

```text
Review this signage layout and tell me whether it has any true image zones.
If not, say so plainly and do not invent any placeholders.
```

Expected output:

- either a small placeholder plan or a direct statement that the layout is entirely typographic

## What Good Output Looks Like

Good output is:

- deterministic
- tied to the zone purpose, not just the position on screen
- sized for signage, not arbitrary web crop sizes
- honest in alt text
- easy to search for and replace in code

Poor output is:

- vague names like `image.png`
- fictional alt text that describes a photo that does not exist yet
- labels that are too long to read in a mock-up
- decorative invention that was not requested

## Team Conventions

- Prefer terms such as hero, promo, menu item, featured dish, product card, and background image.
- Prefer kebab-case file names with dimensions included.
- Use `placeholder` in the file name only when the purpose would otherwise be ambiguous.
- Keep placeholder labels short and uppercase when they will appear in visible mock-ups.
- Replace placeholder paths in code without changing the surrounding layout contract unless the final asset actually requires it.

## Quick Reference

- Skill: `signage-placeholder-images`
- Prompt: `/create-signage-placeholders`
- Source skill: `skills/signage-placeholder-images/`
- Copilot mirror: `.github/skills/signage-placeholder-images/`

For the full Copilot tooling inventory, see [GitHub Copilot Tooling](./github-copilot-tooling.md).

---

[← Back to Tooling](./README.md)