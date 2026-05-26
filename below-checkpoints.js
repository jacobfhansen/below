// Dev checkpoint system — below.fastForward(id) jumps to any game phase
// with all prerequisite quest state set up. Cumulative: calling a checkpoint
// applies all earlier checkpoints first.

below._checkpoints = {};
below._checkpointsOrder = [
    "start",
    "hermit_done",
    "medusa_met",
    "maze_exit",
    "depths_entry",
    "sam_done",
    "beach_arrival",
    "beach_cleared",
    "fissure_entry",
    "fissure_games_done",
    "deeper_dark",
    "deeper_depths"
];

// --- Helper functions for checkpoint mutations ---
function _cpSetObstacle(mapId, x, y, props) {
    var obs = below.gameData.mapData[mapId].obstacles.find(function(o) {
        return o.position && o.position.x === x && o.position.y === y;
    });
    if (obs) { for (var k in props) { obs[k] = props[k]; } }
}

function _cpClearMonsters(mapId) {
    below.gameData.mapData[mapId].monsters = [];
}

function _cpSetDialog(mapId, npcType, dialogId, available) {
    var npc = below.gameData.mapData[mapId].npcs.find(function(n) { return n.type === npcType; });
    if (npc && npc.dialogOptions) {
        for (var di = 0; di < npc.dialogOptions.length; di++) {
            if (npc.dialogOptions[di].id === dialogId) {
                npc.dialogOptions[di].available = available;
                return;
            }
        }
    }
}

function _cpSetNpcPos(mapId, npcType, x, y) {
    var npc = below.gameData.mapData[mapId].npcs.find(function(n) { return n.type === npcType; });
    if (npc) { npc.position = { x: x, y: y }; }
}

function _cpMoveNpc(fromMap, npcType, toMap, toX, toY) {
    var arr = below.gameData.mapData[fromMap].npcs;
    for (var ni = 0; ni < arr.length; ni++) {
        if (arr[ni].type === npcType) {
            var npc = arr.splice(ni, 1)[0];
            npc.position = { x: toX, y: toY };
            below.gameData.mapData[toMap].npcs.push(npc);
            return;
        }
    }
}

// --- Checkpoint definitions (delta from previous) ---
below._checkpoints.start = {
    map: 0, pos: { x: 1, y: 2 },
    title: "Fresh Start",
    apply: function() {
        // Move Hermit to default position
        _cpSetNpcPos(0, "hermit", 3, 3);
        _cpSetDialog(0, "hermit", "hermitq0", true);
    }
};

below._checkpoints.hermit_done = {
    map: 0, pos: { x: 11, y: 4 },
    title: "After Hermit's Quests",
    apply: function() {
        below.jesterMet = true;
        below.ratsCleared = true;
        below.centipedesHandled = true;
        below.pendingRatClear = false;
        below.centipedeCheckTick = 0;
        below.gameData.player.cutScenePlayed.after_map0 = true;
        below.gameData.player.inventory = ["silver_key", "bronze_key", "herbs", "stone_key", "bat_swatter"];

        // Open story doors on map 0
        _cpSetObstacle(0, -2, 2, { closed: false, blocking: false });
        _cpSetObstacle(0, -7, 3, { closed: false, blocking: false });
        _cpSetObstacle(0, -3, -4, { closed: false, blocking: false });
        _cpSetObstacle(0, -9, -2, { closed: false, blocking: false });

        _cpClearMonsters(0);
        _cpSetNpcPos(0, "hermit", 7, -2);
        _cpSetDialog(0, "hermit", "hermitq0", true);
    }
};

below._checkpoints.medusa_met = {
    map: 1, pos: { x: 3, y: 0 },
    title: "After Password Door",
    apply: function() {
        below.jesterMet = true;
        below.gameData.player.cutScenePlayed.after_map0 = true;
        below.gameData.player.inventory = ["silver_key", "bronze_key", "herbs", "stone_key", "bat_swatter"];

        // Open password door on map 1
        _cpSetObstacle(1, 6, 2, { closed: false, blocking: false });

        // Move Jester from map 0 to map 1
        _cpMoveNpc(0, "jester", 1, 8, 2);
        _cpSetDialog(1, "jester", "jesterq1", false);
        _cpSetDialog(1, "jester", "jesterq9", true);
    }
};

