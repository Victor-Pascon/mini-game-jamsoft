# SPEC.md — JAMSOFT: A Jornada do Harness

## 1. Problema

Voce e o novo desenvolvedor(a) da JAMSOFT SISTEMAS, empresa de Itabaiana-SE com mais de 36 anos de historia (fundada em 1989). A empresa precisa implementar um Harness de IA para governar como os agentes de inteligencia artificial trabalham nos projetos de software.

Sua missao: aprender os 9 artefatos do Harness de IA e aplicar esse conhecimento para salvar projetos que estao em caos por falta de governanca. Cada artefato e uma ferramenta poderosa que transforma a IA de uma simples ferramenta de geracao de codigo em um parceiro estrategico de desenvolvimento.

## 2. Usuarios

- Jogadores: funcionarios e colaboradores da JAMSOFT que precisam aprender a criar e usar harness de IA
- Faixa: desenvolvedores de todos os niveis, da JR ao senior
- Objetivo: capacitar o time para usar IA com governanca, contexto e consistencia

## 3. Funcionalidades

### Exploracao pela Sede JAMSOFT
- Mapa top-down representando os departamentos da empresa
- Cada sala = uma fase do Harness de IA
- NPCs sao funcionarios seniores que dao dicas e contexto

### NPCs Instrutores (Funcionarios JAMSOFT)
- Cada NPC representa um artefato do harness
- Dialogos com dicas sobre: SPEC, AGENTS.md, PLAN, Skills, Rules, Hooks, RAG, MCP
- NPCs tem nomes e cargos reais dentro do contexto da empresa

### Sistema de Quebra-Cabeca (Desafios)
- Em cada sala, um desafio testa o conhecimento sobre o artefato
- Respostas corretas desbloqueiam a proxima area
- Respostas erradas geram dicas adicionais do NPC

### Projetos Caoticos (Combate)
- "Inimigos" sao projetos legados sem harness
- O combate simboliza a aplicacao do harness no projeto
- Acoes: Documentar (Fight), Consultar (Act), Usar Artefato (Item), Pular (Mercy)

### Progressao e Certificacao
- Cada artefato aprendido adiciona um badge ao perfil
- Ao completar os 9 artefatos, o jogador recebe o titulo de "Arquiteto de Agentes JAMSOFT"
- Tela final com certificado virtual

### Sistema de Saves
- Salva progresso de aprendizado (badges desbloqueados)
- Checkpoint em cada sala concluida
- LocalStorage para persistencia entre sessoes

## 4. Modulos

- game/ — logica principal, estado da jornada
- engine/ — render, input, collision, save
- data/ — mapas da sede, NPCs (funcionarios), desafios, dialogos
- assets/ — sprites pixel art da empresa e personagens

## 5. Stack

- JavaScript Vanilla (ES6+)
- HTML5 Canvas
- CSS3 para UI
- Sem frameworks externos
- localStorage para saves

## 6. Criterios de Aceitacao

- [ ] Jogador explora a sede JAMSOFT em 4 direcoes
- [ ] 9 NPCs distribuidos pelo mapa, cada um com dialogo sobre um artefato
- [ ] 9 desafios de quebra-cabeca (um por artefato) com validacao de resposta
- [ ] Sistema de combate turn-based representando aplicacao do harness em projetos
- [ ] Badge system mostrando progresso de aprendizado
- [ ] Tela de certificacao ao completar todos os artefatos
- [ ] Saves funcionam via localStorage
- [ ] Dialogos com efeito typewriter e skip

## 7. Fora do Escopo

- Multiplayer
- Complexidade de RPG tradicional (niveis, equipamentos, gold)
- Mecanicas de IA generativa no jogo (o jogo ENSINA sobre harness, nao usa IA para gerar conteudo)
- Videos ou animacoes complexas
- Integracao com sistemas reais da JAMSOFT
