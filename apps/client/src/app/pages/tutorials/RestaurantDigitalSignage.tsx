import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeDollarSign,
  CheckCircle,
  ClipboardList,
  Code,
  LayoutTemplate,
  Monitor,
  Package,
  Palette,
  Utensils,
} from 'lucide-react';
import { Button } from '@wallrun/shadcnui';
import { CodeSnippet } from '../../components/CodeSnippet';

const menuDataCode = `type MenuItem = {
  name: string;
  description: string;
  price: string;
  tags?: string[];
};

type MenuCategory = {
  title: string;
  items: MenuItem[];
};

export const lardLoungeMenu: MenuCategory[] = [
  {
    title: 'Lard Classics',
    items: [
      {
        name: 'Confit Lard Toast',
        description: 'Sourdough, whipped cultured lard, pickled shallot',
        price: '$12',
        tags: ['signature'],
      },
      {
        name: 'Golden Dripping Fries',
        description: 'Triple-cooked potatoes, rosemary salt, lard aioli',
        price: '$9',
      },
      {
        name: 'Lardo Carbonara',
        description: 'Rigatoni, cured lardons, black pepper, yolk',
        price: '$24',
      },
    ],
  },
  {
    title: 'Modern Plates',
    items: [
      {
        name: 'Lard-Seared Cabbage',
        description: 'Charred hispi, apple glaze, crisp crumb',
        price: '$18',
      },
      {
        name: 'Pork Fat Risotto',
        description: 'Pearl barley, smoked lard, parmesan, chive',
        price: '$22',
      },
    ],
  },
];`;

const componentCode = `import {
  MenuBoard,
  MenuSection,
  SignageContainer,
  SignageHeader,
  SignagePanel,
} from '@wallrun/shadcnui-signage';
import { lardLoungeMenu } from './lardLoungeMenu';

export const LardLoungeMenuScreen = () => {
  return (
    <SignageContainer variant="neutral" showGrid={false}>
      <SignageHeader
        tag="Dinner"
        title="The Lard Lounge"
        subtitle="Modern comfort dishes built around carefully sourced lard"
      />

      <div className="mt-10 grid grid-cols-[1.4fr_0.9fr] gap-8">
        <MenuBoard title="Tonight's Menu">
          {lardLoungeMenu.map((category) => (
            <MenuSection
              key={category.title}
              title={category.title}
              items={category.items}
            />
          ))}
        </MenuBoard>

        <SignagePanel>
          <p className="text-4xl font-semibold">Chef's Lard Flight</p>
          <p className="mt-4 text-2xl text-muted-foreground">
            Three textures of rendered, whipped, and cured lard with bread.
          </p>
          <p className="mt-8 text-5xl font-bold">$28</p>
        </SignagePanel>
      </div>
    </SignageContainer>
  );
};`;

const buildPromptCode = `@signage-architect

Build a landscape 1920x1080 restaurant signage screen set for The Lard Lounge.

Use the design brief in docs/signage design briefs/The Lard Lounge/.
Create:
- dinner menu screen using Category Columns
- featured special screen using Feature Pair + Hero
- fallback closed screen for offline or after-hours states

Keep item names and prices readable from 3-5 metres.
Use @wallrun/shadcnui-signage components where they fit.
Avoid dense paragraph copy and keep the menu data in a typed data file.`;

const deployCode = `pnpm nx g wallrun:player-app --name player-lard-lounge --displayOrientation landscape
pnpm nx serve player-lard-lounge
pnpm deploy:player -- --app player-lard-lounge --player dining-room-display`;

const SectionHeading: FC<{
  eyebrow: string;
  title: string;
  icon: typeof Monitor;
}> = ({ eyebrow, title, icon: Icon }) => {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="rounded-md bg-muted p-2 text-muted-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{eyebrow}</p>
        <h2 className="text-2xl font-medium text-foreground">{title}</h2>
      </div>
    </div>
  );
};

