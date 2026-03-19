import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { colors } from '../theme';
import { Background } from '../components/Background';

const { fontFamily } = loadFont();

const notifications = [
  { text: 'Missed Call', x: 180, y: 120, color: '#ef4444' },
  { text: 'Unread Email', x: 1500, y: 200, color: colors.orange },
  { text: 'Voicemail', x: 300, y: 700, color: '#ef4444' },
  { text: 'Tenant Request', x: 1400, y: 650, color: colors.orange },
  { text: 'Late Payment', x: 700, y: 150, color: '#ef4444' },
  { text: 'Maintenance', x: 1100, y: 750, color: colors.orange },
];

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Chaos (0-60 frames / 0-2s)
  const chaosPhase = frame < 60;

  // Phase 2: Clean (60-150 frames / 2-5s)
  const cleanProgress = spring({
    frame: frame - 60,
    fps: 30,
    config: { damping: 200 },
  });

  // Fade out at end
  const endFade = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />

      {/* Phase 1: Chaos notifications */}
      {chaosPhase && notifications.map((notif, i) => {
        const appear = spring({
          frame: frame - i * 5,
          fps: 30,
          config: { damping: 200 },
        });

        const shake = Math.sin(frame * 0.5 + i * 2) * 3;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: notif.x,
              top: notif.y,
              opacity: appear,
              transform: `scale(${appear}) translate(${shake}px, ${shake}px)`,
              background: notif.color + '22',
              border: `1px solid ${notif.color}55`,
              borderRadius: 12,
              padding: '12px 20px',
              color: notif.color,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {notif.text}
          </div>
        );
      })}

      {/* Phase 1: Main question */}
      {chaosPhase && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: colors.text,
              textAlign: 'center',
              opacity: spring({ frame: frame - 10, fps: 30, config: { damping: 200 } }),
            }}
          >
            What if your entire property operation{' '}
            <span style={{ color: colors.blue }}>ran itself?</span>
          </div>
        </div>
      )}

      {/* Phase 2: Chaos elements scale out */}
      {!chaosPhase && notifications.map((notif, i) => {
        const disappear = 1 - cleanProgress;
        return (
          <div
            key={`out-${i}`}
            style={{
              position: 'absolute',
              left: notif.x,
              top: notif.y,
              opacity: disappear,
              transform: `scale(${disappear * 0.5})`,
              background: notif.color + '22',
              border: `1px solid ${notif.color}55`,
              borderRadius: 12,
              padding: '12px 20px',
              color: notif.color,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {notif.text}
          </div>
        );
      })}

      {/* Phase 2: Clean - SP Logo + "It can." */}
      {!chaosPhase && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            opacity: endFade,
          }}
        >
          {/* SP Logo */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: colors.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 40px ${colors.blueGlow}`,
              opacity: cleanProgress,
              transform: `scale(${0.8 + cleanProgress * 0.2})`,
            }}
          >
            <span style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>SP</span>
          </div>

          {/* "It can." text */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: colors.text,
              opacity: spring({ frame: frame - 75, fps: 30, config: { damping: 200 } }),
            }}
          >
            It can.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
