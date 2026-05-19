const below = {
    tick: undefined,
    tickSpeed: 5,
    version: '0.0.1',
    c64Colors: ["#000000","#FFFFFF","#68372B","#70A4B2","#6F3D86","#588D43","352879","#B8C76F",
                "#6F4F25","#433900","#9A6759","#444444","#6C6C6C","#9AD284","#6C5EB5","#959595"],
    pages: ["cutSceneDiv", "titleScreen", "resumeGameDiv", "gameDiv", "newGameDiv", "characterSelectDiv"],
    currentSlot: undefined,
    choiceEvent: null,
    splashActive: false,
    equippedItem: null,
    cutScene: null,
    cutSceneCuts: null,
    cutSceneIndex: 0,
    cutSceneStart: null,
    cutSceneCallback: null,
    cutScenePlayed: {},
    gameData: null // Loaded from gamedata.js
};

// Dev teleport — callable from console: below.teleport(mapId, x, y)
below.teleport = function(mapId, x, y) {
    if (!below.gameData || !below.gameData.mapData[mapId]) return;
    if (below.choiceEvent) closeChoiceEvent();
    if (below.splashActive) hideSplash();
    closeInventory();
    var text = "Teleported to map " + mapId + " at (" + x + ", " + y + ")";
    changeMap(mapId, x, y, text);
};

function showTeleport() {
    if (!below.gameData) return;
    document.getElementById("teleportOverlay").style.display = "flex";
    document.getElementById("teleportMap").value = below.gameData.player.currentMap;
    document.getElementById("teleportX").value = Math.round(below.gameData.player.currentLocation.x);
    document.getElementById("teleportY").value = Math.round(below.gameData.player.currentLocation.y);
    document.getElementById("teleportMap").focus();
    document.getElementById("teleportMap").select();
}

function hideTeleport() {
    document.getElementById("teleportOverlay").style.display = "none";
}

function doTeleport() {
    var mapId = parseInt(document.getElementById("teleportMap").value) || 0;
    var x = parseInt(document.getElementById("teleportX").value) || 0;
    var y = parseInt(document.getElementById("teleportY").value) || 0;
    below.teleport(mapId, x, y);
    hideTeleport();
    drawMapCanvas();
}

function toggleTeleport() {
    var overlay = document.getElementById("teleportOverlay");
    if (overlay.style.display === "none" || overlay.style.display === "") {
        showTeleport();
    } else {
        hideTeleport();
    }
}

// Save slot utility functions
function getSaveObject() {
    var saveObj = localStorage["below"];
    if (!saveObj) {
        var initial = { saves: [null, null, null] };
        localStorage["below"] = JSON.stringify(initial);
        return initial;
    }
    var parsed = JSON.parse(saveObj);
    if (!parsed.saves || parsed.saves.length !== 3) {
        parsed.saves = [null, null, null];
        localStorage["below"] = JSON.stringify(parsed);
    }
    return parsed;
}

function saveToSlot(slotIndex, gameData) {
    var saveObj = getSaveObject();
    // Add save date
    gameData.saveDate = new Date().toISOString();
    saveObj.saves[slotIndex] = JSON.parse(JSON.stringify(gameData));
    localStorage["below"] = JSON.stringify(saveObj);
}

function loadFromSlot(slotIndex) {
    var saveObj = getSaveObject();
    return saveObj.saves[slotIndex];
}

function updateSlotColors(menuId) {
    var menu = document.getElementById(menuId);
    if (!menu) return;
    var slots = menu.querySelectorAll('.below-front-menu-item');
    slots.forEach(function(slotEl) {
        var slotIndex = parseInt(slotEl.getAttribute('data-slot'));
        var saved = loadFromSlot(slotIndex);
        // Clear existing content
        var slotText = slotEl.getAttribute('data-original-text') || slotEl.textContent;
        slotEl.setAttribute('data-original-text', slotText);
        
        if (saved) {
            slotEl.classList.add('slot-initiated');
            // Show save date if available
            if (saved.saveDate) {
                var date = new Date(saved.saveDate);
                slotEl.textContent = slotText + ' (' + date.toLocaleDateString() + ')';
            } else {
                slotEl.textContent = slotText + ' (Saved)';
            }
        } else {
            slotEl.classList.remove('slot-initiated');
            slotEl.textContent = slotText;
        }
    });
    // Select first item
    slots.forEach(function(slotEl, index) {
        if (index === 0) {
            slotEl.classList.add('menu-selected');
        } else {
            slotEl.classList.remove('menu-selected');
        }
    });
}

function startNewGame(slotIndex) {
    var existing = loadFromSlot(slotIndex);
    if (existing) {
        if (!confirm('This slot already has saved data. Overwrite?')) {
            return;
        }
    }
    // Set save date for new game
    below.gameData.saveDate = new Date().toISOString();
    below.newGameSlot = slotIndex;
    switchPage('characterSelectDiv');
}

function selectCharacter(character) {
    var slotIndex = below.newGameSlot;
    var initialData = JSON.parse(JSON.stringify(below.gameData));
    initialData.player.icon = character + ".png";
    saveToSlot(slotIndex, initialData);
    below.gameData = initialData;
    below.currentSlot = slotIndex;
    switchPage('gameDiv');
}

function mergeDialogOptions(savedData) {
    if (typeof belowGameData === 'undefined') return;
    var freshMaps = belowGameData.mapData;
    var savedMaps = savedData.mapData;
    
    // Remove stale dialog IDs from saved data (dialogs that no longer exist in fresh data)
    var staleDialogIds = ["hermitq1", "hermitq2", "hermitq3", "hermitq4", "hermitq5", "hermitq10"];
    savedMaps.forEach(function(map) {
        if (!map.npcs) return;
        map.npcs.forEach(function(npc) {
            if (!npc.dialogOptions) return;
            npc.dialogOptions = npc.dialogOptions.filter(function(d) {
                return staleDialogIds.indexOf(d.id) === -1;
            });
        });
    });
    
    // Add any maps from fresh data that don't exist in saved data
    freshMaps.forEach(function(freshMap, mapIndex) {
        if (!savedMaps[mapIndex]) {
            savedMaps.push(JSON.parse(JSON.stringify(freshMap)));
        }
    });
    
    freshMaps.forEach(function(freshMap, mapIndex) {
        if (!freshMap.npcs || !savedMaps[mapIndex]) return;
        freshMap.npcs.forEach(function(freshNpc) {
            if (!freshNpc.dialogOptions) return;
            var savedNpc = savedMaps[mapIndex].npcs.find(function(n) {
                return n.type === freshNpc.type &&
                       n.position && freshNpc.position &&
                       n.position.x === freshNpc.position.x &&
                       n.position.y === freshNpc.position.y;
            });
            if (!savedNpc) return;
            if (!savedNpc.dialogOptions) {
                savedNpc.dialogOptions = JSON.parse(JSON.stringify(freshNpc.dialogOptions));
                return;
            }
            freshNpc.dialogOptions.forEach(function(freshDialog) {
                var savedDialog = savedNpc.dialogOptions.find(function(d) { return d.id === freshDialog.id; });
                if (!savedDialog) {
                    savedNpc.dialogOptions.push(JSON.parse(JSON.stringify(freshDialog)));
                } else {
                    // Copy any missing properties from fresh dialog to saved dialog
                    Object.keys(freshDialog).forEach(function(key) {
                        if (savedDialog[key] === undefined) {
                            savedDialog[key] = JSON.parse(JSON.stringify(freshDialog[key]));
                        }
                    });
                }
            });
        });
    });
}

function syncGameData() {
    if (typeof belowGameData === 'undefined') {
        alert('gamedata.js not loaded!');
        return;
    }
    var fresh = JSON.parse(JSON.stringify(belowGameData));
    var curData = below.gameData;
    if (!curData) { alert('No active game to sync!'); return; }
    
    // 1. Update type definitions (schema, not state)
    curData.tileTypes = JSON.parse(JSON.stringify(fresh.tileTypes));
    curData.monsterTypes = JSON.parse(JSON.stringify(fresh.monsterTypes));
    curData.obstacleTypes = JSON.parse(JSON.stringify(fresh.obstacleTypes));
    curData.npcTypes = JSON.parse(JSON.stringify(fresh.npcTypes));
    curData.itemTypes = JSON.parse(JSON.stringify(fresh.itemTypes));
    
    // 2. Merge map data — add new tiles, obstacles, NPCs, monsters; update exits and areas
    fresh.mapData.forEach(function(freshMap, mapIndex) {
        if (!curData.mapData[mapIndex]) {
            curData.mapData[mapIndex] = JSON.parse(JSON.stringify(freshMap));
            return;
        }
        var curMap = curData.mapData[mapIndex];
        
        // Map metadata
        curMap.id = freshMap.id;
        curMap.name = freshMap.name;
        curMap.defaultDescription = freshMap.defaultDescription;
        
        // Tiles: add new tiles from fresh data, keep existing
        Object.keys(freshMap.tiles || {}).forEach(function(key) {
            if (!curMap.tiles[key]) {
                curMap.tiles[key] = JSON.parse(JSON.stringify(freshMap.tiles[key]));
            }
        });
        
        // Area descriptions: replace entirely
        curMap.areaDescriptions = JSON.parse(JSON.stringify(freshMap.areaDescriptions || []));
        
        // Exits: replace entirely (these aren't stateful)
        curMap.exits = JSON.parse(JSON.stringify(freshMap.exits || []));
        
        // Obstacles: add new ones from fresh data, keep existing instance state
        (freshMap.obstacles || []).forEach(function(freshObs) {
            if (!freshObs.position) return;
            var fw = freshObs.width || 1;
            var fh = freshObs.height || 1;
            var exists = (curMap.obstacles || []).some(function(o) {
                if (!o.position) return false;
                // Check if any tile of the fresh obstacle overlaps with any tile of the existing obstacle
                for (var fdx = 0; fdx < fw; fdx++) {
                    for (var fdy = 0; fdy < fh; fdy++) {
                        if (obstacleOccupies(o, freshObs.position.x + fdx, freshObs.position.y + fdy)) {
                            return true;
                        }
                    }
                }
                return false;
            });
            if (!exists) {
                curMap.obstacles.push(JSON.parse(JSON.stringify(freshObs)));
            }
        });
        
        // Monsters: add new ones from fresh data, keep existing instance state
        (freshMap.monsters || []).forEach(function(freshMon) {
            if (!freshMon.position) return;
            var exists = (curMap.monsters || []).some(function(m) {
                return m.position && m.position.x === freshMon.position.x && m.position.y === freshMon.position.y;
            });
            if (!exists) {
                curMap.monsters.push(JSON.parse(JSON.stringify(freshMon)));
            }
        });
        
        // NPCs: add new, merge dialog options on existing (match by type, not position — NPCs can move)
        (freshMap.npcs || []).forEach(function(freshNpc) {
            var existing = (curMap.npcs || []).find(function(n) {
                return n.type === freshNpc.type;
            });
            if (!existing) {
                curMap.npcs.push(JSON.parse(JSON.stringify(freshNpc)));
            } else if (freshNpc.dialogOptions) {
                if (!existing.dialogOptions) {
                    existing.dialogOptions = JSON.parse(JSON.stringify(freshNpc.dialogOptions));
                } else {
                    freshNpc.dialogOptions.forEach(function(freshDialog) {
                        var existingDialog = existing.dialogOptions.find(function(d) { return d.id === freshDialog.id; });
                        if (!existingDialog) {
                            existing.dialogOptions.push(JSON.parse(JSON.stringify(freshDialog)));
                        } else {
                            Object.keys(freshDialog).forEach(function(key) {
                                if (existingDialog[key] === undefined) {
                                    existingDialog[key] = JSON.parse(JSON.stringify(freshDialog[key]));
                                }
                            });
                        }
                    });
                }
            }
        });
    });
    
    // 3. Update area description and redraw
    updateAreaDescription();
    drawMapCanvas();
    below.gameData.mapLog.push("Game data synced from gamedata.js.");
    maintainMapLog();
}

function setDialogAvailable(dialogIds, available) {
    if (!below.gameData) return;
    below.gameData.mapData.forEach(function(map) {
        if (!map.npcs) return;
        map.npcs.forEach(function(npc) {
            if (!npc.dialogOptions) return;
            npc.dialogOptions.forEach(function(dialog) {
                if (dialogIds.indexOf(dialog.id) !== -1) {
                    dialog.available = available;
                }
            });
        });
    });
}

function continueGame(slotIndex) {
    var saved = loadFromSlot(slotIndex);
    if (!saved) {
        alert('No saved game in this slot.');
        return;
    }
    below.gameData = JSON.parse(JSON.stringify(saved));
    mergeDialogOptions(below.gameData);
    below.currentSlot = slotIndex;
    switchPage('gameDiv');
}

