import { FC } from 'react';
import { Link } from 'react-router-dom';

/**
 * CustomAgents - Introduction to custom GitHub Copilot agents
 */
export const CustomAgentsPage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">How To</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Using Custom Agents
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Learn how to use custom GitHub Copilot agents to automate workflows
          and generate specialized content.
        </p>
      </div>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          What Are Custom Agents?
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Custom agents are specialized GitHub Copilot assistants configured
            for specific tasks and workflows. Each agent has:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">A defined role</strong> —
              Expertise in a specific domain (e.g., signage design, debugging,
              component review)
            </li>
            <li>
              <strong className="text-foreground">Tool restrictions</strong> —
              Limited to only the tools needed for their task
            </li>
            <li>
              <strong className="text-foreground">Custom instructions</strong> —
              Specialized knowledge and guardrails encoded in their prompt
            </li>
            <li>
              <strong className="text-foreground">Model selection</strong> — Can
              use specific models optimized for their work
            </li>
          </ul>
          <p>
            Agents live in{' '}
            <code className="text-sm">.github/agents/*.agent.md</code> and are
            invoked using the <code className="text-sm">@agent-name</code>{' '}
            syntax in GitHub Copilot Chat.
          </p>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          How to Invoke an Agent
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>In GitHub Copilot Chat (VS Code), mention the agent by name:</p>
          <pre
            className="rounded-lg border border-border bg-muted p-4 text-sm"
            aria-label="Basic agent invocation syntax"
          >
            <code className="text-foreground">
              @Agent Name [your request here]
            </code>
          </pre>
          <p className="mt-4">
            For example, to use the Signage Design Brief Writer:
          </p>
          <pre
            className="rounded-lg border border-border bg-muted p-4 text-sm"
            aria-label="Signage Design Brief Writer invocation example"
          >
            <code className="text-foreground">
              @Signage Design Brief Writer create a brief for a coffee shop menu
              board
            </code>
          </pre>
        </div>
      </section>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Available Agents
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            This repository includes several custom agents for different
            workflows:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 text-base font-medium text-foreground">
                Signage Design & Implementation
              </h3>
              <ul className="ml-6 list-disc space-y-1 text-sm">
                <li>
                  <Link
                    to="/how-to/design-brief"
                    className="text-foreground underline hover:no-underline"
                  >
                    <strong>Signage Design Brief Writer</strong>
                  </Link>{' '}
                  — Create markdown design briefs for signage projects
                </li>
                <li>
                  <Link
                    to="/how-to/build-signage"
                    className="text-foreground underline hover:no-underline"
                  >
                    <strong>signage-architect</strong>
                  </Link>{' '}
                  — Implement signage screens following design briefs
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 text-base font-medium text-foreground">
                Deployment & Hardware
              </h3>
              <ul className="ml-6 list-disc space-y-1 text-sm">
                <li>
                  <Link
                    to="/how-to/deploy-brightsign"
                    className="text-foreground underline hover:no-underline"
                  >
                    <strong>BrightSign Deploy</strong>
                  </Link>{' '}
                  — Package and deploy to BrightSign players
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2 text-base font-medium text-foreground">
                Developer Tools
              </h3>
              <ul className="ml-6 list-disc space-y-1 text-sm">
                <li>
                  <strong>UI Design Reviewer</strong> — Review UI/UX and provide
                  actionable feedback
                </li>
                <li>
                  <strong>shadcnui-component-reviewer</strong> — Review
                  shadcn/ui components for standards
                </li>
                <li>
                  <strong>Custom Agent Foundry</strong> — Design new custom
                  agents
                </li>
                <li>
                  <strong>Instructions Detox</strong> — Audit and optimize
                  instruction files
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-panel px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Best Practices
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Be specific</strong> — Provide
              detailed context in your prompt
            </li>
            <li>
              <strong className="text-foreground">Use the right agent</strong> —
              Each agent has a specialized role
            </li>
            <li>
              <strong className="text-foreground">
                Iterate in conversation
              </strong>{' '}
              — Ask for revisions within the same chat session
            </li>
            <li>
              <strong className="text-foreground">
                Review generated files
              </strong>{' '}
              — Always review agent output before committing
            </li>
            <li>
              <strong className="text-foreground">Handoff explicitly</strong> —
              When moving between agents, reference specific files or paths
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
