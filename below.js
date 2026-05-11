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
    gameData: null // Loaded from gamedata.js
};

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
            var exists = (curMap.obstacles || []).some(function(o) {
                return o.position && o.position.x === freshObs.position.x && o.position.y === freshObs.position.y;
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

var tableImg = new Image();
tableImg.src = "images/table.png";

var keyImg = new Image();
keyImg.src = "images/key1.png";

var bloodImg = new Image();
bloodImg.src = "images/blood.png";

var rockImg = new Image();
rockImg.src = "images/rock.png";

var cupboardImg = new Image();
cupboardImg.src = "images/cupboard.png";

var lightbeamImg = new Image();
lightbeamImg.src = "images/lightbeam.png";

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

function checkKey(e) {
    e = e || window.event;
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
        var npcType = below.choiceEvent.npcType !== undefined && below.choiceEvent.npcType !== null
            ? below.gameData.npcTypes[below.choiceEvent.npcType] : null;
        if (npcType && npcType.dialogImg) {
            var container = document.createElement("DIV");
            container.className = "below-dialog-message";
            var img = document.createElement("IMG");
            img.className = "below-dialog-img";
            img.src = "images/" + npcType.dialogImg;
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
    } else if (below.choiceEvent.monsterType !== null && below.choiceEvent.monsterType !== undefined) {
        var monsterType = below.gameData.monsterTypes[below.choiceEvent.monsterType];
        var msgNode = document.createElement("P");
        msgNode.className = "below-game-left-paragraph-current";
        if (below.choiceEvent.monsterPos) {
            var monster = below.gameData.mapData[below.gameData.player.currentMap].monsters.find(function(m) {
                return m.position.x === below.choiceEvent.monsterPos.x && m.position.y === below.choiceEvent.monsterPos.y;
            });
            if (monster && !isMonsterAloof(monster)) {
                msgNode.textContent = monsterType.aloofFalseMsg || "An angry monster attacks you!";
            } else {
                msgNode.textContent = monsterType.aloofTrueMsg || "A monster. It ignores you.";
            }
        }
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
    
    if (!below.passwordInput) {
        closeChoiceEvent();
    }
}

function closeChoiceEvent() {
    below.choiceEvent = null;
    // Clear log messages and UI
    below.gameData.mapLog = [];
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
        return o.position.x === below.passwordInput.obstaclePos.x && o.position.y === below.passwordInput.obstaclePos.y;
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
                img.style.width = '64px'; // 2x size
                img.style.height = '64px';
                iconCell.appendChild(img);
                
                // Name + Description cell
                var infoCell = row.insertCell();
                // Highlight newly acquired items
                if (newItems && newItems.indexOf(itemTypeId) !== -1) {
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
  below.gameData.player.currentMap = mapId;
  below.gameData.player.currentLocation.x = entryX;
  below.gameData.player.currentLocation.y = entryY;
  below.gameData.player.destinationLocation = {};
  below.gameData.mapLog = [];
  if (text) {
    below.gameData.mapLog.push(text);
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

function isBlocked(x, y) {
    var curMap = below.gameData.player.currentMap;
    // Check NPCs - they always block (unless attacked/intimidated)
    var blockedByNPC = below.gameData.mapData[curMap].npcs.some(function(n) {
        return n.position && n.position.x === x && n.position.y === y;
    });
    if (blockedByNPC) return true;
    // Check monsters - only block if monster is aloof
    var blockedByMonster = below.gameData.mapData[curMap].monsters.some(function(m) {
        if (!m.position) return false;
        var type = below.gameData.monsterTypes[m.type];
        if (!type) return false; // Skip if monster type undefined (e.g., NPC in monster array)
        var isAloof = m.aloof !== undefined ? m.aloof : type.aloof;
        return m.position.x === x && m.position.y === y && 
               type.blocking && 
               isAloof;
    });
    if (blockedByMonster) return true;
    // Check obstacles - instance blocking overrides type
    var obstacles = below.gameData.mapData[curMap].obstacles || [];
    var blockedByObstacle = obstacles.some(function(o) {
        if (!o.position) return false;
        var obsType = below.gameData.obstacleTypes[o.type];
        var isBlocking = o.blocking !== undefined ? o.blocking : (obsType ? obsType.blocking : false);
        return o.position.x === x && o.position.y === y && isBlocking;
    });
    return blockedByObstacle;
}

function isVisionBlocked(x, y) {
    var curMap = below.gameData.player.currentMap;
    var obstacles = below.gameData.mapData[curMap].obstacles || [];
    return obstacles.some(function(o) {
        if (!o.position) return false;
        var obsType = below.gameData.obstacleTypes[o.type];
        var isBlocking = o.blocking !== undefined ? o.blocking : (obsType ? obsType.blocking : false);
        return o.position.x === x && o.position.y === y && isBlocking;
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
    // Check monsters
    var monster = (below.gameData.mapData[curMap].monsters || []).find(function(m) {
        if (!m.position) return false;
        var mType = below.gameData.monsterTypes[m.type];
        return m.position.x === x && m.position.y === y && mType && mType.blocking;
    });
    if (monster) {
        var mType = below.gameData.monsterTypes[monster.type];
        return (mType ? mType.description : "") || "Not sure what good that would do";
    }
    // Check obstacles
    var obstacle = (below.gameData.mapData[curMap].obstacles || []).find(function(o) {
        if (!o.position) return false;
        var oType = below.gameData.obstacleTypes[o.type];
        return o.position.x === x && o.position.y === y && oType && oType.blocking;
    });
    if (obstacle) {
        var obsType = below.gameData.obstacleTypes[obstacle.type];
        return (obsType ? obsType.description : "") || "Not sure what good that would do";
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
        } else if (id === 5) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.monsterPos) {
                    var curMap = below.gameData.player.currentMap;
                    var monster = below.gameData.mapData[curMap].monsters.find(function(m) {
                        return m.position.x === below.choiceEvent.monsterPos.x && m.position.y === below.choiceEvent.monsterPos.y;
                    });
                    if (monster) {
                        monster.aloof = false;
                        monster.agitatedTicks = 10;
                        var monsterType = below.gameData.monsterTypes[monster.type];
                        var msg = monsterType.aloofFalseMsg || "The creature becomes agitated!";
                        below.gameData.mapLog.push(msg);
                        maintainMapLog();
                    }
                }
            };
        } else if (id === 6) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.obstaclePos) {
                    var curMap = below.gameData.player.currentMap;
                    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
                        return o.position.x === below.choiceEvent.obstaclePos.x && o.position.y === below.choiceEvent.obstaclePos.y;
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
                        } else if (obstacleType.itemType) {
                            var itemTypeId = obstacleType.itemType;
                             below.gameData.player.inventory.push(itemTypeId);
                            
                            delete obstacleType.itemType;
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
                                below.gameData.mapLog.push("The cupboard is empty.");
                            }
                            maintainMapLog();
                        }
                    }
                }
            };
        } else if (id === 7) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.obstaclePos) {
                    var curMap = below.gameData.player.currentMap;
                    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
                        return o.position.x === below.choiceEvent.obstaclePos.x && o.position.y === below.choiceEvent.obstaclePos.y;
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
                        return o.position.x === below.choiceEvent.obstaclePos.x && o.position.y === below.choiceEvent.obstaclePos.y;
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
                        return o.position.x === below.choiceEvent.obstaclePos.x && o.position.y === below.choiceEvent.obstaclePos.y;
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
    // Check monsters
    var monster = below.gameData.mapData[curMap].monsters.find(function(m) {
        return m.position.x === x && m.position.y === y && below.gameData.monsterTypes[m.type].blocking;
    });
    if (monster && below.gameData.monsterTypes[monster.type].choiceEvents) {
        return getChoiceEventOptions(below.gameData.monsterTypes[monster.type].choiceEvents);
    }
    // Check obstacles
    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
        return o.position.x === x && o.position.y === y;
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
    // Check for monster
    var monster = below.gameData.mapData[curMap].monsters.find(function(m) {
        if (!m.position) return false;
        return m.position.x === x && m.position.y === y && below.gameData.monsterTypes[m.type].blocking;
    });
    
    // Handle NPC dialog system
    if (npc && npc.dialogOptions) {
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
        } else if (monster) {
            var monsterType = below.gameData.monsterTypes[monster.type];
            if (isMonsterAloof(monster)) {
                msg = monsterType.aloofTrueMsg || "A monster. It ignores you.";
            } else {
                msg = monsterType.aloofFalseMsg || "An angry monster attacks you!";
            }
        } else {
            msg = getBlockedMessage(x, y);
        }
        below.choiceEvent = {
            selectedIndex: 0,
            message: msg,
            obstaclePos: { x: x, y: y },
            monsterPos: monster ? { x: x, y: y } : null,
            monsterType: monster ? monster.type : null,
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



function isMonsterAloof(m) {
    // Check instance first (set after attack), then fall back to type definition
    if (m.aloof !== undefined) return m.aloof;
    return below.gameData.monsterTypes[m.type].aloof;
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
        return o.position.x === obstaclePos.x && o.position.y === obstaclePos.y;
    });
    if (obstacle) {
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

function moveOnMap(e) {
    // Don't process movement if choice event is active
    if (below.choiceEvent) return;
    
    var curY = below.gameData.player.currentLocation.y,
        curX = below.gameData.player.currentLocation.x,
        playerMoved = false;
    
    if (e.keyCode === 69) {
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
        // Tile text will be shown when player arrives at destination
    }
    
    //drawMapCanvas();
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
    var el = document.getElementById("areaDescriptionDiv");
    if (el) {
        el.textContent = desc || "";
    }
}

function computeVisibleTiles() {
    var curMap = below.gameData.player.currentMap;
    var px = Math.round(below.gameData.player.currentLocation.x);
    var py = Math.round(below.gameData.player.currentLocation.y);
    var vision = below.gameData.player.vision || 2;
    var visible = {};
    var queue = [{x: px, y: py}];
    var visited = {};
    visited[px + "," + py] = true;
    while (queue.length > 0) {
        var cur = queue.shift();
        var key = cur.x + "," + cur.y;
        visible[key] = true;
        if (isVisionBlocked(cur.x, cur.y)) continue;
        var dist = Math.abs(cur.x - px) + Math.abs(cur.y - py);
        if (dist >= vision) continue;
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
                context.fillStyle = "#959595";
                context.fillRect(x, y, width, width);
                context.fillStyle = "#6C6C6C";
                context.fillRect(x + thickness, y + thickness, width - (thickness * 2), width - (thickness * 2));
            }
        }
    }
    
    // Add radial gradient overlay for vision
    var gradient = context.createRadialGradient(verticalCenter, horizontalCenter, visionPixels * 0.6, verticalCenter, horizontalCenter, visionPixels);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
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
        if (distanceM <= visionPixels && visibleTiles[monster.position.x + "," + monster.position.y]) {
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
        if (distanceN <= visionPixels && visibleTiles[npc.position.x + "," + npc.position.y]) {
            var type = below.gameData.npcTypes[npc.type];
            if (!type) return; // Skip if NPC type is undefined
                if (type.icon) {
                var img = new Image();
                if (type.icon === "hermit.png") img = hermitImg || new Image();
                else if (type.icon === "jester.png") img = jesterImg || new Image();
                else if (type.icon === "merchant.png") img = merchantImg || new Image();
                else if (type.icon === "medusa.png") img = medusaImg || new Image();
                else if (type.icon === "mole.png") img = moleImg || new Image();
                else if (type.icon === "detective.png") img = detectiveImg || new Image();
                if (!img.complete) img.src = "images/" + type.icon;
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
    // First pass: draw obstacles with drawOrder=1 (below player)
    (below.gameData.mapData[curMap].obstacles || []).forEach(function(obstacle) {
        var type = below.gameData.obstacleTypes[obstacle.type];
        var drawOrder = type.drawOrder || 1; // Default: draw below player
        if (drawOrder !== 1) return; // Skip for now
        
        // Calculate distance for vision check
        var distXO = (obstacle.position.x * width + verticalCenter - horizontalOffset) - verticalCenter;
        var distYO = (obstacle.position.y * width + horizontalCenter - verticalOffset) - horizontalCenter;
        var distanceO = Math.sqrt(distXO * distXO + distYO * distYO);
        
        // Check vision and line-of-sight
        if (distanceO <= visionPixels && visibleTiles[obstacle.position.x + "," + obstacle.position.y]) {
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
                    if (iconName === "rock.png") img = rockImg;
                    else if (iconName === "blood.png") img = bloodImg;
                    else if (iconName === "table.png") img = tableImg;
                    else if (iconName === "key1.png") img = keyImg;
                    else if (iconName === "cupboard.png") img = cupboardImg;
                    else if (iconName === "lightbeam.png") img = lightbeamImg;
                    else if (iconName === "statue1.png") img = statueImg1;
                    else if (iconName === "statue2.png") img = statueImg2;
                    else if (iconName === "statue3.png") img = statueImg3;
                    else if (iconName === "statue4.png") img = statueImg4;
                    else if (iconName === "statue5.png") img = statueImg5;
                    else if (iconName === "statue6.png") img = statueImg6;
                    else if (iconName === "gem.png") img = gemImg;
                    else img = new Image();
                }
                if (!img.complete) img.src = "images/" + iconName;
                context.drawImage(img, (obstacle.position.x * width) + verticalCenter - horizontalOffset - (width/2), (obstacle.position.y * width) + horizontalCenter - verticalOffset - (width/2), width, width);
            } else {
                context.fillStyle = type.color || "#433900";
                context.fillRect((obstacle.position.x * width) - (width/2) + verticalCenter - horizontalOffset, (obstacle.position.y * width) - (width/2) + horizontalCenter - verticalOffset, width, width);
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
        if (drawOrder !== 2) return; // Skip - only draw top-layer obstacles
        
        // Calculate distance for vision check
        var distXO = (obstacle.position.x * width + verticalCenter - horizontalOffset) - verticalCenter;
        var distYO = (obstacle.position.y * width + horizontalCenter - verticalOffset) - horizontalCenter;
        var distanceO = Math.sqrt(distXO * distXO + distYO * distYO);
        
        if (distanceO <= visionPixels && visibleTiles[obstacle.position.x + "," + obstacle.position.y]) {
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
                    if (iconName === "rock.png") img = rockImg;
                    else if (iconName === "blood.png") img = bloodImg;
                    else if (iconName === "table.png") img = tableImg;
                    else if (iconName === "key1.png") img = keyImg;
                    else if (iconName === "cupboard.png") img = cupboardImg;
                    else if (iconName === "lightbeam.png") img = lightbeamImg;
                    else if (iconName === "statue1.png") img = statueImg1;
                    else if (iconName === "statue2.png") img = statueImg2;
                    else if (iconName === "statue3.png") img = statueImg3;
                    else if (iconName === "statue4.png") img = statueImg4;
                    else if (iconName === "statue5.png") img = statueImg5;
                    else if (iconName === "statue6.png") img = statueImg6;
                    else if (iconName === "gem.png") img = gemImg;
                    else img = new Image();
                }
                if (!img.complete) img.src = "images/" + iconName;
                
                // Apply opacity if defined
                var opacity = type.opacity !== undefined ? type.opacity : 1.0;
                if (opacity < 1.0) {
                    context.globalAlpha = opacity;
                }
                context.drawImage(img, (obstacle.position.x * width) + verticalCenter - horizontalOffset - (width/2), (obstacle.position.y * width) + horizontalCenter - verticalOffset - (width/2), width, width);
                if (opacity < 1.0) {
                    context.globalAlpha = 1.0;
                }
            } else {
                var opacity = type.opacity !== undefined ? type.opacity : 1.0;
                if (opacity < 1.0) {
                    context.globalAlpha = opacity;
                }
                context.fillStyle = type.color || "#433900";
                context.fillRect((obstacle.position.x * width) - (width/2) + verticalCenter - horizontalOffset, (obstacle.position.y * width) - (width/2) + horizontalCenter - verticalOffset, width, width);
                if (opacity < 1.0) {
                    context.globalAlpha = 1.0;
                }
            }
        }
    });
    
    // EXITS (drawn on top of everything)
    var exits = below.gameData.mapData[curMap].exits;
    if (exits) {
        exits.forEach(function(exit) {
            var distXE = (exit.position.x * width + verticalCenter - horizontalOffset) - verticalCenter;
            var distYE = (exit.position.y * width + horizontalCenter - verticalOffset) - horizontalCenter;
            var distanceE = Math.sqrt(distXE * distXE + distYE * distYE);
            if (distanceE <= visionPixels && visibleTiles[exit.position.x + "," + exit.position.y]) {
                if (!exitImg.complete) exitImg.src = "images/exit.png";
                context.drawImage(exitImg, (exit.position.x * width) + verticalCenter - horizontalOffset - (width/2), (exit.position.y * width) + horizontalCenter - verticalOffset - (width/2), width, width);
            }
        });
    }
    
    //gameDivCenter.appendChild(canvas);
}

function mapGameLoop() {
    // This one loops and loops
    below.tick = window.requestAnimationFrame(mapGameLoop);
    var curMap = below.gameData.player.currentMap;
    // Don't process any movement if choice event or splash is active
    if (below.choiceEvent || below.splashActive) return;
    
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
        // Calculate new monster movement
        below.gameData.mapData[curMap].monsters.forEach(function(monster) {
            // Decrement agitated timer
            if (monster.agitatedTicks !== undefined) {
                monster.agitatedTicks--;
                if (monster.agitatedTicks <= 0) {
                    delete monster.agitatedTicks;
                    delete monster.aloof;
                }
            }
            // Initialize destPos if missing
            if (!monster.destPos) monster.destPos = { x: null, y: null, xVelocity: null, yVelocity: null };
            // First, do monster move?
            var type = below.gameData.monsterTypes[monster.type];
            if (!type) return; // Skip if monster type is undefined
            if (Math.random() < type.movement) {
                // What direction do it move?
                var dir = (Math.floor(Math.random() * 4)) + 1;
                if (dir === 1 && foundTile(monster.position.x, monster.position.y - 1)) {
                    if (monster.position.x === below.gameData.player.currentLocation.x && monster.position.y - 1 === below.gameData.player.currentLocation.y) {
                        if (!isMonsterAloof(monster)) {
                            var monsterType = below.gameData.monsterTypes[monster.type];
                            var msg = monsterType.aloofFalseMsg || "An angry monster attacks you!";
                            below.choiceEvent = {
                                selectedIndex: 0,
                                message: msg,
                                monsterPos: { x: monster.position.x, y: monster.position.y },
                                monsterType: monster.type,
                                options: getChoiceEventOptions(below.gameData.monsterTypes[monster.type].choiceEvents)
                            };
                            renderChoiceEvent();
                        }
                    } else if (!isBlocked(monster.position.x, monster.position.y - 1) && isTileAllowed(monster, monster.position.x, monster.position.y - 1)) {
                        monster.destPos.yVelocity = -1;
                        monster.destPos.y = monster.position.y - 1;
                    }
                }
                else if (dir === 2 && foundTile(monster.position.x, monster.position.y + 1)) {
                    if (monster.position.x === below.gameData.player.currentLocation.x && monster.position.y + 1 === below.gameData.player.currentLocation.y) {
                        if (!isMonsterAloof(monster)) {
                            var monsterType = below.gameData.monsterTypes[monster.type];
                            var msg = monsterType.aloofFalseMsg || "An angry monster attacks you!";
                            below.choiceEvent = {
                                selectedIndex: 0,
                                message: msg,
                                monsterPos: { x: monster.position.x, y: monster.position.y },
                                monsterType: monster.type,
                                options: getChoiceEventOptions(below.gameData.monsterTypes[monster.type].choiceEvents)
                            };
                            renderChoiceEvent();
                        }
                    } else if (!isBlocked(monster.position.x, monster.position.y + 1) && isTileAllowed(monster, monster.position.x, monster.position.y + 1)) {
                        monster.destPos.yVelocity = 1;
                        monster.destPos.y = monster.position.y + 1;
                    }
                }
                else if (dir === 3 && foundTile(monster.position.x - 1, monster.position.y)) {
                    if (monster.position.x - 1 === below.gameData.player.currentLocation.x && monster.position.y === below.gameData.player.currentLocation.y) {
                        if (!isMonsterAloof(monster)) {
                            var monsterType = below.gameData.monsterTypes[monster.type];
                            var msg = monsterType.aloofFalseMsg || "An angry monster attacks you!";
                            below.choiceEvent = {
                                selectedIndex: 0,
                                message: msg,
                                monsterPos: { x: monster.position.x, y: monster.position.y },
                                monsterType: monster.type,
                                options: getChoiceEventOptions(below.gameData.monsterTypes[monster.type].choiceEvents)
                            };
                            renderChoiceEvent();
                        }
                    } else if (!isBlocked(monster.position.x - 1, monster.position.y) && isTileAllowed(monster, monster.position.x - 1, monster.position.y)) {
                        monster.destPos.xVelocity = -1;
                        monster.destPos.x = monster.position.x -1;
                    }
                }
                else if (dir === 4 && foundTile(monster.position.x + 1, monster.position.y)) {
                    if (monster.position.x + 1 === below.gameData.player.currentLocation.x && monster.position.y === below.gameData.player.currentLocation.y) {
                        if (!isMonsterAloof(monster)) {
                            var monsterType = below.gameData.monsterTypes[monster.type];
                            var msg = monsterType.aloofFalseMsg || "An angry monster attacks you!";
                            below.choiceEvent = {
                                selectedIndex: 0,
                                message: msg,
                                monsterPos: { x: monster.position.x, y: monster.position.y },
                                monsterType: monster.type,
                                options: getChoiceEventOptions(below.gameData.monsterTypes[monster.type].choiceEvents)
                            };
                            renderChoiceEvent();
                        }
                    } else if (!isBlocked(monster.position.x + 1, monster.position.y) && isTileAllowed(monster, monster.position.x + 1, monster.position.y)) {
                        monster.destPos.xVelocity = 1;
                        monster.destPos.x = monster.position.x + 1;
                    }
                }
            }
        });
        // NPC movement
        below.gameData.mapData[curMap].npcs.forEach(function(npc) {
            var type = below.gameData.npcTypes[npc.type];
            if (!type || !type.movement) return;
            if (!npc.destPos) npc.destPos = { x: null, y: null, xVelocity: null, yVelocity: null };
            if (Math.random() < type.movement) {
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
    // Monster moving?
    if (!moving) {
        below.gameData.mapData[curMap].monsters.forEach(function(monster) {
            if (monster.destPos && (monster.destPos.xVelocity || monster.destPos.yVelocity)) {
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
                        var molePositions = [[11, 10], [33, 10], [11, 32]];
                        var mole = below.gameData.mapData[2].npcs.find(function(n) { return n.type === 4; });
                        if (mole) {
                            mole.position = { x: molePositions[cycle][0], y: molePositions[cycle][1] };
                            mole.destPos = {};
                        }
                    }
                    changeMap(exit.targetMap, targetX, targetY, exit.text);
                }
            }
        }
        below.gameData.mapData[curMap].monsters.forEach(function(monster) {
            if (monster.destPos && monster.destPos.xVelocity) {
                monster.position.x += (monster.destPos.xVelocity/below.tickSpeed);
                if (below.tick % below.tickSpeed === 0) {
                    monster.position.x = monster.destPos.x;
                    monster.destPos.xVelocity = null;
                    saveCurrentGame();
                }
            }
            if (monster.destPos && monster.destPos.yVelocity) {
                monster.position.y += (monster.destPos.yVelocity/below.tickSpeed);
                if (below.tick % below.tickSpeed === 0) {
                    monster.position.y = monster.destPos.y;
                    monster.destPos.yVelocity = null;
                    saveCurrentGame();
                }
            }
        });
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
        // Then draw current map
        drawMapCanvas();
    }
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


