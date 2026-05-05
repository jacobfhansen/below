const below = {
    tick: undefined,
    tickSpeed: 5,
    version: '0.0.1',
    c64Colors: ["#000000","#FFFFFF","#68372B","#70A4B2","#6F3D86","#588D43","352879","#B8C76F",
                "#6F4F25","#433900","#9A6759","#444444","#6C6C6C","#9AD284","#6C5EB5","#959595"],
    pages: ["cutSceneDiv", "titleScreen", "resumeGameDiv", "gameDiv", "newGameDiv", "characterSelectDiv"],
    currentSlot: undefined,
    choiceEvent: null,
    gameData: {
        mapZoom: 50,
        mapLog: [],
        showCoordinates: true,
        player: {
            currentMap: 0,
            currentLocation: { x: 2, y: 2 },
            destinationLocation:  { x: undefined, xVelocity: undefined, y: undefined, yVelocity: undefined },
            icon: null,
            vision: 3,
            inventory: []
        },
        monsterTypes: {
            1: {
                    name: "Giant rat",
                    fraction: 2,
                    movement: 0.3,
                    color: "#9A6759",
                    icon: "rat.png",
                    blocking: true,
                    aloof: true,
                    description: "A giant rat blocks your way",
                    aloofTrueMsg: "A giant rat. It ignores you.",
                    aloofFalseMsg: "An angry giant rat attacks you!",
                    beholdDesc: "A large rat with sharp teeth",
                    choiceEvents: [4, 5, 3]
            },
            2:  {
                    name: "Bat",
                    fraction: 1,
                    movement: 0.60,
                    color: "#433900",
                    icon: "bat.png",
                    blocking: true,
                    aloof: true,
                    description: "A bat is in your way",
                    aloofTrueMsg: "A bat screeches and ignores you.",
                    aloofFalseMsg: "A furious bat dives at you!",
                    beholdDesc: "A screeching bat with sharp claws",
                    choiceEvents: [4, 5, 3]
            },
            3: {
                    name: "Centipede",
                    fraction: 1,
                    blocking: true,
                    aloof: true,
                    description: "A centipede blocks the path",
                    aloofTrueMsg: "A centipede crawls right past you.",
                    aloofFalseMsg: "A centipede strikes at your ankles!",
                    beholdDesc: "A multi-segmented centipede",
                    choiceEvents: [4, 5, 3]
            }
        },
        obstacleTypes: {
            1: {
                name: "Rock",
                description: "A rock blocking your way",
                color: "#433900",
                icon: "rock.png",
                blocking: true,
                choiceEvents: [1, 3]
            },
            2: {
                name: "Blood",
                description: "Blood",
                color: "#433900",
                icon: "blood.png",
                blocking: false,
                choiceEvents: []
            },
            3: {
                name: "Table",
                description: "A sturdy wooden table",
                color: "#433900",
                icon: "table.png",
                blocking: true,
                itemType: 4,
                choiceEvents: [6, 3]
            },
        },
        itemTypes: {
            4: {
                name: "Key",
                description: "A rusty key",
                icon: "key1.png",
                choiceEvents: []
            }
        },
        mapData: [
            {
                id: 0,
                name: "Start",
                tiles: {
                    xm7y3: { x: -7, y: 3 },
                    xm6y1: { x: -6, y: 1 },
                    xm6y2: { x: -6, y: 2 },
                    xm6y3: { x: -6, y: 3 },
                    xm5y1: { x: -5, y: 1 },
                    xm5y2: { x: -5, y: 2 },
                    xm5y3: { x: -5, y: 3 },
                    xm4y1: { x: -4, y: 1 },
                    xm4y2: { x: -4, y: 2 },
                    xm4y3: { x: -4, y: 3 },
                    xm3y2: { x: -3, y: 2 },
                    xm2y2: { x: -2, y: 2 },
                    xm1y0: { x: -1, y: 0 },
                    xm1y1: { x: -1, y: 1 },
                    xm1y2: { x: -1, y: 2 },
                    xm1y3: { x: -1, y: 3 },
                    xm1y4: { x: -1, y: 4 },
                    x0y0: { x: 0, y: 0 },
                    x0y1: { x: 0, y: 1 },
                    x0y2: { x: 0, y: 2 },
                    x0y3: { x: 0, y: 3 },
                    x0y4: { x: 0, y: 4 },
                    x1y0: { x: 1, y: 0, text: "There are blood on the floor" },
                    x1y1: { x: 1, y: 1 },                                        
                    x1y2: { x: 1, y: 2 },
                    x1y3: { x: 1, y: 3 },
                    x1ym1: { x: 1, y: -1 },
                    x1ym2: { x: 1, y: -2 },
                    x1ym3: { x: 1, y: -3 },
                    x2ym3: { x: 2, y: -3 },
                    x1y4: { x: 1, y: 4, text: "There is light from above" },
                    x2y0: { x: 2, y: 0 },                    
                    x2y1: { x: 2, y: 1 },
                    x2y2: { x: 2, y: 2 },
                    x2y3: { x: 2, y: 3 },
                    x2y4: { x: 2, y: 4 },
                    x3y0: { x: 3, y: 0 },
                    x3y1: { x: 3, y: 1 },
                    x3y2: { x: 3, y: 2 },
                    x3y3: { x: 3, y: 3 },
                    x3y4: { x: 3, y: 4 },
                    x4y2: { x: 4, y: 2 },
                    x5y2: { x: 5, y: 2 },
                    x6y2: { x: 6, y: 2 },
                    x7y2: { x: 7, y: 2 },
                    x8y2: { x: 8, y: 2 },
                    x9y2: { x: 9, y: 2 },
                    x9y3: { x: 9, y: 3 },
                    x9y4: { x: 9, y: 4 },
                    x10y2: { x: 10, y: 2 },
                    x10y3: { x: 10, y: 3 },
                    x10y4: { x: 10, y: 4 },
                    x11y2: { x: 11, y: 2 },
                    x11y3: { x: 11, y: 3 },
                    x11y4: { x: 11, y: 4 },
                    x11y1: { x: 11, y: 1 },
                    x11y0: { x: 11, y: 0 },
                    x11ym1: { x: 11, y: -1 },
                    x11ym2: { x: 11, y: -2 },
                    x11ym3: { x: 11, y: -3 },
                    x11ym4: { x: 11, y: -4 },
                    x11ym5: { x: 11, y: -5 },
                    x11ym6: { x: 11, y: -6 },
                    x10ym2: { x: 10, y: -2 },
                    x9ym2: { x: 9, y: -2 },
                    x8ym2: { x: 8, y: -2 },
                    x7ym2: { x: 7, y: -2 },
                    x9ym1: { x: 9, y: -1 },
                    x8ym1: { x: 8, y: -1 },
                    x7ym1: { x: 7, y: -1 },
                    x9y0: { x: 9, y: 0 },
                    x8y0: { x: 8, y: 0 },
                    x7y0: { x: 7, y: 0 },
                    x9ym3: { x: 9, y: -3 },
                    x8ym3: { x: 8, y: -3 },
                    x7ym3: { x: 7, y: -3 },
                    x3ym3: { x: 3, y: -3 },
                    x9ym4: { x: 9, y: -4 },
                    x8ym4: { x: 8, y: -4 },
                    x7ym4: { x: 7, y: -4 },
                    x10ym6: { x: 10, y: -6 },
                    x9ym6: { x: 9, y: -6 },
                    x8ym6: { x: 8, y: -6 },
                    x7ym6: { x: 7, y: -6 },
                    x6ym6: { x: 6, y: -6 },
                    x5ym6: { x: 5, y: -6 },
                    x4ym6: { x: 4, y: -6 },
                    x5ym7: { x: 4, y: -7 },
                    x5ym5: { x: 5, y: -5 },
                    x4ym5: { x: 4, y: -5 },
                    x5ym4: { x: 5, y: -4 },
                    x4ym4: { x: 4, y: -4 },
                    x5ym3: { x: 5, y: -3 },
                    x4ym3: { x: 4, y: -3 },
                    x5ym2: { x: 5, y: -2 },
                    x4ym2: { x: 4, y: -2 },
                },
                monsters: [
                    {
                        type: 1,
                        position: { x: -5, y: 2 },
                        status: 1,
                        destPos: { x: undefined, xVelocity: undefined, y: undefined, yVelocity: undefined },
                        allowedTiles: [ { x: -6, y: 1 }, { x: -5, y: 1 }, { x: -4, y: 1 }, { x: -5, y: 2 }, { x: -4, y: 2 }, { x: -7, y: 3 }, { x: -6, y: 3 }, { x: -5, y: 3 }, { x: -4, y: 3 } ]
                    },
                    {
                        type: 2,
                        position: { x: 7, y: 2 },
                        status: 1,
                        destPos: { x: undefined, xVelocity: undefined, y: undefined, yVelocity: undefined }
                    }
                ],
                 obstacles: [
                    {
                        type: 1,
                        position: { x: 6, y: 2 },
                        choiceEvents: [1, 2, 3]
                    },
                    {
                        type: 2,
                        position: { x: 1, y: 0 },                        
                    },
                    {
                        type: 3,
                        position: { x: -6, y: 2 },                        
                    }    
                ],
                npcs: [ 1 ]
            }
        ]
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
        } else {
            moveOnMap(e);
        }
    }
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
    below.choiceEvent = {
        selectedIndex: 0,
        options: [
            { text: "Search", action: function() { below.gameData.mapLog.push("You search the area..."); maintainMapLog(); } },
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
    console.log(element);
    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            callback(entry.intersectionRatio > 0);
        });
    }, options);

    observer.observe(element);
}

