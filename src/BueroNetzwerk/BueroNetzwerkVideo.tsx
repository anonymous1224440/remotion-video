import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from "remotion";

const fontFamily = "Arial, Helvetica, sans-serif";

const COLORS = {
  bgPrimary: "#0a1628",
  bgSecondary: "#111d32",
  bgCard: "#152238",
  border: "#1e3a5f",
  borderLight: "#2a4a6f",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  accent: "#00d4ff",
  accentDim: "rgba(0, 212, 255, 0.15)",
  accentGlow: "rgba(0, 212, 255, 0.4)",
  success: "#22c55e",
  successDim: "rgba(34, 197, 94, 0.12)",
  error: "#ef4444",
  errorDim: "rgba(239, 68, 68, 0.12)",
  errorGlow: "rgba(239, 68, 68, 0.4)",
  warning: "#f59e0b",
  warningDim: "rgba(245, 158, 11, 0.12)",
};

type InventoryItem = {
  nr: number;
  type: string;
  model: string;
  ip: string;
  location: string;
  issue: string | null;
};

const INVENTORY: InventoryItem[] = [
  { nr: 1, type: "Router", model: "Fritz!Box 7590", ip: "192.168.1.1", location: "Serverraum", issue: null },
  { nr: 2, type: "Switch", model: "Netgear GS108E", ip: "192.168.1.2", location: "Serverraum", issue: null },
  { nr: 3, type: "Access Point", model: "Ubiquiti UAP-AC-Lite", ip: "192.168.1.10", location: "Empfang", issue: "Kein WLAN-Passwort" },
  { nr: 4, type: "Workstation", model: "Dell OptiPlex 3080", ip: "192.168.1.101", location: "Arbeitsplatz 1", issue: "Keine Updates" },
  { nr: 5, type: "Workstation", model: "HP EliteDesk 800", ip: "192.168.1.102", location: "Arbeitsplatz 2", issue: "Manuell zugewiesen" },
  { nr: 6, type: "Drucker", model: "HP LaserJet Pro", ip: "192.168.1.50", location: "Druckerraum", issue: "Nicht pingbar" },
  { nr: 7, type: "Access Point", model: "Ubiquiti UAP-AC-Lite", ip: "—", location: "Meetingraum", issue: "Nicht dokumentiert" },
];

const ISSUES = [
  { icon: "⚠", text: "WLAN-Passwort nicht dokumentiert", color: COLORS.warning },
  { icon: "✗", text: "Sicherheitsupdates fehlen", color: COLORS.error },
  { icon: "✗", text: "Drucker nicht erreichbar (IP)", color: COLORS.error },
  { icon: "⚠", text: "Access Point undokumentiert", color: COLORS.warning },
];

// ── Background ──
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const gradientY = interpolate(frame, [0, durationInFrames], [35, 55], { extrapolateRight: "clamp" });
  const gridOpacity = interpolate(Math.sin(frame / (2 * fps)), [-1, 1], [0.02, 0.06]);
  const glowX = interpolate(frame, [0, durationInFrames * 0.5, durationInFrames], [20, 80, 40], { extrapolateRight: "clamp" });
  const glowOpacity = interpolate(Math.sin(frame / (3 * fps)), [-1, 1], [0.04, 0.1]);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% ${gradientY}%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%, #050d18 100%)` }} />
      <div style={{ position: "absolute", inset: 0, opacity: gridOpacity, backgroundImage: `linear-gradient(${COLORS.accent} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", left: `${glowX}%`, top: "30%", transform: "translate(-50%, -50%)", background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 70%)`, opacity: glowOpacity, filter: "blur(80px)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
    </AbsoluteFill>
  );
};

