export const TILE_TYPES = {
    FLOOR: 0,
    WALL: 1,
    GRASS: 2,
    ENEMY_SPAWN: 3,
    SPEC_ROOM: 4,
    AGENTS_ROOM: 5,
    PLAN_ROOM: 6,
    AGENTS_SUB_ROOM: 7,
    SKILLS_ROOM: 8,
    RULES_ROOM: 9,
    HOOKS_ROOM: 10,
    RAG_ROOM: 11,
    MCP_ROOM: 12,
    PORTAL: 13,
    DOOR: 14,
    HALL: 15
};

export const maps = {
    main: {
        width: 20,
        height: 15,
        tileSize: 32,
        collisionTiles: [TILE_TYPES.WALL],
        tileTypes: {
            [TILE_TYPES.FLOOR]: { color: '#1a237e' },
            [TILE_TYPES.WALL]: { color: '#0d47a1' },
            [TILE_TYPES.GRASS]: { color: '#2e7d32' },
            [TILE_TYPES.ENEMY_SPAWN]: { color: '#b71c1c' },
            [TILE_TYPES.SPEC_ROOM]: { color: '#ff6f00' },
            [TILE_TYPES.AGENTS_ROOM]: { color: '#1565c0' },
            [TILE_TYPES.PLAN_ROOM]: { color: '#2e7d32' },
            [TILE_TYPES.AGENTS_SUB_ROOM]: { color: '#6a1b9a' },
            [TILE_TYPES.SKILLS_ROOM]: { color: '#c62828' },
            [TILE_TYPES.RULES_ROOM]: { color: '#00695c' },
            [TILE_TYPES.HOOKS_ROOM]: { color: '#37474f' },
            [TILE_TYPES.RAG_ROOM]: { color: '#ad1457' },
            [TILE_TYPES.MCP_ROOM]: { color: '#ef6c00' },
            [TILE_TYPES.PORTAL]: { color: '#ffd700' },
            [TILE_TYPES.DOOR]: { color: '#8d6e63' },
            [TILE_TYPES.HALL]: { color: '#263238' }
        },
        tiles: [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,4,4,14,15,15,15,14,6,6,6,14,15,15,15,14,5,5,5,1,
            1,4,4,15,15,15,15,15,6,6,6,15,15,15,15,15,5,5,5,1,
            1,14,15,15,15,1,15,15,15,14,15,15,15,1,15,15,15,14,14,1,
            1,15,15,15,15,1,15,15,15,15,15,15,15,1,15,15,15,15,15,1,
            1,15,15,15,15,1,15,15,15,13,15,15,15,1,15,15,15,15,15,1,
            1,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14,1,
            1,7,7,14,15,15,15,15,15,3,15,15,15,15,15,15,14,8,8,1,
            1,7,7,15,15,15,15,15,15,15,15,15,15,15,15,15,15,8,8,1,
            1,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14,1,
            1,15,15,15,15,1,15,15,15,15,15,15,15,1,15,15,15,15,15,1,
            1,15,15,15,15,1,15,15,15,14,15,15,15,1,15,15,15,15,15,1,
            1,9,9,14,15,15,15,14,10,10,10,14,15,15,15,14,11,11,11,1,
            1,9,9,15,15,15,15,15,10,10,10,15,15,15,15,15,11,11,11,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ],
        playerStart: { x: 9 * 32, y: 12 * 32 },
        rooms: {
            spec: { x: 1, y: 1, width: 2, height: 2, name: 'Sala do SPEC', artifact: 'SPEC.md' },
            agents: { x: 16, y: 1, width: 3, height: 2, name: 'Sala do AGENTS', artifact: 'AGENTS.md' },
            plan: { x: 8, y: 1, width: 3, height: 2, name: 'Sala do PLAN', artifact: 'PLAN.md' },
            agents_sub: { x: 1, y: 7, width: 2, height: 2, name: 'Sala dos Agents', artifact: 'Agents' },
            skills: { x: 17, y: 7, width: 2, height: 2, name: 'Sala das Skills', artifact: 'Skills' },
            rules: { x: 1, y: 12, width: 2, height: 2, name: 'Sala das Rules', artifact: 'Rules' },
            hooks: { x: 8, y: 12, width: 3, height: 2, name: 'Sala dos Hooks', artifact: 'Hooks' },
            rag: { x: 16, y: 12, width: 3, height: 2, name: 'Sala do RAG', artifact: 'RAG' }
        }
    }
};

export function findEnemySpawn(map) {
    const spawns = [];
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const idx = map.tiles[y * map.width + x];
            if (idx === TILE_TYPES.ENEMY_SPAWN) {
                spawns.push({ x: x * map.tileSize, y: y * map.tileSize });
            }
        }
    }
    return spawns;
}

export function findPortal(map) {
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const idx = map.tiles[y * map.width + x];
            if (idx === TILE_TYPES.PORTAL) {
                return { x: x * map.tileSize, y: y * map.tileSize };
            }
        }
    }
    return null;
}

export function getTileAt(map, x, y) {
    const tileX = Math.floor(x / map.tileSize);
    const tileY = Math.floor(y / map.tileSize);
    if (tileX < 0 || tileX >= map.width || tileY < 0 || tileY >= map.height) {
        return null;
    }
    const idx = map.tiles[tileY * map.width + tileX];
    return {
        type: idx,
        ...map.tileTypes[idx]
    };
}

export function getRoomAt(map, x, y) {
    const tileX = Math.floor(x / map.tileSize);
    const tileY = Math.floor(y / map.tileSize);
    
    for (const [key, room] of Object.entries(map.rooms)) {
        if (tileX >= room.x && tileX < room.x + room.width &&
            tileY >= room.y && tileY < room.y + room.height) {
            return room;
        }
    }
    return null;
}