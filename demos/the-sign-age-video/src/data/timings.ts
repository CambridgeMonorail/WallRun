/** Centralised timing constants (in frames at 30fps) */

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Scene durations in frames */
export const DURATIONS = {
  intro: 5 * FPS,        // 150 frames = 5s
  problem: 7 * FPS,      // 210 frames = 7s
  shift: 6 * FPS,        // 180 frames = 6s
  repoOverview: 8 * FPS, // 240 frames = 8s
  whyItMatters: 7 * FPS, // 210 frames = 7s
  outro: 5 * FPS,        // 150 frames = 5s
} as const;

/** Total video duration */
export const TOTAL_DURATION =
  DURATIONS.intro +
  DURATIONS.problem +
  DURATIONS.shift +
  DURATIONS.repoOverview +
  DURATIONS.whyItMatters +
  DURATIONS.outro;

/** Common animation timings */
export const MOTION = {
  fadeIn: 20,
  fadeOut: 15,
  slideUp: 18,
  staggerDelay: 8,
  calloutDelay: 15,
} as const;

/** Scene start frames (cumulative) */
export const SCENE_STARTS = {
  intro: 0,
  problem: DURATIONS.intro,
  shift: DURATIONS.intro + DURATIONS.problem,
  repoOverview: DURATIONS.intro + DURATIONS.problem + DURATIONS.shift,
  whyItMatters:
    DURATIONS.intro +
    DURATIONS.problem +
    DURATIONS.shift +
    DURATIONS.repoOverview,
  outro:
    DURATIONS.intro +
    DURATIONS.problem +
    DURATIONS.shift +
    DURATIONS.repoOverview +
    DURATIONS.whyItMatters,
} as const;
