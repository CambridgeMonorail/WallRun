import { type FC, type ReactNode } from 'react';
import { playerConfig, type DisplayOrientation } from '../config';

interface DisplayRotationProps {
  children: ReactNode;
  orientation?: DisplayOrientation;
}

/**
 * DisplayRotation Component
 *
 * Wraps the application content and applies CSS rotation to match
 * the physical display orientation.
 *
 * This is the standard BrightSign technique for handling portrait displays.
 * The rotation is applied via CSS transform, which is more reliable than
 * trying to rotate at the BrightScript level.
 *
 * @example
 * ```tsx
 * <DisplayRotation orientation="portrait-left">
 *   <App />
 * </DisplayRotation>
 * ```
 */
export const DisplayRotation: FC<DisplayRotationProps> = ({
  children,
  orientation = playerConfig.displayOrientation,
}) => {
  // No rotation needed for landscape
  if (orientation === 'landscape') {
    return <>{children}</>;
  }

  // Apply rotation wrapper for non-landscape orientations
  return (
    <div className="display-rotation-wrapper" data-orientation={orientation}>
      {children}
    </div>
  );
};
