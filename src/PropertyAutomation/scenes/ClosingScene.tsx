import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../theme";
import { PhoneIcon, MailIcon, WrenchIcon, ZapIcon } from "../components/Icons";

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
    { icon: <PhoneIcon size={28} color={COLORS.blue} />, color: COLORS.blue, label: "AI Receptionist", startX: -300, startY: -100 },
    { icon: <MailIcon size={28} color={COLORS.purple} />, color: COLORS.purple, label: "Property Outreach", startX: 300, startY: -100 },
    { icon: <WrenchIcon size={28} color={COLORS.green} />, color: COLORS.green, label: "Repair Automation", startX: 0, startY: 200 },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Converging workflow icons */}
      {workflows.map((wf, i) => {
        const x = interpolate(convergeProgress, [0, 1], [wf.startX, 0]);
        const y = interpolate(convergeProgress, [0, 1], [wf.startY, 0]);
        // After converge, show them in a row above center
        const finalOpacity = interpolate(convergeProgress, [0.8, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const finalX = (i - 1) * 200;
        const finalY = -140;

        return (
          <React.Fragment key={i}>
            {/* Moving version */}
            <div
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
            {/* Final position */}
            <div
              style={{
                position: "absolute",
                transform: `translate(${finalX}px, ${finalY}px)`,
                opacity: finalOpacity,
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
          </React.Fragment>
        );
      })}

      {/* Central merge icon */}
      <div
        style={{
          position: "absolute",
          opacity: centralEntrance,
          transform: `scale(${interpolate(centralEntrance, [0, 1], [0.5, 1])})`,
          marginTop: 20,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            background: COLORS.gradient1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 60px ${COLORS.blueGlow}, 0 0 120px ${COLORS.purpleGlow}`,
          }}
        >
          <ZapIcon size={40} color="#fff" />
        </div>
      </div>

      {/* Title text */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginTop: 160,
        }}
      >
        <h1
          style={{
            color: COLORS.text,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: 0,
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

        <p
          style={{
            color: COLORS.text,
            fontSize: 32,
            fontWeight: 600,
            margin: 0,
            opacity: subEntrance,
            transform: `translateY(${(1 - subEntrance) * 15}px)`,
          }}
        >
          Live in weeks.
        </p>

        {/* Divider */}
        <div
          style={{
            width: interpolate(tagEntrance, [0, 1], [0, 200]),
            height: 2,
            background: COLORS.gradient1,
            borderRadius: 1,
            marginTop: 8,
            marginBottom: 8,
          }}
        />

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
