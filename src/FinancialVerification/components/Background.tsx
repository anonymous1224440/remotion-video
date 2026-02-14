import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { COLORS } from "../data";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const gradientY = interpolate(frame, [0, durationInFrames], [35, 55], {
    extrapolateRight: "clamp",
  });

  const gridOpacity = interpolate(
    Math.sin(frame / (2 * fps)),
    [-1, 1],
    [0.025, 0.065],
  );

  const glowX = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [20, 80, 40],
    { extrapolateRight: "clamp" },
  );

  const glowOpacity = interpolate(
    Math.sin(frame / (3 * fps)),
    [-1, 1],
    [0.04, 0.1],
  );

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% ${gradientY}%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%, #050d18 100%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${COLORS.accent} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          left: `${glowX}%`,
          top: "30%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}40, transparent)`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
