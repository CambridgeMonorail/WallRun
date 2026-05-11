import type { FC, ReactNode } from 'react';
import { ActionStrip } from '../primitives/ActionStrip';
import { SignagePanel } from '../primitives/SignagePanel';
import { SignageContainer } from '../layouts/SignageContainer';
import type { GradientVariant } from '../layouts/SignageContainer';
import { OneMessageFrame } from './OneMessageFrame';
import { QRHandoff, type QRHandoffProps } from './QRHandoff';
import { cn } from '../utils/cn';

export type DecisionBoardHandoff = Pick<
  QRHandoffProps,
  | 'title'
  | 'description'
  | 'qrValue'
  | 'qrLabel'
  | 'qrInstruction'
  | 'shortUrl'
  | 'eyebrow'
  | 'tone'
>;

export type DecisionBoardOptionTone = 'neutral' | 'brand' | 'urgent';

export type DecisionBoardOption = {
  /**
   * Short label shown above the option title.
   */
  eyebrow?: string;
  /**
   * Dominant option title.
   */
  title: string;
  /**
   * Supporting explanation for the option.
   */
  description?: string;
  /**
   * Concise action cue shown beneath the option.
   */
  cue?: string;
  /**
   * Visual emphasis for the option.
   * @default 'neutral'
   */
  tone?: DecisionBoardOptionTone;
};

export interface DecisionBoardProps {
  /**
   * Stable test id for the outer board shell.
   */
  'data-testid'?: string;
  /**
   * Small context label for the routing moment.
   */
  eyebrow?: string;
  /**
   * Dominant decision prompt.
   */
  title: string;
  /**
   * Supporting explanation beneath the main title.
   */
  message?: string;
  /**
   * Optional service note or operator guidance.
   */
  serviceNote?: string;
  /**
   * Small set of visible next-step options.
   */
  options: DecisionBoardOption[];
  /**
   * Optional phone continuation for fuller navigation or private details.
   */
  qrHandoff?: DecisionBoardHandoff;
  /**
   * Background treatment for the board shell.
   * @default 'violet'
   */
  variant?: GradientVariant;
  /**
   * Additional classes for the outer board shell.
   */
  className?: string;
  /**
   * Additional classes for the inner board wrapper.
   */
  shellClassName?: string;
  /**
   * Additional classes for the primary message frame.
   */
  frameClassName?: string;
  /**
   * Additional classes for the options grid.
   */
  optionsClassName?: string;
  /**
   * Additional classes for the optional QR handoff block.
   */
  handoffClassName?: string;
}

const optionToneClasses: Record<DecisionBoardOptionTone, string> = {
  neutral: 'border-white/10 bg-white/5 text-white',
  brand:
    'border-blue-300/30 bg-gradient-to-br from-blue-500/18 via-cyan-500/12 to-slate-950/40 text-white',
  urgent:
    'border-fuchsia-300/30 bg-gradient-to-br from-violet-500/18 via-fuchsia-500/12 to-slate-950/40 text-white',
};

function createServiceNote(serviceNote?: string): ReactNode {
  if (!serviceNote) {
    return undefined;
  }

  return (
    <ActionStrip
      message={serviceNote}
      tone="neutral"
      position="left"
      className="max-w-none border-white/12 bg-white/6 px-5 py-5 shadow-none lg:px-6"
      data-testid="decision-board-service-note"
    />
  );
}

function getOptionGridClass(optionCount: number) {
  if (optionCount <= 1) {
    return 'grid-cols-1';
  }

  if (optionCount === 2) {
    return 'lg:grid-cols-2';
  }

  return 'lg:grid-cols-3';
}

/**
 * DecisionBoard
 *
 * Opinionated decision template for routing viewers between a small number of next actions.
 * Keeps one dominant prompt and a tightly bounded choice set that reads clearly at distance.
 */
export const DecisionBoard: FC<DecisionBoardProps> = ({
  'data-testid': dataTestId = 'decision-board',
  eyebrow,
  title,
  message,
  serviceNote,
  options,
  qrHandoff,
  variant = 'violet',
  className,
  shellClassName,
  frameClassName,
  optionsClassName,
  handoffClassName,
}) => {
  const action = createServiceNote(serviceNote);

  return (
    <SignageContainer
      variant={variant}
      className={cn('p-4 text-white sm:p-8 lg:p-16', className)}
      data-testid={dataTestId}
    >
      <div
        className={cn(
          'mx-auto flex min-h-full max-w-7xl flex-col gap-8 lg:gap-10',
          shellClassName,
        )}
      >
        <OneMessageFrame
          headline={title}
          supportingText={message}
          utility={eyebrow}
          action={action}
          className={cn('max-w-none', frameClassName)}
        />

        <section
          className={cn(
            'grid gap-4',
            getOptionGridClass(options.length),
            optionsClassName,
          )}
          data-testid="decision-board-options"
        >
          {options.map((option, index) => (
            <SignagePanel
              key={`${option.title}-${index}`}
              label={option.eyebrow}
              className={cn(
                'flex h-full min-h-[15rem] flex-col justify-between rounded-[1.75rem] p-6 shadow-[0_18px_56px_rgba(2,6,23,0.18)] lg:p-8',
                optionToneClasses[option.tone ?? 'neutral'],
              )}
              labelClassName="text-sm font-medium uppercase tracking-[0.28em] text-white/70 sm:text-base"
            >
              <div
                className="space-y-4"
                data-testid={`decision-board-option-${index}`}
              >
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {option.title}
                </h2>
                {option.description ? (
                  <p className="text-lg leading-relaxed text-slate-200 lg:text-2xl">
                    {option.description}
                  </p>
                ) : null}
              </div>

              {option.cue ? (
                <div className="pt-6">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.24em] text-white/90 sm:text-base lg:px-5 lg:py-3">
                    {option.cue}
                  </div>
                </div>
              ) : null}
            </SignagePanel>
          ))}
        </section>

        {qrHandoff ? (
          <QRHandoff
            {...qrHandoff}
            className={cn('max-w-none', handoffClassName)}
          />
        ) : null}
      </div>
    </SignageContainer>
  );
};
