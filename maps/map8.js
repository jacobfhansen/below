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
      "position": { "x": 10, "y": 27 },
      "movement": 0,
      "dialogOptions": [
        {
          "id": "medusa_river_0",
          "available": true,
          "text": "[PLACEHOLDER] Medusa's dialog at the southern shore.",
          "options": [
            {
              "id": "medusa_river_send_0",
              "text": "Show me.",
              "available": true,
              "chains": ["medusa_river_1"]
            }
          ]
        },
        {
          "id": "medusa_river_1",
          "available": false,
          "text": "[PLACEHOLDER] Medusa's dialog after first crossing.",
          "options": [
            {
              "id": "medusa_river_send_1",
              "text": "Keep going.",
              "available": true,
              "chains": ["medusa_river_2"]
            }
          ]
        },
        {
          "id": "medusa_river_2",
          "available": false,
          "text": "[PLACEHOLDER] Medusa's dialog after second crossing.",
          "options": [
            {
              "id": "medusa_river_send_2",
              "text": "Continue.",
              "available": true,
              "chains": ["medusa_river_3"]
            }
          ]
        },
        {
          "id": "medusa_river_3",
          "available": false,
          "text": "[PLACEHOLDER] Medusa's dialog after third crossing.",
          "options": [
            {
              "id": "medusa_river_send_3",
              "text": "Northward.",
              "available": true,
              "chains": ["medusa_river_4"]
            }
          ]
        },
        {
          "id": "medusa_river_4",
          "available": false,
          "text": "[PLACEHOLDER] Medusa's dialog at the northern shore.",
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
      "position": { "x": 10, "y": 0 },
      "text": "You scramble to safety on the far shore. A cold draft blows from a narrow crack ahead. The heat fades behind you."
    }
  ]
};
