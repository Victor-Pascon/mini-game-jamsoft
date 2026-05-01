export class SaveSystem {
    constructor() {
        this._key = 'jamsoft_harness_game_save';
    }

    save(data) {
        try {
            const saveData = {
                timestamp: Date.now(),
                version: '1.0',
                ...data
            };
            localStorage.setItem(this._key, JSON.stringify(saveData));
            return true;
        } catch (e) {
            console.error('Erro ao salvar:', e);
            return false;
        }
    }

    load() {
        try {
            const data = localStorage.getItem(this._key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Erro ao carregar:', e);
            return null;
        }
    }

    hasSave() {
        return localStorage.getItem(this._key) !== null;
    }

    delete() {
        localStorage.removeItem(this._key);
    }

    saveGame(player, badges, completedChallenges = []) {
        return this.save({
            player: {
                x: player.x,
                y: player.y,
                hp: player.hp,
                maxHp: player.maxHp
            },
            badges: Array.from(badges),
            completedChallenges: completedChallenges,
            saveDate: new Date().toLocaleString('pt-BR')
        });
    }

    loadGame() {
        const data = this.load();
        if (!data) return null;
        return {
            player: data.player || null,
            badges: data.badges || [],
            completedChallenges: data.completedChallenges || [],
            saveDate: data.saveDate || null
        };
    }

    exportSave() {
        const data = this.load();
        return data ? btoa(JSON.stringify(data)) : null;
    }

    importSave(base64Data) {
        try {
            const data = JSON.parse(atob(base64Data));
            this.save(data);
            return true;
        } catch (e) {
            console.error('Erro ao importar save:', e);
            return false;
        }
    }
}
