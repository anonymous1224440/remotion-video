export const COLORS = {
  bg: "#0a0e1a",
  bgCard: "#111827",
  bgCardHover: "#1a2332",
  surface: "#1e293b",

  text: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",

  blue: "#3b82f6",
  blueDim: "rgba(59, 130, 246, 0.15)",
  blueGlow: "rgba(59, 130, 246, 0.4)",

  purple: "#8b5cf6",
  purpleDim: "rgba(139, 92, 246, 0.15)",
  purpleGlow: "rgba(139, 92, 246, 0.4)",

  green: "#22c55e",
  greenDim: "rgba(34, 197, 94, 0.15)",
  greenGlow: "rgba(34, 197, 94, 0.3)",

  cyan: "#06b6d4",
  cyanDim: "rgba(6, 182, 212, 0.15)",

  orange: "#f59e0b",
  orangeDim: "rgba(245, 158, 11, 0.15)",

  red: "#ef4444",
  redDim: "rgba(239, 68, 68, 0.15)",

  gradient1: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  gradient2: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  gradient3: "linear-gradient(135deg, #22c55e, #06b6d4)",
};

export const FPS = 30;

// Scene timing in seconds (converted to frames via FPS)
export const SCENES = {
  hook: { start: 0, duration: 5 },
  workflow1: { start: 5, duration: 20 },
  workflow2: { start: 25, duration: 20 },
  workflow3: { start: 45, duration: 20 },
  closing: { start: 65, duration: 10 },
} as const;

export const TOTAL_DURATION_FRAMES = 75 * FPS; // 2250 frames

export const TRANSITION_FRAMES = 15;