below._checkpoints.maze_exit = {
    map: 2, pos: { x: 23, y: 11 },
    title: "Maze Exit (to Depths)",
    apply: function() {
        below.jesterMet = true;
        below.ratsCleared = true;
        below.centipedesHandled = true;
        below.gameData.player.cutScenePlayed.after_map0 = true;
        below.gameData.player.inventory = ["silver_key", "bronze_key", "stone_key", "bat_swatter"];
        below.gameData.player.mazeCycle = 0;

        // Open shimmer walls (herbs given to Mole)
        var map2Obs = below.gameData.mapData[2].obstacles;
        for (var oi = 0; oi < map2Obs.length; oi++) {
            if (map2Obs[oi].type === "shimmering_wall") {
                map2Obs[oi].closed = false;
                map2Obs[oi].blocking = false;
                map2Obs[oi].icon = "shimmer_wall_open.png";
            }
        }

        // Mole at default position with healed dialog
        _cpSetNpcPos(2, "mole", 0, 0);
        _cpSetDialog(2, "mole", "mole_sick", false);
        _cpSetDialog(2, "mole", "mole_cured", true);
        _cpSetDialog(2, "mole", "moleq1", false);

        // Map 1: password door open, Jester moved
        _cpSetObstacle(1, 6, 2, { closed: false, blocking: false });
        _cpMoveNpc(0, "jester", 1, 8, 2);
        _cpSetDialog(1, "jester", "jesterq1", false);
        _cpSetDialog(1, "jester", "jesterq9", true);
    }
};

below._checkpoints.depths_entry = {
    map: 3, pos: { x: 3, y: 0 },
    title: "The Depths (Sam Available)",
    apply: function() {
        below.jesterMet = true;
        below.ratsCleared = true;
        below.centipedesHandled = true;
        below.gameData.player.cutScenePlayed.after_map0 = true;
        below.gameData.player.inventory = ["silver_key", "bronze_key", "stone_key", "bat_swatter", "rudder", "mast", "steering_wheel", "sail"];
        below.gameData.player.mazeCycle = 0;

        // Open shimmer walls (herbs given to Mole)
        var map2Obs = below.gameData.mapData[2].obstacles;
        for (var oi = 0; oi < map2Obs.length; oi++) {
            if (map2Obs[oi].type === "shimmering_wall") {
                map2Obs[oi].closed = false;
                map2Obs[oi].blocking = false;
                map2Obs[oi].icon = "shimmer_wall_open.png";
            }
        }
        // Mole healed, help option open
        _cpSetNpcPos(2, "mole", 0, 0);
        _cpSetDialog(2, "mole", "mole_sick", false);
        _cpSetDialog(2, "mole", "mole_cured", true);
        _cpSetDialog(2, "mole", "moleq1", false);

        // Remove Jester and Medusa from map 1 (happened on first visit to The Depths)
        var map1Npcs = below.gameData.mapData[1].npcs;
        for (var di = map1Npcs.length - 1; di >= 0; di--) {
            if (map1Npcs[di].type === "jester" || map1Npcs[di].type === "medusa") {
                map1Npcs.splice(di, 1);
            }
        }
        below.gameData.player.depthsVisited = true;
    }
};

