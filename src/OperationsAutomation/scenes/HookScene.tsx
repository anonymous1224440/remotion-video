import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../PropertyAutomation/theme";
import {
  MailIcon,
  DatabaseIcon,
  SendIcon,
  ChartIcon,
  ClockIcon,
  SearchIcon,
  SPLogo,
} from "../../PropertyAutomation/components/Icons";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Chaos (0-2s)
  const chaosEnd = 2 * fps;
  const inChaos = frame < chaosEnd;

  // Phase 2: Clean transition (2-5s)
  const cleanProgress = spring({
    frame: Math.max(0, frame - chaosEnd),
    fps,
    config: { damping: 200 },
  });

  // Chaos elements - floating operations notifications
  const chaosItems = [
    { icon: <MailIcon size={24} color="#f59e0b" />, x: 20, y: 25, label: "Download Statement" },
    { icon: <SendIcon size={24} color="#f59e0b" />, x: 75, y: 15, label: "Upload Document" },
    { icon: <DatabaseIcon size={24} color="#f59e0b" />, x: 55, y: 70, label: "Organize Folder" },
    { icon: <SearchIcon size={24} color="#ef4444" />, x: 15, y: 65, label: "Chase Client" },
    { icon: <ChartIcon size={24} color="#f59e0b" />, x: 82, y: 55, label: "Send Report" },
    { icon: <ClockIcon size={24} color="#ef4444" />, x: 40, y: 40, label: "Follow-Up Missing" },
  ];

  // Voiceover text
  const textEntrance = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });

  const textExit = spring({
    frame: Math.max(0, frame - chaosEnd),
    fps,
    config: { damping: 200 },
  });

  // "It can" text - appears after chaos
  const autoTextEntrance = spring({
    frame: Math.max(0, frame - chaosEnd - 10),
    fps,
    config: { damping: 200 },
  });

  // "It can" exits earlier so it doesn't bleed into next shot
  const autoTextExit = interpolate(
    frame,
    [4 * fps, 4.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const autoTextOpacity = autoTextEntrance * (1 - autoTextExit);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Chaos notifications */}
      {chaosItems.map((item, i) => {
        const itemDelay = i * 4;
        const itemEntrance = spring({
          frame,
          fps,
          delay: itemDelay,
          config: { damping: 15, stiffness: 80 },
        });

        const shake =
          inChaos
            ? Math.sin(frame * 0.5 + i * 2) * 3
            : 0;

        const exitScale = 1 - cleanProgress;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) scale(${itemEntrance * exitScale}) rotate(${shake}deg)`,
              opacity: itemEntrance * exitScale,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: 12,
              padding: "10px 16px",
              backdropFilter: "blur(8px)",
            }}
          >
            {item.icon}
            <span
              style={{
                color: COLORS.textSecondary,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      {/* Central text - hook question */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 10,
        }}
      >
        {/* First text - fades out */}
        <div
          style={{
            opacity: textEntrance * (1 - textExit),
            transform: `translateY(${(1 - textEntrance) * 30 + textExit * -30}px)`,
          }}
        >
          <h1
            style={{
              color: COLORS.text,
              fontSize: 52,
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            What if your entire
            <br />
            operation{" "}
            <span style={{ color: COLORS.blue }}>ran itself?</span>
          </h1>
        </div>

        {/* Second text - appears after chaos, exits before scene end */}
        <div
          style={{
            position: "absolute",
            opacity: autoTextOpacity,
            transform: `scale(${interpolate(autoTextEntrance, [0, 1], [0.8, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Secured Properties Logo */}
          <div style={{ filter: "drop-shadow(0 0 30px rgba(230, 37, 40, 0.4))" }}>
            <SPLogo size={100} />
          </div>
          <h1
            style={{
              color: COLORS.text,
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            It can.
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};
