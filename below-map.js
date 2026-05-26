function foundTile(x, y) {
    var index = 'x' + (x < 0 ? 'm' : '') + Math.abs(x) + 'y' + (y < 0 ? 'm' : '') + Math.abs(y);
    return below.gameData.mapData[below.gameData.player.currentMap].tiles[index];
}

function isTileBlocking(x, y) {
    var tile = foundTile(x, y);
    if (!tile) return false;
    if (tile.blocking !== undefined) return tile.blocking;
    var tileType = tile.type !== undefined ? below.gameData.tileTypes[tile.type] : null;
    return tileType ? !!tileType.blocking : false;
}

function obstacleOccupies(o, x, y) {
    if (!o || !o.position) return false;
    var w = o.width || 1;
    var h = o.height || 1;
    return x >= o.position.x && x < o.position.x + w &&
           y >= o.position.y && y < o.position.y + h;
}

function isBlocked(x, y) {
    var curMap = below.gameData.player.currentMap;
    // Check NPCs - they always block (unless attacked/intimidated)
    var blockedByNPC = below.gameData.mapData[curMap].npcs.some(function(n) {
        return n.position && n.position.x === x && n.position.y === y;
    });
    if (blockedByNPC) return true;
    // Check obstacles - instance blocking overrides type
    var obstacles = below.gameData.mapData[curMap].obstacles || [];
    var blockedByObstacle = obstacles.some(function(o) {
        if (!o.position) return false;
        var obsType = below.gameData.obstacleTypes[o.type];
        var isBlocking = o.blocking !== undefined ? o.blocking : (obsType ? obsType.blocking : false);
        return obstacleOccupies(o, x, y) && isBlocking;
    });
    if (blockedByObstacle) return true;
    // Check blocking tiles (e.g. water)
    if (isTileBlocking(x, y)) return true;
    return false;
}

function isVisionBlocked(x, y) {
    var curMap = below.gameData.player.currentMap;
    var obstacles = below.gameData.mapData[curMap].obstacles || [];
    return obstacles.some(function(o) {
        if (!o.position) return false;
        var obsType = below.gameData.obstacleTypes[o.type];
        var isBlocking = o.blocking !== undefined ? o.blocking : (obsType ? obsType.blocking : false);
        if (!isBlocking) return false;
        var blocksVision = obsType ? (obsType.visionBlocking !== undefined ? obsType.visionBlocking : true) : true;
        return obstacleOccupies(o, x, y) && blocksVision;
    });
}

function getBlockedMessage(x, y) {
    var curMap = below.gameData.player.currentMap;
    // Check NPCs
    var npc = (below.gameData.mapData[curMap].npcs || []).find(function(n) {
        return n.position && n.position.x === x && n.position.y === y;
    });
    if (npc) {
        var npcType = below.gameData.npcTypes[npc.type];
        return (npcType ? npcType.description : "") || "The character blocks your path.";
    }
    // Check obstacles
    var obstacle = (below.gameData.mapData[curMap].obstacles || []).find(function(o) {
        if (!o.position) return false;
        var oType = below.gameData.obstacleTypes[o.type];
        return obstacleOccupies(o, x, y) && oType && oType.blocking;
    });
    if (obstacle) {
        var obsType = below.gameData.obstacleTypes[obstacle.type];
        return obstacle.description || (obsType ? obsType.description : "") || "Not sure what good that would do";
    }
    // Empty tile - check for searchMsg on tile first, then return random default message
    var tileIndex = 'x' + (x < 0 ? 'm' : '') + Math.abs(x) + 'y' + (y < 0 ? 'm' : '') + Math.abs(y);
    var tile = below.gameData.mapData[curMap].tiles[tileIndex];
    if (tile && tile.searchMsg) {
        return tile.searchMsg;
    }
    var emptyTileMessages = [
        "You search the ground - nothing but dirt.",
        "You look around - nothing here.",
        "You dig through the dirt - find nothing.",
        "Just empty space.",
        "You search - nothing of interest."
    ];
    return emptyTileMessages[Math.floor(Math.random() * emptyTileMessages.length)];
}

function isTileAllowed(monster, x, y) {
    // If no allowedTiles defined, all tiles are allowed
    if (!monster.allowedTiles) return true;
    // Check if the tile is in the allowedTiles list
    return monster.allowedTiles.some(function(tile) {
        return tile.x === x && tile.y === y;
    });
}

