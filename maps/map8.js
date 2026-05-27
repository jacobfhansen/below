var map8Data = {
  "id": 8,
  "name": "The River of Fire",
  "defaultDescription": "A river of lava stretches before you. Stone rafts drift across the burning surface.",
  "noVisionLimit": true,
  "areaDescriptions": [],
  "tiles": (function() {
    var tiles = {};
    function addTile(x, y, type) {
      var key = 'x' + (x < 0 ? 'm' : '') + Math.abs(x) + 'y' + (y < 0 ? 'm' : '') + Math.abs(y);
      tiles[key] = { x: x, y: y, type: type };
    }
    // Safe zones: 5 zones, 3 tiles each (stone type 4)
    // Zone 0 (north, dead-end exit): y=0-2
    // Zone 1: y=5-7
    // Zone 2: y=11-13
    // Zone 3: y=18-20
    // Zone 4 (south, player/Medusa start): y=26-28
    var safeZones = [[0,2],[5,7],[11,13],[18,20],[26,28]];
    for (var zi = 0; zi < safeZones.length; zi++) {
      for (var x = 0; x < 20; x++) {
        for (var y = safeZones[zi][0]; y <= safeZones[zi][1]; y++) {
          addTile(x, y, 4);
        }
      }
    }
    // Lava rivers: 4 rivers of varying heights
    // River 1: y=3-4 (2 lanes)
    // River 2: y=8-10 (3 lanes)
    // River 3: y=14-17 (4 lanes)
    // River 4: y=21-25 (5 lanes)
    var rivers = [[3,4],[8,10],[14,17],[21,25]];
    for (var ri = 0; ri < rivers.length; ri++) {
      for (var x = 0; x < 20; x++) {
        for (var y = rivers[ri][0]; y <= rivers[ri][1]; y++) {
          addTile(x, y, 18);
        }
      }
    }
    return tiles;
  })(),
  "obstacles": [],
  "npcs": [
    {
      "type": "medusa",
      "position": { "x": 10, "y": 1 },
      "movement": 0,
      "dialogOptions": [
        {
          "id": "medusa_river_0",
          "available": true,
          "text": "Medusa stands at the edge of the first river, arms crossed. She looks you over — then her expression hardens.\n\n'A child. They sent a child to me.' She sighs, pinching the bridge of her nose. 'Everyone down here whispers my name like it's a key to a locked door. \"Medusa knows the way out. Ask Medusa.\"'\n\nShe crouches down to your eye level. Her voice is low, firm.\n\n'I do know the way out. That's the problem. The way out is not the kind of thing you want to hear, and I'm not going to tell you yet. Not because I'm cruel — because once you know, you won't be able to un-know it.'\n\nShe straightens, staring down at the rivers of fire below.\n\n'There's something past these rivers. It's been waiting a long time and it knows you're coming. It wants to... meet you. And I can't stop it. I can only delay you.'\n\nA pause. The fire crackles.\n\n'So here's what I'm offering: watch me cross these rivers. Take your time. Think about whether you really want to go deeper. And maybe — maybe — you'll change your mind before it's too late.'",
          "options": [
            {
              "id": "medusa_river_send_0",
              "text": "Show me.",
              "available": true,
              "opens": ["medusa_river_1"],
              "closes": ["medusa_river_0"]
            }
          ]
        },
        {
          "id": "medusa_river_1",
          "available": false,
          "text": "She lands hard, spins around, and jabs a finger at you.\n\n'You followed me. After everything I just told you, you FOLLOWED me.'\n\nHer voice is sharp, cutting. The snakes on her head hiss in agitation.\n\n'I gave you an out. A chance to sit down, think it through, maybe come to your senses. And you threw it away in five minutes.'\n\nShe turns away, fists clenched.\n\n'I'm not a taxi service across the underworld. I'm trying to PROTECT you, you stubborn little—'\n\nShe stops herself. Takes a breath. When she speaks again, it's quieter, but no less stern.\n\n'Go back. Please. While you still can.'",
          "options": [
            {
              "id": "medusa_river_send_1",
              "text": "Keep going.",
              "available": true,              
              "opens": ["medusa_river_2"],
              "closes": ["medusa_river_1"]
            }
          ]
        },
        {
          "id": "medusa_river_2",
          "available": false,
          "text": "She doesn't turn around this time. She just stands at the edge of the next river, staring into the glow.\n\n'I was angry. I'm still angry. But I'm also...' She struggles with the word. 'Worried. That's the truth of it.'\n\nShe finally looks at you. The stern mask is cracking.\n\n'You don't understand what's down there. You can't. And I can't explain it without—' She stops. Shakes her head.\n\n'Look. I've seen things in this cave system that would break grown adults. And you're just a kid with a lantern and too much courage for your own good.'\n\nHer voice wavers. 'Please. I'm begging you. Turn around before I have to watch you—'\n\nShe can't finish the sentence.",
          "options": [
            {
              "id": "medusa_river_send_2",
              "text": "Continue.",
              "available": true,
              
              "opens": ["medusa_river_3"],
              "closes": ["medusa_river_2"]
            }
          ]
        },
        {
          "id": "medusa_river_3",
          "available": false,
          "text": "She's waiting for you on the other side, sitting on a rock with her head in her hands. The snakes hang limp and still.\n\n'I haven't begged anyone for anything in a very long time. Used to be I'd just turn them to stone if they annoyed me. Simpler times.'\n\nA hollow laugh.\n\n'I'm begging you now. On my knees if I have to. Whatever's waiting for you past these rivers — it's patient, it's ancient, and it's hungry in ways you can't imagine.'\n\nShe looks up at you, eyes glistening.\n\n'I can't follow you past here. I won't. Because I don't want to see what happens next.'\n\nShe wipes her face roughly with the back of her hand.\n\n'So this is it. This is where I make my stand. Please. Stay. Or go back. Just don't go forward.'",
          "options": [
            {
              "id": "medusa_river_send_3",
              "text": "Southward.",
              "available": true,
              
              "opens": ["medusa_river_4"],
              "closes": ["medusa_river_3"]
            }
          ]
        },
        {
          "id": "medusa_river_4",
          "available": false,
          "text": "She's standing at the southern edge, arms wrapped around herself, watching the tunnel that descends into darkness beyond.\n\n'I tried. I really tried.'\n\nHer voice is flat. Exhausted.\n\n'You're determined. Stubborn. Honest. You'd have made a terrible gorgon.' A sad smile. 'You'd have let everyone go.'\n\nShe turns to face you fully.\n\n'I'm not going to stop you anymore. I can't. You've made your choice, and I've said my piece, and neither of us is going to change the other's mind.'\n\nShe reaches out and straightens your collar — a strangely maternal gesture.\n\n'But listen. When you get to the other side of whatever's waiting — if you get there — remember that somebody down here tried to warn you because they cared. Not because they wanted something. Not because they were paid. Because they cared.'\n\nShe steps back.\n\n'I'll be here. If you come back this way. I'll be here.'",
          "options": [
            {
              "id": "medusa_river_done",
              "text": "Thank you.",
              "available": true
            }
          ]
        }
      ]
    }
  ],
  "monsters": [],
  "movingPlatforms": [
    // --- River 1 (y=3-4, 2 lanes) ---
    // Lane y=3
    { "position": { "x": -4, "y": 3 }, "path": [{ "x": -4, "y": 3 }, { "x": 24, "y": 3 }], "speed": 0.05, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 3 }, "path": [{ "x": -4, "y": 3 }, { "x": 24, "y": 3 }], "speed": 0.05, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0.5 },
    // Lane y=4
    { "position": { "x": -4, "y": 4 }, "path": [{ "x": -4, "y": 4 }, { "x": 24, "y": 4 }], "speed": 0.07, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 4 }, "path": [{ "x": -4, "y": 4 }, { "x": 24, "y": 4 }], "speed": 0.07, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 },

    // --- River 2 (y=8-10, 3 lanes) ---
    // Lane y=8
    { "position": { "x": -4, "y": 8 }, "path": [{ "x": -4, "y": 8 }, { "x": 24, "y": 8 }], "speed": 0.04, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 8 }, "path": [{ "x": -4, "y": 8 }, { "x": 24, "y": 8 }], "speed": 0.04, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0.5 },
    // Lane y=9
    { "position": { "x": -4, "y": 9 }, "path": [{ "x": -4, "y": 9 }, { "x": 24, "y": 9 }], "speed": 0.06, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 9 }, "path": [{ "x": -4, "y": 9 }, { "x": 24, "y": 9 }], "speed": 0.06, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 },
    // Lane y=10
    { "position": { "x": -4, "y": 10 }, "path": [{ "x": -4, "y": 10 }, { "x": 24, "y": 10 }], "speed": 0.08, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 10 }, "path": [{ "x": -4, "y": 10 }, { "x": 24, "y": 10 }], "speed": 0.08, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 },

    // --- River 3 (y=14-17, 4 lanes) ---
    // Lane y=14
    { "position": { "x": -4, "y": 14 }, "path": [{ "x": -4, "y": 14 }, { "x": 24, "y": 14 }], "speed": 0.045, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 14 }, "path": [{ "x": -4, "y": 14 }, { "x": 24, "y": 14 }], "speed": 0.045, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0.5 },
    // Lane y=15
    { "position": { "x": -4, "y": 15 }, "path": [{ "x": -4, "y": 15 }, { "x": 24, "y": 15 }], "speed": 0.065, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 15 }, "path": [{ "x": -4, "y": 15 }, { "x": 24, "y": 15 }], "speed": 0.065, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 },
    // Lane y=16
    { "position": { "x": -4, "y": 16 }, "path": [{ "x": -4, "y": 16 }, { "x": 24, "y": 16 }], "speed": 0.055, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 16 }, "path": [{ "x": -4, "y": 16 }, { "x": 24, "y": 16 }], "speed": 0.055, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 },
    // Lane y=17
    { "position": { "x": -4, "y": 17 }, "path": [{ "x": -4, "y": 17 }, { "x": 24, "y": 17 }], "speed": 0.075, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 17 }, "path": [{ "x": -4, "y": 17 }, { "x": 24, "y": 17 }], "speed": 0.075, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 },

    // --- River 4 (y=21-25, 5 lanes) ---
    // Lane y=21
    { "position": { "x": -4, "y": 21 }, "path": [{ "x": -4, "y": 21 }, { "x": 24, "y": 21 }], "speed": 0.05, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 21 }, "path": [{ "x": -4, "y": 21 }, { "x": 24, "y": 21 }], "speed": 0.05, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0.5 },
    // Lane y=22
    { "position": { "x": -4, "y": 22 }, "path": [{ "x": -4, "y": 22 }, { "x": 24, "y": 22 }], "speed": 0.08, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 22 }, "path": [{ "x": -4, "y": 22 }, { "x": 24, "y": 22 }], "speed": 0.08, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 },
    // Lane y=23
    { "position": { "x": -4, "y": 23 }, "path": [{ "x": -4, "y": 23 }, { "x": 24, "y": 23 }], "speed": 0.04, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 23 }, "path": [{ "x": -4, "y": 23 }, { "x": 24, "y": 23 }], "speed": 0.04, "loop": true, "icon": "stone_raft.png", "width": 3, "height": 1, "_progress": 0.5 },
    // Lane y=24
    { "position": { "x": -4, "y": 24 }, "path": [{ "x": -4, "y": 24 }, { "x": 24, "y": 24 }], "speed": 0.07, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 24 }, "path": [{ "x": -4, "y": 24 }, { "x": 24, "y": 24 }], "speed": 0.07, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 },
    // Lane y=25
    { "position": { "x": -4, "y": 25 }, "path": [{ "x": -4, "y": 25 }, { "x": 24, "y": 25 }], "speed": 0.06, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0 },
    { "position": { "x": -4, "y": 25 }, "path": [{ "x": -4, "y": 25 }, { "x": 24, "y": 25 }], "speed": 0.06, "loop": true, "icon": "stone_raft.png", "width": 2, "height": 1, "_progress": 0.5 }
  ],
  "exits": [
    {
      "position": { "x": 10, "y": 28 },
      "text": "You scramble down into the depths below. The heat of the rivers fades above as the tunnel descends into darkness."
    }
  ]
};
