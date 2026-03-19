/** Centralised timing constants (in frames at 30fps) */

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Scene durations in frames */
export const DURATIONS = {
  hook: 4 * FPS,          // 120 frames — 4s
  frustration: 6 * FPS,   // 180 frames — 6s
  reframe: 5 * FPS,       // 150 frames — 5s
  showcase: 9 * FPS,      // 270 frames — 9s
  toolkit: 6 * FPS,       // 180 frames — 6s
  constraints: 5 * FPS,   // 150 frames — 5s
  positioning: 5 * FPS,   // 150 frames — 5s
  openSource: 5 * FPS,    // 150 frames — 5s
  close: 4 * FPS,         // 120 frames — 4s
  credits: 3 * FPS,       //  90 frames — 3s
} as const;

/** Total video duration */
export const TOTAL_DURATION =
  DURATIONS.hook +
  DURATIONS.frustration +
  DURATIONS.reframe +
  DURATIONS.showcase +
  DURATIONS.toolkit +
  DURATIONS.constraints +
  DURATIONS.positioning +
  DURATIONS.openSource +
  DURATIONS.close +
  DURATIONS.credits;

/** Common animation timings */
export const MOTION = {
  /** Standard fade-in duration */
  fadeIn: 18,
  /** Exit fade */
  fadeOut: 12,
  /** Slide distance for major elements */
  slideUp: 24,
  /** Delay between staggered items */
  stagger: 6,
  /** Slow reveal for accent elements */
  accentReveal: 30,
  /** Quick pop for small elements */
  pop: 10,
} as const;
