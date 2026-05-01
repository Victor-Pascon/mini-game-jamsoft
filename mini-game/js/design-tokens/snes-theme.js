/**
 * Design Tokens - JAMSOFT RPG
 * Estilo Visual: Super Nintendo / Pixel Art
 * Paleta: Limitada a 256 cores com foco em tons vibrantes
 */

export const COLORS = {
  // Cores da JAMSOFT
  PRIMARY: '#0d47a1',
  PRIMARY_LIGHT: '#1565c0',
  PRIMARY_DARK: '#0a3575',
  ACCENT: '#ff6f00',
  ACCENT_LIGHT: '#ff8f00',
  
  // Paleta SNES - Cores base
  SNES_BLACK: '#000000',
  SNES_DARK: '#1a1a2e',
  SNES_GRAY_DARK: '#2d2d44',
  SNES_GRAY: '#4a4a6a',
  SNES_GRAY_LIGHT: '#6a6a8a',
  SNES_WHITE: '#f0f0f0',
  
  // Cores vibrantes SNES
  SNES_RED: '#e74c3c',
  SNES_RED_DARK: '#c0392b',
  SNES_GREEN: '#2ecc71',
  SNES_GREEN_DARK: '#27ae60',
  SNES_BLUE: '#3498db',
  SNES_BLUE_DARK: '#2980b9',
  SNES_YELLOW: '#f1c40f',
  SNES_YELLOW_DARK: '#f39c12',
  SNES_PURPLE: '#9b59b6',
  SNES_PURPLE_DARK: '#8e44ad',
  SNES_ORANGE: '#e67e22',
  SNES_ORANGE_DARK: '#d35400',
  SNES_CYAN: '#1abc9c',
  SNES_CYAN_DARK: '#16a085',
  SNES_PINK: '#e91e63',
  SNES_PINK_DARK: '#c2185b',
  
  // Cores de tiles
  FLOOR_BASE: '#1a237e',
  FLOOR_LIGHT: '#1e2a8a',
  FLOOR_DARK: '#151b6e',
  WALL_BASE: '#0d47a1',
  WALL_LIGHT: '#1565c0',
  WALL_DARK: '#0a3575',
  WALL_HIGHLIGHT: '#1976d2',
  
  // Cores das salas
  ROOM_SPEC: '#ff6f00',
  ROOM_AGENTS: '#1565c0',
  ROOM_PLAN: '#2e7d32',
  ROOM_AGENTS_SUB: '#6a1b9a',
  ROOM_SKILLS: '#c62828',
  ROOM_RULES: '#00695c',
  ROOM_HOOKS: '#37474f',
  ROOM_RAG: '#ad1457',
  ROOM_MCP: '#ef6c00',
  
  // UI
  UI_BG: 'rgba(0, 0, 0, 0.85)',
  UI_BORDER: '#ff6f00',
  UI_TEXT: '#f0f0f0',
  UI_TEXT_DIM: '#aaaaaa',
  UI_HIGHLIGHT: '#ffd700',
  
  // Efeitos
  SHADOW: 'rgba(0, 0, 0, 0.3)',
  GLOW: 'rgba(255, 111, 0, 0.3)'
};

export const FONTS = {
  PRIMARY: '16px "Courier New", monospace',
  TITLE: '24px "Courier New", monospace',
  SMALL: '12px "Courier New", monospace',
  LARGE: '20px "Courier New", monospace',
  DIALOG: '14px "Courier New", monospace'
};

export const SPACING = {
  TILE_SIZE: 32,
  HALF_TILE: 16,
  PLAYER_SIZE: 24,
  NPC_SIZE: 26,
  UI_PADDING: 8,
  UI_GAP: 4
};

export const EFFECTS = {
  PARTICLE_COUNT: 12,
  PARTICLE_SPEED: 150,
  PARTICLE_LIFE: 0.6,
  PARTICLE_SIZE: 3,
  
  GLOW_INTENSITY: 0.3,
  GLOW_RADIUS: 8,
  
  ANIMATION_SPEED: 0.15,
  BLINK_SPEED: 500
};

export const SNES_PALETTE = [
  '#000000', '#1a1a2e', '#2d2d44', '#4a4a6a',
  '#6a6a8a', '#8a8aaa', '#aaaaaa', '#f0f0f0',
  '#e74c3c', '#c0392b', '#e67e22', '#d35400',
  '#f1c40f', '#f39c12', '#2ecc71', '#27ae60',
  '#1abc9c', '#16a085', '#3498db', '#2980b9',
  '#9b59b6', '#8e44ad', '#e91e63', '#c2185b',
  '#0d47a1', '#1565c0', '#ff6f00', '#ff8f00',
  '#ffd700', '#ff4444', '#00ff00', '#4444ff'
];

export function getSNESColor(index) {
  return SNES_PALETTE[index % SNES_PALETTE.length];
}

export function addNoise(ctx, intensity = 0.05) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity * 255;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  
  ctx.putImageData(imageData, 0, 0);
}

export function drawPixelRect(ctx, x, y, width, height, color, pixelSize = 2) {
  ctx.fillStyle = color;
  for (let px = 0; px < width; px += pixelSize) {
    for (let py = 0; py < height; py += pixelSize) {
      if (Math.random() > 0.1) {
        ctx.fillRect(x + px, y + py, pixelSize, pixelSize);
      }
    }
  }
}

export function drawSNESBorder(ctx, x, y, width, height, color, thickness = 4) {
  // Borda externa escura
  ctx.fillStyle = shadeColor(color, -40);
  ctx.fillRect(x, y, width, thickness);
  ctx.fillRect(x, y + height - thickness, width, thickness);
  ctx.fillRect(x, y, thickness, height);
  ctx.fillRect(x + width - thickness, y, thickness, height);
  
  // Borda interna clara (efeito 3D SNES)
  ctx.fillStyle = shadeColor(color, 40);
  ctx.fillRect(x + thickness, y + thickness, width - thickness * 2, thickness);
  ctx.fillRect(x + thickness, y + height - thickness * 2, width - thickness * 2, thickness);
  ctx.fillRect(x + thickness, y + thickness, thickness, height - thickness * 2);
  ctx.fillRect(x + width - thickness * 2, y + thickness, thickness, height - thickness * 2);
  
  // Centro
  ctx.fillStyle = color;
  ctx.fillRect(x + thickness * 2, y + thickness * 2, width - thickness * 4, height - thickness * 4);
}

export function shadeColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x00FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
