export class DialogSystem {
    constructor() {
        this._lines = [];
        this._currentLine = 0;
        this._currentText = '';
        this._targetText = '';
        this._charIndex = 0;
        this._timer = 0;
        this._speed = 0.03;
        this._finished = false;
        this._waitingForInput = false;
        this._maxCharsPerLine = 50;
        this._lineHeight = 22;
    }

    startDialog(lines) {
        this._lines = Array.isArray(lines) ? lines : [lines];
        this._currentLine = 0;
        this._currentText = '';
        this._charIndex = 0;
        this._timer = 0;
        this._finished = false;
        this._waitingForInput = false;
        this._targetText = this._lines[0] || '';
    }

    update(deltaTime, input) {
        if (this._finished) return;

        if (this._charIndex < this._targetText.length) {
            this._timer += deltaTime;
            while (this._timer >= this._speed && this._charIndex < this._targetText.length) {
                this._timer -= this._speed;
                this._currentText += this._targetText[this._charIndex];
                this._charIndex++;
            }
        } else {
            this._waitingForInput = true;

            if (input.isJustPressed('Space') || input.isJustPressed('Enter') || input.isJustPressed('KeyZ')) {
                this._currentLine++;
                if (this._currentLine >= this._lines.length) {
                    this._finished = true;
                } else {
                    this._currentText = '';
                    this._charIndex = 0;
                    this._targetText = this._lines[this._currentLine];
                    this._waitingForInput = false;
                }
            }
        }

        if (input.isJustPressed('Space') || input.isJustPressed('Enter') || input.isJustPressed('KeyZ')) {
            if (this._charIndex < this._targetText.length) {
                this._currentText = this._targetText;
                this._charIndex = this._targetText.length;
            }
        }
    }

    isFinished() {
        return this._finished;
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

    render(renderer) {
        const boxX = 20;
        const boxY = 320;
        const boxWidth = 600;
        const boxHeight = 140;

        renderer.drawRect(boxX, boxY, boxWidth, boxHeight, 'rgba(0, 0, 0, 0.9)');
        renderer.drawRect(boxX + 2, boxY + 2, boxWidth - 4, boxHeight - 4, 'rgba(13, 71, 161, 0.95)');
        renderer.drawRect(boxX + 4, boxY + 4, boxWidth - 8, boxHeight - 8, 'rgba(26, 35, 126, 0.9)');

        const textX = boxX + 20;
        const textY = boxY + 20;
        const maxCharsPerLine = 52;

        const displayText = this._currentText;
        const lines = this._wrapText(displayText, maxCharsPerLine);

        lines.forEach((line, index) => {
            renderer.drawText(line, textX, textY + (index * this._lineHeight), {
                color: '#ffffff',
                font: '16px monospace'
            });
        });

        const progressText = `${this._currentLine + 1}/${this._lines.length}`;
        renderer.drawText(progressText, boxX + boxWidth - 50, boxY + boxHeight - 20, {
            color: '#aaaaaa',
            font: '12px monospace'
        });

        if (this._waitingForInput && this._charIndex >= this._targetText.length) {
            const blink = Math.floor(Date.now() / 500) % 2 === 0;
            if (blink) {
                const lastLineY = textY + (lines.length * this._lineHeight);
                renderer.drawText('▼ PRESSIONE ESPACO', boxX + boxWidth / 2, boxY + boxHeight - 22, {
                    color: '#ff6f00',
                    font: '12px monospace',
                    align: 'center'
                });
            }
        }
    }
}
