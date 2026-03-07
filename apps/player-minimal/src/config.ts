/**
 * Player Configuration
 * 
 * These settings control display orientation and other player-specific behaviors.
 */

/**
 * Display orientation configuration
 * 
 * - 'landscape': Standard horizontal display (default)
 * - 'portrait-left': Display rotated 90° counterclockwise (most common)
 * - 'portrait-right': Display rotated 90° clockwise
 * - 'inverted': Display rotated 180° (upside down)
 */
export type DisplayOrientation = 'landscape' | 'portrait-left' | 'portrait-right' | 'inverted';

export interface PlayerConfig {
  /**
   * Display orientation for the signage display.
   * Change this value to match your physical display rotation.
   */
  displayOrientation: DisplayOrientation;
  
  /**
   * Enable debug logging to console
   */
  debug: boolean;
}

/**
 * Default player configuration
 * 
 * CHANGE displayOrientation TO MATCH YOUR DISPLAY:
 * - 'landscape' for horizontal displays
 * - 'portrait-left' for displays rotated 90° CCW (most common portrait)
 * - 'portrait-right' for displays rotated 90° CW
 * - 'inverted' for upside-down displays
 */
export const playerConfig: PlayerConfig = {
  displayOrientation: 'portrait-right', // For display rotated 90° CCW (office monitor)
  debug: false,
};
