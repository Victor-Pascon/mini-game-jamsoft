import { Renderer } from '../engine/Renderer.js';
import { Input } from '../engine/Input.js';
import { Collision } from '../engine/Collision.js';
import { STATE, StateManager } from './State.js';
import { Player } from './Player.js';
import { Enemy } from './Enemy.js';
import { NPC } from './NPC.js';
import { BadgeSystem } from './BadgeSystem.js';
import { maps, findEnemySpawn, getRoomAt } from '../data/maps.js';
import { enemies } from '../data/enemies.js';
import { npcs as npcData } from '../data/npcs.js';
import { challenges } from '../data/challenges.js';
import { DialogSystem } from './Dialog.js';
import { CombatSystem } from './Combat.js';
import { ChallengeSystem } from './Challenge.js';
import { SaveSystem } from '../engine/SaveSystem.js';
import { CertificateScreen } from './Certificate.js';

export class Game {
    constructor(canvas) {
        this._renderer = new Renderer(canvas);
        this._input = new Input();
        this._state = new StateManager();
        this._save = new SaveSystem();
        this._badgeSystem = new BadgeSystem();
        
        this._player = null;
        this._enemy = null;
        this._npcs = [];
        this._currentMap = maps.main;
        this._dialog = null;
        this._combat = null;
        this._challenge = null;
        this._activeNPC = null;
        this._completedChallenges = [];
        this._lastTime = 0;
        this._running = false;
        this._frameCount = 0;
        this._showMenu = true;
        this._menuSelection = 0;
        this._certificate = new CertificateScreen();
    }

    init(newGame = true) {
        if (newGame) {
            this._player = new Player({
                x: this._currentMap.playerStart.x,
                y: this._currentMap.playerStart.y
            });
            this._badgeSystem = new BadgeSystem();
            this._completedChallenges = [];
        }

        this._npcs = npcData.map(data => new NPC(data));

        this._dialog = new DialogSystem();
        this._combat = new CombatSystem(this._player);
        this._challenge = new ChallengeSystem();

        const spawns = findEnemySpawn(this._currentMap);
        if (spawns.length > 0) {
            this._enemy = new Enemy({
                x: spawns[0].x,
                y: spawns[0].y,
                ...enemies.legacy_project
            });
        }

        this._showIntro = true;
        this._introIndex = 0;
    }

    start() {
        this._showMenu = true;
        this._menuSelection = 0;
        this._running = true;
        this._lastTime = performance.now();
        requestAnimationFrame(this._loop.bind(this));
    }

    stop() {
        this._running = false;
    }

