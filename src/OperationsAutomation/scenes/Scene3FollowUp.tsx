import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { COLORS } from "../theme";
import { FlowStep } from "../components/FlowStep";
import { KeyMessage } from "../components/KeyMessage";
import {
  SearchIcon,
  MailIcon,
  SendIcon,
  ClockIcon,
  BellIcon,
  CheckIcon,
} from "../components/Icons";

const EMAIL_LINES = [
  "Subject: Missing Document \u2014 120 Broadway",
  "",
  "Hi David,",
  "",
  "Hope you're doing well.",
  "",
  "We're still missing the updated insurance",
  "certificate for your property at 120 Broadway.",
  "",
  "Could you please send it over when you",
  "have a moment?",
  "",
  "If you've already submitted it, feel free",
  "to ignore this message.",
  "",
  "Thank you,",
  "Luca Burato",
  "VPM NYC",
];

const TIMELINE_STEPS = [
  { day: "Day 1", label: "Friendly Reminder", desc: "Polite initial request sent automatically", color: COLORS.purple },
  { day: "Day 4", label: "Second Follow-Up", desc: "Gentle nudge with updated urgency", color: COLORS.blue },
  { day: "Day 8", label: "Final Notice", desc: "Escalation to property manager", color: COLORS.cyan },
];

const DASHBOARD_ITEMS = [
  { label: "Response Rate", value: "89%" },
  { label: "Avg. Response Time", value: "2.1 days" },
  { label: "Active Follow-Ups", value: "156" },
  { label: "Escalated", value: "12" },
];

