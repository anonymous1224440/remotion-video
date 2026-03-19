import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { colors } from '../theme';
import { Background } from '../components/Background';
import { FlowStep } from '../components/FlowStep';
import { KeyMessage } from '../components/KeyMessage';
import { DatabaseIcon, SearchIcon, MailIcon, SendIcon, ClockIcon, ChartIcon } from '../components/Icons';

const { fontFamily } = loadFont();

const emailText = `Subject: Quick question about your property

Hi David,

I noticed your property on South Western Avenue has been on the market for a while.

At Secured Properties Management Group, we help property owners in Los Angeles reduce vacancy and secure qualified tenants faster through targeted outreach and automation.

We've been working with owners in similar situations and have helped increase inquiries and booked viewings within a few weeks.

Happy to share a few ideas tailored to your property if you're open to it.

Would you be available for a quick 10-minute call this week?

Best,
Jay Chu
Secured Properties Management Group`;

const dashboardStats = [
  { label: 'Contacts Scraped', value: '2,847', color: colors.purple },
  { label: 'Open Rate', value: '67%', color: colors.blue },
  { label: 'Reply Rate', value: '23%', color: colors.cyan },
  { label: 'Booked Calls', value: '41', color: colors.green },
];

export const PropertyOutreachScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerProgress = spring({ frame: frame - 5, fps: 30, config: { damping: 200 } });
  const flowDelay = 20;
  const detailDelay = 60;
  const detailProgress = spring({ frame: frame - detailDelay, fps: 30, config: { damping: 200 } });

  // Typing animation: show characters over 3 seconds (90 frames)
  const typingStart = detailDelay + 20;
  const typingDuration = 150;
  const typingProgress = interpolate(frame, [typingStart, typingStart + typingDuration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const visibleChars = Math.floor(typingProgress * emailText.length);
  const displayedText = emailText.slice(0, visibleChars);
  const showCursor = typingProgress < 1 && frame > typingStart && Math.floor(frame / 8) % 2 === 0;

  const flowSteps = [
    { icon: <DatabaseIcon size={28} color={colors.purple} />, label: 'Scrape', color: colors.purple },
    { icon: <SearchIcon size={28} color={colors.purple} />, label: 'Filter', color: colors.purple },
    { icon: <MailIcon size={28} color={colors.blue} />, label: 'Personalize', color: colors.blue },
    { icon: <SendIcon size={28} color={colors.blue} />, label: 'Send', color: colors.blue },
    { icon: <ClockIcon size={28} color={colors.cyan} />, label: 'Follow-Up', color: colors.cyan },
    { icon: <ChartIcon size={28} color={colors.green} />, label: 'Dashboard', color: colors.green },
  ];

  const followUpSteps = [
    { day: '1', label: 'Initial Send', color: colors.purple },
    { day: '3', label: 'Follow-up', color: colors.blue },
    { day: '7', label: 'Final Nudge', color: colors.cyan },
  ];

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />
      <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ opacity: headerProgress, transform: `translateY(${(1 - headerProgress) * 20}px)`, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors.purple }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.purple, textTransform: 'uppercase' as const, letterSpacing: 2 }}>WORKFLOW 2</span>
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: colors.text }}>Automated Property Outreach</div>
        </div>

        {/* Flow Diagram */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 24 }}>
          {flowSteps.map((step, i) => (
            <FlowStep key={i} icon={step.icon} label={step.label} color={step.color} index={i} showConnector={i < flowSteps.length - 1} appearDelay={flowDelay} />
          ))}
        </div>

        {/* Detail Area */}
        <div style={{ display: 'flex', flex: 1, gap: 24, minHeight: 0 }}>
          {/* Left: Email Preview */}
          <div
            style={{
              flex: 1,
              background: colors.card,
              border: `1px solid ${colors.purple}33`,
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              opacity: detailProgress,
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <MailIcon size={18} color={colors.purple} />
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.purple }}>AI-Generated Email</span>
            </div>
            <div style={{ fontSize: 12, color: colors.muted, marginBottom: 16 }}>
              To: <span style={{ textDecoration: 'underline', color: colors.secondary }}>david.owner@email.com</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: colors.text, whiteSpace: 'pre-wrap' as const }}>
                {displayedText}
                {showCursor && <span style={{ color: colors.purple, fontWeight: 700 }}>|</span>}
              </div>
            </div>
          </div>

          {/* Right: 3 Cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Card 1: Follow-Up Sequence */}
            <div
              style={{
                background: colors.card,
                border: `1px solid ${colors.purple}22`,
                borderRadius: 16,
                padding: 20,
                opacity: spring({ frame: frame - (detailDelay + 10), fps: 30, config: { damping: 200 } }),
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, textTransform: 'uppercase' as const, marginBottom: 16, letterSpacing: 1 }}>
                Follow-Up Sequence
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, justifyContent: 'center' }}>
                {followUpSteps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div
                      style={{
                        background: step.color + '22',
                        border: `1px solid ${step.color}44`,
                        borderRadius: 12,
                        padding: '12px 20px',
                        textAlign: 'center' as const,
                      }}
                    >
                      <div style={{ fontSize: 22, fontWeight: 700, color: step.color }}>Day {step.day}</div>
                      <div style={{ fontSize: 13, color: colors.secondary }}>{step.label}</div>
                    </div>
                    {i < followUpSteps.length - 1 && (
                      <div style={{ width: 30, height: 2, background: colors.muted + '44', margin: '0 4px' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Card 2: Campaign Dashboard */}
            <div
              style={{
                flex: 1,
                background: colors.card,
                border: `1px solid ${colors.purple}22`,
                borderRadius: 16,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                opacity: spring({ frame: frame - (detailDelay + 20), fps: 30, config: { damping: 200 } }),
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.secondary, textTransform: 'uppercase' as const, marginBottom: 14, letterSpacing: 1 }}>
                Campaign Dashboard
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1 }}>
                {dashboardStats.map((stat, i) => (
                  <div key={i} style={{ background: colors.surface, borderRadius: 12, padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ fontSize: 34, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: 14, color: colors.muted, marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Key Messages */}
            <div
              style={{
                flex: 1,
                background: colors.card,
                border: `1px solid ${colors.purple}22`,
                borderRadius: 16,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                opacity: spring({ frame: frame - (detailDelay + 30), fps: 30, config: { damping: 200 } }),
              }}
            >
              <KeyMessage
                messages={['Finds owners automatically', 'Personalized outreach at scale', 'Growth on autopilot']}
                color={colors.purple}
                startFrame={detailDelay + 40}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
