document.onkeydown = checkKey;
document.onwheel = checkWheel;

function checkKey(e) {
    e = e || window.event;
    // Tab toggles help overlay
    if (e.keyCode === 9) {
        e.preventDefault();
        if (below && below.gameData) {
            toggleHelp();
        }
        return;
    }
    // Close help with Escape
    var helpOverlay = document.getElementById("helpOverlay");
    if (e.keyCode === 27 && helpOverlay.style.display !== "none" && helpOverlay.style.display !== "") {
        hideHelp();
        e.preventDefault();
        return;
    }
    // Skip cut-scene with Escape
    if (e.keyCode === 27 && below.cutScene) {
        endCutScene();
        e.preventDefault();
        return;
    }
    // Dev teleport toggle (Ctrl+Alt+P)
    if (e.ctrlKey && e.altKey && e.keyCode === 80) {
        if (below.gameData) {
            toggleTeleport();
        }
        e.preventDefault();
        return;
    }
    // Teleport overlay keyboard handling
    var teleportOverlay = document.getElementById("teleportOverlay");
    if (teleportOverlay.style.display !== "none" && teleportOverlay.style.display !== "") {
        if (e.keyCode === 13) {
            doTeleport();
        } else if (e.keyCode === 27) {
            hideTeleport();
        }
        return;
    }
    // Menu screens
    if (document.getElementById("titleScreen").style.display !== 'none') {
        handleMenuKey(e, 'titleScreen');
    }
    else if (document.getElementById("characterSelectDiv").style.display !== 'none') {
        handleMenuKey(e, 'characterSelectDiv');
    }
    else if (document.getElementById("newGameDiv").style.display !== 'none') {
        handleMenuKey(e, 'newGameDiv');
    }
    else if (document.getElementById("resumeGameDiv").style.display !== 'none') {
        handleMenuKey(e, 'resumeGameDiv');
    }
    // Map div
    else if (document.getElementById("gameDiv").style.display !== 'none') {
        if (below.splashActive) {
            if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 27) {
                hideSplash();
            }
            return;
        }
        if (below.choiceEvent) {
            handleChoiceEventKey(e);
        } else if (document.getElementById("inventoryDiv").style.display !== 'none') {
            // Close inventory on Escape or Q
            if (e.keyCode === 27 || e.keyCode === 81) {
                closeInventory();
            }
        } else {
            moveOnMap(e);
        }
    }
}

// Add event listeners for menu buttons (called once on DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function() {
    // Initialize gameData from below-gamedata.js
    if (typeof belowGameData !== 'undefined') {
        below.gameData = JSON.parse(JSON.stringify(belowGameData));
        Object.keys(below.gameData.mapData).forEach(function(mapKey) {
            var monsters = below.gameData.mapData[mapKey].monsters;
            if (monsters) {
                monsters.forEach(function(m) {
                    m._initX = m.position.x;
                    m._initY = m.position.y;
    });
    below.gameData.mapData[5].npcs.forEach(function(n) {
        if (n.type === "rotten_sisters" && n.dialogOptions) {
            for (var di = 0; di < n.dialogOptions.length; di++) {
                if (n.dialogOptions[di].id === "sisters_jester") {
                    n.dialogOptions[di].available = true;
                }
            }
        }
    });
  }
        });
    } else {
        console.error('below-gamedata.js not loaded!');
    }
    
    // Show title screen immediately
    var titleScreen = document.getElementById("titleScreen");
    if (titleScreen) {
        titleScreen.style.display = "flex";
        // Auto-select first menu item (New Game)
        var items = titleScreen.querySelectorAll('.below-front-menu-item');
        if (items.length > 0) items[0].classList.add('menu-selected');
    }
    
    // New Game button
    var newGameBtn = document.getElementById("newGameBtn");
    if (newGameBtn) {
        newGameBtn.addEventListener("click", function() {
            try {
                switchPage('newGameDiv');
            } catch(e) {
            }
        });
    } else {
    }
    
    // Continue button
    var resumeGameBtn = document.getElementById("resumeGameBtn");
    if (resumeGameBtn) {
        resumeGameBtn.addEventListener("click", function() {
            try {
                switchPage('resumeGameDiv');
            } catch(e) {
            }
        });
    } else {
    }
    
    // Character selection
    document.querySelectorAll('.below-front-menu-item[data-character]').forEach(function(item) {
        item.addEventListener("click", function() {
            selectCharacter(this.getAttribute('data-character'));
        });
    });
    
    // Splash continue button
    document.getElementById("splashBtn").addEventListener("click", hideSplash);
    
    // Initialize map 5 hide-and-seek state
    below.map5TilesMoved = 0;
    below.tagActive = false;
    below.sistersReturnContext = null;

    // Initialize fog particles
    below.fogParticles = [];
    for (var fi = 0; fi < 25; fi++) {
        below.fogParticles.push({
            x: -0.5 + Math.random() * 2.0,
            y: Math.random(),
            size: 0.8 + Math.random() * 1.2,
            opacity: 0.06 + Math.random() * 0.07,
            speed: 0.0005 + Math.random() * 0.0008,
            phase: Math.random() * Math.PI * 2
        });
    }
    
    // Start game
    startGame();
    
});

