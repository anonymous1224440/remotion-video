import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLORS } from "../data";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export const Scene1Introduction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(1.5 * fps),
  });

  const subtitleEntrance = spring({
    frame: frame - Math.round(1.2 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(1 * fps),
  });

  const lineWidth = interpolate(
    frame,
    [Math.round(0.5 * fps), Math.round(2 * fps)],
    [0, 400],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  const fadeOut = interpolate(
    frame,
    [durationInFrames - Math.round(1 * fps), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const iconScale = spring({
    frame: frame - Math.round(0.3 * fps),
    fps,
    config: { damping: 15, stiffness: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  const shimmerX = interpolate(
    frame,
    [Math.round(2 * fps), Math.round(4 * fps)],
    [-200, 1200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const particleOpacity = interpolate(
    frame,
    [Math.round(1 * fps), Math.round(2 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        opacity: fadeOut,
      }}
    >
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => {
        const x = 300 + i * 250;
        const baseY = 200 + (i % 3) * 200;
        const y =
          baseY + Math.sin((frame + i * 40) / (1.5 * fps)) * 30;
        const size = 3 + (i % 3) * 2;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: COLORS.accent,
              opacity: particleOpacity * (0.15 + (i % 3) * 0.1),
              filter: "blur(1px)",
            }}
          />
        );
      })}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: 16,
            border: `2px solid ${COLORS.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            transform: `scale(${iconScale})`,
            backgroundColor: COLORS.accentDim,
            boxShadow: `0 0 30px ${COLORS.accentGlow}`,
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="1.5"
          >
            <path d="M9 12l2 2 4-4" />
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: COLORS.textPrimary,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: -1,
              opacity: titleEntrance,
              transform: `translateY(${interpolate(titleEntrance, [0, 1], [30, 0])}px)`,
              margin: 0,
            }}
          >
            Automated Financial
            <br />
            <span style={{ color: COLORS.accent }}>Data Verification</span>
          </h1>

          {/* Shimmer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: shimmerX,
              width: 100,
              height: "100%",
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)`,
              transform: "skewX(-15deg)",
            }}
          />
        </div>

        {/* Divider line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
            marginTop: 4,
            marginBottom: 4,
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: COLORS.textSecondary,
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 700,
            opacity: subtitleEntrance,
            transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [20, 0])}px)`,
            margin: 0,
          }}
        >
          Ensuring accuracy between Bloomberg data
          <br />
          and official company reports
        </p>
      </div>
    </AbsoluteFill>
  );
};