function saveCurrentGame() {
    if (below.currentSlot !== undefined) {
        saveToSlot(below.currentSlot, below.gameData);
    }
}

var boss2Img = new Image();
boss2Img.src = "images/boss2.png";

var batImg = new Image();
batImg.src = "images/bat.png";

var ratImg = new Image();
ratImg.src = "images/rat.png";

var boyImg = new Image();
boyImg.src = "images/boy.png";

var girlImg = new Image();
girlImg.src = "images/girl.png";

var centipedeImg = new Image();
centipedeImg.src = "images/centipede.png";

var hermitImg = new Image();
hermitImg.src = "images/hermit.png";

var hermitDialogImg = new Image();
hermitDialogImg.src = "images/hermit_dialog.png";

var jesterImg = new Image();
jesterImg.src = "images/jester.png";

var merchantImg = new Image();
merchantImg.src = "images/merchant.png";

var medusaImg = new Image();
medusaImg.src = "images/medusa.png";

var moleImg = new Image();
moleImg.src = "images/mole.png";

var detectiveImg = new Image();
detectiveImg.src = "images/detective.png";

var shipImg = new Image();
shipImg.src = "images/ship.png";

var charonImg = new Image();
charonImg.src = "images/charon.png";

var charonDialogImg = new Image();
charonDialogImg.src = "images/charon_dialog.png";

var sisters1Img = new Image();
sisters1Img.src = "images/sisters1.png";

var sisters2Img = new Image();
sisters2Img.src = "images/sisters2.png";

var sistersDialogImg = new Image();
sistersDialogImg.src = "images/sisters_dialog.png";

var ratsDialogImg = new Image();
ratsDialogImg.src = "images/rats_dialog.png";

var batsDialogImg = new Image();
batsDialogImg.src = "images/bats_dialog.png";

var centipedesDialogImg = new Image();
centipedesDialogImg.src = "images/centipedes_dialog.png";

var tableImg = new Image();
tableImg.src = "images/table.png";

var keyImg = new Image();
keyImg.src = "images/key1.png";

var bloodImg = new Image();
bloodImg.src = "images/blood.png";

var rockImg = new Image();
rockImg.src = "images/rock.png";

var rock2x1Img = new Image();
rock2x1Img.src = "images/rock_2x1.png";

var rock1x2Img = new Image();
rock1x2Img.src = "images/rock_1x2.png";

var rock2x2Img = new Image();
rock2x2Img.src = "images/rock_2x2.png";

var mushroomBlueImg = new Image();
mushroomBlueImg.src = "images/mushroom_blue.png";

var mushroomPurpleImg = new Image();
mushroomPurpleImg.src = "images/mushroom_purple.png";

var mushroomYellowImg = new Image();
mushroomYellowImg.src = "images/mushroom_yellow.png";

var crystalPinkImg = new Image();
crystalPinkImg.src = "images/crystal_pink.png";

var cupboardImg = new Image();
cupboardImg.src = "images/cupboard.png";

var lightbeamImg = new Image();
lightbeamImg.src = "images/lightbeam.png";

var lamppostImg = new Image();
lamppostImg.src = "images/lamppost.png";

var doorClosedImg = new Image();
doorClosedImg.src = "images/door_closed.png";

var doorOpenImg = new Image();
doorOpenImg.src = "images/door_open.png";

var exitImg = new Image();
exitImg.src = "images/exit.png";

var gemImg = new Image();
gemImg.src = "images/gem.png";

var shimmerWallClosedImg = new Image();
shimmerWallClosedImg.src = "images/shimmer_wall_closed.png";
var shimmerWallOpenImg = new Image();
shimmerWallOpenImg.src = "images/shimmer_wall_open.png";

var statueImg1 = new Image();
statueImg1.src = "images/statue1.png";
var statueImg2 = new Image();
statueImg2.src = "images/statue2.png";
var statueImg3 = new Image();
statueImg3.src = "images/statue3.png";
var statueImg4 = new Image();
statueImg4.src = "images/statue4.png";
var statueImg5 = new Image();
statueImg5.src = "images/statue5.png";
var statueImg6 = new Image();
statueImg6.src = "images/statue6.png";

var crateImg = new Image();
crateImg.src = "images/crate.png";
var barrelImg = new Image();
barrelImg.src = "images/barrel.png";
var rudderImg = new Image();
rudderImg.src = "images/rudder.png";
var mastImg = new Image();
mastImg.src = "images/mast.png";
var steeringWheelImg = new Image();
steeringWheelImg.src = "images/steering_wheel.png";
var sailImg = new Image();
sailImg.src = "images/sail.png";

var antidoteImg = new Image();
antidoteImg.src = "images/antidote.png";

var bedImg = new Image();
bedImg.src = "images/bed.png";
var chairImg = new Image();
chairImg.src = "images/chair.png";

window.onbeforeunload = confirmExit;
function confirmExit() {
    saveCurrentGame();
    return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
}

document.onkeydown = checkKey;
document.onwheel = checkWheel;

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

function showHelp() {
    document.getElementById("helpOverlay").style.display = "flex";
}
function hideHelp() {
    document.getElementById("helpOverlay").style.display = "none";
}
function toggleHelp() {
    var overlay = document.getElementById("helpOverlay");
    if (overlay.style.display === "none" || overlay.style.display === "") {
        showHelp();
    } else {
        hideHelp();
    }
}

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

