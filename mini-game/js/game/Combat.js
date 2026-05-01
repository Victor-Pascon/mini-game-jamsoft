import { STATE } from './State.js';

export class CombatSystem {
    constructor(player) {
        this._player = player;
        this._enemy = null;
        this._menuOptions = ['Documentar', 'Consultar', 'Usar Artefato', 'Pular'];
        this._selectedIndex = 0;
        this._state = 'menu';
        this._result = null;
        this._timer = 0;
        this._turn = 'player';
        this._log = [];
        this._particles = [];
        this._badges = [];
        this._selectedBadge = 0;
        this._showBadgeMenu = false;
    }

    startCombat(enemy, unlockedBadges = []) {
        this._enemy = enemy;
        this._state = 'menu';
        this._result = null;
        this._timer = 0;
        this._turn = 'player';
        this._selectedIndex = 0;
        this._selectedBadge = 0;
        this._showBadgeMenu = false;
        this._badges = unlockedBadges || [];
        this._log = [`Projeto "${enemy.name}" encontrado!`, 'Aplique o Harness para salva-lo!'];
        this._particles = [];
    }

    update(deltaTime, input) {
        this._timer += deltaTime;

        if (this._showBadgeMenu) {
            if (input.isJustPressed('ArrowUp')) {
                this._selectedBadge = (this._selectedBadge - 1 + this._badges.length) % this._badges.length;
            }
            if (input.isJustPressed('ArrowDown')) {
                this._selectedBadge = (this._selectedBadge + 1) % this._badges.length;
            }
            if (input.isJustPressed('Space') || input.isJustPressed('Enter') || input.isJustPressed('KeyZ')) {
                this._useBadge(this._badges[this._selectedBadge]);
                this._showBadgeMenu = false;
            }
            if (input.isJustPressed('Escape') || input.isJustPressed('ArrowLeft')) {
                this._showBadgeMenu = false;
            }
            return;
        }

        if (this._state === 'menu') {
            if (input.isJustPressed('ArrowUp')) {
                this._selectedIndex = (this._selectedIndex - 1 + this._menuOptions.length) % this._menuOptions.length;
            }
            if (input.isJustPressed('ArrowDown')) {
                this._selectedIndex = (this._selectedIndex + 1) % this._menuOptions.length;
            }
            if (input.isJustPressed('Space') || input.isJustPressed('Enter') || input.isJustPressed('KeyZ')) {
                this._selectOption();
            }
        } else if (this._state === 'result') {
            if (input.isJustPressed('Space') || input.isJustPressed('Enter')) {
                if (this._result === 'victory') {
                    this._state = 'victory';
                } else if (this._result === 'defeat') {
                    this._state = 'defeat';
                } else {
                    this._state = 'menu';
                    this._turn = this._turn === 'player' ? 'enemy' : 'player';
                    if (this._turn === 'enemy') {
                        this._enemyTurn();
                    }
                }
            }
        } else if (this._state === 'victory' || this._state === 'defeat') {
            if (input.isJustPressed('Space') || input.isJustPressed('Enter')) {
                if (this._state === 'victory') {
                    this._result = 'victory';
                } else {
                    this._result = 'defeat';
                }
            }
        }

        this._updateParticles(deltaTime);
    }

