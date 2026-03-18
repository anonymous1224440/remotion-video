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
  PhoneIcon,
  BotIcon,
  CalendarIcon,
  CheckIcon,
  UserIcon,
  ChartIcon,
} from "../components/Icons";
import { FlowStep } from "../components/FlowStep";
import { KeyMessage } from "../components/KeyMessage";

export const AIReceptionistScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section header
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Phase timing
  const flowStart = 1.5 * fps;
  const detailStart = 8 * fps;
  const dashboardStart = 13 * fps;
  const messagesStart = 16 * fps;

  // Speech bubble animation
  const bubbleEntrance = spring({
    frame,
    fps,
    delay: flowStart + 3 * fps,
    config: { damping: 200 },
  });

  // Dashboard card
  const dashboardEntrance = spring({
    frame,
    fps,
    delay: dashboardStart,
    config: { damping: 200 },
  });

  // Intent cards
  const intentItems = [
    { label: "Prospect Inquiry", color: COLORS.blue },
    { label: "Tenant Issue", color: COLORS.orange },
    { label: "General Question", color: COLORS.purple },
  ];

  return (
    <AbsoluteFill
      style={{
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section header */}
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
            background: COLORS.blue,
            boxShadow: `0 0 12px ${COLORS.blueGlow}`,
          }}
        />
        <span
          style={{
            color: COLORS.blue,
            fontSize: 16,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Workflow 1
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
        AI Receptionist
      </h2>

      {/* Flow diagram */}
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
          icon={<PhoneIcon size={24} color={COLORS.blue} />}
          label="Call In"
          delay={flowStart}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<BotIcon size={24} color={COLORS.blue} />}
          label="AI Picks Up"
          delay={flowStart + 6}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<UserIcon size={24} color={COLORS.purple} />}
          label="Understands"
          delay={flowStart + 12}
          color={COLORS.purple}
          glowColor={COLORS.purpleGlow}
        />
        <FlowStep
          icon={<CheckIcon size={24} color={COLORS.green} />}
          label="Handles"
          delay={flowStart + 18}
          color={COLORS.green}
          glowColor={COLORS.greenGlow}
        />
        <FlowStep
          icon={<CalendarIcon size={24} color={COLORS.cyan} />}
          label="Schedules"
          delay={flowStart + 24}
          color={COLORS.cyan}
          glowColor={COLORS.cyanDim}
        />
        <FlowStep
          icon={<ChartIcon size={24} color={COLORS.blue} />}
          label="Reports"
          delay={flowStart + 30}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
          showConnector={false}
        />
      </div>

      {/* Middle section - Speech bubble + Intent detection */}
      <div
        style={{
          display: "flex",
          gap: 32,
          flex: 1,
        }}
      >
        {/* AI conversation bubble */}
        <div
          style={{
            flex: 1,
            opacity: bubbleEntrance,
            transform: `translateY(${(1 - bubbleEntrance) * 20}px)`,
          }}
        >
          <div
            style={{
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.blue}33`,
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <BotIcon size={18} color={COLORS.blue} />
              <span style={{ color: COLORS.blue, fontSize: 13, fontWeight: 600 }}>
                AI Assistant
              </span>
            </div>
            {/* Conversation */}
            {[
              { role: "ai", text: "Good morning! How can I help you today?" },
              { role: "user", text: "I'm looking for a 2-bed flat in Kensington." },
              { role: "ai", text: "I have 3 available. Would you like to book a viewing?" },
            ].map((msg, i) => {
              const msgEntrance = spring({
                frame,
                fps,
                delay: detailStart + i * 15,
                config: { damping: 200 },
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: msgEntrance,
                    transform: `translateY(${(1 - msgEntrance) * 10}px)`,
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      background:
                        msg.role === "ai" ? COLORS.blueDim : COLORS.purpleDim,
                      border: `1px solid ${msg.role === "ai" ? COLORS.blue : COLORS.purple}33`,
                      borderRadius: 10,
                      padding: "8px 14px",
                      maxWidth: "80%",
                    }}
                  >
                    <span
                      style={{
                        color: COLORS.text,
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {msg.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column - Intent + Dashboard */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Intent detection */}
          <div
            style={{
              opacity: bubbleEntrance,
              transform: `translateY(${(1 - bubbleEntrance) * 20}px)`,
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
              Intent Detected
            </span>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {intentItems.map((item, i) => {
                const tagEntrance = spring({
                  frame,
                  fps,
                  delay: detailStart + 5 + i * 8,
                  config: { damping: 200 },
                });
                const isActive = i === 0;
                return (
                  <div
                    key={i}
                    style={{
                      opacity: tagEntrance,
                      transform: `scale(${interpolate(tagEntrance, [0, 1], [0.8, 1])})`,
                      padding: "8px 16px",
                      borderRadius: 8,
                      background: isActive ? `${item.color}22` : COLORS.bgCard,
                      border: `1px solid ${isActive ? item.color : COLORS.textMuted}44`,
                      boxShadow: isActive ? `0 0 12px ${item.color}33` : "none",
                    }}
                  >
                    <span
                      style={{
                        color: isActive ? item.color : COLORS.textMuted,
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dashboard card */}
          <div
            style={{
              opacity: dashboardEntrance,
              transform: `translateY(${(1 - dashboardEntrance) * 20}px)`,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 16,
              padding: 20,
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
              Call Report
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginTop: 12,
              }}
            >
              {[
                { label: "Name", value: "Sarah Mitchell" },
                { label: "Contact", value: "+44 7911..." },
                { label: "Intent", value: "Viewing" },
                { label: "Budget", value: "£2,500/mo" },
              ].map((item, i) => {
                const cardEntrance = spring({
                  frame,
                  fps,
                  delay: dashboardStart + 8 + i * 6,
                  config: { damping: 200 },
                });
                return (
                  <div
                    key={i}
                    style={{
                      opacity: cardEntrance,
                      background: COLORS.surface,
                      borderRadius: 8,
                      padding: "10px 14px",
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
                      {item.label}
                    </div>
                    <div
                      style={{
                        color: COLORS.text,
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key messages */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <KeyMessage text="Never miss a call" delay={messagesStart} color={COLORS.blue} />
            <KeyMessage
              text="24/7 AI answering"
              delay={messagesStart + 6}
              color={COLORS.blue}
            />
            <KeyMessage
              text="Books viewings automatically"
              delay={messagesStart + 12}
              color={COLORS.blue}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