// Export current save to JSON file
function exportSave() {
    if (below.currentSlot === undefined) {
        alert('No active game to export!');
        return;
    }
    var saveObj = getSaveObject();
    var saveData = saveObj.saves[below.currentSlot];
    if (!saveData) {
        alert('No saved game in current slot!');
        return;
    }
    var jsonStr = JSON.stringify(saveData, null, 4);
    var blob = new Blob([jsonStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'below-save-slot-' + below.currentSlot + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import save from JSON file
function importSave() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        var file = e.target.files[0];
        if (!file) return;
        
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                var saveData = JSON.parse(e.target.result);
                // Validate save data
                if (!saveData.player || !saveData.mapData) {
                    alert('Invalid save file!');
                    return;
                }
                // Ask which slot to import to
                var slotStr = prompt('Which slot to import to? (0, 1, or 2)', '0');
                var slotIndex = parseInt(slotStr);
                if (isNaN(slotIndex) || slotIndex < 0 || slotIndex > 2) {
                    alert('Invalid slot!');
                    return;
                }
                saveToSlot(slotIndex, saveData);
                alert('Save imported to slot ' + slotIndex + '!');
                // Update UI
                updateSlotColors('newGameDiv');
                updateSlotColors('resumeGameDiv');
            } catch(err) {
                alert('Error reading save file: ' + err.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Add event listeners for menu buttons (called once on DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function() {
    // Initialize gameData from gamedata.js
    if (typeof belowGameData !== 'undefined') {
        below.gameData = JSON.parse(JSON.stringify(belowGameData));
        console.log('Game data loaded from gamedata.js');
    } else {
        console.error('gamedata.js not loaded!');
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

function scrollLogToBottom() {
    var el = document.getElementById("gameLogDiv");
    if (el) el.scrollTop = el.scrollHeight;
}

function showChoiceEvent() {
    var x = below.gameData.player.currentLocation.x;
    var y = below.gameData.player.currentLocation.y;
    var msg = getBlockedMessage(x, y) || "You search the area...";
    below.choiceEvent = {
        selectedIndex: 0,
        message: msg,
        options: [
            { text: "Search", action: function() { below.gameData.mapLog.push(msg); maintainMapLog(); } },
            { text: "Move on", action: function() { below.gameData.mapLog.push("You move on..."); maintainMapLog(); } }
        ]
    };
    renderChoiceEvent();
}

function animateDots(node, interval) {
    var dots = "";
    var step = Math.max(1, Math.floor(interval / 3));
    var timer = setInterval(function() {
        dots = dots.length < 3 ? dots + "." : "";
        if (node.parentNode) {
            node.textContent = dots;
        } else {
            clearInterval(timer);
        }
    }, step);
    return timer;
}

function renderChoiceEvent() {
    var gameLogDiv = document.getElementById("gameLogDiv");
    
    // Only clear the log if this is NOT a chained dialog
    // (for chained dialogs, keep the previous dialog text visible)
    if (!below.choiceEvent.isChain) {
        while (gameLogDiv.firstChild) {
            gameLogDiv.removeChild(gameLogDiv.firstChild);
        }
    } else {
        // For chained dialogs, clear the old title and options (keep the message)
        var nodesToRemove = [];
        gameLogDiv.childNodes.forEach(function(node) {
            if (node.nodeType === 1) {
                // Remove title node ("Your response:" or "Choose an action:")
                if (node.textContent === "Your response:" || node.textContent === "Choose an action:") {
                    nodesToRemove.push(node);
                }
                // Remove all option nodes (class "below-game-left-paragraph" but not current)
                if (node.className && node.className.includes("below-game-left-paragraph") && !node.className.includes("below-game-left-paragraph-current")) {
                    nodesToRemove.push(node);
                }
                // Also remove dots nodes (animated or static)
                if (node.classList && node.classList.contains("below-dots-node")) {
                    nodesToRemove.push(node);
                }
            }
        });
        nodesToRemove.forEach(function(node) {
            if (node.parentNode) node.parentNode.removeChild(node);
        });
        scrollLogToBottom();
    }
    
    // Add gray overlay to map
    var gameDivCenter = document.getElementById("gameDivCenter");
    gameDivCenter.style.opacity = "0.5";
    gameDivCenter.style.pointerEvents = "none";
    
    // Get dialog interval (default: 1000ms = 1 second)
    var dialogInterval = (below.gameData.dialogInterval !== undefined ? below.gameData.dialogInterval : 1000);
    var dots = below.gameData.dialogDots || "...";
    
    // Show animated dots while waiting for message
    var dotsNode = document.createElement("P");
    dotsNode.className = "below-game-left-paragraph-current";
    dotsNode.classList.add("below-dots-node");
    dotsNode.textContent = "";
    gameLogDiv.appendChild(dotsNode);
    var dotsTimer = animateDots(dotsNode, dialogInterval);
    scrollLogToBottom();
    
    // After delay, show the actual message
    setTimeout(function() {
        clearInterval(dotsTimer);
        if (!below.choiceEvent) return; // Dialog was closed
        if (dotsNode.parentNode) {
            dotsNode.parentNode.removeChild(dotsNode);
        }
        
        // Show appropriate message based on entity type
        showDialogMessage(gameLogDiv);
        
        // Show title and options after another delay
        setTimeout(function() {
            if (!below.choiceEvent) return;
            showDialogOptions(gameLogDiv, dots);
        }, dialogInterval);
    }, dialogInterval);
}

function showDialogMessage(gameLogDiv) {
    if (below.choiceEvent.isDialog) {
        var speakerTypeId = below.choiceEvent.speakerNpcType;
        if (speakerTypeId === undefined || speakerTypeId === null) {
            speakerTypeId = below.choiceEvent.npcType;
        }
        var isPrimary = (speakerTypeId === below.choiceEvent.npcType);
        var speakerNpcType = speakerTypeId !== undefined && speakerTypeId !== null
            ? below.gameData.npcTypes[speakerTypeId] : null;
        if (speakerNpcType && speakerNpcType.dialogImg) {
            var container = document.createElement("DIV");
            container.className = isPrimary ? "below-dialog-message" : "below-dialog-message-right";
            var img = document.createElement("IMG");
            img.className = isPrimary ? "below-dialog-img" : "below-dialog-img-secondary";
            img.src = "images/" + speakerNpcType.dialogImg;
            container.appendChild(img);
            var msgNode = document.createElement("P");
            msgNode.className = "below-game-left-paragraph-current";
            msgNode.textContent = below.choiceEvent.message;
            container.appendChild(msgNode);
            gameLogDiv.appendChild(container);
        } else {
            var msgNode = document.createElement("P");
            msgNode.className = "below-game-left-paragraph-current";
            msgNode.textContent = below.choiceEvent.message;
            gameLogDiv.appendChild(msgNode);
        }
    } else if (below.choiceEvent.npcType !== null && below.choiceEvent.npcType !== undefined) {
        var npcType = below.gameData.npcTypes[below.choiceEvent.npcType];
        var msgNode = document.createElement("P");
        msgNode.className = "below-game-left-paragraph-current";
        msgNode.textContent = (below.choiceEvent.npcAgitated ? npcType.dialog.agitated : npcType.dialog.greeting) || "A character blocks your path.";
        gameLogDiv.appendChild(msgNode);
    } else if (below.choiceEvent.message) {
        var msgNode = document.createElement("P");
        msgNode.className = "below-game-left-paragraph-current";
        msgNode.textContent = below.choiceEvent.message;
        gameLogDiv.appendChild(msgNode);
    }
    scrollLogToBottom();
}

function showDialogOptions(gameLogDiv, dots) {
    var dialogInterval = (below.gameData.dialogInterval !== undefined ? below.gameData.dialogInterval : 1000);
    var dotsText = below.gameData.dialogDots || "...";
    
    // Show title is intentionally removed for cleaner UI
    
    // Show animated dots for options
    var optionDotsNode = document.createElement("P");
    optionDotsNode.className = "below-game-left-paragraph-current";
    optionDotsNode.classList.add("below-dots-node");
    optionDotsNode.textContent = "";
    gameLogDiv.appendChild(optionDotsNode);
    var optionDotsTimer = animateDots(optionDotsNode, dialogInterval);
    
    // After delay, show actual options
    setTimeout(function() {
        clearInterval(optionDotsTimer);
        if (!below.choiceEvent) return;
        if (optionDotsNode.parentNode) {
            optionDotsNode.parentNode.removeChild(optionDotsNode);
        }
        
        var optionsToShow = below.choiceEvent.isDialog ? below.choiceEvent.dialogOptions : below.choiceEvent.options;
        if (!optionsToShow) return;
        
        optionsToShow.forEach(function(option, index) {
            var node = document.createElement("P");
            node.className = "below-game-left-paragraph";
            if (index === below.choiceEvent.selectedIndex) {
                node.classList.add("below-choice-selected");
            }
            node.textContent = option.text;
            node.onclick = function() { selectChoiceOption(index); };
            gameLogDiv.appendChild(node);
        });
        scrollLogToBottom();
    }, dialogInterval);
}

function updateChoiceSelection() {
    var gameLogDiv = document.getElementById("gameLogDiv");
    var optionsArray = below.choiceEvent.isDialog ? below.choiceEvent.dialogOptions : below.choiceEvent.options;
    var optionNodes = gameLogDiv.querySelectorAll(".below-game-left-paragraph");
    // Remove selected class from all option nodes
    optionNodes.forEach(function(node) {
        node.classList.remove("below-choice-selected");
    });
    // Add selected class to the current selection (skip title node which has no onclick)
    var matchIndex = 0;
    optionNodes.forEach(function(node) {
        if (node.onclick) {
            if (matchIndex === below.choiceEvent.selectedIndex) {
                node.classList.add("below-choice-selected");
                node.scrollIntoViewIfNeeded ? node.scrollIntoViewIfNeeded() : node.scrollIntoView({ block: "nearest" });
            }
            matchIndex++;
        }
    });
}

function handleChoiceEventKey(e) {
    // Use the correct options array for navigation
    var optionsArray = below.choiceEvent.isDialog ? below.choiceEvent.dialogOptions : below.choiceEvent.options;
    
    if (e.keyCode === 38 || e.keyCode === 87) { // Up
        e.preventDefault();
        below.choiceEvent.selectedIndex = (below.choiceEvent.selectedIndex - 1 + optionsArray.length) % optionsArray.length;
        updateChoiceSelection();
    }
    else if (e.keyCode === 40 || e.keyCode === 83) { // Down
        e.preventDefault();
        below.choiceEvent.selectedIndex = (below.choiceEvent.selectedIndex + 1) % optionsArray.length;
        updateChoiceSelection();
    }
    else if (e.keyCode === 13 || e.keyCode === 69) { // Enter or E
        e.preventDefault();
        // Guard: wait for options to be rendered before allowing selection
        if (below.choiceEvent && below.choiceEvent.isDialog) {
            var gameLogDiv = document.getElementById("gameLogDiv");
            if (!gameLogDiv.querySelector(".below-game-left-paragraph")) return;
        }
        selectChoiceOption(below.choiceEvent.selectedIndex);
    }
    else if (e.keyCode === 27) { // Escape
        e.preventDefault();
    if (below.passwordInput) return;
    
    closeChoiceEvent();
    }
}

function showPlayerResponse(text) {
    var gameLogDiv = document.getElementById("gameLogDiv");
    var node = document.createElement("P");
    node.className = "below-player-response";
    node.textContent = "> " + text;
    gameLogDiv.appendChild(node);
    scrollLogToBottom();
}

function selectChoiceOption(index) {
    // Use the correct options array
    var optionsArray = below.choiceEvent.isDialog ? below.choiceEvent.dialogOptions : below.choiceEvent.options;
    var selectedOption = optionsArray[index];
    
    // Show the player's response in the dialog log
    if (below.choiceEvent.isDialog) {
        showPlayerResponse(selectedOption.text);
    }
    
    // Handle new dialog system
    if (below.choiceEvent.isDialog && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var npc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        
        // Handle ship part attachment — remove item and re-render dialog
        if (npc && npc.type === 6) {
            var removeItem = null;
            if (selectedOption.id === "ship_attach_rudder") removeItem = 8;
            else if (selectedOption.id === "ship_attach_mast") removeItem = 9;
            else if (selectedOption.id === "ship_attach_wheel") removeItem = 10;
            else if (selectedOption.id === "ship_attach_sail") removeItem = 11;
            if (removeItem !== null) {
                var idx = below.gameData.player.inventory.indexOf(removeItem);
                if (idx !== -1) {
                    below.gameData.player.inventory.splice(idx, 1);
                    npc.shipParts = (npc.shipParts || 0) + 1;
                    
                    var targetD;
                    if (npc.shipParts >= 4) {
                        var introD = npc.dialogOptions.find(function(d) { return d.id === "ship_intro"; });
                        var readyD = npc.dialogOptions.find(function(d) { return d.id === "ship_ready"; });
                        if (introD) introD.available = false;
                        if (readyD) {
                            readyD.available = true;
                            var departOpt = readyD.options.find(function(o) { return o.id === "ship_depart"; });
                            if (departOpt) {
                                departOpt.available = !!below.gameData.player.samQuestComplete;
                            }
                        }
                        targetD = readyD;
                    } else {
                        targetD = npc.dialogOptions.find(function(d) { return d.id === "ship_intro"; });
                    }
                    
                    if (targetD) {
                        var msg = targetD.text;
                        if (targetD === readyD && !below.gameData.player.samQuestComplete) {
                            msg += " But you feel like you have unfinished business in the city above. Perhaps you should check on Sam Shale before leaving.";
                        }
                        below.choiceEvent.message = msg;
                        below.choiceEvent.dialogId = targetD.id;
                        below.choiceEvent.speakerNpcType = below.choiceEvent.npcType;
                        below.choiceEvent.dialogOptions = targetD.options.filter(function(o) {
                            if (o.available === false) return false;
                            if (o.requiresItems) {
                                var hasItem = o.requiresItems.some(function(itemId) {
                                    return below.gameData.player.inventory.indexOf(itemId) !== -1;
                                });
                                if (!hasItem) return false;
                            }
                            if (o.blockedByItems) {
                                var hasBlocked = o.blockedByItems.some(function(itemId) {
                                    return below.gameData.player.inventory.indexOf(itemId) !== -1;
                                });
                                if (hasBlocked) return false;
                            }
                            return true;
                        });
                        below.choiceEvent.isChain = true;
                        renderChoiceEvent();
                    }
                }
                return;
            }
        }
        
        if (npc && npc.dialogOptions) {
            // Process "opens" - set available to true (do this first so chained dialog is available)
            if (selectedOption.opens) {
                selectedOption.opens.forEach(function(id) {
                    var dialog = npc.dialogOptions.find(function(d) { return d.id === id; });
                    if (dialog) dialog.available = true;
                });
            }
             
            // Process "chains" - show next dialog (do this before closes so dialog is still active)
            if (selectedOption.chains) {
                // chains can be a string or an array
                var chainIds = Array.isArray(selectedOption.chains) ? selectedOption.chains : [selectedOption.chains];
                // For now, take the first chained dialog
                var nextDialogId = chainIds[0];
                var nextDialog = npc.dialogOptions.find(function(d) { return d.id === nextDialogId; });
                if (!nextDialog) {
                    console.warn('Chain target "' + nextDialogId + '" not found in npc.dialogOptions');
                }
                if (nextDialog) {
                    // Make the chained dialog available and show it
                    nextDialog.available = true;
                    
                    // Process "closes" first (close dialogs that should be closed)
                    if (selectedOption.closes) {
                        selectedOption.closes.forEach(function(id) {
                            var dialog = npc.dialogOptions.find(function(d) { return d.id === id; });
                            if (dialog) dialog.available = false;
                        });
                    }
                    
                    // Now show the chained dialog
                    below.choiceEvent = {
                        selectedIndex: 0,
                        message: nextDialog.text,
                        npcPos: below.choiceEvent.npcPos,
                        npcType: below.choiceEvent.npcType,
                        speakerNpcType: nextDialog.speaker || below.choiceEvent.npcType,
                        npcAgitated: below.choiceEvent.npcAgitated,
                        dialogId: nextDialog.id,
                        dialogOptions: nextDialog.options.filter(function(o) {
                            if (o.available === false) return false;
                            if (o.requiresItems) {
                                var hasItem = o.requiresItems.some(function(itemId) {
                                    return below.gameData.player.inventory.indexOf(itemId) !== -1;
                                });
                                if (!hasItem) return false;
                            }
                            if (o.blockedByItems) {
                                var hasBlocked = o.blockedByItems.some(function(itemId) {
                                    return below.gameData.player.inventory.indexOf(itemId) !== -1;
                                });
                                if (hasBlocked) return false;
                            }
                            return true;
                        }),
                        isDialog: true,
                        isChain: true
                    };
                    renderChoiceEvent();
                    
                    // When player first talks to the Mole, enable related dialog options
                    if (selectedOption.id === "molea1q") {
                        var medusaNpc = below.gameData.mapData[1].npcs.find(function(n) { return n.type === 3; });
                        if (medusaNpc && medusaNpc.dialogOptions) {
                            var medusaq0 = medusaNpc.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
                            if (medusaq0 && medusaq0.options) {
                                var moleOpt = medusaq0.options.find(function(o) { return o.id === "medusaa1m"; });
                                if (moleOpt) moleOpt.available = true;
                            }
                        }
                        var hermitNpc = below.gameData.mapData[0].npcs.find(function(n) { return n.type === 1; });
                        if (hermitNpc && hermitNpc.dialogOptions) {
                            var hermitq0 = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
                            if (hermitq0 && hermitq0.options) {
                                var hermitMoleOpt = hermitq0.options.find(function(o) { return o.id === "hermit_ask_mole"; });
                                if (hermitMoleOpt) hermitMoleOpt.available = true;
                            }
                        }
                    }
                    
                    // When player gives herbs to the Mole, consume herbs and open shimmering walls
                    if (selectedOption.id === "mole_post_a3_give") {
                        var herbIdx = -1;
                        for (var hi = 0; hi < below.gameData.player.inventory.length; hi++) {
                            if (below.gameData.player.inventory[hi] === 6) {
                                herbIdx = hi;
                                break;
                            }
                        }
                        if (herbIdx !== -1) {
                            below.gameData.player.inventory.splice(herbIdx, 1);
                            below.gameData.mapLog.push("You hand over the bundle of cave herbs. The Mole accepts them reverently.");
                            maintainMapLog();
                            // Open shimmering walls on map 2
                            var map2Obstacles = below.gameData.mapData[2].obstacles;
                            map2Obstacles.forEach(function(o) {
                                if (o.type === 12) {
                                    o.closed = false;
                                    o.blocking = false;
                                    o.icon = "shimmer_wall_open.png";
                                }
                            });
                            below.gameData.mapLog.push("A distant shimmering echoes through the tunnels.");
                            maintainMapLog();
                        }
                    }
                    
                    return; // Don't close the dialog
                }
            }
            
            // Process "closes" - set available to false (if no chain happened)
            if (selectedOption.closes) {
                selectedOption.closes.forEach(function(id) {
                    var dialog = npc.dialogOptions.find(function(d) { return d.id === id; });
                    if (dialog) dialog.available = false;
                });
            }
        }
    } else {
        // Old system - just run the action
        if (selectedOption.action) {
            selectedOption.action();
        }
    }
    
    // Handle trade dialog option
    if (below.choiceEvent && below.choiceEvent.isDialog && selectedOption.id === "hermit_trade_accept") {
        var keyIdx = -1;
        for (var i = 0; i < below.gameData.player.inventory.length; i++) {
            if (below.gameData.player.inventory[i] === 4 || below.gameData.player.inventory[i] === 5) {
                keyIdx = i;
                break;
            }
        }
        if (keyIdx !== -1) {
            below.gameData.player.inventory.splice(keyIdx, 1);
            below.gameData.player.inventory.push(6);
            setTimeout(function() { showInventory([6]); }, 50);
        }
    }
    
    // When Hermit hands over the centipede cleaner, add item and open door
    if (selectedOption.id === "hermit_centipede_give_ok" && below.choiceEvent && below.choiceEvent.npcPos) {
        below.gameData.player.inventory.push(15);
        below.gameData.mapLog.push("The Hermit hands you a grimy bottle labeled 'Crawl-End'.");
        maintainMapLog();
        var centDoor = below.gameData.mapData[0].obstacles.find(function(o) {
            return o.position.x === -3 && o.position.y === -4;
        });
        if (centDoor) {
            centDoor.closed = false;
            centDoor.blocking = false;
            below.gameData.mapLog.push("The Hermit strains against a hidden latch. A section of the east wall swings open.");
            maintainMapLog();
        }
        setTimeout(function() { showInventory([15]); }, 50);
    }
    
    // When player accepts herbs from Hermit after centipede quest
    if (selectedOption.id === "hermit_centipede_thanks_accept" && below.choiceEvent && below.choiceEvent.npcPos) {
        below.gameData.player.inventory.push(6);
        below.gameData.mapLog.push("The Hermit hands you a bundle of dried cave herbs.");
        maintainMapLog();
        var hermitNpc = below.gameData.mapData[0].npcs.find(function(n) { return n.type === 1; });
        if (hermitNpc) {
            // Disable all quest/trade/greeting dialogs, keep only thanks stub
            hermitNpc.dialogOptions.forEach(function(d) {
                if (d.id !== "hermit_centipede_thanks") {
                    d.available = false;
                }
            });
            // Move Hermit back to his original spot
            hermitNpc.position.x = 3;
            hermitNpc.position.y = 3;
        }
        // Re-enable the thanks dialog as the permanent stub
        var thanksD = below.gameData.mapData[0].npcs.find(function(n) { return n.type === 1; }).dialogOptions.find(function(d) { return d.id === "hermit_centipede_thanks"; });
        if (thanksD) thanksD.available = true;
        setTimeout(function() { showInventory([6]); }, 50);
        drawMapCanvas();
    }

    // When player first talks to the Mole, enable Medusa's mole dialog option
    if (selectedOption.id === "molea1q") {
        var medusaNpc = below.gameData.mapData[1].npcs.find(function(n) { return n.type === 3; });
        if (medusaNpc && medusaNpc.dialogOptions) {
            var medusaq0 = medusaNpc.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
            if (medusaq0 && medusaq0.options) {
                var moleOpt = medusaq0.options.find(function(o) { return o.id === "medusaa1m"; });
                if (moleOpt) moleOpt.available = true;
            }
        }
    }
    
    // When player accepts Medusa's key, grant Stone Key
    if (selectedOption.id === "medusama4p") {
        below.gameData.player.inventory.push(7);
        setTimeout(function() { showInventory([7]); }, 50);
    }
    
    // When Mole reveals the secret passage, unlock Medusa's mole dialog option
    if (selectedOption.id === "mole_post5_a") {
        var medusaNpc = below.gameData.mapData[1].npcs.find(function(n) { return n.type === 3; });
        if (medusaNpc && medusaNpc.dialogOptions) {
            var medusaq0 = medusaNpc.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
            if (medusaq0 && medusaq0.options) {
                var moleOpt = medusaq0.options.find(function(o) { return o.id === "medusaa1m"; });
                if (moleOpt) moleOpt.available = true;
            }
        }
    }
    
    // When player first interacts with the Jester, unlock Hermit's opinion dialog
    if (below.choiceEvent && below.choiceEvent.npcType === 2 && !below.jesterMet) {
        below.jesterMet = true;
        var hermitNpc = below.gameData.mapData[0].npcs.find(function(n) { return n.type === 1; });
        if (hermitNpc && hermitNpc.dialogOptions) {
            var hermitq0 = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
            if (hermitq0 && hermitq0.options) {
                var askJester = hermitq0.options.find(function(o) { return o.id === "hermit_ask_jester"; });
                if (askJester) askJester.available = true;
            }
        }
        var medusaNpc = below.gameData.mapData[1].npcs.find(function(n) { return n.type === 3; });
        if (medusaNpc && medusaNpc.dialogOptions) {
            var medusaq0 = medusaNpc.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
            if (medusaq0 && medusaq0.options) {
                var jesterOpt = medusaq0.options.find(function(o) { return o.id === "medusaa1j"; });
                if (jesterOpt) jesterOpt.available = true;
            }
        }
    }
    
    // When player finishes Mole trap dialog, restore normal dialog
    if (selectedOption.id === "mole_trap_leave" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var mole = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (mole) {
            var trapD = mole.dialogOptions.find(function(d) { return d.id === "mole_trap"; });
            var normalD = mole.dialogOptions.find(function(d) { return d.id === "moleq1"; });
            if (trapD) trapD.available = false;
            if (normalD) normalD.available = true;
        }
    }
    
    // When player chooses "Let's go" for Sam Slate's walk
    if ((selectedOption.id === "detective_ready_go" || selectedOption.id === "detective_help_intro_ready") && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc && npcWalkTo(samNpc, -9, 0, function() {
            var arrivalDialogs = ["detectiveq0", "detectiveq1", "detective_help_intro", "detective_ready"];
            arrivalDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var arrivalD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_arrival"; });
            if (arrivalD) arrivalD.available = true;
            below.gameData.mapLog.push("Sam Slate stops in a shadowy alcove and gestures for you to join him.");
            maintainMapLog();
        }, 3)) {
            below.gameData.mapLog.push("Sam Slate tips his hat and melts into the shadows. You follow at a distance.");
            maintainMapLog();
        }
    }
    
    // Walk from office to police precinct
    if ((selectedOption.id === "detective_arrival_in" || selectedOption.id === "detective_arrival_doubt_in") && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc && npcWalkTo(samNpc, -5, -9, function() {
            var closeDialogs = ["detective_arrival", "detective_arrival_doubt"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var openD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_precinct"; });
            if (openD) openD.available = true;
            below.gameData.mapLog.push("Sam leads you through the damp streets to the police precinct.");
            maintainMapLog();
        }, 3)) {
            below.gameData.mapLog.push("Sam nods and pushes off the crate. 'Stay close.'");
            maintainMapLog();
        }
    }
    
    // Walk from precinct to Honest Abe's
    if ((selectedOption.id === "detective_precinct_go" || selectedOption.id === "detective_precinct_go2") && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc && npcWalkTo(samNpc, 1, -9, function() {
            var closeDialogs = ["detective_precinct", "detective_precinct_sgt", "detective_precinct_info", "detective_precinct_thanks", "detective_precinct_sgt_final", "detective_precinct_after", "detective_precinct_reliable"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var openD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_abe"; });
            if (openD) openD.available = true;
            below.gameData.mapLog.push("Sam ducks into a narrow alley and emerges at Honest Abe's Pawn Shop.");
            maintainMapLog();
        }, 3)) {
            below.gameData.mapLog.push("Sam tips his hat at the Sergeant and heads for the door.");
            maintainMapLog();
        }
    }
    
    // Walk from Abe's to Rooftop
    if ((selectedOption.id === "detective_abe_go" || selectedOption.id === "detective_abe_go2") && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc && npcWalkTo(samNpc, 15, -4, function() {
            var closeDialogs = ["detective_abe", "detective_abe_char", "detective_abe_medusa", "detective_abe_after", "detective_abe_explain"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var openD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_rooftop"; });
            if (openD) openD.available = true;
            below.gameData.mapLog.push("Sam leads you through a service alley and up a rusted ladder to a high ledge.");
            maintainMapLog();
        }, 3)) {
            below.gameData.mapLog.push("Sam thanks Abe and heads for the back exit.");
            maintainMapLog();
        }
    }
    
    // Walk from Rooftop to The Last Stop Diner
    if (selectedOption.id === "detective_rooftop_go" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc && npcWalkTo(samNpc, 7, -9, function() {
            var closeDialogs = ["detective_rooftop", "detective_rooftop_mouse", "detective_rooftop_after"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var openD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_diner"; });
            if (openD) openD.available = true;
            below.gameData.mapLog.push("The neon sign of The Last Stop buzzes ahead. Sam picks up the pace.");
            maintainMapLog();
        }, 3)) {
            below.gameData.mapLog.push("Sam climbs down from the ledge without a word.");
            maintainMapLog();
        }
    }
    
    // Walk from Diner to Jazz Club
    if (selectedOption.id === "detective_diner_go" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc && npcWalkTo(samNpc, 12, -9, function() {
            var closeDialogs = ["detective_diner", "detective_diner_flo", "detective_diner_after"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var openD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_jazz"; });
            if (openD) openD.available = true;
            below.gameData.mapLog.push("Sam stops outside a doorway draped in red curtains. Muffled piano drifts through.");
            maintainMapLog();
        }, 3)) {
            below.gameData.mapLog.push("Sam pockets the photograph and heads back out into the street.");
            maintainMapLog();
        }
    }
    
    // Walk from Jazz Club to Dock Master
    if (selectedOption.id === "detective_jazz_go" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc && npcWalkTo(samNpc, 18, 9, function() {
            var closeDialogs = ["detective_jazz", "detective_jazz_piano", "detective_jazz_after"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var openD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_dockmaster"; });
            if (openD) openD.available = true;
            below.gameData.mapLog.push("The Dock Master's office emerges from the mist - a cratewood shack over black water.");
            maintainMapLog();
        }, 3)) {
            below.gameData.mapLog.push("Sam steps away from the jazz club, his jaw tight.");
            maintainMapLog();
        }
    }
    
    // Walk from Dock Master to Pier C3
    if (selectedOption.id === "detective_dockmaster_go" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc && npcWalkTo(samNpc, 12, 12, function() {
            var closeDialogs = ["detective_dockmaster", "detective_dockmaster_char", "detective_dockmaster_letter", "detective_dockmaster_after", "detective_dockmaster_catch"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var openD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_pier"; });
            if (openD) openD.available = true;
            below.gameData.mapLog.push("Sam walks to the end of Pier C3. Black water laps against the pilings.");
            maintainMapLog();
        }, 3)) {
            below.gameData.mapLog.push("Sam folds the letter and steps out onto the pier.");
            maintainMapLog();
        }
    }
    
    // Handle "Let her go" and "We can still catch her" on dockmaster_after
    if (selectedOption.id === "detective_dockmaster_leave" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc) {
            var closeDialogs = ["detective_dockmaster", "detective_dockmaster_char", "detective_dockmaster_letter", "detective_dockmaster_after"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var pierD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_pier"; });
            if (pierD) pierD.available = true;
        }
    }
    
    // Teleport Sam to his office after the pier scene
    if (selectedOption.id === "detective_pier_a1" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc) {
            samNpc.position = { x: 0, y: -2 };
            samNpc.destPos = {};
            var officeD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_office"; });
            if (officeD) officeD.available = true;
            below.gameData.player.samQuestComplete = true;
            // Remove Jester from map 1
            for (var si = below.gameData.mapData[1].npcs.length - 1; si >= 0; si--) {
                if (below.gameData.mapData[1].npcs[si].type === 2) {
                    below.gameData.mapData[1].npcs.splice(si, 1);
                    break;
                }
            }
            // Place Jester at Dock Master office
            below.gameData.mapData[3].npcs.push({
                type: 2,
                position: { x: 18, y: 9 },
                movement: 0,
                dialogOptions: [{
                    id: "jester_dockmaster_ship",
                    available: true,
                    text: "The Dock Master - who looks suspiciously like the Jester in an oversized coat and a glued-on mustache - leans on the counter with a grin. 'Well, well, well! Fancy seein' YOU here! Heard you been collectin' boat parts! A ship! At Pier A1! Who woulda thunk it! Fix it up and you can sail right outta here! Course, I wouldn't know anythin' about that. I'm just the Dock Master. Totally legitimate. Ahem.' He winks broadly.",
                    options: [{
                        id: "jester_dockmaster_ship_a1",
                        text: "...",
                        available: true,
                        closes: ["jester_dockmaster_ship"]
                    }]
                }]
            });
        }
    }
    
    // Return from The Beach to the docks on map 3
    if (selectedOption.id === "ship_beach_leave") {
        setTimeout(function() {
            changeMap(3, -1, 13, "You sail back across the dark lake. The familiar shape of Pier A1 emerges from the gloom as the ship docks once more.");
        }, 10);
    }

    // Enable Mole's sick dialog when player departs to The Beach
    if (selectedOption.id === "ship_departure_go") {
        var moleNpc = below.gameData.mapData[2].npcs ? below.gameData.mapData[2].npcs.find(function(n) { return n.type === 4; }) : null;
        if (moleNpc && moleNpc.dialogOptions) {
            var sickD = moleNpc.dialogOptions.find(function(d) { return d.id === "mole_sick"; });
            if (sickD) sickD.available = true;
        }
        setTimeout(function() {
            changeMap(4, 2, 0, "The ship reaches the shore of a vast underground beach. As you step onto the sand, the dark lake stretches behind you, still and silent.");
        }, 10);
    }

    // When player offers to find help for the Mole, enable Hermit's antidote dialog
    if (selectedOption.id === "mole_sick_help") {
        var hermitNpc = below.gameData.mapData[0].npcs ? below.gameData.mapData[0].npcs.find(function(n) { return n.type === 1; }) : null;
        if (hermitNpc && hermitNpc.dialogOptions) {
            var hermitq0 = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
            if (hermitq0 && hermitq0.options) {
                var antidoteOpt = hermitq0.options.find(function(o) { return o.id === "hermit_ask_antidote"; });
                if (antidoteOpt) antidoteOpt.available = true;
            }
        }
    }

    // Hermit grants the antidote
    if (selectedOption.id === "hermit_antidote_give_a1") {
        below.gameData.player.inventory.push(12);
        setTimeout(function() { showInventory([12]); }, 50);
    }
    
    // When player responds to Sam Shale mid-walk dialog
    if (selectedOption.id === "detective_walk_a1") {
        below.gameData.mapLog.push("Sam Shale glances at you sidelong. 'Once. Came out with a bullet hole in my coat and a story I can't tell in polite company. Not that there's any polite company down here.'");
        maintainMapLog();
    }
    if (selectedOption.id === "detective_walk_a2") {
        below.gameData.mapLog.push("Sam Shale nods slowly. 'Yeah. That's the right response to this place.'");
        maintainMapLog();
    }
    
    // When player leaves Mole's intro dialog (molea4), remove blocking stones on map 2
    if (selectedOption.id === "molea4") {
        var stonePositions = [
            {x:6,y:10},{x:7,y:10},{x:6,y:11},{x:7,y:11},
            {x:39,y:10},{x:40,y:10},{x:39,y:11},{x:40,y:11},
            {x:6,y:32},{x:7,y:32},{x:6,y:33},{x:7,y:33}
        ];
        var map2Obstacles = below.gameData.mapData[2].obstacles;
        below.gameData.mapData[2].obstacles = map2Obstacles.filter(function(o) {
            return !(o.type === 1 && stonePositions.some(function(p) {
                return o.position.x === p.x && o.position.y === p.y;
            }));
        });
        below.gameData.mapLog.push("Them mole smashes at the rocks and they roll away into the darkness.");
        maintainMapLog();
    }

    // When player insists on help and follows the Hermit, walk to door and unlock it
    if (selectedOption.id === "hermit_insist_follow" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpc && npcWalkTo(hermitNpc, -1, 3, function() {
            var doorObstacle = below.gameData.mapData[0].obstacles.find(function(o) {
                return o.position.x === -2 && o.position.y === 2;
            });
            if (doorObstacle) {
                doorObstacle.closed = false;
                doorObstacle.blocking = false;
                doorObstacle.icon = "door_open.png";
            }
            showSplash({
                image: "rats_dialog.png",
                text: "The old stone door grinds open. Beyond it, a dark chamber stirs with movement - rats scatter in the shadows, their eyes glinting like tiny jewels.",
                shake: false
            });
            // Make Hermit's rat-spray dialog available for next conversation
            var hermitNpcArr = below.gameData.mapData[0].npcs.find(function(n) { return n.type === 1; });
            if (hermitNpcArr && hermitNpcArr.dialogOptions) {
                var sprayD = hermitNpcArr.dialogOptions.find(function(d) { return d.id === "hermit_rat_spray"; });
                var baseD = hermitNpcArr.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
                if (sprayD) sprayD.available = true;
                if (baseD) baseD.available = false;
            }
        }, 3)) {
            below.gameData.mapLog.push("Alistair gathers his cloak and gestures for you to follow.");
            maintainMapLog();
        }
    }

    // When player accepts the rat-spray quest, give them the silver key
    if (selectedOption.id === "hermit_rat_spray_accept" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpc && hermitNpc.dialogOptions) {
            var sprayD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_rat_spray"; });
            var waitD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_rat_spray_wait"; });
            if (sprayD) sprayD.available = false;
            if (waitD) waitD.available = true;
            below.gameData.player.inventory.push(4);
            setTimeout(function() { showInventory([4]); }, 50);
            below.gameData.mapLog.push("Alistair hands you a small silver key. 'Take this for the door, beyond is my room. And hurry back - the rats won't wait.'");
            maintainMapLog();
        }
    }
    
    // If player declines the rat-spray quest, return to normal dialog
    if (selectedOption.id === "hermit_rat_spray_decline" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpc && hermitNpc.dialogOptions) {
            var sprayD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_rat_spray"; });
            var baseD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
            if (sprayD) sprayD.available = false;
            if (baseD) baseD.available = true;
            below.gameData.mapLog.push("Alistair shrugs. 'Suit yourself. The offer stands if you change your mind.'");
            maintainMapLog();
        }
    }

    // When player hands over the rat spray, Hermit walks into rat chamber and clears it
    if (selectedOption.id === "hermit_rat_spray_give_hand" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpc && hermitNpc.dialogOptions) {
            // Remove rat spray from inventory
            var sprayIdx = below.gameData.player.inventory.indexOf(13);
            if (sprayIdx !== -1) {
                below.gameData.player.inventory.splice(sprayIdx, 1);
            }
            if (npcWalkTo(hermitNpc, -3, 2, function() {
                below.ratsCleared = true;
                showSplash({
                    image: "hermit_dialog.png",
                    text: "Alistair storms through the doorway, rat spray hissing. 'THIEVING VERMIN! STEALING MY HERBS! THINK YOU CAN CHEAT ALISTAIR THE HERMIT?!' He sprays wildly - rats scatter, shrieking, fleeing through cracks and crevices. Within moments, the chamber is silent. He stands panting, canister still raised. 'And stay OUT!' he bellows at the empty room. Then, quieter: 'That was... satisfying.'",
                    shake: true
                });
                below.pendingRatClear = true;
            }, 3)) {
                below.gameData.mapLog.push("Alistair snatches the canister and storms off toward the storeroom, muttering about thieving rats.");
                maintainMapLog();
            }
        }
    }

    // When player hands over the bat swatter, Hermit unlocks the west door and returns to his post
    if (selectedOption.id === "hermit_bat_swatter_give_hand" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMapB = below.gameData.player.currentMap;
        var hermitNpcB = below.gameData.mapData[curMapB].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpcB && hermitNpcB.dialogOptions) {
            // Unlock the door at (-7,3) — it becomes non-blocking
            var obstacles = below.gameData.mapData[curMapB].obstacles;
            for (var oi = 0; oi < obstacles.length; oi++) {
                if (obstacles[oi].position.x === -7 && obstacles[oi].position.y === 3) {
                    obstacles[oi].closed = false;
                    obstacles[oi].blocking = false;
                    break;
                }
            }
            // Walk Hermit back to (3,3)
            if (npcWalkTo(hermitNpcB, 3, 3, function() {
                var introD = hermitNpcB.dialogOptions.find(function(d) { return d.id === "hermit_bat_intro"; });
                if (introD) introD.available = true;
                var greetD = hermitNpcB.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
                if (greetD) greetD.available = true;
                maintainMapLog();
            }, 3)) {
                below.gameData.mapLog.push("Alistair shuffles back toward the main chamber, rubbing his lower back.");
                maintainMapLog();
            }
        }
    }

    // Handle hide-and-seek countdown start
    if (selectedOption.id === "sisters_hideandseek_count" && below.choiceEvent && below.choiceEvent.npcPos) {
        startHideAndSeek();
        return;
    }

    // Handle tag countdown start
    if (selectedOption.id === "sisters_tag_count" && below.choiceEvent && below.choiceEvent.npcPos) {
        startTagGame();
        return;
    }

    // Handle hide-and-seek completion — restore normal conversation, enable tag
    if (selectedOption.id === "sisters_hideandseek_complete_close" && below.choiceEvent && below.choiceEvent.npcPos) {
        below.gameData.mapData[5].npcs.forEach(function(n) {
            var introD = n.dialogOptions.find(function(d) { return d.id === "sisters_intro"; });
            if (introD) introD.available = true;
            var tagIntroD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_intro"; });
            if (tagIntroD) tagIntroD.available = true;
        });
    }

    // Handle finding a sister during hide-and-seek
    if (selectedOption.id === "sisters_hideandseek_found_close" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var npc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (npc) {
            npc._found = true;
            var foundD = npc.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_found"; });
            if (foundD) foundD.available = false;
            var allFound = below.gameData.mapData[5].npcs.every(function(n) { return n._found; });
            if (allFound) {
                below.gameData.mapData[5].npcs.forEach(function(n) {
                    var completeD = n.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_complete"; });
                    if (completeD) completeD.available = true;
                    var introD = n.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_intro"; });
                    if (introD) introD.available = false;
                    var startD = n.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_start"; });
                    if (startD) startD.available = false;
                });
                below.sistersReturnContext = "hideandseek";
                startSistersReturn();
            }
        }
        if (!below.passwordInput) {
            closeChoiceEvent();
        }
        return;
    }

    // Handle tagging a sister during tag game
    if (selectedOption.id === "sisters_tag_found_close" && below.choiceEvent && below.choiceEvent.npcPos) {
        var curMap = below.gameData.player.currentMap;
        var npc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (npc) {
            npc._tagFound = true;
            var foundD = npc.dialogOptions.find(function(d) { return d.id === "sisters_tag_found"; });
            if (foundD) foundD.available = false;
            var allTagged = below.gameData.mapData[5].npcs.every(function(n) { return n._tagFound; });
            if (allTagged) {
                below.tagActive = false;
                below.gameData.mapData[5].npcs.forEach(function(n) {
                    var completeD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_complete"; });
                    if (completeD) completeD.available = true;
                    var introD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_intro"; });
                    if (introD) introD.available = false;
                    var startD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_start"; });
                    if (startD) startD.available = false;
                    n._tagFleeing = false;
                });
                below.sistersReturnContext = "tag";
                startSistersReturn();
                below.gameData.mapLog.push("You tagged them both! The sisters shuffle back, looking winded.");
                maintainMapLog();
            } else {
                below.gameData.mapLog.push("One down! Keep chasing the other one!");
                maintainMapLog();
            }
        }
        if (!below.passwordInput) {
            closeChoiceEvent();
        }
        return;
    }

    // Handle tag completion — restore congratulations dialog
    if (selectedOption.id === "sisters_tag_complete_close" && below.choiceEvent && below.choiceEvent.npcPos) {
        below.gameData.mapData[5].npcs.forEach(function(n) {
            var congratsD = n.dialogOptions.find(function(d) { return d.id === "sisters_congratulations"; });
            if (congratsD) congratsD.available = true;
        });
    }

    // Handle exit reveal — remove mushroom and walk sisters to show the exit
    if (selectedOption.id === "sisters_exit_reveal_close" && below.choiceEvent && below.choiceEvent.npcPos) {
        var map5 = below.gameData.mapData[5];
        map5.obstacles = map5.obstacles.filter(function(o) {
            return !(o.position.x === 10 && o.position.y === 11);
        });
        below.gameData.mapLog.push("A deep rumble echoes through the fissure. The mushrooms near the crack shudder and collapse.");
        maintainMapLog();

        // Sisters walk to the exit to show the player (comic effect)
        var sisters = map5.npcs;
        var exitTargets = [{ x: 9, y: 11 }, { x: 11, y: 11 }];
        sisters.forEach(function(n, i) {
            n.dialogOptions.forEach(function(d) { d.available = false; });
            var exhD = n.dialogOptions.find(function(d) { return d.id === "sisters_exhausted"; });
            if (exhD) exhD.available = true;
            var target = exitTargets[i % exitTargets.length];
            npcWalkTo(n, target.x, target.y, function() {
                n.dialogOptions.forEach(function(d) { d.available = false; });
                var congratsD = n.dialogOptions.find(function(d) { return d.id === "sisters_congratulations"; });
                if (congratsD) congratsD.available = true;
                var allArrived = sisters.every(function(s) {
                    return !s.walkPath || s.walkPath.length === 0;
                });
                if (allArrived) {
                    below.gameData.mapLog.push("The sisters gesture lazily toward the crack. 'There. Now please leave. We need a nap.'");
                    maintainMapLog();
                    setTimeout(function() {
                        below.sistersReturnContext = "tag";
                        startSistersReturn();
                    }, 2000);
                }
            }, 20);
        });
    }

    if (!below.passwordInput) {
        closeChoiceEvent();
    }
}

