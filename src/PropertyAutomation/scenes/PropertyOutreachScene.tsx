import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../theme";
import {
  DatabaseIcon,
  SearchIcon,
  MailIcon,
  SendIcon,
  ClockIcon,
  ChartIcon,
} from "../components/Icons";
import { FlowStep } from "../components/FlowStep";
import { KeyMessage } from "../components/KeyMessage";

export const PropertyOutreachScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const flowStart = 1.5 * fps;
  const detailStart = 7 * fps;
  const followUpStart = 11 * fps;
  const dashboardStart = 15 * fps;
  const messagesStart = 17 * fps;

  // Email generation animation - typing effect
  const emailTypingProgress = interpolate(
    frame,
    [detailStart, detailStart + 3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Follow up timeline
  const followUp1 = spring({
    frame,
    fps,
    delay: followUpStart,
    config: { damping: 200 },
  });
  const followUp2 = spring({
    frame,
    fps,
    delay: followUpStart + 20,
    config: { damping: 200 },
  });
  const followUp3 = spring({
    frame,
    fps,
    delay: followUpStart + 40,
    config: { damping: 200 },
  });

  // Dashboard
  const dashEntrance = spring({
    frame,
    fps,
    delay: dashboardStart,
    config: { damping: 200 },
  });

  const emailText =
    "Subject: Quick question about your property\n\nHi David,\n\nI noticed your property on South Western Avenue has been on the market for a while.\n\nAt Secured Properties Management Group, we help property owners in Los Angeles reduce vacancy and secure qualified tenants faster through targeted outreach and automation.\n\nWe've been working with owners in similar situations and have helped increase inquiries and booked viewings within a few weeks.\n\nHappy to share a few ideas tailored to your property if you're open to it.\n\nWould you be available for a quick 10-minute call this week?\n\nBest,\nJay Chu\nSecured Properties Management Group";
  const visibleChars = Math.floor(emailTypingProgress * emailText.length);

  return (
    <AbsoluteFill
      style={{
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
          opacity: headerEntrance,
          transform: `translateY(${(1 - headerEntrance) * 20}px)`,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: COLORS.purple,
            boxShadow: `0 0 12px ${COLORS.purpleGlow}`,
          }}
        />
        <span
          style={{
            color: COLORS.purple,
            fontSize: 16,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Workflow 2
        </span>
      </div>

      <h2
        style={{
          color: COLORS.text,
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: 0,
          marginBottom: 40,
          opacity: headerEntrance,
          transform: `translateY(${(1 - headerEntrance) * 20}px)`,
        }}
      >
        Automated Property Outreach
      </h2>

      {/* Flow */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 0,
          marginBottom: 36,
        }}
      >
        <FlowStep
          icon={<DatabaseIcon size={28} color={COLORS.purple} />}
          label="Scrape"
          delay={flowStart}
          color={COLORS.purple}
          glowColor={COLORS.purpleGlow}
        />
        <FlowStep
          icon={<SearchIcon size={28} color={COLORS.purple} />}
          label="Filter"
          delay={flowStart + 6}
          color={COLORS.purple}
          glowColor={COLORS.purpleGlow}
        />
        <FlowStep
          icon={<MailIcon size={28} color={COLORS.blue} />}
          label="Personalize"
          delay={flowStart + 12}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<SendIcon size={28} color={COLORS.blue} />}
          label="Send"
          delay={flowStart + 18}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<ClockIcon size={28} color={COLORS.cyan} />}
          label="Follow-Up"
          delay={flowStart + 24}
          color={COLORS.cyan}
          glowColor={COLORS.cyanDim}
        />
        <FlowStep
          icon={<ChartIcon size={28} color={COLORS.green} />}
          label="Dashboard"
          delay={flowStart + 30}
          color={COLORS.green}
          glowColor={COLORS.greenGlow}
          showConnector={false}
        />
      </div>

      {/* Detail area */}
      <div style={{ display: "flex", gap: 32, flex: 1 }}>
        {/* Left - Email preview */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [detailStart - 10, detailStart],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              ),
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.purple}33`,
              borderRadius: 16,
              padding: 24,
              flex: 1,
            }}
          >
            {/* Email header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                borderBottom: `1px solid ${COLORS.surface}`,
                paddingBottom: 12,
              }}
            >
              <MailIcon size={16} color={COLORS.purple} />
              <span
                style={{
                  color: COLORS.purple,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                AI-Generated Email
              </span>
              <div style={{ flex: 1 }} />
              <span
                style={{
                  color: COLORS.textMuted,
                  fontSize: 12,
                }}
              >
                To: david.owner@email.com
              </span>
            </div>
            {/* Email body - typing animation with line breaks */}
            <div
              style={{
                color: COLORS.textSecondary,
                fontSize: 13,
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {emailText.slice(0, visibleChars)}
              {emailTypingProgress < 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 14,
                    background: COLORS.purple,
                    marginLeft: 2,
                    opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                    verticalAlign: "middle",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right - Follow-up + Dashboard + Messages */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Follow-up timeline - moved up and made bigger */}
          <div
            style={{
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.purple}22`,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <span
              style={{
                color: COLORS.text,
                fontSize: 16,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 16,
              }}
            >
              Follow-Up Sequence
            </span>
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[
                { label: "Initial Send", time: "Day 1", progress: followUp1, color: COLORS.purple },
                { label: "Follow-up", time: "Day 3", progress: followUp2, color: COLORS.blue },
                { label: "Final Nudge", time: "Day 7", progress: followUp3, color: COLORS.cyan },
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div
                    style={{
                      opacity: step.progress,
                      transform: `scale(${interpolate(step.progress, [0, 1], [0.8, 1])})`,
                      background: `${step.color}15`,
                      border: `2px solid ${step.color}66`,
                      borderRadius: 12,
                      padding: "14px 24px",
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    <div style={{ color: step.color, fontSize: 22, fontWeight: 700 }}>
                      {step.time}
                    </div>
                    <div style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 4, fontWeight: 500 }}>
                      {step.label}
                    </div>
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        width: 28,
                        height: 3,
                        background: `${step.color}66`,
                        opacity: step.progress,
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Stats dashboard */}
          <div
            style={{
              opacity: dashEntrance,
              transform: `translateY(${(1 - dashEntrance) * 20}px)`,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.purple}22`,
              borderRadius: 16,
              padding: 24,
              flex: 1,
            }}
          >
            <span
              style={{
                color: COLORS.textMuted,
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Campaign Dashboard
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginTop: 16,
              }}
            >
              {[
                { label: "Contacts Scraped", value: "2,847", color: COLORS.purple },
                { label: "Open Rate", value: "67%", color: COLORS.blue },
                { label: "Reply Rate", value: "23%", color: COLORS.cyan },
                { label: "Booked Calls", value: "41", color: COLORS.green },
              ].map((stat, i) => {
                const statEntrance = spring({
                  frame,
                  fps,
                  delay: dashboardStart + 8 + i * 8,
                  config: { damping: 200 },
                });
                return (
                  <div
                    key={i}
                    style={{
                      opacity: statEntrance,
                      transform: `translateY(${(1 - statEntrance) * 10}px)`,
                      background: COLORS.surface,
                      borderRadius: 10,
                      padding: 16,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: stat.color,
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        color: COLORS.textMuted,
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key messages - bigger with card background */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.purple}22`,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <KeyMessage
              text="Finds owners automatically"
              delay={messagesStart}
              color={COLORS.purple}
            />
            <KeyMessage
              text="Personalized outreach at scale"
              delay={messagesStart + 6}
              color={COLORS.purple}
            />
            <KeyMessage
              text="Growth on autopilot"
              delay={messagesStart + 12}
              color={COLORS.purple}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
