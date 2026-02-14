import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data";

type Props = {
  oldValue: string;
  newValue: string;
  progress: number;
  delay?: number;
};

export const AnimatedNumber: React.FC<Props> = ({
  oldValue,
  newValue,
  progress,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 20,
  });

  const oldOpacity = interpolate(progress, [0, 0.3, 0.5], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const newOpacity = interpolate(progress, [0.5, 0.7, 1], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const oldScale = interpolate(progress, [0.3, 0.5], [1, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const newScale = interpolate(progress, [0.5, 0.7], [1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(progress, [0.5, 0.7, 1.0], [0, 1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const strikethrough = interpolate(progress, [0.15, 0.4], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 90,
        height: 36,
        opacity: entrance,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: 6,
          backgroundColor: `rgba(34, 197, 94, ${0.1 * glowIntensity})`,
          boxShadow: `0 0 ${20 * glowIntensity}px ${COLORS.successGlow}`,
          opacity: glowIntensity,
        }}
      />

      <span
        style={{
          position: "absolute",
          color: COLORS.error,
          fontWeight: 600,
          fontSize: 15,
          fontFamily: "'Courier New', monospace",
          opacity: oldOpacity,
          transform: `scale(${oldScale})`,
          textDecoration: "none",
        }}
      >
        {oldValue}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `${strikethrough}%`,
            height: 2,
            backgroundColor: COLORS.error,
            transform: "translateY(-50%)",
          }}
        />
      </span>

      <span
        style={{
          position: "absolute",
          color: COLORS.success,
          fontWeight: 700,
          fontSize: 15,
          fontFamily: "'Courier New', monospace",
          opacity: newOpacity,
          transform: `scale(${newScale})`,
        }}
      >
        {newValue}
      </span>
    </div>
  );
};
