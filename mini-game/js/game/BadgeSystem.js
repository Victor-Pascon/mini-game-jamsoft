export class BadgeSystem {
    constructor() {
        this._badges = new Set();
        this._badgeColors = {
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
    }

    unlock(artifact) {
        this._badges.add(artifact);
        return true;
    }

    has(artifact) {
        return this._badges.has(artifact);
    }

    getAll() {
        return Array.from(this._badges);
    }

    getCount() {
        return this._badges.size;
    }

    isComplete() {
        return this._badges.size >= 9;
    }

    getColor(artifact) {
        return this._badgeColors[artifact] || '#ffffff';
    }

    getUnlockedColors() {
        return this.getAll().map(b => this.getColor(b));
    }

    loadFromArray(badgesArray) {
        this._badges = new Set(badgesArray);
    }

    toArray() {
        return this.getAll();
    }

    renderBadgeBar(renderer, x, y) {
        const badgeSize = 20;
        const gap = 4;
        const allArtifacts = Object.keys(this._badgeColors);
        
        allArtifacts.forEach((artifact, index) => {
            const bx = x + index * (badgeSize + gap);
            const isUnlocked = this.has(artifact);
            
            renderer.drawRect(bx, y, badgeSize, badgeSize, isUnlocked ? this.getColor(artifact) : '#333333');
            renderer.drawRect(bx + 2, y + 2, badgeSize - 4, badgeSize - 4, isUnlocked ? '#ffffff' : '#444444');
            renderer.drawRect(bx + 4, y + 4, badgeSize - 8, badgeSize - 8, isUnlocked ? this.getColor(artifact) : '#333333');
            
            if (isUnlocked) {
                renderer.drawText('✓', bx + badgeSize/2, y + badgeSize/2 - 2, {
                    color: '#ffffff',
                    font: '10px monospace',
                    align: 'center'
                });
            }
        });
    }
}
