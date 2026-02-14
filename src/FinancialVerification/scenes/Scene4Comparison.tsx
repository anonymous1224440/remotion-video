import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { ComparisonView } from "../components/ComparisonView";
import { COLORS } from "../data";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

export const Scene4Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, Math.round(0.5 * fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - Math.round(1 * fps), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const headerSlide = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  const revealProgress = interpolate(
    frame,
    [Math.round(3 * fps), Math.round(14 * fps)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    },
  );

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        opacity: fadeIn * fadeOut,
        padding: "50px 60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginBottom: 24,
          opacity: headerSlide,
          transform: `translateY(${interpolate(headerSlide, [0, 1], [-20, 0])}px)`,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="1.5"
        >
          <rect x="2" y="3" width="8" height="18" rx="1" />
          <rect x="14" y="3" width="8" height="18" rx="1" />
          <path d="M10 12h4" />
        </svg>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: 0,
          }}
        >
          Side-by-Side{" "}
          <span style={{ color: COLORS.accent }}>Comparison</span>
        </h2>
      </div>

      {/* Comparison tables */}
      <div style={{ flex: 1, position: "relative" }}>
        <ComparisonView revealProgress={revealProgress} />
      </div>
    </AbsoluteFill>
  );
};
