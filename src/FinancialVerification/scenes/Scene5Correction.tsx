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
import { AnimatedNumber } from "../components/AnimatedNumber";
import { COLORS, MISMATCHES, EXCEL_DATA, COLUMN_LABELS } from "../data";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const Scene5Correction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, Math.round(0.5 * fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - Math.round(1 * fps), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const headerSlide = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  const correctionDuration = 4 * fps;
  const correctionGap = 1 * fps;

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        opacity: fadeIn * fadeOut,
        padding: "40px 80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginBottom: 30,
          opacity: headerSlide,
          transform: `translateY(${interpolate(headerSlide, [0, 1], [-20, 0])}px)`,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="1.5"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: 0,
          }}
        >
          Automatische{" "}
          <span style={{ color: COLORS.accent }}>Korrektur</span>
        </h2>
      </div>

      {/* Correction cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          flex: 1,
          justifyContent: "center",
        }}
      >
        {MISMATCHES.map((mismatch, idx) => {
          const startFrame =
            Math.round(2 * fps) + idx * (correctionDuration + correctionGap);
          const progress = interpolate(
            frame,
            [startFrame, startFrame + correctionDuration],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
          );

          const cardEntrance = spring({
            frame: frame - startFrame + Math.round(0.5 * fps),
            fps,
            config: { damping: 200 },
            durationInFrames: Math.round(0.5 * fps),
          });

          const company = EXCEL_DATA[mismatch.row];
          const columnLabel = COLUMN_LABELS[mismatch.columnIndex];

          const checkOpacity = interpolate(progress, [0.8, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                padding: "24px 32px",
                borderRadius: 14,
                backgroundColor: COLORS.bgCard,
                border: `1px solid ${progress > 0.8 ? COLORS.success + "40" : COLORS.border}`,
                opacity: cardEntrance,
                transform: `translateX(${interpolate(cardEntrance, [0, 1], [-30, 0])}px)`,
              }}
            >
              {/* Step number */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: COLORS.accentDim,
                  border: `2px solid ${COLORS.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.accent,
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>

              {/* Company and field */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  {company.name}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: COLORS.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {columnLabel}
                </div>
              </div>

              {/* Old value */}
              <div style={{ textAlign: "center", minWidth: 120 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: COLORS.textMuted,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Bloomberg
                </div>
                <AnimatedNumber
                  oldValue={mismatch.excelValue}
                  newValue={mismatch.pdfValue}
                  progress={progress}
                  delay={0}
                />
              </div>

              {/* Arrow */}
              <div
                style={{
                  opacity: interpolate(progress, [0.3, 0.5], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  color: COLORS.accent,
                  fontSize: 24,
                }}
              >
                →
              </div>

              {/* New value */}
              <div style={{ textAlign: "center", minWidth: 120 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: COLORS.textMuted,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Verifiziert
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: "'Courier New', monospace",
                    color:
                      progress > 0.7 ? COLORS.success : COLORS.textSecondary,
                    opacity: interpolate(progress, [0.6, 0.8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  {mismatch.pdfValue}
                </div>
              </div>

              {/* Checkmark */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  backgroundColor:
                    checkOpacity > 0 ? COLORS.success : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: checkOpacity,
                  boxShadow:
                    checkOpacity > 0
                      ? `0 0 15px ${COLORS.successGlow}`
                      : "none",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <path d="M5 12l5 5L19 7" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Label */}
      <div
        style={{
          textAlign: "center",
          marginTop: 24,
          opacity: interpolate(
            frame,
            [Math.round(14 * fps), Math.round(15 * fps)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 32px",
            borderRadius: 10,
            backgroundColor: COLORS.successDim,
            border: `1px solid ${COLORS.success}40`,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.success}
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: COLORS.success,
              letterSpacing: 0.5,
            }}
          >
            Automatische Korrektur mit verifizierten Quelldaten
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
