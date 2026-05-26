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
    _shadowCatchHandled: false,
    equippedItem: null,
    cutScene: null,
    cutSceneCuts: null,
    cutSceneIndex: 0,
    cutSceneStart: null,
    cutSceneCallback: null,
    gameData: null // Loaded from below-gamedata.js
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

var imageCache = {};
function getImage(filename) {
    if (!imageCache[filename]) {
        imageCache[filename] = new Image();
        imageCache[filename].src = "images/" + filename;
    }
    return imageCache[filename];
}

window.onbeforeunload = confirmExit;
function confirmExit() {
    saveCurrentGame();
    return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
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

function addMapMessage(msg) {
    if (below.gameData.mapLog.length > 0 && below.gameData.mapLog[below.gameData.mapLog.length - 1] === msg) return;
    below.gameData.mapLog.push(msg);
}

function scrollLogToBottom() {
    var el = document.getElementById("gameLogDiv");
    if (el) el.scrollTop = el.scrollHeight;
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
