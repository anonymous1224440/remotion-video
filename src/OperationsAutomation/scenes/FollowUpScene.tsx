import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../PropertyAutomation/theme";
import {
  SearchIcon,
  MailIcon,
  SendIcon,
  ClockIcon,
  ZapIcon,
  CheckIcon,
} from "../../PropertyAutomation/components/Icons";
import { FlowStep } from "../../PropertyAutomation/components/FlowStep";
import { KeyMessage } from "../../PropertyAutomation/components/KeyMessage";

export const FollowUpScene: React.FC = () => {
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

  // Email typing animation
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
    "Subject: Missing Document — 120 Broadway\n\nHi David,\n\nWe're still missing the updated insurance certificate for 120 Broadway.\n\nCould you please send it over at your earliest convenience?\n\nThis is an automated reminder — no action needed if already submitted.\n\nBest regards,\nVPM NYC Operations";
  const visibleChars = Math.floor(emailTypingProgress * emailText.length);

  return (
    <AbsoluteFill
      style={{
        padding: "40px 60px",
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
          marginBottom: 20,
          opacity: headerEntrance,
          transform: `translateY(${(1 - headerEntrance) * 20}px)`,
        }}
      >
        Smart Follow-Up System
      </h2>

      {/* Flow */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 0,
          marginBottom: 20,
        }}
      >
        <FlowStep
          icon={<SearchIcon size={28} color={COLORS.purple} />}
          label="Detect"
          delay={flowStart}
          color={COLORS.purple}
          glowColor={COLORS.purpleGlow}
        />
        <FlowStep
          icon={<MailIcon size={28} color={COLORS.purple} />}
          label="Draft"
          delay={flowStart + 6}
          color={COLORS.purple}
          glowColor={COLORS.purpleGlow}
        />
        <FlowStep
          icon={<SendIcon size={28} color={COLORS.blue} />}
          label="Send"
          delay={flowStart + 12}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<ClockIcon size={28} color={COLORS.blue} />}
          label="Track"
          delay={flowStart + 18}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<ZapIcon size={28} color={COLORS.cyan} />}
          label="Remind"
          delay={flowStart + 24}
          color={COLORS.cyan}
          glowColor={COLORS.cyanDim}
        />
        <FlowStep
          icon={<CheckIcon size={28} color={COLORS.green} />}
          label="Resolved"
          delay={flowStart + 30}
          color={COLORS.green}
          glowColor={COLORS.greenGlow}
          showConnector={false}
        />
      </div>

      {/* Detail area */}
      <div style={{ display: "flex", gap: 32, flex: 1 }}>
        {/* Left - Email preview with typing */}
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
                Automated Follow-Up
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
            {/* Email body - typing animation */}
            <div
              style={{
                color: COLORS.textSecondary,
                fontSize: 18,
                lineHeight: 1.55,
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
          {/* Follow-up sequence timeline */}
          <div
            style={{
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.purple}22`,
              borderRadius: 16,
              padding: 20,
              opacity: followUp1,
              transform: `translateY(${(1 - followUp1) * 20}px)`,
            }}
          >
            <span
              style={{
                color: COLORS.text,
                fontSize: 18,
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
                { label: "Friendly Reminder", time: "Day 1", progress: followUp1, color: COLORS.purple },
                { label: "Second Follow-Up", time: "Day 4", progress: followUp2, color: COLORS.blue },
                { label: "Final Notice", time: "Day 8", progress: followUp3, color: COLORS.cyan },
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
                    <div style={{ color: step.color, fontSize: 26, fontWeight: 700 }}>
                      {step.time}
                    </div>
                    <div style={{ color: COLORS.textSecondary, fontSize: 15, marginTop: 4, fontWeight: 500 }}>
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

          {/* Response Tracking Dashboard */}
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
              Response Tracking
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
                { label: "Response Rate", value: "89%", color: COLORS.green },
                { label: "Avg. Response Time", value: "2.1 days", color: COLORS.blue },
                { label: "Active Follow-Ups", value: "156", color: COLORS.purple },
                { label: "Escalated", value: "12", color: COLORS.orange },
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
                        fontSize: 34,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        color: COLORS.textMuted,
                        fontSize: 14,
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

          {/* Key messages */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.purple}22`,
              borderRadius: 16,
              padding: 24,
              flex: 1,
              opacity: spring({ frame, fps, delay: messagesStart, config: { damping: 200 } }),
              transform: `translateY(${(1 - spring({ frame, fps, delay: messagesStart, config: { damping: 200 } })) * 20}px)`,
            }}
          >
            <KeyMessage
              text="No client falls through the cracks"
              delay={messagesStart}
              color={COLORS.purple}
            />
            <KeyMessage
              text="Automatic escalation"
              delay={messagesStart + 6}
              color={COLORS.purple}
            />
            <KeyMessage
              text="Zero manual follow-ups"
              delay={messagesStart + 12}
              color={COLORS.purple}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
