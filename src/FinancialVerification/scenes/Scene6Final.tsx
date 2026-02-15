import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLORS } from "../data";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export const Scene6Final: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, Math.round(0.5 * fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleEntrance = spring({
    frame: frame - Math.round(0.5 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(1.5 * fps),
  });

  const subtitleEntrance = spring({
    frame: frame - Math.round(2 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(1 * fps),
  });

  const lineWidth = interpolate(
    frame,
    [Math.round(1.5 * fps), Math.round(3.5 * fps)],
    [0, 400],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const shieldScale = spring({
    frame: frame - Math.round(0.3 * fps),
    fps,
    config: { damping: 15, stiffness: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        opacity: fadeIn,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Final title overlay */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          zIndex: 10,
          opacity: titleEntrance,
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 18,
            border: `2px solid ${COLORS.success}`,
            backgroundColor: COLORS.successDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${shieldScale})`,
            boxShadow: `0 0 40px ${COLORS.successGlow}`,
            marginBottom: 10,
          }}
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.success}
            strokeWidth="1.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: COLORS.textPrimary,
            textAlign: "center",
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: -0.5,
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [30, 0])}px)`,
          }}
        >
          Zuverlässig. Automatisiert.{" "}
          <span style={{ color: COLORS.success }}>Verifiziert.</span>
        </h1>

        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.success}, transparent)`,
            marginTop: 6,
          }}
        />

        <p
          style={{
            fontSize: 26,
            fontWeight: 300,
            color: COLORS.textSecondary,
            textAlign: "center",
            margin: 0,
            opacity: subtitleEntrance,
            transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [15, 0])}px)`,
          }}
        >
          Finanzdaten, denen Sie vertrauen können.
        </p>
      </div>
    </AbsoluteFill>
  );
};
