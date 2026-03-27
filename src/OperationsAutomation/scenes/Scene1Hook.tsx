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

const PAIN_POINTS = [
  { text: "Hours wasted", color: COLORS.red },
  { text: "Money slipping away", color: COLORS.orange },
  { text: "Constant stress", color: COLORS.red },
  { text: "Mistakes happen", color: COLORS.orange },
  { text: "All from manual work", color: COLORS.red },
];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Chaos notifications (0-2s)
  const chaosEnd = Math.round(2 * fps);
  const isChaos = frame < chaosEnd;

  const chaosOpacity = interpolate(
    frame,
    [chaosEnd - 10, chaosEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Phase 2: Hook text (2-3s)
  const hookStart = chaosEnd;
  const hookEntrance = spring({
    frame: frame - hookStart - 3,
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(1 * fps),
  });

  // Phase 3: Pain points (3-6s)
  const painStart = Math.round(3 * fps);

  // Phase 4: Everything fades, "We fix that" (6-8s)
  const hookAndPainFade = interpolate(
    frame,
    [Math.round(5.5 * fps), Math.round(6 * fps)],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const fixStart = Math.round(6 * fps);
  const fixEntrance = spring({
    frame: frame - fixStart - 3,
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(1.2 * fps),
  });

  const showHookPhase = frame >= chaosEnd && frame < Math.round(6 * fps);
  const showFixPhase = frame >= fixStart;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Phase 1: Chaos notification bubbles */}
      {isChaos &&
        NOTIFICATIONS.map((notif, i) => {
          const staggerEntrance = spring({
            frame: frame - i * 3,
            fps,
            config: { damping: 15, stiffness: 170 },
            durationInFrames: Math.round(0.5 * fps),
          });

          const shakeX = Math.sin((frame + i * 17) * 0.3) * 6;
          const shakeY = Math.cos((frame + i * 23) * 0.25) * 5;
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
                border: `1px solid ${COLORS.red}40`,
                borderRadius: 12,
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: `0 4px 20px rgba(239, 68, 68, 0.15)`,
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

      {/* Phase 2+3: Hook text + Pain points */}
      {showHookPhase && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            opacity: hookAndPainFade,
          }}
        >
          {/* Hook headline */}
          <h1
            style={{
              fontSize: 54,
              fontWeight: 800,
              color: COLORS.textPrimary,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: -1,
              margin: 0,
              opacity: hookEntrance,
              transform: `translateY(${interpolate(hookEntrance, [0, 1], [30, 0])}px)`,
            }}
          >
            Manual work is{" "}
            <span style={{ color: COLORS.red }}>killing your growth</span>
          </h1>

          {/* Pain points — large, impactful */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            {PAIN_POINTS.map((point, i) => {
              const pointEntrance = spring({
                frame: frame - painStart - i * 10,
                fps,
                config: { damping: 200, stiffness: 170 },
                durationInFrames: Math.round(0.6 * fps),
              });

              const isLast = i === PAIN_POINTS.length - 1;
              const pulse = isLast
                ? 1 + Math.sin(frame * 0.15) * 0.03
                : 1;

              return (
                <div
                  key={i}
                  style={{
                    opacity: pointEntrance,
                    transform: `translateY(${interpolate(pointEntrance, [0, 1], [20, 0])}px) scale(${pulse})`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  {/* Red bar accent */}
                  <div
                    style={{
                      width: 4,
                      height: isLast ? 32 : 24,
                      borderRadius: 2,
                      backgroundColor: point.color,
                      boxShadow: `0 0 12px ${point.color}60`,
                      opacity: 0.8,
                    }}
                  />
                  <span
                    style={{
                      fontSize: isLast ? 30 : 26,
                      fontWeight: isLast ? 800 : 500,
                      color: isLast ? point.color : COLORS.textSecondary,
                      letterSpacing: isLast ? 1 : 0.3,
                      textTransform: isLast ? "uppercase" : "none",
                    }}
                  >
                    {point.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase 4: "We fix that" */}
      {showFixPhase && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            opacity: fixEntrance,
            transform: `translateY(${interpolate(fixEntrance, [0, 1], [30, 0])}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: COLORS.textPrimary,
              textAlign: "center",
              margin: 0,
            }}
          >
            We{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              fix that.
            </span>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
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
                  fontSize: 14,
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
                  fontSize: 16,
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                  letterSpacing: 1,
                }}
              >
                VPM NYC
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  color: COLORS.textMuted,
                  letterSpacing: 0.5,
                }}
              >
                Secured Properties
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
