import { Entity } from './Entity.js';
import { COLORS, FONTS } from '../design-tokens/snes-theme.js';

export class NPC extends Entity {
    constructor(options = {}) {
        super({
            x: options.x || 0,
            y: options.y || 0,
            width: 26,
            height: 26,
            speed: 0,
            color: options.color || COLORS.SNES_BLUE,
            ...options
        });

        this._name = options.name || 'Funcionario';
        this._role = options.role || 'Colaborador';
        this._artifact = options.artifact || '';
        this._avatar = options.avatar || '?';
        this._npcId = options.id || 'npc_unknown';
        this._interactRadius = options.interactRadius || 48;
    }

    get name() { return this._name; }
    get role() { return this._role; }
    get artifact() { return this._artifact; }
    get npcId() { return this._npcId; }

    canInteract(player) {
        const dx = this.getCenterX() - player.getCenterX();
        const dy = this.getCenterY() - player.getCenterY();
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist <= this._interactRadius;
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

        // Sombra
        renderer.drawRect(
            this._x + 4, 
            this._y + this._height - 2, 
            this._width - 8, 
            4, 
            'rgba(0, 0, 0, 0.3)'
        );

        // Cabeça - formato mais quadrado estilo SNES
        renderer.drawRect(
            this._x + 3, 
            this._y + 2, 
            this._width - 6, 
            10, 
            bodyColor,
            { border: true, borderColor: darkColor }
        );

        // Destaque no topo
        renderer.drawRect(
            this._x + 5, 
            this._y + 4, 
            this._width - 10, 
            3, 
            lightColor
        );

        // Olhos
        const eyeY = this._y + 6;
        renderer.drawRect(this._x + 6, eyeY, 5, 5, COLORS.SNES_WHITE);
        renderer.drawRect(this._x + this._width - 11, eyeY, 5, 5, COLORS.SNES_WHITE);

        // Pupilas
        renderer.drawRect(this._x + 8, eyeY + 1, 3, 3, COLORS.SNES_BLACK);
        renderer.drawRect(this._x + this._width - 9, eyeY + 1, 3, 3, COLORS.SNES_BLACK);

        // Corpo - com detalhes de roupa
        renderer.drawRect(
            this._x + 2, 
            this._y + 12, 
            this._width - 4, 
            12, 
            bodyColor,
            { border: true, borderColor: darkColor }
        );

        // Gravata/Detalhe
        renderer.drawRect(
            this._x + this._width / 2 - 2, 
            this._y + 14, 
            4, 
            6, 
            darkColor
        );

        // Nome acima
        renderer.drawText(
            this._name.split(' ')[0], 
            this._x + this._width / 2, 
            this._y - 10, 
            {
                color: COLORS.UI_TEXT,
                font: FONTS.SMALL,
                align: 'center',
                shadow: true
            }
        );

        // Badge/Artefato indicador
        if (this._artifact) {
            const badgeColor = this._getArtifactColor(this._artifact);
            renderer.drawRect(this._x + this._width - 8, this._y - 4, 8, 8, badgeColor);
            renderer.drawRect(this._x + this._width - 7, this._y - 3, 6, 6, COLORS.SNES_WHITE);
            renderer.drawRect(this._x + this._width - 6, this._y - 2, 4, 4, badgeColor);
        }
    }

    _getArtifactColor(artifact) {
        const colors = {
            'SPEC.md': COLORS.ROOM_SPEC,
            'AGENTS.md': COLORS.ROOM_AGENTS,
            'PLAN.md': COLORS.ROOM_PLAN,
            'Agents': COLORS.ROOM_AGENTS_SUB,
            'Skills': COLORS.ROOM_SKILLS,
            'Rules': COLORS.ROOM_RULES,
            'Hooks': COLORS.ROOM_HOOKS,
            'RAG': COLORS.ROOM_RAG,
            'MCP': COLORS.ROOM_MCP
        };
        return colors[artifact] || COLORS.SNES_GRAY;
    }
}
