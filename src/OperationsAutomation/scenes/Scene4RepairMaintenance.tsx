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
  "I've placed a towel underneath but it's",
  "getting worse. Would appreciate if",
  "someone could come by today.",
  "",
  "Thanks,",
  "Sarah",
];

const AI_TAGS = [
  { label: "Plumbing", color: COLORS.blue, detail: "Category detected" },
  { label: "High Priority", color: COLORS.orange, detail: "Water damage risk" },
  { label: "Unit 4B", color: COLORS.cyan, detail: "Location identified" },
  { label: "Est. $180", color: COLORS.green, detail: "Cost estimate" },
];

const STATUS_TIMELINE = [
  { time: "9:15 AM", label: "Request Received", desc: "Email parsed and logged", status: "done" as const },
  { time: "9:15 AM", label: "AI Analysis Complete", desc: "Category, priority, unit identified", status: "done" as const },
  { time: "9:16 AM", label: "Auto-Approved (< $500)", desc: "Within auto-approval threshold", status: "done" as const },
  { time: "9:18 AM", label: "Vendor Dispatched", desc: "Plumber notified via SMS", status: "done" as const },
  { time: "11:30 AM", label: "Repair Completed", desc: "Tenant confirmed resolution", status: "active" as const },
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
          marginBottom: 24,
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

      {/* Two columns — fill remaining space */}
      <div style={{ display: "flex", gap: 24, flex: 1, minHeight: 0 }}>
        {/* Left — Tenant Email + AI Tags */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Tenant Email */}
          <div
            style={{
              backgroundColor: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: "16px 22px 22px",
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
              Tenant Request
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
                  padding: "16px 18px",
                  opacity: tagsEntrance,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  AI Analysis
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                          opacity: tagEntrance,
                          transform: `scale(${tagEntrance})`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: tag.color,
                            backgroundColor: tag.color + "15",
                            border: `1px solid ${tag.color}30`,
                            padding: "6px 16px",
                            borderRadius: 20,
                          }}
                        >
                          {tag.label}
                        </div>
                        <span style={{ fontSize: 10, color: COLORS.textMuted }}>{tag.detail}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
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
                  padding: "16px 18px",
                  opacity: approvalEntrance,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Approval Logic
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      borderRadius: 8,
                      backgroundColor: COLORS.greenDim,
                      border: `1px solid ${COLORS.green}30`,
                    }}
                  >
                    <CheckIcon color={COLORS.green} size={18} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.green }}>
                      Under $500 \u2192 Auto-Approved
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      borderRadius: 8,
                      backgroundColor: COLORS.orangeDim,
                      border: `1px solid ${COLORS.orange}30`,
                    }}
                  >
                    <AlertIcon color={COLORS.orange} size={18} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.orange }}>
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
                    marginBottom: 14,
                  }}
                >
                  Live Status
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                          alignItems: "flex-start",
                          gap: 12,
                          opacity: stepEntrance,
                          transform: `translateX(${interpolate(stepEntrance, [0, 1], [15, 0])}px)`,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: isDone ? dotColor : "transparent",
                            border: `2px solid ${dotColor}`,
                            boxShadow: `0 0 8px ${dotColor}40`,
                            flexShrink: 0,
                            marginTop: 3,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: COLORS.textMuted,
                            width: 60,
                            flexShrink: 0,
                            marginTop: 1,
                          }}
                        >
                          {step.time}
                        </span>
                        <div>
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: isDone ? COLORS.textSecondary : COLORS.cyan,
                            }}
                          >
                            {step.label}
                          </span>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 400,
                              color: COLORS.textMuted,
                              marginTop: 2,
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