    _loop(currentTime) {
        if (!this._running) return;

        const deltaTime = Math.min((currentTime - this._lastTime) / 1000, 0.05);
        this._lastTime = currentTime;
        this._frameCount++;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this._loop.bind(this));
    }

    update(deltaTime) {
        if (this._showMenu) {
            this._updateMenu(deltaTime);
            return;
        }

        if (this._state.is(STATE.EXPLORE)) {
            this._updateExplore(deltaTime);
        } else if (this._state.is(STATE.COMBAT)) {
            this._updateCombat(deltaTime);
        } else if (this._state.is(STATE.DIALOG)) {
            this._updateDialog(deltaTime);
        } else if (this._state.is(STATE.CHALLENGE)) {
            this._updateChallenge(deltaTime);
        } else         if (this._state.is(STATE.GAME_OVER) || this._state.is(STATE.VICTORY)) {
            this._updateEndGame(deltaTime);
        } else if (this._state.is(STATE.CERTIFICATE)) {
            this._updateCertificate(deltaTime);
        }
    }

    _updateMenu(deltaTime) {
        if (this._input.isJustPressed('ArrowUp') || this._input.isJustPressed('ArrowDown')) {
            this._menuSelection = this._menuSelection === 0 ? 1 : 0;
        }
        if (this._input.isJustPressed('Space') || this._input.isJustPressed('Enter')) {
            if (this._menuSelection === 0) {
                this._showMenu = false;
                this.init(true);
            } else {
                const saved = this._save.loadGame();
                if (saved) {
                    this._showMenu = false;
                    this.init(true);
                    if (saved.player) {
                        this._player.loadFromData(saved.player);
                    }
                    if (saved.badges) {
                        saved.badges.forEach(b => this._badgeSystem.unlock(b));
                    }
                    if (saved.completedChallenges) {
                        this._completedChallenges = saved.completedChallenges;
                    }
                }
            }
        }
    }

    _updateExplore(deltaTime) {
        this._player.update(deltaTime, this._input);
        Collision.resolveMapCollision(this._player, this._currentMap);

        for (const npc of this._npcs) {
            if (Collision.checkEntityCollision(this._player, npc)) {
                const dx = this._player.x - npc.x;
                const dy = this._player.y - npc.y;
                const absDx = Math.abs(dx);
                const absDy = Math.abs(dy);
                
                if (absDx > absDy) {
                    if (dx > 0) {
                        this._player.x = npc.x + npc.width;
                    } else {
                        this._player.x = npc.x - this._player.width;
                    }
                } else {
                    if (dy > 0) {
                        this._player.y = npc.y + npc.height;
                    } else {
                        this._player.y = npc.y - this._player.height;
                    }
                }
            }
        }

        if (this._showIntro) {
            const introDialogs = [
                'Bem-vindo a JAMSOFT SISTEMAS!',
                'Fundada em 1989 em Itabaiana-SE por Jamisson Ferreira.',
                'Voce foi contratado para implementar o Harness de IA.',
                'Converse com nosso time: Thais, Carol, Dyego, Pascon, Menezes...',
                'Complete os 9 desafios para se tornar um Arquiteto de Agentes!',
                'Use WASD ou as setas para se mover.',
                'Aproxime-se dos funcionarios e pressione ESPACO para conversar.'
            ];
            
            if (this._input.isJustPressed('Space')) {
                this._introIndex++;
                if (this._introIndex >= introDialogs.length) {
                    this._showIntro = false;
                }
            }
        }

        for (const npc of this._npcs) {
            if (npc.canInteract(this._player)) {
                if (this._input.isJustPressed('Space') || this._input.isJustPressed('Enter')) {
                    const npcInfo = npcData.find(n => n.id === npc.npcId);
                    if (npcInfo && npcInfo.dialogIntro) {
                        this._dialog.startDialog(npcInfo.dialogIntro);
                    } else {
                        this._dialog.startDialog([
                            `${npc.name} (${npc.role}):`,
                            `Responsavel pelo artefato: ${npc.artifact}`
                        ]);
                    }
                    this._activeNPC = npc;
                    this._state.setState(STATE.DIALOG, { npc: npc });
                    break;
                }
            }
        }

        if (this._enemy && Collision.checkEntityCollision(this._player, this._enemy)) {
            this._state.setState(STATE.COMBAT, { enemy: this._enemy });
            this._combat.startCombat(this._enemy, this._badgeSystem.getAll());
        }
    }

    _updateDialog(deltaTime) {
        this._dialog.update(deltaTime, this._input);
        
        if (this._dialog.isFinished()) {
            const challengeData = challenges.find(c => c.npcId === this._activeNPC.npcId);
            
            if (challengeData && !this._badgeSystem.has(challengeData.artifact)) {
                this._challenge.startChallenge(challengeData);
                this._state.setState(STATE.CHALLENGE, { npc: this._activeNPC });
            } else {
                this._state.setState(STATE.EXPLORE);
                this._activeNPC = null;
            }
        }
    }

    _updateChallenge(deltaTime) {
        this._challenge.update(deltaTime, this._input);
        
        if (this._challenge.isCompleted()) {
            const artifact = this._challenge.getArtifact();
            if (artifact) {
                this._badgeSystem.unlock(artifact);
                this._completedChallenges.push(artifact);
                this._save.saveGame(this._player, this._badgeSystem.getAll(), this._completedChallenges);
            }
            
            if (this._badgeSystem.isComplete()) {
                this._certificate.start();
                this._state.setState(STATE.CERTIFICATE);
            } else {
                this._state.setState(STATE.EXPLORE);
            }
            this._activeNPC = null;
        }
    }

    _updateCertificate(deltaTime) {
        this._certificate.update(deltaTime, this._input);
        
        if (this._certificate.isFinished()) {
            location.reload();
        }
    }

    _updateCombat(deltaTime) {
        this._combat.update(deltaTime, this._input);

        if (this._combat.isVictory()) {
            this._state.setState(STATE.VICTORY);
        } else if (this._combat.isDefeat()) {
            this._state.setState(STATE.GAME_OVER);
        } else if (this._combat.isFlee()) {
            this._state.setState(STATE.EXPLORE);
        }
    }

    _updateEndGame(deltaTime) {
        if (this._input.isJustPressed('Space') || this._input.isJustPressed('Enter')) {
            location.reload();
        }
    }

    render() {
        this._renderer.clear('#1a1a2e');

        if (this._showMenu) {
            this._renderMenu();
            return;
        }

        if (this._state.is(STATE.EXPLORE) || this._state.is(STATE.DIALOG)) {
            this._renderer.drawMap(this._currentMap, this._currentMap.tileSize);
            
            if (this._enemy) {
                this._enemy.render(this._renderer);
            }

            for (const npc of this._npcs) {
                npc.render(this._renderer);
            }
            
            this._player.render(this._renderer);
        }

        if (this._state.is(STATE.COMBAT)) {
            this._combat.render(this._renderer);
        }

        if (this._state.is(STATE.CHALLENGE)) {
            this._challenge.render(this._renderer);
        }

        if (this._state.is(STATE.GAME_OVER)) {
            this._renderGameOver();
        } else if (this._state.is(STATE.VICTORY)) {
            this._renderVictory();
        } else if (this._state.is(STATE.CERTIFICATE)) {
            this._certificate.render(this._renderer, this._badgeSystem);
        }

        if (this._state.is(STATE.DIALOG)) {
            this._dialog.render(this._renderer);
        }

        if (this._showIntro && this._state.is(STATE.EXPLORE)) {
            this._renderIntro();
        }

        this._renderUI();

        // Efeitos visuais estilo SNES
        if (!this._state.is(STATE.COMBAT) && !this._state.is(STATE.CHALLENGE) && !this._state.is(STATE.CERTIFICATE)) {
            this._renderer.drawScanlines();
            this._renderer.drawVignette();
        }
    }

    _renderMenu() {
        this._renderer.drawRect(0, 0, 640, 480, '#0a0a1a');

        this._renderer.drawText('JAMSOFT', 320, 100, {
            color: '#ff6f00',
            font: '48px monospace',
            align: 'center'
        });
        this._renderer.drawText('A JORNADA DO HARNESS', 320, 150, {
            color: '#1565c0',
            font: '20px monospace',
            align: 'center'
        });
        this._renderer.drawText('Aprenda os 9 artefatos do Harness de IA', 320, 190, {
            color: '#aaaaaa',
            font: '14px monospace',
            align: 'center'
        });

        const hasSave = this._save.hasSave();
        const options = ['NOVO JOGO', 'CONTINUAR'];

        options.forEach((option, index) => {
            const y = 280 + index * 60;
            const isSelected = index === this._menuSelection;
            const enabled = index === 0 || hasSave;

            if (isSelected) {
                this._renderer.drawRect(220, y - 10, 200, 45, '#ff6f00');
            }

            const color = !enabled ? '#555555' : (isSelected ? '#000000' : '#ffffff');
            this._renderer.drawText(option, 320, y + 5, {
                color: color,
                font: '18px monospace',
                align: 'center'
            });

            if (index === 1 && !enabled) {
                this._renderer.drawText('(Nenhum save encontrado)', 320, y + 28, {
                    color: '#555555',
                    font: '10px monospace',
                    align: 'center'
                });
            }
        });

        this._renderer.drawText('Use ↑↓ e ESPACO para selecionar', 320, 420, {
            color: '#666666',
            font: '12px monospace',
            align: 'center'
        });

        this._renderer.drawText('JAMSOFT SISTEMAS - Itabaiana-SE - Fundada em 1989', 320, 450, {
            color: '#444444',
            font: '10px monospace',
            align: 'center'
        });
    }

    _renderUI() {
        const hpText = `HP: ${this._player.hp}/${this._player.maxHp}`;
        this._renderer.drawText(hpText, 10, 10, { color: '#ffffff', font: '14px monospace' });

        const room = getRoomAt(this._currentMap, this._player.x, this._player.y);
        if (room) {
            this._renderer.drawText(room.name, 320, 10, { 
                color: '#ff6f00', 
                font: '12px monospace',
                align: 'center'
            });
        }

        this._badgeSystem.renderBadgeBar(this._renderer, 200, 8);

        let nearbyNPC = null;
        for (const npc of this._npcs) {
            if (npc.canInteract(this._player)) {
                nearbyNPC = npc;
                break;
            }
        }

        if (nearbyNPC) {
            this._renderer.drawText(`ESPACO para falar com ${nearbyNPC.name}`, 320, 460, { 
                color: '#ff6f00', 
                font: '12px monospace',
                align: 'center'
            });
        }
    }

    _renderIntro() {
        const introDialogs = [
            'Bem-vindo a JAMSOFT SISTEMAS!',
            'Fundada em 1989 em Itabaiana-SE por Jamisson Ferreira.',
            'Voce foi contratado para implementar o Harness de IA.',
            'Converse com nosso time: Thais, Carol, Dyego, Pascon, Menezes...',
            'Complete os 9 desafios para se tornar um Arquiteto de Agentes!',
            'Use WASD ou as setas para se mover.',
            'Aproxime-se dos funcionarios e pressione ESPACO para conversar.'
        ];
        
        if (this._introIndex < introDialogs.length) {
            this._renderer.drawRect(40, 320, 560, 120, 'rgba(0, 0, 0, 0.9)');
            this._renderer.drawRect(42, 322, 556, 116, 'rgba(13, 71, 161, 0.95)');
            this._renderer.drawRect(44, 324, 552, 112, 'rgba(26, 35, 126, 0.9)');
            this._renderer.drawText(introDialogs[this._introIndex], 60, 340, { 
                color: '#ffffff', 
                font: '16px monospace' 
            });
        }
    }

    _renderGameOver() {
        this._renderer.drawRect(0, 0, 640, 480, 'rgba(0, 0, 0, 0.8)');
        this._renderer.drawText('GAME OVER', 320, 180, { 
            color: '#ff0000', 
            font: '48px monospace', 
            align: 'center' 
        });
        this._renderer.drawText('O projeto sem harness venceu desta vez...', 320, 240, { 
            color: '#ffffff', 
            font: '14px monospace', 
            align: 'center' 
        });
        this._renderer.drawText('Estude mais os artefatos e tente novamente!', 320, 270, { 
            color: '#ff6f00', 
            font: '14px monospace', 
            align: 'center' 
        });
        this._renderer.drawText('Pressione ESPACO para reiniciar', 320, 320, { 
            color: '#aaaaaa', 
            font: '12px monospace', 
            align: 'center' 
        });
    }

    _renderVictory() {
        this._renderer.drawRect(0, 0, 640, 480, 'rgba(0, 0, 0, 0.8)');
        this._renderer.drawText('VITORIA!', 320, 180, { 
            color: '#00ff00', 
            font: '48px monospace', 
            align: 'center' 
        });
        this._renderer.drawText('Voce aplicou o Harness com sucesso!', 320, 240, { 
            color: '#ffffff', 
            font: '16px monospace', 
            align: 'center' 
        });
        this._renderer.drawText('Projeto salvo pela governanca de IA!', 320, 270, { 
            color: '#ff6f00', 
            font: '14px monospace', 
            align: 'center' 
        });
        this._renderer.drawText('Pressione ESPACO para jogar novamente', 320, 320, { 
            color: '#aaaaaa', 
            font: '12px monospace', 
            align: 'center' 
        });
    }
}