below._checkpoints.sam_done = {
    map: 3, pos: { x: 18, y: 9 },
    title: "Sam's Quest Complete",
    apply: function() {
        below._checkpoints.depths_entry.apply();
        below.gameData.player.samQuestComplete = true;
        below.gameData.player.inventory = ["silver_key", "bronze_key", "stone_key", "bat_swatter"];

        // Remove Sam from map 3 and move him to office
        var map3Npcs = below.gameData.mapData[3].npcs;
        for (var si = 0; si < map3Npcs.length; si++) {
            if (map3Npcs[si].type === "sam_shale") {
                map3Npcs[si].position = { x: 0, y: -2 };
                map3Npcs[si].destPos = {};
                _cpSetDialog(3, "sam_shale", "detective_office", true);
                // Close all Sam walk dialogs
                var samDialogs = map3Npcs[si].dialogOptions;
                for (var di = 0; di < samDialogs.length; di++) {
                    if (samDialogs[di].id !== "detective_office") {
                        samDialogs[di].available = false;
                    }
                }
                break;
            }
        }

        // Add Jester-as-Dockmaster to map 3
        map3Npcs.push({
            type: "jester",
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

        // Ship ready with all parts attached
        var shipNpc = map3Npcs.find(function(n) { return n.type === "derelict_ship"; });
        if (shipNpc) {
            shipNpc.shipParts = 4;
            _cpSetDialog(3, "derelict_ship", "ship_intro", false);
            _cpSetDialog(3, "derelict_ship", "ship_ready", true);
            var departOpt = shipNpc.dialogOptions.find(function(d) { return d.id === "ship_ready"; });
            if (departOpt && departOpt.options) {
                var dOpt = departOpt.options.find(function(o) { return o.id === "ship_depart"; });
                if (dOpt) dOpt.available = true;
            }
        }
    }
};

below._checkpoints.beach_arrival = {
    map: 4, pos: { x: 2, y: 0 },
    title: "Beach Arrival",
    apply: function() {
        below._checkpoints.sam_done.apply();

        // Mole healed with help option available
        _cpSetNpcPos(2, "mole", 0, 0);
        _cpSetDialog(2, "mole", "mole_sick", false);
        _cpSetDialog(2, "mole", "mole_cured", true);
        _cpSetDialog(2, "mole", "moleq1", false);
    }
};

below._checkpoints.beach_cleared = {
    map: 4, pos: { x: -11, y: 1 },
    title: "Beach Rocks Cleared",
    apply: function() {
        below._checkpoints.beach_arrival.apply();
        // Remove beach rocks
        var rockPositions = [{x:-7,y:1},{x:-8,y:1},{x:-9,y:1},{x:-10,y:1}];
        var map4Obs = below.gameData.mapData[4].obstacles;
        below.gameData.mapData[4].obstacles = map4Obs.filter(function(o) {
            return !rockPositions.some(function(p) {
                return o.position && o.position.x === p.x && o.position.y === p.y;
            });
        });
        // Mole returned to map 2, beach clone removed
        delete below.gameData.moleQuestData;
    }
};

below._checkpoints.fissure_entry = {
    map: 5, pos: { x: 13, y: 1 },
    title: "The Fissure (Sisters)",
    apply: function() {
        below._checkpoints.beach_cleared.apply();
        below.gameData.player.cutScenePlayed.after_map5 = false;
    }
};

below._checkpoints.fissure_games_done = {
    map: 5, pos: { x: 10, y: 11 },
    title: "Sisters' Games Done",
    apply: function() {
        below._checkpoints.fissure_entry.apply();
        below.map5TilesMoved = 50;

        // Remove mushroom at (10, 11)
        var map5Obs = below.gameData.mapData[5].obstacles;
        var mushroomPos = { x: 10, y: 11 };
        below.gameData.mapData[5].obstacles = map5Obs.filter(function(o) {
            return !(o.position && o.position.x === mushroomPos.x && o.position.y === mushroomPos.y);
        });

        // Set sisters' dialog state to exit-reveal
        var sisters = below.gameData.mapData[5].npcs;
        for (var ni = 0; ni < sisters.length; ni++) {
            var sOpts = sisters[ni].dialogOptions;
            for (var di = 0; di < sOpts.length; di++) {
                sOpts[di].available = false;
            }
            _cpSetDialog(5, "rotten_sisters", "sisters_congratulations", true);
            _cpSetDialog(5, "rotten_sisters", "sisters_exit_reveal", true);
        }
    }
};

below._checkpoints.deeper_dark = {
    map: 6, pos: { x: 0, y: 5 },
    title: "The Deeper Dark",
    apply: function() {
        below._checkpoints.fissure_games_done.apply();
        below.gameData.player.cutScenePlayed.after_map5 = true;
        below.gameData.player.jesterMovedToMap4 = true;
        for (var ji = 0; ji < below.gameData.mapData.length; ji++) {
            var jnpcs = below.gameData.mapData[ji].npcs;
            for (var jni = jnpcs.length - 1; jni >= 0; jni--) {
                if (jnpcs[jni].type === "jester") {
                    jnpcs.splice(jni, 1);
                }
            }
        }
        below.gameData.mapData[5].npcs.push({
            type: "jester",
            position: { x: 12, y: 10 },
            movement: 0,
            dialogOptions: [{
                id: "jester_map4_sam",
                available: true,
                text: "The Jester is leaning against a rock, trying to look casual but definitely waiting for you.\n\nJESTER: 'Well, well, well! Look who's still breathing! I was starting to take bets on how long you'd last. Don't worry - I bet ON you. Mostly because the odds were terrible and I like a long shot.'\n\nHe grins, but there's something almost sincere underneath.\n\nJESTER: 'Anyway. I overheard Sam Shale knows something about what's below. Yeah, THAT Sam. The broody trenchcoat with the flashlight. Guy's all cryptic and tragic but he's got info about the deep places. Maybe go squeeze it out of him? Before you get yourself killed in a way that would make me lose my investment.'\n\nHe winks and starts juggling rocks, apparently done being helpful.",
                options: [{
                    id: "jester_map4_sam_end",
                    text: "Thanks... I think.",
                    available: true
                }]
            }]
        });
        below.gameData.mapData[5].npcs.forEach(function(n) {
            if (n.type === "rotten_sisters" && n.dialogOptions) {
                for (var di = 0; di < n.dialogOptions.length; di++) {
                    if (n.dialogOptions[di].id === "sisters_jester") {
                        n.dialogOptions[di].available = true;
                    }
                }
            }
        });
    }
};

below._checkpoints.deeper_depths = {
    map: 7, pos: { x: 5, y: 5 },
    title: "The Deeper Depths",
    apply: function() {
        below._checkpoints.deeper_dark.apply();
        below.gameData.player.inventory = ["silver_key", "bronze_key", "stone_key", "bat_swatter", "flashlight"];
        var map6Obs = below.gameData.mapData[6].obstacles;
        for (var oi = map6Obs.length - 1; oi >= 0; oi--) {
            if (map6Obs[oi].type === "shadow_wall" && map6Obs[oi].position.x === 5 && map6Obs[oi].position.y === -12) {
                map6Obs.splice(oi, 1);
            }
        }
        var sam = below.gameData.mapData[3].npcs.find(function(n) { return n.type === "sam_shale"; });
        if (sam && sam.dialogOptions) {
            var officeD = sam.dialogOptions.find(function(d) { return d.id === "detective_office"; });
            if (officeD && officeD.options) {
                var hairOpt = officeD.options.find(function(o) { return o.id === "detective_hair_take"; });
                if (hairOpt) hairOpt.available = false;
            }
        }
    }
};

// --- Main fast-forward function ---
below.fastForward = function(id) {
    var idx = below._checkpointsOrder.indexOf(id);
    if (idx === -1) { console.warn('Unknown checkpoint "' + id + '". Available: ' + below._checkpointsOrder.join(", ")); return; }

    if (below.choiceEvent) closeChoiceEvent();
    if (below.splashActive) hideSplash();
    closeInventory();

    // Deep clone fresh game data
    below.gameData = JSON.parse(JSON.stringify(belowGameData));
    below.gameData.player.icon = "boy.png";

    // Reset runtime flags
    below.jesterMet = false;
    below.ratsCleared = false;
    below.centipedesHandled = false;
    below.pendingRatClear = false;
    below.tagActive = false;
    below.sistersReturnContext = null;
    below.map5TilesMoved = 0;
    below.centipedeCheckTick = 0;
    below.splashCount = 0;
    below.gameData.player.cutScenePlayed = {};
    below.gameData.player.inventory = [];
    below.gameData.player.samQuestComplete = false;
    below.gameData.player.mazeCycle = 0;
    below.gameData.player.depthsVisited = false;
    below.gameData.player.jesterMovedToMap4 = false;

    // Apply all checkpoints up to target
    for (var i = 0; i <= idx; i++) {
        below._checkpoints[below._checkpointsOrder[i]].apply();
    }

    var cp = below._checkpoints[id];
    changeMap(cp.map, cp.pos.x, cp.pos.y, "\u26A1 Fast-forward to: " + cp.title);
};

