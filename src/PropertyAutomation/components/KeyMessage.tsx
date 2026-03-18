import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

type KeyMessageProps = {
  text: string;
  delay: number;
  color?: string;
};

export const KeyMessage: React.FC<KeyMessageProps> = ({
  text,
  delay,
  color = COLORS.blue,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity: entrance,
        transform: `translateX(${(1 - entrance) * 20}px)`,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px ${color}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          color: COLORS.text,
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
