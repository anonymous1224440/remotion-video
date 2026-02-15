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
import { COLORS, PDF_DATA, COLUMN_LABELS } from "../data";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const PdfDocument: React.FC<{
  index: number;
  title: string;
}> = ({ index, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - index * Math.round(0.3 * fps),
    fps,
    config: { damping: 15, stiffness: 200 },
    durationInFrames: Math.round(0.6 * fps),
  });

  const scanProgress = interpolate(
    frame,
    [
      Math.round((2 + index * 1.5) * fps),
      Math.round((4 + index * 1.5) * fps),
    ],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scanLineY = interpolate(scanProgress, [0, 1], [5, 95]);

  return (
    <div
      style={{
        width: 220,
        height: 300,
        borderRadius: 10,
        backgroundColor: "#1a2744",
        border: `1px solid ${COLORS.border}`,
        padding: 18,
        position: "relative",
        overflow: "hidden",
        transform: `scale(${entrance}) translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
        opacity: entrance,
      }}
    >
      {/* PDF icon header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 5,
            backgroundColor: COLORS.pdfRed,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "white",
          }}
        >
          PDF
        </div>
        <span
          style={{
            fontSize: 12,
            color: COLORS.textSecondary,
            fontWeight: 600,
          }}
        >
          {title}
        </span>
      </div>

      {/* Document lines */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            height: 7,
            marginBottom: 9,
            borderRadius: 3,
            backgroundColor: COLORS.border,
            width: `${60 + (i % 3) * 15}%`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* Scan line */}
      {scanProgress > 0 && scanProgress < 1 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${scanLineY}%`,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
            boxShadow: `0 0 20px ${COLORS.accentGlow}, 0 0 40px ${COLORS.accentGlow}`,
          }}
        />
      )}

      {/* Scanned overlay */}
      {scanProgress > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: `${scanLineY}%`,
            backgroundColor: "rgba(0, 212, 255, 0.04)",
            borderBottom: scanProgress < 1 ? `1px solid ${COLORS.accent}40` : "none",
          }}
        />
      )}

      {/* Completed checkmark */}
      {scanProgress >= 1 && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: COLORS.success,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 12px ${COLORS.successGlow}`,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M5 12l5 5L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export const Scene3PdfExtraction: React.FC = () => {
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

  const extractionStart = Math.round(7 * fps);
  const extractionProgress = interpolate(
    frame,
    [extractionStart, extractionStart + Math.round(5 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  const arrowOpacity = spring({
    frame: frame - Math.round(6 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.5 * fps),
  });

  const extractedRowCount = Math.min(
    PDF_DATA.length,
    Math.floor(extractionProgress * (PDF_DATA.length + 1)),
  );

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        opacity: fadeIn * fadeOut,
        padding: "40px 60px",
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
          opacity: headerSlide,
          transform: `translateY(${interpolate(headerSlide, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 12,
            backgroundColor: COLORS.pdfRed,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 20px rgba(217, 48, 37, 0.4)`,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
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
            PDF-Upload & Extraktion
          </h2>
          <p
            style={{
              fontSize: 16,
              color: COLORS.textMuted,
              margin: "4px 0 0 0",
            }}
          >
            Offizielle Geschäftsberichte werden gescannt
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: 36,
          flex: 1,
        }}
      >
        {/* PDF documents */}
        <div
          style={{
            display: "flex",
            gap: 18,
            flexShrink: 0,
            alignItems: "center",
          }}
        >
          <PdfDocument index={0} title="Jahresbericht_2025.pdf" />
          <PdfDocument index={1} title="Finanzbericht_Q4.pdf" />
          <PdfDocument index={2} title="Ergebnismeldung.pdf" />
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            opacity: arrowOpacity,
          }}
        >
          <svg
            width="70"
            height="28"
            viewBox="0 0 70 28"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="2"
          >
            <line x1="0" y1="14" x2="58" y2="14" />
            <polyline points="52 7 58 14 52 21" />
          </svg>
        </div>

        {/* Extracted data table */}
        <div
          style={{
            flex: 1,
            opacity: arrowOpacity,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: `1px solid ${COLORS.border}`,
              backgroundColor: "rgba(12, 22, 42, 0.95)",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                backgroundColor: COLORS.bgCard,
                borderBottom: `1px solid ${COLORS.border}`,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.accent,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Extrahierte Daten
            </div>

            {/* Header row */}
            <div
              style={{
                display: "flex",
                backgroundColor: COLORS.tableHeader,
                borderBottom: `2px solid ${COLORS.accent}40`,
                padding: "10px 0",
              }}
            >
              {COLUMN_LABELS.map((col) => (
                <div
                  key={col}
                  style={{
                    flex: 1,
                    padding: "0 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: COLORS.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {PDF_DATA.slice(0, extractedRowCount).map((row, i) => {
              const rowEntrance = spring({
                frame: frame - extractionStart - i * 10,
                fps,
                config: { damping: 200 },
                durationInFrames: 12,
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    padding: "12px 0",
                    backgroundColor:
                      i % 2 === 0
                        ? COLORS.tableRowEven
                        : COLORS.tableRowOdd,
                    opacity: rowEntrance,
                    transform: `translateX(${interpolate(rowEntrance, [0, 1], [15, 0])}px)`,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      padding: "0 12px",
                      fontSize: 15,
                      fontWeight: 600,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {row.name}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: "0 12px",
                      fontSize: 15,
                      color: COLORS.textSecondary,
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {row.revenue}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: "0 12px",
                      fontSize: 15,
                      color: COLORS.textSecondary,
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {row.netIncome}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: "0 12px",
                      fontSize: 15,
                      color: COLORS.textSecondary,
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {row.ebitda}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: "0 12px",
                      fontSize: 15,
                      color: COLORS.textSecondary,
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {row.assets}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: 20,
          opacity: arrowOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontSize: 15,
            color: COLORS.textMuted,
          }}
        >
          <span>Extraktionsfortschritt</span>
          <span>{Math.round(extractionProgress * 100)}%</span>
        </div>
        <div
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: COLORS.bgCard,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${extractionProgress * 100}%`,
              borderRadius: 3,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.success})`,
              boxShadow: `0 0 10px ${COLORS.accentGlow}`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
