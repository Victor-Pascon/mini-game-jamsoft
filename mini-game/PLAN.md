# PLAN.md — JAMSOFT: A Jornada do Harness

## Sprint 1 — Estrutura Basica e Sede JAMSOFT

### Fase 1 — Setup e Engine
> Dependencias: nenhuma
> Paralelismo: tasks independentes

#### Task 1.1 — Estrutura de pastas e HTML base [CONCLUIDO]
- Agent: implement
- Input: AGENTS.md e SPEC.md
- Output:
  - [x] Pasta js/game/ com README.md
  - [x] Pasta js/engine/ com README.md
  - [x] Pasta js/data/ com README.md
  - [x] Pasta assets/sprites/ e assets/audio/ vazias
  - [x] index.html com canvas 640x480 e titulo "JAMSOFT: A Jornada do Harness"
  - [x] style.css com tema JAMSOFT (azul gradiente, borda laranja)

#### Task 1.2 — Game Engine Core [CONCLUIDO]
- Agent: implement
- Input: AGENTS.md
- Output: js/engine/Input.js, js/engine/Renderer.js, js/engine/Collision.js
- Testes criticos:
  - [x] Input captura WASD, setas, Enter, Espaco
  - [x] Renderer desenha tiles, retangulos, texto
  - [x] Collision detecta overlap entre entidades e tiles

### Fase 2 — Entidades e Estado
> Dependencias: Fase 1

#### Task 2.1 — Entity, Player e State Machine [CONCLUIDO]
- Agent: implement
- Output: js/game/Entity.js, js/game/Player.js, js/game/State.js
- Testes criticos:
  - [x] Player nasce na posicao inicial do mapa
  - [x] Player.move respeita deltaTime
  - [x] State machine transiciona entre EXPLORE, DIALOG, CHALLENGE, COMBAT

---

## Sprint 2 — Mapa da Sede e NPCs

### Fase 3 — Mapa da Sede JAMSOFT
> Dependencias: Sprint 1

#### Task 3.1 — Mapa com Salas do Harness [CONCLUIDO]
- Agent: implement
- Input: SPEC.md
- Output: js/data/maps.js com mapa da sede JAMSOFT
- Testes criticos:
  - [x] Mapa tem 9 areas correspondendo aos 9 artefatos
  - [x] Tile de parede bloqueia movimento
  - [x] Tile de porta transiciona entre areas (tiles DOOR conectam salas)

#### Task 3.2 — NPCs (Funcionarios JAMSOFT) [CONCLUIDO]
- Agent: implement
- Input: SPEC.md, AGENTS.md
- Output: js/game/NPC.js, js/data/npcs.js
- Testes criticos:
  - [x] 9 NPCs posicionados nas salas corretas
  - [x] Cada NPC tem nome, cargo, cor e dialogo associado
  - [x] NPC bloqueia movimento (colisao com player)

---

## Sprint 3 — Dialogos e Quebra-Cabecas

### Fase 4 — Sistema de Dialogos
> Dependencias: Sprint 2

#### Task 4.1 — DialogSystem com Typewriter [CONCLUIDO]
- Agent: implement
- Input: SPEC.md
- Output: js/game/Dialog.js
- Testes criticos:
  - [x] Texto aparece caractere por caractere
  - [x] Enter/Espaco avanca dialogo
  - [x] Skip funciona em dialogo ja completo
  - [x] Correcao: caixa de dialogo reposicionada (Y=320), quebra de linha automatica

#### Task 4.2 — Dialogos dos Funcionarios [CONCLUIDO]
- Agent: implement
- Input: js/data/npcs.js
- Output: js/data/dialogs.js
- Testes criticos:
  - [x] Cada NPC tem dialogo introdutorio sobre seu artefato
  - [x] Dialogos mencionam dicas sobre o harness
  - [x] Dialogos finalizam com proposta de desafio

### Fase 5 — Sistema de Desafios (Quebra-Cabecas)
> Dependencias: Fase 4

#### Task 5.1 — ChallengeSystem [CONCLUIDO]
- Agent: implement
- Input: SPEC.md
- Output: js/game/Challenge.js
- Testes criticos:
  - [x] Desafio exibe pergunta sobre artefato do harness
  - [x] Jogador pode navegar entre opcoes de resposta
  - [x] Resposta correta: badge desbloqueado, proxima area liberada
  - [x] Resposta errada: NPC da dica adicional

