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
  MailIcon,
  SearchIcon,
  WrenchIcon,
  SendIcon,
  CheckIcon,
  ShieldIcon,
} from "../components/Icons";
import { FlowStep } from "../components/FlowStep";
import { KeyMessage } from "../components/KeyMessage";

export const RepairRequestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const flowStart = 1.5 * fps;
  const detailStart = 7 * fps;
  const approvalStart = 12 * fps;
  const statusStart = 15 * fps;
  const messagesStart = 17 * fps;

  // Email card entrance
  const emailEntrance = spring({
    frame,
    fps,
    delay: detailStart,
    config: { damping: 200 },
  });

  // AI analysis
  const analysisEntrance = spring({
    frame,
    fps,
    delay: detailStart + 20,
    config: { damping: 200 },
  });

  // Approval split
  const approvalEntrance = spring({
    frame,
    fps,
    delay: approvalStart,
    config: { damping: 200 },
  });

  // Status timeline
  const statusEntrance = spring({
    frame,
    fps,
    delay: statusStart,
    config: { damping: 200 },
  });

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
            background: COLORS.green,
            boxShadow: `0 0 12px ${COLORS.greenGlow}`,
          }}
        />
        <span
          style={{
            color: COLORS.green,
            fontSize: 16,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Workflow 3
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
        Repair Request Automation
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
          icon={<MailIcon size={28} color={COLORS.green} />}
          label="Request"
          delay={flowStart}
          color={COLORS.green}
          glowColor={COLORS.greenGlow}
        />
        <FlowStep
          icon={<SearchIcon size={28} color={COLORS.green} />}
          label="Analyze"
          delay={flowStart + 6}
          color={COLORS.green}
          glowColor={COLORS.greenGlow}
        />
        <FlowStep
          icon={<WrenchIcon size={28} color={COLORS.cyan} />}
          label="Match Pro"
          delay={flowStart + 12}
          color={COLORS.cyan}
          glowColor={COLORS.cyanDim}
        />
        <FlowStep
          icon={<SendIcon size={28} color={COLORS.blue} />}
          label="Work Order"
          delay={flowStart + 18}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<CheckIcon size={28} color={COLORS.green} />}
          label="Complete"
          delay={flowStart + 24}
          color={COLORS.green}
          glowColor={COLORS.greenGlow}
          showConnector={false}
        />
      </div>

      {/* Detail area */}
      <div style={{ display: "flex", gap: 32, flex: 1 }}>
        {/* Left column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Tenant email */}
          <div
            style={{
              opacity: emailEntrance,
              transform: `translateY(${(1 - emailEntrance) * 20}px)`,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.green}33`,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <MailIcon size={16} color={COLORS.green} />
              <span style={{ color: COLORS.green, fontSize: 13, fontWeight: 600 }}>
                Incoming Request
              </span>
            </div>
            <div
              style={{
                background: COLORS.surface,
                borderRadius: 10,
                padding: 14,
              }}
            >
              <div style={{ color: COLORS.textMuted, fontSize: 11, marginBottom: 6 }}>
                From: tenant@email.com — Unit 4B
              </div>
              <div style={{ color: COLORS.text, fontSize: 15 }}>
                "The kitchen sink is leaking badly. Water is pooling on the floor."
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div
            style={{
              opacity: analysisEntrance,
              transform: `translateY(${(1 - analysisEntrance) * 20}px)`,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.cyan}22`,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <SearchIcon size={16} color={COLORS.cyan} />
              <span style={{ color: COLORS.cyan, fontSize: 13, fontWeight: 600 }}>
                AI Analysis
              </span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "Type", value: "Plumbing", color: COLORS.blue },
                { label: "Urgency", value: "High", color: COLORS.orange },
                { label: "Unit", value: "4B", color: COLORS.green },
              ].map((tag, i) => {
                const tagEntrance = spring({
                  frame,
                  fps,
                  delay: detailStart + 25 + i * 8,
                  config: { damping: 200 },
                });
                return (
                  <div
                    key={i}
                    style={{
                      opacity: tagEntrance,
                      transform: `scale(${interpolate(tagEntrance, [0, 1], [0.8, 1])})`,
                      flex: 1,
                      background: COLORS.surface,
                      borderRadius: 8,
                      padding: "10px 14px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: COLORS.textMuted,
                        fontSize: 11,
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      {tag.label}
                    </div>
                    <div
                      style={{
                        color: tag.color,
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      {tag.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key messages */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <KeyMessage
              text="No manual coordination"
              delay={messagesStart}
              color={COLORS.green}
            />
            <KeyMessage
              text="Smart contractor matching"
              delay={messagesStart + 6}
              color={COLORS.green}
            />
            <KeyMessage
              text="You control approvals"
              delay={messagesStart + 12}
              color={COLORS.green}
            />
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Approval logic - split card */}
          <div
            style={{
              opacity: approvalEntrance,
              transform: `translateY(${(1 - approvalEntrance) * 20}px)`,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
              }}
            >
              <ShieldIcon size={16} color={COLORS.blue} />
              <span style={{ color: COLORS.blue, fontSize: 13, fontWeight: 600 }}>
                Approval Logic
              </span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {/* Auto-approved */}
              <div
                style={{
                  flex: 1,
                  background: COLORS.greenDim,
                  border: `1px solid ${COLORS.green}44`,
                  borderRadius: 10,
                  padding: 14,
                  textAlign: "center",
                }}
              >
                <CheckIcon size={24} color={COLORS.green} />
                <div
                  style={{
                    color: COLORS.green,
                    fontSize: 14,
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  Auto-Approved
                </div>
                <div
                  style={{
                    color: COLORS.textMuted,
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Under $500
                </div>
              </div>
              {/* Requires approval */}
              <div
                style={{
                  flex: 1,
                  background: COLORS.orangeDim,
                  border: `1px solid ${COLORS.orange}44`,
                  borderRadius: 10,
                  padding: 14,
                  textAlign: "center",
                }}
              >
                <ShieldIcon size={24} color={COLORS.orange} />
                <div
                  style={{
                    color: COLORS.orange,
                    fontSize: 14,
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  Needs Approval
                </div>
                <div
                  style={{
                    color: COLORS.textMuted,
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Over $500
                </div>
              </div>
            </div>
          </div>

          {/* Status timeline */}
          <div
            style={{
              opacity: statusEntrance,
              transform: `translateY(${(1 - statusEntrance) * 20}px)`,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.green}22`,
              borderRadius: 16,
              padding: 20,
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
              }}
            >
              <WrenchIcon size={16} color={COLORS.green} />
              <span style={{ color: COLORS.green, fontSize: 13, fontWeight: 600 }}>
                Live Status
              </span>
            </div>
            {[
              { text: "Request received", time: "9:02 AM", done: true },
              { text: "Plumber assigned: Mike R.", time: "9:05 AM", done: true },
              { text: "Tenant notified", time: "9:06 AM", done: true },
              { text: "Scheduled: Tomorrow 10 AM", time: "9:10 AM", done: true },
              { text: "Job completed & logged", time: "10:45 AM", done: frame > statusStart + 2 * fps },
            ].map((item, i) => {
              const itemEntrance = spring({
                frame,
                fps,
                delay: statusStart + 8 + i * 10,
                config: { damping: 200 },
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: itemEntrance,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 0",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: item.done
                        ? COLORS.greenDim
                        : COLORS.surface,
                      border: `1.5px solid ${item.done ? COLORS.green : COLORS.textMuted}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.done && <CheckIcon size={12} color={COLORS.green} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        color: COLORS.text,
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                  <span
                    style={{
                      color: COLORS.textMuted,
                      fontSize: 11,
                    }}
                  >
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
