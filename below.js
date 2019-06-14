const below = {
    version: '0.0.1',
    c64Colors: ["#000000","#FFFFFF","#68372B","#70A4B2","#6F3D86","#588D43","352879","#B8C76F",
                "#6F4F25","#433900","#9A6759","#444444","#6C6C6C","#9AD284","#6C5EB5","#959595"],
    pages: ["cutSceneDiv", "titleScreen", "resumeGameDiv", "gameDiv", "newGameDiv"],
    gameData: {
        mapZoom: 50,
        mapLog: [],
        player: {
            currentMap: 0,
            currentLocation: { x: 2, y: 2 }
        },
        monsterTypes: {
            1: {
                    name: "Giant rat",
                    fraction: 2,
                    movement: 0.05,
                    color: "#9A6759"
            },
            2:  {
                    name: "Bat",
                    fraction: 1
            },
            3: {
                    name: "Centipede",
                    fraction: 1
            }
        },
        maps: [
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
                    x1y0: { x: 1, y: 0, text: "There are claw marks on the floor" },
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
                    x7y2: { x: 7, y: 2 }
                },
                monsters: [
                    {
                        type: 1,
                        position: { x: -6, y: 2 },
                        status: 1
                    }
                ],
                npcs: [ 1 ]
            }
        ]
    }
}

window.onbeforeunload = confirmExit;
function confirmExit() {
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
        if (below.gameData.mapZoom > 75) below.gameData.mapZoom = 75;
        //drawMapCanvas();
    }
}

function checkKey(e) {
    e = e || window.event;
    // Map div
    if (document.getElementById("gameDiv").style.display !== 'none') {
        moveOnMap(e);
    }
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
    return below.gameData.maps[below.gameData.player.currentMap].tiles[index];
    //return below.gameData.maps[below.gameData.player.currentMap].tiles.find(function(element) {
    //    return (element.x === x && element.y === y);
    //});
}