function switchPage(page) {
    console.log(below.pages);
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
    // Check obstacles
    var blockedByObstacle = below.gameData.mapData[curMap].obstacles.some(function(o) {
        return o.position.x === x && o.position.y === y && below.gameData.obstacleTypes[o.type].blocking;
    });
    return blockedByObstacle;
}

function isBlocked(x, y) {
    var curMap = below.gameData.player.currentMap;
    // Check monsters - only block if monster is aloof
    var blockedByMonster = below.gameData.mapData[curMap].monsters.some(function(m) {
        return m.position.x === x && m.position.y === y && 
               below.gameData.monsterTypes[m.type].blocking && 
               isMonsterAloof(m);
    });
    if (blockedByMonster) return true;
    // Check obstacles
    var blockedByObstacle = below.gameData.mapData[curMap].obstacles.some(function(o) {
        return o.position.x === x && o.position.y === y && below.gameData.obstacleTypes[o.type].blocking;
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
    return null;
}

function getChoiceEventOptions(choiceEventIds) {
    var texts = {
        1: "Search rock",
        2: "Push rock",
        3: "Move on",
        4: "Behold",
        5: "Attack",
        6: "Search"
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
                            // Remove item from obstacle
                            obstacleType.itemType = null;
                            maintainMapLog();
                        } else {
                            below.gameData.mapLog.push("The table is empty.");
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
        console.log('Interact');
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
    console.log(1,gameLogDiv);
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
    canvas.width = gameDivCenter.offsetWidth -60;
    canvas.height = gameDivCenter.offsetHeight -60;
    canvas.clickableElements = [];
    var context = canvas.getContext("2d");
    var curMap = below.gameData.player.currentMap;
    
    // Draw tiles
    var thickness = 1;
    var width = below.gameData.mapZoom;    
    var horisontalCenter = canvas.height / 2;
    var verticalCenter = canvas.width / 2;
    var verticalOffset = below.gameData.player.currentLocation.y * width;
    var horisontalOffset = below.gameData.player.currentLocation.x * width;
    
    var vision = below.gameData.player.vision || 2;
    var playerX = below.gameData.player.currentLocation.x;
    var playerY = below.gameData.player.currentLocation.y;
    var visionPixels = vision * width;
    
    // Draw all tiles first
    for (var k in below.gameData.mapData[curMap].tiles) {
        if (typeof below.gameData.mapData[curMap].tiles[k] !== 'function') {
            var tile = below.gameData.mapData[curMap].tiles[k];
            context.fillStyle = "#959595";
            context.fillRect( (tile.x * width) - (width/2) + verticalCenter - horisontalOffset, (tile.y * width) - (width/2) + horisontalCenter - verticalOffset, width, width);
            context.fillStyle = "#6C6C6C";
            context.fillRect( (tile.x * width) - (width/2) + (thickness + verticalCenter) - horisontalOffset, (tile.y * width) - (width/2) + (thickness + horisontalCenter) - verticalOffset, width - (thickness * 2), width - (thickness * 2));
        }
    }
    
    // Add radial gradient overlay for vision
    var gradient = context.createRadialGradient(verticalCenter, horisontalCenter, visionPixels * 0.6, verticalCenter, horisontalCenter, visionPixels);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw player and monster sprites
    // PLAYER
    if (below.gameData.player.icon) {
        var playerImg = below.gameData.player.icon === "boy.png" ? boyImg : girlImg;
        if (!playerImg.complete) playerImg.src = "images/" + below.gameData.player.icon;
        context.drawImage(playerImg, verticalCenter - (width/2), horisontalCenter - (width/2), width, width);
    } else {
        context.fillStyle = "#B8C76F";
        context.beginPath();
        context.arc( verticalCenter, horisontalCenter, (width-2)/2, 0, 2 * Math.PI);
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
    below.gameData.mapData[curMap].monsters.forEach(function(monster) {
        // Check if monster is within vision radius (circular)
        var distX = (monster.position.x * width + verticalCenter - horisontalOffset) - verticalCenter;
        var distY = (monster.position.y * width + horisontalCenter - verticalOffset) - horisontalCenter;
        var distance = Math.sqrt(distX * distX + distY * distY);
        if (distance <= visionPixels) {
            var type = below.gameData.monsterTypes[monster.type];
            if (type["icon"]) {
                var img = type.icon === "bat.png" ? batImg : (type.icon === "rat.png" ? ratImg : (type.icon === "centipede.png" ? centipedeImg : new Image()));
                if (!img.complete) img.src = "images/" + type.icon;
                context.drawImage(img, (monster.position.x * width) + verticalCenter - horisontalOffset - (width/2), (monster.position.y * width) + horisontalCenter - verticalOffset  - (width/2), width, width);
            }
            else {
                context.fillStyle = type.color;
                context.beginPath();
                context.arc( (monster.position.x * width) + verticalCenter - horisontalOffset, (monster.position.y * width) + horisontalCenter - verticalOffset, (width-2)/2, 0, 2 * Math.PI);
                context.fill();
            }
        }
    });
    // OBSTACLES
    below.gameData.mapData[curMap].obstacles.forEach(function(obstacle) {
        // Check if obstacle is within vision radius (circular)
        var distX = (obstacle.position.x * width + verticalCenter - horisontalOffset) - verticalCenter;
        var distY = (obstacle.position.y * width + horisontalCenter - verticalOffset) - horisontalCenter;
        var distance = Math.sqrt(distX * distX + distY * distY);
        if (distance <= visionPixels) {
            var type = below.gameData.obstacleTypes[obstacle.type];
        if (type.icon) {
                var img = type.icon === "rock.png" ? rockImg : (type.icon === "blood.png" ? bloodImg : (type.icon === "table.png" ? tableImg : (type.icon === "key1.png" ? keyImg : new Image())));
                if (!img.complete) img.src = "images/" + type.icon;
                context.drawImage(img, (obstacle.position.x * width) + verticalCenter - horisontalOffset - (width/2), (obstacle.position.y * width) + horisontalCenter - verticalOffset  - (width/2), width, width);
            } else {
                context.fillStyle = type.color || "#433900";
                context.fillRect( (obstacle.position.x * width) - (width/2) + verticalCenter - horisontalOffset, (obstacle.position.y * width) - (width/2) + horisontalCenter - verticalOffset, width, width);
            }
        }
    });
    
    canvas.addEventListener('click', function(event) {
        var x = event.pageX,
            y = event.pageY;
        console.log(x, y);
        canvas.clickableElements.forEach(function(element) {
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                alert('clicked an element: ' + element);
            }
        });

    }, false);
    
    gameDivCenter.appendChild(canvas);
}

function mapGameLoop() {
    // This one loops and loops
    below.tick = window.requestAnimationFrame(mapGameLoop);
    //console.log(below.tick % below.tickSpeed);
    //console.log(tick, below.tick);
    var curMap = below.gameData.player.currentMap;
    // Don't process any movement if choice event is active
    if (below.choiceEvent) return;
    
    if (below.tick % below.tickSpeed === 1) {
        // Calculate new monster movement
        below.gameData.mapData[curMap].monsters.forEach(function(monster) {
            // First, do monster move?
            var type = below.gameData.monsterTypes[monster.type];
            if (Math.random() < type.movement) {
                // What direction do it move?
                var dir = (Math.floor(Math.random() * 4)) + 1;
                //console.log('foundTile',foundTile(monster.position.x, monster.position.y - 1));
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
                //console.log(dir, monster.position);
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
            //console.log(below.gameData.player.currentLocation.x, below.gameData.player.currentLocation.y);
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
            //console.log(below.gameData.player.currentLocation.y, below.gameData.player.destinationLocation.y);
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
        console.log();
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