// ── Scene 1: Title (0–5s) ──
const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const iconScale = spring({ frame: frame - 5, fps, config: { damping: 15, stiffness: 200 }, durationInFrames: 24 });
  const titleEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 40 });
  const subtitleEntrance = spring({ frame: frame - 30, fps, config: { damping: 200 }, durationInFrames: 30 });
  const lineWidth = interpolate(frame, [15, 60], [0, 500], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeEntrance = spring({ frame: frame - 50, fps, config: { damping: 200 }, durationInFrames: 30 });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily, opacity: fadeOut }}>
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => {
        const x = 200 + i * 200;
        const baseY = 150 + (i % 4) * 180;
        const y = baseY + Math.sin((frame + i * 30) / 25) * 25;
        const size = 3 + (i % 3) * 2;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", backgroundColor: COLORS.accent, opacity: 0.15 + (i % 3) * 0.08, filter: "blur(1px)" }} />
        );
      })}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {/* Network icon */}
        <div style={{ width: 80, height: 80, borderRadius: 20, border: `2px solid ${COLORS.accent}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${iconScale})`, backgroundColor: COLORS.accentDim, boxShadow: `0 0 40px ${COLORS.accentGlow}` }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="6" height="6" rx="1" />
            <rect x="16" y="2" width="6" height="6" rx="1" />
            <rect x="9" y="16" width="6" height="6" rx="1" />
            <path d="M5 8v3a2 2 0 002 2h10a2 2 0 002-2V8" />
            <path d="M12 13v3" />
          </svg>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 64, fontWeight: 800, color: COLORS.textPrimary, textAlign: "center", lineHeight: 1.15, letterSpacing: -2, opacity: titleEntrance, transform: `translateY(${interpolate(titleEntrance, [0, 1], [30, 0])}px)`, margin: 0 }}>
          Büro<span style={{ color: COLORS.accent }}>Netzwerk</span>
        </h1>

        {/* Divider */}
        <div style={{ width: lineWidth, height: 2, background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)` }} />

        {/* Subtitle */}
        <p style={{ fontSize: 24, fontWeight: 300, color: COLORS.textSecondary, textAlign: "center", opacity: subtitleEntrance, transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [20, 0])}px)`, margin: 0 }}>
          Hauptstrasse 12, 6210 Sursee
        </p>

        {/* Info badges */}
        <div style={{ display: "flex", gap: 16, marginTop: 12, opacity: badgeEntrance }}>
          {["8 Arbeitsplätze", "DSL 100 Mbit/s", "Gateway: 192.168.1.1"].map((label, i) => (
            <div key={i} style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.bgCard, fontSize: 16, fontWeight: 400, color: COLORS.textSecondary }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2: Network Topology (5–12s) ──
type DeviceNodeProps = {
  x: number;
  y: number;
  label: string;
  subLabel: string;
  color: string;
  delay: number;
  icon: string;
};

const DeviceNode: React.FC<DeviceNodeProps> = ({ x, y, label, subLabel, color, delay, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 20 });
  const pulse = Math.sin((frame + delay) / 20) * 0.15 + 0.85;

  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${entrance})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, border: `2px solid ${color}`, backgroundColor: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: `0 0 20px ${color}40`, opacity: pulse }}>
        {icon}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, textAlign: "center", whiteSpace: "nowrap" }}>{label}</div>
      <div style={{ fontSize: 11, fontWeight: 400, color: COLORS.textMuted, textAlign: "center", whiteSpace: "nowrap" }}>{subLabel}</div>
    </div>
  );
};

type ConnectionProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  dashed?: boolean;
};

