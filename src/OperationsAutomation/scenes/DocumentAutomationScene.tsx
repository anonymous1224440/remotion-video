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
  MailIcon,
  SearchIcon,
  UserIcon,
  DatabaseIcon,
  SendIcon,
  ChartIcon,
  CheckIcon,
} from "../../PropertyAutomation/components/Icons";
import { FlowStep } from "../../PropertyAutomation/components/FlowStep";
import { KeyMessage } from "../../PropertyAutomation/components/KeyMessage";

export const DocumentAutomationScene: React.FC = () => {
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
  const detailStart = 3.5 * fps;
  const dashboardStart = 10 * fps;
  const messagesStart = 16 * fps;

  // Inbox entrance
  const inboxEntrance = spring({
    frame,
    fps,
    delay: detailStart,
    config: { damping: 200 },
  });

  // Detection card entrance
  const detectionEntrance = spring({
    frame,
    fps,
    delay: detailStart,
    config: { damping: 200 },
  });

  // Dashboard entrance
  const dashboardEntrance = spring({
    frame,
    fps,
    delay: dashboardStart,
    config: { damping: 200 },
  });

  // Document inbox items with staggered appearance
  const inboxItems = [
    { subject: "Bank Statement — 45 West 82nd St", status: "Auto-filed", statusColor: COLORS.green },
    { subject: "Insurance Certificate — 120 Broadway", status: "Auto-filed", statusColor: COLORS.green },
    { subject: "Tax Document — Unit 7A, Park Ave", status: "Auto-filed", statusColor: COLORS.green },
    { subject: "Monthly Report — 315 East 65th", status: "Sent to owner", statusColor: COLORS.blue },
  ];

  // Detection tags
  const detectionItems = [
    { label: "Bank Statement", color: COLORS.green },
    { label: "Insurance Doc", color: COLORS.orange },
    { label: "Tax Filing", color: COLORS.cyan },
  ];

  // Scroll inbox slowly
  const scrollDuration = 10 * fps;
  const maxScroll = 120;
  const scrollAmount = interpolate(
    frame,
    [detailStart + 4 * fps, detailStart + 4 * fps + scrollDuration],
    [0, maxScroll],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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
        Document Automation
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
          icon={<MailIcon size={28} color={COLORS.blue} />}
          label="Incoming"
          delay={flowStart}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<SearchIcon size={28} color={COLORS.blue} />}
          label="Recognize"
          delay={flowStart + 6}
          color={COLORS.blue}
          glowColor={COLORS.blueGlow}
        />
        <FlowStep
          icon={<UserIcon size={28} color={COLORS.purple} />}
          label="Identify"
          delay={flowStart + 12}
          color={COLORS.purple}
          glowColor={COLORS.purpleGlow}
        />
        <FlowStep
          icon={<DatabaseIcon size={28} color={COLORS.purple} />}
          label="Store"
          delay={flowStart + 18}
          color={COLORS.purple}
          glowColor={COLORS.purpleGlow}
        />
        <FlowStep
          icon={<SendIcon size={28} color={COLORS.cyan} />}
          label="Send"
          delay={flowStart + 24}
          color={COLORS.cyan}
          glowColor={COLORS.cyanDim}
        />
        <FlowStep
          icon={<ChartIcon size={28} color={COLORS.green} />}
          label="Log"
          delay={flowStart + 30}
          color={COLORS.green}
          glowColor={COLORS.greenGlow}
          showConnector={false}
        />
      </div>

      {/* Detail section - fills remaining space */}
      <div
        style={{
          display: "flex",
          gap: 32,
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left - Document Inbox */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            opacity: inboxEntrance,
            transform: `translateY(${(1 - inboxEntrance) * 20}px)`,
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
              flex: 1,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexShrink: 0 }}>
              <MailIcon size={18} color={COLORS.blue} />
              <span style={{ color: COLORS.blue, fontSize: 13, fontWeight: 600 }}>
                Incoming Documents
              </span>
              <div style={{ flex: 1 }} />
              <span style={{ color: COLORS.textMuted, fontSize: 12 }}>
                Today — 47 processed
              </span>
            </div>
            {/* Scrollable inbox */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  transform: `translateY(${-scrollAmount}px)`,
                }}
              >
                {inboxItems.map((item, i) => {
                  const itemEntrance = spring({
                    frame,
                    fps,
                    delay: detailStart + 10 + i * 15,
                    config: { damping: 200 },
                  });
                  return (
                    <div
                      key={i}
                      style={{
                        opacity: itemEntrance,
                        transform: `translateX(${(1 - itemEntrance) * 20}px)`,
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "20px 18px",
                        borderBottom: i < inboxItems.length - 1 ? `1px solid ${COLORS.surface}` : "none",
                      }}
                    >
                      {/* Document icon */}
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: `${item.statusColor}15`,
                          border: `1px solid ${item.statusColor}33`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <MailIcon size={22} color={item.statusColor} />
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            color: COLORS.text,
                            fontSize: 22,
                            fontWeight: 500,
                            lineHeight: 1.3,
                            marginBottom: 6,
                          }}
                        >
                          {item.subject}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <CheckIcon size={14} color={item.statusColor} />
                          <span
                            style={{
                              color: item.statusColor,
                              fontSize: 16,
                              fontWeight: 600,
                            }}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      {/* Timestamp */}
                      <span style={{ color: COLORS.textMuted, fontSize: 14, flexShrink: 0 }}>
                        {["9:02 AM", "9:15 AM", "9:34 AM", "10:01 AM"][i]}
                      </span>
                    </div>
                  );
                })}
                {/* More items for scroll content */}
                {[
                  { subject: "Lease Agreement — 500 West 45th", status: "Auto-filed", statusColor: COLORS.green },
                  { subject: "Utility Bill — 220 East 23rd", status: "Sent to owner", statusColor: COLORS.blue },
                  { subject: "Inspection Report — 88 Greenwich", status: "Auto-filed", statusColor: COLORS.green },
                ].map((item, i) => {
                  const itemEntrance = spring({
                    frame,
                    fps,
                    delay: detailStart + 70 + i * 15,
                    config: { damping: 200 },
                  });
                  return (
                    <div
                      key={`extra-${i}`}
                      style={{
                        opacity: itemEntrance,
                        transform: `translateX(${(1 - itemEntrance) * 20}px)`,
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "20px 18px",
                        borderBottom: `1px solid ${COLORS.surface}`,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: `${item.statusColor}15`,
                          border: `1px solid ${item.statusColor}33`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <MailIcon size={22} color={item.statusColor} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            color: COLORS.text,
                            fontSize: 22,
                            fontWeight: 500,
                            lineHeight: 1.3,
                            marginBottom: 6,
                          }}
                        >
                          {item.subject}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <CheckIcon size={14} color={item.statusColor} />
                          <span
                            style={{
                              color: item.statusColor,
                              fontSize: 16,
                              fontWeight: 600,
                            }}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <span style={{ color: COLORS.textMuted, fontSize: 14, flexShrink: 0 }}>
                        {["10:22 AM", "10:45 AM", "11:03 AM"][i]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Detection + Dashboard + Key Messages */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Document Detection */}
          <div
            style={{
              opacity: detectionEntrance,
              transform: `translateY(${(1 - detectionEntrance) * 20}px)`,
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
              Document Detected
            </span>
            <div style={{ display: "flex", gap: 12 }}>
              {detectionItems.map((item, i) => {
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
                      padding: "16px 24px",
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

          {/* Processing Dashboard */}
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
              Processing Dashboard
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginTop: 12,
              }}
            >
              {[
                { label: "Documents Today", value: "47", color: COLORS.blue },
                { label: "Auto-Filed", value: "43", color: COLORS.green },
                { label: "Sent to Clients", value: "12", color: COLORS.purple },
                { label: "Storage", value: "OneDrive", color: COLORS.cyan },
                { label: "Accuracy", value: "99.2%", color: COLORS.green },
                { label: "Processing", value: "< 3s", color: COLORS.blue },
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
                      padding: "14px 16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: item.color,
                        fontSize: 26,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item.value}
                    </div>
                    <div
                      style={{
                        color: COLORS.textMuted,
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {item.label}
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
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 16,
              padding: 24,
              flex: 1,
              opacity: spring({ frame, fps, delay: messagesStart, config: { damping: 200 } }),
              transform: `translateY(${(1 - spring({ frame, fps, delay: messagesStart, config: { damping: 200 } })) * 20}px)`,
            }}
          >
            <KeyMessage text="No manual uploads" delay={messagesStart} color={COLORS.blue} />
            <KeyMessage
              text="Instant document routing"
              delay={messagesStart + 6}
              color={COLORS.blue}
            />
            <KeyMessage
              text="Every file in the right place"
              delay={messagesStart + 12}
              color={COLORS.blue}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
