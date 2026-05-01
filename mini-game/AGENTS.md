# AGENTS.md — Convenções do Projeto JAMSOFT: A Jornada do Harness

## Contexto

Este e um jogo educativo desenvolvido para a JAMSOFT SISTEMAS (www.jamsoft.com.br), empresa de desenvolvimento de software de Itabaiana-SE, com mais de 36 anos de mercado (fundada em 1989). O jogo ensina os 9 artefatos do Harness de IA atraves de uma experiencia interativa e ludica.

## Stack

- HTML5 Canvas
- JavaScript Vanilla (ES6+)
- CSS3 basico
- Sem frameworks ou libraries externos

## Estrutura de Pastas

```text
mini-game/
├── index.html          # Entry point
├── style.css          # Estilos basicos
├── js/
│   ├── game/
│   │   ├── Game.js   # Main game loop e gerenciamento de estado
│   │   ├── State.js  # State machine (explore/combat/dialog/challenge)
│   │   ├── Entity.js # Entidades base
│   │   ├── Player.js # Personagem do jogador (novo dev JAMSOFT)
│   │   ├── NPC.js    # Funcionarios da JAMSOFT
│   │   ├── Combat.js # Sistema de aplicacao do harness em projetos
│   │   ├── Dialog.js # Sistema de dialogos com typewriter
│   │   └── Challenge.js # Sistema de quebra-cabecas/desafios
│   ├── engine/
│   │   ├── Input.js  # Keyboard handling
│   │   ├── Renderer.js  # Canvas rendering
│   │   ├── Collision.js # Collision detection
│   │   └── Sound.js   # Audio basico
│   ├── data/
│   │   ├── maps.js   # Mapa da sede JAMSOFT
│   │   ├── npcs.js   # Dados dos funcionarios NPCs
│   │   ├── enemies.js # Projetos caoticos sem harness
│   │   ├── dialogs.js # Scripts de dialogos
│   │   └── challenges.js # Desafios/quebra-cabecas
│   └── main.js       # Entry point
├── assets/
│   ├── sprites/    # PNG pixel art (personagens, cenario)
│   └── audio/      # MP3/WAV (efeitos sonoros basicos)
├── SPEC.md
├── PLAN.md
└── HARNESS_CHECKLIST.md
```

## Convenções de Nomenclatura

- Arquivos: PascalCase (Game.js, Input.js)
- Funcoes: camelCase
- Constantes: UPPER_SNAKE_CASE
- Variaveis de instancia: _camelCase (com underscore)
- Classes: PascalCase
- Arquivos de teste: test_*.js

## Regras de Ouro

1. **Game Loop via requestAnimationFrame** — Nunca usar setInterval
2. **Delta time para movimento** — Frame-rate independente
3. **Canvas como unica renderizacao** — Sem DOM para sprites
4. **localStorage para saves** — JSON serialization (progresso do jogador)
5. **Assets carregados antes do jogo iniciar** — Pre-loader
6. **Resolution fixed** — 640x480 ou 800x600 (nao responsivo)

## Comandos de Setup

```bash
# Abrir no navegador
open index.html
# ou usar servidor local
npx serve .
```

## O que NUNCA fazer

- Nao usar frameworks (React, Phaser, etc.)
- Nao criar elementos DOM para sprites do jogo
- Nao hardcodar caminhos de assets
- Nao usar setTimeout para game loop
- Nao salvar senhas ou dados sensiveis
- Nao usar eval() ou Function()
- Nao expor informacoes reais de funcionarios ou clientes da JAMSOFT
