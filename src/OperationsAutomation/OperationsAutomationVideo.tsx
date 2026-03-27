import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Background } from "./components/Background";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2DocumentAutomation } from "./scenes/Scene2DocumentAutomation";
import { Scene3FollowUp } from "./scenes/Scene3FollowUp";
import { Scene4RepairMaintenance } from "./scenes/Scene4RepairMaintenance";
import { Scene5Closing } from "./scenes/Scene5Closing";
import { SCENE_TIMING, COLORS } from "./theme";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export const OperationsAutomationVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: COLORS.background }}>
      {/* Persistent animated background */}
      <Background />

      {/* Scene 1: Hook (0-5s) */}
      <Sequence
        from={SCENE_TIMING.hook.from}
        durationInFrames={SCENE_TIMING.hook.duration}
        premountFor={30}
      >
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Document Automation (5-25s) */}
      <Sequence
        from={SCENE_TIMING.workflow1.from}
        durationInFrames={SCENE_TIMING.workflow1.duration}
        premountFor={30}
      >
        <Scene2DocumentAutomation />
      </Sequence>

      {/* Scene 3: Smart Follow-Up (25-45s) */}
      <Sequence
        from={SCENE_TIMING.workflow2.from}
        durationInFrames={SCENE_TIMING.workflow2.duration}
        premountFor={30}
      >
        <Scene3FollowUp />
      </Sequence>

      {/* Scene 4: Repair & Maintenance (45-65s) */}
      <Sequence
        from={SCENE_TIMING.workflow3.from}
        durationInFrames={SCENE_TIMING.workflow3.duration}
        premountFor={30}
      >
        <Scene4RepairMaintenance />
      </Sequence>

      {/* Scene 5: Closing (65-75s) */}
      <Sequence
        from={SCENE_TIMING.closing.from}
        durationInFrames={SCENE_TIMING.closing.duration}
        premountFor={30}
      >
        <Scene5Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
