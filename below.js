const below = {
    version: '0.0.1',
    c64Colors: ["#000000","#FFFFFF","#68372B","#70A4B2","#6F3D86","#588D43","#352879","#B8C76F",
                "#6F4F25","#433900","#9A6759","#444444","#6C6C6C","#9AD284","#6C5EB5","#959595"],
    pages: ["cutSceneDiv", "titleScreen", "resumeGameDiv", "gameDiv", "newGameDiv"],
    gameData: {
        player: {
            currentMap: 0,
            currentLocation: {
                x: 2,
                y: 2
            }
        },
        maps: [
            {
                name: 'Start',
                tiles: [
                    {
                        x: 0,
                        y: 0
                    },
                    {
                        x: 1,
                        y: 0
                    },
                    {
                        x: 2,
                        y: 0
                    },
                    {
                        x: 0,
                        y: 1
                    },
                    {
                        x: 1,
                        y: 1
                    },
                    {
                        x: 2,
                        y: 1
                    },
                    {
                        x: 0,
                        y: 2
                    },
                    {
                        x: 1,
                        y: 2
                    },
                    {
                        x: 2,
                        y: 2
                    }
                ]
            }
        ]
    }
}

window.onbeforeunload = confirmExit;
function confirmExit() {
    return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    // Map div
    if (document.getElementById("gameDiv").style.display !== 'none') {
        var curY = below.gameData.player.currentLocation.y,
            curX = below.gameData.player.currentLocation.x;
        
        foundTile = function(x, y) {
            return below.gameData.maps[below.gameData.player.currentMap].tiles.find(function(element) {
                return (element.x === x && element.y === y);
            });
        }
        if (e.keyCode == '38' && foundTile(curX, curY -1)) {
            below.gameData.player.currentLocation.y -= 1;
            drawMapCanvas();
        }
        else if (e.keyCode == '40' && foundTile(curX, curY +1)) {
            below.gameData.player.currentLocation.y += 1;
            drawMapCanvas();
        }
        else if (e.keyCode == '37' && foundTile(curX -1, curY)) {
           below.gameData.player.currentLocation.x -= 1;
           drawMapCanvas();
        }
        else if (e.keyCode == '39' && foundTile(curX +1, curY)) {
           below.gameData.player.currentLocation.x += 1;
           drawMapCanvas();
        }
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

function drawMapCanvas() {
    var gameDivCenter = document.getElementById("gameDivCenter");
    var canvas = document.getElementById("mapCanvas");
    canvas.width = gameDivCenter.offsetWidth -60;
    canvas.height = gameDivCenter.offsetHeight -60;
    canvas.clickableElements = [];
    var context = canvas.getContext("2d");
    
    // Draw tiles
    var thickness = 1;
    var width = 50;    
    var horisontalCenter = canvas.height / 2;
    var verticalCenter = canvas.width / 2;    
    below.gameData.maps[0].tiles.forEach(function(tile) {
        context.fillStyle = "#959595";
        context.fillRect( (tile.x * width) + verticalCenter, (tile.y * width) + (horisontalCenter) , width, width);
        context.fillStyle = "#6C6C6C";
        context.fillRect( (tile.x * width) + (thickness + verticalCenter), (tile.y * width) + (thickness + horisontalCenter), width - (thickness * 2), width - (thickness * 2));
    });
    
    // Draw player and monster sprites
    context.fillStyle = "#9A6759";
    context.beginPath();
    context.arc( (below.gameData.player.currentLocation.x * width) + (width / 2) + verticalCenter, (below.gameData.player.currentLocation.y * width) + (width / 2) + horisontalCenter, (width-2)/2, 0, 2 * Math.PI);
    context.fill();
    
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
    console.log(123,canvas);
    gameDivCenter.appendChild(canvas);
}

function startGame() {
    respondToVisibility(document.getElementById("gameDiv"), visible => {
        const feedbackEl = document.getElementById("visibilityFeedback");
        if(visible) {
            drawMapCanvas();
        }
        else {
            console.log(2);
        }
    });
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        var me=this;
        me.canvas.width = window.innerWidth - 120;
        me.canvas.height = window.innerHeight - 120;
        me.canvas.clickableElements = [];
        me.context = me.canvas.getContext("2d");
        
        me.context.font = "30px Courier";
        me.context.fillText("Below",(me.canvas.width/2)-50,(me.canvas.height/2)-50);
        
        document.body.insertBefore(me.canvas, document.body.childNodes[0]);
        
        me.canvas.addEventListener('click', function(event) {
            var x = event.pageX,
                y = event.pageY;
            console.log(x, y);
            me.canvas.clickableElements.forEach(function(element) {
                if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                    alert('clicked an element: ' + element);
                }
            });

        }, false);
    }
}
