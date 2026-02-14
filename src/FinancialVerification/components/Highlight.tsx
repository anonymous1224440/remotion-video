import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data";

type Props = {
  status: "match" | "mismatch" | "corrected" | "neutral";
  delay?: number;
  children: React.ReactNode;
};

export const Highlight: React.FC<Props> = ({
  status,
  delay = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (status === "neutral") {
    return <>{children}</>;
  }

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 200 },
    durationInFrames: 20,
  });

  const pulsePhase = Math.sin((frame - delay) * 0.1);
  const glowIntensity = interpolate(pulsePhase, [-1, 1], [0.3, 0.7]);

  const isSuccess = status === "match" || status === "corrected";
  const color = isSuccess ? COLORS.success : COLORS.error;
  const glowColor = isSuccess ? COLORS.successGlow : COLORS.errorGlow;
  const bgColor = isSuccess ? COLORS.successDim : COLORS.errorDim;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`,
        opacity: entrance,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -4,
          backgroundColor: bgColor,
          border: `1.5px solid ${color}60`,
          borderRadius: 6,
          boxShadow: `0 0 ${12 * glowIntensity}px ${glowColor}`,
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          color,
          fontWeight: 600,
        }}
      >
        {children}
      </span>
    </div>
  );
};
