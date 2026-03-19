import React from 'react';
import { useCurrentFrame, spring } from 'remotion';
import { colors } from '../theme';

type FlowStepProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  index: number;
  showConnector?: boolean;
  appearDelay?: number;
};

export const FlowStep: React.FC<FlowStepProps> = ({
  icon,
  label,
  color,
  index,
  showConnector = true,
  appearDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const delay = appearDelay + index * 8;

  const progress = spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 200 },
  });

  const dimColor = color + '26'; // ~15% opacity
  const glowColor = color + '59'; // ~35% opacity

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        opacity: progress,
        transform: `translateY(${(1 - progress) * 20}px)`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: dimColor,
            border: `1px solid ${color}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        >
          {icon}
        </div>
        <span style={{ fontSize: 15, color: colors.secondary, whiteSpace: 'nowrap' }}>{label}</span>
      </div>
      {showConnector && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div
            style={{
              width: 40,
              height: 2,
              background: `linear-gradient(90deg, ${color}66, ${color}22)`,
              marginLeft: 8,
              marginRight: 4,
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderLeft: `8px solid ${color}44`,
              marginRight: 8,
            }}
          />
        </div>
      )}
    </div>
  );
};
