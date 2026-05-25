function toggleInventory() {
    var inventoryDiv = document.getElementById("inventoryDiv");
    if (inventoryDiv.style.display === 'none') {
        showInventory();
    } else {
        closeInventory();
    }
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
                    eqBadge.innerHTML = '&#10003; Equipped';
                    eqBadge.style.color = '#000';
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
