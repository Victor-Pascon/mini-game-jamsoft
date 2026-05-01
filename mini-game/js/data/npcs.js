export const npcs = [
    {
        id: 'npc_spec',
        name: 'Jamisson Ferreira',
        role: 'CEO & Fundador',
        color: '#ff6f00',
        x: 2 * 32,
        y: 2 * 32,
        artifact: 'SPEC.md',
        avatar: 'JF',
        dialogIntro: [
            'Bem-vindo a JAMSOFT! Eu sou Jamisson Ferreira, fundador da empresa.',
            'Desde 1989 em Itabaiana-SE, aprendemos que clareza e o primeiro passo.',
            'O SPEC.md define O QUE vamos construir: problema, usuarios, stack.',
            'Sem especificacao, a IA e como um engenheiro cego... gera codigo sem contexto!',
            'Vamos testar seu conhecimento sobre o SPEC.md?'
        ],
        dialogHint: [
            'Dica: O SPEC.md e a fonte da verdade do projeto.',
            'Ele responde: O que construir? Quem usa? Com o que?'
        ]
    },
    {
        id: 'npc_agents',
        name: 'Thais Jussa',
        role: 'Gerente Geral',
        color: '#1565c0',
        x: 17 * 32,
        y: 2 * 32,
        artifact: 'AGENTS.md',
        avatar: 'TJ',
        dialogIntro: [
            'Ola! Sou Thais Jussa, Gerente Geral da JAMSOFT.',
            'O AGENTS.md e o manual de operacao da IA no projeto.',
            'Ele diz COMO trabalhar: stack, convencoes, regras de ouro.',
            'E como um onboarding que todo agente recebe antes de comecar.',
            'Quer ver se entendeu direitinho?'
        ],
        dialogHint: [
            'Dica: AGENTS.md = como trabalhar neste projeto.',
            'Stack, nomenclatura, regras de ouro, comandos de setup.'
        ]
    },
    {
        id: 'npc_plan',
        name: 'Carol Maximo',
        role: 'Gerente de Desenvolvimento',
        color: '#2e7d32',
        x: 9 * 32,
        y: 2 * 32,
        artifact: 'PLAN.md',
        avatar: 'CM',
        dialogIntro: [
            'Oi! Sou Carol Maximo, Gerente de Desenvolvimento e Automacao.',
            'Aqui na JAMSOFT sempre planejamos antes de executar!',
            'O PLAN.md define EM QUE ORDEM construir: sprints, fases, tasks, gates.',
            'Separar planejamento de execucao evita que a IA saia fazendo tudo errado.',
            'Vamos ver se voce domina o planejamento?'
        ],
        dialogHint: [
            'Dica: PLAN.md = em que ordem construir.',
            'Sprints, fases, tasks atomicas, gates verificaveis.'
        ]
    },
    {
        id: 'npc_agents_sub',
        name: 'Dyego',
        role: 'Gerente de Itabaiana',
        color: '#6a1b9a',
        x: 2 * 32,
        y: 8 * 32,
        artifact: 'Agents',
        avatar: 'DY',
        dialogIntro: [
            'Fala, dev! Sou Dyego, Gerente da unidade de Itabaiana.',
            'Os Agents sao os especialistas que executam as tasks do PLAN.md.',
            'Um agent para backend, outro para frontend, outro para revisao...',
            'Cada um com suas tools, restricoes e privilegios.',
            'Menor privilegio por agente: so o que ele precisa!',
            'Pronto para entender os agents?'
        ],
        dialogHint: [
            'Dica: Agents = quem executa o que.',
            'Sub-agents especializados com escopo, tools e prompts proprios.'
        ]
    },
    {
        id: 'npc_skills',
        name: 'Pascon',
        role: 'Time de Inovacao',
        color: '#c62828',
        x: 17 * 32,
        y: 8 * 32,
        artifact: 'Skills',
        avatar: 'PS',
        dialogIntro: [
            'E ai! Sou Pascon, do Time de Inovacao da JAMSOFT.',
            'Skills sao workflows especializados que os agents carregam.',
            'Por exemplo: uma skill para criar endpoints API, outra para TDD...',
            'Em vez de repetir instrucoes toda vez, o agent carrega a skill!',
            'Isso elimina repeticao e padroniza o trabalho.',
            'Vamos testar seu conhecimento sobre skills?'
        ],
        dialogHint: [
            'Dica: Skills = o que cada agent sabe fazer alem do basico.',
            'Workflows especializados carregados sob demanda.'
        ]
    },
    {
        id: 'npc_rules',
        name: 'Menezes',
        role: 'Time de Inovacao',
        color: '#00695c',
        x: 2 * 32,
        y: 13 * 32,
        artifact: 'Rules',
        avatar: 'MN',
        dialogIntro: [
            'Oi! Sou Menezes, tambem do Time de Inovacao.',
            'As Rules sao regras escopadas por path do projeto.',
            'Exemplo: tudo em backend/app/api/ deve seguir convencoes de API.',
            'E diferente de Hooks: Rules orientam, Hooks garantem!',
            'Se precisa ser garantido, usa Hook. Se e orientacao, usa Rule.',
            'Quer testar suas regras?'
        ],
        dialogHint: [
            'Dica: Rules = como se comportar em contextos especificos.',
            'Regras escopadas por path. Orientacao contextual, nao enforcement.'
        ]
    },
    {
        id: 'npc_hooks',
        name: 'Ferreira',
        role: 'Diretor Comercial',
        color: '#37474f',
        x: 9 * 32,
        y: 13 * 32,
        artifact: 'Hooks',
        avatar: 'FR',
        dialogIntro: [
            'Sou Ferreira, Diretor Comercial da JAMSOFT!',
            'Hooks sao guardrails que disparam automaticamente.',
            'PreToolUse: valida antes de usar uma tool.',
            'PostToolUse: roda testes depois de editar codigo.',
            'Stop: verificacao final quando o agent termina.',
            'E enforcement deterministico: o agent nao tem escolha!',
            'Vamos ver se voce entendeu os hooks?'
        ],
        dialogHint: [
            'Dica: Hooks = o que deve acontecer sempre, independente do agent.',
            'PreToolUse, PostToolUse, Stop. Enforcement deterministico.'
        ]
    },
    {
        id: 'npc_rag',
        name: 'Jussa',
        role: 'Coordenadora de QA',
        color: '#ad1457',
        x: 17 * 32,
        y: 13 * 32,
        artifact: 'RAG',
        avatar: 'JS',
        dialogIntro: [
            'Oi! Sou Jussa, Coordenadora de QA na JAMSOFT.',
            'RAG e a memoria persistente do projeto!',
            'Armazena: bugs resolvidos, decisoes arquiteturais, padroes adotados...',
            'A IA da sessao de hoje aprende com o que aconteceu ontem.',
            'Banco vetorial + embeddings locais = contexto rico sem repeticao.',
            'Vamos testar se voce entendeu a memoria?'
        ],
        dialogHint: [
            'Dica: RAG = o que foi aprendido nas sessoes anteriores.',
            'Memoria persistente de bugs, decisoes e padroes. Banco vetorial.'
        ]
    },
    {
        id: 'npc_mcp',
        name: 'Maximo',
        role: 'Arquiteto de Software',
        color: '#ef6c00',
        x: 9 * 32,
        y: 7 * 32,
        artifact: 'MCP',
        avatar: 'MX',
        dialogIntro: [
            'Sou Maximo, Arquiteto de Software na JAMSOFT!',
            'MCP define quais ferramentas externas a IA pode acessar.',
            'Banco de dados, browser, APIs, servicos externos...',
            'Sem MCP, a IA e isolada. Com MCP, ela se conecta ao mundo!',
            'Mas atencao: cada agent so acessa o que precisa (menor privilegio).',
            'Pronto para o desafio das conexoes?'
        ],
        dialogHint: [
            'Dica: MCP = quais ferramentas externas o agent acessa.',
            'Banco, browser, APIs, servicos. Protocolo de conexao.'
        ]
    }
];