function handleMenuKey(e, menuId) {
    var menu = document.getElementById(menuId);
    var items = menu.querySelectorAll('.below-front-menu-item');
    var curIndex = -1;
    
    // Find currently selected item
    items.forEach(function(item, index) {
        if (item.classList.contains('menu-selected')) {
            curIndex = index;
        }
    });
    
    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 87 || e.keyCode === 83) {
        e.preventDefault();
        // Remove old selection
        if (curIndex >= 0) {
            items[curIndex].classList.remove('menu-selected');
        }
        // Calculate new index
        if (e.keyCode === 40 || e.keyCode === 83) { // Down
            curIndex = (curIndex + 1) % items.length;
        } else { // Up
            curIndex = (curIndex - 1 + items.length) % items.length;
        }
        items[curIndex].classList.add('menu-selected');
        items[curIndex].scrollIntoView({ block: 'nearest' });
    }
    else if (e.keyCode === 13 || e.keyCode === 69) { // Enter or E
        e.preventDefault();
        if (curIndex >= 0) {
            items[curIndex].click();
        }
    }
}

function changeMap(mapId, entryX, entryY, text) {
  // Cancel tag game if leaving map 5
  if (below.gameData.player.currentMap === 5 && below.tagActive) {
    below.tagActive = false;
    below.gameData.mapData[5].npcs.forEach(function(n) {
      n._tagFleeing = false;
      n._tagFound = false;
    });
  }
  // Reset Living Shadows on map 6 when leaving
  if (below.gameData.player.currentMap === 6) {
      below.gameData.mapData[6].monsters.forEach(function(m) {
          if (m.type === "living_shadow" && m._initX !== undefined) {
              m.position.x = m._initX;
              m.position.y = m._initY;
              m.chaseState = "idle";
              m._detectTimer = 60;
              m._chaseTilesMoved = 0;
          }
      });
  }
  below.gameData.player.currentMap = mapId;
  below.gameData.player.currentLocation.x = entryX;
  below.gameData.player.currentLocation.y = entryY;
  below.gameData.player.destinationLocation = {};
  below.gameData.mapLog = [];
  if (text) {
    addMapMessage(text);
  }
  // One-time removal of Jester and Medusa from map 1 on first visit to The Depths
  if (mapId === 3 && !below.gameData.player.depthsVisited) {
    below.gameData.player.depthsVisited = true;
    for (var ci = below.gameData.mapData[1].npcs.length - 1; ci >= 0; ci--) {
      var npcType = below.gameData.mapData[1].npcs[ci].type;
      if (npcType === "jester" || npcType === "medusa") {
        below.gameData.mapData[1].npcs.splice(ci, 1);
      }
    }
  }
  // Move Jester to map 4 on first entry to map 6
  if (mapId === 6 && !below.gameData.player.jesterMovedToMap4) {
    below.gameData.player.jesterMovedToMap4 = true;
    for (var ji = 0; ji < below.gameData.mapData.length; ji++) {
      var jnpcs = below.gameData.mapData[ji].npcs;
      for (var jni = jnpcs.length - 1; jni >= 0; jni--) {
        if (jnpcs[jni].type === "jester") {
          jnpcs.splice(jni, 1);
        }
      }
    }
    below.gameData.mapData[5].npcs.push({
      type: 2,
      position: { x: 12, y: 10 },
      movement: 0,
      dialogOptions: [{
        id: "jester_map4_sam",
        available: true,
        text: "The Jester is leaning against a rock, trying to look casual but definitely waiting for you.\n\nJESTER: 'Well, well, well! Look who's still breathing! I was starting to take bets on how long you'd last. Don't worry - I bet ON you. Mostly because the odds were terrible and I like a long shot.'\n\nHe grins, but there's something almost sincere underneath.\n\nJESTER: 'Anyway. I overheard Sam Shale knows something about what's below. Yeah, THAT Sam. The broody trenchcoat with the flashlight. Guy's all cryptic and tragic but he's got info about the deep places. Maybe go squeeze it out of him? Before you get yourself killed in a way that would make me lose my investment.'\n\nHe winks and starts juggling rocks, apparently done being helpful.",
        options: [{
          id: "jester_map4_sam_end",
          text: "Thanks... I think.",
          available: true
        }]
      }]
    });
  }
  maintainMapLog();
  updateAreaDescription();
  // Check tile splash on map entry
  var splashTile = foundTile(entryX, entryY);
  if (splashTile && splashTile.splash && !splashTile.splashSeen) {
      splashTile.splashSeen = true;
      showSplash(splashTile.splash);
  }
  drawMapCanvas();
}

