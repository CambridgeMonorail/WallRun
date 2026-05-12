import type { FC, ReactNode } from 'react';
import type { ActionStripTone } from '../primitives/ActionStrip';
import { ActionStrip } from '../primitives/ActionStrip';
import { SignageContainer } from '../layouts/SignageContainer';
import type { GradientVariant } from '../layouts/SignageContainer';
import { OneMessageFrame } from './OneMessageFrame';
import { QRHandoff, type QRHandoffProps } from './QRHandoff';
import { cn } from '../utils/cn';

export type WaitingRoomBoardHandoff = Pick<
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

export type WaitingRoomBoardUpdate = {
  /**
   * Short service update shown below the main waiting message.
   */
  message: string;
  /**
   * Visual emphasis for the service update.
   * @default 'neutral'
   */
  tone?: ActionStripTone;
};

export interface WaitingRoomBoardProps {
  /**
   * Stable test id for the outer board shell.
   */
  'data-testid'?: string;
  /**
   * Small context label for the waiting area.
   */
  eyebrow?: string;
  /**
   * Dominant waiting-room instruction.
   */
  title: string;
  /**
   * Supporting explanation beneath the title.
   */
  message?: string;
  /**
   * Brief reassurance or expectation-setting copy.
   */
  reassurance?: string;
  /**
   * Optional label above the wait summary.
   * @default 'Estimated wait'
   */
  waitLabel?: string;
  /**
   * Large visible wait summary for the dwell space.
   */
  estimatedWait?: string;
  /**
   * Supporting note below the wait summary.
   */
  waitDetail?: string;
  /**
   * Lightweight service updates that do not displace the main message.
   */
  updates?: WaitingRoomBoardUpdate[];
  /**
   * Optional phone continuation for forms, intake, or service details.
   */
  qrHandoff?: WaitingRoomBoardHandoff;
  /**
   * Background treatment for the board shell.
   * @default 'teal'
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
   * Additional classes for the update grid.
   */
  updatesClassName?: string;
  /**
   * Additional classes for the optional QR handoff block.
   */
  handoffClassName?: string;
}

function createWaitingAction(reassurance?: string): ReactNode {
  if (!reassurance) {
    return undefined;
  }

  return (
    <ActionStrip
      message={reassurance}
      tone="neutral"
      position="left"
      className="max-w-none border-white/12 bg-white/6 px-5 py-5 shadow-none lg:px-6"
      data-testid="waiting-room-reassurance"
    />
  );
}

function createWaitPanel(
  estimatedWait?: string,
  waitLabel = 'Estimated wait',
  waitDetail?: string,
): ReactNode {
  if (!estimatedWait && !waitDetail) {
    return undefined;
  }

  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-[1.75rem] border border-white/12 bg-white/6 p-6 text-left shadow-[0_18px_56px_rgba(2,6,23,0.18)]"
      data-testid="waiting-room-estimated-wait"
    >
      <div className="space-y-3">
        <div className="text-sm font-medium uppercase tracking-[0.28em] text-teal-100/80 sm:text-base">
          {waitLabel}
        </div>
        {estimatedWait ? (
          <div className="text-6xl font-semibold tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
            {estimatedWait}
          </div>
        ) : null}
      </div>
      {waitDetail ? (
        <p className="max-w-md text-lg leading-relaxed text-slate-200 lg:text-2xl">
          {waitDetail}
        </p>
      ) : null}
    </div>
  );
}

/**
 * WaitingRoomBoard
 *
 * Opinionated waiting-room template for service desks, clinics, and lounges.
 * Keeps expectations clear while allowing a small number of lightweight updates.
 */
export const WaitingRoomBoard: FC<WaitingRoomBoardProps> = ({
  'data-testid': dataTestId = 'waiting-room-board',
  eyebrow,
  title,
  message,
  reassurance,
  waitLabel,
  estimatedWait,
  waitDetail,
  updates,
  qrHandoff,
  variant = 'teal',
  className,
  shellClassName,
  frameClassName,
  updatesClassName,
  handoffClassName,
}) => {
  const action = createWaitingAction(reassurance);
  const waitPanel = createWaitPanel(estimatedWait, waitLabel, waitDetail);

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
          media={waitPanel}
          className={cn('max-w-none', frameClassName)}
        />

        {updates && updates.length > 0 ? (
          <section
            className={cn('grid gap-4 lg:grid-cols-2', updatesClassName)}
            data-testid="waiting-room-updates"
          >
            {updates.map((update, index) => (
              <ActionStrip
                key={`${update.message}-${index}`}
                message={update.message}
                tone={update.tone ?? 'neutral'}
                position="left"
                className="max-w-none"
                data-testid={`waiting-room-update-${index}`}
              />
            ))}
          </section>
        ) : null}

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
