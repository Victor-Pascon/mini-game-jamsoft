export class Collision {
    static checkRect(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    static checkMapCollision(entity, map) {
        if (!map || !map.collisionTiles) return false;

        const bounds = entity.getBounds();
        const tileSize = map.tileSize || 32;

        const startX = Math.floor(bounds.x / tileSize);
        const endX = Math.floor((bounds.x + bounds.width - 1) / tileSize);
        const startY = Math.floor(bounds.y / tileSize);
        const endY = Math.floor((bounds.y + bounds.height - 1) / tileSize);

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
                    return true;
                }

                const tileIndex = map.tiles[y * map.width + x];
                if (map.collisionTiles.includes(tileIndex)) {
                    return true;
                }
            }
        }

        return false;
    }

    static resolveMapCollision(entity, map) {
        if (!map || !map.collisionTiles) return;

        const tileSize = map.tileSize || 32;
        const originalX = entity.x;
        const originalY = entity.y;

        const testX = (dx) => {
            entity.x += dx;
            if (this.checkMapCollision(entity, map)) {
                entity.x = originalX;
                return true;
            }
            entity.x = originalX;
            return false;
        };

        const testY = (dy) => {
            entity.y += dy;
            if (this.checkMapCollision(entity, map)) {
                entity.y = originalY;
                return true;
            }
            entity.y = originalY;
            return false;
        };

        const bounds = entity.getBounds();
        
        entity.x = originalX;
        const startX = Math.floor(bounds.x / tileSize);
        const endX = Math.floor((bounds.x + bounds.width - 1) / tileSize);
        
        entity.y = originalY;
        const startY = Math.floor(bounds.y / tileSize);
        const endY = Math.floor((bounds.y + bounds.height - 1) / tileSize);

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
                    return;
                }
                
                const tileIndex = map.tiles[y * map.width + x];
                if (map.collisionTiles.includes(tileIndex)) {
                    const tileX = x * tileSize;
                    const tileY = y * tileSize;

                    const overlapLeft = (bounds.x + bounds.width) - tileX;
                    const overlapRight = (tileX + tileSize) - bounds.x;
                    const overlapTop = (bounds.y + bounds.height) - tileY;
                    const overlapBottom = (tileY + tileSize) - bounds.y;

                    const minOverlapX = Math.min(overlapLeft, overlapRight);
                    const minOverlapY = Math.min(overlapTop, overlapBottom);

                    if (minOverlapX < minOverlapY) {
                        if (overlapLeft < overlapRight) {
                            entity.x = tileX - bounds.width;
                        } else {
                            entity.x = tileX + tileSize;
                        }
                    } else {
                        if (overlapTop < overlapBottom) {
                            entity.y = tileY - bounds.height;
                        } else {
                            entity.y = tileY + tileSize;
                        }
                    }
                    return;
                }
            }
        }
    }

    static checkEntityCollision(entity1, entity2) {
        return this.checkRect(entity1.getBounds(), entity2.getBounds());
    }
}