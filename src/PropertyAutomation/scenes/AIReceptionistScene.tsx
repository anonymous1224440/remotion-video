import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { colors } from '../theme';
import { Background } from '../components/Background';
import { FlowStep } from '../components/FlowStep';
import { KeyMessage } from '../components/KeyMessage';
import { PhoneIcon, BotIcon, UserIcon, CheckIcon, CalendarIcon, ChartIcon } from '../components/Icons';

const { fontFamily } = loadFont();

const chatMessages = [
  { role: 'ai' as const, text: 'Good morning, thank you for calling Secured Properties Management Group. This is your AI assistant, how can I help you today?' },
  { role: 'user' as const, text: "Hi, I'm looking for a two-bedroom apartment in Koreatown, Los Angeles." },
  { role: 'ai' as const, text: 'Got it, thanks. Are you looking to move in soon, or just exploring options for now?' },
  { role: 'user' as const, text: 'Ideally within the next month.' },
  { role: 'ai' as const, text: 'Perfect. And do you have a target monthly budget in mind?' },
  { role: 'user' as const, text: 'Around $2,500.' },
  { role: 'ai' as const, text: 'Great, that helps. We currently have three available units that match your criteria. Would you like me to schedule a viewing for you?' },
  { role: 'user' as const, text: 'Yes, that would be great.' },
  { role: 'ai' as const, text: 'Awesome. Could I get your full name, please?' },
  { role: 'user' as const, text: 'Michael Thompson.' },
  { role: 'ai' as const, text: "Thanks, Michael. And what's the best phone number to reach you?" },
  { role: 'user' as const, text: "It's (323) 555-7429." },
  { role: 'ai' as const, text: "Got it. I've scheduled you for a viewing this Thursday at 5 PM. You'll receive a confirmation shortly." },
  { role: 'user' as const, text: 'Perfect, thank you.' },
  { role: 'ai' as const, text: "You're welcome, Michael. Looking forward to seeing you." },
];

const callReportData = [
  { label: 'Name', value: 'Michael Thompson' },
  { label: 'Contact', value: '(323) 555-7429' },
  { label: 'Intent', value: 'Viewing Request' },
  { label: 'Budget', value: '$2,500/mo' },
  { label: 'Location', value: 'Koreatown LA' },
  { label: 'Scheduled', value: 'Thu 5 PM' },
];

