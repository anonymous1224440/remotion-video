import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS } from "../theme";

const NOTIFICATIONS = [
  { emoji: "\ud83d\udce5", text: "Download Statement" },
  { emoji: "\ud83d\udce4", text: "Upload Document" },
  { emoji: "\ud83d\udcc1", text: "Organize Folder" },
  { emoji: "\ud83d\udce7", text: "Chase Client" },
  { emoji: "\ud83d\udcca", text: "Send Report" },
  { emoji: "\ud83d\udce9", text: "Follow-Up Missing" },
];

const POSITIONS = [
  { x: 200, y: 180 },
  { x: 1400, y: 250 },
  { x: 600, y: 650 },
  { x: 1100, y: 150 },
  { x: 350, y: 420 },
  { x: 1300, y: 550 },
];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chaosEnd = Math.round(2 * fps);
  const isChaos = frame < chaosEnd;

  // Chaos phase: notifications float and shake
  const chaosOpacity = interpolate(
    frame,
    [chaosEnd - 10, chaosEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Clean phase
  const cleanStart = chaosEnd;
  const textEntrance = spring({
    frame: frame - cleanStart - 5,
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(1.2 * fps),
  });

  const logoEntrance = spring({
    frame: frame - cleanStart - Math.round(1.5 * fps),
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(1 * fps),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Chaos phase — notification bubbles */}
      {isChaos &&
        NOTIFICATIONS.map((notif, i) => {
          const staggerEntrance = spring({
            frame: frame - i * 3,
            fps,
            config: { damping: 15, stiffness: 170 },
            durationInFrames: Math.round(0.5 * fps),
          });

          const shakeX = Math.sin((frame + i * 17) * 0.3) * 4;
          const shakeY = Math.cos((frame + i * 23) * 0.25) * 3;
          const floatY = Math.sin((frame + i * 40) / (fps * 0.8)) * 12;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: POSITIONS[i].x,
                top: POSITIONS[i].y + floatY,
                transform: `translate(${shakeX}px, ${shakeY}px) scale(${staggerEntrance})`,
                opacity: chaosOpacity * staggerEntrance,
                backgroundColor: COLORS.bgCard,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
              }}
            >
              <span style={{ fontSize: 20 }}>{notif.emoji}</span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: COLORS.textSecondary,
                }}
              >
                {notif.text}
              </span>
            </div>
          );
        })}

      {/* Fading out chaos overlay */}
      {!isChaos && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Main question text */}
          <h1
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.textPrimary,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: -1,
              margin: 0,
              opacity: textEntrance,
              transform: `translateY(${interpolate(textEntrance, [0, 1], [30, 0])}px)`,
            }}
          >
            What if your entire operation{" "}
            <span style={{ color: COLORS.blue }}>ran itself?</span>
          </h1>

          {/* Logo + "It can." */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: logoEntrance,
              transform: `translateY(${interpolate(logoEntrance, [0, 1], [20, 0])}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* VPM NYC Logo placeholder */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: COLORS.blueDim,
                  border: `1.5px solid ${COLORS.blue}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 20px ${COLORS.blueGlow}`,
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: COLORS.blue,
                    letterSpacing: -0.5,
                  }}
                >
                  SP
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    letterSpacing: 1,
                  }}
                >
                  VPM NYC
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: COLORS.textMuted,
                    letterSpacing: 0.5,
                  }}
                >
                  Secured Properties
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.textPrimary,
                marginTop: 8,
              }}
            >
              It can.
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
