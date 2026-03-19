import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { colors } from '../theme';
import { Background } from '../components/Background';
import { PhoneIcon, MailIcon, WrenchIcon } from '../components/Icons';

const { fontFamily } = loadFont();

const workflowIcons = [
  { icon: <PhoneIcon size={28} color={colors.blue} />, label: 'AI Receptionist', color: colors.blue, startX: -300 },
  { icon: <MailIcon size={28} color={colors.purple} />, label: 'Property Outreach', color: colors.purple, startX: 0 },
  { icon: <WrenchIcon size={28} color={colors.green} />, label: 'Repair Automation', color: colors.green, startX: 300 },
];

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Converge animation (0-30 frames)
  const convergeProgress = spring({ frame, fps: 30, config: { damping: 200 } });
  const convergeFade = interpolate(frame, [25, 40], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 2: Static content (after frame 40)
  const contentDelay = 50;
  const contentProgress = spring({ frame: frame - contentDelay, fps: 30, config: { damping: 200 } });

  const iconsRowProgress = spring({ frame: frame - (contentDelay + 5), fps: 30, config: { damping: 200 } });
  const logoProgress = spring({ frame: frame - (contentDelay + 15), fps: 30, config: { damping: 200 } });
  const titleProgress = spring({ frame: frame - (contentDelay + 25), fps: 30, config: { damping: 200 } });
  const subtitleProgress = spring({ frame: frame - (contentDelay + 35), fps: 30, config: { damping: 200 } });
  const dividerProgress = spring({ frame: frame - (contentDelay + 45), fps: 30, config: { damping: 200 } });
  const taglineProgress = spring({ frame: frame - (contentDelay + 55), fps: 30, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />

      {/* Phase 1: Converging icons */}
      {frame < 45 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: convergeFade }}>
          {workflowIcons.map((item, i) => {
            const x = interpolate(convergeProgress, [0, 1], [item.startX * 2, 0]);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  transform: `translateX(${x}px)`,
                  opacity: convergeProgress,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: item.color + '22',
                    border: `1px solid ${item.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </div>
              </div>
            );
          })}
        </AbsoluteFill>
      )}

      {/* Phase 2: Static content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: contentProgress,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Workflow Icons Row */}
          <div
            style={{
              display: 'flex',
              gap: 60,
              marginBottom: 36,
              opacity: iconsRowProgress,
              transform: `translateY(${(1 - iconsRowProgress) * 20}px)`,
            }}
          >
            {workflowIcons.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: item.color + '22',
                    border: `1px solid ${item.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 20px ${item.color}40`,
                  }}
                >
                  {item.icon}
                </div>
                <span style={{ fontSize: 14, color: colors.secondary, whiteSpace: 'nowrap' as const }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* SP Logo */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: colors.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 40px ${colors.blueGlow}`,
              marginBottom: 24,
              opacity: logoProgress,
              transform: `scale(${0.8 + logoProgress * 0.2})`,
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>SP</span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              marginBottom: 12,
              opacity: titleProgress,
              transform: `translateY(${(1 - titleProgress) * 15}px)`,
            }}
          >
            <span style={{ color: colors.text }}>Three systems. </span>
            <span
              style={{
                background: colors.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Fully automated.
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: colors.text,
              marginBottom: 16,
              opacity: subtitleProgress,
              transform: `translateY(${(1 - subtitleProgress) * 10}px)`,
            }}
          >
            Automate your growth.
          </div>

          {/* Divider */}
          <div
            style={{
              width: 160 * dividerProgress,
              height: 2,
              background: colors.gradient,
              marginBottom: 16,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 16,
              color: colors.secondary,
              opacity: taglineProgress,
            }}
          >
            Built around how you already work.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