const CheckItem: FC<{ children: string }> = ({ children }) => {
  return (
    <li className="flex gap-2">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <span>{children}</span>
    </li>
  );
};

export const RestaurantDigitalSignageTutorialPage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">Tutorial</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Create Restaurant Digital Signage With WallRun
        </h1>

        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          A start-to-finish developer case study for The Lard Lounge, a modern
          restaurant devoted to the surprisingly serious art of lard-based
          dishes.
        </p>
      </div>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Case study"
          title="The Brief"
          icon={ClipboardList}
        />
        <div className="space-y-4 text-muted-foreground">
          <p>
            The Lard Lounge is fictional, but the workflow is the one you would
            use for a real restaurant: define the venue, reduce the menu to a
            readable screen system, build with WallRun components, and verify it
            as unattended display software.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 font-medium text-foreground">Venue</h3>
              <p className="text-sm">
                Modern dining room, counter ordering at lunch, table service at
                dinner, open kitchen, warm lighting.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 font-medium text-foreground">Audience</h3>
              <p className="text-sm">
                Curious food people who enjoy craft, humour, and clear pricing
                before they commit to the full lard journey.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 font-medium text-foreground">Screens</h3>
              <p className="text-sm">
                One landscape menu board above the counter, one rotating
                specials screen near the host stand, one closed fallback.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Step 1"
          title="Turn the Restaurant Into a Signage System"
          icon={Utensils}
        />
        <div className="space-y-4 text-muted-foreground">
          <p>
            Start by deciding what the screens must do in the room. The counter
            board must answer three questions quickly: what is sold, what does
            it cost, and what should I order if I am overwhelmed by a menu full
            of rendered fat.
          </p>
          <ul className="space-y-2 text-sm">
            <CheckItem>
              Dinner menu screen: Category Columns template for repeatable item
              and price scanning.
            </CheckItem>
            <CheckItem>
              Featured special screen: Feature Pair + Hero template for the
              Chef's Lard Flight and seasonal plate.
            </CheckItem>
            <CheckItem>
              Closed fallback screen: short message, reopening time, QR prompt,
              and no dependency on live menu data.
            </CheckItem>
          </ul>
          <p>
            This is where WallRun differs from slide-based signage. We are
            designing a small app surface with data, states, and fallbacks, not
            a one-off graphic.
          </p>
        </div>
      </section>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Step 2"
          title="Define the Brand Rules"
          icon={Palette}
        />
        <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-medium text-foreground">Palette</h3>
            <p>
              Charcoal, bone white, copper pan, preserved lemon, and a sharp
              parsley green. The page should feel modern and edible, not brown
              and heavy.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-medium text-foreground">Type</h3>
            <p>
              Wide, confident display headings for the venue name; practical
              sans-serif item names and tabular prices for scan speed.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-medium text-foreground">Imagery</h3>
            <p>
              Close food photography with crisp edges, steam, and ceramic
              plates. Avoid novelty fat imagery that makes the offer look like a
              joke.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-medium text-foreground">Voice</h3>
            <p>
              Self-aware but precise: "crispy", "cultured", "slow-rendered",
              "brightened with pickle" instead of paragraph-length romance.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Step 3"
          title="Model the Menu Before the Layout"
          icon={BadgeDollarSign}
        />
        <div className="space-y-4 text-muted-foreground">
          <p>
            Menu boards fail when content arrives as freeform copy. Keep the
            data small and explicit: categories, item names, short descriptions,
            prices, and optional tags.
          </p>
          <CodeSnippet
            language="typescript"
            filename="lardLoungeMenu.ts"
            code={menuDataCode}
          />
          <p className="text-sm">
            If a category grows beyond eight to twelve items in landscape, split
            it into another screen or rotate modes. Do not keep shrinking text
            until the menu technically fits but nobody can read it.
          </p>
        </div>
      </section>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Step 4"
          title="Choose WallRun Components"
          icon={LayoutTemplate}
        />
        <div className="space-y-4 text-muted-foreground">
          <p>
            For a restaurant menu board, start with the signage primitives and
            blocks instead of composing raw cards from scratch.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 font-medium text-foreground">
                Screen structure
              </h3>
              <p className="text-sm">
                Use SignageContainer, SignageHeader, SignagePanel, and
                SplitScreen when you need fixed screen zones and safe spacing.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 font-medium text-foreground">Menu content</h3>
              <p className="text-sm">
                Use MenuBoard, MenuSection, and MenuItem when price alignment
                and repeated item hierarchy matter more than decoration.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 font-medium text-foreground">
                Runtime states
              </h3>
              <p className="text-sm">
                Add ScheduleGate, OfflineFallback, StaleDataIndicator, and
                ContentRotator when data or daypart changes can fail.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 font-medium text-foreground">Verification</h3>
              <p className="text-sm">
                Test at the target aspect ratio, then check the page as a
                full-screen unattended display.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Step 5"
          title="Build the First Screen"
          icon={Code}
        />
        <div className="space-y-4 text-muted-foreground">
          <p>
            The first implementation can be simple: one menu board field, one
            featured panel, and menu data imported from a typed file. That gives
            you a real surface for review without committing to animation or
            live pricing too early.
          </p>
          <CodeSnippet
            language="tsx"
            filename="LardLoungeMenuScreen.tsx"
            code={componentCode}
          />
          <p className="text-sm">
            Once the static screen reads clearly, add daypart switching or live
            menu data. Dynamic behavior is a second pass, not a substitute for
            hierarchy.
          </p>
        </div>
      </section>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Step 6"
          title="Use the WallRun Agent Workflow"
          icon={Monitor}
        />
        <div className="space-y-4 text-muted-foreground">
          <p>
            If you are working inside the WallRun repository, the agent workflow
            can turn this brief into a player app and keep the implementation
            aligned with signage constraints.
          </p>
          <CodeSnippet
            language="bash"
            filename="Copilot Chat prompt"
            code={buildPromptCode}
          />
          <p>
            The important detail is the shape of the ask. Name the venue, point
            to the brief, specify screen inventory, name the templates, and make
            legibility a requirement.
          </p>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Step 7"
          title="Package, Preview, and Deploy"
          icon={Package}
        />
        <div className="space-y-4 text-muted-foreground">
          <p>
            For hardware, scaffold a player app, preview it locally, then deploy
            to a registered display. The exact target player name depends on
            your local configuration.
          </p>
          <CodeSnippet language="bash" filename="terminal" code={deployCode} />
          <ul className="space-y-2 text-sm">
            <CheckItem>
              Preview at the target orientation and resolution before packaging.
            </CheckItem>
            <CheckItem>
              Confirm item names, prices, and service notes are readable from
              the intended viewing distance.
            </CheckItem>
            <CheckItem>
              Test missing menu data and after-hours behavior before the screen
              goes on a wall.
            </CheckItem>
          </ul>
        </div>
      </section>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <SectionHeading
          eyebrow="Outcome"
          title="What The Lard Lounge Gets"
          icon={CheckCircle}
        />
        <div className="space-y-4 text-muted-foreground">
          <p>
            By the end, The Lard Lounge has a small screen system rather than a
            pile of static images: a menu screen, a featured special screen, and
            a resilient fallback. Developers can update menu data, swap assets,
            test behavior, and deploy the same way they would ship a frontend
            app.
          </p>
          <p>
            The joke is lard. The serious bit is that restaurant signage is
            operational software: prices change, availability changes, service
            modes change, and the display has to stay legible when the dining
            room gets loud.
          </p>
        </div>
      </section>

      <section className="demo-panel px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Continue the Workflow
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="h-11">
            <Link to="/components/blocks/menu-board">Open MenuBoard docs</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link to="/how-to/design-brief">Create a design brief</Link>
          </Button>
          <Button asChild variant="ghost" className="h-11">
            <Link to="/tooling">Review deployment tooling</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
