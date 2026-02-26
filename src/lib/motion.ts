export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const MOTION = {
  fast: { duration: 0.35, ease: EASE_OUT },
  base: { duration: 0.6, ease: EASE_OUT },
  slow: { duration: 0.8, ease: EASE_OUT },
} as const;


