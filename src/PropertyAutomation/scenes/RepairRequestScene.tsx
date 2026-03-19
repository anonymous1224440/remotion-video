import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { colors } from '../theme';
import { Background } from '../components/Background';
import { FlowStep } from '../components/FlowStep';
import { KeyMessage } from '../components/KeyMessage';
import { MailIcon, SearchIcon, WrenchIcon, SendIcon, CheckIcon, ShieldIcon } from '../components/Icons';

const { fontFamily } = loadFont();

const timelineEntries = [
  { text: 'Request received', time: '9:02 AM' },
  { text: 'Plumber assigned: Mike R.', time: '9:05 AM' },
  { text: 'Tenant notified', time: '9:06 AM' },
  { text: 'Scheduled: Tomorrow 10 AM', time: '9:10 AM' },
  { text: 'Job completed & logged', time: '10:45 AM' },
];

export const RepairRequestScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerProgress = spring({ frame: frame - 5, fps: 30, config: { damping: 200 } });
  const flowDelay = 20;
  const detailDelay = 60;
  const flowSteps = [
    { icon: <MailIcon size={28} color={colors.green} />, label: 'Request', color: colors.green },
    { icon: <SearchIcon size={28} color={colors.green} />, label: 'Analyze', color: colors.green },
    { icon: <WrenchIcon size={28} color={colors.cyan} />, label: 'Match Pro', color: colors.cyan },
    { icon: <SendIcon size={28} color={colors.blue} />, label: 'Work Order', color: colors.blue },
    { icon: <CheckIcon size={28} color={colors.green} />, label: 'Complete', color: colors.green },
  ];

  const analysisTags = [
    { label: 'Type', value: 'Plumbing', color: colors.blue },
    { label: 'Urgency', value: 'High', color: colors.orange },
    { label: 'Unit', value: '4B', color: colors.green },
  ];

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />
      <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ opacity: headerProgress, transform: `translateY(${(1 - headerProgress) * 20}px)`, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors.green }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.green, textTransform: 'uppercase' as const, letterSpacing: 2 }}>WORKFLOW 3</span>
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: colors.text }}>Repair Request Automation</div>
        </div>

        {/* Flow Diagram */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 24 }}>
          {flowSteps.map((step, i) => (
            <FlowStep key={i} icon={step.icon} label={step.label} color={step.color} index={i} showConnector={i < flowSteps.length - 1} appearDelay={flowDelay} />
          ))}
        </div>

        {/* Detail Area */}
        <div style={{ display: 'flex', flex: 1, gap: 24, minHeight: 0 }}>
          {/* Left: 3 Cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Card 1: Incoming Request */}
            <div
              style={{
                background: colors.card,
                border: `1px solid ${colors.green}33`,
                borderRadius: 16,
                padding: 20,
                opacity: spring({ frame: frame - (detailDelay), fps: 30, config: { damping: 200 } }),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <MailIcon size={18} color={colors.green} />
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.green }}>Incoming Request</span>
              </div>
              <div style={{ background: colors.surface, borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ fontSize: 12, color: colors.muted, marginBottom: 6 }}>
                  From: <span style={{ textDecoration: 'underline' }}>tenant@email.com</span> — Unit 4B
                </div>
                <div style={{ fontSize: 16, color: colors.text, lineHeight: 1.4 }}>
                  The kitchen sink is leaking badly. Water is pooling on the floor.
                </div>
              </div>
            </div>

            {/* Card 2: AI Analysis */}
            <div
              style={{
                background: colors.card,
                border: `1px solid ${colors.cyan}33`,
                borderRadius: 16,
                padding: 20,
                opacity: spring({ frame: frame - (detailDelay + 15), fps: 30, config: { damping: 200 } }),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <SearchIcon size={18} color={colors.cyan} />
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.cyan }}>AI Analysis</span>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {analysisTags.map((tag, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center' as const }}>
                    <div style={{ fontSize: 14, color: colors.muted, marginBottom: 6 }}>{tag.label}</div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: tag.color,
                        background: tag.color + '18',
                        borderRadius: 10,
                        padding: '10px 16px',
                        border: `1px solid ${tag.color}33`,
                      }}
                    >
                      {tag.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Key Messages */}
            <div
              style={{
                flex: 1,
                background: colors.card,
                border: `1px solid ${colors.green}22`,
                borderRadius: 16,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                opacity: spring({ frame: frame - (detailDelay + 30), fps: 30, config: { damping: 200 } }),
              }}
            >
              <KeyMessage
                messages={['No manual coordination', 'Smart contractor matching', 'You control approvals']}
                color={colors.green}
                startFrame={detailDelay + 40}
              />
            </div>
          </div>

          {/* Right: 2 Cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Card 1: Approval Logic */}
            <div
              style={{
                background: colors.card,
                border: `1px solid ${colors.blue}33`,
                borderRadius: 16,
                padding: 20,
                opacity: spring({ frame: frame - (detailDelay + 10), fps: 30, config: { damping: 200 } }),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <ShieldIcon size={18} color={colors.blue} />
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.blue }}>Approval Logic</span>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div
                  style={{
                    flex: 1,
                    background: colors.greenDim,
                    borderRadius: 12,
                    padding: '18px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    border: `1px solid ${colors.green}33`,
                  }}
                >
                  <CheckIcon size={28} color={colors.green} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: colors.green }}>Auto-Approved</div>
                  <div style={{ fontSize: 13, color: colors.muted }}>Under $500</div>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: colors.orangeDim,
                    borderRadius: 12,
                    padding: '18px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    border: `1px solid ${colors.orange}33`,
                  }}
                >
                  <ShieldIcon size={28} color={colors.orange} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: colors.orange }}>Needs Approval</div>
                  <div style={{ fontSize: 13, color: colors.muted }}>Over $500</div>
                </div>
              </div>
            </div>

            {/* Card 2: Live Status */}
            <div
              style={{
                flex: 1,
                background: colors.card,
                border: `1px solid ${colors.green}33`,
                borderRadius: 16,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                opacity: spring({ frame: frame - (detailDelay + 20), fps: 30, config: { damping: 200 } }),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <WrenchIcon size={18} color={colors.green} />
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.green }}>Live Status</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, justifyContent: 'space-around' }}>
                {timelineEntries.map((entry, i) => {
                  const entryDelay = detailDelay + 30 + i * 15;
                  const entryProgress = spring({ frame: frame - entryDelay, fps: 30, config: { damping: 200 } });
                  const isLast = i === timelineEntries.length - 1;
                  const lastGreenDelay = entryDelay + 60; // 2s delay for last check turning green
                  const lastGreen = isLast ? spring({ frame: frame - lastGreenDelay, fps: 30, config: { damping: 200 } }) : 1;
                  const checkColor = isLast ? (lastGreen > 0.5 ? colors.green : colors.muted) : colors.green;

                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '8px 0',
                        opacity: entryProgress,
                        transform: `translateX(${(1 - entryProgress) * 20}px)`,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: checkColor + '22',
                          border: `2px solid ${checkColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckIcon size={14} color={checkColor} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 16, color: colors.text, fontWeight: 500 }}>{entry.text}</span>
                      </div>
                      <span style={{ fontSize: 14, color: colors.muted, flexShrink: 0 }}>{entry.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
