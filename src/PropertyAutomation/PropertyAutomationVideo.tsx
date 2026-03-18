import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background } from "./components/Background";
import { HookScene } from "./scenes/HookScene";
import { AIReceptionistScene } from "./scenes/AIReceptionistScene";
import { PropertyOutreachScene } from "./scenes/PropertyOutreachScene";
import { RepairRequestScene } from "./scenes/RepairRequestScene";
import { ClosingScene } from "./scenes/ClosingScene";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const FPS = 30;
const TRANSITION = 15; // frames

// Scene durations in frames
const HOOK_DURATION = 5 * FPS;
const WF1_DURATION = 20 * FPS;
const WF2_DURATION = 20 * FPS;
const WF3_DURATION = 20 * FPS;
const CLOSING_DURATION = 10 * FPS;

export const PropertyAutomationVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        fontFamily,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <Background />

      <TransitionSeries>
        {/* Hook scene */}
        <TransitionSeries.Sequence
          durationInFrames={HOOK_DURATION}
          style={{ overflow: "hidden" }}
        >
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Workflow 1 - AI Receptionist */}
        <TransitionSeries.Sequence
          durationInFrames={WF1_DURATION}
          style={{ overflow: "hidden" }}
        >
          <AIReceptionistScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Workflow 2 - Property Outreach */}
        <TransitionSeries.Sequence
          durationInFrames={WF2_DURATION}
          style={{ overflow: "hidden" }}
        >
          <PropertyOutreachScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Workflow 3 - Repair Request */}
        <TransitionSeries.Sequence
          durationInFrames={WF3_DURATION}
          style={{ overflow: "hidden" }}
        >
          <RepairRequestScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Closing */}
        <TransitionSeries.Sequence
          durationInFrames={CLOSING_DURATION}
          style={{ overflow: "hidden" }}
        >
          <ClosingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
