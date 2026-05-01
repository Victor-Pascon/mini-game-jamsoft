# CHECKLIST — Harness de IA para JAMSOFT: A Jornada do Harness

## Fase 0: Preparacao do Ambiente
- [x] Repositorio criado (pasta mini-game/)
- [x] .opencodeignore configurado (.env, node_modules, *.log protegidos)

## Fase 1: Especificacao
- [x] SPEC.md criado com:
  - [x] Problema definido (novo dev JAMSOFT aprendendo harness)
  - [x] Usuarios identificados (funcionarios JAMSOFT)
  - [x] Funcionalidades com exemplos concretos (exploracao, NPCs, desafios, combate, badges, certificado)
  - [x] Modulos descritos
  - [x] Stack definida
  - [x] Criterios de aceitacao verificaveis
  - [x] Fora do escopo delimitado

## Fase 2: Convencoes
- [x] AGENTS.md criado com:
  - [x] Stack especifica
  - [x] Convenoes de nomenclatura
  - [x] Regras de ouro (game loop, deltaTime, canvas, localStorage, pre-loader, resolucao fixa)
  - [x] Estrutura de pastas
  - [x] Comandos de setup
  - [x] O que NUNCA fazer

## Fase 3: Plano de Execucao
- [x] PLAN.md criado com:
  - [x] Sprints definidas (5 sprints)
  - [x] Fases com dependencias
  - [x] Tasks atomicas com Input/Output/Testes
  - [x] Gates verificaveis

## Fase 4: Scaffold
- [x] Estrutura de pastas criada
- [x] index.html com canvas 640x480 e titulo JAMSOFT
- [x] style.css basico
- [x] js/main.js entry point
- [x] Engine basico (Input.js, Renderer.js, Collision.js, SaveSystem.js)
- [x] Game basico (Game.js, State.js, Entity.js, Player.js, Enemy.js)
- [x] Data basico (maps.js com salas JAMSOFT, npcs.js, dialogs.js, challenges.js, enemies.js)
- [x] Dialog.js e Combat.js estruturados
- [x] Servidor levanta e retorna 200

## Fase 5: Agents Especializados
- [x] .opencode/agents/game-dev-agent.md criado
  - [x] Papel definido
  - [x] Responsabilidades claras
  - [x] Restricoes especificas
  - [x] Stack e convencoes

## Fase 6: Skills
- [x] .opencode/skills/tdd-game-dev/SKILL.md criado
  - [x] Quando usar / Quando NAO usar
  - [x] Passo a passo
  - [x] Exemplos de input/output

## Fase 7: Rules
- [x] .opencode/rules/game-conventions.md criado
  - [x] Regras de entidades
  - [x] Regras de game loop
  - [x] Regras de renderizacao
  - [x] Regras de estado
  - [x] Regras de colisao
  - [x] Regras de input
- [x] .opencode/rules/security.md criado
  - [x] Protecao de dados
  - [x] Comandos proibidos
  - [x] Codigo seguro
  - [x] Assets

## Fases 8-12: Hooks, RAG, Slash Commands
- [ ] Hooks configurados (PreToolUse, PostToolUse, Stop)
- [ ] RAG configurado (SQLite + embeddings)
- [ ] Slash commands criados (/review, /implementar, /entrega)

## Conteudo Educativo JAMSOFT
- [x] 9 NPCs criados (funcionarios ficticios da JAMSOFT)
  - [x] Ana Especificacao - SPEC.md
  - [x] Carlos Convencao - AGENTS.md
  - [x] Paula Planejamento - PLAN.md
  - [x] Alice Orquestracao - Agents
  - [x] Sergio Skills - Skills
  - [x] Roberto Regras - Rules
  - [x] Henrique Hooks - Hooks
  - [x] Rita Memoria - RAG
  - [x] Mario Conexoes - MCP
- [x] 9 Dialogos educativos (um por NPC)
- [x] 9 Desafios/quebra-cabecas (um por artefato)
- [x] 3 Projetos caoticos como inimigos
- [x] Mapa da sede JAMSOFT com 9 salas coloridas

## Status
**Harness Basico: COMPLETO** (Fases 0-7)
**Conteudo Educativo: COMPLETO** (NPCs, Dialogos, Desafios)
**Harness Avancado: PENDENTE** (Fases 8-12 - opcional)

## Proximos Passos Recomendados
1. Testar o jogo no navegador (npx serve .)
2. Implementar Sprint 1 conforme PLAN.md (engine e player)
3. Implementar Sprint 2 (mapa e NPCs interativos)
4. Implementar Sprint 3 (dialogos e desafios funcionais)
5. Implementar Sprint 4 (combate e badge system)
6. Implementar Sprint 5 (certificado e polimento)

## Verificacao do Scaffold

**Resultado: 200 OK**

## Contexto da Empresa
**JAMSOFT SISTEMAS**
- Local: Itabaiana-SE, Brasil
- Fundacao: 1989 (36+ anos de mercado)
- Site: www.jamsoft.com.br
- Unidades: Itabaiana (matriz), Aracaju, N. Sra. da Gloria, Lagarto
- Solucoes: JAMFLUXO, JAMSAC WEB, SGE SMART
- Valores: Comprometimento, Inovacao, Transparencia, Foco no Cliente
