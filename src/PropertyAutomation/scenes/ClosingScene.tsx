import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../theme";
import { PhoneIcon, MailIcon, WrenchIcon } from "../components/Icons";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three workflow icons converging to center
  const convergeProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  // Central icon
  const centralEntrance = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 15, stiffness: 80 },
  });

  // Title
  const titleEntrance = spring({
    frame,
    fps,
    delay: 35,
    config: { damping: 200 },
  });

  // Subtitle
  const subEntrance = spring({
    frame,
    fps,
    delay: 50,
    config: { damping: 200 },
  });

  // Tagline
  const tagEntrance = spring({
    frame,
    fps,
    delay: 65,
    config: { damping: 200 },
  });

  const workflows = [
    { icon: <PhoneIcon size={28} color={COLORS.blue} />, color: COLORS.blue, label: "AI Receptionist", startX: -300, startY: -200 },
    { icon: <MailIcon size={28} color={COLORS.purple} />, color: COLORS.purple, label: "Property Outreach", startX: 300, startY: -200 },
    { icon: <WrenchIcon size={28} color={COLORS.green} />, color: COLORS.green, label: "Repair Automation", startX: 0, startY: 200 },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Converging workflow icons - moving phase */}
      {workflows.map((wf, i) => {
        const x = interpolate(convergeProgress, [0, 1], [wf.startX, 0]);
        const y = interpolate(convergeProgress, [0, 1], [wf.startY, 0]);
        return (
          <div
            key={`moving-${i}`}
            style={{
              position: "absolute",
              transform: `translate(${x}px, ${y}px)`,
              opacity: Math.max(0, 1 - convergeProgress * 1.5),
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: `${wf.color}22`,
                border: `1.5px solid ${wf.color}66`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${wf.color}40`,
              }}
            >
              {wf.icon}
            </div>
          </div>
        );
      })}

      {/* Static content - proper flex column layout to prevent overlap */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          padding: "60px 80px",
        }}
      >
        {/* Workflow icons row */}
        <div
          style={{
            display: "flex",
            gap: 60,
            marginBottom: 40,
            opacity: interpolate(convergeProgress, [0.8, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {workflows.map((wf, i) => (
            <div
              key={`final-${i}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `${wf.color}22`,
                  border: `1.5px solid ${wf.color}66`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 20px ${wf.color}40`,
                }}
              >
                {wf.icon}
              </div>
              <span style={{ color: COLORS.textSecondary, fontSize: 14, fontWeight: 500 }}>
                {wf.label}
              </span>
            </div>
          ))}
        </div>

        {/* Central SP logo */}
        <div
          style={{
            opacity: centralEntrance,
            transform: `scale(${interpolate(centralEntrance, [0, 1], [0.5, 1])})`,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: 28,
              background: COLORS.gradient1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 60px ${COLORS.blueGlow}, 0 0 120px ${COLORS.purpleGlow}`,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              SP
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            color: COLORS.text,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: 0,
            marginBottom: 16,
            textAlign: "center",
            opacity: titleEntrance,
            transform: `translateY(${(1 - titleEntrance) * 20}px)`,
          }}
        >
          Three systems.{" "}
          <span
            style={{
              background: COLORS.gradient1,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Fully automated.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: COLORS.text,
            fontSize: 32,
            fontWeight: 600,
            margin: 0,
            marginBottom: 20,
            opacity: subEntrance,
            transform: `translateY(${(1 - subEntrance) * 15}px)`,
          }}
        >
          Automate your growth.
        </p>

        {/* Divider */}
        <div
          style={{
            width: interpolate(tagEntrance, [0, 1], [0, 200]),
            height: 2,
            background: COLORS.gradient1,
            borderRadius: 1,
            marginBottom: 20,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            color: COLORS.textSecondary,
            fontSize: 20,
            fontWeight: 400,
            margin: 0,
            opacity: tagEntrance,
            transform: `translateY(${(1 - tagEntrance) * 10}px)`,
          }}
        >
          Built around how you already work.
        </p>
      </div>
    </AbsoluteFill>
  );
};
