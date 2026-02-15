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
    [0, 500],
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
    [-200, 1400],
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
      {[...Array(8)].map((_, i) => {
        const x = 200 + i * 220;
        const baseY = 150 + (i % 4) * 200;
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
          gap: 24,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 18,
            border: `2px solid ${COLORS.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
            transform: `scale(${iconScale})`,
            backgroundColor: COLORS.accentDim,
            boxShadow: `0 0 30px ${COLORS.accentGlow}`,
          }}
        >
          <svg
            width="42"
            height="42"
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
              fontSize: 66,
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
            Automatisierte{" "}
            <span style={{ color: COLORS.accent }}>Datenverifizierung</span>
          </h1>

          {/* Shimmer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: shimmerX,
              width: 120,
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
            marginTop: 6,
            marginBottom: 6,
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 300,
            color: COLORS.textSecondary,
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 800,
            opacity: subtitleEntrance,
            transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [20, 0])}px)`,
            margin: 0,
          }}
        >
          Präzisionsabgleich zwischen Bloomberg-Daten
          <br />
          und offiziellen Unternehmensberichten
        </p>
      </div>
    </AbsoluteFill>
  );
};
