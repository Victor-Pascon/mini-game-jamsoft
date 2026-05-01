import { COLORS, FONTS, EFFECTS, drawSNESBorder, shadeColor } from '../design-tokens/snes-theme.js';

export class Renderer {
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this._width = canvas.width;
        this._height = canvas.height;
        this._pixelSize = 2;
        this._scanlineOffset = 0;
    }

    clear(color = COLORS.SNES_DARK) {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(0, 0, this._width, this._height);
    }

    // Efeito scanline estilo CRT/SNES
    drawScanlines() {
        this._ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let y = 0; y < this._height; y += 4) {
            this._ctx.fillRect(0, y, this._width, 2);
        }
    }

    // Efeito de vignette (bordas escuras)
    drawVignette() {
        const gradient = this._ctx.createRadialGradient(
            this._width / 2, this._height / 2, this._width * 0.3,
            this._width / 2, this._height / 2, this._width * 0.7
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
        this._ctx.fillStyle = gradient;
        this._ctx.fillRect(0, 0, this._width, this._height);
    }

    drawRect(x, y, width, height, color, options = {}) {
        const { 
            border = false, 
            borderColor = null,
            shadow = false,
            pixelated = false 
        } = options;

        if (pixelated) {
            this._drawPixelatedRect(x, y, width, height, color);
        } else {
            this._ctx.fillStyle = color;
            this._ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
        }

        if (shadow) {
            this._ctx.fillStyle = COLORS.SHADOW;
            this._ctx.fillRect(Math.floor(x) + 2, Math.floor(y) + height, width, 2);
        }

        if (border) {
            this._ctx.strokeStyle = borderColor || shadeColor(color, 40);
            this._ctx.lineWidth = 2;
            this._ctx.strokeRect(Math.floor(x), Math.floor(y), width, height);
        }
    }

    _drawPixelatedRect(x, y, width, height, color) {
        const pixelSize = this._pixelSize;
        this._ctx.fillStyle = color;
        
        for (let px = 0; px < width; px += pixelSize) {
            for (let py = 0; py < height; py += pixelSize) {
                // Adiciona variação sutil para efeito pixel art
                const variation = (Math.random() - 0.5) * 0.1;
                this._ctx.globalAlpha = 1 + variation;
                this._ctx.fillRect(
                    Math.floor(x + px), 
                    Math.floor(y + py), 
                    pixelSize, 
                    pixelSize
                );
            }
        }
        this._ctx.globalAlpha = 1;
    }

    drawSprite(sprite, x, y, width, height) {
        if (!sprite || !sprite.image) return;
        
        const frameX = sprite.frameX !== undefined ? sprite.frameX * sprite.frameWidth : 0;
        const frameY = sprite.frameY !== undefined ? sprite.frameY * sprite.frameHeight : 0;
        
        this._ctx.imageSmoothingEnabled = false;
        this._ctx.drawImage(
            sprite.image,
            frameX, frameY,
            sprite.frameWidth, sprite.frameHeight,
            Math.floor(x), Math.floor(y),
            width || sprite.frameWidth,
            height || sprite.frameHeight
        );
        this._ctx.imageSmoothingEnabled = true;
    }

    drawText(text, x, y, options = {}) {
        const {
            color = COLORS.UI_TEXT,
            font = FONTS.PRIMARY,
            align = 'left',
            baseline = 'top',
            maxWidth = null,
            shadow = true,
            glow = false
        } = options;

        this._ctx.font = font;
        this._ctx.textAlign = align;
        this._ctx.textBaseline = baseline;

        // Sombra do texto estilo SNES
        if (shadow) {
            this._ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            if (maxWidth) {
                this._ctx.fillText(text, x + 1, y + 1, maxWidth);
            } else {
                this._ctx.fillText(text, x + 1, y + 1);
            }
        }

        // Glow effect
        if (glow) {
            this._ctx.shadowColor = color;
            this._ctx.shadowBlur = 8;
        }

        this._ctx.fillStyle = color;
        if (maxWidth) {
            this._ctx.fillText(text, x, y, maxWidth);
        } else {
            this._ctx.fillText(text, x, y);
        }

        this._ctx.shadowBlur = 0;
    }

    drawTile(tile, x, y, size) {
        if (!tile) return;
        
        const px = x * size;
        const py = y * size;
        
        if (tile.color) {
            // Adiciona variação de cor para tiles adjacentes (efeito textura)
            const baseColor = tile.color;
            this._ctx.fillStyle = baseColor;
            this._ctx.fillRect(px, py, size, size);
            
            // Destaque no topo (efeito 3D sutil)
            this._ctx.fillStyle = shadeColor(baseColor, 20);
            this._ctx.fillRect(px, py, size, 2);
            
            // Sombra na base
            this._ctx.fillStyle = shadeColor(baseColor, -20);
            this._ctx.fillRect(px, py + size - 2, size, 2);
            
            // Detalhes aleatórios para textura
            if (tile.type !== 'wall') {
                this._ctx.fillStyle = shadeColor(baseColor, (Math.random() - 0.5) * 30);
                this._ctx.fillRect(
                    px + Math.random() * (size - 4),
                    py + Math.random() * (size - 4),
                    2, 2
                );
            }
        } else if (tile.sprite) {
            this.drawSprite(tile.sprite, px, py, size, size);
        }
    }

    drawMap(map, tileSize) {
        if (!map || !map.tiles) return;

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tileIndex = map.tiles[y * map.width + x];
                const tile = map.tileTypes[tileIndex];
                if (tile) {
                    tile.type = tileIndex;
                    this.drawTile(tile, x, y, tileSize);
                }
            }
        }
    }

    // Desenha um personagem estilo SNES (com sombra e destaque)
    drawCharacter(x, y, width, height, color, options = {}) {
        const { 
            direction = 'down',
            isMoving = false,
            frame = 0,
            name = '',
            badge = null
        } = options;

        const bounce = isMoving ? Math.sin(frame * 0.5) * 2 : 0;
        const drawY = y + bounce;

        // Sombra
        this._ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this._ctx.beginPath();
        this._ctx.ellipse(
            x + width / 2, 
            y + height + 2, 
            width / 2 - 2, 
            3, 
            0, 0, Math.PI * 2
        );
        this._ctx.fill();

        // Corpo principal com borda estilo SNES
        const bodyColor = color;
        const lightColor = shadeColor(color, 40);
        const darkColor = shadeColor(color, -40);

        // Cabeça
        this._ctx.fillStyle = bodyColor;
        this._ctx.fillRect(x + 4, drawY + 2, width - 8, height / 2 - 2);
        
        // Destaque na cabeça
        this._ctx.fillStyle = lightColor;
        this._ctx.fillRect(x + 6, drawY + 4, width - 12, 3);

        // Olhos
        const eyeY = drawY + 8;
        this._ctx.fillStyle = COLORS.SNES_WHITE;
        
        let eyeOffsetX = 0;
        if (direction === 'left') eyeOffsetX = -2;
        if (direction === 'right') eyeOffsetX = 2;
        
        this._ctx.fillRect(x + 8 + eyeOffsetX, eyeY, 4, 4);
        this._ctx.fillRect(x + width - 12 + eyeOffsetX, eyeY, 4, 4);
        
        // Pupilas
        this._ctx.fillStyle = COLORS.SNES_BLACK;
        this._ctx.fillRect(x + 10 + eyeOffsetX, eyeY + 1, 2, 2);
        this._ctx.fillRect(x + width - 10 + eyeOffsetX, eyeY + 1, 2, 2);

        // Corpo
        this._ctx.fillStyle = bodyColor;
        this._ctx.fillRect(x + 2, drawY + height / 2, width - 4, height / 2 - 2);
        
        // Detalhes do corpo
        this._ctx.fillStyle = darkColor;
        this._ctx.fillRect(x + 6, drawY + height / 2 + 4, width - 12, 2);

        // Nome acima do personagem
        if (name) {
            this.drawText(name, x + width / 2, drawY - 12, {
                color: COLORS.UI_TEXT,
                font: FONTS.SMALL,
                align: 'center',
                shadow: true
            });
        }

        // Badge indicador
        if (badge) {
            this._ctx.fillStyle = badge;
            this._ctx.fillRect(x + width - 8, drawY - 4, 6, 6);
            this._ctx.fillStyle = COLORS.SNES_WHITE;
            this._ctx.fillRect(x + width - 7, drawY - 3, 4, 4);
        }
    }

    // Desenha partículas estilo SNES
    drawParticles(particles) {
        particles.forEach(p => {
            const alpha = Math.min(1, p.life);
            this._ctx.globalAlpha = alpha;
            this._ctx.fillStyle = p.color;
            
            // Partículas quadradas estilo pixel
            this._ctx.fillRect(
                Math.floor(p.x), 
                Math.floor(p.y), 
                Math.ceil(p.size), 
                Math.ceil(p.size)
            );
        });
        this._ctx.globalAlpha = 1;
    }

    // Efeito de brilho/aura
    drawGlow(x, y, radius, color, intensity = 0.3) {
        const gradient = this._ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color.replace(')', `, ${intensity})`).replace('rgb', 'rgba'));
        gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));
        
        this._ctx.fillStyle = gradient;
        this._ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    // Efeito de transição (fade)
    drawFade(alpha) {
        this._ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        this._ctx.fillRect(0, 0, this._width, this._height);
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get context() {
        return this._ctx;
    }
}