export const AIReceptionistScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerProgress = spring({ frame: frame - 5, fps: 30, config: { damping: 200 } });
  const flowDelay = 20;
  const detailDelay = 60;

  const detailProgress = spring({ frame: frame - detailDelay, fps: 30, config: { damping: 200 } });

  // Calculate which messages are visible and scroll offset
  const messageAppearInterval = 22;
  const visibleCount = Math.floor(Math.max(0, frame - detailDelay - 10) / messageAppearInterval) + 1;
  const clampedVisible = Math.min(visibleCount, chatMessages.length);

  // Each message ~60px height + 12px gap = ~72px per message. Container ~520px tall.
  // After ~7 messages visible, start scrolling
  const maxVisibleInView = 6;
  const scrollMessages = Math.max(0, clampedVisible - maxVisibleInView);
  const scrollPerMessage = 72;
  const targetScroll = scrollMessages * scrollPerMessage;

  // Smooth scroll
  const scrollY = interpolate(
    frame,
    [detailDelay + 10 + maxVisibleInView * messageAppearInterval, detailDelay + 10 + (maxVisibleInView + 1) * messageAppearInterval, detailDelay + 10 + chatMessages.length * messageAppearInterval],
    [0, scrollPerMessage, targetScroll],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const flowSteps = [
    { icon: <PhoneIcon size={28} color={colors.blue} />, label: 'Call In', color: colors.blue },
    { icon: <BotIcon size={28} color={colors.blue} />, label: 'AI Picks Up', color: colors.blue },
    { icon: <UserIcon size={28} color={colors.purple} />, label: 'Understands', color: colors.purple },
    { icon: <CheckIcon size={28} color={colors.green} />, label: 'Handles', color: colors.green },
    { icon: <CalendarIcon size={28} color={colors.cyan} />, label: 'Schedules', color: colors.cyan },
    { icon: <ChartIcon size={28} color={colors.blue} />, label: 'Reports', color: colors.blue },
  ];

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />
      <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ opacity: headerProgress, transform: `translateY(${(1 - headerProgress) * 20}px)`, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors.blue }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.blue, textTransform: 'uppercase' as const, letterSpacing: 2 }}>WORKFLOW 1</span>
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: colors.text }}>AI Receptionist</div>
        </div>

        {/* Flow Diagram */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 24, gap: 0 }}>
          {flowSteps.map((step, i) => (
            <FlowStep
              key={i}
              icon={step.icon}
              label={step.label}
              color={step.color}
              index={i}
              showConnector={i < flowSteps.length - 1}
              appearDelay={flowDelay}
            />
          ))}
        </div>

        {/* Detail Area */}
        <div style={{ display: 'flex', flex: 1, gap: 24, minHeight: 0 }}>
          {/* Left: AI Conversation */}
          <div
            style={{
              flex: 1,
              background: colors.card,
              border: `1px solid ${colors.blue}33`,
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              opacity: detailProgress,
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <BotIcon size={18} color={colors.blue} />
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.blue }}>AI Assistant</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <div style={{ transform: `translateY(-${scrollY}px)` }}>
                {chatMessages.map((msg, i) => {
                  if (i >= clampedVisible) return null;
                  const msgProgress = spring({
                    frame: frame - (detailDelay + 10 + i * messageAppearInterval),
                    fps: 30,
                    config: { damping: 200 },
                  });
                  const isAI = msg.role === 'ai';
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: isAI ? 'flex-start' : 'flex-end',
                        marginBottom: 12,
                        opacity: msgProgress,
                        transform: `translateY(${(1 - msgProgress) * 10}px)`,
                      }}
                    >
                      <div
                        style={{
                          background: isAI ? colors.blueDim : colors.purpleDim,
                          border: `1px solid ${isAI ? colors.blue : colors.purple}22`,
                          borderRadius: 12,
                          padding: '12px 18px',
                          maxWidth: '85%',
                          fontSize: 18,
                          lineHeight: 1.4,
                          color: colors.text,
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: 3 Cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Card 1: Intent Detected */}
            <div
              style={{
                background: colors.card,
                border: `1px solid ${colors.green}33`,
                borderRadius: 16,
                padding: 20,
                opacity: spring({ frame: frame - (detailDelay + 10), fps: 30, config: { damping: 200 } }),
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: colors.text, textTransform: 'uppercase' as const, marginBottom: 14, letterSpacing: 1 }}>
                Intent Detected
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
                {['Prospect Inquiry', 'Tenant Issue', 'General Question'].map((tag, i) => {
                  const isActive = i === 0;
                  return (
                    <div
                      key={i}
                      style={{
                        padding: '16px 24px',
                        borderRadius: 10,
                        fontSize: 18,
                        fontWeight: 600,
                        background: isActive ? colors.greenDim : colors.surface,
                        color: isActive ? colors.green : colors.muted,
                        border: `1px solid ${isActive ? colors.green + '44' : 'transparent'}`,
                        boxShadow: isActive ? `0 0 16px ${colors.greenGlow}` : 'none',
                      }}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Call Report */}
            <div
              style={{
                flex: 1,
                background: colors.card,
                border: `1px solid ${colors.blue}22`,
                borderRadius: 16,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                opacity: spring({ frame: frame - (detailDelay + 20), fps: 30, config: { damping: 200 } }),
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.secondary, textTransform: 'uppercase' as const, marginBottom: 14, letterSpacing: 1 }}>
                Call Report
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
                {callReportData.map((item, i) => (
                  <div key={i} style={{ background: colors.surface, borderRadius: 10, padding: '14px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Key Messages */}
            <div
              style={{
                flex: 1,
                background: colors.card,
                border: `1px solid ${colors.blue}22`,
                borderRadius: 16,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                opacity: spring({ frame: frame - (detailDelay + 30), fps: 30, config: { damping: 200 } }),
              }}
            >
              <KeyMessage
                messages={['Never miss a call', '24/7 AI answering', 'Books viewings automatically']}
                color={colors.blue}
                startFrame={detailDelay + 40}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