function moveOnMap(e) {
    // Don't process movement if choice event is active
    if (below.choiceEvent) return;
    
    var curY = below.gameData.player.currentLocation.y,
        curX = below.gameData.player.currentLocation.x,
        playerMoved = false;
    
    if (e.keyCode === 69) {
        e.preventDefault();
        if (below.equippedItem === null) {
            addMapMessage("You have nothing equipped. Press Q to open inventory and equip an item.");
            maintainMapLog();
        } else if (below.equippedItem === "bat_swatter" && below.gameData.player.currentMap === 0) {
            var bats = below.gameData.mapData[0].monsters.filter(function(m) { return m.type === "bat"; });
            if (bats.length > 0) {
                addMapMessage("You swing the bat swatter but the bats weave through the air too fast in this darkness.");
                maintainMapLog();
            } else {
                addMapMessage("You swing the bat swatter. Nothing to hit here.");
                maintainMapLog();
            }
        } else if (below.equippedItem === "centipede_cleaner" && below.gameData.player.currentMap === 0) {
            var curMap = below.gameData.player.currentMap;
            var px = Math.round(curX);
            var py = Math.round(curY);
            var centipede = null;
            var centIdx = -1;
            for (var mi = 0; mi < below.gameData.mapData[curMap].monsters.length; mi++) {
                var m = below.gameData.mapData[curMap].monsters[mi];
                if (m.type === "centipede" && Math.round(m.position.x) === px && Math.round(m.position.y) === py) {
                    centipede = m;
                    centIdx = mi;
                    break;
                }
            }
            if (centipede) {
                below.gameData.mapData[curMap].monsters.splice(centIdx, 1);
                addMapMessage("You squirt the centipede with Crawl-End. It shrivels and dissolves.");
                maintainMapLog();
                handleAllCentipedesCleared();
            } else {
                addMapMessage("You squirt the Crawl-End on the floor. Nothing happens. There are no centipedes here.");
                maintainMapLog();
            }
        } else {
            var itemType = below.gameData.itemTypes[below.equippedItem];
            if (itemType && itemType.useText) {
                addMapMessage(itemType.useText);
                maintainMapLog();
            } else {
                addMapMessage("You use the " + (itemType ? itemType.name : "item") + " but nothing happens.");
                maintainMapLog();
            }
        }
    }
    if (e.keyCode === 81) {
        toggleInventory();
    }
    if (e.keyCode === 13) {
        e.preventDefault();
        showChoiceEvent();
        return;
    }
    if ((e.keyCode === 38 || e.keyCode === 87) && foundTile(curX, curY -1)) {
        below.gameData.player.direction = "up";
        var destY = curY - 1;
        if (isRatBlocked(curX, destY)) {
            showSplash(ratSplashData);
            return;
        }
        if (tryAutoPush(curX, destY, curX, curY) || !isBlocked(curX, destY)) {
            if (!playerMoved) {
                below.gameData.player.destinationLocation.yVelocity = -1;
                below.gameData.player.destinationLocation.y = destY;
                playerMoved = true;
            }
        } else {
            handleBlockedInteraction(curX, destY);
        }
    }
    else if ((e.keyCode === 40 || e.keyCode === 83) && foundTile(curX, curY +1)) {
        below.gameData.player.direction = "down";
        var destY = curY + 1;
        if (isRatBlocked(curX, destY)) {
            showSplash(ratSplashData);
            return;
        }
        if (tryAutoPush(curX, destY, curX, curY) || !isBlocked(curX, destY)) {
            if (!playerMoved) {
                below.gameData.player.destinationLocation.y = destY;
                below.gameData.player.destinationLocation.yVelocity = 1;
                playerMoved = true;
            }
        } else {
            handleBlockedInteraction(curX, destY);
        }
    }
    else if ((e.keyCode === 37 || e.keyCode === 65) && foundTile(curX -1, curY)) {
        below.gameData.player.direction = "left";
        var destX = curX - 1;
        if (isRatBlocked(destX, curY)) {
            showSplash(ratSplashData);
            return;
        }
        if (tryAutoPush(destX, curY, curX, curY) || !isBlocked(destX, curY)) {
            if (!playerMoved) {
                below.gameData.player.destinationLocation.xVelocity = -1;
                below.gameData.player.destinationLocation.x = destX;
                playerMoved = true;
            }
        } else {
            handleBlockedInteraction(destX, curY);
        }
    }
    else if ((e.keyCode === 39 || e.keyCode === 68) && foundTile(curX +1, curY)) {
        below.gameData.player.direction = "right";
        var destX = curX + 1;
        if (isRatBlocked(destX, curY)) {
            showSplash(ratSplashData);
            return;
        }
        if (tryAutoPush(destX, curY, curX, curY) || !isBlocked(destX, curY)) {
            if (!playerMoved) {
                below.gameData.player.destinationLocation.xVelocity = 1;
                below.gameData.player.destinationLocation.x = destX;
                playerMoved = true;
            }
        } else {
            handleBlockedInteraction(destX, curY);
        }
    }
    if (playerMoved) {        
        // Track tiles moved on map 5 for hide-and-seek unlock
        if (below.gameData.player.currentMap === 5) {
            below.map5TilesMoved = (below.map5TilesMoved || 0) + 1;
            if (below.map5TilesMoved === 50) {
                below.gameData.mapData[5].npcs.forEach(function(n) {
                    n.dialogOptions.forEach(function(d) {
                        if (d.id === "sisters_intro") {
                            d.options.forEach(function(o) {
                                if (o.id === "sisters_intro_waydeeper") o.available = true;
                            });
                        }
                    });
                });
                addMapMessage("The sisters seem more animated than before, as if expecting something.");
                maintainMapLog();
            }
        }
    }
}