function closeChoiceEvent() {
    below.choiceEvent = null;
    var gameLogDiv = document.getElementById("gameLogDiv");
    while (gameLogDiv.firstChild) {
        gameLogDiv.removeChild(gameLogDiv.firstChild);
    }
    // Restore game log with previous messages
    maintainMapLog();
    // Restore map appearance
    var gameDivCenter = document.getElementById("gameDivCenter");
    gameDivCenter.style.opacity = "1";
    gameDivCenter.style.pointerEvents = "auto";
    maintainMapLog();
}

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
                        below.gameData.mapLog.push("The sisters have vanished into the cavern. Time to find them.");
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
                        below.gameData.mapLog.push("The sisters shamble away from you at an almost insulting pace. Tag them!");
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
                below.gameData.mapLog.push("The sisters shuffle back to their spot, looking exhausted by the effort.");
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
    below.splashPos = null;
    below.splashData = null;
    drawMapCanvas();
}

// ── Cut-scene system ─────────────────────────────────

function playCutScene(sceneId, callback) {
    var scene = below.gameData.cutScenes && below.gameData.cutScenes[sceneId];
    if (!scene || !scene.cuts || scene.cuts.length === 0) {
        if (callback) callback();
        return;
    }
    below.cutScene = sceneId;
    below.cutSceneCuts = scene.cuts;
    below.cutSceneIndex = 0;
    below.cutSceneStart = null;
    below.cutSceneCallback = callback || null;
    document.getElementById("cutsceneOverlay").style.display = "flex";
    cutSceneLoop();
}

