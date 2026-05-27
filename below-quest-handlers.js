// === Sam Shale walk helper ===
function walkSamTo(targetX, targetY, closeIds, openId, departureMsg, arrivalMsg) {
    if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
    var curMap = below.gameData.player.currentMap;
    var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
        return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
    });
    if (samNpc && npcWalkTo(samNpc, targetX, targetY, function() {
        closeIds.forEach(function(id) {
            var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
            if (d) d.available = false;
        });
        var openD = samNpc.dialogOptions.find(function(d) { return d.id === openId; });
        if (openD) openD.available = true;
        addMapMessage(arrivalMsg);
        maintainMapLog();
    }, 3)) {
        addMapMessage(departureMsg);
        maintainMapLog();
    }
}

// === Quest handler dispatch ===
function dispatchQuestHandler(selectedOption) {
    var handler = questHandlers[selectedOption.id];
    var shouldClose = true;
    if (handler) {
        var result = handler(selectedOption);
        if (result === false) shouldClose = false;
    }

    // Post-dispatch: Jester-met hook
    if (below.choiceEvent && below.choiceEvent.npcType === "jester" && !below.jesterMet) {
        below.jesterMet = true;
        var hermitNpc = below.gameData.mapData[0].npcs.find(function(n) { return n.type === "hermit"; });
        if (hermitNpc && hermitNpc.dialogOptions) {
            var hermitq0 = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
            if (hermitq0 && hermitq0.options) {
                var askJester = hermitq0.options.find(function(o) { return o.id === "hermit_ask_jester"; });
                if (askJester) askJester.available = true;
            }
        }
        var medusaNpc = below.gameData.mapData[1].npcs.find(function(n) { return n.type === "medusa"; });
        if (medusaNpc && medusaNpc.dialogOptions) {
            var medusaq0 = medusaNpc.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
            if (medusaq0 && medusaq0.options) {
                var jesterOpt = medusaq0.options.find(function(o) { return o.id === "medusaa1j"; });
                if (jesterOpt) jesterOpt.available = true;
            }
        }
    }

    if (shouldClose && !below.passwordInput) {
        closeChoiceEvent();
    }
}

// === Sam Shale shared walk handlers ===
var samReadyWalk = function() {
    walkSamTo(-9, 0,
        ["detectiveq0", "detectiveq1", "detective_help_intro", "detective_ready"],
        "detective_arrival",
        "Sam Slate tips his hat and melts into the shadows. You follow at a distance.",
        "Sam Slate stops in a shadowy alcove and gestures for you to join him."
    );
};

var samArrivalWalk = function() {
    walkSamTo(-5, -9,
        ["detective_arrival", "detective_arrival_doubt"],
        "detective_precinct",
        "Sam nods and pushes off the crate. 'Stay close.'",
        "Sam leads you through the damp streets to the police precinct."
    );
};

var samPrecinctWalk = function() {
    walkSamTo(1, -9,
        ["detective_precinct", "detective_precinct_sgt", "detective_precinct_info", "detective_precinct_thanks", "detective_precinct_sgt_final", "detective_precinct_after", "detective_precinct_reliable"],
        "detective_abe",
        "Sam tips his hat at the Sergeant and heads for the door.",
        "Sam ducks into a narrow alley and emerges at Honest Abe's Pawn Shop."
    );
};

var samAbeWalk = function() {
    walkSamTo(15, -4,
        ["detective_abe", "detective_abe_char", "detective_abe_medusa", "detective_abe_after", "detective_abe_explain"],
        "detective_rooftop",
        "Sam thanks Abe and heads for the back exit.",
        "Sam leads you through a service alley and up a rusted ladder to a high ledge."
    );
};