export const Scene3FollowUp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, Math.round(0.5 * fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - Math.round(1 * fps), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 170 },
    durationInFrames: Math.round(1 * fps),
  });

  const slideFromRight = interpolate(
    frame,
    [0, Math.round(0.8 * fps)],
    [60, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  // Typing animation for email
  const emailStart = Math.round(7 * fps);
  const charsPerFrame = 1.5;
  const totalChars = EMAIL_LINES.join("\n").length;
  const typedChars = Math.max(0, Math.floor((frame - emailStart) * charsPerFrame));

  const getTypedText = () => {
    let remaining = typedChars;
    const result: string[] = [];
    for (const line of EMAIL_LINES) {
      if (remaining <= 0) break;
      if (remaining >= line.length) {
        result.push(line);
        remaining -= line.length + 1;
      } else {
        result.push(line.slice(0, remaining));
        remaining = 0;
      }
    }
    return result;
  };

  const typedLines = getTypedText();
  const isTypingDone = typedChars >= totalChars;

  return (
    <AbsoluteFill
      style={{
        padding: "40px 60px",
        opacity: fadeIn * fadeOut,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
          opacity: headerEntrance,
          transform: `translateX(${interpolate(headerEntrance, [0, 1], [-30, 0])}px)`,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: COLORS.purple,
            boxShadow: `0 0 12px ${COLORS.purpleGlow}`,
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.purple,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Workflow 2
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.textPrimary,
            letterSpacing: -0.5,
          }}
        >
          Smart Follow-Up System
        </span>
      </div>

      {/* Flow Steps */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: 24,
          transform: `translateX(${slideFromRight}px)`,
        }}
      >
        <FlowStep icon={<SearchIcon color={COLORS.purple} size={20} />} label="Detect" color={COLORS.purple} index={0} />
        <FlowStep icon={<MailIcon color={COLORS.purple} size={20} />} label="Draft" color={COLORS.purple} index={1} />
        <FlowStep icon={<SendIcon color={COLORS.blue} size={20} />} label="Send" color={COLORS.blue} index={2} />
        <FlowStep icon={<ClockIcon color={COLORS.blue} size={20} />} label="Track" color={COLORS.blue} index={3} />
        <FlowStep icon={<BellIcon color={COLORS.cyan} size={20} />} label="Remind" color={COLORS.cyan} index={4} />
        <FlowStep icon={<CheckIcon color={COLORS.green} size={20} />} label="Resolved" color={COLORS.green} index={5} isLast />
      </div>

      {/* Two columns — fill remaining space */}
      <div style={{ display: "flex", gap: 24, flex: 1, minHeight: 0 }}>
        {/* Left — Follow-Up Email */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {(() => {
            const emailEntrance = spring({
              frame: frame - emailStart + 10,
              fps,
              config: { damping: 200, stiffness: 170 },
              durationInFrames: Math.round(0.8 * fps),
            });

            return (
              <div
                style={{
                  backgroundColor: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: "16px 22px 22px",
                  flex: 1,
                  opacity: emailEntrance,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Auto-Generated Follow-Up
                </div>

                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: COLORS.textSecondary,
                    flex: 1,
                  }}
                >
                  {typedLines.map((line, i) => (
                    <div key={i} style={{ minHeight: 26 }}>
                      {i === 0 ? (
                        <span style={{ fontWeight: 700, color: COLORS.textPrimary, fontSize: 17 }}>
                          {line}
                        </span>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                  {!isTypingDone && frame > emailStart && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 9,
                        height: 18,
                        backgroundColor: COLORS.purple,
                        opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                        verticalAlign: "middle",
                        marginLeft: 2,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Follow-Up Sequence Timeline */}
          {(() => {
            const timelineDelay = Math.round(11 * fps);
            const timelineEntrance = spring({
              frame: frame - timelineDelay,
              fps,
              config: { damping: 200, stiffness: 170 },
              durationInFrames: Math.round(0.8 * fps),
            });

            return (
              <div
                style={{
                  backgroundColor: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: "16px 18px",
                  opacity: timelineEntrance,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Follow-Up Sequence
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {TIMELINE_STEPS.map((step, i) => {
                    const stepEntrance = spring({
                      frame: frame - timelineDelay - 4 - i * 8,
                      fps,
                      config: { damping: 200, stiffness: 170 },
                      durationInFrames: Math.round(0.6 * fps),
                    });

                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 14,
                          opacity: stepEntrance,
                          transform: `translateX(${interpolate(stepEntrance, [0, 1], [15, 0])}px)`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: 20,
                            paddingTop: 3,
                          }}
                        >
                          <div
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              backgroundColor: step.color + "30",
                              border: `2px solid ${step.color}`,
                              boxShadow: `0 0 10px ${step.color}40`,
                            }}
                          />
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: step.color,
                              letterSpacing: 0.5,
                              marginBottom: 2,
                            }}
                          >
                            {step.day}
                          </div>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: COLORS.textSecondary,
                              marginBottom: 3,
                            }}
                          >
                            {step.label}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 400,
                              color: COLORS.textMuted,
                            }}
                          >
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Response Tracking Dashboard */}
          {(() => {
            const dashDelay = Math.round(15 * fps);
            const dashEntrance = spring({
              frame: frame - dashDelay,
              fps,
              config: { damping: 200, stiffness: 170 },
              durationInFrames: Math.round(0.8 * fps),
            });

            return (
              <div
                style={{
                  backgroundColor: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: "16px 18px",
                  opacity: dashEntrance,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Response Tracking
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    flex: 1,
                  }}
                >
                  {DASHBOARD_ITEMS.map((item, i) => {
                    const itemEntrance = spring({
                      frame: frame - dashDelay - 4 - i * 4,
                      fps,
                      config: { damping: 200, stiffness: 170 },
                      durationInFrames: Math.round(0.5 * fps),
                    });

                    return (
                      <div
                        key={i}
                        style={{
                          backgroundColor: "rgba(255,255,255,0.03)",
                          borderRadius: 8,
                          padding: "14px 14px",
                          opacity: itemEntrance,
                          transform: `translateY(${interpolate(itemEntrance, [0, 1], [10, 0])}px)`,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: COLORS.textPrimary,
                            marginBottom: 4,
                          }}
                        >
                          {item.value}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: COLORS.textMuted,
                          }}
                        >
                          {item.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Key Messages */}
          {(() => {
            const msgDelay = Math.round(17 * fps);
            return (
              <div style={{ opacity: interpolate(frame, [msgDelay, msgDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                <KeyMessage
                  messages={[
                    "No client falls through the cracks",
                    "Automatic escalation",
                    "Zero manual follow-ups",
                  ]}
                  color={COLORS.purple}
                  delayFrames={msgDelay}
                />
              </div>
            );
          })()}
        </div>
      </div>
    </AbsoluteFill>
  );
};
