# TheSignAge — B-Roll Briefing

> Companion document for the Remotion explainer video.
> Use this to plan and shoot b-roll footage to intercut between or overlay on the motion-graphics scenes.

## Purpose of the current demo video

This video is a short developer-facing explainer for TheSignAge.

Its job is to communicate a simple idea clearly: digital signage can be approached as software, and more specifically as a React-driven development problem rather than a special category that requires abandoning normal frontend workflows.

The film is not trying to sell a generic signage product, attack existing CMS tools, or dramatise the problem space. It is introducing a different framing for a specific audience: developers who already know how to build interfaces, but have not yet thought of screens in physical spaces as something they can build with their existing tools.

In practical terms, the video should leave the viewer with four messages:

1. Signage is a real-world software problem with physical constraints.
2. TheSignAge treats signage as something developers can build with familiar tools.
3. The repository includes real components, deployment tooling, and operational thinking.
4. This is not a rant about CMS platforms; it is a calm statement that this project serves a different workflow and a different kind of builder.

## Tone for the piece

The tone should be calm, assured, technical, and respectful.

It should communicate clarity rather than excitement. It should feel like a thoughtful engineering perspective, not a campaign. Where the video references common signage workflows or CMS-style tooling, it should do so without mockery. The point is not that those tools are bad. The point is that TheSignAge is for people who think in components, code, deployment, and systems.

## Video overview

| Property       | Value                        |
| -------------- | ---------------------------- |
| Resolution     | 1920 × 1080                  |
| Frame rate     | 30 fps                       |
| Total duration | ~52 seconds (1560 frames)    |
| Scenes         | 10                           |
| Tone           | Editorial, technical, calm   |
| Audience       | React / frontend developers  |

---

## Aesthetic and tone

### Core aesthetic

The video should feel like a precise technical editorial, not a product advert.

The visual world is dark, controlled, and intentional. Interfaces sit on deep charcoal surfaces. Accent colour is used sparingly and strategically: cyan for clarity and activation, violet for atmosphere and secondary emphasis, amber and green only when the subject matter naturally calls for them. The frame should feel premium but restrained, more like a design-forward engineering film than a marketing spot.

TheSignAge is about digital signage as software. That means the footage should communicate real systems, real screens, real environments, and real developer workflows. The imagery should feel grounded in infrastructure and implementation, not aspiration.

### Tone in plain terms

- Calm, not excited
- Confident, not boastful
- Technical, not corporate
- Modern, not futuristic
- Precise, not flashy
- Human, but not sentimental

### What the film is not

- Not a startup promo
- Not a SaaS ad with generic office lifestyle footage
- Not a cinematic hardware trailer full of speed ramps and lens flares
- Not a parody of CMS tools or enterprise software
- Not a celebration of "AI magic"

### Director shorthand

If the piece were described in a few references, it would be:

- An engineering-led brand film
- A documentation video with taste
- A restrained explainer with editorial discipline
- A film about software meeting physical space

### Emotional arc

- Opening: recognition and low-key frustration
- Middle: relief, clarity, proof, capability
- Closing: confidence, legitimacy, invitation

### Performance direction for any people on camera

People in frame should look occupied, thoughtful, and competent. Avoid exaggerated reactions. No grinning at monitors. No theatrical frustration. If a developer is on screen, they should look like they are working through a real task, not posing as "a developer".

### Environment direction

Locations should feel real and slightly quiet: office lobbies, corridors, reception desks, meeting rooms, venue halls, menu-board contexts, operations spaces. Favour practical environments with visible screens, cables, mounts, bezels, reflections, and ambient architecture. A little imperfection is useful because it reinforces that signage lives in the real world.

---

## B-roll strategy

The motion-graphics scenes already carry the narrative copy. B-roll should therefore do one of three jobs only:

1. Prove that the subject is real in the physical world
2. Add texture to developer workflow moments
3. Bridge between abstract statements and concrete environments

B-roll should not compete with the typography. It should support, punctuate, or extend the meaning of each scene. In editorial terms, think of it as evidence rather than decoration.

### Best use of b-roll in the edit

