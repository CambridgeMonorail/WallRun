import type { FC } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '../utils/cn';
import { ShortUrlCallout } from './ShortUrlCallout';

export type QRCodeCalloutSize = 'sm' | 'md' | 'lg';
export type QRCodeCalloutErrorCorrection = 'L' | 'M' | 'Q' | 'H';

export type QRCodeCalloutProps = {
  value: string;
  label: string;
  instruction?: string;
  shortUrl?: string;
  size?: QRCodeCalloutSize;
  errorCorrectionLevel?: QRCodeCalloutErrorCorrection;
  className?: string;
};

const qrSizeMap: Record<QRCodeCalloutSize, number> = {
  sm: 144,
  md: 192,
  lg: 256,
};

/**
 * Scan-safe QR callout with visible destination context and optional short URL fallback.
 */
export const QRCodeCallout: FC<QRCodeCalloutProps> = ({
  value,
  label,
  instruction = 'Scan to continue on your phone',
  shortUrl,
  size = 'md',
  errorCorrectionLevel = 'M',
  className,
}) => {
  return (
    <section
      className={cn(
        'flex w-full max-w-[26rem] flex-col items-center gap-5 rounded-[2rem] border border-white/10 bg-slate-950/72 p-6 text-center shadow-[0_22px_72px_rgba(2,6,23,0.28)] lg:p-8',
        className,
      )}
      data-testid="qr-code-callout"
      data-size={size}
    >
      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-[0.28em] text-slate-300 sm:text-sm">
          {label}
        </div>
        <p className="text-lg font-medium leading-relaxed text-slate-100 sm:text-xl">
          {instruction}
        </p>
      </div>

      <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_16px_40px_rgba(255,255,255,0.08)]">
        <QRCodeSVG
          aria-label={`${label} QR code`}
          bgColor="#ffffff"
          fgColor="#020617"
          level={errorCorrectionLevel}
          marginSize={1}
          size={qrSizeMap[size]}
          value={value}
        />
      </div>

      {shortUrl ? (
        <ShortUrlCallout
          url={shortUrl}
          label={label}
          prefix="Or type"
          variant="strip"
          className="justify-center bg-white/4"
        />
      ) : null}
    </section>
  );
};
