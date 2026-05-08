import type { FC } from 'react';
import { ActionStrip, type ActionStripTone } from '../primitives/ActionStrip';
import { QRCodeCallout } from '../primitives/QRCodeCallout';
import { cn } from '../utils/cn';

export type QRHandoffProps = {
  title: string;
  description: string;
  qrValue: string;
  qrLabel: string;
  qrInstruction?: string;
  shortUrl?: string;
  eyebrow?: string;
  tone?: ActionStripTone;
  className?: string;
};

/**
 * Composed phone-handoff surface for signage screens that need QR plus explanation.
 */
export const QRHandoff: FC<QRHandoffProps> = ({
  title,
  description,
  qrValue,
  qrLabel,
  qrInstruction,
  shortUrl,
  eyebrow = 'Continue on your phone',
  tone = 'brand',
  className,
}) => {
  return (
    <section
      className={cn(
        'grid w-full gap-6 rounded-[2rem] border border-white/10 bg-slate-950/58 p-6 shadow-[0_22px_70px_rgba(2,6,23,0.3)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-8',
        className,
      )}
      data-testid="qr-handoff"
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="text-xs font-medium uppercase tracking-[0.28em] text-slate-300 sm:text-sm">
            {eyebrow}
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>

        <ActionStrip
          message={description}
          tone={tone}
          position="left"
          className="max-w-none border-white/12 bg-white/6 px-5 py-5 shadow-none lg:px-6"
          data-testid="qr-handoff-action-strip"
        />
      </div>

      <div className="flex justify-center lg:justify-end">
        <QRCodeCallout
          value={qrValue}
          label={qrLabel}
          instruction={qrInstruction}
          shortUrl={shortUrl}
        />
      </div>
    </section>
  );
};
