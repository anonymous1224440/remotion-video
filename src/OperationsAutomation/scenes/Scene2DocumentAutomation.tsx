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
  UserIcon,
  DatabaseIcon,
  SendIcon,
  ChartIcon,
} from "../components/Icons";

const EMAILS = [
  {
    subject: "Bank Statement \u2014 45 West 82nd St",
    status: "Auto-filed",
    statusColor: COLORS.green,
  },
  {
    subject: "Insurance Certificate \u2014 120 Broadway",
    status: "Auto-filed",
    statusColor: COLORS.green,
  },
  {
    subject: "Tax Document \u2014 Unit 7A, Park Ave",
    status: "Auto-filed",
    statusColor: COLORS.green,
  },
  {
    subject: "Monthly Report \u2014 315 East 65th",
    status: "Sent to owner",
    statusColor: COLORS.blue,
  },
];

const DOC_TAGS = [
  { label: "Bank Statement", color: COLORS.green, action: "\u2192 Filed to OneDrive" },
  { label: "Insurance Doc", color: COLORS.orange, action: "\u2192 Sent to Owner" },
  { label: "Tax Filing", color: COLORS.cyan, action: "\u2192 Filed & Logged" },
];

const DASHBOARD_ITEMS = [
  { label: "Documents Today", value: "47" },
  { label: "Auto-Filed", value: "43" },
  { label: "Sent to Clients", value: "12" },
  { label: "Storage", value: "OneDrive" },
  { label: "Not Recognized", value: "2" },
  { label: "Processing Time", value: "< 3s" },
];

export const Scene2DocumentAutomation: React.FC = () => {
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
            backgroundColor: COLORS.blue,
            boxShadow: `0 0 12px ${COLORS.blueGlow}`,
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.blue,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Workflow 1
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.textPrimary,
            letterSpacing: -0.5,
          }}
        >
          Automated File Saving & Distribution
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
        <FlowStep icon={<MailIcon color={COLORS.blue} size={20} />} label="Incoming" color={COLORS.blue} index={0} />
        <FlowStep icon={<SearchIcon color={COLORS.blue} size={20} />} label="Recognize" color={COLORS.blue} index={1} />
        <FlowStep icon={<UserIcon color={COLORS.purple} size={20} />} label="Identify" color={COLORS.purple} index={2} />
        <FlowStep icon={<DatabaseIcon color={COLORS.purple} size={20} />} label="Store" color={COLORS.purple} index={3} />
        <FlowStep icon={<SendIcon color={COLORS.cyan} size={20} />} label="Send" color={COLORS.cyan} index={4} />
        <FlowStep icon={<ChartIcon color={COLORS.green} size={20} />} label="Log" color={COLORS.green} index={5} isLast />
      </div>

      {/* Two columns */}
      <div
        style={{
          display: "flex",
          gap: 30,
          flex: 1,
        }}
      >
        {/* Left column — Email Inbox */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Email list */}
          <div
            style={{
              backgroundColor: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: 16,
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
                marginBottom: 12,
              }}
            >
              Incoming Emails
            </div>

            {EMAILS.map((email, i) => {
              const emailDelay = Math.round(3.5 * fps) + i * 12;
              const emailEntrance = spring({
                frame: frame - emailDelay,
                fps,
                config: { damping: 200, stiffness: 170 },
                durationInFrames: Math.round(0.6 * fps),
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: 8,
                    backgroundColor:
                      i % 2 === 0
                        ? "rgba(255,255,255,0.02)"
                        : "transparent",
                    marginBottom: 4,
                    opacity: emailEntrance,
                    transform: `translateX(${interpolate(emailEntrance, [0, 1], [-20, 0])}px)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: COLORS.blue,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: COLORS.textSecondary,
                      }}
                    >
                      {email.subject}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: email.statusColor,
                      backgroundColor: email.statusColor + "15",
                      padding: "3px 10px",
                      borderRadius: 20,
                      border: `1px solid ${email.statusColor}30`,
                    }}
                  >
                    {email.status} \u2713
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Document Detection Tags */}
          {(() => {
            const tagsDelay = Math.round(3.5 * fps);
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
                  Document Detection
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {DOC_TAGS.map((tag, i) => {
                    const tagEntrance = spring({
                      frame: frame - tagsDelay - 5 - i * 8,
                      fps,
                      config: { damping: 200, stiffness: 170 },
                      durationInFrames: Math.round(0.5 * fps),
                    });

                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          opacity: tagEntrance,
                          transform: `translateX(${interpolate(tagEntrance, [0, 1], [15, 0])}px)`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: tag.color,
                            backgroundColor: tag.color + "15",
                            border: `1px solid ${tag.color}30`,
                            padding: "5px 12px",
                            borderRadius: 20,
                            minWidth: 110,
                          }}
                        >
                          {tag.label}
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: COLORS.textMuted,
                          }}
                        >
                          {tag.action}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Processing Dashboard */}
          {(() => {
            const dashDelay = Math.round(10 * fps);
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
                  padding: 16,
                  opacity: dashEntrance,
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
                    marginBottom: 12,
                  }}
                >
                  Processing Dashboard
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 10,
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
                          padding: "10px 12px",
                          opacity: itemEntrance,
                          transform: `translateY(${interpolate(itemEntrance, [0, 1], [10, 0])}px)`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: COLORS.textPrimary,
                            marginBottom: 2,
                          }}
                        >
                          {item.value}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
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
            const msgDelay = Math.round(16 * fps);
            return (
              <div style={{ opacity: interpolate(frame, [msgDelay, msgDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                <KeyMessage
                  messages={[
                    "No manual uploads",
                    "Instant document routing",
                    "Every file in the right place",
                  ]}
                  color={COLORS.blue}
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
