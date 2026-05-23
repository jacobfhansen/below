function startHideAndSeek() {
    // Close the current choice event
    closeChoiceEvent();

    var gameDivCenter = document.getElementById("gameDivCenter");
    gameDivCenter.style.opacity = "0.5";
    gameDivCenter.style.pointerEvents = "none";

    // Create fade overlay
    var fadeDiv = document.createElement("div");
    fadeDiv.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:0;z-index:4999;pointer-events:none;transition:opacity 0.5s;";
    document.body.appendChild(fadeDiv);
    setTimeout(function() { fadeDiv.style.opacity = "1"; }, 50);

    // After fade completes, show countdown
    setTimeout(function() {
        var countDiv = document.createElement("div");
        countDiv.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:5000;color:#70A4B2;font-size:72px;font-family:'Courier New',monospace;pointer-events:none;text-shadow:0 0 20px rgba(112,164,178,0.5);";
        countDiv.id = "hideSeekCount";
        document.body.appendChild(countDiv);

        var count = 1;
        var countInterval = setInterval(function() {
            countDiv.textContent = count;
            count++;
            if (count > 10) {
                clearInterval(countInterval);
                countDiv.textContent = "READY OR NOT, HERE I COME!";
                setTimeout(function() {
                    // Teleport sisters to hiding positions
                    var sisters = below.gameData.mapData[5].npcs;
                    var hidingSpots = [
                        { x: 12, y: 5 },
                        { x: 18, y: 12 }
                    ];
                    sisters.forEach(function(n, i) {
                        var spot = hidingSpots[i % hidingSpots.length];
                        n.position.x = spot.x;
                        n.position.y = spot.y;
                        n._hidden = true;
                        n._found = false;
                    });
                    // Disable all normal dialogs, enable found dialog
                    sisters.forEach(function(n) {
                        n.dialogOptions.forEach(function(d) {
                            if (d.id !== "sisters_hideandseek_found") {
                                d.available = false;
                            }
                        });
                        var foundD = n.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_found"; });
                        if (foundD) foundD.available = true;
                    });
                    // Fade back in
                    fadeDiv.style.opacity = "0";
                    setTimeout(function() {
                        fadeDiv.remove();
                        countDiv.remove();
                        gameDivCenter.style.opacity = "1";
                        gameDivCenter.style.pointerEvents = "auto";
                        addMapMessage("The sisters have vanished into the cavern. Time to find them.");
                        maintainMapLog();
                        drawMapCanvas();
                    }, 500);
                }, 1500);
            }
        }, 700);
    }, 600);
}

function startTagGame() {
    closeChoiceEvent();

    var gameDivCenter = document.getElementById("gameDivCenter");
    gameDivCenter.style.opacity = "0.5";
    gameDivCenter.style.pointerEvents = "none";

    var fadeDiv = document.createElement("div");
    fadeDiv.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:0;z-index:4999;pointer-events:none;transition:opacity 0.5s;";
    document.body.appendChild(fadeDiv);
    setTimeout(function() { fadeDiv.style.opacity = "1"; }, 50);

    setTimeout(function() {
        var countDiv = document.createElement("div");
        countDiv.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:5000;color:#70A4B2;font-size:72px;font-family:'Courier New',monospace;pointer-events:none;text-shadow:0 0 20px rgba(112,164,178,0.5);";
        countDiv.id = "tagCount";
        document.body.appendChild(countDiv);

        var count = 1;
        var countInterval = setInterval(function() {
            countDiv.textContent = count;
            count++;
            if (count > 10) {
                clearInterval(countInterval);
                countDiv.textContent = "READY OR NOT, HERE I COME!";
                setTimeout(function() {
                    var sisters = below.gameData.mapData[5].npcs;
                    var playerX = Math.round(below.gameData.player.currentLocation.x);
                    var playerY = Math.round(below.gameData.player.currentLocation.y);
                    var startSpots = [
                        { x: playerX + 4, y: playerY - 3 },
                        { x: playerX - 4, y: playerY + 3 }
                    ];
                    sisters.forEach(function(n, i) {
                        var spot = startSpots[i % startSpots.length];
                        n.position.x = spot.x;
                        n.position.y = spot.y;
                        n._tagFound = false;
                        n._tagFleeing = true;
                        n._tagFleeTimer = 0;
                    });
                    sisters.forEach(function(n) {
                        n.dialogOptions.forEach(function(d) {
                            if (d.id !== "sisters_tag_found") {
                                d.available = false;
                            }
                        });
                        var foundD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_found"; });
                        if (foundD) foundD.available = true;
                    });
                    below.tagActive = true;
                    fadeDiv.style.opacity = "0";
                    setTimeout(function() {
                        fadeDiv.remove();
                        countDiv.remove();
                        gameDivCenter.style.opacity = "1";
                        gameDivCenter.style.pointerEvents = "auto";
                        addMapMessage("The sisters shamble away from you at an almost insulting pace. Tag them!");
                        maintainMapLog();
                        drawMapCanvas();
                    }, 500);
                }, 1500);
            }
        }, 700);
    }, 600);
}

