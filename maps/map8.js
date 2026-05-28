var map8Data = {
  "id": 8,
  "name": "The Devil's Lair",
  "defaultDescription": "A dark chamber. The air is thick and still.",
  "noVisionLimit": true,
  "areaDescriptions": [],
  "tiles": (function() {
    var tiles = {};
    function addTile(x, y, type) {
      var key = 'x' + (x < 0 ? 'm' : '') + Math.abs(x) + 'y' + (y < 0 ? 'm' : '') + Math.abs(y);
      tiles[key] = { x: x, y: y, type: type };
    }
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        addTile(x, y, 4);
      }
    }
    return tiles;
  })(),
  "obstacles": [],
  "npcs": [
    {
      "type": "devil",
      "position": { "x": 5, "y": 4 },
      "movement": 0,
      "dialogOptions": [
        {
          "id": "devil_greeting",
          "available": true,
          "text": "The Devil stands in the center of the chamber, arms folded behind his back. He turns slowly as you enter, a thin smile spreading across his face.\n\n'I have been waiting for you.'\n\nHis voice is smooth, unhurried. The echo lingers in the darkness.\n\n'I know why you're here. I know what you're looking for. And I know what Medusa told you - or rather, what she didn't tell you.'\n\nHe takes a step closer. The temperature drops.\n\n'Shall we talk?'",
          "options": [
            {
              "id": "devil_greeting_a1",
              "text": "...",
              "available": true
            }
          ]
        }
      ]
    }
  ],
  "monsters": [],
  "movingPlatforms": [],
  "exits": [
    {
      "position": { "x": 5, "y": 9 },
      "targetMap": 7,
      "targetPosition": { "x": 10, "y": 28 },
      "text": "You climb back up the stairs. The heat of the rivers returns."
    }
  ]
};
