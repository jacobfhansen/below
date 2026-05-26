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
    // Safe zones: y=0 (top), y=7,8,9 (bottom) — stone type 4
    for (var x = 0; x < 20; x++) {
      addTile(x, 0, 4);
      addTile(x, 7, 4);
      addTile(x, 8, 4);
      addTile(x, 9, 4);
    }
    // Lava lanes: y=1 through y=6 — lava type 18
    for (var x = 0; x < 20; x++) {
      for (var y = 1; y <= 6; y++) {
        addTile(x, y, 18);
      }
    }
    return tiles;
  })(),
  "obstacles": [],
  "npcs": [],
  "monsters": [],
  "movingPlatforms": [
    {
      "position": { "x": -4, "y": 1 },
      "path": [{ "x": -4, "y": 1 }, { "x": 24, "y": 1 }],
      "speed": 0.05,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 3,
      "height": 1,
      "_progress": 0
    },
    {
      "position": { "x": -4, "y": 1 },
      "path": [{ "x": -4, "y": 1 }, { "x": 24, "y": 1 }],
      "speed": 0.05,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 3,
      "height": 1,
      "_progress": 0.4
    },
    {
      "position": { "x": -3, "y": 2 },
      "path": [{ "x": -3, "y": 2 }, { "x": 23, "y": 2 }],
      "speed": 0.08,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0
    },
    {
      "position": { "x": -3, "y": 2 },
      "path": [{ "x": -3, "y": 2 }, { "x": 23, "y": 2 }],
      "speed": 0.08,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0.3
    },
    {
      "position": { "x": -3, "y": 2 },
      "path": [{ "x": -3, "y": 2 }, { "x": 23, "y": 2 }],
      "speed": 0.08,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0.65
    },
    {
      "position": { "x": -4, "y": 3 },
      "path": [{ "x": -4, "y": 3 }, { "x": 24, "y": 3 }],
      "speed": 0.04,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 3,
      "height": 1,
      "_progress": 0
    },
    {
      "position": { "x": -4, "y": 3 },
      "path": [{ "x": -4, "y": 3 }, { "x": 24, "y": 3 }],
      "speed": 0.04,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 3,
      "height": 1,
      "_progress": 0.55
    },
    {
      "position": { "x": -3, "y": 4 },
      "path": [{ "x": -3, "y": 4 }, { "x": 23, "y": 4 }],
      "speed": 0.06,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0
    },
    {
      "position": { "x": -3, "y": 4 },
      "path": [{ "x": -3, "y": 4 }, { "x": 23, "y": 4 }],
      "speed": 0.06,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0.35
    },
    {
      "position": { "x": -3, "y": 4 },
      "path": [{ "x": -3, "y": 4 }, { "x": 23, "y": 4 }],
      "speed": 0.06,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0.7
    },
    {
      "position": { "x": -3, "y": 5 },
      "path": [{ "x": -3, "y": 5 }, { "x": 23, "y": 5 }],
      "speed": 0.05,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0.1
    },
    {
      "position": { "x": -3, "y": 5 },
      "path": [{ "x": -3, "y": 5 }, { "x": 23, "y": 5 }],
      "speed": 0.05,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0.5
    },
    {
      "position": { "x": -3, "y": 6 },
      "path": [{ "x": -3, "y": 6 }, { "x": 23, "y": 6 }],
      "speed": 0.07,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0.2
    },
    {
      "position": { "x": -3, "y": 6 },
      "path": [{ "x": -3, "y": 6 }, { "x": 23, "y": 6 }],
      "speed": 0.07,
      "loop": true,
      "icon": "stone_raft.png",
      "width": 2,
      "height": 1,
      "_progress": 0.6
    }
  ],
  "exits": [
    {
      "position": { "x": 10, "y": 0 },
      "text": "You scramble to safety on the far shore. The heat fades behind you."
    }
  ]
};