function startSistersReturn() {
    var returnContext = below.sistersReturnContext || "hideandseek";
    below.gameData.mapData[5].npcs.forEach(function(n) {
        n._hidden = false;
        n._zombieReturn = true;
        // Disable all dialogs, enable exhausted during walk-back
        n.dialogOptions.forEach(function(d) { d.available = false; });
        var exhD = n.dialogOptions.find(function(d) { return d.id === "sisters_exhausted"; });
        if (exhD) exhD.available = true;
        // Generate walk path back to (15, 10)
        var path = [];
        var cx = Math.round(n.position.x);
        var cy = Math.round(n.position.y);
        var targetX = 15;
        var targetY = 10;
        // Simple path: move horizontally first, then vertically
        while (cx !== targetX) {
            cx += (cx < targetX) ? 1 : -1;
            path.push({ x: cx, y: cy });
        }
        while (cy !== targetY) {
            cy += (cy < targetY) ? 1 : -1;
            path.push({ x: cx, y: cy });
        }
        n.walkPath = path;
        n.walkDelay = 20;
        n.onPathComplete = function() {
            n.position.x = 15;
            n.position.y = 10;
            n.walkPath = null;
            n.onPathComplete = null;
            n._zombieReturn = false;
            var allArrived = below.gameData.mapData[5].npcs.every(function(n2) {
                return !n2.walkPath || n2.walkPath.length === 0;
            });
            if (allArrived) {
                // Restore appropriate dialogs based on context
                below.gameData.mapData[5].npcs.forEach(function(s) {
                    s.dialogOptions.forEach(function(d) { d.available = false; });
                    if (returnContext === "tag") {
                        var congratsD = s.dialogOptions.find(function(d) { return d.id === "sisters_congratulations"; });
                        if (congratsD) congratsD.available = true;
                    } else {
                        var introD = s.dialogOptions.find(function(d) { return d.id === "sisters_intro"; });
                        if (introD) introD.available = true;
                        var tagIntroD = s.dialogOptions.find(function(d) { return d.id === "sisters_tag_intro"; });
                        if (tagIntroD) tagIntroD.available = true;
                    }
                });
                addMapMessage("The sisters shuffle back to their spot, looking exhausted by the effort.");
                maintainMapLog();
            }
        };
    });
}

function showSplash(splash) {
    below.splashActive = true;
    // Store player position for rock drop
    below.splashPos = {
        x: below.gameData.player.currentLocation.x,
        y: below.gameData.player.currentLocation.y
    };
    below.splashData = splash;
    document.getElementById("splashImage").src = "images/" + splash.image;
    document.getElementById("splashText").textContent = splash.text;
    var el = document.getElementById("splashContent");
    el.classList.remove("splash-shake");
    if (splash.shake) {
        void el.offsetWidth;
        el.classList.add("splash-shake");
    }
    document.getElementById("splashOverlay").style.display = "flex";
}

