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
import { DataTable } from "../components/DataTable";
import { COLORS, EXCEL_DATA } from "../data";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

export const Scene2ExcelData: React.FC = () => {
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

  const labelSlide = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  const excelIconScale = spring({
    frame: frame - Math.round(0.3 * fps),
    fps,
    config: { damping: 15, stiffness: 200 },
    durationInFrames: Math.round(0.5 * fps),
  });

  const highlightRowProgress = interpolate(
    frame,
    [Math.round(6 * fps), Math.round(7 * fps)],
    [-1, 2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const highlightRow =
    highlightRowProgress >= 0 && highlightRowProgress <= 4
      ? Math.floor(highlightRowProgress)
      : undefined;

  const scanLineY = interpolate(
    frame,
    [Math.round(4 * fps), Math.round(8 * fps)],
    [-10, 110],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    },
  );

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        opacity: fadeIn * fadeOut,
        padding: "60px 120px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 30,
          opacity: labelSlide,
          transform: `translateY(${interpolate(labelSlide, [0, 1], [-20, 0])}px)`,
        }}
      >
        {/* Excel icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            backgroundColor: COLORS.excelGreen,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${excelIconScale})`,
            boxShadow: `0 4px 20px rgba(33, 115, 70, 0.4)`,
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            X
          </span>
        </div>

        <div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.textPrimary,
              margin: 0,
            }}
          >
            Bloomberg Data Source
          </h2>
          <p
            style={{
              fontSize: 14,
              color: COLORS.textMuted,
              margin: "4px 0 0 0",
              letterSpacing: 0.5,
            }}
          >
            Financial metrics extracted from Bloomberg Terminal
          </p>
        </div>
      </div>

      {/* Table container */}
      <div style={{ position: "relative" }}>
        <DataTable
          data={EXCEL_DATA}
          animateRows
          highlightRow={highlightRow}
          label="Q4 2024 Financial Summary"
        />

        {/* Scan line effect */}
        {scanLineY > 0 && scanLineY < 100 && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${scanLineY}%`,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
              boxShadow: `0 0 15px ${COLORS.accentGlow}`,
              opacity: 0.7,
            }}
          />
        )}
      </div>

      {/* Status bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
          padding: "12px 20px",
          borderRadius: 8,
          backgroundColor: COLORS.bgCard,
          border: `1px solid ${COLORS.border}`,
          opacity: interpolate(
            frame,
            [Math.round(2 * fps), Math.round(3 * fps)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: COLORS.textMuted,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: COLORS.success,
              boxShadow: `0 0 8px ${COLORS.successGlow}`,
            }}
          />
          5 companies loaded
        </div>
        <div style={{ fontSize: 13, color: COLORS.textMuted }}>
          4 metrics per company
        </div>
        <div style={{ fontSize: 13, color: COLORS.accent }}>
          Ready for verification
        </div>
      </div>
    </AbsoluteFill>
  );
};
