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
  const detailStart = 6 * fps;
  const dashboardStart = 10 * fps;
  const messagesStart = 16 * fps;

  // Speech bubble animation
  const bubbleEntrance = spring({
    frame,
    fps,
    delay: flowStart + 3 * fps,
    config: { damping: 200 },
  });

  // Dashboard card - earlier appearance
  const dashboardEntrance = spring({
    frame,
    fps,
    delay: dashboardStart,
    config: { damping: 200 },
  });

  // Intent cards - use green/orange/cyan for better contrast on dark bg
  const intentItems = [
    { label: "Prospect Inquiry", color: COLORS.green },
    { label: "Tenant Issue", color: COLORS.orange },
    { label: "General Question", color: COLORS.cyan },
  ];

  // Conversation messages - updated realistic version
  const conversationMessages = [
    { role: "ai", text: "Good morning, thank you for calling Secured Properties Management Group. This is your AI assistant, how can I help you today?" },
    { role: "user", text: "Hi, I'm looking for a two-bedroom apartment in Koreatown, Los Angeles." },
    { role: "ai", text: "Got it, thanks. Are you looking to move in soon, or just exploring options for now?" },
    { role: "user", text: "Ideally within the next month." },
    { role: "ai", text: "Perfect. And do you have a target monthly budget in mind?" },
    { role: "user", text: "Around $2,500." },
    { role: "ai", text: "Great, that helps. We currently have three available units that match your criteria. Would you like me to schedule a viewing for you?" },
    { role: "user", text: "Yes, that would be great." },
    { role: "ai", text: "Awesome. Could I get your full name, please?" },
    { role: "user", text: "Michael Thompson." },
    { role: "ai", text: "Thanks, Michael. And what's the best phone number to reach you?" },
    { role: "user", text: "It's (323) 555-7429." },
    { role: "ai", text: "Got it. I've scheduled you for a viewing this Thursday at 5 PM. You'll receive a confirmation shortly." },
    { role: "user", text: "Perfect, thank you." },
    { role: "ai", text: "You're welcome, Michael. Looking forward to seeing you." },
  ];

  // Calculate which messages are visible based on frame - scroll through conversation
  const msgInterval = 18; // frames between each message appearing (slower for readability)
  const scrollStart = detailStart + 4 * msgInterval; // start scrolling after 4 messages

  return (
    <AbsoluteFill
      style={{
        padding: "40px 60px",
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
          marginBottom: 20,
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
          marginBottom: 20,
        }}
      >
        <FlowStep
          icon={<PhoneIcon size={28} color={COLORS.blue} />}
          label="Call In"
          delay={flowStart}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<BotIcon size={28} color={COLORS.blue} />}
          label="AI Picks Up"
          delay={flowStart + 6}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<UserIcon size={28} color={COLORS.purple} />}
          label="Understands"
          delay={flowStart + 12}
          color={COLORS.purple}
          glowColor={COLORS.purpleGlow}
        />
        <FlowStep
          icon={<CheckIcon size={28} color={COLORS.green} />}
          label="Handles"
          delay={flowStart + 18}
          color={COLORS.green}
          glowColor={COLORS.greenGlow}
        />
        <FlowStep
          icon={<CalendarIcon size={28} color={COLORS.cyan} />}
          label="Schedules"
          delay={flowStart + 24}
          color={COLORS.cyan}
          glowColor={COLORS.cyanDim}
        />
        <FlowStep
          icon={<ChartIcon size={28} color={COLORS.blue} />}
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
              gap: 8,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <BotIcon size={18} color={COLORS.blue} />
              <span style={{ color: COLORS.blue, fontSize: 13, fontWeight: 600 }}>
                AI Assistant
              </span>
            </div>
            {/* Scrolling conversation container */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  transform: `translateY(${-Math.max(0, interpolate(
                    frame,
                    [scrollStart, scrollStart + 20 * msgInterval],
                    [0, 800],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  ))}px)`,
                }}
              >
                {conversationMessages.map((msg, i) => {
                  const msgEntrance = spring({
                    frame,
                    fps,
                    delay: detailStart + i * msgInterval,
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
                          padding: "10px 16px",
                          maxWidth: "85%",
                        }}
                      >
                        <span
                          style={{
                            color: COLORS.text,
                            fontSize: 17,
                            fontWeight: 400,
                            lineHeight: 1.4,
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
          </div>
        </div>

        {/* Right column - Intent + Dashboard */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Intent detection - bigger and more visible */}
          <div
            style={{
              opacity: bubbleEntrance,
              transform: `translateY(${(1 - bubbleEntrance) * 20}px)`,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.green}33`,
              borderRadius: 16,
              padding: 24,
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
                marginBottom: 14,
              }}
            >
              Intent Detected
            </span>
            <div style={{ display: "flex", gap: 12 }}>
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
                      padding: "14px 22px",
                      borderRadius: 10,
                      background: isActive ? `${item.color}22` : COLORS.bgCard,
                      border: `2px solid ${isActive ? item.color : COLORS.textMuted}44`,
                      boxShadow: isActive ? `0 0 20px ${item.color}44` : "none",
                    }}
                  >
                    <span
                      style={{
                        color: isActive ? item.color : COLORS.textMuted,
                        fontSize: 18,
                        fontWeight: 600,
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
                fontSize: 14,
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
                { label: "Name", value: "Michael Thompson" },
                { label: "Contact", value: "(323) 555-7429" },
                { label: "Intent", value: "Viewing Request" },
                { label: "Budget", value: "$2,500/mo" },
                { label: "Location", value: "Koreatown, LA" },
                { label: "Scheduled", value: "Thu 5 PM" },
              ].map((item, i) => {
                const cardEntrance = spring({
                  frame,
                  fps,
                  delay: dashboardStart + 5 + i * 5,
                  config: { damping: 200 },
                });
                return (
                  <div
                    key={i}
                    style={{
                      opacity: cardEntrance,
                      background: COLORS.surface,
                      borderRadius: 8,
                      padding: "12px 16px",
                    }}
                  >
                    <div
                      style={{
                        color: COLORS.textMuted,
                        fontSize: 12,
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        color: COLORS.text,
                        fontSize: 17,
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

          {/* Key messages - appear when content comes in */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 16,
              padding: 24,
              flex: 1,
              opacity: spring({ frame, fps, delay: messagesStart, config: { damping: 200 } }),
              transform: `translateY(${(1 - spring({ frame, fps, delay: messagesStart, config: { damping: 200 } })) * 20}px)`,
            }}
          >
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
