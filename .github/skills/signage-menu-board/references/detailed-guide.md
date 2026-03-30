# Signage Menu Board Workflow

This workflow expands the core skill into a practical build sequence for believable menu-board signage.

Use it when the task needs more than a template pick and a quick layout description.

## Stage 1: Define the Venue

Start by making the venue specific enough to drive decisions.

Minimum outputs:

- venue name
- concept and cuisine
- service model
- price position
- audience impression

Good example:

- name: Harbour Grain
- concept: coastal bakery and espresso bar with hot breakfast until 11:30
- service model: counter service
- price position: mid-market
- audience impression: fast weekday breakfast, premium enough for weekend brunch

Weak example:

- name: Tasty Food Spot
- concept: restaurant

If the venue is vague, the later design work will become generic.

## Stage 2: Define the Brand System

Before drawing screens, define a small brand system that can govern type, colour, imagery, and price styling.

Minimum outputs:

- logo direction
- palette
- heading and body type direction
- image style
- icon style
- background treatment

The brand does not need to be final artwork. It does need to be coherent enough to stop the layout from becoming a neutral demo board.

## Stage 3: Model the Menu Data

Define the content as structured data rather than prose.

Minimum outputs:

- menu mode or daypart assumptions
- categories
- items
- prices
- dietary tags or service notes
- optional availability flags

Data structure guidance:

- keep item names short
- make descriptions optional
- use one consistent price format
- only add featured items when they have a dedicated visual role

## Stage 4: Plan the Screen System

Decide whether the board is:

- one compact screen
- a static two- or three-screen set
- a rotating set with mode-specific variants

This is where many bad boards fail. They try to show the entire business on one screen.

Ask:

- which content is core and repeated
- which content is promotional
- which content can rotate or move to another screen
- which content should be excluded entirely

## Stage 5: Choose Templates Per Screen

Choose one template per screen:

1. Feature Pair + Hero
2. Category Columns
3. Promo Strip + Core Menu

Use a hybrid only when the screen has a clear primary zone and the result remains easy to scan.

## Stage 6: Check Capacity and Simplify

Capacity is a design constraint, not a suggestion.

Use these guardrails:

- landscape: 8 to 12 items per category
- portrait: 6 to 8 items per category
- featured items on one screen: 3 maximum
- competing promo messages: 1 maximum
- supporting descriptions: 1 short line in dense layouts

If the content exceeds these limits, simplify or split the screen set.

## Stage 7: Define Assets and Placeholders

Specify what assets are required:

- logo or wordmark
- hero photography or illustration
- item imagery if used
- dietary or service icons
- placeholder plan for missing assets

Avoid mixing photographic styles or inventing a promo image style that clashes with the venue tone.

Companion resources:

- use `assets/prompt-templates/logo-direction-prompts.md` to brief logo and wordmark directions
- use `assets/prompt-templates/food-image-prompts.md` to keep hero and item imagery prompts stylistically consistent

## Stage 8: Add Runtime Assumptions

Document the runtime model before implementation:

- static local JSON or external data source
- fixed board or rotating sequence
- mode switching by schedule or manual variant
- fallback for missing images or unavailable items
- target hardware assumptions

For signage, stale or simplified content is usually better than blank space.

Before implementation, run `scripts/stress-test-menu-content.mjs` against the menu JSON if you want a quick content-risk check for density, long names, and price formatting issues.

For a deliberate failure case, use the files under `assets/menu-board-stress-data/` and confirm that the stress checker reports the expected issues before simplifying the content.

Use the portrait-overflow example when you want density failures. Use the promo-overload example when you want to test crowded messaging and too many featured items without category overflow.

Use the quiet structural example when you want a board that looks calmer on paper but is still wrong because the categories fragment the offer into too many near-duplicate groups.

Use the runtime-fragile example when you want to test missing images, unavailable items, and fallback data that is present but incomplete or has empty fallback image fields.

## Stage 9: Produce the Implementation Plan

A strong implementation plan should list:

- screen inventory
- template selection per screen
- zone breakdown per screen
- data shape
- component list
- asset list
- runtime notes
- exclusions made for readability

If you are scaffolding from scratch, `scripts/generate-menu-seed.mjs` can generate a starter pack and `scripts/generate-image-prompt-pack.mjs` can derive a first-pass prompt bundle from that content.

See `references/script-invocations.md` for exact example commands.

## Worked Example

### Scenario

Create a breakfast and lunch menu-board set for Harbour Grain, a coastal bakery and espresso bar.

### Venue Profile

- venue: Harbour Grain
- concept: bakery, coffee, hot breakfast, takeaway lunch sandwiches
- service model: counter service
- price range: ££
- tone: calm, premium, brisk morning trade

### Brand Profile

- palette: navy slate background, warm cream foreground, muted sea-glass accent
- typography: condensed serif for headings, clean grotesk for body and prices
- image style: overhead and three-quarter plated food photography with soft daylight
- icon style: minimal outlined dietary badges

### Screen Inventory

1. breakfast feature screen
2. all-day coffee and pastry screen
3. lunch sandwiches and soups screen

### Template Choices

1. breakfast feature screen: Feature Pair + Hero
2. coffee and pastry screen: Category Columns
3. lunch screen: Promo Strip + Core Menu

### Why this split works

- hot breakfast gets visual emphasis while it is time-sensitive
- coffee and pastry can remain stable through the day
- lunch gets its own screen instead of shrinking breakfast and pastry into unreadable density

## Portrait 9:16 Example

For a portrait lobby display, use two portrait variants rather than forcing a landscape inventory into one narrow stack.

Suggested split:

1. portrait feature + stack for breakfast hero content
2. portrait category stack for drinks and pastries

Do not attempt to carry three dense categories plus promo text in one portrait composition.

## Before and After Simplification

### Before

- 5 categories on one portrait screen
- 2 promo ribbons
- descriptions under every item
- QR ordering prompt in the header
- allergen note repeated in multiple columns

Result:

- item names lose priority
- prices scatter visually
- the board reads like a leaflet

### After

- split into two screens
- remove one promo ribbon
- keep descriptions for featured items only
- move QR prompt and allergen note to footer or service screen

Result:

- item and price scan becomes predictable
- category rhythm improves
- the board feels like signage instead of a printed menu pasted onto a screen

## Final Review Questions

- Can a viewer identify prices within one glance?
- Is the venue identity obvious without extra explanation?
- Does every image reinforce the food and price hierarchy?
- Has any content been kept that should have been cut or moved?
- Would the screen still feel intentional if one asset failed to load?
