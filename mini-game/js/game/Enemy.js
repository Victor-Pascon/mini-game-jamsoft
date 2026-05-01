import { Entity } from './Entity.js';
import { COLORS } from '../design-tokens/snes-theme.js';

export class Enemy extends Entity {
    constructor(options = {}) {
        super({
            x: options.x || 0,
            y: options.y || 0,
            width: 26,
            height: 26,
            speed: 0,
            color: options.color || COLORS.SNES_RED_DARK,
            ...options
        });

        this._name = options.name || 'Inimigo';
        this._maxHp = options.maxHp || 10;
        this._hp = options.hp || this._maxHp;
        this._attack = options.attack || 2;
        this._defense = options.defense || 0;
        this._xpReward = options.xpReward || 5;
        this._dialog = options.dialog || null;
    }

    get name() { return this._name; }
    get hp() { return this._hp; }
    get maxHp() { return this._maxHp; }
    get attack() { return this._attack; }
    get defense() { return this._defense; }
    get xpReward() { return this._xpReward; }

    setHp(hp) {
        this._hp = Math.max(0, Math.min(hp, this._maxHp));
    }

    takeDamage(amount) {
        const damage = Math.max(1, amount - this._defense);
        this.setHp(this._hp - damage);
        return damage;
    }

    isAlive() {
        return this._hp > 0;
    }

    _lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x00FF) + amt));
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    _darkenColor(color, percent) {
        return this._lightenColor(color, -percent);
    }

    render(renderer) {
        if (!this._visible) return;

        const bodyColor = this._color;
        const lightColor = this._lightenColor(bodyColor, 40);
        const darkColor = this._darkenColor(bodyColor, 40);

        // Sombra pulsante
        const pulse = Math.sin(Date.now() / 200) * 0.1 + 0.3;
        renderer.drawRect(
            this._x + 2, 
            this._y + this._height - 2, 
            this._width - 4, 
            4, 
            `rgba(0, 0, 0, ${pulse})`
        );

        // Aura vermelha (projeto caotico)
        renderer.drawRect(
            this._x - 2, 
            this._y - 2, 
            this._width + 4, 
            this._height + 4, 
            'rgba(231, 76, 60, 0.2)'
        );

        // Corpo - formato mais ameaçador
        renderer.drawRect(
            this._x + 2, 
            this._y + 2, 
            this._width - 4, 
            this._height - 4, 
            bodyColor,
            { border: true, borderColor: darkColor }
        );

        // Destaque
        renderer.drawRect(
            this._x + 4, 
            this._y + 4, 
            this._width - 8, 
            4, 
            lightColor
        );

        // Olhos brilhantes (vermelhos)
        renderer.drawRect(this._x + 5, this._y + 8, 5, 5, COLORS.SNES_RED);
        renderer.drawRect(this._x + this._width - 10, this._y + 8, 5, 5, COLORS.SNES_RED);

        // Pupilas
        renderer.drawRect(this._x + 7, this._y + 9, 3, 3, COLORS.SNES_BLACK);
        renderer.drawRect(this._x + this._width - 8, this._y + 9, 3, 3, COLORS.SNES_BLACK);

        // Boca (sorriso maligno)
        renderer.drawRect(this._x + 7, this._y + 16, 12, 3, COLORS.SNES_BLACK);
        renderer.drawRect(this._x + 6, this._y + 15, 3, 3, COLORS.SNES_BLACK);
        renderer.drawRect(this._x + 17, this._y + 15, 3, 3, COLORS.SNES_BLACK);

        // Indicador de perigo
        const blink = Math.floor(Date.now() / 300) % 2 === 0;
        if (blink) {
            renderer.drawText('!', this._x + this._width / 2, this._y - 10, {
                color: COLORS.SNES_RED,
                font: '14px monospace',
                align: 'center',
                shadow: true
            });
        }
    }
}
