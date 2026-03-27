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
  MailIcon,
  SearchIcon,
  CheckIcon,
  WrenchIcon,
  AlertIcon,
  DollarIcon,
} from "../components/Icons";

const TENANT_EMAIL_LINES = [
  "From: Sarah Mitchell \u2014 Unit 4B",
  "",
  "Hi,",
  "",
  "The kitchen sink has been leaking since",
  "this morning. Water is pooling under the",
  "cabinet. Could someone take a look?",
  "",
  "Thanks,",
  "Sarah",
];

const AI_TAGS = [
  { label: "Plumbing", color: COLORS.blue },
  { label: "High Priority", color: COLORS.orange },
  { label: "Unit 4B", color: COLORS.cyan },
];

const STATUS_TIMELINE = [
  { time: "9:15 AM", label: "Request Received", status: "done" as const },
  { time: "9:15 AM", label: "AI Analysis Complete", status: "done" as const },
  { time: "9:16 AM", label: "Auto-Approved (< $500)", status: "done" as const },
  { time: "9:18 AM", label: "Vendor Dispatched", status: "done" as const },
  { time: "11:30 AM", label: "Repair Completed", status: "active" as const },
];

export const Scene4RepairMaintenance: React.FC = () => {
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

  // Typing for tenant email
  const emailStart = Math.round(2 * fps);
  const charsPerFrame = 2;
  const totalChars = TENANT_EMAIL_LINES.join("\n").length;
  const typedChars = Math.max(0, Math.floor((frame - emailStart) * charsPerFrame));

  const getTypedText = () => {
    let remaining = typedChars;
    const result: string[] = [];
    for (const line of TENANT_EMAIL_LINES) {
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
        padding: "50px 70px",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 24,
          opacity: headerEntrance,
          transform: `translateX(${interpolate(headerEntrance, [0, 1], [-30, 0])}px)`,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: COLORS.green,
            boxShadow: `0 0 12px ${COLORS.greenGlow}`,
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.green,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Workflow 3
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.textPrimary,
            letterSpacing: -0.5,
          }}
        >
          Repair & Maintenance Automation
        </span>
      </div>

      {/* Flow Steps */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: 30,
          transform: `translateX(${slideFromRight}px)`,
        }}
      >
        <FlowStep icon={<MailIcon color={COLORS.green} size={20} />} label="Request" color={COLORS.green} index={0} />
        <FlowStep icon={<SearchIcon color={COLORS.green} size={20} />} label="Analyze" color={COLORS.green} index={1} />
        <FlowStep icon={<DollarIcon color={COLORS.blue} size={20} />} label="Approve" color={COLORS.blue} index={2} />
        <FlowStep icon={<WrenchIcon color={COLORS.blue} size={20} />} label="Dispatch" color={COLORS.blue} index={3} />
        <FlowStep icon={<AlertIcon color={COLORS.cyan} size={20} />} label="Track" color={COLORS.cyan} index={4} />
        <FlowStep icon={<CheckIcon color={COLORS.green} size={20} />} label="Complete" color={COLORS.green} index={5} isLast />
      </div>

      {/* Two columns */}
      <div style={{ display: "flex", gap: 30, flex: 1 }}>
        {/* Left — Tenant Email + AI Tags */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Tenant Email */}
          <div
            style={{
              backgroundColor: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: 20,
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.textMuted,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Tenant Request
            </div>

            <div
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                lineHeight: 1.7,
                color: COLORS.textSecondary,
              }}
            >
              {typedLines.map((line, i) => (
                <div key={i} style={{ minHeight: 20 }}>
                  {i === 0 ? (
                    <span style={{ fontWeight: 700, color: COLORS.textPrimary }}>
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
                    width: 8,
                    height: 16,
                    backgroundColor: COLORS.green,
                    opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                    verticalAlign: "middle",
                    marginLeft: 2,
                  }}
                />
              )}
            </div>
          </div>

          {/* AI Analysis Tags */}
          {(() => {
            const tagsDelay = Math.round(6 * fps);
            const tagsEntrance = spring({
              frame: frame - tagsDelay,
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
                  padding: 16,
                  opacity: tagsEntrance,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  AI Analysis
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {AI_TAGS.map((tag, i) => {
                    const tagEntrance = spring({
                      frame: frame - tagsDelay - 5 - i * 6,
                      fps,
                      config: { damping: 200, stiffness: 170 },
                      durationInFrames: Math.round(0.5 * fps),
                    });

                    return (
                      <div
                        key={i}
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: tag.color,
                          backgroundColor: tag.color + "15",
                          border: `1px solid ${tag.color}30`,
                          padding: "6px 14px",
                          borderRadius: 20,
                          opacity: tagEntrance,
                          transform: `scale(${tagEntrance})`,
                        }}
                      >
                        {tag.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Approval Logic */}
          {(() => {
            const approvalDelay = Math.round(8 * fps);
            const approvalEntrance = spring({
              frame: frame - approvalDelay,
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
                  padding: 16,
                  opacity: approvalEntrance,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Approval Logic
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 12px",
                      borderRadius: 8,
                      backgroundColor: COLORS.greenDim,
                      border: `1px solid ${COLORS.green}30`,
                    }}
                  >
                    <CheckIcon color={COLORS.green} size={16} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.green }}>
                      Under $500 \u2192 Auto-Approved
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 12px",
                      borderRadius: 8,
                      backgroundColor: COLORS.orangeDim,
                      border: `1px solid ${COLORS.orange}30`,
                    }}
                  >
                    <AlertIcon color={COLORS.orange} size={16} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.orange }}>
                      Over $500 \u2192 Manual Review
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Live Status Timeline */}
          {(() => {
            const timelineDelay = Math.round(10 * fps);
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
                  padding: 16,
                  opacity: timelineEntrance,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Live Status
                </div>

                {STATUS_TIMELINE.map((step, i) => {
                  const stepEntrance = spring({
                    frame: frame - timelineDelay - 4 - i * 8,
                    fps,
                    config: { damping: 200, stiffness: 170 },
                    durationInFrames: Math.round(0.6 * fps),
                  });

                  const isDone = step.status === "done";
                  const dotColor = isDone ? COLORS.green : COLORS.cyan;

                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: i < STATUS_TIMELINE.length - 1 ? 10 : 0,
                        opacity: stepEntrance,
                        transform: `translateX(${interpolate(stepEntrance, [0, 1], [15, 0])}px)`,
                      }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: isDone ? dotColor : "transparent",
                          border: `2px solid ${dotColor}`,
                          boxShadow: `0 0 6px ${dotColor}40`,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: COLORS.textMuted,
                          width: 60,
                          flexShrink: 0,
                        }}
                      >
                        {step.time}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: isDone ? COLORS.textSecondary : COLORS.cyan,
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Key Messages */}
          {(() => {
            const msgDelay = Math.round(16 * fps);
            return (
              <div style={{ opacity: interpolate(frame, [msgDelay, msgDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                <KeyMessage
                  messages={[
                    "Instant triage and classification",
                    "Smart approval routing",
                    "Full audit trail",
                  ]}
                  color={COLORS.green}
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
