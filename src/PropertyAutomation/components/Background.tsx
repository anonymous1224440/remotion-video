import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = frame / durationInFrames;

  // Slow-moving gradient orbs
  const orb1X = 30 + Math.sin(progress * Math.PI * 2) * 15;
  const orb1Y = 25 + Math.cos(progress * Math.PI * 1.5) * 10;
  const orb2X = 70 + Math.cos(progress * Math.PI * 2.5) * 12;
  const orb2Y = 65 + Math.sin(progress * Math.PI * 1.8) * 15;

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Gradient orb 1 - blue */}
      <div
        style={{
          position: "absolute",
          left: `${orb1X}%`,
          top: `${orb1Y}%`,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.blueGlow} 0%, transparent 70%)`,
          filter: "blur(100px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Gradient orb 2 - purple */}
      <div
        style={{
          position: "absolute",
          left: `${orb2X}%`,
          top: `${orb2Y}%`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.purpleGlow} 0%, transparent 70%)`,
          filter: "blur(100px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