function cutSceneLoop(timestamp) {
    if (!below.cutScene) return;
    if (!below.cutSceneStart) below.cutSceneStart = timestamp || performance.now();
    var now = timestamp || performance.now();
    var elapsed = now - below.cutSceneStart;

    var stage = document.getElementById("cutsceneStage");
    stage.innerHTML = "";

    var allDone = true;
    var maxEndTime = 0;

    for (var i = 0; i < below.cutSceneCuts.length; i++) {
        var cut = below.cutSceneCuts[i];
        var total = cut.fadeIn + cut.hold + cut.fadeOut;
        var cutStart = cut.start !== undefined ? cut.start : maxEndTime;
        var cutEnd = cutStart + total;
        var cutElapsed = elapsed - cutStart;

        if (cutElapsed < 0) continue;
        maxEndTime = Math.max(maxEndTime, cutEnd);

        if (cutElapsed >= total) continue;
        allDone = false;

        var opacity = 1;
        if (cutElapsed < cut.fadeIn) {
            opacity = cutElapsed / cut.fadeIn;
        } else if (cutElapsed < cut.fadeIn + cut.hold) {
            opacity = 1;
        } else {
            opacity = 1 - (cutElapsed - cut.fadeIn - cut.hold) / cut.fadeOut;
        }

        if (opacity <= 0) continue;

        var driftX = (cut.driftX || 0) * (cutElapsed / total);
        var driftY = (cut.driftY || 0) * (cutElapsed / total);

        if (cut.type === "fade") {
            var fadeDiv = document.createElement("div");
            fadeDiv.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:" + (cut.color || "#000") + ";opacity:" + opacity + ";z-index:4999;pointer-events:none;";
            document.body.appendChild(fadeDiv);
        } else if (cut.type === "image") {
            var img = document.createElement("img");
            img.src = "images/" + cut.src;
            img.style.cssText = "left:" + cut.x + "%;top:" + cut.y + "%;width:" + (cut.width || 200) + "px;opacity:" + opacity + ";transform:translate(" + driftX + "px," + driftY + "px);";
            stage.appendChild(img);
        } else if (cut.type === "text") {
            var textDiv = document.createElement("div");
            textDiv.className = "cutscene-text";
            textDiv.textContent = cut.text || "";
            textDiv.style.cssText = "left:" + cut.x + "%;top:" + cut.y + "%;font-size:" + (cut.fontSize || 18) + "px;opacity:" + opacity + ";transform:translate(" + driftX + "px," + driftY + "px);" + (cut.fontStyle ? "font-style:" + cut.fontStyle + ";" : "");
            stage.appendChild(textDiv);
        }
    }

    if (allDone) {
        endCutScene();
    } else {
        window.requestAnimationFrame(cutSceneLoop);
    }
}

