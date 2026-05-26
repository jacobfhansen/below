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
        alert('below-gamedata.js not loaded!');
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
    addMapMessage("Game data synced from below-gamedata.js.");
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

// Numeric→string ID migration for old saves
var LEGACY_ID_MAP = {
  itemTypes: { "4": "silver_key", "5": "bronze_key", "6": "herbs", "7": "stone_key", "8": "rudder", "9": "mast", "10": "steering_wheel", "11": "sail", "12": "antidote", "13": "rat_spray", "14": "bat_swatter", "15": "centipede_cleaner", "16": "medusa_hair", "17": "flashlight" },
  npcTypes: { "1": "hermit", "2": "jester", "3": "medusa", "4": "mole", "5": "sam_shale", "6": "derelict_ship", "7": "charon", "8": "rotten_sisters" },
  monsterTypes: { "1": "giant_rat", "2": "bat", "3": "centipede", "4": "living_shadow" },
  obstacleTypes: { "1": "rock", "2": "blood", "3": "table", "4": "door", "5": "cupboard", "6": "lightbeam", "7": "password_door", "8": "statue", "9": "pushable_rock", "10": "gem", "11": "stone_door", "12": "shimmering_wall", "13": "lamppost", "14": "crate", "15": "barrel", "16": "bed", "17": "chair", "18": "blue_mushroom", "19": "purple_mushroom", "20": "yellow_mushroom", "21": "pink_crystal", "22": "floor_item", "23": "shadow_wall" }
};

function migrateSaveData(data) {
  if (!data || data._migrated) return;
  // Detect if migration needed — check itemTypes for numeric keys
  var needsMigrate = false;
  for (var typeKey in LEGACY_ID_MAP) {
    var map = LEGACY_ID_MAP[typeKey];
    for (var numKey in map) {
      if (data[typeKey] && data[typeKey][numKey]) {
        needsMigrate = true;
        break;
      }
    }
    if (needsMigrate) break;
  }
  if (!needsMigrate) { data._migrated = true; return; }

  // Remap type definition keys
  for (var typeKey in LEGACY_ID_MAP) {
    var map = LEGACY_ID_MAP[typeKey];
    var oldObj = data[typeKey];
    if (!oldObj) continue;
    var newObj = {};
    for (var numKey in map) {
      if (oldObj[numKey]) {
        newObj[map[numKey]] = oldObj[numKey];
      }
    }
    data[typeKey] = newObj;
  }

  // Walk all maps to migrate instance type/itemType/keyId fields
  for (var mi = 0; mi < data.mapData.length; mi++) {
    var map = data.mapData[mi];
    if (!map) continue;

    // Monsters
    if (map.monsters) {
      for (var i = 0; i < map.monsters.length; i++) {
        var m = map.monsters[i];
        if (m.type && LEGACY_ID_MAP.monsterTypes[m.type]) {
          m.type = LEGACY_ID_MAP.monsterTypes[m.type];
        }
      }
    }
    // NPCs
    if (map.npcs) {
      for (var i = 0; i < map.npcs.length; i++) {
        var n = map.npcs[i];
        if (n.type && LEGACY_ID_MAP.npcTypes[n.type]) {
          n.type = LEGACY_ID_MAP.npcTypes[n.type];
        }
        // Dialog requiresItems
        if (n.dialogOptions) {
          migrateDialogRequiresItems(n.dialogOptions);
        }
      }
    }
    // Obstacles
    if (map.obstacles) {
      for (var i = 0; i < map.obstacles.length; i++) {
        var o = map.obstacles[i];
        if (o.type && LEGACY_ID_MAP.obstacleTypes[o.type]) {
          o.type = LEGACY_ID_MAP.obstacleTypes[o.type];
        }
        if (o.itemType && LEGACY_ID_MAP.itemTypes[o.itemType]) {
          o.itemType = LEGACY_ID_MAP.itemTypes[o.itemType];
        }
        if (o.keyId && LEGACY_ID_MAP.itemTypes[o.keyId]) {
          o.keyId = LEGACY_ID_MAP.itemTypes[o.keyId];
        }
      }
    }
  }

  // Migrate player inventory
  if (data.player && data.player.inventory) {
    for (var i = 0; i < data.player.inventory.length; i++) {
      var item = data.player.inventory[i];
      if (typeof item === 'number' || /^\d+$/.test(item)) {
        var strId = LEGACY_ID_MAP.itemTypes[item];
        if (strId) data.player.inventory[i] = strId;
      }
    }
  }

  data._migrated = true;
}

function migrateDialogRequiresItems(dialogOptions) {
  for (var di = 0; di < dialogOptions.length; di++) {
    var d = dialogOptions[di];
    if (d.requiresItems) {
      for (var ri = 0; ri < d.requiresItems.length; ri++) {
        var item = d.requiresItems[ri];
        if (typeof item === 'number' || /^\d+$/.test(item)) {
          var strId = LEGACY_ID_MAP.itemTypes[item];
          if (strId) d.requiresItems[ri] = strId;
        }
      }
    }
    if (d.options) migrateDialogRequiresItems(d.options);
  }
}

function continueGame(slotIndex) {
    var saved = loadFromSlot(slotIndex);
    if (!saved) {
        alert('No saved game in this slot.');
        return;
    }
    below.gameData = JSON.parse(JSON.stringify(saved));
    migrateSaveData(below.gameData);
    mergeDialogOptions(below.gameData);
    below.currentSlot = slotIndex;
    switchPage('gameDiv');
}

function saveCurrentGame() {
    if (below.currentSlot !== undefined) {
        saveToSlot(below.currentSlot, below.gameData);
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
    // Toggle the wrapper created by endCutScene so it doesn't cover the menu
    var wrapper = document.getElementById("gameDivWrapper");
    if (wrapper) {
        wrapper.style.display = page === "gameDiv" ? "block" : "none";
    }
}