// === Quest handlers ===
var questHandlers = {
    // --- Hermit ---
    "hermit_centipede_give_ok": function() {
        below.gameData.player.inventory.push("centipede_cleaner");
        addMapMessage("The Hermit hands you a grimy bottle labeled 'Crawl-End'.");
        maintainMapLog();
        var centDoor = below.gameData.mapData[0].obstacles.find(function(o) {
            return o.position.x === -3 && o.position.y === -4;
        });
        if (centDoor) {
            centDoor.closed = false;
            centDoor.blocking = false;
            addMapMessage("The Hermit strains against a hidden latch. A section of the east wall swings open.");
            maintainMapLog();
        }
        setTimeout(function() { showInventory([15]); }, 50);
    },

    "hermit_centipede_thanks_accept": function() {
        below.gameData.player.inventory.push("herbs");
        addMapMessage("The Hermit hands you a bundle of dried cave herbs.");
        maintainMapLog();
        var hermitNpc = below.gameData.mapData[0].npcs.find(function(n) { return n.type === "hermit"; });
        if (hermitNpc) {
            var walked = npcWalkTo(hermitNpc, 7, -2, function() {
                hermitNpc.dialogOptions.forEach(function(d) {
                    if (d.id === "hermit_centipede_thanks") d.available = false;
                    else if (d.id === "hermitq0") d.available = true;
                });
                drawMapCanvas();
            }, 3);
            if (!walked) {
                hermitNpc.position.x = 7;
                hermitNpc.position.y = -2;
                hermitNpc.dialogOptions.forEach(function(d) {
                    if (d.id === "hermit_centipede_thanks") d.available = false;
                    else if (d.id === "hermitq0") d.available = true;
                });
            }
        }
        setTimeout(function() { showInventory([6]); }, 50);
        drawMapCanvas();
    },

    "hermit_insist_follow": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpc && npcWalkTo(hermitNpc, -1, 3, function() {
            var doorObstacle = below.gameData.mapData[0].obstacles.find(function(o) {
                return o.position.x === -2 && o.position.y === 2;
            });
            if (doorObstacle) {
                doorObstacle.closed = false;
                doorObstacle.blocking = false;
                doorObstacle.icon = "door_open.png";
            }
            showSplash({
                image: "rats_dialog.png",
                text: "The old stone door grinds open. Beyond it, a dark chamber stirs with movement - rats scatter in the shadows, their eyes glinting like tiny jewels.",
                shake: false
            });
            var hermitNpcArr = below.gameData.mapData[0].npcs.find(function(n) { return n.type === "hermit"; });
            if (hermitNpcArr && hermitNpcArr.dialogOptions) {
                var sprayD = hermitNpcArr.dialogOptions.find(function(d) { return d.id === "hermit_rat_spray"; });
                var baseD = hermitNpcArr.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
                if (sprayD) sprayD.available = true;
                if (baseD) baseD.available = false;
            }
        }, 3)) {
            addMapMessage("Alistair gathers his cloak and gestures for you to follow.");
            maintainMapLog();
        }
    },

    "hermit_rat_spray_accept": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpc && hermitNpc.dialogOptions) {
            var sprayD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_rat_spray"; });
            var waitD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_rat_spray_wait"; });
            if (sprayD) sprayD.available = false;
            if (waitD) waitD.available = true;
            below.gameData.player.inventory.push("silver_key");
            setTimeout(function() { showInventory([4]); }, 50);
            addMapMessage("Alistair hands you a small silver key. 'Take this for the door, beyond is my room. And hurry back - the rats won't wait.'");
            maintainMapLog();
        }
    },

    "hermit_rat_spray_decline": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpc && hermitNpc.dialogOptions) {
            var sprayD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermit_rat_spray"; });
            var baseD = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
            if (sprayD) sprayD.available = false;
            if (baseD) baseD.available = true;
            addMapMessage("Alistair shrugs. 'Suit yourself. The offer stands if you change your mind.'");
            maintainMapLog();
        }
    },

    "hermit_rat_spray_give_hand": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMap = below.gameData.player.currentMap;
        var hermitNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpc && hermitNpc.dialogOptions) {
            var sprayIdx = below.gameData.player.inventory.indexOf("rat_spray");
            if (sprayIdx !== -1) {
                below.gameData.player.inventory.splice(sprayIdx, 1);
            }
            if (npcWalkTo(hermitNpc, -3, 2, function() {
                below.ratsCleared = true;
                showSplash({
                    image: "hermit_dialog.png",
                    text: "Alistair storms through the doorway, rat spray hissing. 'THIEVING VERMIN! STEALING MY HERBS! THINK YOU CAN CHEAT ALISTAIR THE HERMIT?!' He sprays wildly - rats scatter, shrieking, fleeing through cracks and crevices. Within moments, the chamber is silent. He stands panting, canister still raised. 'And stay OUT!' he bellows at the empty room. Then, quieter: 'That was... satisfying.'",
                    shake: true
                });
                below.pendingRatClear = true;
            }, 3)) {
                addMapMessage("Alistair snatches the canister and storms off toward the storeroom, muttering about thieving rats.");
                maintainMapLog();
            }
        }
    },

    "hermit_bat_swatter_give_hand": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMapB = below.gameData.player.currentMap;
        var hermitNpcB = below.gameData.mapData[curMapB].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (hermitNpcB && hermitNpcB.dialogOptions) {
            var obstacles = below.gameData.mapData[curMapB].obstacles;
            for (var oi = 0; oi < obstacles.length; oi++) {
                if (obstacles[oi].position.x === -7 && obstacles[oi].position.y === 3) {
                    obstacles[oi].closed = false;
                    obstacles[oi].blocking = false;
                    break;
                }
            }
            if (npcWalkTo(hermitNpcB, 3, 3, function() {
                var introD = hermitNpcB.dialogOptions.find(function(d) { return d.id === "hermit_bat_intro"; });
                if (introD) introD.available = true;
                var greetD = hermitNpcB.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
                if (greetD) greetD.available = true;
                maintainMapLog();
            }, 3)) {
                addMapMessage("Alistair shuffles back toward the main chamber, rubbing his lower back.");
                maintainMapLog();
            }
        }
    },

    "hermit_antidote_give_a1": function() {
        below.gameData.player.inventory.push("antidote");
        setTimeout(function() { showInventory([12]); }, 50);
    },

    // --- Mole ---
    "molea1q": function() {
        var medusaNpc = below.gameData.mapData[1].npcs.find(function(n) { return n.type === "medusa"; });
        if (medusaNpc && medusaNpc.dialogOptions) {
            var medusaq0 = medusaNpc.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
            if (medusaq0 && medusaq0.options) {
                var moleOpt = medusaq0.options.find(function(o) { return o.id === "medusaa1m"; });
                if (moleOpt) moleOpt.available = true;
            }
        }
        var hermitNpc = below.gameData.mapData[0].npcs.find(function(n) { return n.type === "hermit"; });
        if (hermitNpc && hermitNpc.dialogOptions) {
            var hermitq0 = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
            if (hermitq0 && hermitq0.options) {
                var hermitMoleOpt = hermitq0.options.find(function(o) { return o.id === "hermit_ask_mole"; });
                if (hermitMoleOpt) hermitMoleOpt.available = true;
            }
        }
    },

    "mole_post_a3_give": function() {
        var herbIdx = -1;
        for (var hi = 0; hi < below.gameData.player.inventory.length; hi++) {
            if (below.gameData.player.inventory[hi] === 6) {
                herbIdx = hi;
                break;
            }
        }
        if (herbIdx !== -1) {
            below.gameData.player.inventory.splice(herbIdx, 1);
            addMapMessage("You hand over the bundle of cave herbs. The Mole accepts them reverently.");
            maintainMapLog();
            var map2Obstacles = below.gameData.mapData[2].obstacles;
            map2Obstacles.forEach(function(o) {
                if (o.type === "shimmering_wall") {
                    o.closed = false;
                    o.blocking = false;
                    o.icon = "shimmer_wall_open.png";
                }
            });
            addMapMessage("A distant shimmering echoes through the tunnels.");
            maintainMapLog();
        }
    },

    "mole_trap_leave": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
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
    },

    "molea4": function() {
        var stonePositions = [
            {x:6,y:10},{x:7,y:10},{x:6,y:11},{x:7,y:11},
            {x:39,y:10},{x:40,y:10},{x:39,y:11},{x:40,y:11},
            {x:6,y:32},{x:7,y:32},{x:6,y:33},{x:7,y:33}
        ];
        var map2Obstacles = below.gameData.mapData[2].obstacles;
        below.gameData.mapData[2].obstacles = map2Obstacles.filter(function(o) {
            return !(o.type === "rock" && stonePositions.some(function(p) {
                return o.position.x === p.x && o.position.y === p.y;
            }));
        });
        addMapMessage("Them mole smashes at the rocks and they roll away into the darkness.");
        maintainMapLog();
    },

    "mole_sick_help": function() {
        var hermitNpc = below.gameData.mapData[0].npcs ? below.gameData.mapData[0].npcs.find(function(n) { return n.type === "hermit"; }) : null;
        if (hermitNpc && hermitNpc.dialogOptions) {
            var hermitq0 = hermitNpc.dialogOptions.find(function(d) { return d.id === "hermitq0"; });
            if (hermitq0 && hermitq0.options) {
                var antidoteOpt = hermitq0.options.find(function(o) { return o.id === "hermit_ask_antidote"; });
                if (antidoteOpt) antidoteOpt.available = true;
            }
        }
    },

    // --- Mole beach rocks quest ---
    "mole_beach_accept_go": function() {
        var map2 = below.gameData.mapData[2];
        var moleIdx = -1;
        for (var mi = 0; mi < map2.npcs.length; mi++) {
            if (map2.npcs[mi].type === "mole") {
                moleIdx = mi;
                break;
            }
        }
        if (moleIdx === -1) return;
        var mole = map2.npcs[moleIdx];
        below.gameData.moleQuestData = {
            position: { x: mole.position.x, y: mole.position.y },
            dialogOptions: JSON.parse(JSON.stringify(mole.dialogOptions))
        };
        map2.npcs.splice(moleIdx, 1);
        var beachMole = JSON.parse(JSON.stringify(mole));
        beachMole.position = { x: -6, y: 1 };
        beachMole.dialogOptions = [
            {
                id: "mole_beach_greeting",
                available: true,
                text: "The Mole emerges from a crack in the cave wall, covered in dust.\n'I made it. Charon did not see me.\nNow, where are these rocks thou speakest of?\nPoint me at them, and I shall clear them posthaste!'",
                options: [
                    {
                        id: "mole_beach_clear",
                        text: "Right here, along this wall.",
                        available: true,
                        chains: ["mole_beach_done"]
                    }
                ]
            },
            {
                id: "mole_beach_done",
                available: false,
                text: "The Mole sets to work with surprising speed. His claws tear through the rock as if it were wet clay. In moments, the path is clear.\nHe wipes his brow and gives you a mock salute.\n'There! Thy passage is cleared. Now, I must return\nTo my tunnels before Charon wakes from his stupor.'\nHe tips an imaginary hat and scurries back into the crack.",
                options: [
                    {
                        id: "mole_beach_done_leave",
                        text: "Thank you, friend.",
                        available: true
                    }
                ]
            }
        ];
        below.gameData.mapData[4].npcs.push(beachMole);
        addMapMessage("The Mole disappears into the darkness, heading for the beach.");
        maintainMapLog();
    },

    "mole_beach_clear": function() {
        var map4Obstacles = below.gameData.mapData[4].obstacles;
        var rockPositions = [
            {x:-7,y:1},{x:-8,y:1},{x:-9,y:1},{x:-10,y:1}
        ];
        below.gameData.mapData[4].obstacles = map4Obstacles.filter(function(o) {
            return !rockPositions.some(function(p) {
                return o.position.x === p.x && o.position.y === p.y;
            });
        });
        addMapMessage("The Mole's claws tear through the rock as if it were wet clay. The path is clear!");
        maintainMapLog();
    },

    "mole_beach_done_leave": function() {
        var map4 = below.gameData.mapData[4];
        var beachMoleIdx = -1;
        for (var mi = 0; mi < map4.npcs.length; mi++) {
            if (map4.npcs[mi].type === "mole") {
                beachMoleIdx = mi;
                break;
            }
        }
        if (beachMoleIdx === -1) return;
        map4.npcs.splice(beachMoleIdx, 1);
        if (below.gameData.moleQuestData) {
            var restoredMole = {
                type: "mole",
                position: { x: below.gameData.moleQuestData.position.x, y: below.gameData.moleQuestData.position.y },
                destPos: {},
                dialogOptions: JSON.parse(JSON.stringify(below.gameData.moleQuestData.dialogOptions))
            };
            var curedD = restoredMole.dialogOptions.find(function(d) { return d.id === "mole_cured"; });
            if (curedD) {
                curedD.available = false;
                var helpOpt = curedD.options.find(function(o) { return o.id === "mole_cureda2"; });
                if (helpOpt) helpOpt.available = false;
            }
            var defaultD = restoredMole.dialogOptions.find(function(d) { return d.id === "moleq1"; });
            if (defaultD) defaultD.available = true;
            below.gameData.mapData[2].npcs.push(restoredMole);
            delete below.gameData.moleQuestData;
        }
        addMapMessage("The Mole scurries back into the shadows, returning to his tunnels.");
        maintainMapLog();
    },

    // --- Medusa ---
    "medusama4p": function() {
        below.gameData.player.inventory.push("stone_key");
        setTimeout(function() { showInventory([7]); }, 50);
    },

    "mole_post5_a": function() {
        var medusaNpc = below.gameData.mapData[1].npcs.find(function(n) { return n.type === "medusa"; });
        if (medusaNpc && medusaNpc.dialogOptions) {
            var medusaq0 = medusaNpc.dialogOptions.find(function(d) { return d.id === "medusaq0"; });
            if (medusaq0 && medusaq0.options) {
                var moleOpt = medusaq0.options.find(function(o) { return o.id === "medusaa1m"; });
                if (moleOpt) moleOpt.available = true;
            }
        }
    },

    // --- Sam Shale ---
    "detective_ready_go": samReadyWalk,
    "detective_help_intro_ready": samReadyWalk,

    "detective_arrival_in": samArrivalWalk,
    "detective_arrival_doubt_in": samArrivalWalk,

    "detective_precinct_go": samPrecinctWalk,
    "detective_precinct_go2": samPrecinctWalk,

    "detective_abe_go": samAbeWalk,
    "detective_abe_go2": samAbeWalk,

    "detective_rooftop_go": function() {
        walkSamTo(7, -9,
            ["detective_rooftop", "detective_rooftop_mouse", "detective_rooftop_after"],
            "detective_diner",
            "Sam climbs down from the ledge without a word.",
            "The neon sign of The Last Stop buzzes ahead. Sam picks up the pace."
        );
    },

    "detective_diner_go": function() {
        walkSamTo(12, -9,
            ["detective_diner", "detective_diner_flo", "detective_diner_after"],
            "detective_jazz",
            "Sam pockets the photograph and heads back out into the street.",
            "Sam stops outside a doorway draped in red curtains. Muffled piano drifts through."
        );
    },

    "detective_jazz_go": function() {
        walkSamTo(18, 9,
            ["detective_jazz", "detective_jazz_piano", "detective_jazz_after"],
            "detective_dockmaster",
            "Sam steps away from the jazz club, his jaw tight.",
            "The Dock Master's office emerges from the mist - a cratewood shack over black water."
        );
    },

    "detective_dockmaster_go": function() {
        walkSamTo(12, 12,
            ["detective_dockmaster", "detective_dockmaster_char", "detective_dockmaster_letter", "detective_dockmaster_after", "detective_dockmaster_catch"],
            "detective_pier",
            "Sam folds the letter and steps out onto the pier.",
            "Sam walks to the end of Pier C3. Black water laps against the pilings."
        );
    },

    "detective_dockmaster_leave": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc) {
            var closeDialogs = ["detective_dockmaster", "detective_dockmaster_char", "detective_dockmaster_letter", "detective_dockmaster_after"];
            closeDialogs.forEach(function(id) {
                var d = samNpc.dialogOptions.find(function(d) { return d.id === id; });
                if (d) d.available = false;
            });
            var pierD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_pier"; });
            if (pierD) pierD.available = true;
        }
    },

    "detective_pier_a1": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMap = below.gameData.player.currentMap;
        var samNpc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (samNpc) {
            samNpc.position = { x: 0, y: -2 };
            samNpc.destPos = {};
            var officeD = samNpc.dialogOptions.find(function(d) { return d.id === "detective_office"; });
            if (officeD) officeD.available = true;
            below.gameData.player.samQuestComplete = true;
            for (var si = below.gameData.mapData[1].npcs.length - 1; si >= 0; si--) {
                if (below.gameData.mapData[1].npcs[si].type === "jester") {
                    below.gameData.mapData[1].npcs.splice(si, 1);
                    break;
                }
            }
            below.gameData.mapData[3].npcs.push({
                type: 2,
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
        }
    },

    "detective_walk_a1": function() {
        addMapMessage("Sam Shale glances at you sidelong. 'Once. Came out with a bullet hole in my coat and a story I can't tell in polite company. Not that there's any polite company down here.'");
        maintainMapLog();
    },

    "detective_walk_a2": function() {
        addMapMessage("Sam Shale nods slowly. 'Yeah. That's the right response to this place.'");
        maintainMapLog();
    },

    // --- Ship ---
    "ship_beach_leave": function() {
        setTimeout(function() {
            changeMap(3, -1, 13, "You sail back across the dark lake. The familiar shape of Pier A1 emerges from the gloom as the ship docks once more.");
        }, 10);
    },

    "ship_departure_go": function() {
        var moleNpc = below.gameData.mapData[2].npcs ? below.gameData.mapData[2].npcs.find(function(n) { return n.type === "mole"; }) : null;
        if (moleNpc && moleNpc.dialogOptions) {
            var sickD = moleNpc.dialogOptions.find(function(d) { return d.id === "mole_sick"; });
            if (sickD) sickD.available = true;
        }
        setTimeout(function() {
            changeMap(4, 2, 0, "The ship reaches the shore of a vast underground beach. As you step onto the sand, the dark lake stretches behind you, still and silent.");
        }, 10);
    },

    // --- Sisters ---
    "sisters_hideandseek_count": function() {
        startHideAndSeek();
        return false;
    },

    "sisters_tag_count": function() {
        startTagGame();
        return false;
    },

    "sisters_hideandseek_complete_close": function() {
        below.gameData.mapData[5].npcs.forEach(function(n) {
            var introD = n.dialogOptions.find(function(d) { return d.id === "sisters_intro"; });
            if (introD) introD.available = true;
            var tagIntroD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_intro"; });
            if (tagIntroD) tagIntroD.available = true;
        });
    },

    "sisters_hideandseek_found_close": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMap = below.gameData.player.currentMap;
        var npc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (npc) {
            npc._found = true;
            var foundD = npc.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_found"; });
            if (foundD) foundD.available = false;
            var allFound = below.gameData.mapData[5].npcs.every(function(n) { return n._found; });
            if (allFound) {
                below.gameData.mapData[5].npcs.forEach(function(n) {
                    var completeD = n.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_complete"; });
                    if (completeD) completeD.available = true;
                    var introD = n.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_intro"; });
                    if (introD) introD.available = false;
                    var startD = n.dialogOptions.find(function(d) { return d.id === "sisters_hideandseek_start"; });
                    if (startD) startD.available = false;
                });
                below.sistersReturnContext = "hideandseek";
                startSistersReturn();
            }
        }
    },

    "sisters_tag_found_close": function() {
        if (!below.choiceEvent || !below.choiceEvent.npcPos) return;
        var curMap = below.gameData.player.currentMap;
        var npc = below.gameData.mapData[curMap].npcs.find(function(n) {
            return n.position && n.position.x === below.choiceEvent.npcPos.x && n.position.y === below.choiceEvent.npcPos.y;
        });
        if (npc) {
            npc._tagFound = true;
            var foundD = npc.dialogOptions.find(function(d) { return d.id === "sisters_tag_found"; });
            if (foundD) foundD.available = false;
            var allTagged = below.gameData.mapData[5].npcs.every(function(n) { return n._tagFound; });
            if (allTagged) {
                below.tagActive = false;
                below.gameData.mapData[5].npcs.forEach(function(n) {
                    var completeD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_complete"; });
                    if (completeD) completeD.available = true;
                    var introD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_intro"; });
                    if (introD) introD.available = false;
                    var startD = n.dialogOptions.find(function(d) { return d.id === "sisters_tag_start"; });
                    if (startD) startD.available = false;
                    n._tagFleeing = false;
                });
                below.sistersReturnContext = "tag";
                startSistersReturn();
                addMapMessage("You tagged them both! The sisters shuffle back, looking winded.");
                maintainMapLog();
            } else {
                addMapMessage("One down! Keep chasing the other one!");
                maintainMapLog();
            }
        }
    },

    "sisters_tag_complete_close": function() {
        below.gameData.mapData[5].npcs.forEach(function(n) {
            var congratsD = n.dialogOptions.find(function(d) { return d.id === "sisters_congratulations"; });
            if (congratsD) congratsD.available = true;
        });
    },

    // --- Medusa river leap handlers (map 8) ---
    "medusa_river_send_0": function() {
        var map8Npcs = below.gameData.mapData[8].npcs;
        var medusa = map8Npcs.find(function(n) { return n.type === "medusa"; });
        if (medusa) {
            medusa.position = { x: 10, y: 19 };
            showSplash({
                image: "medusa_dialog.png",
                text: "Medusa crouches, her serpent hair writhing. Then she launches herself in a magnificent arc over the river of fire. She lands gracefully on the far side with a shockwave that rattles the stone beneath your feet.\n\nShe turns and grins. 'Still with me?'",
                shake: true
            });
        }
    },

    "medusa_river_send_1": function() {
        var map8Npcs = below.gameData.mapData[8].npcs;
        var medusa = map8Npcs.find(function(n) { return n.type === "medusa"; });
        if (medusa) {
            medusa.position = { x: 10, y: 12 };
            showSplash({
                image: "medusa_dialog.png",
                text: "Another mighty leap. Medusa soars over the flames and lands with practiced ease, a spray of embers erupting where she touches down.\n\nShe straightens her dress and looks back at the burning river behind her.",
                shake: true
            });
        }
    },

    "medusa_river_send_2": function() {
        var map8Npcs = below.gameData.mapData[8].npcs;
        var medusa = map8Npcs.find(function(n) { return n.type === "medusa"; });
        if (medusa) {
            medusa.position = { x: 10, y: 6 };
            showSplash({
                image: "medusa_dialog.png",
                text: "Medusa leaps again, her form silhouetted against the glow of the lava below. She touches down softly, snake-hair writhing with excitement.\n\n'Used to be I'd turn anyone who stared into stone. Now I just enjoy the view.'",
                shake: true
            });
        }
    },

    "medusa_river_send_3": function() {
        var map8Npcs = below.gameData.mapData[8].npcs;
        var medusa = map8Npcs.find(function(n) { return n.type === "medusa"; });
        if (medusa) {
            medusa.position = { x: 10, y: 1 };
            showSplash({
                image: "medusa_dialog.png",
                text: "One final, breathtaking leap. Medusa clears the last river and lands on the northern shore, a gust of hot air sweeping past her.\n\nShe turns to face you, the glow of the river reflecting in her eyes. 'That never gets old.'",
                shake: true
            });
        }
    },

    "sisters_exit_reveal_close": function() {
        var map5 = below.gameData.mapData[5];        

        var sisters = map5.npcs;
        var exitTargets = [{ x: 9, y: 11 }, { x: 11, y: 11 }];
        sisters.forEach(function(n, i) {
            n.dialogOptions.forEach(function(d) { d.available = false; });
            var exhD = n.dialogOptions.find(function(d) { return d.id === "sisters_exhausted"; });
            if (exhD) exhD.available = true;
            var target = exitTargets[i % exitTargets.length];
            npcWalkTo(n, target.x, target.y, function() {
                n.dialogOptions.forEach(function(d) { d.available = false; });
                var congratsD = n.dialogOptions.find(function(d) { return d.id === "sisters_congratulations"; });
                if (congratsD) congratsD.available = true;
                var allArrived = sisters.every(function(s) {
                    return !s.walkPath || s.walkPath.length === 0;
                });
                if (allArrived) {
                    addMapMessage("The sisters gesture lazily toward the crack. 'There. Now please leave. We need a nap.'");
                    maintainMapLog();
                    setTimeout(function() {
                        below.sistersReturnContext = "tag";
                        startSistersReturn();
                    }, 2000);
                    map5.obstacles = map5.obstacles.filter(function(o) {
                        return !(o.position.x === 10 && o.position.y === 11);
                    });
                    addMapMessage("A deep rumble echoes through the fissure. The mushrooms near the crack shudder and collapse.");
                    maintainMapLog();
                }
            }, 20);
        });
        
    }
};
