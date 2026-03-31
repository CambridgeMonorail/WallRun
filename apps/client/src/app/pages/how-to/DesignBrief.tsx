import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Folder } from 'lucide-react';

/**
 * DesignBrief - Guide for creating signage design briefs with the agent
 */
export const DesignBriefPage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">How To</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Create a Design Brief
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Use the Signage Design Brief Writer agent to create comprehensive
          markdown design briefs for digital signage projects.
        </p>
      </div>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          What the Agent Creates
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            The{' '}
            <strong className="text-foreground">
              Signage Design Brief Writer
            </strong>{' '}
            generates structured 10-section markdown design briefs for digital
            signage — especially restaurant menus, menu boards, and public
            display concepts.
          </p>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h3 className="mb-3 text-base font-medium text-foreground">
              Each Brief Includes
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  <strong>Visual direction</strong> — Aesthetic, tone, mood, and
                  brand personality
                </span>
              </li>
              <li className="flex gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  <strong>Technical layout</strong> — Screen specs, zones, grid,
                  and typography hierarchy
                </span>
              </li>
              <li className="flex gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  <strong>Content structure</strong> — Page breakdown, menu
                  items, pricing, and featured content
                </span>
              </li>
              <li className="flex gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  <strong>Image prompts</strong> — Detailed descriptions for
                  placeholder or AI-generated imagery
                </span>
              </li>
              <li className="flex gap-2">
                <Folder className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  Saved in its own folder:{' '}
                  <code className="text-xs">
                    docs/signage design briefs/[Venue Name]/
                  </code>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Step-by-Step Guide
        </h2>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              1. Invoke the Agent
            </h3>
            <p className="mb-3">
              In GitHub Copilot Chat (VS Code), start your message with:
            </p>
            <pre className="rounded-lg border border-border bg-muted p-4 text-sm">
              <code className="text-foreground">
                @Signage Design Brief Writer
              </code>
            </pre>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              2. Provide Your Concept
            </h3>
            <p className="mb-3">Describe the signage concept. Include:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Venue name and concept</li>
              <li>Visual tone (premium, casual, modern, traditional)</li>
              <li>Screen orientation and resolution</li>
              <li>Number of pages or screens needed</li>
              <li>Specific constraints (colors, fonts, accessibility)</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              3. Example Prompt
            </h3>
            <pre className="whitespace-pre-wrap rounded-lg border border-border bg-muted p-4 text-sm">
              <code className="text-foreground">
                {`@Signage Design Brief Writer

Create a design brief for "The Green Fork" - a premium plant-based café with a modern, vibrant aesthetic. Target audience is health-conscious professionals.

- Landscape orientation (1920×1080)
- 3 pages: All-day menu, seasonal specials, drinks
- Visual direction: Fresh, clean, sustainable, approachable premium
- Use green as primary accent, warm neutrals as base
- High contrast for readability from 3 metres
- Include placeholder images for hero shots of signature dishes`}
              </code>
            </pre>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              4. Review the Output
            </h3>
            <p>
              The agent creates a markdown file in{' '}
              <code className="text-sm">
                docs/signage design briefs/[Venue Name]/design brief.md
              </code>
              . Review the brief and request revisions if needed.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              5. Next Steps: Implementation
            </h3>
            <p>
              Once approved, hand off to the signage-architect agent to build
              the actual screens. See the{' '}
              <Link
                to="/how-to/build-signage"
                className="text-foreground underline hover:no-underline"
              >
                Build a Signage Screen
              </Link>{' '}
              guide.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel-soft px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Tips for Better Briefs
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">
                Be specific about tone
              </strong>{' '}
              — "Premium but approachable" is better than just "nice"
            </li>
            <li>
              <strong className="text-foreground">
                Include constraints early
              </strong>{' '}
              — Mention legibility distance, color requirements, accessibility
              needs
            </li>
            <li>
              <strong className="text-foreground">Describe the audience</strong>{' '}
              — Understanding who views the screen shapes design decisions
            </li>
            <li>
              <strong className="text-foreground">Specify content depth</strong>{' '}
              — How many menu items? How much text per page?
            </li>
            <li>
              <strong className="text-foreground">
                Request example content
              </strong>{' '}
              — The agent can invent realistic menu items and copy
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
