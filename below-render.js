function checkWheel(e) {
    e = e || window.event;
    // Only zoom when scrolling over the map canvas area, not the log/message panel
    if (e.target && !document.getElementById("gameDivCenter").contains(e.target)) return;
    const delta = Math.sign(e.deltaY);
    if (document.getElementById("gameDiv").style.display !== 'none') {
        below.gameData.mapZoom += (4*delta);
        if (below.gameData.mapZoom < 25) below.gameData.mapZoom = 25;
        if (below.gameData.mapZoom > 100) below.gameData.mapZoom = 100;
        drawMapCanvas();
    }
}

function maintainMapLog() {
    var gameLogDiv = document.getElementById("gameLogDiv");
    while (gameLogDiv.firstChild) {
        gameLogDiv.removeChild(gameLogDiv.firstChild);
    }
    below.gameData.mapLog.slice().reverse().forEach(function(log, index) {
        var node = document.createElement("P");
        if (index === 0) {
            node.className = "below-game-left-paragraph-current";
        }
        else {
            node.className = "below-game-left-paragraph";
        }
        
        var textnode = document.createTextNode(log);
        node.appendChild(textnode);
        gameLogDiv.appendChild(node);
    });
    scrollLogToBottom();
}

function updateAreaDescription() {
    var curMap = below.gameData.player.currentMap;
    var x = below.gameData.player.currentLocation.x;
    var y = below.gameData.player.currentLocation.y;
    var tile = foundTile(x, y);
    var desc = null;
    if (tile && tile.description) {
        desc = tile.description;
    } else {
        var mapData = below.gameData.mapData[curMap];
        if (mapData.areaDescriptions) {
            for (var i = 0; i < mapData.areaDescriptions.length; i++) {
                var a = mapData.areaDescriptions[i];
                if (x >= a.x1 && x <= a.x2 && y >= a.y1 && y <= a.y2) {
                    desc = a.description;
                    break;
                }
            }
        }
        if (!desc && mapData.defaultDescription) {
            desc = mapData.defaultDescription;
        }
    }
    var mapName = below.gameData.mapData[curMap].name || "Unknown";
    below.currentMapName = mapName;
    below.currentAreaDesc = desc || "";
}

function computeVisibleTiles() {
    var curMap = below.gameData.player.currentMap;
    var px = Math.round(below.gameData.player.currentLocation.x);
    var py = Math.round(below.gameData.player.currentLocation.y);
    var vision = below.gameData.player.vision || 2;
    var visible = {};

    function bfsFrom(srcX, srcY, srcVision) {
        var queue = [{x: srcX, y: srcY}];
        var visited = {};
        visited[srcX + "," + srcY] = true;
        while (queue.length > 0) {
            var cur = queue.shift();
            visible[cur.x + "," + cur.y] = true;
            if (isVisionBlocked(cur.x, cur.y)) continue;
            var dist = Math.abs(cur.x - srcX) + Math.abs(cur.y - srcY);
            if (dist >= srcVision) continue;
            var dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            for (var di = 0; di < dirs.length; di++) {
                var nx = cur.x + dirs[di][0];
                var ny = cur.y + dirs[di][1];
                var nkey = nx + "," + ny;
                if (!visited[nkey] && foundTile(nx, ny)) {
                    visited[nkey] = true;
                    queue.push({x: nx, y: ny});
                }
            }
        }
    }

    bfsFrom(px, py, vision);

    (below.gameData.mapData[curMap].obstacles || []).forEach(function(o) {
        var obsType = below.gameData.obstacleTypes[o.type];
        var lr = o.lightRadius !== undefined ? o.lightRadius : (obsType ? obsType.lightRadius : 0);
        if (lr > 0) {
            bfsFrom(o.position.x, o.position.y, lr);
        }
    });

    return visible;
}

