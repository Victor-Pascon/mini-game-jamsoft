export const enemies = {
    legacy_project: {
        name: 'Projeto Legado-2005',
        hp: 15,
        maxHp: 15,
        attack: 2,
        defense: 0,
        xpReward: 10,
        color: '#8B4513',
        description: 'Um projeto antigo sem documentacao, sem testes e sem contexto para a IA.',
        dialog: 'enemy_legacy'
    },
    no_docs: {
        name: 'Sistema Sem-Docs',
        hp: 12,
        maxHp: 12,
        attack: 3,
        defense: 1,
        xpReward: 8,
        color: '#4a148c',
        description: 'Codigo espaguete sem nenhuma especificacao. A IA nao sabe por onde comecar.',
        dialog: 'enemy_nodocs'
    },
    chaos_monolith: {
        name: 'Monolito do Caos',
        hp: 20,
        maxHp: 20,
        attack: 4,
        defense: 2,
        xpReward: 15,
        color: '#b71c1c',
        description: 'Um projeto gigantesco sem divisao de responsabilidades. Tudo depende de tudo.',
        dialog: 'enemy_chaos'
    }
};

export const enemyDialogs = {
    enemy_legacy: [
        'Um projeto de 2005 apareceu!',
        'Ninguem sabe o que ele faz ou como funciona...',
        'Sem SPEC, sem AGENTS.md, sem PLAN!',
        'Voce precisa aplicar o Harness para salva-lo!'
    ],
    enemy_nodocs: [
        'Um sistema sem documentacao bloqueia o caminho!',
        'A IA esta gerando codigo sem entender o contexto...',
        'Aplicar os artefatos do Harness e a unica saida!'
    ],
    enemy_chaos: [
        'O Monolito do Caos emerge!',
        'Este projeto nao tem separacao de responsabilidades.',
        'Tudo esta misturado: frontend, backend, infra...',
        'Somente um Arquiteto de Agentes pode derrota-lo!'
    ]
};
