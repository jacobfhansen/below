function showChoiceEvent() {
    var x = below.gameData.player.currentLocation.x;
    var y = below.gameData.player.currentLocation.y;
    var curMap = below.gameData.player.currentMap;
    
    // Check for floor item at player's position
    var floorItem = below.gameData.mapData[curMap].obstacles.find(function(o) {
        return o.position && o.position.x === x && o.position.y === y && o.itemType !== undefined;
    });
    if (floorItem) {
        var itemType = below.gameData.itemTypes[floorItem.itemType];
        var itemName = itemType ? itemType.name : "item";
        var msg = "A " + itemName + " lies on the ground.";
        below.choiceEvent = {
            selectedIndex: 0,
            message: msg,
            options: [
                { text: "Take " + itemName, action: function() {
                    below.gameData.player.inventory.push(floorItem.itemType);
                    closeChoiceEvent();
                    var idx = below.gameData.mapData[curMap].obstacles.indexOf(floorItem);
                    if (idx !== -1) below.gameData.mapData[curMap].obstacles.splice(idx, 1);
                    drawMapCanvas();
                    setTimeout(function() { showInventory([floorItem.itemType]); }, 50);
                }},
                { text: "Leave it", action: function() { addMapMessage("You leave it on the ground."); maintainMapLog(); } }
            ]
        };
        renderChoiceEvent();
        return;
    }
    
    var msg = getBlockedMessage(x, y) || "You search the area...";
    below.choiceEvent = {
        selectedIndex: 0,
        message: msg,
        options: [
            { text: "Search", action: function() { addMapMessage(msg); maintainMapLog(); } },
            { text: "Move on", action: function() { addMapMessage("You move on..."); maintainMapLog(); } }
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
        
        // Handle Sam Shale giving the flashlight after Medusa Hair
        if (npc && npc.type === 5 && selectedOption.id === "detective_hair_take") {
            below.gameData.player.inventory.push(17);
            setTimeout(function() { showInventory([17]); }, 50);
            var hairIdx = below.gameData.player.inventory.indexOf(16);
            if (hairIdx !== -1) below.gameData.player.inventory.splice(hairIdx, 1);
            addMapMessage("Sam Shale takes the Medusa Hair and hands you a flashlight.");
            var officeD = npc.dialogOptions.find(function(d) { return d.id === "detective_office"; });
            if (officeD) {
                var takeOpt = officeD.options.find(function(o) { return o.id === "detective_hair_take"; });
                if (takeOpt) takeOpt.available = false;
            }
        }
        
        if (npc && npc.dialogOptions) {
            // Process "opens" - set available to true (do this first so chained dialog is available)
            if (selectedOption.opens) {
                selectedOption.opens.forEach(function(id) {
                    var match = npc.dialogOptions.find(function(d) { return d.id === id; });
                    if (match) {
                        match.available = true;
                    } else {
                        // Fall back: search option-level IDs in all dialogs
                        npc.dialogOptions.forEach(function(d) {
                            if (d.options) {
                                d.options.forEach(function(o) {
                                    if (o.id === id) o.available = true;
                                });
                            }
                        });
                    }
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
                            var match = npc.dialogOptions.find(function(d) { return d.id === id; });
                            if (match) {
                                match.available = false;
                            } else {
                                npc.dialogOptions.forEach(function(d) {
                                    if (d.options) {
                                        d.options.forEach(function(o) {
                                            if (o.id === id) o.available = false;
                                        });
                                    }
                                });
                            }
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
                    
                    // Fire quest handler for chain-triggered handlers
                    var chainHandler = questHandlers[selectedOption.id];
                    if (chainHandler) chainHandler(selectedOption);
                    
                    return; // Don't close the dialog
                }
            }
            
            // Process "closes" - set available to false (if no chain happened)
            if (selectedOption.closes) {
                selectedOption.closes.forEach(function(id) {
                    var match = npc.dialogOptions.find(function(d) { return d.id === id; });
                    if (match) {
                        match.available = false;
                    } else {
                        npc.dialogOptions.forEach(function(d) {
                            if (d.options) {
                                d.options.forEach(function(o) {
                                    if (o.id === id) o.available = false;
                                });
                            }
                        });
                    }
                });
            }
        }
    } else {
        // Old system - just run the action
        if (selectedOption.action) {
            selectedOption.action();
        }
    }
    
    // Dispatch quest handler
    dispatchQuestHandler(selectedOption);
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
            option.action = function() { addMapMessage("It's a rock"); maintainMapLog(); };
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
                    addMapMessage(desc);
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
                            addMapMessage(obstacle.statueDesc);
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
                            addMapMessage("The marble figure stares blankly into the dark. You've already learned what you can from it.");
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
                                    addMapMessage(tile.text);
                                } else {
                                    addMapMessage("It is empty.");
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
                                addMapMessage("You unlocked the door!");
                                maintainMapLog();
                            } else if (!isClosed) {
                                addMapMessage("The door is already open.");
                                maintainMapLog();
                            } else if (below.gameData.player.inventory.length > 0) {
                                addMapMessage("None of your keys seems to fit");
                                maintainMapLog();
                            } else {
                                addMapMessage("You need a key to unlock this door.");
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
                            addMapMessage("You pass through the door.");
                            maintainMapLog();
                        } else {
                            addMapMessage("The door is locked.");
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
                    addMapMessage(msg);
                    maintainMapLog();
                }
            };
        } else if (id === 10) {
            option.action = function() {
                if (below.choiceEvent && below.choiceEvent.npcType) {
                    var npcType = below.gameData.npcTypes[below.choiceEvent.npcType];
                    addMapMessage(npcType.agenda || "The merchant sizes you up...");
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
                    addMapMessage(msg);
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
                            addMapMessage("The door is already open.");
                            maintainMapLog();
                        }
                    }
                }
            };
        }
        return option;
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
            addMapMessage(msg);
            maintainMapLog();
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
        addMapMessage("The door swings open!");
        
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
        addMapMessage("Wrong password.");
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