- Use short inserts between scenes where the narrative shifts from abstract to concrete
- Use overlays during slower text moments when the copy benefits from physical context
- Use environmental cutaways to reset scale: desk → player → screen → room
- Use repeated motifs to create continuity: wall-mounted displays, VS Code, deploy terminal, BrightSign hardware

### Shot rhythm

- Prefer shots that can hold for 1.5 to 3 seconds without feeling static
- Reserve quicker cuts for the showcase and toolkit sections only
- Let the hook, reframe, positioning, and close scenes breathe
- Avoid hyperactive montage pacing; the edit should feel deliberate

---

## Scene breakdown

### Scene 1 — Hook (4 s)

**On-screen text**
> "Your boss wants content on the lobby screen."

**Visual treatment**
Dark screen. A single sentence types in character by character against a dark background (#1C1E21). Subtle cyan glow orb pulsing behind the text. Muted text colour — quiet, familiar, relatable.

**Mood / intent**
Recognition. The viewer thinks: "Oh, that happened to me."

**B-roll function**
Establishes the physical problem before the film introduces the software answer.

**B-roll ideas**
- Close-up of a blank wall-mounted screen in an office lobby, powered on but showing nothing
- Someone glancing up at a blank or outdated screen in a corridor
- A hand gesturing toward a display in a meeting room — "we need something there"
- Wide shot of a reception area where a screen is clearly an afterthought

---

### Scene 2 — Frustration (6 s)

**On-screen text**
Three cards appear then recede:
1. "Hardware you've never touched"
2. "Constraints you've never designed for"
3. "Tools that don't think like you do"

Then the punchline fades in:
> "You're a React developer. You already know how to build this."

**Visual treatment**
Three frosted-glass cards with icons stagger in, then fade back to ~35% opacity. Cards recede (not crossed out — they're not bad, just not how a developer thinks). Punchline appears centred below. Violet glow orb top-right.

**Mood / intent**
Mild discomfort → relief. The platform limitations are real, but they're not the point — you already have the skills.

**B-roll function**
Turns the abstract pain points into recognisable developer situations.

**B-roll ideas**
- A developer squinting at a clunky CMS drag-and-drop interface on their laptop
- Someone scrolling through unfamiliar hardware spec sheets
- Hands on a keyboard, pausing, uncertain — "how do I even start?"
- A stack of BrightSign players still in their boxes, un-opened
- Close-up of vendor documentation that clearly isn't developer-friendly

---

### Scene 3 — Reframe (5 s)

**On-screen text**
> "What if signage was just..."
>
> **a React app?**
>
> "Your toolchain. Your components. Unusual constraints."

**Visual treatment**
The pre-text fades in small and muted. Then "a React app?" reveals huge (128 px) in cyan with a slow left-to-right clip. Supporting line fades up. Subtle grid background. Large pulsing cyan glow orb behind text.

**Mood / intent**
The paradigm shift. Relief. "Oh — I can do this with what I already know."

**B-roll function**
Visually connects signage work back to the familiar React development environment.

**B-roll ideas**
- A VS Code editor with a React component on screen — the viewer recognises "home"
- `npm start` or `pnpm dev` running in a terminal, a dev server spinning up
- A component rendering in a browser — the familiar dev loop
- Quick cuts of familiar React/TypeScript tooling (JSX, hooks, imports)
- A wall-mounted screen suddenly displaying something built with React

---

### Scene 4 — Showcase (9 s)

**On-screen text**
Four screen types in a 2×2 grid:
1. **Restaurant Menu** (amber)
2. **KPI Dashboard** (cyan)
3. **Office Directory** (green)
4. **Event Schedule** (violet)

Then the grid fades out and a terminal block appears:
```
$ pnpm deploy:player
✓ Built player-minimal (2.1s)
✓ Deployed to BrightSign @ 192.168.1.50
```

**Visual treatment**
Glass cards with coloured icon badges stagger in with scale + slide. Grid fades out, replaced by a terminal proving deployment is one command. Two glow orbs (violet + cyan) provide ambient depth.

**Mood / intent**
"It's real." These aren't mockups — these are actual use cases you can build and deploy.

**B-roll function**
Provides the most concrete proof in the film: real screens, real contexts, real deploy flow.

**B-roll ideas**
- A restaurant menu board running on a wall-mounted display — real content, real environment
- A KPI dashboard on a large screen in an open-plan office
- An office directory screen next to an elevator
- An event schedule display in a conference venue lobby
- A terminal showing a successful deploy, camera over the developer's shoulder
- The moment a BrightSign player updates — screen flickers, new content appears
- Close-up of an Ethernet cable plugging into a BrightSign player

---

### Scene 5 — Toolkit (6 s)

**On-screen text**
Left side headline: **"What's inside"**

Right side — five capability rows that slide in from right:
1. 🟡 **Signage component library** — "shadcn/ui primitives, adapted for walls"
2. 🔵 **Distance-readable typography** — "10-foot rule, enforced"
3. 🟢 **One-command BrightSign deploy** — "pnpm deploy:player"
4. 🟣 **Copilot agents for signage** — "AI that knows the constraints"
5. 🔴 **Offline-first, 24/7 ready** — "State machines. Crash recovery."

**Visual treatment**
Two-column layout: large headline left, stacked soft glass cards right. Each row slides in from the right with a coloured icon badge. Violet glow orb behind headline.

**Mood / intent**
Quick capability hits. Not a deep dive — just enough to show this is a real toolkit, not a toy.

**B-roll function**
Supports the claim that the repo contains practical tooling, not just visual demos.

**B-roll ideas**
- A component library in Storybook — scrolling through signage-specific components
- A large display showing text that's clearly readable from across a room (10-foot rule)
- Tight shot of a terminal running `pnpm deploy:player`
- GitHub Copilot in VS Code, suggesting signage-aware code completions
- A BrightSign player running for days — timestamp or uptime counter visible
- A screen recovering after a simulated power cut — boots back to content

---

### Scene 6 — Constraints (5 s)

**On-screen text**
Headline: **"Built for the real world"**

Four constraint cards in a 2×2 grid:
| Stat     | Label            | Detail                              |
| -------- | ---------------- | ----------------------------------- |
| 3–10 m   | Viewing distance | Readable from across the room       |
| 24/7     | Always on        | Survives reboots, outages, crashes  |
| 1080p+   | Fixed resolution | No responsive guessing              |
| < 2 s    | Glance time      | Understand and move on              |

**Visual treatment**
Grid background. Headline reveals with clip animation. Cards stagger in with fade + slide-up. Stats reveal with horizontal clip-path. Alternating cyan/violet glow per card.

**Mood / intent**
Engineering respect. These aren't arbitrary specs — they're the real-world conditions signage has to survive.

**B-roll function**
Shows physical scale, continuous operation, and glance-based usage in real environments.

**B-roll ideas**
- Someone viewing a screen from across a large room — establishing distance
- A hallway with a screen visible at the far end — can you read it?
- A screen running in a 24/7 environment — security desk, hospital corridor, transit hub
- Close-up showing crisp 1080p content — no fuzzy scaling
- People walking past a display, glancing for 1–2 seconds, getting the message, moving on
- Time-lapse of a screen running all day — morning to night, always on

---

### Scene 7 — Positioning (5 s)

**On-screen text**
Headline: **"Not a CMS replacement."**

Four lines stagger in:
1. "Content management systems are great at what they do."
2. "This is something different."
3. "A starting point for developers who think in components,"
4. "not drag-and-drop." *(this line is cyan — the emphasis)*

**Visual treatment**
Centred layout. Headline reveals with clip. Lines fade in one by one. Last line in accent cyan to mark the distinction. Violet glow orb. Generous padding.

**Mood / intent**
Honest framing. No trash-talking CMS tools. This is simply a different approach, for a different kind of person.

**B-roll function**
Helps contrast two working styles without caricaturing either of them.

**B-roll ideas**
- Split-screen: a drag-and-drop CMS on one side, a code editor on the other
- A developer choosing to open their IDE instead of a CMS dashboard
- Hands on a keyboard typing JSX — the "component thinker"
- A CMS interface shown respectfully (not mocked) — it's good, it's just not this

---

### Scene 8 — Open Source (5 s)

**On-screen text**
Headline (two lines):
> "Open source.
> Built in the open."

Three items fade in:
1. "MIT licensed"
2. "Early days — contributions welcome"
3. `github.com/CambridgeMonorail/TheSignAge` *(monospace, violet)*

**Visual treatment**
Grid background. Large pulsing cyan glow orb. Headline reveals with clip. Items stagger in. URL in monospace font and violet colour.

**Mood / intent**
Invitation. This is real, it's free, and you can contribute.

**B-roll function**
Moves from product evidence to community evidence: repo, issues, pull requests, contribution flow.

**B-roll ideas**
- The GitHub repository page — stars, forks, open issues
- A PR being reviewed or merged
- The MIT license file in the repo
- Someone cloning the repo and running `pnpm install`
- A "contributions welcome" label on a GitHub issue

---

### Scene 9 — Close (4 s)

**On-screen text**
Thesis statement:
> "Signage is software.
> Build it like software."

URL: `github.com/CambridgeMonorail/TheSignAge`
CTA button: **★ Star on GitHub**

**Visual treatment**
Grid background. Large pulsing cyan glow. An expanding ring animates out from centre for atmosphere. Headline reveals with clip. URL in violet monospace. CTA button with cyan border and subtle glow, scales in.

**Mood / intent**
The closing statement. Confident, calm, declarative. One clear action: star the repo.

**B-roll function**
Reinforces that the result exists in the real world and closes on proof rather than hype.

**B-roll ideas**
- A wall-mounted screen displaying polished signage content — the finished product
- A developer pushing code, leaning back satisfied
- The GitHub star button being clicked (screen recording)
- A BrightSign player LED blinking steadily — it's running, it's working

---

### Scene 10 — Credits (3 s)

**On-screen text**
> "This video was built with"
>
> **Claude** + **Remotion**
>
> *"Code generates code."*

**Visual treatment**
Minimal. Dark background, no grid or orbs. Text fades in three stages: intro line, tool names (large, bold), tagline. The whole scene fades out at the end.

**Mood / intent**
Quiet, understated, honest. A nod to the tools that built the video itself.

**B-roll function**
Usually none. This is best left clean unless a very subtle interface insert is needed.

**B-roll ideas**
- Not typically intercut — this is a clean end card
- If desired: a quick shot of the Remotion Studio interface showing this video's timeline

---

## Cumulative timing reference

| #  | Scene         | Duration | Cumulative | Starts at |
| -- | ------------- | -------- | ---------- | --------- |
| 1  | Hook          | 4 s      | 0:04       | 0:00      |
| 2  | Frustration   | 6 s      | 0:10       | 0:04      |
| 3  | Reframe       | 5 s      | 0:15       | 0:10      |
| 4  | Showcase      | 9 s      | 0:24       | 0:15      |
| 5  | Toolkit       | 6 s      | 0:30       | 0:24      |
| 6  | Constraints   | 5 s      | 0:35       | 0:30      |
| 7  | Positioning   | 5 s      | 0:40       | 0:35      |
| 8  | Open Source   | 5 s      | 0:45       | 0:40      |
| 9  | Close         | 4 s      | 0:49       | 0:45      |
| 10 | Credits       | 3 s      | 0:52       | 0:49      |

## Narrative arc

```
Hook → Frustration → Reframe → Showcase → Toolkit → Constraints → Positioning → Open Source → Close → Credits
 ↕          ↕           ↕          ↕          ↕          ↕             ↕             ↕           ↕
Problem   Pain      Paradigm    Proof     What you   Real-world    Honest         Invitation   CTA
                     shift                   get      respect      framing
```

## Visual language

| Element          | Purpose                                    |
| ---------------- | ------------------------------------------ |
| Dark background  | `#1C1E21` — consistent, editorial, calm    |
| Grid overlay     | Subtle structure — technical feel           |
| Glow orbs        | Ambient depth — cyan and violet palette     |
| Glass cards      | Frosted panels with subtle border + glow    |
| Clip-path reveal | Text reveals left-to-right, not just fades  |
| Typewriter       | Hook scene only — types character by character |

## Cinematography notes

| Attribute        | Direction |
| ---------------- | --------- |
| Framing          | Clean, geometric, stable compositions with obvious screen hierarchy |
| Camera movement  | Slow dolly, slider, tripod, or controlled gimbal only |
| Lenses           | Normal to slightly long focal lengths; avoid exaggerated wide-angle distortion |
| Focus            | Keep screens or hands sharp; let backgrounds fall soft where useful |
| Reflections      | Accept subtle reflections on glass and screens if they add realism |
| Lighting         | Practical light sources, soft contrast, slightly cool overall balance |
| Texture          | Hardware edges, bezels, cables, venting, mounting details, keyboards |

## Edit guidance

### Transitions

The Remotion scenes themselves are mostly fade, reveal, and stagger-based. Any inserted b-roll should respect that grammar.

- Prefer straight cuts, very short dissolves, or opacity-based overlays
- Avoid whip pans, glitch transitions, zoom blasts, and stylised wipes
- If using motion transitions, keep them linear and understated

### How b-roll should sit against the graphics

- Let the graphics own the message and the b-roll supply the evidence
- Avoid covering key text areas if footage is used as an overlay
- If compositing, favour darker footage with negative space for typography
- Use shallow parallax or masked reveals only if they remain quiet and legible

### Sound implication for the director/editor

Even if this document is focused on visuals, the footage should suggest a sparse sound world: room tone, terminal taps, relay clicks, HVAC hum, distant lobby ambience. Nothing glossy or over-produced.

## Colour palette

| Colour          | Hex       | Usage                          |
| --------------- | --------- | ------------------------------ |
| Background      | `#1C1E21` | All scene backgrounds          |
| Primary text    | `#E6E6E6` | Headlines, card stats          |
| Muted text      | `#A0A4A8` | Body text, supporting copy     |
| Dim text        | `#6E7681` | Credits, subtle labels         |
| Accent (cyan)   | `#57D5F4` | Highlights, key reveals, CTA   |
| Violet           | `#BF83EC` | Secondary accent, URLs, glow   |
| Green           | `#10b981` | Terminal prompts, success      |
| Amber           | `#f59e0b` | Restaurant menu, warm accent   |

## Shooting notes for b-roll

### General principles

- **Match the tone**: Editorial, technical, restrained. No stock-photo energy. No one smiling at a laptop.
- **Colour grading**: Dark, desaturated, slightly cool. Should sit comfortably next to the `#1C1E21` backgrounds.
- **Depth of field**: Shallow where possible. Signage screens in focus, surroundings soft.
- **Movement**: Slow, deliberate — dolly or gimbal. No handheld shake. No fast zooms.
- **Aspect ratio**: All footage should be 16:9 at 1920 × 1080 or higher.
- **Frame rate**: Shoot at 30 fps to match the Remotion output (or 60 fps for optional slow-motion).
- **Screen capture discipline**: If shooting monitors or signage directly, avoid moire, flicker, or exposure pumping.
- **Coverage philosophy**: Favour versatile medium and close shots that can be reused across multiple scenes.

### Preferred shot types

- Locked-off wides that establish a space with a single important screen
- Medium over-the-shoulder shots of a developer in VS Code or terminal
- Tight inserts of hardware details: ports, LEDs, mounts, cables, ventilation slots
- Profile or three-quarter shots of screens in real environments
- Glance shots: people passing a display and understanding it quickly
- Operational detail shots: boot-up, reload, deploy confirmation, content refresh

### Priority shots

These are the most impactful and reusable across scenes:

1. **A real BrightSign player** — close-up of the unit, Ethernet port, power LED
2. **Content appearing on a wall-mounted screen** — the "it works" moment
3. **A developer at their desk** — VS Code open, terminal visible, React code on screen
4. **A screen in a real environment** — lobby, corridor, restaurant, office
5. **The deploy moment** — terminal command → screen updates

### What to avoid

- Generic B2B stock footage (handshakes, whiteboards, fist-bumps)
- Shaky handheld footage
- Bright, saturated lighting that clashes with the dark palette
- People staring directly at the camera
- Anything that feels like a startup advert or product launch
- Overly dramatic server-room imagery that implies a different product category
- Futuristic hologram visuals or sci-fi UI overlays
- Excessively clean "mock office" locations with no believable signage context
- Comic frustration acting or obvious fake typing