function endCutScene() {
    below.cutScene = null;
    below.cutSceneCuts = null;
    below.cutSceneIndex = 0;
    below.cutSceneStart = null;
    // Remove any fade divs
    var fades = document.querySelectorAll("div[style*='z-index:4999']");
    fades.forEach(function(f) { f.remove(); });
    document.getElementById("cutsceneOverlay").style.display = "none";
    var cb = below.cutSceneCallback;
    below.cutSceneCallback = null;
    if (cb) cb();
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
    
function renderPasswordInput() {
    var gameLogDiv = document.getElementById("gameLogDiv");
    var container = document.createElement("DIV");
    container.id = "passwordInputContainer";
    container.className = "password-input-container";
    
    var prompt = document.createElement("SPAN");
    prompt.className = "password-prompt";
    prompt.textContent = "Enter password: ";
    container.appendChild(prompt);
    
    var input = document.createElement("INPUT");
    input.type = "text";
    input.id = "passwordField";
    input.className = "password-field";
    container.appendChild(input);
    
    var button = document.createElement("BUTTON");
    button.textContent = "OK";
    button.className = "password-submit";
    button.onclick = submitPassword;
    container.appendChild(button);
    
    gameLogDiv.appendChild(container);
    scrollLogToBottom();
    input.focus();
    
    input.onkeydown = function(e) {
        e.stopPropagation();
        if (e.keyCode === 13) { e.preventDefault(); submitPassword(); }
        else if (e.keyCode === 27) { e.preventDefault(); cancelPasswordInput(); }
    };
}

function submitPassword() {
    var input = document.getElementById("passwordField");
    if (!input) return;
    var entered = input.value.trim().toLowerCase();
    var password = below.passwordInput ? below.passwordInput.obstaclePos : null;
    if (!password) return;
    
    var curMap = below.gameData.player.currentMap;
    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
        return obstacleOccupies(o, below.passwordInput.obstaclePos.x, below.passwordInput.obstaclePos.y);
    });
    
    var container = document.getElementById("passwordInputContainer");
    if (container && container.parentNode) container.parentNode.removeChild(container);
    
    if (obstacle && entered === (obstacle.password || "").toLowerCase()) {
        obstacle.closed = false;
        obstacle.blocking = false;
        obstacle.icon = "door_open.png";
        var obsType = below.gameData.obstacleTypes[obstacle.type];
        obstacle.choiceEvents = (obsType ? obsType.openChoiceEvents : null) || [8, 3];
        below.gameData.mapLog.push("The door swings open!");
        
        // Move jester to map 1 at (3,-8) and unlock mole hint dialog
        var jesterIdx = -1;
        for (var i = 0; i < below.gameData.mapData[0].npcs.length; i++) {
            if (below.gameData.mapData[0].npcs[i].type === 2) {
                jesterIdx = i;
                break;
            }
        }
        if (jesterIdx !== -1) {
            var jester = below.gameData.mapData[0].npcs.splice(jesterIdx, 1)[0];
            jester.position = { x: 8, y: 2 };
            jester.destPos = {};
            below.gameData.mapData[1].npcs.push(jester);
            var jesterq9 = jester.dialogOptions.find(function(d) { return d.id === "jesterq9"; });
            var jesterq1 = jester.dialogOptions.find(function(d) { return d.id === "jesterq1"; });
            if (jesterq9) jesterq9.available = true;
            if (jesterq1) jesterq1.available = false;
        }
        
        // Disable statue dialog options after door opens
        var medusaNpcMap1 = below.gameData.mapData[1].npcs.find(function(n) { return n.type === 3; });
        if (medusaNpcMap1 && medusaNpcMap1.dialogOptions) {
            var medusaq0 = medusaNpcMap1.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
            if (medusaq0 && medusaq0.options) {
                var statueOptionIds = ["medusaa1s1","medusaa1s2","medusaa1s3","medusaa1s4","medusaa1s5","medusaa1s6"];
                medusaq0.options.forEach(function(opt) {
                    if (statueOptionIds.indexOf(opt.id) !== -1) {
                        opt.available = false;
                    }
                });
            }
        }
        
        below.passwordInput = null;
        drawMapCanvas();
    } else {
        below.gameData.mapLog.push("Wrong password.");
        below.passwordInput = null;
    }
    closeChoiceEvent();
}

function cancelPasswordInput() {
    var container = document.getElementById("passwordInputContainer");
    if (container && container.parentNode) container.parentNode.removeChild(container);
    below.passwordInput = null;
    closeChoiceEvent();
}

function toggleInventory() {
    var inventoryDiv = document.getElementById("inventoryDiv");
    if (inventoryDiv.style.display === 'none') {
        showInventory();
    } else {
        closeInventory();
    }
}

function closeInventory() {
    var inventoryDiv = document.getElementById("inventoryDiv");
    inventoryDiv.style.display = 'none';
    // Restore game appearance
    var gameDiv = document.getElementById("gameDiv");
    gameDiv.style.opacity = "1";
    gameDiv.style.pointerEvents = "auto";
}

function showInventory(newItems) {
    var inventoryDiv = document.getElementById("inventoryDiv");
    var inventoryTable = document.getElementById("inventoryTable");
    var inventory = below.gameData.player.inventory;
    
    // Clear table
    inventoryTable.innerHTML = '';
    
    if (inventory.length === 0) {
        var row = inventoryTable.insertRow();
        var cell = row.insertCell();
        cell.colSpan = 2;
        cell.className = 'inventory-empty';
        cell.textContent = 'Your inventory is empty';
    } else {
        var colCount = 0;
        var row = null;
        inventory.forEach(function(itemTypeId) {
            var itemType = below.gameData.itemTypes[itemTypeId];
            if (itemType) {
                // Start new row every 2 items
                if (colCount % 2 === 0) {
                    row = inventoryTable.insertRow();
                }
                
                // Icon cell
                var iconCell = row.insertCell();
                var img = document.createElement('img');
                img.src = "images/" + itemType.icon;
                img.style.width = '64px';
                img.style.height = '64px';
                iconCell.appendChild(img);
                
                // Name + Description cell
                var infoCell = row.insertCell();
                if (newItems && newItems.indexOf(itemTypeId) !== -1) {
                    iconCell.classList.add("inventory-new-item");
                    infoCell.classList.add("inventory-new-item");
                }
                var nameDiv = document.createElement('div');
                nameDiv.textContent = itemType.name;
                nameDiv.style.fontWeight = 'bold';
                infoCell.appendChild(nameDiv);
                
                var descDiv = document.createElement('div');
                descDiv.textContent = itemType.description || '';
                descDiv.style.fontSize = '0.8em';
                descDiv.style.color = '#666';
                descDiv.style.fontStyle = 'italic';
                infoCell.appendChild(descDiv);
                
                // Equip indicator or badge
                if (below.equippedItem === itemTypeId) {
                    iconCell.classList.add("inventory-equipped");
                    infoCell.classList.add("inventory-equipped");
                    var eqBadge = document.createElement('span');
                    eqBadge.textContent = '✓ Equipped';
                    eqBadge.style.color = '#4CAF50';
                    eqBadge.style.fontSize = '0.75em';
                    eqBadge.style.fontWeight = 'bold';
                    eqBadge.style.display = 'inline-block';
                    eqBadge.style.marginTop = '2px';
                    infoCell.appendChild(eqBadge);
                } else {
                    // Make the item cells clickable to equip
                    var clickHandler = (function(id) {
                        return function(e) {
                            e.stopPropagation();
                            below.equippedItem = id;
                            showInventory();
                        };
                    })(itemTypeId);
                    iconCell.style.cursor = 'pointer';
                    iconCell.title = 'Click to equip';
                    infoCell.style.cursor = 'pointer';
                    infoCell.title = 'Click to equip';
                    iconCell.addEventListener('click', clickHandler);
                    infoCell.addEventListener('click', clickHandler);
                }
                
                colCount++;
            }
        });
    }
    
    inventoryDiv.style.display = 'block';
}

function closeInventory() {
    var inventoryDiv = document.getElementById("inventoryDiv");
    inventoryDiv.style.display = 'none';
}

respondToVisibility = function(element, callback) {
    var options = {
        root: document.documentElement
    }
    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            callback(entry.intersectionRatio > 0);
        });
    }, options);

    observer.observe(element);
}