    _selectOption() {
        const option = this._menuOptions[this._selectedIndex];

        if (option === 'Documentar') {
            const damage = Math.floor(Math.random() * 3) + 2;
            const actualDamage = this._enemy.takeDamage(damage);
            this._log.push(`Voce documentou o projeto! Causou ${actualDamage} de dano.`);
            this._addParticles(320, 120, '#ff6f00');

            if (!this._enemy.isAlive()) {
                this._log.push(`Projeto salvo! ${this._enemy.xpReward} XP ganho!`);
                this._result = 'victory';
            } else {
                this._result = 'continue';
            }
            this._state = 'result';
        } else if (option === 'Consultar') {
            const damage = Math.floor(Math.random() * 2) + 1;
            const actualDamage = this._enemy.takeDamage(damage);
            this._log.push(`Voce consultou as regras! Causou ${actualDamage} de dano.`);
            this._log.push(`Fraqueza: este projeto precisa de mais ${this._enemy.artifact || 'documentacao'}!`);
            this._addParticles(320, 120, '#1565c0');

            if (!this._enemy.isAlive()) {
                this._log.push(`Projeto salvo! ${this._enemy.xpReward} XP ganho!`);
                this._result = 'victory';
            } else {
                this._result = 'continue';
            }
            this._state = 'result';
        } else if (option === 'Usar Artefato') {
            if (this._badges.length > 0) {
                this._showBadgeMenu = true;
                this._selectedBadge = 0;
            } else {
                this._log.push('Voce ainda nao tem artefatos (badges) desbloqueados!');
                this._log.push('Converse com os funcionarios da JAMSOFT primeiro.');
                this._result = 'continue';
                this._state = 'result';
            }
        } else if (option === 'Pular') {
            this._log.push('Voce pulou este projeto por enquanto.');
            this._result = 'flee';
            this._state = 'result';
        }
    }

    _useBadge(badge) {
        const bonusDamage = 5 + Math.floor(Math.random() * 3);
        const actualDamage = this._enemy.takeDamage(bonusDamage);
        this._log.push(`Artefato ${badge} aplicado! Causou ${actualDamage} de dano!`);
        this._addParticles(320, 120, '#00ff00');

        if (!this._enemy.isAlive()) {
            this._log.push(`Projeto salvo com sucesso! ${this._enemy.xpReward} XP ganho!`);
            this._result = 'victory';
        } else {
            this._result = 'continue';
        }
        this._state = 'result';
    }

    _enemyTurn() {
        if (!this._enemy || !this._enemy.isAlive()) return;

        const chaosAttacks = [
            'codigo legado',
            'falta de documentacao',
            'dependencias quebradas',
            'bugs acumulados'
        ];
        const attack = chaosAttacks[Math.floor(Math.random() * chaosAttacks.length)];
        const damage = Math.max(1, this._enemy.attack - Math.floor(Math.random() * 2));
        this._player.takeDamage(damage);
        this._log.push(`${this._enemy.name} atacou com ${attack}! Causou ${damage} de dano!`);
        this._addParticles(320, 360, '#ff4444');

        if (this._player.hp <= 0) {
            this._log.push('Voce foi sobrecarregado pelo projeto caotico...');
            this._result = 'defeat';
            this._state = 'result';
        } else {
            this._turn = 'player';
            this._state = 'menu';
        }
    }

