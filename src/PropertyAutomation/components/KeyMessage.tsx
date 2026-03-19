import React from 'react';
import { useCurrentFrame, spring } from 'remotion';

type KeyMessageProps = {
  messages: string[];
  color: string;
  startFrame?: number;
};

export const KeyMessage: React.FC<KeyMessageProps> = ({ messages, color, startFrame = 30 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, justifyContent: 'center' }}>
      {messages.map((msg, i) => {
        const delay = startFrame + i * 10;
        const progress = spring({
          frame: frame - delay,
          fps: 30,
          config: { damping: 200 },
        });

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              opacity: progress,
              transform: `translateX(${(1 - progress) * 20}px)`,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 12px ${color}80`,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 22, fontWeight: 700, color: '#ffffff' }}>{msg}</span>
          </div>
        );
      })}
    </div>
  );
};
