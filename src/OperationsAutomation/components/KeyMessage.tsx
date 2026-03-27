import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";

type KeyMessageProps = {
  messages: string[];
  color: string;
  delayFrames?: number;
};

export const KeyMessage: React.FC<KeyMessageProps> = ({
  messages,
  color,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {messages.map((msg, i) => {
        const entrance = spring({
          frame: frame - delayFrames - i * 6,
          fps,
          config: { damping: 200, stiffness: 170 },
          durationInFrames: Math.round(0.6 * fps),
        });

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: entrance,
              transform: `translateX(${interpolate(entrance, [0, 1], [20, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}60`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: COLORS.textSecondary,
                lineHeight: 1.4,
              }}
            >
              {msg}
            </span>
          </div>
        );
      })}
    </div>
  );
};
