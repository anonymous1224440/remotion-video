import React from 'react';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { HookScene } from './scenes/HookScene';
import { AIReceptionistScene } from './scenes/AIReceptionistScene';
import { PropertyOutreachScene } from './scenes/PropertyOutreachScene';
import { RepairRequestScene } from './scenes/RepairRequestScene';
import { ClosingScene } from './scenes/ClosingScene';

export const PropertyAutomationVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Hook (0-5s = 150 frames) */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <HookScene />
      </TransitionSeries.Sequence>

      {/* Transition: Fade (15 frames) */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 2: AI Receptionist (5-25s = 600 frames) */}
      <TransitionSeries.Sequence durationInFrames={600}>
        <AIReceptionistScene />
      </TransitionSeries.Sequence>

      {/* Transition: Slide from right (15 frames) */}
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 3: Property Outreach (25-45s = 600 frames) */}
      <TransitionSeries.Sequence durationInFrames={600}>
        <PropertyOutreachScene />
      </TransitionSeries.Sequence>

      {/* Transition: Slide from right (15 frames) */}
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 4: Repair Request (45-65s = 600 frames) */}
      <TransitionSeries.Sequence durationInFrames={600}>
        <RepairRequestScene />
      </TransitionSeries.Sequence>

      {/* Transition: Fade (15 frames) */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 5: Closing (65-75s = 300 frames) */}
      <TransitionSeries.Sequence durationInFrames={300}>
        <ClosingScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
