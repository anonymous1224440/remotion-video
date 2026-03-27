import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { COLORS } from "../theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const gradientY = interpolate(frame, [0, durationInFrames], [35, 55], {
    extrapolateRight: "clamp",
  });

  const gridOpacity = interpolate(
    Math.sin(frame / (2 * fps)),
    [-1, 1],
    [0.02, 0.05],
  );

  // Blue orb
  const blueOrbX = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [20, 70, 35],
    { extrapolateRight: "clamp" },
  );
  const blueOrbOpacity = interpolate(
    Math.sin(frame / (3 * fps)),
    [-1, 1],
    [0.04, 0.12],
  );

  // Purple orb
  const purpleOrbX = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [75, 30, 60],
    { extrapolateRight: "clamp" },
  );
  const purpleOrbOpacity = interpolate(
    Math.sin(frame / (2.5 * fps) + 1),
    [-1, 1],
    [0.03, 0.09],
  );

  // Green orb
  const greenOrbY = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [70, 40, 65],
    { extrapolateRight: "clamp" },
  );
  const greenOrbOpacity = interpolate(
    Math.sin(frame / (3.5 * fps) + 2),
    [-1, 1],
    [0.02, 0.07],
  );

  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% ${gradientY}%, #111827 0%, ${COLORS.background} 70%, #050810 100%)`,
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${COLORS.blue}40 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.blue}40 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blue orb */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          left: `${blueOrbX}%`,
          top: "25%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${COLORS.blueGlow} 0%, transparent 70%)`,
          opacity: blueOrbOpacity,
          filter: "blur(80px)",
        }}
      />

      {/* Purple orb */}
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          left: `${purpleOrbX}%`,
          top: "55%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${COLORS.purpleGlow} 0%, transparent 70%)`,
          opacity: purpleOrbOpacity,
          filter: "blur(80px)",
        }}
      />

      {/* Green orb */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          left: "50%",
          top: `${greenOrbY}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${COLORS.greenGlow} 0%, transparent 70%)`,
          opacity: greenOrbOpacity,
          filter: "blur(80px)",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Bottom shine */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.blue}40, transparent)`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