    _addParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this._particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 200,
                vy: (Math.random() - 0.5) * 200,
                life: 0.5,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }

    _updateParticles(deltaTime) {
        for (let i = this._particles.length - 1; i >= 0; i--) {
            const p = this._particles[i];
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;
            p.life -= deltaTime;
            if (p.life <= 0) {
                this._particles.splice(i, 1);
            }
        }
    }

    isVictory() {
        return this._state === 'victory' || this._result === 'victory';
    }

    isDefeat() {
        return this._state === 'defeat' || this._result === 'defeat';
    }

    isFlee() {
        return this._result === 'flee';
    }

    render(renderer) {
        renderer.clear('#0a0a1a');

        renderer.drawRect(0, 0, 640, 60, '#0d47a1');
        renderer.drawText('COMBATE: PROJETO SEM HARNESS', 320, 20, {
            color: '#ff6f00',
            font: '18px monospace',
            align: 'center'
        });
        renderer.drawText('Aplique os artefatos do Harness para salvar o projeto!', 320, 42, {
            color: '#aaaaaa',
            font: '11px monospace',
            align: 'center'
        });

        renderer.drawRect(50, 70, 540, 180, '#1a1a3a');

        if (this._enemy) {
            const projectColor = this._enemy.color || '#8B4513';
            renderer.drawRect(280, 85, 80, 80, projectColor);
            renderer.drawRect(300, 105, 10, 10, '#000000');
            renderer.drawRect(330, 105, 10, 10, '#000000');
            renderer.drawRect(310, 130, 20, 8, '#000000');

            renderer.drawRect(260, 175, 120, 15, '#000000');
            const hpPercent = this._enemy.hp / this._enemy.maxHp;
            renderer.drawRect(262, 177, 116 * hpPercent, 11, hpPercent > 0.5 ? '#00ff00' : hpPercent > 0.25 ? '#ffff00' : '#ff0000');
        }

        renderer.drawText(`${this._enemy ? this._enemy.name : 'Projeto Caotico'}`, 320, 200, {
            color: '#ffffff',
            font: '14px monospace',
            align: 'center'
        });
        renderer.drawText(`HP: ${this._enemy ? this._enemy.hp : 0}/${this._enemy ? this._enemy.maxHp : 0}`, 320, 218, {
            color: '#aaaaaa',
            font: '12px monospace',
            align: 'center'
        });

        if (this._showBadgeMenu) {
            this._renderBadgeMenu(renderer);
        } else {
            renderer.drawRect(50, 260, 260, 150, '#1a1a3a');
            const startY = 275;
            this._menuOptions.forEach((option, index) => {
                const y = startY + index * 32;
                const isSelected = index === this._selectedIndex;
                const color = isSelected ? '#ffff00' : '#ffffff';
                const prefix = isSelected ? '► ' : '  ';

                if (isSelected) {
                    renderer.drawRect(55, y - 4, 250, 28, 'rgba(255, 111, 0, 0.3)');
                }

                renderer.drawText(prefix + option, 70, y + 4, {
                    color: color,
                    font: '16px monospace'
                });
            });
        }

        renderer.drawRect(320, 260, 270, 150, '#000000');
        renderer.drawRect(322, 262, 266, 146, '#2a2a4a');

        const logStart = Math.max(0, this._log.length - 4);
        for (let i = logStart; i < this._log.length; i++) {
            const logLines = this._wrapText(this._log[i], 30);
            logLines.forEach((line, j) => {
                renderer.drawText(line, 335, 278 + ((i - logStart) * 16) + (j * 14), {
                    color: '#ffffff',
                    font: '11px monospace'
                });
            });
        }

        this._particles.forEach(p => {
            renderer.drawRect(p.x, p.y, p.size, p.size, p.color);
        });

        renderer.drawRect(10, 430, 200, 40, '#000000');
        renderer.drawRect(12, 432, 196, 36, '#1a1a3a');
        renderer.drawText(`HP: ${this._player.hp}/${this._player.maxHp}`, 25, 445, {
            color: '#ffffff',
            font: '14px monospace'
        });

        const playerHpPercent = this._player.hp / this._player.maxHp;
        renderer.drawRect(25, 458, 170, 8, '#000000');
        renderer.drawRect(27, 460, 166 * playerHpPercent, 4, playerHpPercent > 0.5 ? '#00ff00' : '#ff0000');
    }

    _renderBadgeMenu(renderer) {
        renderer.drawRect(50, 260, 260, 150, '#000000');
        renderer.drawRect(52, 262, 256, 146, '#2a2a4a');

        renderer.drawText('Selecione um Artefato:', 70, 278, {
            color: '#ff6f00',
            font: '12px monospace'
        });

        this._badges.forEach((badge, index) => {
            const y = 300 + index * 22;
            const isSelected = index === this._selectedBadge;
            const color = isSelected ? '#ffff00' : '#ffffff';
            const prefix = isSelected ? '► ' : '  ';

            renderer.drawText(prefix + badge, 70, y, {
                color: color,
                font: '14px monospace'
            });
        });

        renderer.drawText('ESC para voltar', 70, 390, {
            color: '#aaaaaa',
            font: '10px monospace'
        });
    }

    _wrapText(text, maxChars) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        for (const word of words) {
            if ((currentLine + word).length > maxChars && currentLine.length > 0) {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine += word + ' ';
            }
        }
        if (currentLine.trim().length > 0) {
            lines.push(currentLine.trim());
        }

        return lines;
    }
}
