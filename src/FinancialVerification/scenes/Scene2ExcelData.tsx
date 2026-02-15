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
    [0, 100],
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
          gap: 18,
          marginBottom: 24,
          opacity: labelSlide,
          transform: `translateY(${interpolate(labelSlide, [0, 1], [-20, 0])}px)`,
        }}
      >
        {/* Bloomberg icon */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 12,
            backgroundColor: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${excelIconScale})`,
            boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4)`,
            border: "1px solid #333",
          }}
        >
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect x="4" y="4" width="8" height="26" rx="1" fill="#FF9F0A" />
            <rect x="14" y="8" width="8" height="18" rx="4" fill="#FF9F0A" />
            <rect x="14" y="8" width="4" height="18" fill="#FF9F0A" />
            <rect x="24" y="12" width="6" height="10" rx="3" fill="#FF9F0A" />
            <rect x="24" y="12" width="3" height="10" fill="#FF9F0A" />
          </svg>
        </div>

        <div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.textPrimary,
              margin: 0,
            }}
          >
            Bloomberg-Datenquelle
          </h2>
          <p
            style={{
              fontSize: 16,
              color: COLORS.textMuted,
              margin: "4px 0 0 0",
              letterSpacing: 0.5,
            }}
          >
            Finanzkennzahlen aus dem Bloomberg Terminal
          </p>
        </div>
      </div>

      {/* Table container - flex: 1 to fill remaining space */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: 12 }}>
        <DataTable
          data={EXCEL_DATA}
          animateRows
          highlightRow={highlightRow}
          label="Q4 2025 Finanzübersicht"
          greenTheme
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
              background: `linear-gradient(90deg, transparent, ${COLORS.success}, transparent)`,
              boxShadow: `0 0 15px ${COLORS.successGlow}`,
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
          padding: "14px 24px",
          borderRadius: 10,
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
            gap: 10,
            fontSize: 16,
            color: COLORS.textMuted,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: COLORS.success,
              boxShadow: `0 0 8px ${COLORS.successGlow}`,
            }}
          />
          5 Unternehmen geladen
        </div>
        <div style={{ fontSize: 16, color: COLORS.textMuted }}>
          4 Kennzahlen pro Unternehmen
        </div>
        <div style={{ fontSize: 16, color: COLORS.accent }}>
          Bereit zur Verifizierung
        </div>
      </div>
    </AbsoluteFill>
  );
};
