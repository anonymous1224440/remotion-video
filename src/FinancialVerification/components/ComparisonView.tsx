import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { DataTable, type CellStatus } from "./DataTable";
import {
  COLORS,
  EXCEL_DATA,
  PDF_DATA,
  MISMATCHES,
} from "../data";

type Props = {
  revealProgress: number;
};

export const ComparisonView: React.FC<Props> = ({ revealProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSlide = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 25,
  });

  const rightSlide = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
    durationInFrames: 25,
  });

  const excelHighlights: Record<string, CellStatus> = {};
  const pdfHighlights: Record<string, CellStatus> = {};

  const totalCells = EXCEL_DATA.length * 5;
  const progressPerCell = 1 / totalCells;

  for (let row = 0; row < EXCEL_DATA.length; row++) {
    for (let col = 1; col < 5; col++) {
      const cellIndex = row * 4 + (col - 1);
      const cellThreshold = cellIndex * progressPerCell;

      if (revealProgress > cellThreshold) {
        const mismatch = MISMATCHES.find(
          (m) => m.row === row && m.columnIndex === col,
        );
        const key = `${row}-${col}`;

        if (mismatch) {
          excelHighlights[key] = "mismatch";
          pdfHighlights[key] = "match";
        } else {
          excelHighlights[key] = "match";
          pdfHighlights[key] = "match";
        }
      }
    }
  }

  const vsOpacity = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
    durationInFrames: 15,
  });

  const dividerHeight = interpolate(
    spring({
      frame: frame - 15,
      fps,
      config: { damping: 200 },
      durationInFrames: 30,
    }),
    [0, 1],
    [0, 100],
  );

  const mismatchCount = MISMATCHES.filter((m) => {
    const cellIndex = m.row * 4 + (m.columnIndex - 1);
    return revealProgress > cellIndex * progressPerCell;
  }).length;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: "0 20px",
      }}
    >
      <div
        style={{
          flex: 1,
          opacity: leftSlide,
          transform: `translateX(${interpolate(leftSlide, [0, 1], [-40, 0])}px)`,
        }}
      >
        <DataTable
          data={EXCEL_DATA}
          compact
          label="Bloomberg-Daten"
          labelColor={COLORS.excelGreen}
          cellHighlights={excelHighlights}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          width: 50,
        }}
      >
        <div
          style={{
            width: 2,
            height: `${dividerHeight}%`,
            background: `linear-gradient(180deg, transparent, ${COLORS.accent}, transparent)`,
          }}
        />
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.accent,
            opacity: vsOpacity,
            letterSpacing: 2,
          }}
        >
          VS
        </div>
        <div
          style={{
            width: 2,
            height: `${dividerHeight}%`,
            background: `linear-gradient(180deg, transparent, ${COLORS.accent}, transparent)`,
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          opacity: rightSlide,
          transform: `translateX(${interpolate(rightSlide, [0, 1], [40, 0])}px)`,
        }}
      >
        <DataTable
          data={PDF_DATA}
          compact
          label="Offizieller Bericht"
          labelColor={COLORS.pdfRed}
          cellHighlights={pdfHighlights}
        />
      </div>

      {mismatchCount > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 32,
            opacity: interpolate(
              spring({
                frame: frame - 60,
                fps,
                config: { damping: 200 },
                durationInFrames: 15,
              }),
              [0, 1],
              [0, 1],
            ),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 16,
              color: COLORS.textSecondary,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: COLORS.success,
              }}
            />
            Übereinstimmung
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 16,
              color: COLORS.textSecondary,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: COLORS.error,
              }}
            />
            Abweichung ({mismatchCount} gefunden)
          </div>
        </div>
      )}
    </div>
  );
};
