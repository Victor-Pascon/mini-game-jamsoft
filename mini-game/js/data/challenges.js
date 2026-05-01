export const challenges = [
    {
        id: 'challenge_spec',
        artifact: 'SPEC.md',
        npcId: 'npc_spec',
        question: 'Qual artefato do Harness responde a pergunta: O QUE construir?',
        options: [
            'AGENTS.md',
            'SPEC.md',
            'PLAN.md',
            'Hooks'
        ],
        correct: 1,
        hint: 'Dica: Ele define problema, usuarios, funcionalidades, stack e criterios de aceitacao. E a fonte da verdade do projeto!'
    },
    {
        id: 'challenge_agents',
        artifact: 'AGENTS.md',
        npcId: 'npc_agents',
        question: 'Qual artefato documenta COMO trabalhar no projeto: stack, convencoes e regras de ouro?',
        options: [
            'Rules',
            'PLAN.md',
            'AGENTS.md',
            'Skills'
        ],
        correct: 2,
        hint: 'Dica: E o onboarding que todo agente recebe. Documenta stack, nomenclatura, estrutura de pastas e o que NUNCA fazer.'
    },
    {
        id: 'challenge_plan',
        artifact: 'PLAN.md',
        npcId: 'npc_plan',
        question: 'Qual artefato define EM QUE ORDEM construir, com sprints, fases, tasks e gates?',
        options: [
            'SPEC.md',
            'PLAN.md',
            'Hooks',
            'RAG'
        ],
        correct: 1,
        hint: 'Dica: Separa planejamento de execucao. Cada task tem Input, Output e Testes criticos definidos antes do codigo.'
    },
    {
        id: 'challenge_agents_sub',
        artifact: 'Agents',
        npcId: 'npc_agents_sub',
        question: 'Qual artefato define os sub-agents especializados com escopo, tools e prompts proprios?',
        options: [
            'Skills',
            'MCP',
            'Agents',
            'Rules'
        ],
        correct: 2,
        hint: 'Dica: E quem executa o que. Cada agent so tem acesso ao minimo de tools necessario (menor privilegio).'
    },
    {
        id: 'challenge_skills',
        artifact: 'Skills',
        npcId: 'npc_skills',
        question: 'Qual artefato encapsula workflows especializados que eliminam repeticao de instrucoes?',
        options: [
            'Skills',
            'Hooks',
            'RAG',
            'MCP'
        ],
        correct: 0,
        hint: 'Dica: E o que cada agent sabe fazer alem do basico. Carregadas sob demanda, uma por classe de tarefa.'
    },
    {
        id: 'challenge_rules',
        artifact: 'Rules',
        npcId: 'npc_rules',
        question: 'Qual artefato cria regras escopadas por path para guiar o comportamento do agent?',
        options: [
            'Hooks',
            'Rules',
            'Agents',
            'PLAN.md'
        ],
        correct: 1,
        hint: 'Dica: Orientacao contextual. Diferente de Hooks: Rules orientam, Hooks garantem (enforcement deterministico).'
    },
    {
        id: 'challenge_hooks',
        artifact: 'Hooks',
        npcId: 'npc_hooks',
        question: 'Qual artefato garante enforcement deterministico, independente do que o agent decidiu?',
        options: [
            'Rules',
            'RAG',
            'Hooks',
            'Skills'
        ],
        correct: 2,
        hint: 'Dica: Dispara automaticamente: PreToolUse (antes), PostToolUse (depois), Stop (final). O agent nao tem escolha!'
    },
    {
        id: 'challenge_rag',
        artifact: 'RAG',
        npcId: 'npc_rag',
        question: 'Qual artefato armazena memoria persistente de bugs, decisoes e padroes aprendidos?',
        options: [
            'MCP',
            'RAG',
            'Agents',
            'PLAN.md'
        ],
        correct: 1,
        hint: 'Dica: Retrieval-Augmented Generation. Banco vetorial + embeddings. O aprendizado da sessao N fica disponivel na N+1.'
    },
    {
        id: 'challenge_mcp',
        artifact: 'MCP',
        npcId: 'npc_mcp',
        question: 'Qual artefato define quais ferramentas externas (banco, browser, APIs) o agent acessa?',
        options: [
            'Hooks',
            'MCP',
            'Skills',
            'Rules'
        ],
        correct: 1,
        hint: 'Dica: Model Context Protocol. Define as conexoes externas. Sem ele, a IA e isolada. Com ele, ela se conecta ao mundo.'
    }
];