function moveOnMap(e) {
    var curY = below.gameData.player.currentLocation.y,
        curX = below.gameData.player.currentLocation.x,
        playerMoved = false;
    
    //foundTile = function(x, y) {
        //var index = 'x' + (x < 0 ? 'm' : '') + Math.abs(x) + 'y' + (y < 0 ? 'm' : '') + Math.abs(y);
        //return below.gameData.maps[below.gameData.player.currentMap].tiles[index];
        //return below.gameData.maps[below.gameData.player.currentMap].tiles.find(function(element) {
            //return (element.x === x && element.y === y);
        //});
    //}
    //console.log(1,e.keyCode);
    if (e.keyCode == '69') {
        console.log('Interact');
    }
    if (e.keyCode == '81') {
        console.log('Inventory');
    }
    if ((e.keyCode == '38' || e.keyCode == '87') && foundTile(curX, curY -1)) {
        below.gameData.player.currentLocation.y -= 1;
        playerMoved = true;
    }
    else if ((e.keyCode == '40' || e.keyCode == '83') && foundTile(curX, curY +1)) {
        below.gameData.player.currentLocation.y += 1;
        playerMoved = true;
    }
    else if ((e.keyCode == '37' || e.keyCode == '65') && foundTile(curX -1, curY)) {
       below.gameData.player.currentLocation.x -= 1;
       playerMoved = true;
    }
    else if ((e.keyCode == '39' || e.keyCode == '68') && foundTile(curX +1, curY)) {
       below.gameData.player.currentLocation.x += 1;
       playerMoved = true;
    }
    if (playerMoved) {        
        var tile = foundTile(below.gameData.player.currentLocation.x, below.gameData.player.currentLocation.y);
        console.log(1, tile);
        if (tile['text']) {
            below.gameData.mapLog.push(tile['text']);
            maintainMapLog();
        }
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
    
    for (var k in below.gameData.maps[curMap].tiles) {
        if (typeof below.gameData.maps[curMap].tiles[k] !== 'function') {
            var tile = below.gameData.maps[curMap].tiles[k];
            context.fillStyle = "#959595";
            context.fillRect( (tile.x * width) - (width/2) + verticalCenter - horisontalOffset, (tile.y * width) - (width/2) + horisontalCenter - verticalOffset, width, width);
            context.fillStyle = "#6C6C6C";
            context.fillRect( (tile.x * width) - (width/2) + (thickness + verticalCenter) - horisontalOffset, (tile.y * width) - (width/2) + (thickness + horisontalCenter) - verticalOffset, width - (thickness * 2), width - (thickness * 2));
        }
    }
    //below.gameData.maps[curMap].tiles.forEach(function(tile) {
        //context.fillStyle = "#959595";
        //context.fillRect( (tile.x * width) + verticalCenter, (tile.y * width) + (horisontalCenter) , width, width);
        //context.fillStyle = "#6C6C6C";
        //context.fillRect( (tile.x * width) + (thickness + verticalCenter), (tile.y * width) + (thickness + horisontalCenter), width - (thickness * 2), width - (thickness * 2));
    //});
    
    // Draw player and monster sprites
    // PLAYER
    context.fillStyle = "#B8C76F";
    context.beginPath();
    //context.arc( (below.gameData.player.currentLocation.x * width) + (width / 2) + verticalCenter, (below.gameData.player.currentLocation.y * width) + (width / 2) + horisontalCenter, (width-2)/2, 0, 2 * Math.PI);
    context.arc( verticalCenter, horisontalCenter, (width-2)/2, 0, 2 * Math.PI);
    context.fill();
    // MONSTERS
    below.gameData.maps[curMap].monsters.forEach(function(monster) {
        var type = below.gameData.monsterTypes[monster.type];
        context.fillStyle = type.color;
        context.beginPath();
        context.arc( (monster.position.x * width) + verticalCenter - horisontalOffset, (monster.position.y * width) + horisontalCenter - verticalOffset, (width-2)/2, 0, 2 * Math.PI);
        context.fill();
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
    var tick = window.requestAnimationFrame(mapGameLoop);
    //console.log(tick, below.tick);
    // Calculate monster movement
    var curMap = below.gameData.player.currentMap;
    below.gameData.maps[curMap].monsters.forEach(function(monster) {
        // First, do moster move?
        var type = below.gameData.monsterTypes[monster.type];
        if (Math.random() < type.movement) {
            // What direction do it move?
            var dir = (Math.floor(Math.random() * 4)) + 1;
            console.log('foundTile',foundTile(monster.position.x, monster.position.y - 1));
            if (dir === 1 && foundTile(monster.position.x, monster.position.y - 1)) { monster.position.y-- }
            else if (dir === 2 && foundTile(monster.position.x, monster.position.y + 1)) { monster.position.y++ }
            else if (dir === 3 && foundTile(monster.position.x - 1, monster.position.y)) { monster.position.x-- }
            else if (dir === 4 && foundTile(monster.position.x + 1, monster.position.y)) { monster.position.x++ }
            console.log(dir, monster.position);
        }
    })
    below.tick = tick;
    // Then draw
    drawMapCanvas();
}

function startGame() {
    respondToVisibility(document.getElementById("gameDiv"), visible => {
        const feedbackEl = document.getElementById("visibilityFeedback");
        if(visible) {
            //drawMapCanvas();
            mapGameLoop();
        }
        else {
            console.log(2);
        }
    });
}

//var myGameArea = {
    //canvas : document.createElement("canvas"),
    //start : function() {
        //var me=this;
        //me.canvas.width = window.innerWidth - 120;
        //me.canvas.height = window.innerHeight - 120;
        //me.canvas.clickableElements = [];
        //me.context = me.canvas.getContext("2d");
        
        //me.context.font = "30px Courier";
        //me.context.fillText("Below",(me.canvas.width/2)-50,(me.canvas.height/2)-50);
        
        //document.body.insertBefore(me.canvas, document.body.childNodes[0]);
        
        //me.canvas.addEventListener('click', function(event) {
            //var x = event.pageX,
                //y = event.pageY;
            //console.log(x, y);
            //me.canvas.clickableElements.forEach(function(element) {
                //if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                    //alert('clicked an element: ' + element);
                //}
            //});

        //}, false);
    //}
//}