const Connection: React.FC<ConnectionProps> = ({ x1, y1, x2, y2, delay, dashed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const endX = x1 + (x2 - x1) * progress;
  const endY = y1 + (y2 - y1) * progress;

  const pulse = interpolate(Math.sin((frame + delay) / 15), [-1, 1], [0.3, 0.7]);

  return (
    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <line x1={x1} y1={y1} x2={endX} y2={endY} stroke={COLORS.accent} strokeWidth={2} strokeOpacity={pulse} strokeDasharray={dashed ? "6 4" : "none"} />
    </svg>
  );
};

const SceneTopology: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });

  // Center of canvas: 960, 540
  const cx = 960;

  return (
    <AbsoluteFill style={{ fontFamily, opacity: fadeIn * fadeOut }}>
      {/* Title */}
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: titleY, transform: `translateY(${interpolate(titleY, [0, 1], [-20, 0])}px)` }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.textPrimary }}>Netzwerk</span>
        <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.accent }}>topologie</span>
      </div>

      {/* Connections */}
      <Connection x1={cx} y1={175} x2={cx} y2={310} delay={10} />
      {/* Switch to devices */}
      <Connection x1={cx} y1={365} x2={340} y2={500} delay={20} />
      <Connection x1={cx} y1={365} x2={600} y2={500} delay={22} />
      <Connection x1={cx} y1={365} x2={cx} y2={500} delay={24} />
      <Connection x1={cx} y1={365} x2={1320} y2={500} delay={26} />
      <Connection x1={cx} y1={365} x2={1580} y2={500} delay={28} />
      {/* Switch to APs */}
      <Connection x1={cx} y1={365} x2={340} y2={680} delay={30} dashed />
      <Connection x1={cx} y1={365} x2={1580} y2={680} delay={32} dashed />
      {/* APs to WLAN devices */}
      <Connection x1={340} y1={735} x2={200} y2={860} delay={38} dashed />
      <Connection x1={340} y1={735} x2={480} y2={860} delay={40} dashed />
      <Connection x1={1580} y1={735} x2={1440} y2={860} delay={42} dashed />
      <Connection x1={1580} y1={735} x2={1720} y2={860} delay={44} dashed />

      {/* Router */}
      <DeviceNode x={cx} y={150} label="Fritz!Box 7590" subLabel="192.168.1.1 · Gateway" color={COLORS.accent} delay={5} icon="🌐" />

      {/* Switch */}
      <DeviceNode x={cx} y={340} label="Netgear GS108E" subLabel="192.168.1.2 · Switch" color="#8b5cf6" delay={12} icon="🔀" />

      {/* Workstations */}
      <DeviceNode x={340} y={520} label="Dell OptiPlex" subLabel="192.168.1.101" color="#3b82f6" delay={20} icon="🖥" />
      <DeviceNode x={600} y={520} label="HP EliteDesk" subLabel="192.168.1.102" color="#3b82f6" delay={24} icon="🖥" />

      {/* Drucker */}
      <DeviceNode x={cx} y={520} label="HP LaserJet Pro" subLabel="192.168.1.50" color={COLORS.warning} delay={28} icon="🖨" />

      {/* APs */}
      <DeviceNode x={340} y={700} label="AP Empfang" subLabel="192.168.1.10" color="#22c55e" delay={32} icon="📡" />
      <DeviceNode x={1580} y={700} label="AP Meetingraum" subLabel="IP fehlt!" color={COLORS.error} delay={36} icon="📡" />

      {/* WLAN Laptops from AP Empfang */}
      <DeviceNode x={200} y={880} label="Laptop Empfang 1" subLabel="DHCP" color="#06b6d4" delay={42} icon="💻" />
      <DeviceNode x={480} y={880} label="Laptop Empfang 2" subLabel="DHCP" color="#06b6d4" delay={44} icon="💻" />

      {/* WLAN Laptops from AP Meetingraum */}
      <DeviceNode x={1320} y={520} label="Laptop Büro 1" subLabel="DHCP" color="#06b6d4" delay={46} icon="💻" />
      <DeviceNode x={1580} y={520} label="Laptop Büro 2" subLabel="DHCP" color="#06b6d4" delay={48} icon="💻" />

      {/* Additional laptops from meeting room AP */}
      <DeviceNode x={1440} y={880} label="Laptop Büro 3" subLabel="DHCP" color="#06b6d4" delay={50} icon="💻" />
      <DeviceNode x={1720} y={880} label="Laptop Büro 4" subLabel="DHCP" color="#06b6d4" delay={52} icon="💻" />

      {/* Legend */}
      <div style={{ position: "absolute", bottom: 40, left: 60, display: "flex", gap: 24, opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 2, backgroundColor: COLORS.accent }} />
          <span style={{ fontSize: 13, color: COLORS.textMuted }}>LAN (Kabel)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 0, borderTop: `2px dashed ${COLORS.accent}`, opacity: 0.5 }} />
          <span style={{ fontSize: 13, color: COLORS.textMuted }}>WLAN</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 3: Inventory Table (12–17s) ──
