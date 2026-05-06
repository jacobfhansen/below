const below = {
    tick: undefined,
    tickSpeed: 5,
    version: '0.0.1',
    c64Colors: ["#000000","#FFFFFF","#68372B","#70A4B2","#6F3D86","#588D43","352879","#B8C76F",
                "#6F4F25","#433900","#9A6759","#444444","#6C6C6C","#9AD284","#6C5EB5","#959595"],
    pages: ["cutSceneDiv", "titleScreen", "resumeGameDiv", "gameDiv", "newGameDiv", "characterSelectDiv"],
    currentSlot: undefined,
    choiceEvent: null,
    editorMode: false,
    selectedMap: 0,
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
        if (saved) {
            slotEl.classList.add('slot-initiated');
        } else {
            slotEl.classList.remove('slot-initiated');
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

function continueGame(slotIndex) {
    var saved = loadFromSlot(slotIndex);
    if (!saved) {
        alert('No saved game in this slot.');
        return;
    }
    below.gameData = JSON.parse(JSON.stringify(saved));
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

var doorClosedImg = new Image();
doorClosedImg.src = "images/door_closed.png";

var doorOpenImg = new Image();
doorOpenImg.src = "images/door_open.png";

window.onbeforeunload = confirmExit;
function confirmExit() {
    saveCurrentGame();
    return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
}

document.onkeydown = checkKey;
document.onwheel = checkWheel;

function checkWheel(e) {
    e = e || window.event;
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
        if (below.choiceEvent) {
            handleChoiceEventKey(e);
        } else if (document.getElementById("inventoryDiv").style.display !== 'none') {
            // Close inventory on Escape or Q
            if (e.keyCode === 27 || e.keyCode === 81) {
                closeInventory();
            }
        } else if (e.keyCode === 113) { // F2 - Toggle editor mode
            toggleEditorMode();
        } else {
            moveOnMap(e);
        }
    }
}

function toggleEditorMode() {
    below.editorMode = !below.editorMode;
    var editorPanel = document.getElementById("editorPanel");
    var editorStatus = document.getElementById("editorStatus");
    var canvas = document.getElementById("mapCanvas");
    
    if (below.editorMode) {
        editorPanel.style.display = 'block';
        editorStatus.textContent = "Editor mode: ON - Click tiles to toggle, drag to pan";
        populateMapSelect();
        below.editorPanX = 0;
        below.editorPanY = 0;
        drawMapCanvas();
    } else {
        editorPanel.style.display = 'none';
        editorStatus.textContent = "Editor mode: OFF";
    }
    if (!below.editorMode) drawMapCanvas();
}

function attachEditorClickHandler() {
    var canvas = document.getElementById("mapCanvas");
    if (!canvas) {
        return;
    }
    
    // Remove existing click listeners (to avoid duplicates)
    canvas.removeEventListener("click", canvas._editorClickHandler);
    
    // Store handler reference for removal
    canvas._editorClickHandler = function(e) {
        if (!below.editorMode) return;
        
        
        // Use getBoundingClientRect for accurate position
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        
        var width = below.gameData.mapZoom;
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        
        // In editor mode, apply pan offset
        var tileX = Math.round((x - centerX - below.editorPanX) / width);
        var tileY = Math.round((y - centerY - below.editorPanY) / width);
        
        
        var curMap = below.selectedMap;
        var tileIndex = 'x' + (tileX < 0 ? 'm' : '') + Math.abs(tileX) + 'y' + (tileY < 0 ? 'm' : '') + Math.abs(tileY);
        
        
        if (below.gameData.mapData[curMap].tiles[tileIndex]) {
            delete below.gameData.mapData[curMap].tiles[tileIndex];
        } else {
            below.gameData.mapData[curMap].tiles[tileIndex] = { x: tileX, y: tileY };
        }
        
        drawMapCanvas();
    };
    
    canvas.addEventListener("click", canvas._editorClickHandler);
    
    // Add mouse drag for panning in editor mode
    var isDragging = false;
    var lastX, lastY;
    
    canvas.removeEventListener("mousedown", canvas._editorMouseDown);
    canvas._editorMouseDown = function(e) {
        if (!below.editorMode) return;
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
    };
    canvas.addEventListener("mousedown", canvas._editorMouseDown);
    
    canvas.removeEventListener("mousemove", canvas._editorMouseMove);
    canvas._editorMouseMove = function(e) {
        if (!isDragging || !below.editorMode) return;
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        below.editorPanX += dx;
        below.editorPanY += dy;
        lastX = e.clientX;
        lastY = e.clientY;
        drawMapCanvas();
    };
    canvas.addEventListener("mousemove", canvas._editorMouseMove);
    
    canvas.removeEventListener("mouseup", canvas._editorMouseUp);
    canvas._editorMouseUp = function() {
        isDragging = false;
    };
    canvas.addEventListener("mouseup", canvas._editorMouseUp);
    
    canvas.removeEventListener("mouseleave", canvas._editorMouseLeave);
    canvas._editorMouseLeave = function() {
        isDragging = false;
    };
    canvas.addEventListener("mouseleave", canvas._editorMouseLeave);
    
}

// Test function to add a tile at (0,0)
function testAddTile() {
    // Add a grass tile at (0,0) for testing
    var tileIndex = 'x0y0';
    below.gameData.mapData[below.selectedMap].tiles[tileIndex] = { x: 0, y: 0, type: 1 };
}

// Export map data to file (for developers to copy back to gamedata.js)
function exportMapData() {
    // Create a clean copy without function references
    var exportObj = JSON.parse(JSON.stringify(below.gameData));
    var jsonStr = JSON.stringify(exportObj, null, 4);
    var fullContent = 'var belowGameData = ' + jsonStr + ';';
    
    // Create a Blob and download link
    var blob = new Blob([fullContent], { type: 'text/javascript' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'gamedata.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    var status = document.getElementById("editorStatus");
    if (status) {
        status.textContent = "Exported! Copy content to gamedata.js";
        setTimeout(function() {
            status.textContent = "Editor mode: ON";
        }, 3000);
    }
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
    
    // Editor button (opens editor without starting a game)
    var editorBtn = document.getElementById("editorBtn");
    if (editorBtn) {
        editorBtn.addEventListener("click", function() {
            toggleEditorMode();
            switchPage('gameDiv'); // Editor works on gameDiv canvas
        });
    }
    
    // Character selection
    document.querySelectorAll('.below-front-menu-item[data-character]').forEach(function(item) {
        item.addEventListener("click", function() {
            selectCharacter(this.getAttribute('data-character'));
        });
    });
    
    // Start game
    startGame();
    
    // Attach editor click handler
    attachEditorClickHandler();
});

function populateMapSelect() {
    var mapSelect = document.getElementById("mapSelect");
    mapSelect.innerHTML = '';
    below.gameData.mapData.forEach(function(map, index) {
        var option = document.createElement("option");
        option.value = index;
        option.textContent = map.name || ("Map " + index);
        if (index === below.selectedMap) {
            option.selected = true;
        }
        mapSelect.appendChild(option);
    });
}

function selectMapForEdit() {
    var mapSelect = document.getElementById("mapSelect");
    below.selectedMap = parseInt(mapSelect.value);
    drawMapCanvas();
}

function addNewMap() {
    below.gameData.mapData.push({
        id: below.gameData.mapData.length,
        name: "New Map",
        tiles: {},
        monsters: [],
        obstacles: [],
        npcs: []
    });
    populateMapSelect();
    below.selectedMap = below.gameData.mapData.length - 1;
    selectMapForEdit();
}

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

function renderChoiceEvent() {
    var gameLogDiv = document.getElementById("gameLogDiv");
    while (gameLogDiv.firstChild) {
        gameLogDiv.removeChild(gameLogDiv.firstChild);
    }
    // Add gray overlay to map
    var gameDivCenter = document.getElementById("gameDivCenter");
    gameDivCenter.style.opacity = "0.5";
    gameDivCenter.style.pointerEvents = "none";
    
    // Show appropriate message based on aloof status
    if (below.choiceEvent.monsterType !== null) {
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
    
    var titleNode = document.createElement("P");
    titleNode.className = "below-game-left-paragraph";
    titleNode.textContent = "Choose an action:";
    gameLogDiv.appendChild(titleNode);

    below.choiceEvent.options.forEach(function(option, index) {
        var node = document.createElement("P");
        node.className = "below-game-left-paragraph";
        if (index === below.choiceEvent.selectedIndex) {
            node.classList.add("below-choice-selected");
        }
        node.textContent = option.text;
        node.onclick = function() { selectChoiceOption(index); };
        gameLogDiv.appendChild(node);
    });
}

function handleChoiceEventKey(e) {
    if (e.keyCode === 38 || e.keyCode === 87) { // Up
        e.preventDefault();
        below.choiceEvent.selectedIndex = (below.choiceEvent.selectedIndex - 1 + below.choiceEvent.options.length) % below.choiceEvent.options.length;
        renderChoiceEvent();
    }
    else if (e.keyCode === 40 || e.keyCode === 83) { // Down
        e.preventDefault();
        below.choiceEvent.selectedIndex = (below.choiceEvent.selectedIndex + 1) % below.choiceEvent.options.length;
        renderChoiceEvent();
    }
    else if (e.keyCode === 13 || e.keyCode === 69) { // Enter or E
        e.preventDefault();
        selectChoiceOption(below.choiceEvent.selectedIndex);
    }
    else if (e.keyCode === 27) { // Escape
        e.preventDefault();
        closeChoiceEvent();
    }
}

function selectChoiceOption(index) {
    below.choiceEvent.options[index].action();
    closeChoiceEvent();
}

function closeChoiceEvent() {
    below.choiceEvent = null;
    // Restore map appearance
    var gameDivCenter = document.getElementById("gameDivCenter");
    gameDivCenter.style.opacity = "1";
    gameDivCenter.style.pointerEvents = "auto";
    maintainMapLog();
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

function showInventory() {
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
        inventory.forEach(function(itemTypeId) {
            var itemType = below.gameData.itemTypes[itemTypeId];
            if (itemType) {
                var row = inventoryTable.insertRow();
                
                // Icon cell
                var iconCell = row.insertCell();
                var img = document.createElement('img');
                img.src = "images/" + itemType.icon;
                iconCell.appendChild(img);
                
                // Name cell
                var nameCell = row.insertCell();
                nameCell.textContent = itemType.name;
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
            } else if (curPage === 'titleScreen') {
                // Select first item in title screen
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

function loadGame(game) {
    var localstorageBelow = JSON.parse(localStorage["below"]);
    below.gameData = localstorageBelow.saves[game];
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
    // Check monsters - only block if monster is aloof
    var blockedByMonster = below.gameData.mapData[curMap].monsters.some(function(m) {
        var isAloof = m.aloof !== undefined ? m.aloof : below.gameData.monsterTypes[m.type].aloof;
        return m.position.x === x && m.position.y === y && 
               below.gameData.monsterTypes[m.type].blocking && 
               isAloof;
    });
    if (blockedByMonster) return true;
    // Check obstacles - instance blocking overrides type
    var blockedByObstacle = below.gameData.mapData[curMap].obstacles.some(function(o) {
        var obsType = below.gameData.obstacleTypes[o.type];
        var isBlocking = o.blocking !== undefined ? o.blocking : obsType.blocking;
        return o.position.x === x && o.position.y === y && isBlocking;
    });
    return blockedByObstacle;
}

function getBlockedMessage(x, y) {
    var curMap = below.gameData.player.currentMap;
    // Check monsters
    var monster = below.gameData.mapData[curMap].monsters.find(function(m) {
        return m.position.x === x && m.position.y === y && below.gameData.monsterTypes[m.type].blocking;
    });
    if (monster) {
        return below.gameData.monsterTypes[monster.type].description || "Not sure what good that would do";
    }
    // Check obstacles
    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
        return o.position.x === x && o.position.y === y && below.gameData.obstacleTypes[o.type].blocking;
    });
    if (obstacle) {
        return below.gameData.obstacleTypes[obstacle.type].description || "Not sure what good that would do";
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
        8: "Pass through"
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
                        below.gameData.mapLog.push("You attack!");
                        maintainMapLog();
                    }
                }
            };
        } else if (id === 6) {
            // Search - find items and add to inventory
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.obstaclePos) {
                    var curMap = below.gameData.player.currentMap;
                    var obstacle = below.gameData.mapData[curMap].obstacles.find(function(o) {
                        return o.position.x === below.choiceEvent.obstaclePos.x && o.position.y === below.choiceEvent.obstaclePos.y;
                    });
                    if (obstacle) {
                        var obstacleType = below.gameData.obstacleTypes[obstacle.type];
                        if (obstacleType.itemType) {
                            // Add item to inventory
                            var itemTypeId = obstacleType.itemType;
                            below.gameData.player.inventory.push(itemTypeId);
                            below.gameData.mapLog.push("You found a " + below.gameData.itemTypes[itemTypeId].name + "!");
                            // Remove item from obstacle and add a default message to the tile
                            delete obstacleType.itemType;
                            // Add random default message to the tile
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
                            maintainMapLog();
                        } else {
                            // Already searched - show tile's stored message or default
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
                        // Instance overrides type (keyId, closed, blocking, etc.)
                        var keyId = obstacle.keyId || obstacleType.keyId;
                        var isClosed = obstacle.closed !== undefined ? obstacle.closed : obstacleType.closed;
                        
                        if (keyId) {
                            var hasKey = below.gameData.player.inventory.some(function(itemId) {
                                return itemId === keyId;
                            });
                            if (hasKey && isClosed) {
                                // Unlock the door - update instance only (not type!)
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
    var monster = below.gameData.mapData[curMap].monsters.find(function(m) {
        return m.position.x === x && m.position.y === y && below.gameData.monsterTypes[m.type].blocking;
    });
    var choiceEvents = getBlockedChoiceEvents(x, y, monster);
    if (choiceEvents) {
        var msg = "";
        if (monster) {
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

function getBlockedChoiceEvents(x, y, monster) {
    // Check monsters - only if aloof
    if (monster && isMonsterAloof(monster) && below.gameData.monsterTypes[monster.type].choiceEvents) {
        return getChoiceEventOptions(below.gameData.monsterTypes[monster.type].choiceEvents);
    }
    // Check obstacles
    var curMap = below.gameData.player.currentMap;
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
        if (!isBlocked(curX, curY -1)) {
            below.gameData.player.destinationLocation.yVelocity = -1;
            below.gameData.player.destinationLocation.y = below.gameData.player.currentLocation.y - 1;
            playerMoved = true;
        } else {
            handleBlockedInteraction(curX, curY -1);
        }
    }
    else if ((e.keyCode === 40 || e.keyCode === 83) && foundTile(curX, curY +1)) {
        if (!isBlocked(curX, curY +1)) {
            below.gameData.player.destinationLocation.y = below.gameData.player.currentLocation.y + 1;
            below.gameData.player.destinationLocation.yVelocity = 1;
            playerMoved = true;
        } else {
            handleBlockedInteraction(curX, curY +1);
        }
    }
    else if ((e.keyCode === 37 || e.keyCode === 65) && foundTile(curX -1, curY)) {
        if (!isBlocked(curX -1, curY)) {
            below.gameData.player.destinationLocation.xVelocity = -1;
            below.gameData.player.destinationLocation.x = below.gameData.player.currentLocation.x - 1;
            playerMoved = true;
        } else {
            handleBlockedInteraction(curX -1, curY);
        }
    }
    else if ((e.keyCode === 39 || e.keyCode === 68) && foundTile(curX +1, curY)) {
        if (!isBlocked(curX +1, curY)) {
            below.gameData.player.destinationLocation.xVelocity = 1;
            below.gameData.player.destinationLocation.x = below.gameData.player.currentLocation.x + 1;
            playerMoved = true;
        } else {
            handleBlockedInteraction(curX +1, curY);
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
        // Re-attach click handler after resize
        if (below.editorMode) {
            attachEditorClickHandler();
        }
    }
    if (Math.abs(canvas.height - newHeight) > 1) {
        canvas.height = newHeight;
        // Re-attach click handler after resize
        if (below.editorMode) {
            attachEditorClickHandler();
        }
    }
    
    canvas.clickableElements = [];
    var context = canvas.getContext("2d");
    var curMap = below.editorMode ? below.selectedMap : below.gameData.player.currentMap;
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw tiles
    var thickness = 1;
    var width = below.gameData.mapZoom;    
    var horizontalCenter = canvas.height / 2;
    var verticalCenter = canvas.width / 2;
    
    // In editor mode, show full map (with pan offset). In game mode, center on player
    var verticalOffset, horizontalOffset;
    if (below.editorMode) {
        verticalOffset = -below.editorPanY;
        horizontalOffset = -below.editorPanX;
    } else {
        verticalOffset = below.gameData.player.currentLocation.y * width;
        horizontalOffset = below.gameData.player.currentLocation.x * width;
    }
    
    var vision = below.gameData.player.vision || 2;
    var visionPixels = vision * width;
    
    // Draw all tiles first
    var tileCount = 0;
    for (var k in below.gameData.mapData[curMap].tiles) {
        if (typeof below.gameData.mapData[curMap].tiles[k] !== 'function') {
            tileCount++;
            var tile = below.gameData.mapData[curMap].tiles[k];
            var x = (tile.x * width) - (width/2) + verticalCenter - horizontalOffset;
            var y = (tile.y * width) - (width/2) + horizontalCenter - verticalOffset;
            context.fillStyle = "#959595";
            context.fillRect(x, y, width, width);
            context.fillStyle = "#6C6C6C";
            context.fillRect(x + thickness, y + thickness, width - (thickness * 2), width - (thickness * 2));
        }
    }
    
    // Add radial gradient overlay for vision (only in game mode)
    if (!below.editorMode) {
        var gradient = context.createRadialGradient(verticalCenter, horizontalCenter, visionPixels * 0.6, verticalCenter, horizontalCenter, visionPixels);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Draw player and monster sprites
    // PLAYER (only in game mode)
    if (!below.editorMode) {
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
    below.gameData.mapData[curMap].monsters.forEach(function(monster) {
        // Calculate distance for vision check
        var distXM = (monster.position.x * width + verticalCenter - horizontalOffset) - verticalCenter;
        var distYM = (monster.position.y * width + horizontalCenter - verticalOffset) - horizontalCenter;
        var distanceM = Math.sqrt(distXM * distXM + distYM * distYM);
        
        // In editor mode, show all monsters. In game mode, check vision
        if (below.editorMode || distanceM <= visionPixels) {
            var type = below.gameData.monsterTypes[monster.type];
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
    // OBSTACLES
    below.gameData.mapData[curMap].obstacles.forEach(function(obstacle) {
        // Calculate distance for vision check
        var distXO = (obstacle.position.x * width + verticalCenter - horizontalOffset) - verticalCenter;
        var distYO = (obstacle.position.y * width + horizontalCenter - verticalOffset) - horizontalCenter;
        var distanceO = Math.sqrt(distXO * distXO + distYO * distYO);
        
        // In editor mode, show all obstacles. In game mode, check vision
        if (below.editorMode || distanceO <= visionPixels) {
            var type = below.gameData.obstacleTypes[obstacle.type];
            if (type.icon) {
                // Handle door states - instance overrides type
                var img = null;
                var iconName = obstacle.icon || type.icon;
                if (iconName === "door_closed.png" || iconName === "door_open.png") {
                    var isClosed = obstacle.closed !== undefined ? obstacle.closed : type.closed;
                    img = isClosed ? doorClosedImg : doorOpenImg;
                } else {
                    var iconImg = iconName === "rock.png" ? rockImg : (iconName === "blood.png" ? bloodImg : (iconName === "table.png" ? tableImg : (iconName === "key1.png" ? keyImg : (iconName === "cupboard.png" ? cupboardImg : new Image()))));
                    img = iconImg;
                }
                if (!img.complete) img.src = "images/" + iconName;
                context.drawImage(img, (obstacle.position.x * width) + verticalCenter - horizontalOffset - (width/2), (obstacle.position.y * width) + horizontalCenter - verticalOffset - (width/2), width, width);
            } else {
                context.fillStyle = type.color || "#433900";
                context.fillRect((obstacle.position.x * width) - (width/2) + verticalCenter - horizontalOffset, (obstacle.position.y * width) - (width/2) + horizontalCenter - verticalOffset, width, width);
            }
        }
    });
    
    gameDivCenter.appendChild(canvas);
}

function mapGameLoop() {
    // This one loops and loops
    below.tick = window.requestAnimationFrame(mapGameLoop);
    var curMap = below.gameData.player.currentMap;
    // Don't process any movement if choice event is active
    if (below.choiceEvent) return;
    
    // Don't move monsters in editor mode
    if (below.editorMode) return;
    
    if (below.tick % below.tickSpeed === 1) {
        // Calculate new monster movement
        below.gameData.mapData[curMap].monsters.forEach(function(monster) {
            // First, do monster move?
            var type = below.gameData.monsterTypes[monster.type];
            if (Math.random() < type.movement) {
                // What direction do it move?
                var dir = (Math.floor(Math.random() * 4)) + 1;
                if (dir === 1 && foundTile(monster.position.x, monster.position.y - 1)) {
                    // Check if monster bumps into player
                    if (monster.position.x === below.gameData.player.currentLocation.x && monster.position.y - 1 === below.gameData.player.currentLocation.y) {
                        // Monster bumps into player - activate monster's choice event if not aloof
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
                    // Check if monster bumps into player
                    if (monster.position.x === below.gameData.player.currentLocation.x && monster.position.y + 1 === below.gameData.player.currentLocation.y) {
                        // Monster bumps into player - activate monster's choice event if not aloof
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
                    // Check if monster bumps into player
                    if (monster.position.x - 1 === below.gameData.player.currentLocation.x && monster.position.y === below.gameData.player.currentLocation.y) {
                        // Monster bumps into player - activate monster's choice event if not aloof
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
                    // Check if monster bumps into player
                    if (monster.position.x + 1 === below.gameData.player.currentLocation.x && monster.position.y === below.gameData.player.currentLocation.y) {
                        // Monster bumps into player - activate monster's choice event if not aloof
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
    }
    var moving = false;
    // Player moving?
    if (below.gameData.player.destinationLocation.xVelocity || below.gameData.player.destinationLocation.yVelocity) moving = true;
    // Monster moving?
    if (!moving) {
        // Check monsters
        below.gameData.mapData[curMap].monsters.forEach(function(monster) {
            if (monster.destPos.xVelocity || monster.destPos.yVelocity) {
                moving = true;
                return;
            }
        });
    }
    // Figure out if anything is moving and move it
    if (moving) {
        if (below.gameData.player.destinationLocation.xVelocity) {
            // Continue here, subtract/add a fraction of currentLocation
            below.gameData.player.currentLocation.x += (below.gameData.player.destinationLocation.xVelocity/below.tickSpeed);
            if (below.tick % below.tickSpeed === 0) {
                below.gameData.player.currentLocation.x = below.gameData.player.destinationLocation.x;
                below.gameData.player.destinationLocation.xVelocity = null;
                // Show tile text when player arrives
                var tile = foundTile(below.gameData.player.currentLocation.x, below.gameData.player.currentLocation.y);
                if (tile && tile['text']) {
                    below.gameData.mapLog.push(tile['text']);
                    maintainMapLog();
                }
                saveCurrentGame();
            }
        }
        if (below.gameData.player.destinationLocation.yVelocity) {
            below.gameData.player.currentLocation.y += (below.gameData.player.destinationLocation.yVelocity/below.tickSpeed);
            if (below.tick % below.tickSpeed === 0) {
                below.gameData.player.currentLocation.y = below.gameData.player.destinationLocation.y;
                below.gameData.player.destinationLocation.yVelocity = null;
                // Show tile text when player arrives
                var tile = foundTile(below.gameData.player.currentLocation.x, below.gameData.player.currentLocation.y);
                if (tile && tile['text']) {
                    below.gameData.mapLog.push(tile['text']);
                    maintainMapLog();
                }
                saveCurrentGame();
            }
        }
        below.gameData.mapData[curMap].monsters.forEach(function(monster) {
            if (monster.destPos.xVelocity) {
                monster.position.x += (monster.destPos.xVelocity/below.tickSpeed);
                if (below.tick % below.tickSpeed === 0) {
                    monster.position.x = monster.destPos.x;
                    monster.destPos.xVelocity = null;
                    saveCurrentGame();
                }
            }
            if (monster.destPos.yVelocity) {
                monster.position.y += (monster.destPos.yVelocity/below.tickSpeed);
                if (below.tick % below.tickSpeed === 0) {
                    monster.position.y = monster.destPos.y;
                    monster.destPos.yVelocity = null;
                    saveCurrentGame();
                }
            }
        });
        // Then draw current map
        drawMapCanvas();
        //window.cancelAnimationFrame(below.tick);
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

// Test function to add a tile at (0,0)
function testAddTile() {
    // Add a grass tile at (0,0) for testing
    var tileIndex = 'x0y0';
    below.gameData.mapData[below.selectedMap].tiles[tileIndex] = { x: 0, y: 0, type: 1 };
}
