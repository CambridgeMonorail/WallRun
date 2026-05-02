import { FC, ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface SignagePanelProps {
  /**
   * Optional panel label shown above the body
   */
  label?: string;
  /**
   * Panel contents
   */
  children: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;
}

export const SignagePanel: FC<SignagePanelProps> = ({
  label,
  children,
  className,
  labelClassName,
}) => {
  return (
    <section
      className={cn(
        'rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:p-10',
        className,
      )}
      data-testid="signage-panel"
    >
      {label && (
        <div
          className={cn(
            'text-lg text-white/70 sm:text-xl lg:text-2xl',
            labelClassName,
          )}
        >
          {label}
        </div>
      )}
      {children}
    </section>
  );
};
