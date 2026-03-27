import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";

type FlowStepProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  index: number;
  delayFrames?: number;
  isLast?: boolean;
};

export const FlowStep: React.FC<FlowStepProps> = ({
  icon,
  label,
  color,
  index,
  delayFrames = 0,
  isLast = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames - index * 8,
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(0.8 * fps),
  });

  const arrowEntrance = spring({
    frame: frame - delayFrames - index * 8 - 6,
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(0.6 * fps),
  });

  const colorDim = color + "25";
  const colorGlow = color + "60";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [15, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          width: 80,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            border: `1.5px solid ${color}`,
            backgroundColor: colorDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 20px ${colorGlow}`,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.textSecondary,
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: 0.3,
          }}
        >
          {label}
        </span>
      </div>

      {!isLast && (
        <div
          style={{
            width: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: arrowEntrance,
            marginBottom: 18,
          }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path
              d="M0 6h16M12 1l5 5-5 5"
              stroke={COLORS.textMuted}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