function isPathBlocked(x, y) {
    var curMap = below.gameData.player.currentMap;
    // Check obstacles (blocking ones only)
    var obstacles = below.gameData.mapData[curMap].obstacles || [];
    var blockedByObstacle = obstacles.some(function(o) {
        if (!o.position) return false;
        var obsType = below.gameData.obstacleTypes[o.type];
        var isBlocking = o.blocking !== undefined ? o.blocking : (obsType ? obsType.blocking : false);
        return obstacleOccupies(o, x, y) && isBlocking;
    });
    if (blockedByObstacle) return true;
    // Check blocking tiles
    if (isTileBlocking(x, y)) return true;
    return false;
}

function findPath(startX, startY, endX, endY) {
    var curMap = below.gameData.player.currentMap;
    var queue = [{x: startX, y: startY, path: []}];
    var visited = {};
    visited[startX + "," + startY] = true;
    while (queue.length > 0) {
        var cur = queue.shift();
        if (cur.x === endX && cur.y === endY) {
            return cur.path;
        }
        var dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        for (var di = 0; di < 4; di++) {
            var nx = cur.x + dirs[di][0];
            var ny = cur.y + dirs[di][1];
            var key = nx + "," + ny;
            if (!visited[key] && foundTile(nx, ny) && !isPathBlocked(nx, ny)) {
                visited[key] = true;
                queue.push({x: nx, y: ny, path: cur.path.concat([{x: nx, y: ny}])});
            }
        }
    }
    return null;
}

function npcWalkTo(npc, targetX, targetY, onComplete, walkDelay) {
    var path = findPath(Math.round(npc.position.x), Math.round(npc.position.y), targetX, targetY);
    if (!path || path.length === 0) {
        console.warn("No path found for NPC from (" + npc.position.x + "," + npc.position.y + ") to (" + targetX + "," + targetY + ")");
        return false;
    }
    npc.walkPath = path;
    npc.walkDelay = walkDelay || 0;
    npc._walkTimer = undefined;
    npc.onPathComplete = onComplete;
    return true;
}

function pushObstacle(obstaclePos) {
    var curMap = below.gameData.player.currentMap;
    var playerX = below.gameData.player.currentLocation.x;
    var playerY = below.gameData.player.currentLocation.y;
    // Calculate push direction (from player to obstacle)
    var dirX = obstaclePos.x - playerX;
    var dirY = obstaclePos.y - playerY;
    var newX = obstaclePos.x + dirX;
    var newY = obstaclePos.y + dirY;
    // Check if new position is valid
    if (!foundTile(newX, newY)) {
        addMapMessage("Cannot push the rock that way.");
        maintainMapLog();
        return false;
    }
    // Check if new position is blocked by another blocking object
    if (isBlocked(newX, newY)) {
        addMapMessage("Something is blocking the way.");
        maintainMapLog();
        return false;
    }
    // Find and move the obstacle
    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
        return obstacleOccupies(o, obstaclePos.x, obstaclePos.y);
    });
    if (obstacle) {
        // Only single-tile obstacles can be pushed
        var ow = obstacle.width || 1;
        var oh = obstacle.height || 1;
        if (ow > 1 || oh > 1) {
            addMapMessage("The obstacle is too large to push.");
            maintainMapLog();
            return false;
        }
        obstacle.position.x = newX;
        obstacle.position.y = newY;
        addMapMessage("You push the rock.");
        maintainMapLog();
        drawMapCanvas();
        return true;
    }
    return false;
}

function tryAutoPush(x, y, fromX, fromY) {
    var curMap = below.gameData.player.currentMap;
    var rock = (below.gameData.mapData[curMap].obstacles || []).find(function(o) {
        return o.position && o.position.x === x && o.position.y === y && o.type === "pushable_rock";
    });
    if (!rock) return false;
    var dirX = x - fromX;
    var dirY = y - fromY;
    var pushX = x + dirX;
    var pushY = y + dirY;
    if (!foundTile(pushX, pushY)) return false;
    if (isBlocked(pushX, pushY)) return false;
    rock.position.x = pushX;
    rock.position.y = pushY;
    return true;
}

function isRatBlocked(x, y) {
    if (below.ratsCleared) return false;
    var curMap = below.gameData.player.currentMap;
    if (curMap !== 0) return false;
    return x >= -6 && x <= -4 && y >= 1 && y <= 3;
}

var ratSplashData = {
    image: "rats_dialog.png",
    text: "As you step through the doorway, a sea of rats surges forward - teeth bared, claws skittering on stone. They swarm around your feet, forcing you back. There's no getting past them without something to drive them away.",
    shake: true
};