function drawMapCanvas() {
    var gameDivCenter = document.getElementById("gameDivCenter");
    var canvas = document.getElementById("mapCanvas");
    
    // Only resize if dimensions changed (prevents clearing event handlers)
    // Use a threshold to avoid floating point issues
    var newWidth = Math.floor(gameDivCenter.offsetWidth -60);
    var newHeight = Math.floor(gameDivCenter.offsetHeight -60);
    if (Math.abs(canvas.width - newWidth) > 1) {
        canvas.width = newWidth;
    }
    if (Math.abs(canvas.height - newHeight) > 1) {
        canvas.height = newHeight;
    }
    
    canvas.clickableElements = [];
    var context = canvas.getContext("2d");
    var curMap = below.gameData.player.currentMap;
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill background black for blank/non-visible tiles
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw tiles
    var thickness = 1;
    var width = below.gameData.mapZoom;    
    var horizontalCenter = canvas.height / 2;
    var verticalCenter = canvas.width / 2;
    
    // Center on player
    var verticalOffset = below.gameData.player.currentLocation.y * width;
    var horizontalOffset = below.gameData.player.currentLocation.x * width;
    
    var vision = below.gameData.player.vision || 2;
    var visionPixels = vision * width;
    
    // Compute visible tiles using BFS for line-of-sight
    var visibleTiles = computeVisibleTiles();
    
    // Draw visible tiles only
    var tileCount = 0;
    for (var k in below.gameData.mapData[curMap].tiles) {
        if (typeof below.gameData.mapData[curMap].tiles[k] !== 'function') {
            var tile = below.gameData.mapData[curMap].tiles[k];
            var tileKey = tile.x + "," + tile.y;
            if (visibleTiles[tileKey]) {
                tileCount++;
                var x = (tile.x * width) - (width/2) + verticalCenter - horizontalOffset;
                var y = (tile.y * width) - (width/2) + horizontalCenter - verticalOffset;
                var tileTypeDef = tile.type !== undefined && below.gameData.tileTypes ? below.gameData.tileTypes[tile.type] : null;
                var tileBorder = tileTypeDef ? tileTypeDef.border : "#959595";
                var tileFill = tileTypeDef ? tileTypeDef.fill : "#6C6C6C";
                context.fillStyle = tileBorder;
                context.fillRect(x, y, width, width);
                context.fillStyle = tileFill;
                context.fillRect(x + thickness, y + thickness, width - (thickness * 2), width - (thickness * 2));
            }
        }
    }
    
    // Draw player and monster sprites
    // PLAYER
    if (below.gameData.player.icon) {
        var playerImg = getImage(below.gameData.player.icon);
        context.drawImage(playerImg, verticalCenter - (width/2), horizontalCenter - (width/2), width, width);
    } else {
        context.fillStyle = "#B8C76F";
        context.beginPath();
        context.arc( verticalCenter, horizontalCenter, (width-2)/2, 0, 2 * Math.PI);
        context.fill();
    }
    
    // Show coordinates if enabled
    if (below.gameData.showCoordinates) {
        context.fillStyle = "#FFFFFF";
        context.font = "16px Courier New";
        var coordText = "x: " + below.gameData.player.currentLocation.x + ", y: " + below.gameData.player.currentLocation.y;
        var textWidth = context.measureText(coordText).width;
        context.fillText(coordText, canvas.width - textWidth - 10, canvas.height - 10);
    }
    
    // MONSTERS
    (below.gameData.mapData[curMap].monsters || []).forEach(function(monster) {
        // Calculate distance for vision check
        var distXM = (monster.position.x * width + verticalCenter - horizontalOffset) - verticalCenter;
        var distYM = (monster.position.y * width + horizontalCenter - verticalOffset) - horizontalCenter;
        var distanceM = Math.sqrt(distXM * distXM + distYM * distYM);
        
        // Check vision and line-of-sight
        if (distanceM <= visionPixels && visibleTiles[Math.round(monster.position.x) + "," + Math.round(monster.position.y)]) {
            var type = below.gameData.monsterTypes[monster.type];
            if (!type) return; // Skip if monster type is undefined
            if (type["icon"]) {
                var img = getImage(type.icon);
                context.drawImage(img, (monster.position.x * width) + verticalCenter - horizontalOffset - (width/2), (monster.position.y * width) + horizontalCenter - verticalOffset  - (width/2), width, width);
            }
            else {
                context.fillStyle = type.color;
                context.beginPath();
                context.arc( (monster.position.x * width) + verticalCenter - horizontalOffset, (monster.position.y * width) + horizontalCenter - verticalOffset, (width-2)/2, 0, 2 * Math.PI);
                context.fill();
            }
        }
    });
    // NPCs
    (below.gameData.mapData[curMap].npcs || []).forEach(function(npc) {
        // Skip if no position
        if (!npc.position) return;
        
        // Calculate distance for vision check
        var distXN = (npc.position.x * width + verticalCenter - horizontalOffset) - verticalCenter;
        var distYN = (npc.position.y * width + horizontalCenter - verticalOffset) - horizontalCenter;
        var distanceN = Math.sqrt(distXN * distXN + distYN * distYN);
        
        // Check vision and line-of-sight
        if (distanceN <= visionPixels && visibleTiles[Math.round(npc.position.x) + "," + Math.round(npc.position.y)]) {
            var type = below.gameData.npcTypes[npc.type];
            if (!type) return; // Skip if NPC type is undefined
                if (type.icon) {
                var iconName = npc.icon || type.icon;
                var img = getImage(iconName);
                context.drawImage(img, (npc.position.x * width) + verticalCenter - horizontalOffset - (width/2), (npc.position.y * width) + horizontalCenter - verticalOffset - (width/2), width, width);
            } else {
                context.fillStyle = type.color || "#00aa00";
                context.beginPath();
                context.arc((npc.position.x * width) + verticalCenter - horizontalOffset, (npc.position.y * width) + horizontalCenter - verticalOffset, (width-2)/2, 0, 2 * Math.PI);
                context.fill();
            }
        }
    });
    // OBSTACLES - Draw in two passes: below player (drawOrder=1), then on top (drawOrder=2)
    // Resolve an icon name to an Image object (for non-door icons)
    // Draw a large multi-tile obstacle icon spanning all its tiles
    function drawMultiObstacle(obstacle, type, ow, oh) {
        var iconName = obstacle.icon || type.icon;
        var img = null;
        if (iconName === "door_closed.png" || iconName === "door_open.png") {
            var isClosed = obstacle.closed !== undefined ? obstacle.closed : type.closed;
            img = getImage(isClosed ? "door_closed.png" : "door_open.png");
        } else if (iconName === "shimmer_wall_closed.png" || iconName === "shimmer_wall_open.png") {
            var isClosed = obstacle.closed !== undefined ? obstacle.closed : type.closed;
            img = getImage(isClosed ? "shimmer_wall_closed.png" : "shimmer_wall_open.png");
        } else {
            img = getImage(iconName);
        }
        var drawX = (obstacle.position.x * width) + verticalCenter - horizontalOffset - (width/2);
        var drawY = (obstacle.position.y * width) + horizontalCenter - verticalOffset - (width/2);
        context.drawImage(img, drawX, drawY, ow * width, oh * width);
    }
    
    // Helper to draw an obstacle tile at a given position
    function drawObstacleTile(ox, oy, obstacle, type) {
        var distXOT = (ox * width + verticalCenter - horizontalOffset) - verticalCenter;
        var distYOT = (oy * width + horizontalCenter - verticalOffset) - horizontalCenter;
        var distanceOT = Math.sqrt(distXOT * distXOT + distYOT * distYOT);
        if (distanceOT > visionPixels) return;
        if (!visibleTiles[ox + "," + oy]) return;
        if (type.icon) {
            var iconName = obstacle.icon || type.icon;
            var img = null;
            if (iconName === "door_closed.png" || iconName === "door_open.png") {
                var isClosed = obstacle.closed !== undefined ? obstacle.closed : type.closed;
                img = getImage(isClosed ? "door_closed.png" : "door_open.png");
            } else if (iconName === "shimmer_wall_closed.png" || iconName === "shimmer_wall_open.png") {
                var isClosed = obstacle.closed !== undefined ? obstacle.closed : type.closed;
                img = getImage(isClosed ? "shimmer_wall_closed.png" : "shimmer_wall_open.png");
            } else {
                img = getImage(iconName);
            }
            context.drawImage(img, (ox * width) + verticalCenter - horizontalOffset - (width/2), (oy * width) + horizontalCenter - verticalOffset - (width/2), width, width);
        } else {
            context.fillStyle = type.color || "#433900";
            context.fillRect((ox * width) - (width/2) + verticalCenter - horizontalOffset, (oy * width) - (width/2) + horizontalCenter - verticalOffset, width, width);
        }
    }
    
    // First pass: draw obstacles with drawOrder=1 (below player)
    (below.gameData.mapData[curMap].obstacles || []).forEach(function(obstacle) {
        var type = below.gameData.obstacleTypes[obstacle.type];
        var drawOrder = type.drawOrder || 1;
        if (drawOrder !== 1) return;
        var ow = obstacle.width || 1;
        var oh = obstacle.height || 1;
        if ((ow > 1 || oh > 1) && obstacle.icon) {
            var anyVisible = false;
            for (var vdy = 0; vdy < oh && !anyVisible; vdy++) {
                for (var vdx = 0; vdx < ow && !anyVisible; vdx++) {
                    var vtx = obstacle.position.x + vdx;
                    var vty = obstacle.position.y + vdy;
                    var vdX = (vtx * width + verticalCenter - horizontalOffset) - verticalCenter;
                    var vdY = (vty * width + horizontalCenter - verticalOffset) - horizontalCenter;
                    if (Math.sqrt(vdX * vdX + vdY * vdY) <= visionPixels && visibleTiles[vtx + "," + vty]) {
                        anyVisible = true;
                    }
                }
            }
            if (anyVisible) {
                drawMultiObstacle(obstacle, type, ow, oh);
            }
        } else {
            for (var dy = 0; dy < oh; dy++) {
                for (var dx = 0; dx < ow; dx++) {
                    drawObstacleTile(obstacle.position.x + dx, obstacle.position.y + dy, obstacle, type);
                }
            }
        }
    });
    
    // PLAYER (second pass for correct draw order)
    if (below.gameData.player.icon) {
        var playerImg = getImage(below.gameData.player.icon);
        context.drawImage(playerImg, verticalCenter - (width/2), horizontalCenter - (width/2), width, width);
    }
    
    // Second pass: draw obstacles with drawOrder=2 (on top of player)
    (below.gameData.mapData[curMap].obstacles || []).forEach(function(obstacle) {
        var type = below.gameData.obstacleTypes[obstacle.type];
        var drawOrder = type.drawOrder || 1;
        if (drawOrder !== 2) return;
        var opacity = type.opacity !== undefined ? type.opacity : 1.0;
        if (opacity < 1.0) context.globalAlpha = opacity;
        var ow = obstacle.width || 1;
        var oh = obstacle.height || 1;
        if ((ow > 1 || oh > 1) && obstacle.icon) {
            var anyVisible = false;
            for (var vdy = 0; vdy < oh && !anyVisible; vdy++) {
                for (var vdx = 0; vdx < ow && !anyVisible; vdx++) {
                    var vtx = obstacle.position.x + vdx;
                    var vty = obstacle.position.y + vdy;
                    var vdX = (vtx * width + verticalCenter - horizontalOffset) - verticalCenter;
                    var vdY = (vty * width + horizontalCenter - verticalOffset) - horizontalCenter;
                    if (Math.sqrt(vdX * vdX + vdY * vdY) <= visionPixels && visibleTiles[vtx + "," + vty]) {
                        anyVisible = true;
                    }
                }
            }
            if (anyVisible) {
                drawMultiObstacle(obstacle, type, ow, oh);
            }
        } else {
            for (var dy2 = 0; dy2 < oh; dy2++) {
                for (var dx2 = 0; dx2 < ow; dx2++) {
                    drawObstacleTile(obstacle.position.x + dx2, obstacle.position.y + dy2, obstacle, type);
                }
            }
        }
        if (opacity < 1.0) context.globalAlpha = 1.0;
    });
    
    // EXITS (drawn on top of everything, but not if blocked by an obstacle)
    var exits = below.gameData.mapData[curMap].exits;
    if (exits) {
        exits.forEach(function(exit) {
            var distXE = (exit.position.x * width + verticalCenter - horizontalOffset) - verticalCenter;
            var distYE = (exit.position.y * width + horizontalCenter - verticalOffset) - horizontalCenter;
            var distanceE = Math.sqrt(distXE * distXE + distYE * distYE);
            if (distanceE <= visionPixels && visibleTiles[exit.position.x + "," + exit.position.y]) {
                // Don't draw exit marker if a blocking obstacle is at the same position
                var blockedByObstacle = (below.gameData.mapData[curMap].obstacles || []).some(function(o) {
                    if (!o.position || o.position.x !== exit.position.x || o.position.y !== exit.position.y) return false;
                    var oType = below.gameData.obstacleTypes[o.type];
                    return o.blocking !== undefined ? o.blocking : (oType ? oType.blocking : false);
                });
                if (blockedByObstacle) return;
                var exitIcon = getImage("exit.png");
                context.drawImage(exitIcon, (exit.position.x * width) + verticalCenter - horizontalOffset - (width/2), (exit.position.y * width) + horizontalCenter - verticalOffset - (width/2), width, width);
            }
        });
    }
    
    // Radial gradient overlay for vision (fades everything at edge of player's vision)
    var gradient = context.createRadialGradient(verticalCenter, horizontalCenter, visionPixels * 0.6, verticalCenter, horizontalCenter, visionPixels);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Lamp glow (drawn on top of darkness so pools of light are visible through the vignette)
    (below.gameData.mapData[curMap].obstacles || []).forEach(function(o) {
        var obsType = below.gameData.obstacleTypes[o.type];
        var lr = o.lightRadius !== undefined ? o.lightRadius : (obsType ? obsType.lightRadius : 0);
        if (lr > 0) {
            var lampX = (o.position.x * width) + verticalCenter - horizontalOffset;
            var lampY = (o.position.y * width) + horizontalCenter - verticalOffset;
            if (lampX > -100 && lampX < canvas.width + 100 && lampY > -100 && lampY < canvas.height + 100) {
                var glowSize = lr * width * 2.5;
                var glow = context.createRadialGradient(lampX, lampY, 0, lampX, lampY, glowSize);
                var lightColor = obsType ? (obsType.lightColor || 'rgba(200, 200, 150, 0.35)') : 'rgba(200, 200, 150, 0.35)';
                var midColor = lightColor.replace(/[\d.]+\)$/, '0.1)');
                var endColor = lightColor.replace(/[\d.]+\)$/, '0)');
                glow.addColorStop(0, lightColor);
                glow.addColorStop(0.5, midColor);
                glow.addColorStop(1, endColor);
                context.fillStyle = glow;
                context.fillRect(lampX - glowSize, lampY - glowSize, glowSize * 2, glowSize * 2);
            }
        }
    });
    
    // Map 6 shadow realm — dim brightness by 50%
    if (curMap === 6) {
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Fog overlay (drawn on top of everything, only on map 3 and map 5)
    if ((curMap === 3 || curMap === 5) && below.fogParticles) {
        var fogColor = curMap === 5 ? 'rgba(100, 180, 170' : 'rgba(180, 180, 180';
        below.fogParticles.forEach(function(p) {
            var fogX = (p.x * canvas.width);
            var fogY = (p.y * canvas.height);
            var density = curMap === 5 ? 2.5 : 3.0;
            var fogSize = p.size * width * density;
            var fogGrad = context.createRadialGradient(fogX, fogY, 0, fogX, fogY, fogSize);
            var particleOpacity = curMap === 5 ? p.opacity * 0.7 : p.opacity;
            fogGrad.addColorStop(0, fogColor + ', ' + particleOpacity + ')');
            fogGrad.addColorStop(1, fogColor + ', 0)');
            context.fillStyle = fogGrad;
            context.fillRect(fogX - fogSize, fogY - fogSize, fogSize * 2, fogSize * 2);
        });
    }
    
    // Area description overlay (drawn on canvas so it's fixed to the map area)
    if (below.currentMapName) {
        var boxX = 10;
        var boxY = 8;
        var lineH = 18;
        var nameText = below.currentMapName;
        var descText = below.currentAreaDesc;
        context.font = "bold 15px Courier New";
        var nameW = context.measureText(nameText).width;
        context.font = "italic 13px Courier New";
        var descW = descText ? context.measureText(descText).width : 0;
        var boxW = Math.max(nameW, descW) + 20;
        if (boxW > canvas.width - 20) boxW = canvas.width - 20;
        
        // Word-wrap description text
        var descLines = descText ? [descText] : [];
        if (descW > boxW - 20) {
            descLines = [];
            var words = descText.split(' ');
            var line = '';
            for (var wi = 0; wi < words.length; wi++) {
                var testLine = line ? line + ' ' + words[wi] : words[wi];
                if (context.measureText(testLine).width > boxW - 20 && line) {
                    descLines.push(line);
                    line = words[wi];
                } else {
                    line = testLine;
                }
            }
            if (line) descLines.push(line);
        }
        var descLineCount = descLines.length;
        var boxH = descLineCount > 0 ? lineH * (1 + descLineCount) + 10 : lineH + 10;
        
        // Background
        context.fillStyle = "rgba(0, 0, 0, 0.75)";
        context.fillRect(boxX, boxY, boxW, boxH);
        context.strokeStyle = "#6C6C6C";
        context.lineWidth = 1;
        context.strokeRect(boxX, boxY, boxW, boxH);
        
        // Map name
        context.fillStyle = "#FFFFFF";
        context.font = "bold 15px Courier New";
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillText(nameText, boxX + 10, boxY + 5);
        
        // Area description (wrapped)
        if (descLines.length > 0) {
            context.fillStyle = "#B8C76F";
            context.font = "italic 13px Courier New";
            for (var li = 0; li < descLines.length; li++) {
                context.fillText(descLines[li], boxX + 10, boxY + lineH * (li + 1) + 5);
            }
        }
    }
}
