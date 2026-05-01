export class CertificateScreen {
    constructor() {
        this._timer = 0;
        this._showInput = false;
        this._particles = [];
        this._finished = false;
    }

    start() {
        this._timer = 0;
        this._showInput = false;
        this._finished = false;
        this._particles = [];
        
        for (let i = 0; i < 50; i++) {
            this._particles.push({
                x: Math.random() * 640,
                y: Math.random() * 480,
                vx: (Math.random() - 0.5) * 30,
                vy: -Math.random() * 50 - 20,
                life: Math.random() * 3 + 2,
                color: ['#ff6f00', '#ffd700', '#1565c0', '#00ff00', '#ff0000'][Math.floor(Math.random() * 5)],
                size: Math.random() * 4 + 2
            });
        }
    }

    update(deltaTime, input) {
        this._timer += deltaTime;

        if (this._timer > 3) {
            this._showInput = true;
        }

        if (this._showInput && (input.isJustPressed('Space') || input.isJustPressed('Enter'))) {
            this._finished = true;
        }

        this._particles.forEach(p => {
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;
            p.life -= deltaTime;
            
            if (p.life <= 0) {
                p.x = Math.random() * 640;
                p.y = 480 + Math.random() * 50;
                p.life = Math.random() * 3 + 2;
                p.vy = -Math.random() * 50 - 20;
            }
        });
    }

    isFinished() {
        return this._finished;
    }

    render(renderer, badges) {
        renderer.clear('#0a0a1a');

        this._particles.forEach(p => {
            const alpha = Math.min(1, p.life);
            renderer.drawRect(p.x, p.y, p.size, p.size, p.color);
        });

        renderer.drawRect(40, 40, 560, 400, 'rgba(13, 71, 161, 0.3)');
        renderer.drawRect(45, 45, 550, 390, 'rgba(13, 71, 161, 0.5)');
        renderer.drawRect(50, 50, 540, 380, 'rgba(0, 0, 0, 0.8)');

        const borderColor = '#ff6f00';
        renderer.drawRect(55, 55, 530, 5, borderColor);
        renderer.drawRect(55, 420, 530, 5, borderColor);
        renderer.drawRect(55, 55, 5, 370, borderColor);
        renderer.drawRect(580, 55, 5, 370, borderColor);

        renderer.drawText('JAMSOFT SISTEMAS', 320, 85, {
            color: '#ff6f00',
            font: '24px monospace',
            align: 'center'
        });

        renderer.drawText('CERTIFICADO DE CONCLUSAO', 320, 120, {
            color: '#ffd700',
            font: '18px monospace',
            align: 'center'
        });

        renderer.drawText('──────────────────────────────', 320, 140, {
            color: '#444444',
            font: '14px monospace',
            align: 'center'
        });

        renderer.drawText('Certificamos que', 320, 175, {
            color: '#aaaaaa',
            font: '14px monospace',
            align: 'center'
        });

        renderer.drawText('ARQUITETO DE AGENTES', 320, 215, {
            color: '#00ff00',
            font: '28px monospace',
            align: 'center'
        });

        renderer.drawText('dominou os 9 artefatos do Harness de IA', 320, 245, {
            color: '#ffffff',
            font: '14px monospace',
            align: 'center'
        });

        const badgeY = 275;
        const badgeSize = 20;
        const gap = 8;
        const totalWidth = 9 * (badgeSize + gap) - gap;
        const startX = 320 - totalWidth / 2;

        const badgeColors = {
            'SPEC.md': '#ff6f00',
            'AGENTS.md': '#1565c0',
            'PLAN.md': '#2e7d32',
            'Agents': '#6a1b9a',
            'Skills': '#c62828',
            'Rules': '#00695c',
            'Hooks': '#37474f',
            'RAG': '#ad1457',
            'MCP': '#ef6c00'
        };

        const allArtifacts = Object.keys(badgeColors);
        allArtifacts.forEach((artifact, index) => {
            const bx = startX + index * (badgeSize + gap);
            const hasBadge = badges.has(artifact);
            const color = hasBadge ? badgeColors[artifact] : '#333333';
            
            renderer.drawRect(bx, badgeY, badgeSize, badgeSize, color);
            if (hasBadge) {
                renderer.drawRect(bx + 2, badgeY + 2, badgeSize - 4, badgeSize - 4, '#ffffff');
                renderer.drawRect(bx + 4, badgeY + 4, badgeSize - 8, badgeSize - 8, color);
            }
        });

        renderer.drawText('9/9 Artefatos Dominados', 320, badgeY + 35, {
            color: '#ffd700',
            font: '12px monospace',
            align: 'center'
        });

        renderer.drawText(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 320, 330, {
            color: '#aaaaaa',
            font: '12px monospace',
            align: 'center'
        });

        renderer.drawText('Itabaiana - SE', 320, 350, {
            color: '#666666',
            font: '11px monospace',
            align: 'center'
        });

        renderer.drawText('JAMSOFT SISTEMAS - 36+ Anos de Excelencia', 320, 370, {
            color: '#444444',
            font: '10px monospace',
            align: 'center'
        });

        if (this._showInput) {
            const blink = Math.floor(Date.now() / 500) % 2 === 0;
            if (blink) {
                renderer.drawText('▼ PRESSIONE ESPACO PARA JOGAR NOVAMENTE', 320, 410, {
                    color: '#ff6f00',
                    font: '12px monospace',
                    align: 'center'
                });
            }
        }
    }
}