function switchPage(page) {
    below.pages.forEach(function(curPage) {
        var pageEl = document.getElementById(curPage);
        if (page === curPage) {
            pageEl.style.display = "flex";
            if (curPage === 'newGameDiv' || curPage === 'resumeGameDiv') {
                updateSlotColors(curPage);
            } else if (curPage === 'titleScreen' || curPage === 'characterSelectDiv') {
                // Select first item
                var items = pageEl.querySelectorAll('.below-front-menu-item');
                items.forEach(function(item, index) {
                    if (index === 0) {
                        item.classList.add('menu-selected');
                    } else {
                        item.classList.remove('menu-selected');
                    }
                });
            }
        }
        else {
            pageEl.style.display = "none";
        }
    });
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
  below.gameData.player.currentMap = mapId;
  below.gameData.player.currentLocation.x = entryX;
  below.gameData.player.currentLocation.y = entryY;
  below.gameData.player.destinationLocation = {};
  below.gameData.mapLog = [];
  if (text) {
    below.gameData.mapLog.push(text);
  }
  // One-time removal of Jester and Medusa from map 1 on first visit to The Depths
  if (mapId === 3 && !below.gameData.player.depthsVisited) {
    below.gameData.player.depthsVisited = true;
    for (var ci = below.gameData.mapData[1].npcs.length - 1; ci >= 0; ci--) {
      var npcType = below.gameData.mapData[1].npcs[ci].type;
      if (npcType === 2 || npcType === 3) {
        below.gameData.mapData[1].npcs.splice(ci, 1);
      }
    }
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

function loadGame(game) {
    var localstorageBelow = JSON.parse(localStorage["below"]);
    below.gameData = localstorageBelow.saves[game];
    mergeDialogOptions(below.gameData);
}

function foundTile(x, y) {
    var index = 'x' + (x < 0 ? 'm' : '') + Math.abs(x) + 'y' + (y < 0 ? 'm' : '') + Math.abs(y);
    return below.gameData.mapData[below.gameData.player.currentMap].tiles[index];
    //return below.gameData.mapData[below.gameData.player.currentMap].tiles.find(function(element) {
    //    return (element.x === x && element.y === y);
    //});
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

function getChoiceEventOptions(choiceEventIds) {
    var texts = {
        1: "Search rock",
        2: "Push rock",
        3: "Move on",
        4: "Behold",
        5: "Attack",
        6: "Search",
        7: "Unlock door",
        8: "Pass through",
        9: "Talk",
        10: "Trade",
        11: "Intimidate",
        12: "Enter password"
    };
    return choiceEventIds.map(function(id) {
        var option = { text: texts[id] };
        if (id === 1) {
            option.action = function() { below.gameData.mapLog.push("It's a rock"); maintainMapLog(); };
        } else if (id === 2) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.obstaclePos) {
                    pushObstacle(below.choiceEvent.obstaclePos);
                }
            };
        } else if (id === 3) {
            option.action = function() { };
        } else if (id === 4) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.monsterType) {
                    var desc = below.gameData.monsterTypes[below.choiceEvent.monsterType].beholdDesc || "A creature";
                    below.gameData.mapLog.push(desc);
                    maintainMapLog();
                }
            };
        } else if (id === 6) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.obstaclePos) {
                    var curMap = below.gameData.player.currentMap;
                    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
                        return obstacleOccupies(o, below.choiceEvent.obstaclePos.x, below.choiceEvent.obstaclePos.y);
                    });
                    if (obstacle) {
                        var obstacleType = below.gameData.obstacleTypes[obstacle.type];
                        if (obstacle.type === 8 && obstacle.statueDesc && !obstacle.searched) {
                            obstacle.searched = true;
                            below.gameData.mapLog.push(obstacle.statueDesc);
                            maintainMapLog();
                            if (obstacle.dialogUnlock) {
                                var medusa = below.gameData.mapData[curMap].npcs.find(function(n) {
                                    return n.type === 3;
                                });
                                if (medusa && medusa.dialogOptions) {
                                    var q1 = medusa.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
                                    if (q1 && q1.options) {
                                        var unlockOpt = q1.options.find(function(o) { return o.id === "medusaa1s" + obstacle.dialogUnlock.slice(-1); });
                                        if (unlockOpt) unlockOpt.available = true;
                                    }
                                }
                            }
                        } else if (obstacle.type === 8 && obstacle.searched) {
                            below.gameData.mapLog.push("The marble figure stares blankly into the dark. You've already learned what you can from it.");
                            maintainMapLog();
                        } else {
                            var searchItemType = obstacle.itemType !== undefined ? obstacle.itemType : (obstacleType ? obstacleType.itemType : undefined);
                            if (searchItemType) {
                                var itemTypeId = searchItemType;
                                below.gameData.player.inventory.push(itemTypeId);
                                if (obstacle.itemType !== undefined) {
                                    delete obstacle.itemType;
                                } else if (obstacleType && obstacleType.itemType !== undefined) {
                                    delete obstacleType.itemType;
                                }
                                var defaultMessages = [
                                    "You searched here before - nothing but dust.",
                                    "You rummage through it - empty.",
                                    "Just cobwebs and dust.",
                                    "You find nothing of interest.",
                                    "Searched. Nothing here."
                                ];
                                var randomMsg = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
                                var tileIndex = 'x' + (obstacle.position.x < 0 ? 'm' : '') + Math.abs(obstacle.position.x) + 'y' + (obstacle.position.y < 0 ? 'm' : '') + Math.abs(obstacle.position.y);
                                if (below.gameData.mapData[curMap].tiles[tileIndex]) {
                                    below.gameData.mapData[curMap].tiles[tileIndex].text = randomMsg;
                                }
                                setTimeout(function() { showInventory([itemTypeId]); }, 50);
                            } else {
                                var tileIndex = 'x' + (obstacle.position.x < 0 ? 'm' : '') + Math.abs(obstacle.position.x) + 'y' + (obstacle.position.y < 0 ? 'm' : '') + Math.abs(obstacle.position.y);
                                var tile = below.gameData.mapData[curMap].tiles[tileIndex];
                                if (tile && tile.text) {
                                    below.gameData.mapLog.push(tile.text);
                                } else {
                                    below.gameData.mapLog.push("It is empty.");
                                }
                                maintainMapLog();
                            }
                        }
                    }
                }
            };
        } else if (id === 7) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.obstaclePos) {
                    var curMap = below.gameData.player.currentMap;
                    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
                        return obstacleOccupies(o, below.choiceEvent.obstaclePos.x, below.choiceEvent.obstaclePos.y);
                    });
                    if (obstacle) {
                        var obstacleType = below.gameData.obstacleTypes[obstacle.type];
                        var keyId = obstacle.keyId || obstacleType.keyId;
                        var isClosed = obstacle.closed !== undefined ? obstacle.closed : obstacleType.closed;
                        if (keyId) {
                            var hasKey = below.gameData.player.inventory.some(function(itemId) {
                                return itemId === keyId;
                            });
                            if (hasKey && isClosed) {
                                obstacle.closed = false;
                                obstacle.icon = "door_open.png";
                                obstacle.blocking = false;
                                obstacle.choiceEvents = obstacle.openChoiceEvents || obstacleType.openChoiceEvents;
                                below.gameData.mapLog.push("You unlocked the door!");
                                maintainMapLog();
                            } else if (!isClosed) {
                                below.gameData.mapLog.push("The door is already open.");
                                maintainMapLog();
                            } else if (below.gameData.player.inventory.length > 0) {
                                below.gameData.mapLog.push("None of your keys seems to fit");
                                maintainMapLog();
                            } else {
                                below.gameData.mapLog.push("You need a key to unlock this door.");
                                maintainMapLog();
                            }
                        }
                    }
                }
            };
        } else if (id === 8) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.obstaclePos) {
                    var curMap = below.gameData.player.currentMap;
                    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
                        return obstacleOccupies(o, below.choiceEvent.obstaclePos.x, below.choiceEvent.obstaclePos.y);
                    });
                    if (obstacle) {
                        var obstacleType = below.gameData.obstacleTypes[obstacle.type];
                        var isClosed = obstacle.closed !== undefined ? obstacle.closed : obstacleType.closed;
                        if (!isClosed) {
                            below.gameData.player.currentLocation.x = obstacle.position.x;
                            below.gameData.player.currentLocation.y = obstacle.position.y;
                            below.gameData.mapLog.push("You pass through the door.");
                            maintainMapLog();
                        } else {
                            below.gameData.mapLog.push("The door is locked.");
                            maintainMapLog();
                        }
                    }
                }
            };
        } else if (id === 9) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.npcType) {
                    var npcType = below.gameData.npcTypes[below.choiceEvent.npcType];
                    var msg = (below.choiceEvent.npcAgitated ? npcType.dialog.agitated : npcType.dialog.greeting) || "The character remains silent.";
                    below.gameData.mapLog.push(msg);
                    maintainMapLog();
                }
            };
        } else if (id === 10) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.npcType) {
                    var npcType = below.gameData.npcTypes[below.choiceEvent.npcType];
                    below.gameData.mapLog.push(npcType.agenda || "The merchant sizes you up...");
                    maintainMapLog();
                }
            };
        } else if (id === 11) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.npcType) {
                    var npcType = below.gameData.npcTypes[below.choiceEvent.npcType];
                    if (below.choiceEvent.npcPos) {
                        var curMap = below.gameData.player.currentMap;
                        var npc = below.gameData.mapData[curMap].npcs.find(function(n) {
                            return n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
                        });
                        if (npc) {
                            npc.agitated = true;
                        }
                    }
                    var msg = npcType.dialog.agitated || "The character looks intimidated!";
                    below.gameData.mapLog.push(msg);
                    maintainMapLog();
                }
            };
        } else if (id === 12) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.obstaclePos) {
                    var curMap = below.gameData.player.currentMap;
                    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
                        return obstacleOccupies(o, below.choiceEvent.obstaclePos.x, below.choiceEvent.obstaclePos.y);
                    });
                    if (obstacle) {
                        var isClosed = obstacle.closed !== undefined ? obstacle.closed : true;
                        if (isClosed) {
                            below.passwordInput = {
                                obstaclePos: { x: obstacle.position.x, y: obstacle.position.y }
                            };
                            renderPasswordInput();
                        } else {
                            below.gameData.mapLog.push("The door is already open.");
                            maintainMapLog();
                        }
                    }
                }
            };
        }
        return option;
    });
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

function getBlockedChoiceEvents(x, y) {
    var curMap = below.gameData.player.currentMap;
    // Check NPCs first (they block and have interactions)
    var npc = below.gameData.mapData[curMap].npcs.find(function(n) {
        return n.position && n.position.x === x && n.position.y === y;
    });
    // New dialog system uses npc.dialogOptions, old system uses npcType.choiceEvents
    if (npc && npc.dialogOptions) {
        // This is handled in handleBlockedInteraction, return null here
        return null;
    }
    if (npc && below.gameData.npcTypes[npc.type].choiceEvents) {
        return getChoiceEventOptions(below.gameData.npcTypes[npc.type].choiceEvents);
    }
    // Check obstacles
    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
        return obstacleOccupies(o, x, y);
    });
    if (obstacle) {
        var obstacleType = below.gameData.obstacleTypes[obstacle.type];
        if (obstacleType && obstacleType.blocking) {
            // Instance choiceEvents override type choiceEvents
            var choiceEvents = obstacle.choiceEvents || obstacleType.choiceEvents;
            if (choiceEvents) {
                return getChoiceEventOptions(choiceEvents);
            }
        }
    }
    return null;
}

function handleBlockedInteraction(x, y) {
    var curMap = below.gameData.player.currentMap;
    // Check for NPC first
    var npc = below.gameData.mapData[curMap].npcs.find(function(n) {
        return n.position && n.position.x === x && n.position.y === y;
    });
    // Handle NPC dialog system
    if (npc && npc.dialogOptions) {
        // Special case: Sam Shale mid-walk dialog
        if (npc.type === 5 && npc.walkPath && npc.walkPath.length > 0) {
            below.choiceEvent = {
                selectedIndex: 0,
                message: "This alley's seen things. Bodies. Deals. Dirty deals about bodies. Stay close and don't touch anything. Actually, don't even look at anything. Just... look at my back. That's safe.",
                npcPos: { x: x, y: y },
                npcType: npc.type,
                speakerNpcType: npc.type,
                npcAgitated: npc.agitated || false,
                dialogId: "detective_walking",
                dialogOptions: [
                    {
                        id: "detective_walk_a1",
                        text: "You've been here before?",
                        available: true
                    },
                    {
                        id: "detective_walk_a2",
                        text: "...",
                        available: true
                    }
                ],
                isDialog: true
            };
            renderChoiceEvent();
            return;
        }

        // Find first available dialog (checking availability and item requirements)
        var availableDialog = npc.dialogOptions.find(function(d) {
            if (!d.available) return false;
            if (d.requiresItems) {
                var hasItem = d.requiresItems.some(function(itemId) {
                    return below.gameData.player.inventory.indexOf(itemId) !== -1;
                });
                if (!hasItem) return false;
            }
            return true;
        });
        if (availableDialog) {
            below.choiceEvent = {
                selectedIndex: 0,
                message: availableDialog.text,
                npcPos: { x: x, y: y },
                npcType: npc.type,
                speakerNpcType: availableDialog.speaker || npc.type,
                npcAgitated: npc.agitated || false,
                dialogId: availableDialog.id,
                dialogOptions: availableDialog.options.filter(function(o) {
                    if (o.available === false) return false;
                    if (o.requiresItems) {
                        var hasItem = o.requiresItems.some(function(itemId) {
                            return below.gameData.player.inventory.indexOf(itemId) !== -1;
                        });
                        if (!hasItem) return false;
                    }
                    if (o.blockedByItems) {
                        var hasBlocked = o.blockedByItems.some(function(itemId) {
                            return below.gameData.player.inventory.indexOf(itemId) !== -1;
                        });
                        if (hasBlocked) return false;
                    }
                    return true;
                }),
                isDialog: true
            };
            renderChoiceEvent();
            return;
        }
    }
    
    // Fall back to old choice events system
    var choiceEvents = getBlockedChoiceEvents(x, y);
    if (choiceEvents) {
        var msg = "";
        if (npc) {
            var npcType = below.gameData.npcTypes[npc.type];
            msg = (npc.agitated ? npcType.dialog.agitated : npcType.dialog.greeting) || "A character blocks your path.";
        } else {
            msg = getBlockedMessage(x, y);
        }
        below.choiceEvent = {
            selectedIndex: 0,
            message: msg,
            obstaclePos: { x: x, y: y },
            npcPos: npc ? { x: x, y: y } : null,
            npcType: npc ? npc.type : null,
            npcAgitated: npc ? npc.agitated : false,
            options: choiceEvents
        };
        renderChoiceEvent();
    } else {
        var msg = getBlockedMessage(x, y);
        if (msg) {
            below.gameData.mapLog.push(msg);
            maintainMapLog();
        }
    }
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
        below.gameData.mapLog.push("Cannot push the rock that way.");
        maintainMapLog();
        return false;
    }
    // Check if new position is blocked by another blocking object
    if (isBlocked(newX, newY)) {
        below.gameData.mapLog.push("Something is blocking the way.");
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
            below.gameData.mapLog.push("The obstacle is too large to push.");
            maintainMapLog();
            return false;
        }
        obstacle.position.x = newX;
        obstacle.position.y = newY;
        below.gameData.mapLog.push("You push the rock.");
        maintainMapLog();
        drawMapCanvas();
        return true;
    }
    return false;
}

