import { STATE } from './State.js';

export class ChallengeSystem {
    constructor() {
        this._challenge = null;
        this._selectedOption = 0;
        this._state = 'question';
        this._result = null;
        this._showHint = false;
        this._timer = 0;
        this._badgeUnlocked = false;
    }

    startChallenge(challengeData) {
        this._challenge = challengeData;
        this._selectedOption = 0;
        this._state = 'question';
        this._result = null;
        this._showHint = false;
        this._timer = 0;
        this._badgeUnlocked = false;
    }

    update(deltaTime, input) {
        this._timer += deltaTime;

        if (this._state === 'question') {
            if (input.isJustPressed('ArrowUp')) {
                this._selectedOption = (this._selectedOption - 1 + this._challenge.options.length) % this._challenge.options.length;
            }
            if (input.isJustPressed('ArrowDown')) {
                this._selectedOption = (this._selectedOption + 1) % this._challenge.options.length;
            }
            if (input.isJustPressed('Space') || input.isJustPressed('Enter') || input.isJustPressed('KeyZ')) {
                this._checkAnswer();
            }
        } else if (this._state === 'correct') {
            if (input.isJustPressed('Space') || input.isJustPressed('Enter') || input.isJustPressed('KeyZ')) {
                this._result = 'completed';
            }
        } else if (this._state === 'wrong') {
            if (input.isJustPressed('Space') || input.isJustPressed('Enter') || input.isJustPressed('KeyZ')) {
                if (this._showHint) {
                    this._state = 'question';
                    this._showHint = false;
                } else {
                    this._showHint = true;
                }
            }
        }
    }

    _checkAnswer() {
        if (this._selectedOption === this._challenge.correct) {
            this._state = 'correct';
            this._badgeUnlocked = true;
        } else {
            this._state = 'wrong';
        }
    }

    isCompleted() {
        return this._result === 'completed';
    }

    hasBadge() {
        return this._badgeUnlocked;
    }

    getArtifact() {
        return this._challenge ? this._challenge.artifact : null;
    }

    render(renderer) {
        renderer.clear('#0a0a1a');

        this._renderHeader(renderer);

        if (this._state === 'question') {
            this._renderQuestion(renderer);
        } else if (this._state === 'correct') {
            this._renderCorrect(renderer);
        } else if (this._state === 'wrong') {
            this._renderWrong(renderer);
        }
    }

    _renderHeader(renderer) {
        renderer.drawRect(0, 0, 640, 60, '#0d47a1');
        renderer.drawText('DESAFIO JAMSOFT', 320, 20, {
            color: '#ff6f00',
            font: '20px monospace',
            align: 'center'
        });

        if (this._challenge) {
            renderer.drawText(`Artefato: ${this._challenge.artifact}`, 320, 42, {
                color: '#ffffff',
                font: '14px monospace',
                align: 'center'
            });
        }
    }

    _renderQuestion(renderer) {
        const boxX = 40;
        const boxY = 80;
        const boxWidth = 560;

        renderer.drawRect(boxX, boxY, boxWidth, 80, 'rgba(0, 0, 0, 0.8)');
        renderer.drawRect(boxX + 2, boxY + 2, boxWidth - 4, 76, 'rgba(26, 35, 126, 0.9)');

        const questionLines = this._wrapText(this._challenge.question, 50);
        questionLines.forEach((line, i) => {
            renderer.drawText(line, boxX + 15, boxY + 20 + (i * 20), {
                color: '#ffffff',
                font: '16px monospace'
            });
        });

        const optionsStartY = 180;
        const optionHeight = 45;

        this._challenge.options.forEach((option, index) => {
            const y = optionsStartY + (index * (optionHeight + 10));
            const isSelected = index === this._selectedOption;

            const bgColor = isSelected ? '#ff6f00' : 'rgba(13, 71, 161, 0.8)';
            const textColor = isSelected ? '#000000' : '#ffffff';
            const prefix = isSelected ? '► ' : '  ';

            renderer.drawRect(60, y, 520, optionHeight, bgColor);
            renderer.drawRect(62, y + 2, 516, optionHeight - 4, isSelected ? '#ff8f00' : 'rgba(26, 35, 126, 0.9)');

            renderer.drawText(prefix + option, 80, y + 14, {
                color: textColor,
                font: '16px monospace'
            });
        });

        renderer.drawText('Use ↑↓ para navegar e ESPACO para confirmar', 320, 440, {
            color: '#aaaaaa',
            font: '12px monospace',
            align: 'center'
        });
    }

    _renderCorrect(renderer) {
        const centerY = 200;

        const blink = Math.floor(Date.now() / 300) % 2 === 0;
        const color = blink ? '#00ff00' : '#88ff88';

        renderer.drawText('✓ RESPOSTA CORRETA!', 320, centerY, {
            color: color,
            font: '32px monospace',
            align: 'center'
        });

        renderer.drawText(`Badge ${this._challenge.artifact} desbloqueado!`, 320, centerY + 50, {
            color: '#ffd700',
            font: '18px monospace',
            align: 'center'
        });

        renderer.drawText('Pressione ESPACO para continuar', 320, centerY + 100, {
            color: '#ffffff',
            font: '14px monospace',
            align: 'center'
        });
    }

    _renderWrong(renderer) {
        const centerY = 180;

        renderer.drawText('✗ RESPOSTA ERRADA', 320, centerY, {
            color: '#ff4444',
            font: '28px monospace',
            align: 'center'
        });

        renderer.drawText(`A resposta correta era: ${this._challenge.options[this._challenge.correct]}`, 320, centerY + 50, {
            color: '#ffffff',
            font: '16px monospace',
            align: 'center'
        });

        if (this._showHint) {
            const hintLines = this._wrapText(this._challenge.hint, 50);
            renderer.drawRect(40, centerY + 80, 560, 20 + (hintLines.length * 20), 'rgba(0, 0, 0, 0.8)');
            renderer.drawRect(42, centerY + 82, 556, 16 + (hintLines.length * 20), 'rgba(13, 71, 161, 0.9)');

            hintLines.forEach((line, i) => {
                renderer.drawText(line, 60, centerY + 100 + (i * 20), {
                    color: '#ff6f00',
                    font: '14px monospace'
                });
            });

            renderer.drawText('Pressione ESPACO para tentar novamente', 320, 440, {
                color: '#ffffff',
                font: '14px monospace',
                align: 'center'
            });
        } else {
            renderer.drawText('Pressione ESPACO para ver uma dica', 320, 440, {
                color: '#aaaaaa',
                font: '14px monospace',
                align: 'center'
            });
        }
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