function hideSplash() {
    document.getElementById("splashOverlay").style.display = "none";
    below.splashActive = false;
    // Trigger rock drop if splash has rockDrop
    if (below.splashData && below.splashData.rockDrop && below.splashData.rockDrop.length > 0) {
        dropTrapRocks(below.splashData.rockDrop, below.splashPos.x, below.splashPos.y, below.splashData.moleTeleport);
        // Track splash trap count for post-trap mole state
        if (below.splashCount === undefined) below.splashCount = 0;
        below.splashCount++;
        // On 6th trap, return mole to starting position and unlock post-trap dialog
        if (below.splashCount >= 6) {
            var curMap = below.gameData.player.currentMap;
            var mole = below.gameData.mapData[curMap].npcs.find(function(n) { return n.type === 4; });
            if (mole) {
                var cycle = below.gameData.player.mazeCycle || 0;
                var molePositions = [[11, 10], [33, 10], [11, 32]];
                mole.position = { x: molePositions[cycle][0], y: molePositions[cycle][1] };
                mole.destPos = {};
                var trapD = mole.dialogOptions.find(function(d) { return d.id === "mole_trap"; });
                var postD = mole.dialogOptions.find(function(d) { return d.id === "mole_post1"; });
                if (trapD) trapD.available = false;
                if (postD) postD.available = true;
            }
        }
    }
    // Handle post-rat-clear actions (teleport Hermit, enable bat swatter dialog, remove rats)
    if (below.pendingRatClear) {
        below.pendingRatClear = false;
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) { return n.type === 1; });
        if (hermitNpc) {
            hermitNpc.position.x = -6;
            hermitNpc.position.y = 3;
            var batD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_bat_swatter"; });
            if (batD) batD.available = true;
            var introD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
            if (introD) introD.available = false;
        }
        // Remove rat monsters (type 1) from map
        below.gameData.mapData[curMap].monsters = below.gameData.mapData[curMap].monsters.filter(function(m) {
            return m.type !== 1;
        });
        maintainMapLog();
    }
    // Handle shadow catch teleport
    if (below._shadowCatchHandled) {
        below._shadowCatchHandled = false;
        // Reset all Living Shadows on map 6 to initial positions
        var map6Monsters = below.gameData.mapData[6].monsters;
        var shadowStarts = [
            { x: 0, y: -2 }, { x: 1, y: 0 }, { x: 0, y: 3 },
            { x: 1, y: 6 }, { x: 0, y: 7 }, { x: 1, y: 10 }
        ];
        var si = 0;
        map6Monsters.forEach(function(m) {
            if (m.type === 4 && si < shadowStarts.length) {
                m.position.x = shadowStarts[si].x;
                m.position.y = shadowStarts[si].y;
                m.chaseState = "idle";
                m._detectTimer = 60;
                m._chaseTilesMoved = 0;
                si++;
            }
        });
        changeMap(5, 11, 11, "The shadow kicked you out of their realm.");
        return;
    }
    below.splashPos = null;
    below.splashData = null;
    drawMapCanvas();
}

function dropTrapRocks(rockDrop, playerX, playerY, moleTeleport) {
    var curMap = below.gameData.player.currentMap;
    rockDrop.forEach(function(offset) {
        var rx = playerX + offset.dx;
        var ry = playerY + offset.dy;
        if (foundTile(rx, ry)) {
            below.gameData.mapData[curMap].obstacles.push({
                type: 9,
                position: { x: rx, y: ry }
            });
        }
    });
    if (moleTeleport) {
        var mole = below.gameData.mapData[curMap].npcs.find(function(n) { return n.type === 4; });
        if (mole && foundTile(moleTeleport.x, moleTeleport.y)) {
            mole.position = { x: moleTeleport.x, y: moleTeleport.y };
            mole.destPos = {};
            var trapD = mole.dialogOptions.find(function(d) { return d.id === "mole_trap"; });
            var normalD = mole.dialogOptions.find(function(d) { return d.id === "moleq1"; });
            if (trapD) trapD.available = true;
            if (normalD) normalD.available = false;
        }
    }
}