const SceneInventory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });

  const columns = ["Nr", "Typ", "Modell", "IP-Adresse", "Standort", "Problem"];
  const colWidths = [50, 110, 200, 160, 140, 200];

  return (
    <AbsoluteFill style={{ fontFamily, opacity: fadeIn * fadeOut, padding: 60 }}>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 30, opacity: titleY }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.textPrimary }}>Inventar</span>
        <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.accent }}>liste</span>
        <span style={{ fontSize: 20, fontWeight: 400, color: COLORS.textMuted, marginLeft: 16 }}>Stand: 31.03.2018</span>
      </div>

      {/* Table */}
      <div style={{ display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.border}`, boxShadow: `0 0 40px rgba(0,0,0,0.5)` }}>
        {/* Header */}
        <div style={{ display: "flex", backgroundColor: "#0d2847", padding: "14px 20px" }}>
          {columns.map((col, i) => (
            <div key={i} style={{ width: colWidths[i], fontSize: 14, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: 1 }}>
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {INVENTORY.map((item, rowIdx) => {
          const rowEntrance = spring({ frame: frame - 10 - rowIdx * 5, fps, config: { damping: 200 }, durationInFrames: 20 });
          const bgColor = rowIdx % 2 === 0 ? "#0f1e35" : "#121f36";
          const hasIssue = item.issue !== null;
          const rowBg = hasIssue
            ? `linear-gradient(90deg, ${bgColor} 70%, ${COLORS.errorDim} 100%)`
            : bgColor;

          return (
            <div
              key={item.nr}
              style={{
                display: "flex",
                padding: "12px 20px",
                background: rowBg,
                opacity: rowEntrance,
                transform: `translateX(${interpolate(rowEntrance, [0, 1], [40, 0])}px)`,
                borderBottom: `1px solid ${COLORS.border}22`,
              }}
            >
              <div style={{ width: colWidths[0], fontSize: 14, color: COLORS.textMuted }}>{item.nr}</div>
              <div style={{ width: colWidths[1], fontSize: 14, color: COLORS.textPrimary, fontWeight: 600 }}>{item.type}</div>
              <div style={{ width: colWidths[2], fontSize: 14, color: COLORS.textSecondary }}>{item.model}</div>
              <div style={{ width: colWidths[3], fontSize: 14, color: COLORS.accent, fontFamily: "monospace" }}>{item.ip}</div>
              <div style={{ width: colWidths[4], fontSize: 14, color: COLORS.textSecondary }}>{item.location}</div>
              <div style={{ width: colWidths[5], fontSize: 13, color: hasIssue ? COLORS.error : COLORS.success, fontWeight: hasIssue ? 600 : 400 }}>
                {hasIssue ? `⚠ ${item.issue}` : "✓ OK"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Counter */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16, opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ padding: "8px 20px", borderRadius: 8, backgroundColor: COLORS.errorDim, border: `1px solid ${COLORS.error}40`, fontSize: 15, color: COLORS.error, fontWeight: 600 }}>
          4 Probleme erkannt
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4: Issues & Improvements (17–20s) ──
const SceneIssues: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const improvements = [
    "WLAN-Passwörter dokumentieren",
    "Sicherheitsupdates einspielen",
    "IP-Adressplan erstellen",
    "Alle Geräte vollständig erfassen",
  ];

  return (
    <AbsoluteFill style={{ fontFamily, opacity: fadeIn * fadeOut, display: "flex", flexDirection: "row", padding: 80, gap: 60 }}>
      {/* Left: Issues */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.error, marginBottom: 30, opacity: spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 }) }}>
          Erkannte Probleme
        </div>

        {ISSUES.map((issue, i) => {
          const entrance = spring({ frame: frame - 8 - i * 8, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 20 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: "14px 20px", borderRadius: 10, backgroundColor: COLORS.bgCard, border: `1px solid ${issue.color}30`, opacity: entrance, transform: `translateX(${interpolate(entrance, [0, 1], [-30, 0])}px)` }}>
              <div style={{ fontSize: 22, width: 36, textAlign: "center", color: issue.color }}>{issue.icon}</div>
              <div style={{ fontSize: 17, color: COLORS.textPrimary, fontWeight: 500 }}>{issue.text}</div>
            </div>
          );
        })}
      </div>

      {/* Right: Improvements */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.success, marginBottom: 30, opacity: spring({ frame: frame - 15, fps, config: { damping: 200 }, durationInFrames: 20 }) }}>
          Verbesserungsvorschläge
        </div>

        {improvements.map((text, i) => {
          const entrance = spring({ frame: frame - 20 - i * 8, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 20 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: "14px 20px", borderRadius: 10, backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.success}30`, opacity: entrance, transform: `translateX(${interpolate(entrance, [0, 1], [30, 0])}px)` }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: COLORS.successDim, border: `2px solid ${COLORS.success}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: COLORS.success, fontWeight: 700 }}>
                {i + 1}
              </div>
              <div style={{ fontSize: 17, color: COLORS.textPrimary, fontWeight: 500 }}>{text}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ──
export const BueroNetzwerkVideo: React.FC = () => {
  const FPS = 30;
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#050d18" }}>
      <Background />

      {/* Scene 1: Title (0–5s) */}
      <Sequence from={0} durationInFrames={5 * FPS} premountFor={10}>
        <SceneTitle />
      </Sequence>

      {/* Scene 2: Network Topology (5–12s) */}
      <Sequence from={5 * FPS} durationInFrames={7 * FPS} premountFor={15}>
        <SceneTopology />
      </Sequence>

      {/* Scene 3: Inventory Table (12–17s) */}
      <Sequence from={12 * FPS} durationInFrames={5 * FPS} premountFor={15}>
        <SceneInventory />
      </Sequence>

      {/* Scene 4: Issues & Improvements (17–20s) */}
      <Sequence from={17 * FPS} durationInFrames={3 * FPS} premountFor={15}>
        <SceneIssues />
      </Sequence>
    </AbsoluteFill>
  );
};
