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

  // Icons fade out after converging
  const iconsFadeOut = interpolate(convergeProgress, [0.7, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Static content appears after converge
  const contentEntrance = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 200 },
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

  // Tagline + divider
  const tagEntrance = spring({
    frame,
    fps,
    delay: 65,
    config: { damping: 200 },
  });

  const workflows = [
    { icon: <PhoneIcon size={28} color={COLORS.blue} />, color: COLORS.blue, label: "AI Receptionist", startX: -300, startY: -300 },
    { icon: <MailIcon size={28} color={COLORS.purple} />, color: COLORS.purple, label: "Property Outreach", startX: 300, startY: -300 },
    { icon: <WrenchIcon size={28} color={COLORS.green} />, color: COLORS.green, label: "Repair Automation", startX: 0, startY: 300 },
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
              opacity: iconsFadeOut,
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

      {/* Static content - pure flex column, NO absolute positioning for children */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Workflow icons row */}
        <div
          style={{
            display: "flex",
            gap: 60,
            marginBottom: 36,
            opacity: contentEntrance,
            transform: `translateY(${(1 - contentEntrance) * 20}px)`,
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

        {/* Central SP logo - red circle */}
        <div
          style={{
            opacity: contentEntrance,
            transform: `scale(${interpolate(contentEntrance, [0, 1], [0.5, 1])})`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#e62528",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(230, 37, 40, 0.4), 0 0 80px rgba(230, 37, 40, 0.2)",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                fontFamily: "sans-serif",
              }}
            >
              sp
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            color: COLORS.text,
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: 0,
            marginBottom: 12,
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
            fontSize: 26,
            fontWeight: 600,
            margin: 0,
            marginBottom: 16,
            opacity: subEntrance,
            transform: `translateY(${(1 - subEntrance) * 15}px)`,
          }}
        >
          Automate your growth.
        </p>

        {/* Divider */}
        <div
          style={{
            width: interpolate(tagEntrance, [0, 1], [0, 160]),
            height: 2,
            background: COLORS.gradient1,
            borderRadius: 1,
            marginBottom: 16,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            color: COLORS.textSecondary,
            fontSize: 16,
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