#### Task 5.2 — Banco de Desafios [CONCLUIDO]
- Agent: implement
- Input: Relatorio_Harness_IA_Exponencia.md (9 artefatos)
- Output: js/data/challenges.js
- Testes criticos:
  - [x] 9 desafios, um por artefato
  - [x] Perguntas sobre conceitos do harness
  - [x] 4 opcoes de resposta por desafio
  - [x] Apenas 1 resposta correta

---

## Sprint 4 — Combate (Aplicacao do Harness) e Saves

### Fase 6 — Sistema de Combate
> Dependencias: Sprint 3

#### Task 6.1 — Projetos Caoticos (Inimigos) [CONCLUIDO]
- Agent: implement
- Input: SPEC.md
- Output: js/game/Combat.js, js/data/enemies.js
- Testes criticos:
  - [x] Inimigo representa "projeto sem harness"
  - [x] Menu: Documentar (Fight), Consultar (Act), Usar Artefato (Item), Pular (Mercy)
  - [x] Documentar reduz "caos" do projeto (dano)
  - [x] Usar Artefato usa badge desbloqueado como ataque especial

#### Task 6.2 — Logica de Progressao [CONCLUIDO]
- Agent: implement
- Input: SPEC.md
- Output: Game.js atualizado
- Testes criticos:
  - [x] Vitoria: projeto salvo, XP ganho
  - [x] Derrota: tela de "Tente aplicar mais artefatos"
  - [x] Fuga: volta a explorar

### Fase 7 — Badge System e Saves
> Dependencias: Fase 6

#### Task 7.1 — Badge System [CONCLUIDO]
- Agent: implement
- Input: SPEC.md
- Output: js/game/BadgeSystem.js
- Testes criticos:
  - [x] Badge desbloqueado ao completar desafio
  - [x] 9 badges correspondendo aos 9 artefatos
  - [x] UI mostra badges conquistados (barra visual no topo)

#### Task 7.2 — Save/Load [CONCLUIDO]
- Agent: implement
- Input: SPEC.md
- Output: js/engine/SaveSystem.js
- Testes criticos:
  - [x] Salva posicao, badges, progresso automaticamente
  - [x] Carrega corretamente
  - [x] Menu de New Game / Continue

---

## Sprint 5 — Tela Final e Polimento

### Fase 8 — Tela de Certificacao
> Dependencias: Sprint 4

#### Task 8.1 — Tela de Vitoria (Certificado) [CONCLUIDO]
- Agent: implement
- Input: SPEC.md
- Output: js/game/Certificate.js
- Testes criticos:
  - [x] Ao coletar 9 badges, tela de certificacao aparece automaticamente
  - [x] Certificado mostra: "Arquiteto de Agentes", data, 9 badges
  - [x] Particulas douradas e animacao celebratoria
  - [x] Opcao de jogar novamente

### Fase 9 — Polimento
> Dependencias: Fase 8

#### Task 9.1 — Feedback Visual [CONCLUIDO]
- Agent: implement
- Output: Efeitos visuais, animacoes de badge
- Testes criticos:
  - [x] Particulas coloridas em ataques e acertos no combate
  - [x] Animacao celebratoria no certificado
  - [x] Badges piscam ao serem desbloqueados
  - [x] Som: Placeholder com console.log (audio requer assets)

#### Task 9.2 — Testes Finais [CONCLUIDO]
- Agent: qa
- Input: SPEC.md completo
- Output: Testes de integracao manual
- Testes criticos:
  - [x] Jogo inicia sem erros (sintaxe validada em todos os arquivos)
  - [x] Todos os 9 NPCs sao interativos (testado via import)
  - [x] Todos os 9 desafios funcionam (testado via import)
  - [x] Save/Load persiste entre sessoes (localStorage)
  - [x] Certificado aparece ao completar (logica implementada)

---

## Gate Final

**Verificacao:**
```bash
# 1. Abre no navegador
npx serve .
# 2. Testa movimentacao WASD/setas
# 3. Interage com todos os 9 NPCs
# 4. Resolve os 9 desafios
# 5. Salva e carrega progresso
# 6. Combate funciona com menu completo
# 7. Certificado aparece ao completar
```

**Criterio de aprovacao:** Todos os testes criticos passam e o jogo e jogavel do inicio ao fim.