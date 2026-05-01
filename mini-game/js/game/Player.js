import { Entity } from './Entity.js';
import { COLORS } from '../design-tokens/snes-theme.js';

export class Player extends Entity {
    constructor(options = {}) {
        super({
            x: options.x || 100,
            y: options.y || 100,
            width: 24,
            height: 24,
            speed: 150,
            color: COLORS.SNES_YELLOW,
            ...options
        });

        this._maxHp = options.maxHp || 20;
        this._hp = options.hp || this._maxHp;
        this._direction = 'down';
        this._isMoving = false;
        this._animTimer = 0;
        this._animFrame = 0;
        this._animSpeed = 0.12;
        this._sprite = null;
    }

    get hp() { return this._hp; }
    get maxHp() { return this._maxHp; }
    get direction() { return this._direction; }

    setHp(hp) {
        this._hp = Math.max(0, Math.min(hp, this._maxHp));
    }

    takeDamage(amount) {
        this.setHp(this._hp - amount);
    }

    heal(amount) {
        this.setHp(this._hp + amount);
    }

    fullHeal() {
        this._hp = this._maxHp;
    }

    update(deltaTime, input) {
        const dir = input.getDirection();
        
        if (dir.x !== 0 || dir.y !== 0) {
            this._isMoving = true;
            this.move(dir.x, dir.y, deltaTime);

            if (Math.abs(dir.y) > Math.abs(dir.x)) {
                this._direction = dir.y < 0 ? 'up' : 'down';
            } else {
                this._direction = dir.x < 0 ? 'left' : 'right';
            }

            this._animTimer += deltaTime;
            if (this._animTimer >= this._animSpeed) {
                this._animTimer = 0;
                this._animFrame = (this._animFrame + 1) % 4;
            }
        } else {
            this._isMoving = false;
            this._animFrame = 0;
        }
    }

    render(renderer) {
        if (!this._visible) return;

        const bounce = this._isMoving ? Math.sin(this._animFrame * 0.8) * 2 : 0;
        
        // Sombra
        renderer.drawRect(
            this._x + 4, 
            this._y + this._height - 2, 
            this._width - 8, 
            4, 
            'rgba(0, 0, 0, 0.3)',
            { border: false }
        );

        // Corpo principal - estilo SNES com destaque 3D
        const bodyColor = this._color;
        const lightColor = this._lightenColor(bodyColor, 40);
        const darkColor = this._darkenColor(bodyColor, 40);

        // Cabeça
        renderer.drawRect(
            this._x + 4, 
            this._y + 2 + bounce, 
            this._width - 8, 
            10, 
            bodyColor,
            { border: true, borderColor: darkColor }
        );

        // Destaque no topo da cabeça
        renderer.drawRect(
            this._x + 6, 
            this._y + 4 + bounce, 
            this._width - 12, 
            3, 
            lightColor
        );

        // Olhos
        const eyeY = this._y + 6 + bounce;
        let eyeOffsetX = 0;
        if (this._direction === 'left') eyeOffsetX = -2;
        if (this._direction === 'right') eyeOffsetX = 2;

        // Branco dos olhos
        renderer.drawRect(this._x + 7 + eyeOffsetX, eyeY, 4, 4, COLORS.SNES_WHITE);
        renderer.drawRect(this._x + this._width - 11 + eyeOffsetX, eyeY, 4, 4, COLORS.SNES_WHITE);

        // Pupilas
        renderer.drawRect(this._x + 9 + eyeOffsetX, eyeY + 1, 2, 2, COLORS.SNES_BLACK);
        renderer.drawRect(this._x + this._width - 9 + eyeOffsetX, eyeY + 1, 2, 2, COLORS.SNES_BLACK);

        // Corpo
        renderer.drawRect(
            this._x + 2, 
            this._y + 12 + bounce, 
            this._width - 4, 
            10, 
            bodyColor,
            { border: true, borderColor: darkColor }
        );

        // Detalhe da roupa
        renderer.drawRect(
            this._x + 6, 
            this._y + 14 + bounce, 
            this._width - 12, 
            2, 
            darkColor
        );

        // Pés (animados)
        if (this._isMoving) {
            const footOffset = Math.sin(this._animFrame * 1.5) * 3;
            renderer.drawRect(
                this._x + 4 + footOffset, 
                this._y + this._height - 4 + bounce, 
                6, 
                4, 
                darkColor
            );
            renderer.drawRect(
                this._x + this._width - 10 - footOffset, 
                this._y + this._height - 4 + bounce, 
                6, 
                4, 
                darkColor
            );
        } else {
            renderer.drawRect(
                this._x + 4, 
                this._y + this._height - 4 + bounce, 
                6, 
                4, 
                darkColor
            );
            renderer.drawRect(
                this._x + this._width - 10, 
                this._y + this._height - 4 + bounce, 
                6, 
                4, 
                darkColor
            );
        }
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

    getSaveData() {
        return {
            x: this._x,
            y: this._y,
            hp: this._hp,
            maxHp: this._maxHp
        };
    }

    loadFromData(data) {
        this._x = data.x;
        this._y = data.y;
        this._hp = data.hp;
        this._maxHp = data.maxHp || this._maxHp;
    }
}
