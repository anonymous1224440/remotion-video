import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { staticFile, Img } from "remotion";
import { COLORS } from "../theme";

const WORKFLOW_ICONS = [
  {
    emoji: "\ud83d\udcc4",
    label: "Document Automation",
    color: COLORS.blue,
    startX: -300,
    startY: -150,
  },
  {
    emoji: "\ud83d\udce7",
    label: "Smart Follow-Ups",
    color: COLORS.purple,
    startX: 300,
    startY: -150,
  },
  {
    emoji: "\ud83d\udd27",
    label: "Repair Automation",
    color: COLORS.green,
    startX: 0,
    startY: 250,
  },
];

export const Scene5Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, Math.round(0.5 * fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Converging animation: icons fly to center
  const convergeProgress = interpolate(
    frame,
    [0, Math.round(2 * fps)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  // After converge, show final text
  const titleEntrance = spring({
    frame: frame - Math.round(2.5 * fps),
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(1.2 * fps),
  });

  const subtitleEntrance = spring({
    frame: frame - Math.round(4 * fps),
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(1 * fps),
  });

  const taglineEntrance = spring({
    frame: frame - Math.round(6 * fps),
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(1 * fps),
  });

  const dividerWidth = interpolate(
    frame,
    [Math.round(5 * fps), Math.round(7 * fps)],
    [0, 400],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  const logoEntrance = spring({
    frame: frame - Math.round(3 * fps),
    fps,
    config: { damping: 15, stiffness: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  // After converge, icons settle at top
  const iconsSettled = frame > Math.round(2 * fps);
  const iconsFadeUp = interpolate(
    frame,
    [Math.round(2 * fps), Math.round(2.5 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      {/* Converging icons */}
      {!iconsSettled &&
        WORKFLOW_ICONS.map((icon, i) => {
          const x = interpolate(convergeProgress, [0, 1], [icon.startX, 0]);
          const y = interpolate(convergeProgress, [0, 1], [icon.startY, 0]);
          const scale = interpolate(convergeProgress, [0, 0.8, 1], [0.6, 1.1, 1]);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "45%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  backgroundColor: icon.color + "20",
                  border: `2px solid ${icon.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 30px ${icon.color}40`,
                  fontSize: 28,
                }}
              >
                {icon.emoji}
              </div>
            </div>
          );
        })}

      {/* Settled icons row */}
      {iconsSettled && (
        <div
          style={{
            position: "absolute",
            top: 180,
            display: "flex",
            gap: 60,
            opacity: iconsFadeUp,
          }}
        >
          {WORKFLOW_ICONS.map((icon, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: icon.color + "20",
                  border: `1.5px solid ${icon.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 20px ${icon.color}40`,
                  fontSize: 24,
                }}
              >
                {icon.emoji}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: icon.color,
                  letterSpacing: 0.3,
                }}
              >
                {icon.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginTop: 60,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("logo.jpg")}
          style={{
            width: 130,
            height: 130,
            borderRadius: 18,
            transform: `scale(${logoEntrance})`,
            marginBottom: 8,
            objectFit: "contain",
          }}
        />

        {/* Title */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: COLORS.textPrimary,
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: -1,
            margin: 0,
            opacity: titleEntrance,
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [30, 0])}px)`,
          }}
        >
          Three systems.{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Fully automated.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: COLORS.textSecondary,
            textAlign: "center",
            margin: 0,
            opacity: subtitleEntrance,
            transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [20, 0])}px)`,
          }}
        >
          Automate your operations.
        </p>

        {/* Gradient Divider */}
        <div
          style={{
            width: dividerWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.blue}, ${COLORS.purple}, ${COLORS.green}, transparent)`,
            marginTop: 8,
            marginBottom: 8,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 300,
            color: COLORS.textMuted,
            textAlign: "center",
            margin: 0,
            opacity: taglineEntrance,
            transform: `translateY(${interpolate(taglineEntrance, [0, 1], [15, 0])}px)`,
          }}
        >
          Built around how you already work.
        </p>
      </div>
    </AbsoluteFill>
  );
};
