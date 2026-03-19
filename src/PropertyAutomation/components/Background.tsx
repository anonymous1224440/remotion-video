import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme';

export const Background: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }}
    />
  );
};
