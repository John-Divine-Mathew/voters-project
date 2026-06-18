declare module "canvas-confetti" {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    ticks?: number;
    gravity?: number;
    drift?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    disableForReducedMotion?: boolean;
  }

  interface CanvasConfetti {
    (options?: ConfettiOptions): boolean;
  }

  const confetti: CanvasConfetti;
  export default confetti;
}