function handleAllCentipedesCleared() {
    if (below.centipedesHandled) return;
    var map0 = below.gameData.mapData[0];
    var remaining = map0.monsters.filter(function(m) { return m.type === "centipede"; });
    if (remaining.length > 0) return;
    below.centipedesHandled = true;
    addMapMessage("All centipedes have been cleared from the storage room!");
    maintainMapLog();
    var hermitNpc = map0.npcs.find(function(n) { return n.type === "hermit"; });
    if (hermitNpc) {
        hermitNpc.position.x = 2;
        hermitNpc.position.y = -7;
        var doneD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_centipede_done"; });
        if (doneD) doneD.available = true;
        var introD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_centipede_intro"; });
        if (introD) introD.available = false;
    }
    drawMapCanvas();
}

function mapGameLoop() {
    // This one loops and loops
    below.tick = window.requestAnimationFrame(mapGameLoop);
    var curMap = below.gameData.player.currentMap;
    // Don't process any movement if choice event or splash is active
    if (below.choiceEvent || below.splashActive) return;
    
    // Update fog particles (drift left to right, screen-space independent of player)
    if (below.fogParticles && (curMap === 3 || curMap === 5)) {
        below.fogParticles.forEach(function(p) {
            p.x += p.speed;
            if (p.x > 1.5) p.x = -0.5;
            p.y += Math.sin(p.phase + below.tick * 0.001) * 0.0003;
        });
    }
    
    // Auto-save every 60 seconds (assuming 60fps)
    if (below.tick % (60 * 60) === 0 && below.currentSlot !== undefined) {
        saveCurrentGame();
        var saveStatus = document.getElementById("saveStatus");
        if (saveStatus) {
            var now = new Date();
            saveStatus.textContent = "Last saved: " + now.toLocaleTimeString();
            setTimeout(function() {
                saveStatus.textContent = "";
            }, 3000);
        }
    }
    
    if (below.tick % below.tickSpeed === 1) {
        // NPC movement
        below.gameData.mapData[curMap].npcs.forEach(function(npc) {
            var type = below.gameData.npcTypes[npc.type];
            if (!type) return;
            if (!npc.destPos) npc.destPos = { x: null, y: null, xVelocity: null, yVelocity: null };
            
            // Scripted path movement takes priority over random walk
            if (npc.walkPath && npc.walkPath.length > 0) {
                if (!npc.destPos.xVelocity && !npc.destPos.yVelocity) {
                    // Speed control: walkDelay = extra ticks to wait between steps
                    if (npc.walkDelay > 0) {
                        if (npc._walkTimer === undefined) npc._walkTimer = 0;
                        npc._walkTimer++;
                        if (npc._walkTimer <= npc.walkDelay) return;
                        npc._walkTimer = 0;
                    }
                    var nextStep = npc.walkPath[0];
                    var dx = nextStep.x - Math.round(npc.position.x);
                    var dy = nextStep.y - Math.round(npc.position.y);
                    if (Math.abs(dx) + Math.abs(dy) === 1 && foundTile(nextStep.x, nextStep.y) && (npc._zombieReturn || !isPathBlocked(nextStep.x, nextStep.y))) {
                        if (dx === 1) { npc.destPos.xVelocity = 1; npc.destPos.x = nextStep.x; }
                        else if (dx === -1) { npc.destPos.xVelocity = -1; npc.destPos.x = nextStep.x; }
                        else if (dy === 1) { npc.destPos.yVelocity = 1; npc.destPos.y = nextStep.y; }
                        else if (dy === -1) { npc.destPos.yVelocity = -1; npc.destPos.y = nextStep.y; }
                        npc.walkPath.shift();
                    }
                }
            } else if (npc.onPathComplete) {
                var cb = npc.onPathComplete;
                delete npc.walkPath;
                delete npc.onPathComplete;
                cb();
            } else if (npc._tagFleeing && below.tagActive) {
                // Zombie flee behavior during tag game
                if (!npc._tagFleeTimer) npc._tagFleeTimer = 0;
                npc._tagFleeTimer++;
                if (npc._tagFleeTimer < 15) return;
                npc._tagFleeTimer = 0;

                var npcX = Math.round(npc.position.x);
                var npcY = Math.round(npc.position.y);
                var plrX = Math.round(below.gameData.player.currentLocation.x);
                var plrY = Math.round(below.gameData.player.currentLocation.y);
                var dist = Math.abs(npcX - plrX) + Math.abs(npcY - plrY);

                var candidates = [];
                if (dist <= 5) {
                    // Flee: prefer direction away from player
                    var dx = npcX - plrX;
                    var dy = npcY - plrY;
                    if (Math.abs(dx) >= Math.abs(dy)) {
                        candidates.push({ x: npcX + (dx > 0 ? 1 : -1), y: npcY });
                        if (dy !== 0) candidates.push({ x: npcX, y: npcY + (dy > 0 ? 1 : -1) });
                        candidates.push({ x: npcX, y: npcY + (dy > 0 ? 1 : -1) });
                    } else {
                        candidates.push({ x: npcX, y: npcY + (dy > 0 ? 1 : -1) });
                        if (dx !== 0) candidates.push({ x: npcX + (dx > 0 ? 1 : -1), y: npcY });
                        candidates.push({ x: npcX + (dx > 0 ? 1 : -1), y: npcY });
                    }
                }
                // Always add random options as fallback
                var dirs = [{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];
                for (var ri = dirs.length - 1; ri > 0; ri--) {
                    var rj = Math.floor(Math.random() * (ri + 1));
                    var tmp = dirs[ri]; dirs[ri] = dirs[rj]; dirs[rj] = tmp;
                }
                for (var di = 0; di < dirs.length; di++) {
                    candidates.push({ x: npcX + dirs[di].x, y: npcY + dirs[di].y });
                }

                for (var ci = 0; ci < candidates.length; ci++) {
                    var cx = candidates[ci].x;
                    var cy = candidates[ci].y;
                    if (foundTile(cx, cy) && !isPathBlocked(cx, cy)) {
                        var ddx = cx - npcX;
                        var ddy = cy - npcY;
                        if (ddx === 1) { npc.destPos.xVelocity = 1; npc.destPos.x = cx; }
                        else if (ddx === -1) { npc.destPos.xVelocity = -1; npc.destPos.x = cx; }
                        else if (ddy === 1) { npc.destPos.yVelocity = 1; npc.destPos.y = cy; }
                        else if (ddy === -1) { npc.destPos.yVelocity = -1; npc.destPos.y = cy; }
                        break;
                    }
                }
            } else if (type.movement && Math.random() < type.movement) {
                var dir = (Math.floor(Math.random() * 4)) + 1;
                if (dir === 1 && foundTile(npc.position.x, npc.position.y - 1)) {
                    if (npc.position.x === below.gameData.player.currentLocation.x && npc.position.y - 1 === below.gameData.player.currentLocation.y) {
                        handleBlockedInteraction(npc.position.x, npc.position.y - 1);
                    } else if (!isBlocked(npc.position.x, npc.position.y - 1) && isTileAllowed(npc, npc.position.x, npc.position.y - 1)) {
                        npc.destPos.yVelocity = -1;
                        npc.destPos.y = npc.position.y - 1;
                    }
                }
                else if (dir === 2 && foundTile(npc.position.x, npc.position.y + 1)) {
                    if (npc.position.x === below.gameData.player.currentLocation.x && npc.position.y + 1 === below.gameData.player.currentLocation.y) {
                        handleBlockedInteraction(npc.position.x, npc.position.y + 1);
                    } else if (!isBlocked(npc.position.x, npc.position.y + 1) && isTileAllowed(npc, npc.position.x, npc.position.y + 1)) {
                        npc.destPos.yVelocity = 1;
                        npc.destPos.y = npc.position.y + 1;
                    }
                }
                else if (dir === 3 && foundTile(npc.position.x - 1, npc.position.y)) {
                    if (npc.position.x - 1 === below.gameData.player.currentLocation.x && npc.position.y === below.gameData.player.currentLocation.y) {
                        handleBlockedInteraction(npc.position.x - 1, npc.position.y);
                    } else if (!isBlocked(npc.position.x - 1, npc.position.y) && isTileAllowed(npc, npc.position.x - 1, npc.position.y)) {
                        npc.destPos.xVelocity = -1;
                        npc.destPos.x = npc.position.x - 1;
                    }
                }
                else if (dir === 4 && foundTile(npc.position.x + 1, npc.position.y)) {
                    if (npc.position.x + 1 === below.gameData.player.currentLocation.x && npc.position.y === below.gameData.player.currentLocation.y) {
                        handleBlockedInteraction(npc.position.x + 1, npc.position.y);
                    } else if (!isBlocked(npc.position.x + 1, npc.position.y) && isTileAllowed(npc, npc.position.x + 1, npc.position.y)) {
                        npc.destPos.xVelocity = 1;
                        npc.destPos.x = npc.position.x + 1;
                    }
                }
            }
        });
    }
    var moving = false;
    // Player moving?
    if (below.gameData.player.destinationLocation.xVelocity || below.gameData.player.destinationLocation.yVelocity) moving = true;
    // Monster moving (decorative continuous movement)
    if (!moving) {
        (below.gameData.mapData[curMap].monsters || []).forEach(function(monster) {
            if (monster.moveAngle !== undefined) {
                moving = true;
                return;
            }
        });
    }
    if (!moving) {
        below.gameData.mapData[curMap].npcs.forEach(function(npc) {
            if (npc.destPos && (npc.destPos.xVelocity || npc.destPos.yVelocity)) {
                moving = true;
                return;
            }
        });
    }
    // Figure out if anything is moving and move it
    if (moving) {
        if (below.gameData.player.destinationLocation.xVelocity) {
            below.gameData.player.currentLocation.x += (below.gameData.player.destinationLocation.xVelocity/below.tickSpeed);
            if (below.tick % below.tickSpeed === 0) {
                below.gameData.player.currentLocation.x = below.gameData.player.destinationLocation.x;
                below.gameData.player.destinationLocation.xVelocity = null;
                var tile = foundTile(below.gameData.player.currentLocation.x, below.gameData.player.currentLocation.y);
                if (tile && tile['text']) {
                    addMapMessage(tile['text']);
                    maintainMapLog();
                }
                updateAreaDescription();
                // Check tile splash on arrival
                var splashTile = foundTile(below.gameData.player.currentLocation.x, below.gameData.player.currentLocation.y);
                if (splashTile && splashTile.splash && !splashTile.splashSeen) {
                    splashTile.splashSeen = true;
                    showSplash(splashTile.splash);
                }
                saveCurrentGame();
            }
        }
        if (below.gameData.player.destinationLocation.yVelocity) {
            below.gameData.player.currentLocation.y += (below.gameData.player.destinationLocation.yVelocity/below.tickSpeed);
            if (below.tick % below.tickSpeed === 0) {
                below.gameData.player.currentLocation.y = below.gameData.player.destinationLocation.y;
                below.gameData.player.destinationLocation.yVelocity = null;
                var tile = foundTile(below.gameData.player.currentLocation.x, below.gameData.player.currentLocation.y);
                if (tile && tile['text']) {
                    addMapMessage(tile['text']);
                    maintainMapLog();
                }
                updateAreaDescription();
                // Check tile splash on arrival
                var splashTile = foundTile(below.gameData.player.currentLocation.x, below.gameData.player.currentLocation.y);
                if (splashTile && splashTile.splash && !splashTile.splashSeen) {
                    splashTile.splashSeen = true;
                    showSplash(splashTile.splash);
                }
                saveCurrentGame();
            }
        }
        // Check for map exits when player has settled
        if (!below.gameData.player.destinationLocation.xVelocity && !below.gameData.player.destinationLocation.yVelocity) {
            var exits = below.gameData.mapData[curMap].exits;
            if (exits) {
                var exit = exits.find(function(e) {
                    return e.position.x === below.gameData.player.currentLocation.x && e.position.y === below.gameData.player.currentLocation.y;
                });
                if (exit && !below.cutScene) {
                    var targetX = exit.targetPosition.x;
                    var targetY = exit.targetPosition.y;
                    if (exit.targetMap === 2) {
                        if (below.gameData.player.mazeCycle === undefined) below.gameData.player.mazeCycle = 0;
                        var mazeEntries = [[3, 10], [42, 10], [3, 32]];
                        var cycle = below.gameData.player.mazeCycle % 3;
                        targetX = mazeEntries[cycle][0];
                        targetY = mazeEntries[cycle][1];
                        below.gameData.player.mazeCycle = (cycle + 1) % 3;
                        // Reposition the Mole to the current maze area
                        var molePositions = [[5, 10], [41, 10], [5, 32]];
                        var mole = below.gameData.mapData[2].npcs.find(function(n) { return n.type === "mole"; });
                        if (mole) {
                            mole.position = { x: molePositions[cycle][0], y: molePositions[cycle][1] };
                            mole.destPos = {};
                        }
                    }
                    // Trigger "after_map0" cut-scene when leaving map 0 for map 1 the first time
                    if (curMap === 0 && exit.targetMap === 1 && !below.gameData.player.cutScenePlayed.after_map0) {
                        below.gameData.player.cutScenePlayed.after_map0 = true;
                        playCutScene("after_map0", function() {
                            changeMap(exit.targetMap, targetX, targetY, exit.text);
                        });
                    }
                    // Trigger "after_map5" cut-scene when leaving map 5 for map 6 the first time
                    else if (curMap === 5 && exit.targetMap === 6 && !below.gameData.player.cutScenePlayed.after_map5) {
                        below.gameData.player.cutScenePlayed.after_map5 = true;
                        playCutScene("after_map5", function() {
                            changeMap(exit.targetMap, targetX, targetY, exit.text);
                        });
                    } else {
                        changeMap(exit.targetMap, targetX, targetY, exit.text);
                    }
                }
            }
        }
        // Free continuous movement for decorative monsters
        // Bat seeking behavior — bats on map 0 seek light at (-12,-2) when door at (-9,-2) is open
        var batDoorOpen = false;
        if (curMap === 0) {
            var batDoor = below.gameData.mapData[0].obstacles.find(function(o) {
                return o.position.x === -9 && o.position.y === -2;
            });
            batDoorOpen = batDoor && !batDoor.closed;
        }

        (below.gameData.mapData[curMap].monsters || []).forEach(function(monster) {
            var type = below.gameData.monsterTypes[monster.type];
            if (!type || !type.movement) return;

            // Flashlight destroys Living Shadows
            if (monster.type === "living_shadow") {
                if (monster._fadingTimer > 0) {
                    monster._fadingTimer--;
                    if (monster._fadingTimer <= 0) monster.removeMe = true;
                    return;
                }
                if (below.equippedItem === "flashlight") {
                    var fPx = Math.round(below.gameData.player.currentLocation.x);
                    var fPy = Math.round(below.gameData.player.currentLocation.y);
                    var fDir = below.gameData.player.direction || "down";
                    var fOffsets = getConeOffsets(fDir);
                    var mtx = Math.round(monster.position.x);
                    var mty = Math.round(monster.position.y);
                    for (var fi = 0; fi < fOffsets.length; fi++) {
                        if (fPx + fOffsets[fi][0] === mtx && fPy + fOffsets[fi][1] === mty) {
                            monster._fadingTimer = 180;
                            monster.chaseState = "idle";
                            return;
                        }
                    }
                }
            }

            // Seeking bats — direct movement toward light, no collision checks
            if (batDoorOpen && monster.type === "bat") {
                var dx = -12 - monster.position.x;
                var dy = -2 - monster.position.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 0.4) {
                    monster.removeMe = true;
                    return;
                }
                var speed = monster.speed !== undefined ? monster.speed : 0.015 * type.movement * 3;
                monster.position.x += Math.cos(Math.atan2(dy, dx)) * speed;
                monster.position.y += Math.sin(Math.atan2(dy, dx)) * speed;
                return;
            } else {
                if (monster.restTimer === undefined) monster.restTimer = 0;
                if (monster.moveAngle === undefined) {
                    monster.moveAngle = Math.random() * Math.PI * 2;
                }
                if (monster.restTimer > 0) {
                    monster.restTimer--;
                    return;
                }
                if (monster.directionTimer === undefined || monster.directionTimer <= 0) {
                    var restChance = type.restChance || 0;
                    if (Math.random() < restChance) {
                        monster.restTimer = Math.floor(Math.random() * 60) + 30;
                        monster.directionTimer = 0;
                        return;
                    }
                    monster.moveAngle = Math.random() * Math.PI * 2;
                    monster.directionTimer = Math.floor(Math.random() * 60) + 60;
                }
                monster.directionTimer--;
            }
            // Living Shadow chase behavior
            if (type.chaseDistance && type.chaseDistance > 0) {
                var px = below.gameData.player.currentLocation.x;
                var py = below.gameData.player.currentLocation.y;
                var monsterTX = Math.round(monster.position.x);
                var monsterTY = Math.round(monster.position.y);
                var playerTX = Math.round(px);
                var playerTY = Math.round(py);
                var tileDist = Math.abs(monsterTX - playerTX) + Math.abs(monsterTY - playerTY);
                if (!monster.chaseState || monster.chaseState === "idle") {
                    if (tileDist <= type.chaseDistance) {
                        monster.chaseState = "detected";
                        monster._detectTimer = 60;
                        monster._chaseTilesMoved = 0;
                        monster._playerTileX = playerTX;
                        monster._playerTileY = playerTY;
                    }
                }
                if (monster.chaseState === "detected") {
                    monster._detectTimer--;
                    if (monster._detectTimer <= 0) {
                        monster.chaseState = "chasing";
                    }
                    return;
                }
                if (monster.chaseState === "chasing") {
                    if (monster._playerTileX !== playerTX || monster._playerTileY !== playerTY) {
                        monster._chaseTilesMoved++;
                        monster._playerTileX = playerTX;
                        monster._playerTileY = playerTY;
                    }
                    if (monster._chaseTilesMoved >= type.chaseDistance * 2) {
                        monster.chaseState = "idle";
                    } else {
                        var bestDx = 0, bestDy = 0, bestScore = Infinity;
                        var dirs = [[-1,0],[1,0],[0,-1],[0,1]];
                        for (var di = 0; di < 4; di++) {
                            var nx = monsterTX + dirs[di][0];
                            var ny = monsterTY + dirs[di][1];
                            if (foundTile(nx, ny) && !isBlocked(nx, ny) && isTileAllowed(monster, nx, ny)) {
                                var score = Math.abs(nx - playerTX) + Math.abs(ny - playerTY);
                                if (score < bestScore) {
                                    bestScore = score;
                                    bestDx = dirs[di][0];
                                    bestDy = dirs[di][1];
                                }
                            }
                        }
                        if (bestDx !== 0 || bestDy !== 0) {
                            var chaseSpeed = 0.045;
                            var targetX = monsterTX + bestDx;
                            var targetY = monsterTY + bestDy;
                            var dx2 = targetX - monster.position.x;
                            var dy2 = targetY - monster.position.y;
                            var d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                            if (d2 > 0.05) {
                                monster.position.x += (dx2 / d2) * chaseSpeed;
                                monster.position.y += (dy2 / d2) * chaseSpeed;
                            } else {
                                monster.position.x = targetX;
                                monster.position.y = targetY;
                            }
                        } else {
                            monster.moveAngle = Math.atan2(py - monster.position.y, px - monster.position.x);
                        }
                    }
                    // Check if shadow caught the player
                    var catchTx = Math.round(monster.position.x);
                    var catchTy = Math.round(monster.position.y);
                    if (catchTx === playerTX && catchTy === playerTY && !below._shadowCatchHandled) {
                        below._shadowCatchHandled = true;
                        below.gameData.player.destinationLocation = {};
                        showSplash({
                            image: "shadow_dialog.png",
                            text: "You are not supposed to be here, child. Let me save you from the lurking horror deeper down.",
                            shake: true
                        });
                        return;
                    }
                    return;
                }
            }
            var speed = monster.speed !== undefined ? monster.speed : 0.015 * type.movement * 3;
            var newX = monster.position.x + Math.cos(monster.moveAngle) * speed;
            var newY = monster.position.y + Math.sin(monster.moveAngle) * speed;
            var tileX = Math.round(newX);
            var tileY = Math.round(newY);
            if (foundTile(tileX, tileY) && !isBlocked(tileX, tileY) && isTileAllowed(monster, tileX, tileY)) {
                monster.position.x = newX;
                monster.position.y = newY;
            } else {
                monster.moveAngle = Math.random() * Math.PI * 2;
            }
        });
        // Flashlight melts Shadow Walls
        (below.gameData.mapData[curMap].obstacles || []).forEach(function(obstacle) {
            if (obstacle.type !== "shadow_wall") return;
            if (obstacle._fadingTimer > 0) {
                obstacle._fadingTimer--;
                if (obstacle._fadingTimer <= 0) {
                    var idx = below.gameData.mapData[curMap].obstacles.indexOf(obstacle);
                    if (idx !== -1) below.gameData.mapData[curMap].obstacles.splice(idx, 1);
                }
                return;
            }
            if (below.equippedItem === "flashlight") {
                var fPx = Math.round(below.gameData.player.currentLocation.x);
                var fPy = Math.round(below.gameData.player.currentLocation.y);
                var fDir = below.gameData.player.direction || "down";
                var fOffsets = getConeOffsets(fDir);
                var stx = obstacle.position.x;
                var sty = obstacle.position.y;
                for (var fi = 0; fi < fOffsets.length; fi++) {
                    if (fPx + fOffsets[fi][0] === stx && fPy + fOffsets[fi][1] === sty) {
                        obstacle._fadingTimer = 180;
                        break;
                    }
                }
            }
        });

        // Remove bats that reached the light
        var removedCount = 0;
        if (below.gameData.mapData[curMap].monsters) {
            below.gameData.mapData[curMap].monsters = below.gameData.mapData[curMap].monsters.filter(function(m) {
                if (m.removeMe) {
                    removedCount++;
                    return false;
                }
                return true;
            });
        }
        if (removedCount > 0) {
            var remaining = (below.gameData.mapData[curMap].monsters || []).filter(function(m) { return m.type === "bat"; });
            if (remaining.length === 0) {
                addMapMessage("The last bat vanishes into the light. The passage is clear.");
                maintainMapLog();
                // Move Hermit to centipede quest position
                var hermitNpc = below.gameData.mapData[0].npcs.find(function(n) { return n.type === "hermit"; });
                if (hermitNpc) {
                    hermitNpc.position.x = -4;
                    hermitNpc.position.y = -3;
                    hermitNpc.dialogOptions.forEach(function(d) { d.available = false; });
                    var centIntro = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_centipede_intro"; });
                    if (centIntro) centIntro.available = true;
                }
            }
        }
        // Safety check: centipedes all cleared (fires once)
        if (!below.centipedesHandled && below.gameData.player.currentMap === 0) {
            if (below.centipedeCheckTick === undefined) below.centipedeCheckTick = 0;
            below.centipedeCheckTick++;
            if (below.centipedeCheckTick % 60 === 0) {
                handleAllCentipedesCleared();
            }
        }
        below.gameData.mapData[curMap].npcs.forEach(function(npc) {
            if (npc.destPos && npc.destPos.xVelocity) {
                npc.position.x += (npc.destPos.xVelocity/below.tickSpeed);
                if (below.tick % below.tickSpeed === 0) {
                    npc.position.x = npc.destPos.x;
                    npc.destPos.xVelocity = null;
                    saveCurrentGame();
                }
            }
            if (npc.destPos && npc.destPos.yVelocity) {
                npc.position.y += (npc.destPos.yVelocity/below.tickSpeed);
                if (below.tick % below.tickSpeed === 0) {
                    npc.position.y = npc.destPos.y;
                    npc.destPos.yVelocity = null;
                    saveCurrentGame();
                }
            }
        });
    }
    
    // Draw current map every frame for smooth fog/lamp glow animation
    drawMapCanvas();
}

function startGame() {
    respondToVisibility(document.getElementById("gameDiv"), visible => {
        const feedbackEl = document.getElementById("visibilityFeedback");
        if(visible) {
            drawMapCanvas();
            mapGameLoop();
        }
    });
}