function tryAutoPush(x, y, fromX, fromY) {
    var curMap = below.gameData.player.currentMap;
    var rock = (below.gameData.mapData[curMap].obstacles || []).find(function(o) {
        return o.position && o.position.x === x && o.position.y === y && o.type === 9;
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

function moveOnMap(e) {
    // Don't process movement if choice event is active
    if (below.choiceEvent) return;
    
    var curY = below.gameData.player.currentLocation.y,
        curX = below.gameData.player.currentLocation.x,
        playerMoved = false;
    
    if (e.keyCode === 69) {
        e.preventDefault();
        if (below.equippedItem === null) {
            below.gameData.mapLog.push("You have nothing equipped. Press Q to open inventory and equip an item.");
            maintainMapLog();
        } else if (below.equippedItem === 14 && below.gameData.player.currentMap === 0) {
            var bats = below.gameData.mapData[0].monsters.filter(function(m) { return m.type === 2; });
            if (bats.length > 0) {
                below.gameData.mapLog.push("You swing the bat swatter but the bats weave through the air too fast in this darkness.");
                maintainMapLog();
            } else {
                below.gameData.mapLog.push("You swing the bat swatter. Nothing to hit here.");
                maintainMapLog();
            }
        } else if (below.equippedItem === 15 && below.gameData.player.currentMap === 0) {
            console.log("[below] centipede cleaner used on map 0, player at", curX, curY);
            var curMap = below.gameData.player.currentMap;
            var px = Math.round(curX);
            var py = Math.round(curY);
            var centipede = null;
            var centIdx = -1;
            for (var mi = 0; mi < below.gameData.mapData[curMap].monsters.length; mi++) {
                var m = below.gameData.mapData[curMap].monsters[mi];
                if (m.type === 3 && Math.round(m.position.x) === px && Math.round(m.position.y) === py) {
                    centipede = m;
                    centIdx = mi;
                    break;
                }
            }
            if (centipede) {
                below.gameData.mapData[curMap].monsters.splice(centIdx, 1);
                below.gameData.mapLog.push("You squirt the centipede with Crawl-End. It shrivels and dissolves.");
                maintainMapLog();
                handleAllCentipedesCleared();
            } else {
                below.gameData.mapLog.push("You squirt the Crawl-End on the floor. Nothing happens. There are no centipedes here.");
                maintainMapLog();
            }
        } else {
            var itemType = below.gameData.itemTypes[below.equippedItem];
            if (itemType && itemType.useText) {
                below.gameData.mapLog.push(itemType.useText);
                maintainMapLog();
            } else {
                below.gameData.mapLog.push("You use the " + (itemType ? itemType.name : "item") + " but nothing happens.");
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
                below.gameData.mapLog.push("The sisters seem more animated than before, as if expecting something.");
                maintainMapLog();
            }
        }
    }
    
    //drawMapCanvas();
}

function handleAllCentipedesCleared() {
    if (below.centipedesHandled) { console.log("[below] centipede: already handled, skipping"); return; }
    var map0 = below.gameData.mapData[0];
    var remaining = map0.monsters.filter(function(m) { return m.type === 3; });
    console.log("[below] centipede: remaining =", remaining.length);
    if (remaining.length > 0) return;
    below.centipedesHandled = true;
    console.log("[below] All centipedes cleared — moving Hermit to (2,-7)");
    below.gameData.mapLog.push("All centipedes have been cleared from the storage room!");
    maintainMapLog();
    console.log("[below] centipede: log pushed, now looking for Hermit NPC on map 0");
    var hermitNpc = map0.npcs.find(function(n) { return n.type === 1; });
    console.log("[below] centipede: hermitNpc =", hermitNpc);
    if (hermitNpc) {
        hermitNpc.position.x = 2;
        hermitNpc.position.y = -7;
        console.log("[below] centipede: Hermit moved to 2,-7");
        var doneD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_centipede_done"; });
        console.log("[below] centipede: doneD =", doneD);
        if (doneD) doneD.available = true;
        var introD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_centipede_intro"; });
        if (introD) introD.available = false;
        console.log("[below] centipede: dialogs updated");
    } else {
        console.log("[below] centipede: HERMIT NPC NOT FOUND ON MAP 0!");
    }
    drawMapCanvas();
    console.log("[below] centipede: drawMapCanvas called");
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
        var playerImg = below.gameData.player.icon === "boy.png" ? boyImg : girlImg;
        if (!playerImg.complete) playerImg.src = "images/" + below.gameData.player.icon;
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
                var img = type.icon === "bat.png" ? batImg : (type.icon === "rat.png" ? ratImg : (type.icon === "centipede.png" ? centipedeImg : new Image()));
                if (!img.complete) img.src = "images/" + type.icon;
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
                var img = new Image();
                if (iconName === "hermit.png") img = hermitImg || new Image();
                else if (iconName === "jester.png") img = jesterImg || new Image();
                else if (iconName === "merchant.png") img = merchantImg || new Image();
                else if (iconName === "medusa.png") img = medusaImg || new Image();
                else if (iconName === "mole.png") img = moleImg || new Image();
                else if (iconName === "detective.png") img = detectiveImg || new Image();
                else if (iconName === "ship.png") img = shipImg || new Image();
                else if (iconName === "charon.png") img = charonImg || new Image();
                else if (iconName === "sisters1.png") img = sisters1Img || new Image();
                else if (iconName === "sisters2.png") img = sisters2Img || new Image();
                if (!img.complete) img.src = "images/" + iconName;
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
    function getIconImage(iconName) {
        if (iconName === "rock.png") return rockImg;
        if (iconName === "rock_2x1.png") return rock2x1Img;
        if (iconName === "rock_1x2.png") return rock1x2Img;
        if (iconName === "rock_2x2.png") return rock2x2Img;
        if (iconName === "blood.png") return bloodImg;
        if (iconName === "table.png") return tableImg;
        if (iconName === "key1.png") return keyImg;
        if (iconName === "cupboard.png") return cupboardImg;
        if (iconName === "lightbeam.png") return lightbeamImg;
        if (iconName === "lamppost.png") return lamppostImg;
        if (iconName === "statue1.png") return statueImg1;
        if (iconName === "statue2.png") return statueImg2;
        if (iconName === "statue3.png") return statueImg3;
        if (iconName === "statue4.png") return statueImg4;
        if (iconName === "statue5.png") return statueImg5;
        if (iconName === "statue6.png") return statueImg6;
        if (iconName === "gem.png") return gemImg;
        if (iconName === "crate.png") return crateImg;
        if (iconName === "barrel.png") return barrelImg;
        if (iconName === "rudder.png") return rudderImg;
        if (iconName === "mast.png") return mastImg;
        if (iconName === "steering_wheel.png") return steeringWheelImg;
        if (iconName === "sail.png") return sailImg;
        if (iconName === "antidote.png") return antidoteImg;
        if (iconName === "bed.png") return bedImg;
        if (iconName === "chair.png") return chairImg;
        if (iconName === "mushroom_blue.png") return mushroomBlueImg;
        if (iconName === "mushroom_purple.png") return mushroomPurpleImg;
        if (iconName === "mushroom_yellow.png") return mushroomYellowImg;
        if (iconName === "crystal_pink.png") return crystalPinkImg;
        return null;
    }
    
    // Draw a large multi-tile obstacle icon spanning all its tiles
    function drawMultiObstacle(obstacle, type, ow, oh) {
        var iconName = obstacle.icon || type.icon;
        var img = null;
        if (iconName === "door_closed.png" || iconName === "door_open.png") {
            var isClosed = obstacle.closed !== undefined ? obstacle.closed : type.closed;
            img = isClosed ? doorClosedImg : doorOpenImg;
        } else if (iconName === "shimmer_wall_closed.png" || iconName === "shimmer_wall_open.png") {
            var isClosed = obstacle.closed !== undefined ? obstacle.closed : type.closed;
            img = isClosed ? shimmerWallClosedImg : shimmerWallOpenImg;
        } else {
            img = getIconImage(iconName);
            if (!img) { img = new Image(); if (!img.complete) img.src = "images/" + iconName; }
        }
        if (!img.complete) img.src = "images/" + iconName;
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
                img = isClosed ? doorClosedImg : doorOpenImg;
            } else if (iconName === "shimmer_wall_closed.png" || iconName === "shimmer_wall_open.png") {
                var isClosed = obstacle.closed !== undefined ? obstacle.closed : type.closed;
                img = isClosed ? shimmerWallClosedImg : shimmerWallOpenImg;
            } else {
                img = getIconImage(iconName);
                if (!img) { img = new Image(); if (!img.complete) img.src = "images/" + iconName; }
            }
            if (!img.complete) img.src = "images/" + iconName;
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
    var playerImg = below.gameData.player.icon === "boy.png" ? boyImg : girlImg;
    if (!playerImg.complete) playerImg.src = "images/" + below.gameData.player.icon;
    context.drawImage(playerImg, verticalCenter - (width/2), horizontalCenter - (width/2), width, width);
    
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
                if (!exitImg.complete) exitImg.src = "images/exit.png";
                context.drawImage(exitImg, (exit.position.x * width) + verticalCenter - horizontalOffset - (width/2), (exit.position.y * width) + horizontalCenter - verticalOffset - (width/2), width, width);
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
                    below.gameData.mapLog.push(tile['text']);
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
                    below.gameData.mapLog.push(tile['text']);
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
                if (exit) {
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
                        var mole = below.gameData.mapData[2].npcs.find(function(n) { return n.type === 4; });
                        if (mole) {
                            mole.position = { x: molePositions[cycle][0], y: molePositions[cycle][1] };
                            mole.destPos = {};
                        }
                    }
                    // Trigger "after_map0" cut-scene when leaving map 0 for map 1 the first time
                    if (curMap === 0 && exit.targetMap === 1 && !below.cutScenePlayed.after_map0) {
                        below.cutScenePlayed.after_map0 = true;
                        playCutScene("after_map0", function() {
                            changeMap(exit.targetMap, targetX, targetY, exit.text);
                        });
                    }
                    // Trigger "after_map5" cut-scene when leaving map 5 for map 6 the first time
                    else if (curMap === 5 && exit.targetMap === 6 && !below.cutScenePlayed.after_map5) {
                        below.cutScenePlayed.after_map5 = true;
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

            // Seeking bats — direct movement toward light, no collision checks
            if (batDoorOpen && monster.type === 2) {
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
            var remaining = (below.gameData.mapData[curMap].monsters || []).filter(function(m) { return m.type === 2; });
            if (remaining.length === 0) {
                below.gameData.mapLog.push("The last bat vanishes into the light. The passage is clear.");
                maintainMapLog();
                // Move Hermit to centipede quest position
                var hermitNpc = below.gameData.mapData[0].npcs.find(function(n) { return n.type === 1; });
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
        else {
            
        }
    });
}


