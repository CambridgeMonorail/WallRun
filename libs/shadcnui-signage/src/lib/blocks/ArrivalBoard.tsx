import type { FC, ReactNode } from 'react';
import { SignageContainer } from '../layouts/SignageContainer';
import type { GradientVariant } from '../layouts/SignageContainer';
import { OneMessageFrame } from './OneMessageFrame';
import { QRHandoff, type QRHandoffProps } from './QRHandoff';
import { cn } from '../utils/cn';

export type ArrivalBoardHandoff = Pick<
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

export interface ArrivalBoardProps {
  /**
   * Stable test id for the outer board shell.
   */
  'data-testid'?: string;
  /**
   * Small context label shown ahead of the main arrival message.
   */
  eyebrow?: string;
  /**
   * Dominant arrival message.
   */
  title: string;
  /**
   * Supporting context below the main message.
   */
  message?: string;
  /**
   * Single clear next step for the viewer.
   */
  nextStep?: string;
  /**
   * Optional service or reassurance note.
   */
  serviceNote?: string;
  /**
   * Optional phone-continuation handoff.
   */
  qrHandoff?: ArrivalBoardHandoff;
  /**
   * Background treatment for the board shell.
   * @default 'blue'
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
   * Additional classes for the optional QR handoff block.
   */
  handoffClassName?: string;
}

function createAction(nextStep?: string, serviceNote?: string): ReactNode {
  if (!nextStep && !serviceNote) {
    return undefined;
  }

  return (
    <div className="space-y-4">
      {nextStep ? (
        <div className="inline-flex rounded-full border border-white/15 bg-white px-6 py-3 text-lg font-semibold text-slate-950 shadow-[0_16px_40px_rgba(255,255,255,0.08)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl">
          {nextStep}
        </div>
      ) : null}
      {serviceNote ? (
        <p className="max-w-3xl text-lg leading-relaxed text-slate-300 lg:text-xl">
          {serviceNote}
        </p>
      ) : null}
    </div>
  );
}

/**
 * ArrivalBoard
 *
 * Opinionated arrival template for reception, clinic, and event-entry screens.
 * Keeps one dominant message, one next step, and an optional phone continuation.
 */
export const ArrivalBoard: FC<ArrivalBoardProps> = ({
  'data-testid': dataTestId = 'arrival-board',
  eyebrow,
  title,
  message,
  nextStep,
  serviceNote,
  qrHandoff,
  variant = 'blue',
  className,
  shellClassName,
  frameClassName,
  handoffClassName,
}) => {
  const action = createAction(nextStep, serviceNote);

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
        {eyebrow ? (
          <div className="self-start rounded-full border border-white/12 bg-white/6 px-5 py-2.5 shadow-[0_18px_56px_rgba(2,6,23,0.18)] backdrop-blur-sm sm:px-6 lg:px-7">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-100/85 sm:text-base lg:text-lg">
              {eyebrow}
            </p>
          </div>
        ) : null}

        <OneMessageFrame
          headline={title}
          supportingText={message}
          action={action}
          className={cn('max-w-none', frameClassName)}
        />

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
