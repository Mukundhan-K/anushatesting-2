export const PALETTES = [
  // Electric Blue
  ["#4F46E5", "#2563EB", "#0EA5E9", "#06B6D4", "#22D3EE", "#0284C7", "#0369A1", "#0C4A6E"],

  // Hot Sunset
  ["#E11D48", "#F43F5E", "#FB7185", "#F97316", "#FB923C", "#FACC15", "#CA8A04", "#9A3412"],

  // Neon Purple
  ["#7C3AED", "#9333EA", "#A855F7", "#C084FC", "#E879F9", "#D946EF", "#A21CAF", "#701A75"],

  // Matrix Green
  ["#22C55E", "#4ADE80", "#86EFAC", "#16A34A", "#15803D", "#166534", "#4D7C0F", "#365314"],

  // Cyber Orange
  ["#F97316", "#FB923C", "#FDBA74", "#EA580C", "#C2410C", "#9A3412", "#7C2D12", "#FF7A18"],

  // Aqua Neon
  ["#06B6D4", "#22D3EE", "#67E8F9", "#0891B2", "#0E7490", "#155E75", "#0F766E", "#14B8A6"],

  // Laser Yellow
  ["#FACC15", "#FDE047", "#FBBF24", "#EAB308", "#CA8A04", "#A16207", "#854D0E", "#F59E0B"],

  // Hot Pink
  ["#EC4899", "#F472B6", "#FB7185", "#F43F5E", "#DB2777", "#BE185D", "#9D174D", "#831843"],
];


function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickOneFromEachPalette(count) {
  const shuffledPalettes = shuffle(PALETTES);
  return shuffledPalettes.slice(0, count).map(p => {
    return p[Math.floor(Math.random() * p.length)];
  });
}

export function applyGradients(chart, colors) {
  const { ctx, chartArea } = chart;
  if (!chartArea) return;

  const gradients = colors?.map(color => {
    const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    g.addColorStop(0, color + "DD");
    g.addColorStop(1, color + "22");
    return g;
  });

  chart.data.datasets[0].backgroundColor = gradients;
}
