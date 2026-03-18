import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

type FlowStepProps = {
  icon: React.ReactNode;
  label: string;
  delay: number;
  color?: string;
  glowColor?: string;
  showConnector?: boolean;
};

export const FlowStep: React.FC<FlowStepProps> = ({
  icon,
  label,
  delay,
  color = COLORS.blue,
  glowColor = COLORS.blueGlow,
  showConnector = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = entrance;

  // Connector arrow animation
  const connectorProgress = spring({
    frame,
    fps,
    delay: delay + 8,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          minWidth: 90,
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${color}22, ${color}44)`,
            border: `1.5px solid ${color}66`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        >
          {icon}
        </div>
        {/* Label */}
        <span
          style={{
            color: COLORS.textSecondary,
            fontSize: 13,
            fontWeight: 500,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 90,
          }}
        >
          {label}
        </span>
      </div>
      {/* Connector arrow */}
      {showConnector && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            opacity: connectorProgress,
            marginBottom: 20,
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: `linear-gradient(90deg, ${color}88, ${color}22)`,
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: `6px solid ${color}88`,
            }}
          />
        </div>
      )}
    </div>
  );
};
