export type CompanyData = {
  name: string;
  revenue: string;
  netIncome: string;
  ebitda: string;
  assets: string;
};

export const EXCEL_DATA: CompanyData[] = [
  {
    name: "Acme Corp",
    revenue: "$4,250M",
    netIncome: "$890M",
    ebitda: "$1,120M",
    assets: "$8,450M",
  },
  {
    name: "Global Industries",
    revenue: "$7,830M",
    netIncome: "$1,245M",
    ebitda: "$2,340M",
    assets: "$15,670M",
  },
  {
    name: "TechVision Inc",
    revenue: "$2,150M",
    netIncome: "$412M",
    ebitda: "$680M",
    assets: "$5,230M",
  },
  {
    name: "Summit Financial",
    revenue: "$5,670M",
    netIncome: "$1,890M",
    ebitda: "$2,380M",
    assets: "$22,100M",
  },
  {
    name: "Meridian Group",
    revenue: "$3,420M",
    netIncome: "$567M",
    ebitda: "$890M",
    assets: "$9,780M",
  },
];

export const PDF_DATA: CompanyData[] = [
  {
    name: "Acme Corp",
    revenue: "$4,250M",
    netIncome: "$890M",
    ebitda: "$1,120M",
    assets: "$8,450M",
  },
  {
    name: "Global Industries",
    revenue: "$7,830M",
    netIncome: "$1,245M",
    ebitda: "$2,340M",
    assets: "$15,670M",
  },
  {
    name: "TechVision Inc",
    revenue: "$2,150M",
    netIncome: "$425M",
    ebitda: "$680M",
    assets: "$5,230M",
  },
  {
    name: "Summit Financial",
    revenue: "$5,670M",
    netIncome: "$1,890M",
    ebitda: "$2,450M",
    assets: "$22,100M",
  },
  {
    name: "Meridian Group",
    revenue: "$3,420M",
    netIncome: "$567M",
    ebitda: "$890M",
    assets: "$9,870M",
  },
];

export const COLUMN_KEYS: (keyof CompanyData)[] = [
  "name",
  "revenue",
  "netIncome",
  "ebitda",
  "assets",
];

export const COLUMN_LABELS = [
  "Unternehmen",
  "Umsatz",
  "Nettoergebnis",
  "EBITDA",
  "Vermögen",
];

export type MismatchInfo = {
  row: number;
  column: keyof CompanyData;
  columnIndex: number;
  excelValue: string;
  pdfValue: string;
};

export const MISMATCHES: MismatchInfo[] = [
  {
    row: 2,
    column: "netIncome",
    columnIndex: 2,
    excelValue: "$412M",
    pdfValue: "$425M",
  },
  {
    row: 3,
    column: "ebitda",
    columnIndex: 3,
    excelValue: "$2,380M",
    pdfValue: "$2,450M",
  },
  {
    row: 4,
    column: "assets",
    columnIndex: 4,
    excelValue: "$9,780M",
    pdfValue: "$9,870M",
  },
];

export const COLORS = {
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
  successGlow: "rgba(34, 197, 94, 0.4)",
  error: "#ef4444",
  errorDim: "rgba(239, 68, 68, 0.12)",
  errorGlow: "rgba(239, 68, 68, 0.4)",
  excelGreen: "#217346",
  pdfRed: "#d93025",
  tableHeader: "#0d2847",
  tableRowEven: "#0f1e35",
  tableRowOdd: "#121f36",
};

export const FPS = 30;
export const DURATION = 2700;

export const SCENE_TIMING = {
  scene1: { from: 0, duration: 300 },
  scene2: { from: 300, duration: 450 },
  scene3: { from: 750, duration: 450 },
  scene4: { from: 1200, duration: 600 },
  scene5: { from: 1800, duration: 600 },
  scene6: { from: 2400, duration: 300 },
};
