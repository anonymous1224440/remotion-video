import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Background } from "./components/Background";
import { Scene1Introduction } from "./scenes/Scene1Introduction";
import { Scene2ExcelData } from "./scenes/Scene2ExcelData";
import { Scene3PdfExtraction } from "./scenes/Scene3PdfExtraction";
import { Scene4Comparison } from "./scenes/Scene4Comparison";
import { Scene5Correction } from "./scenes/Scene5Correction";
import { Scene6Final } from "./scenes/Scene6Final";
import { SCENE_TIMING } from "./data";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export const FinancialVerificationVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#050d18" }}>
      {/* Persistent animated background */}
      <Background />

      {/* Scene 1: Introduction (0–10s) */}
      <Sequence
        from={SCENE_TIMING.scene1.from}
        durationInFrames={SCENE_TIMING.scene1.duration}
        premountFor={30}
      >
        <Scene1Introduction />
      </Sequence>

      {/* Scene 2: Excel Data Source (10–25s) */}
      <Sequence
        from={SCENE_TIMING.scene2.from}
        durationInFrames={SCENE_TIMING.scene2.duration}
        premountFor={30}
      >
        <Scene2ExcelData />
      </Sequence>

      {/* Scene 3: PDF Upload and Extraction (25–40s) */}
      <Sequence
        from={SCENE_TIMING.scene3.from}
        durationInFrames={SCENE_TIMING.scene3.duration}
        premountFor={30}
      >
        <Scene3PdfExtraction />
      </Sequence>

      {/* Scene 4: Side-by-Side Comparison (40–60s) */}
      <Sequence
        from={SCENE_TIMING.scene4.from}
        durationInFrames={SCENE_TIMING.scene4.duration}
        premountFor={30}
      >
        <Scene4Comparison />
      </Sequence>

      {/* Scene 5: Automatic Correction (60–80s) */}
      <Sequence
        from={SCENE_TIMING.scene5.from}
        durationInFrames={SCENE_TIMING.scene5.duration}
        premountFor={30}
      >
        <Scene5Correction />
      </Sequence>

      {/* Scene 6: Final Verified Dataset (80–90s) */}
      <Sequence
        from={SCENE_TIMING.scene6.from}
        durationInFrames={SCENE_TIMING.scene6.duration}
        premountFor={30}
      >
        <Scene6Final />
      </Sequence>
    </AbsoluteFill>
  );
};
