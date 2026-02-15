import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import {
  COLORS,
  COLUMN_LABELS,
  COLUMN_KEYS,
  type CompanyData,
} from "../data";

export type CellStatus = "match" | "mismatch" | "corrected" | "neutral";

type CellHighlightMap = Record<string, CellStatus>;

type CorrectionEntry = {
  row: number;
  columnIndex: number;
  oldValue: string;
  newValue: string;
};

type Props = {
  data: CompanyData[];
  highlightRow?: number;
  cellHighlights?: CellHighlightMap;
  animateRows?: boolean;
  compact?: boolean;
  label?: string;
  labelColor?: string;
  corrections?: CorrectionEntry[];
  correctionProgress?: number;
  greenTheme?: boolean;
};

const cellKey = (row: number, col: number) => `${row}-${col}`;

const COL_WIDTHS = ["24%", "19%", "19%", "19%", "19%"];
const COL_WIDTHS_COMPACT = ["22%", "19.5%", "19.5%", "19.5%", "19.5%"];

export const DataTable: React.FC<Props> = ({
  data,
  highlightRow,
  cellHighlights = {},
  animateRows = false,
  compact = false,
  label,
  labelColor,
  corrections = [],
  correctionProgress = 0,
  greenTheme = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const widths = compact ? COL_WIDTHS_COMPACT : COL_WIDTHS;
  const fontSize = compact ? 16 : 20;
  const headerFontSize = compact ? 13 : 15;
  const rowPadding = compact ? "12px 0" : "16px 0";

  const tableEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 20,
  });

  const tableBorder = greenTheme ? "#1e5f3a" : COLORS.border;
  const tableBg = greenTheme ? "rgba(10, 28, 18, 0.95)" : "rgba(12, 22, 42, 0.95)";
  const headerBg = greenTheme ? "#0d2a1a" : COLORS.tableHeader;
  const headerBorderColor = greenTheme ? "rgba(33, 115, 70, 0.5)" : `${COLORS.accent}40`;
  const labelBg = greenTheme ? "#102e1c" : COLORS.bgCard;
  const defaultLabelColor = greenTheme ? "#4ade80" : COLORS.accent;
  const rowEven = greenTheme ? "#0c1e14" : COLORS.tableRowEven;
  const rowOdd = greenTheme ? "#0e2218" : COLORS.tableRowOdd;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${tableBorder}`,
        backgroundColor: tableBg,
        opacity: tableEntrance,
        transform: `scale(${interpolate(tableEntrance, [0, 1], [0.97, 1])})`,
      }}
    >
      {label && (
        <div
          style={{
            padding: compact ? "10px 18px" : "14px 22px",
            backgroundColor: labelBg,
            borderBottom: `1px solid ${tableBorder}`,
            fontSize: compact ? 14 : 16,
            fontWeight: 600,
            color: labelColor ?? defaultLabelColor,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {label}
          {greenTheme && (
            <Img
              src={staticFile("excel-logo.png")}
              style={{
                height: 28,
                objectFit: "contain",
              }}
            />
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          backgroundColor: headerBg,
          borderBottom: `2px solid ${headerBorderColor}`,
          padding: compact ? "10px 0" : "14px 0",
        }}
      >
        {COLUMN_LABELS.map((col, i) => (
          <div
            key={col}
            style={{
              width: widths[i],
              padding: "0 16px",
              fontSize: headerFontSize,
              fontWeight: 700,
              color: COLORS.textMuted,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            {col}
          </div>
        ))}
      </div>

      {data.map((row, rowIndex) => {
        const delay = animateRows ? rowIndex * 8 : 0;
        const rowSpring = animateRows
          ? spring({
              frame: frame - delay,
              fps,
              config: { damping: 200 },
              durationInFrames: 15,
            })
          : 1;

        const isHighlighted = highlightRow === rowIndex;

        return (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              padding: rowPadding,
              backgroundColor: isHighlighted
                ? (greenTheme ? "rgba(33, 115, 70, 0.15)" : COLORS.accentDim)
                : rowIndex % 2 === 0
                  ? rowEven
                  : rowOdd,
              borderLeft: isHighlighted
                ? `3px solid ${greenTheme ? COLORS.excelGreen : COLORS.accent}`
                : "3px solid transparent",
              opacity: rowSpring,
              transform: `translateX(${interpolate(rowSpring, [0, 1], [20, 0])}px)`,
            }}
          >
            {COLUMN_KEYS.map((key, colIndex) => {
              const status = cellHighlights[cellKey(rowIndex, colIndex)] ?? "neutral";
              const correction = corrections.find(
                (c) => c.row === rowIndex && c.columnIndex === colIndex,
              );

              let textColor =
                colIndex === 0 ? COLORS.textPrimary : COLORS.textSecondary;
              let bgColor = "transparent";
              let borderColor = "transparent";

              if (status === "match" || status === "corrected") {
                textColor = COLORS.success;
                bgColor = COLORS.successDim;
                borderColor = COLORS.success;
              } else if (status === "mismatch") {
                textColor = COLORS.error;
                bgColor = COLORS.errorDim;
                borderColor = COLORS.error;
              }

              let displayValue = row[key];
              let valueFadeOpacity = 1;

              if (correction && correctionProgress > 0) {
                if (correctionProgress < 0.5) {
                  displayValue = correction.oldValue;
                  valueFadeOpacity = interpolate(
                    correctionProgress,
                    [0.2, 0.5],
                    [1, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  );
                } else {
                  displayValue = correction.newValue;
                  valueFadeOpacity = interpolate(
                    correctionProgress,
                    [0.5, 0.8],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  );
                }
              }

              return (
                <div
                  key={colIndex}
                  style={{
                    width: widths[colIndex],
                    padding: "0 16px",
                    fontSize,
                    fontWeight: colIndex === 0 ? 600 : 400,
                    color: textColor,
                    fontFamily:
                      colIndex > 0
                        ? "'Courier New', 'Consolas', monospace"
                        : "inherit",
                    position: "relative",
                  }}
                >
                  {status !== "neutral" && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-2px -4px",
                        backgroundColor: bgColor,
                        border: `1px solid ${borderColor}50`,
                        borderRadius: 4,
                      }}
                    />
                  )}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      opacity: valueFadeOpacity,
                    }}
                  >
                    {displayValue}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
