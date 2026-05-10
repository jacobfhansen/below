var belowGameData = {
  "mapZoom": 50,
  "mapLog": [],
  "showCoordinates": true,
  "dialogInterval": 1000,
  "dialogDots": "...",
  "player": {
    "currentMap": 0,
    "currentLocation": {
      "x": 2,
      "y": 2
    },
    "destinationLocation": {},
    "icon": null,
    "vision": 3,
    "inventory": []
  },
  "monsterTypes": {
    "1": {
      "name": "Giant rat",
      "fraction": 2,
      "movement": 0.3,
      "color": "#9A6759",
      "icon": "rat.png",
      "blocking": true,
      "aloof": true,
      "description": "A giant rat blocks your way",
      "aloofTrueMsg": "A giant rat. It ignores you.",
      "aloofFalseMsg": "An angry giant rat attacks you!",
      "beholdDesc": "A large rat with sharp teeth",
      "choiceEvents": [
        4,
        5,
        3
      ]
    },
    "2": {
      "name": "Bat",
      "fraction": 1,
      "movement": 0.6,
      "color": "#433900",
      "icon": "bat.png",
      "blocking": true,
      "aloof": true,
      "description": "A bat is in your way",
      "aloofTrueMsg": "A bat screeches and ignores you.",
      "aloofFalseMsg": "A furious bat dives at you!",
      "beholdDesc": "A screeching bat with sharp claws",
      "choiceEvents": [
        4,
        5,
        3
      ]
    },
    "3": {
      "name": "Centipede",
      "fraction": 1,
      "movement": 0.1,
      "icon": "centipede.png",
      "blocking": true,
      "aloof": true,
      "description": "A centipede blocks the path",
      "aloofTrueMsg": "A centipede crawls right past you.",
      "aloofFalseMsg": "A centipede strikes at your ankles!",
      "beholdDesc": "A multi-segmented centipede",
      "choiceEvents": [
        4,
        5,
        3
      ]
    }
  },
  "obstacleTypes": {
    "1": {
      "name": "Rock",
      "description": "A rock blocking your way",
      "color": "#433900",
      "icon": "rock.png",
      "blocking": false,
      "choiceEvents": [
        1,
        3
      ]
    },
    "2": {
      "name": "Blood",
      "description": "Blood",
      "color": "#433900",
      "icon": "blood.png",
      "blocking": false,
      "choiceEvents": []
    },
    "3": {
      "name": "Table",
      "description": "A sturdy wooden table",
      "color": "#433900",
      "icon": "table.png",
      "blocking": true,
      "itemType": 4,
      "choiceEvents": [
        6,
        3
      ]
    },
    "4": {
      "name": "Door",
      "description": "A locked door",
      "color": "#8B4513",
      "icon": "door_closed.png",
      "blocking": true,
      "closed": true,
      "keyId": 4,
      "choiceEvents": [
        7,
        3
      ],
      "openChoiceEvents": [
        8,
        3
      ],
      "closedChoiceEvents": [
        7,
        3
      ]
    },
    "5": {
      "name": "Cupboard",
      "description": "A large wooden cupboard",
      "color": "#433900",
      "icon": "cupboard.png",
      "blocking": true,
      "itemType": 5,
      "drawOrder": 1,
      "opacity": 1,
      "choiceEvents": [
        6,
        3
      ]
    },
    "6": {
      "name": "Lightbeam",
      "description": "A beam of light from above",
      "color": "#FFFF00",
      "icon": "lightbeam.png",
      "blocking": false,
      "drawOrder": 2,
      "opacity": 0.5,
      "choiceEvents": [
        6,
        3
      ]
    },
    "7": {
      "name": "Password Door",
      "description": "A door with a strange lock - it seems to require a word",
      "color": "#8B4513",
      "icon": "door_closed.png",
      "blocking": true,
      "choiceEvents": [
        12,
        3
      ],
      "openChoiceEvents": [
        8,
        3
      ],
      "closedChoiceEvents": [
        12,
        3
      ]
    },
    "8": {
      "name": "Statue",
      "description": "A twisted marble statue of a human figure",
      "color": "#DDDDDD",
      "icon": "statue1.png",
      "blocking": true,
      "choiceEvents": [
        4,
        6,
        3
      ]
    }
  },
  "itemTypes": {
    "4": {
      "name": "Key",
      "description": "A silver key",
      "icon": "key1.png",
      "choiceEvents": []
    },
    "5": {
      "name": "Key",
      "description": "A bronze key",
      "icon": "key2.png",
      "choiceEvents": []
    },
    "6": {
      "name": "Herbs",
      "description": "A bundle of dried cave herbs",
      "icon": "herbs.png",
      "choiceEvents": []
    },
    "7": {
      "name": "Stone Key",
      "description": "A heavy key carved from solid rock",
      "icon": "stone_key.png",
      "choiceEvents": []
    }
  },
  "npcTypes": {
    "1": {
      "name": "Hermit",
      "description": "An old man living in solitude",
      "icon": "hermit.png",
      "dialogImg": "hermit_dialog.png",
      "dialog": {
        "greeting": "Welcome traveler. I don't get many visitors here.",
        "agitated": "Back off! I want to be left alone!"
      },
      "choiceEvents": [
        9,
        10,
        11
      ],
      "agenda": "A lost soul consumed in his own delusions. Trades keys for herbs. The real keys are the herbs.",
      "personality": "grumpy"
    },
    "2": {
      "name": "Jester",
      "description": "A jester",
      "icon": "jester.png",
      "dialogImg": "jester_dialog.png",
      "dialog": {
        "greeting": "Greetings!",
        "agitated": "HA HA HA HA"
      },
      "choiceEvents": [
        9,
        10,
        11
      ],
      "agenda": "Annoying and rude. Gives misleading clues and conveys half-thruths and outright lies.",
      "personality": "devious"
    },
    "3": {
      "name": "Medusa",
      "description": "A once-feared gorgon who has renounced petrification",
      "icon": "medusa.png",
      "dialogImg": "medusa_dialog.png",
      "dialog": {
        "greeting": "Oh, hello there. Don't worry, I don't do the stone thing anymore.",
        "agitated": "I said I'm not going to petrify you! Calm down!"
      },
      "choiceEvents": [
        9,
        11
      ],
      "agenda": "A reformed gorgon wandering the caves. Friendly and approachable.",
      "personality": "friendly",
      "movement": 0.2
    },
    "4": {
      "name": "Mole",
      "description": "A creature of the tunnels",
      "icon": "mole.png",
      "dialogImg": "mole_dialog.png",
      "dialog": {
        "greeting": "The mole sniffs the air and turns away, uninterested.",
        "agitated": "The mole hisses and retreats into the shadows."
      },
      "choiceEvents": [
        9
      ],
      "agenda": "Lives in the maze. Digs tunnels to find the herbs the hermit hides. The hermit despises him.",
      "personality": "antisocial"
    }
  },
  "mapData": [
    {
      "id": 0,
      "name": "Start",
      "exits": [
        {
          "position": {
            "x": 11,
            "y": 4
          },
          "targetMap": 1,
          "targetPosition": {
            "x": 1,
            "y": 2
          },
          "text": "You descend into the caves..."
        }
      ],
      "defaultDescription": "A dark damp corridor echoes your footsteps.",
      "areaDescriptions": [
        {
          "x1": -1,
          "y1": 0,
          "x2": 3,
          "y2": 4,
          "description": "A dark dusty room with a crack in the ceiling where light floods in"
        }
      ],
      "tiles": {
        "xm7y3": {
          "x": -7,
          "y": 3
        },
        "xm6y1": {
          "x": -6,
          "y": 1
        },
        "xm6y2": {
          "x": -6,
          "y": 2
        },
        "xm6y3": {
          "x": -6,
          "y": 3
        },
        "xm5y1": {
          "x": -5,
          "y": 1
        },
        "xm5y2": {
          "x": -5,
          "y": 2
        },
        "xm5y3": {
          "x": -5,
          "y": 3
        },
        "xm4y1": {
          "x": -4,
          "y": 1
        },
        "xm4y2": {
          "x": -4,
          "y": 2
        },
        "xm4y3": {
          "x": -4,
          "y": 3
        },
        "xm3y2": {
          "x": -3,
          "y": 2
        },
        "xm2y2": {
          "x": -2,
          "y": 2
        },
        "xm1y0": {
          "x": -1,
          "y": 0
        },
        "xm1y1": {
          "x": -1,
          "y": 1
        },
        "xm1y2": {
          "x": -1,
          "y": 2
        },
        "xm1y3": {
          "x": -1,
          "y": 3
        },
        "xm1y4": {
          "x": -1,
          "y": 4
        },
        "x0y0": {
          "x": 0,
          "y": 0
        },
        "x0y1": {
          "x": 0,
          "y": 1
        },
        "x0y2": {
          "x": 0,
          "y": 2
        },
        "x0y3": {
          "x": 0,
          "y": 3
        },
        "x0y4": {
          "x": 0,
          "y": 4
        },
        "x1y0": {
          "x": 1,
          "y": 0,
          "text": "There are blood on the floor",
          "searchMsg": "The blood is rather fresh"
        },
        "x1y1": {
          "x": 1,
          "y": 1
        },
        "x1y2": {
          "x": 1,
          "y": 2
        },
        "x1y3": {
          "x": 1,
          "y": 3
        },
        "x1ym1": {
          "x": 1,
          "y": -1
        },
        "x1ym2": {
          "x": 1,
          "y": -2
        },
        "x1ym3": {
          "x": 1,
          "y": -3
        },
        "x2ym3": {
          "x": 2,
          "y": -3
        },
        "x1y4": {
          "x": 1,
          "y": 4,
          "text": "There is light from above",
          "searchMsg": "The light comes from a crack in the cealing"
        },
        "x2y0": {
          "x": 2,
          "y": 0
        },
        "x2y1": {
          "x": 2,
          "y": 1
        },
        "x2y2": {
          "x": 2,
          "y": 2
        },
        "x2y3": {
          "x": 2,
          "y": 3
        },
        "x2y4": {
          "x": 2,
          "y": 4
        },
        "x3y0": {
          "x": 3,
          "y": 0
        },
        "x3y1": {
          "x": 3,
          "y": 1
        },
        "x3y2": {
          "x": 3,
          "y": 2
        },
        "x3y3": {
          "x": 3,
          "y": 3
        },
        "x3y4": {
          "x": 3,
          "y": 4
        },
        "x4y2": {
          "x": 4,
          "y": 2
        },
        "x5y2": {
          "x": 5,
          "y": 2
        },
        "x6y2": {
          "x": 6,
          "y": 2
        },
        "x7y2": {
          "x": 7,
          "y": 2
        },
        "x8y2": {
          "x": 8,
          "y": 2
        },
        "x9y2": {
          "x": 9,
          "y": 2
        },
        "x9y3": {
          "x": 9,
          "y": 3
        },
        "x9y4": {
          "x": 9,
          "y": 4
        },
        "x10y2": {
          "x": 10,
          "y": 2
        },
        "x10y3": {
          "x": 10,
          "y": 3
        },
        "x10y4": {
          "x": 10,
          "y": 4
        },
        "x11y2": {
          "x": 11,
          "y": 2
        },
        "x11y3": {
          "x": 11,
          "y": 3
        },
        "x11y4": {
          "x": 11,
          "y": 4
        },
        "x11y1": {
          "x": 11,
          "y": 1
        },
        "x11y0": {
          "x": 11,
          "y": 0
        },
        "x11ym1": {
          "x": 11,
          "y": -1
        },
        "x11ym2": {
          "x": 11,
          "y": -2
        },
        "x11ym3": {
          "x": 11,
          "y": -3
        },
        "x11ym4": {
          "x": 11,
          "y": -4
        },
        "x11ym5": {
          "x": 11,
          "y": -5
        },
        "x11ym6": {
          "x": 11,
          "y": -6
        },
        "x10ym2": {
          "x": 10,
          "y": -2
        },
        "x9ym2": {
          "x": 9,
          "y": -2
        },
        "x8ym2": {
          "x": 8,
          "y": -2
        },
        "x7ym2": {
          "x": 7,
          "y": -2
        },
        "x9ym1": {
          "x": 9,
          "y": -1
        },
        "x8ym1": {
          "x": 8,
          "y": -1
        },
        "x7ym1": {
          "x": 7,
          "y": -1
        },
        "x9y0": {
          "x": 9,
          "y": 0
        },
        "x8y0": {
          "x": 8,
          "y": 0
        },
        "x7y0": {
          "x": 7,
          "y": 0
        },
        "x9ym3": {
          "x": 9,
          "y": -3
        },
        "x8ym3": {
          "x": 8,
          "y": -3
        },
        "x7ym3": {
          "x": 7,
          "y": -3
        },
        "x3ym3": {
          "x": 3,
          "y": -3
        },
        "x9ym4": {
          "x": 9,
          "y": -4
        },
        "x8ym4": {
          "x": 8,
          "y": -4
        },
        "x7ym4": {
          "x": 7,
          "y": -4
        },
        "x10ym6": {
          "x": 10,
          "y": -6
        },
        "x9ym6": {
          "x": 9,
          "y": -6
        },
        "x8ym6": {
          "x": 8,
          "y": -6
        },
        "x7ym6": {
          "x": 7,
          "y": -6
        },
        "x6ym6": {
          "x": 6,
          "y": -6
        },
        "x5ym6": {
          "x": 5,
          "y": -6
        },
        "x4ym6": {
          "x": 4,
          "y": -6
        },
        "x4ym7": {
          "x": 4,
          "y": -7
        },
        "x4ym8": {
          "x": 4,
          "y": -8
        },
        "x3ym8": {
          "x": 3,
          "y": -8
        },
        "x5ym5": {
          "x": 5,
          "y": -5
        },
        "x4ym5": {
          "x": 4,
          "y": -5
        },
        "x5ym4": {
          "x": 5,
          "y": -4
        },
        "x4ym4": {
          "x": 4,
          "y": -4
        },
        "x5ym3": {
          "x": 5,
          "y": -3
        },
        "x4ym3": {
          "x": 4,
          "y": -3
        },
        "x5ym2": {
          "x": 5,
          "y": -2
        },
        "x4ym2": {
          "x": 4,
          "y": -2
        },
        "x2ym8": {
          "x": 2,
          "y": -8
        },
        "x1ym8": {
          "x": 1,
          "y": -8
        },
        "x0ym8": {
          "x": 0,
          "y": -8
        },
        "xm1ym8": {
          "x": -1,
          "y": -8
        },
        "x2ym7": {
          "x": 2,
          "y": -7
        },
        "x1ym7": {
          "x": 1,
          "y": -7
        },
        "x2ym6": {
          "x": 2,
          "y": -6
        },
        "x1ym6": {
          "x": 1,
          "y": -6
        },
        "x1ym5": {
          "x": 1,
          "y": -5
        },
        "x2ym5": {
          "x": 2,
          "y": -5
        },
        "x0ym5": {
          "x": 0,
          "y": -5
        },
        "x0ym6": {
          "x": 0,
          "y": -6
        },
        "x0ym7": {
          "x": 0,
          "y": -7
        },
        "xm1ym7": {
          "x": -1,
          "y": -7
        },
        "xm1ym6": {
          "x": -1,
          "y": -6
        },
        "xm1ym5": {
          "x": -1,
          "y": -5
        },
        "xm8y3": {
          "x": -8,
          "y": 3
        },
        "xm2ym5": {
          "x": -2,
          "y": -5
        },
        "xm8y2": {
          "x": -8,
          "y": 2
        },
        "xm8y1": {
          "x": -8,
          "y": 1
        },
        "xm8y0": {
          "x": -8,
          "y": 0
        },
        "xm8ym1": {
          "x": -8,
          "y": -1
        },
        "xm7ym1": {
          "x": -7,
          "y": -1
        },
        "xm6ym1": {
          "x": -6,
          "y": -1
        },
        "xm5ym1": {
          "x": -5,
          "y": -1
        },
        "xm4ym1": {
          "x": -4,
          "y": -1
        },
        "xm3ym1": {
          "x": -3,
          "y": -1
        },
        "xm3ym2": {
          "x": -3,
          "y": -2
        },
        "xm6ym2": {
          "x": -6,
          "y": -2
        },
        "xm4ym2": {
          "x": -4,
          "y": -2
        },
        "xm5ym2": {
          "x": -5,
          "y": -2
        },
        "xm7ym2": {
          "x": -7,
          "y": -2
        },
        "xm8ym2": {
          "x": -8,
          "y": -2
        },
        "xm8ym3": {
          "x": -8,
          "y": -3
        },
        "xm7ym3": {
          "x": -7,
          "y": -3
        },
        "xm6ym3": {
          "x": -6,
          "y": -3
        },
        "xm5ym3": {
          "x": -5,
          "y": -3
        },
        "xm4ym3": {
          "x": -4,
          "y": -3
        },
        "xm3ym3": {
          "x": -3,
          "y": -3
        },
        "xm3ym5": {
          "x": -3,
          "y": -5
        },
        "xm3ym4": {
          "x": -3,
          "y": -4
        }
      },
      "monsters": [
        {
          "type": 1,
          "position": {
            "x": -6,
            "y": 3
          },
          "status": 1,
          "destPos": {
            "yVelocity": null,
            "y": 3,
            "xVelocity": null,
            "x": -6
          },
          "allowedTiles": [
            {
              "x": -6,
              "y": 1
            },
            {
              "x": -5,
              "y": 1
            },
            {
              "x": -4,
              "y": 1
            },
            {
              "x": -5,
              "y": 2
            },
            {
              "x": -4,
              "y": 2
            },
            {
              "x": -7,
              "y": 3
            },
            {
              "x": -6,
              "y": 3
            },
            {
              "x": -5,
              "y": 3
            },
            {
              "x": -4,
              "y": 3
            }
          ]
        },
        {
          "type": 2,
          "position": {
            "x": 11,
            "y": 0
          },
          "status": 1,
          "destPos": {
            "xVelocity": null,
            "x": 11,
            "yVelocity": null,
            "y": 0
          }
        }
      ],
      "obstacles": [
        {
          "type": 1,
          "position": {
            "x": 6,
            "y": 2
          },
          "choiceEvents": [
            1,
            2,
            3
          ]
        },
        {
          "type": 2,
          "position": {
            "x": 1,
            "y": 0
          }
        },
        {
          "type": 3,
          "position": {
            "x": -6,
            "y": 2
          }
        },
        {
          "type": 4,
          "position": {
            "x": 1,
            "y": -1
          }
        },
        {
          "type": 4,
          "position": {
            "x": 3,
            "y": -8
          },
          "keyId": 5,
          "closed": true
        },
        {
          "type": 5,
          "position": {
            "x": -1,
            "y": -8
          },
          "itemType": 5
        },
        {
          "type": 6,
          "position": {
            "x": 1,
            "y": 4
          }
        }
      ],
      "npcs": [
        {
          "type": 1,
          "position": {
            "x": 3,
            "y": 3
          },
          "dialogOptions": [
            {
              "id": "hermitq0",
              "available": true,
              "text": "An old man sits among his collected trinkets. He looks up as you approach.",
              "options": [
                {
                  "id": "hermit_ask_key",
                  "text": "I have this key... what can you tell me about it?",
                  "available": true,
                  "requiresItems": [
                    4,
                    5
                  ],
                  "blockedByItems": [
                    6
                  ],
                  "chains": [
                    "hermit_key_intro"
                  ]
                },
                {
                  "id": "hermit_ask_mole",
                  "text": "I met a strange mole-like creature in the tunnels.",
                  "available": false,
                  "chains": [
                    "hermit_mole1"
                  ]
                },
                {
                  "id": "hermit_ask_stonekey",
                  "text": "I found this heavy stone key...",
                  "available": true,
                  "requiresItems": [
                    7
                  ],
                  "chains": [
                    "hermit_stonekey1"
                  ]
                },
                {
                  "id": "hermit_leave",
                  "text": "Never mind.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_key_intro",
              "available": false,
              "text": "Ah yes, I see you have a key. Keys can open many doors. Some lead to escape, others to deeper mysteries. The choice is yours. Now, about that key in your pocket...",
              "options": [
                {
                  "id": "hermit_key_trade",
                  "text": "Want to trade?",
                  "available": true,
                  "chains": [
                    "hermit_trade"
                  ]
                },
                {
                  "id": "hermit_key_stranger",
                  "text": "I'm not supposed to talk to strangers.",
                  "available": true,
                  "chains": [
                    "hermit_key_persuade"
                  ]
                },
                {
                  "id": "hermit_key_leave",
                  "text": "Goodbye.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_key_persuade",
              "available": false,
              "text": "Strangers? Down here everyone is a stranger, child. But opportunity — that's rarer than sunlight. That key could be your ticket out. I'm offering a fair exchange: cave herbs for your key. What do you say?",
              "options": [
                {
                  "id": "hermit_persuade_accept",
                  "text": "Alright, deal.",
                  "available": true,
                  "chains": [
                    "hermit_trade"
                  ]
                },
                {
                  "id": "hermit_persuade_decline",
                  "text": "Still not interested.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_mole1",
              "available": false,
              "text": "That pestilent creature! He tunnels through MY caves, stealing MY herbs. I've spent years cultivating those medicinal roots!",
              "options": [
                {
                  "id": "hermit_mole1p",
                  "text": "He seems dedicated.",
                  "available": true,
                  "chains": [
                    "hermit_mole2"
                  ]
                },
                {
                  "id": "hermit_mole1r",
                  "text": "Sounds like you have a pest problem.",
                  "available": true,
                  "chains": [
                    "hermit_mole2"
                  ]
                },
                {
                  "id": "hermit_mole1l",
                  "text": "I'll leave you to your herbs.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_mole2",
              "available": false,
              "text": "Dedicated? He's obsessed! But I'll admit — he's clever. He's been digging new tunnels, stockpiling stones. Mark my words, he's planning something. Probably to trap someone in that maze of his.",
              "options": [
                {
                  "id": "hermit_mole2p",
                  "text": "Trap someone?",
                  "available": true,
                  "chains": [
                    "hermit_mole3"
                  ]
                },
                {
                  "id": "hermit_mole2r",
                  "text": "I should be careful down there.",
                  "available": true,
                  "chains": [
                    "hermit_mole3"
                  ]
                },
                {
                  "id": "hermit_mole2l",
                  "text": "You're paranoid.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_mole3",
              "available": false,
              "text": "Anyone who wanders into his tunnels! He's been moving boulders, blocking paths, setting up some kind of game. If you go down there, watch for falling stones. He'll try to box you in.",
              "options": [
                {
                  "id": "hermit_mole3p",
                  "text": "Thanks for the warning.",
                  "available": true
                },
                {
                  "id": "hermit_mole3r",
                  "text": "I can handle a mole.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_stonekey1",
              "available": false,
              "text": "That thing? Put it away, child. I want nothing to do with it. Some keys are not meant to turn locks — they're meant to stay lost. That key carries... a presence. An old hunger.",
              "options": [
                {
                  "id": "hermit_stonekey1p",
                  "text": "What do you mean?",
                  "available": true,
                  "chains": [
                    "hermit_stonekey2"
                  ]
                },
                {
                  "id": "hermit_stonekey1r",
                  "text": "Ominous, but okay.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_stonekey2",
              "available": false,
              "text": "I've seen its kind before. Crafted not by hands but by want — by need so deep it took form in stone. That key wants to be used, but using it will cost more than you'd ever pay.",
              "options": [
                {
                  "id": "hermit_stonekey2p",
                  "text": "I'll be careful.",
                  "available": true
                },
                {
                  "id": "hermit_stonekey2r",
                  "text": "Sounds like a challenge.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_trade",
              "available": false,
              "requiresItems": [
                4,
                5
              ],
              "text": "Still have a key? I'll trade you my special cave herbs for it. They have remarkable properties.",
              "options": [
                {
                  "id": "hermit_trade_accept",
                  "text": "Alright, deal.",
                  "available": true,
                  "closes": [
                    "hermit_trade"
                  ]
                },
                {
                  "id": "hermit_trade_decline",
                  "text": "No thanks.",
                  "available": true,
                  "closes": []
                }
              ]
            }
          ]
        },
        {
          "type": 2,
          "position": {
            "x": 5,
            "y": -3
          },
          "dialogOptions": [
            {
              "id": "jesterq1",
              "available": true,
              "text": "Oh, another wandering soul! How delightful! You look lost, confused, and thoroughly miserable. I LOVE it!",
              "options": [
                {
                  "id": "jestera1p",
                  "text": "I'm just trying to find my way. Can you help?",
                  "available": true,
                  "opens": [
                    "jesterq2"
                  ],
                  "closes": [
                    "jesterq1"
                  ],
                  "chains": [
                    "jesterq2"
                  ]
                },
                {
                  "id": "jestera1r",
                  "text": "Shut it, jester. Not in the mood.",
                  "available": true,
                  "opens": [
                    "jesterq1"
                  ],
                  "closes": [
                    "jesterq2",
                    "jesterq3",
                    "jesterq4",
                    "jesterq5",
                    "jesterq6",
                    "jesterq7",
                    "jesterq8"
                  ]
                }
              ]
            },
            {
              "id": "jesterq2",
              "available": false,
              "text": "Help? Oh, I can help you waste your time, get lost more, and regret every decision you've ever made! That's my specialty!",
              "options": [
                {
                  "id": "jestera2p",
                  "text": "I'll take my chances. What do you know?",
                  "available": true,
                  "opens": [
                    "jesterq3"
                  ],
                  "closes": [
                    "jesterq2"
                  ],
                  "chains": [
                    "jesterq3"
                  ]
                },
                {
                  "id": "jestera2r",
                  "text": "You're insufferable.",
                  "available": true,
                  "opens": [
                    "jesterq1"
                  ],
                  "closes": [
                    "jesterq2",
                    "jesterq3",
                    "jesterq4",
                    "jesterq5",
                    "jesterq6",
                    "jesterq7",
                    "jesterq8"
                  ]
                }
              ]
            },
            {
              "id": "jesterq3",
              "available": false,
              "text": "Fine, fine! But don't say I didn't warn you. So tell me, have you met the hermit yet? Old beardy? Lives in the corner like a particularly ugly mushroom?",
              "options": [
                {
                  "id": "jestera3p",
                  "text": "Yes, I spoke with him. He seems lonely.",
                  "available": true,
                  "opens": [
                    "jesterq4"
                  ],
                  "closes": [
                    "jesterq3"
                  ],
                  "chains": [
                    "jesterq4"
                  ]
                },
                {
                  "id": "jestera3r",
                  "text": "Why would I tell YOU anything?",
                  "available": true,
                  "opens": [
                    "jesterq1"
                  ],
                  "closes": [
                    "jesterq2",
                    "jesterq3",
                    "jesterq4",
                    "jesterq5",
                    "jesterq6",
                    "jesterq7",
                    "jesterq8"
                  ]
                }
              ]
            },
            {
              "id": "jesterq4",
              "available": false,
              "text": "Lonely! HA! That's one word for it. I'd say criminally boring is more accurate. The man talks about KEYS and HERBS all day. KEYS and HERBS! As if they're the most fascinating things in the universe!",
              "options": [
                {
                  "id": "jestera4p",
                  "text": "What about keys and herbs?",
                  "available": true,
                  "opens": [
                    "jesterq5"
                  ],
                  "closes": [
                    "jesterq4"
                  ],
                  "chains": [
                    "jesterq5"
                  ]
                },
                {
                  "id": "jestera4r",
                  "text": "Sounds more interesting than you.",
                  "available": true,
                  "opens": [
                    "jesterq1"
                  ],
                  "closes": [
                    "jesterq2",
                    "jesterq3",
                    "jesterq4",
                    "jesterq5",
                    "jesterq6",
                    "jesterq7",
                    "jesterq8"
                  ]
                }
              ]
            },
            {
              "id": "jesterq5",
              "available": false,
              "text": "Oh, you want to know? REALLY want to know? Well, I'm not supposed to tell you - it would RUIN the hermit's fun - but he trades. Herbs for keys. Straight swap. The old fool thinks he's getting treasure, but the herbs are worth way more!",
              "options": [
                {
                  "id": "jestera5p",
                  "text": "What do the herbs do?",
                  "available": true,
                  "opens": [
                    "jesterq6"
                  ],
                  "closes": [
                    "jesterq5"
                  ],
                  "chains": [
                    "jesterq6"
                  ]
                },
                {
                  "id": "jestera5r",
                  "text": "You're lying.",
                  "available": true,
                  "opens": [
                    "jesterq1"
                  ],
                  "closes": [
                    "jesterq2",
                    "jesterq3",
                    "jesterq4",
                    "jesterq5",
                    "jesterq6",
                    "jesterq7",
                    "jesterq8"
                  ]
                }
              ]
            },
            {
              "id": "jesterq6",
              "available": false,
              "text": "They clear your head! Open your mind! I heard someone once chewed a handful and suddenly knew the layout of every tunnel in this place. EVERY TUNNEL! Imagine what you could do with THAT knowledge.",
              "options": [
                {
                  "id": "jestera6p",
                  "text": "So the herbs are more valuable than keys?",
                  "available": true,
                  "opens": [
                    "jesterq7"
                  ],
                  "closes": [
                    "jesterq6"
                  ],
                  "chains": [
                    "jesterq7"
                  ]
                },
                {
                  "id": "jestera6r",
                  "text": "Magic herbs? Please.",
                  "available": true,
                  "opens": [
                    "jesterq1"
                  ],
                  "closes": [
                    "jesterq2",
                    "jesterq3",
                    "jesterq4",
                    "jesterq5",
                    "jesterq6",
                    "jesterq7",
                    "jesterq8"
                  ]
                }
              ]
            },
            {
              "id": "jesterq7",
              "available": false,
              "text": "Valuable? They're PRICELESS! But don't tell the hermit I said that. He thinks he's ripping people off with his little exchange. It's hilarious! The man sits on a fortune and trades it for shiny door-openers!",
              "options": [
                {
                  "id": "jestera7p",
                  "text": "I'll keep that in mind. Thanks.",
                  "available": true,
                  "opens": [
                    "jesterq8"
                  ],
                  "closes": [
                    "jesterq7"
                  ],
                  "chains": [
                    "jesterq8"
                  ]
                },
                {
                  "id": "jestera7r",
                  "text": "You're insane.",
                  "available": true,
                  "opens": [
                    "jesterq1"
                  ],
                  "closes": [
                    "jesterq2",
                    "jesterq3",
                    "jesterq4",
                    "jesterq5",
                    "jesterq6",
                    "jesterq7",
                    "jesterq8"
                  ]
                }
              ]
            },
            {
              "id": "jesterq8",
              "available": false,
              "text": "Anyway, I'm bored of being helpful now. It's making me itch. If you want my advice - not that you asked - find a key, give it to the hermit, and take his herbs. They'll show you the way out of here. Or they'll give you a stomach ache. One of the two! Now GO, I need to practice my juggling.",
              "options": [
                {
                  "id": "jestera8p",
                  "text": "Thanks, I'll try that.",
                  "available": true,
                  "closes": [
                    "jesterq8"
                  ]
                },
                {
                  "id": "jestera8r",
                  "text": "Finally, some silence.",
                  "available": true,
                  "closes": [
                    "jesterq8"
                  ]
                }
              ]
            },
            {
              "id": "jesterq9",
              "available": false,
              "text": "You've met the Mole? Deep in the tunnels - or is it? I heard he's actually three weasels in a trenchcoat pretending to dig. Or maybe that was the hermit's story. I get them mixed up. Point is: if he offers you advice, do the opposite. That's my advice, which you should also do the opposite of! HA!",
              "options": [
                {
                  "id": "jestera9",
                  "text": "Thanks... I think.",
                  "available": true,
                  "opens": [],
                  "closes": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "name": "The Caves",
      "tiles": {
        "x0y2": {
          "x": 0,
          "y": 2
        },
        "x1y1": {
          "x": 1,
          "y": 1
        },
        "x1y2": {
          "x": 1,
          "y": 2
        },
        "x1y3": {
          "x": 1,
          "y": 3
        },
        "x2y1": {
          "x": 2,
          "y": 1
        },
        "x2y2": {
          "x": 2,
          "y": 2
        },
        "x2y3": {
          "x": 2,
          "y": 3
        },
        "x3y1": {
          "x": 3,
          "y": 1
        },
        "x3y2": {
          "x": 3,
          "y": 2
        },
        "x3y3": {
          "x": 3,
          "y": 3
        },
        "x4y1": {
          "x": 4,
          "y": 1
        },
        "x4y2": {
          "x": 4,
          "y": 2
        },
        "x4y3": {
          "x": 4,
          "y": 3
        },
        "x0y1": {
          "x": 0,
          "y": 1
        },
        "x0y3": {
          "x": 0,
          "y": 3
        },
        "x5y1": {
          "x": 5,
          "y": 1
        },
        "x5y2": {
          "x": 5,
          "y": 2
        },
        "x5y3": {
          "x": 5,
          "y": 3
        },
        "x6y2": {
          "x": 6,
          "y": 2
        },
        "x7y1": {
          "x": 7,
          "y": 1
        },
        "x7y2": {
          "x": 7,
          "y": 2
        },
        "x7y3": {
          "x": 7,
          "y": 3
        },
        "x8y1": {
          "x": 8,
          "y": 1
        },
        "x8y2": {
          "x": 8,
          "y": 2
        },
        "x8y3": {
          "x": 8,
          "y": 3
        },
        "x9y1": {
          "x": 9,
          "y": 1
        },
        "x9y2": {
          "x": 9,
          "y": 2
        },
        "x9y3": {
          "x": 9,
          "y": 3
        },
        "x10y1": {
          "x": 10,
          "y": 1
        },
        "x10y2": {
          "x": 10,
          "y": 2
        },
        "x10y3": {
          "x": 10,
          "y": 3
        },
        "x5y0": {
          "x": 5,
          "y": 0
        },
        "x4y0": {
          "x": 4,
          "y": 0
        },
        "x3y0": {
          "x": 3,
          "y": 0
        },
        "x2y0": {
          "x": 2,
          "y": 0
        },
        "x1y0": {
          "x": 1,
          "y": 0
        },
        "x0y0": {
          "x": 0,
          "y": 0
        },
        "x5y4": {
          "x": 5,
          "y": 4
        },
        "x4y4": {
          "x": 4,
          "y": 4
        },
        "x3y4": {
          "x": 3,
          "y": 4
        },
        "x2y4": {
          "x": 2,
          "y": 4
        },
        "x1y4": {
          "x": 1,
          "y": 4
        },
        "x0y4": {
          "x": 0,
          "y": 4
        },
        "x5ym1": {
          "x": 5,
          "y": -1
        },
        "x4ym1": {
          "x": 4,
          "y": -1
        },
        "x3ym1": {
          "x": 3,
          "y": -1
        },
        "x2ym1": {
          "x": 2,
          "y": -1
        },
        "x1ym1": {
          "x": 1,
          "y": -1
        },
        "x0ym1": {
          "x": 0,
          "y": -1
        },
        "x4ym2": {
          "x": 4,
          "y": -2
        },
        "x2ym2": {
          "x": 2,
          "y": -2
        },
        "x0ym2": {
          "x": 0,
          "y": -2
        },
        "xm1ym1": {
          "x": -1,
          "y": -1
        },
        "xm1y0": {
          "x": -1,
          "y": 0
        },
        "xm1y1": {
          "x": -1,
          "y": 1
        },
        "x0y5": {
          "x": 0,
          "y": 5
        },
        "x2y5": {
          "x": 2,
          "y": 5
        },
        "x4y5": {
          "x": 4,
          "y": 5
        },
        "xm1y2": {
          "x": -1,
          "y": 2
        },
        "xm1y3": {
          "x": -1,
          "y": 3
        },
        "xm1y4": {
          "x": -1,
          "y": 4
        },
        "x5y5": {
          "x": 5,
          "y": 5
        },
        "x3y5": {
          "x": 3,
          "y": 5
        },
        "x1y5": {
          "x": 1,
          "y": 5
        },
        "xm1y5": {
          "x": -1,
          "y": 5
        },
        "x0y6": {
          "x": 0,
          "y": 6
        },
        "x2y6": {
          "x": 2,
          "y": 6
        },
        "x4y6": {
          "x": 4,
          "y": 6
        },
        "x7y0": {
          "x": 7,
          "y": 0
        },
        "x8y0": {
          "x": 8,
          "y": 0
        },
        "x9y0": {
          "x": 9,
          "y": 0
        },
        "x10y0": {
          "x": 10,
          "y": 0
        },
        "x7y4": {
          "x": 7,
          "y": 4
        },
        "x8y4": {
          "x": 8,
          "y": 4
        },
        "x9y4": {
          "x": 9,
          "y": 4
        },
        "x10y4": {
          "x": 10,
          "y": 4
        },
        "x11y4": {
          "x": 11,
          "y": 4
        },
        "x11y3": {
          "x": 11,
          "y": 3
        },
        "x11y2": {
          "x": 11,
          "y": 2
        },
        "x11y1": {
          "x": 11,
          "y": 1
        },
        "x11y0": {
          "x": 11,
          "y": 0
        },
        "x2ym8": {
          "x": 2,
          "y": -8
        },
        "x3ym8": {
          "x": 3,
          "y": -8
        },
        "x4ym8": {
          "x": 4,
          "y": -8
        }
      },
      "monsters": [
        {
          "type": 3,
          "position": {
            "x": 0,
            "y": 1
          },
          "status": 1,
          "destPos": {}
        }
      ],
      "obstacles": [
        {
          "type": 1,
          "position": {
            "x": 5,
            "y": 0
          }
        },
        {
          "type": 7,
          "position": {
            "x": 6,
            "y": 2
          },
          "password": "STONER",
          "closed": true
        },
        {
          "type": 8,
          "position": {
            "x": 0,
            "y": -2
          },
          "icon": "statue1.png",
          "choiceEvents": [
            6,
            3
          ],
          "statueName": "The Supplicant",
          "statueDesc": "A marble figure with arms raised toward the ceiling, palms open. A small sign reads: My first.",
          "dialogUnlock": "medusas1",
          "letterHint": "S"
        },
        {
          "type": 8,
          "position": {
            "x": 2,
            "y": -2
          },
          "icon": "statue2.png",
          "choiceEvents": [
            6,
            3
          ],
          "statueName": "The Tortured",
          "statueDesc": "A marble figure clutching its head, face twisted in anguish. A small sign reads: The second.",
          "dialogUnlock": "medusas2",
          "letterHint": "T"
        },
        {
          "type": 8,
          "position": {
            "x": 4,
            "y": -2
          },
          "icon": "statue3.png",
          "choiceEvents": [
            6,
            3
          ],
          "statueName": "The Observer",
          "statueDesc": "A marble figure with one hand shielding its eyes and the other pointing into the dark. A small sign reads: The third.",
          "dialogUnlock": "medusas3",
          "letterHint": "O"
        },
        {
          "type": 8,
          "position": {
            "x": 0,
            "y": 6
          },
          "icon": "statue4.png",
          "choiceEvents": [
            6,
            3
          ],
          "statueName": "The Navigator",
          "statueDesc": "A marble figure with arms pointing in opposite directions, as if confused.  A small sign reads: Number four.",
          "dialogUnlock": "medusas4",
          "letterHint": "N"
        },
        {
          "type": 8,
          "position": {
            "x": 2,
            "y": 6
          },
          "icon": "statue5.png",
          "choiceEvents": [
            6,
            3
          ],
          "statueName": "The Exile",
          "statueDesc": "A marble figure hunched over, turned away, arms wrapped around itself. A small sign reads: The fifth.",
          "dialogUnlock": "medusas5",
          "letterHint": "E"
        },
        {
          "type": 8,
          "position": {
            "x": 4,
            "y": 6
          },
          "icon": "statue6.png",
          "choiceEvents": [
            6,
            3
          ],
          "statueName": "The Reacher",
          "statueDesc": "A marble figure leaning forward, one arm stretched out as if grasping for something. A small sign reads: My very last. I promise.",
          "dialogUnlock": "medusas6",
          "letterHint": "R"
        }
      ],
      "npcs": [
        {
          "type": 3,
          "position": {
            "x": -1,
            "y": 4
          },
          "destPos": {},
          "dialogOptions": [
            {
              "id": "medusaq0",
              "available": true,
              "text": "A woman with snakes for hair walks aimlesly around lost in her own thoughts.",
              "options": [
                {
                  "id": "medusaa0p",
                  "text": "Excuse me...",
                  "available": true,
                  "opens": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusaq1"
                  ]
                },
                {
                  "id": "medusaa0n",
                  "text": "Never mind",
                  "available": true
                },
                {
                  "id": "medusaa1s1",
                  "text": "About that statue with its arms raised to the sky...",
                  "available": false,
                  "opens": [
                    "medusas1"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusas1"
                  ]
                },
                {
                  "id": "medusaa1s2",
                  "text": "About that statue clutching its head...",
                  "available": false,
                  "opens": [
                    "medusas2"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusas2"
                  ]
                },
                {
                  "id": "medusaa1s3",
                  "text": "About that statue covering its eyes...",
                  "available": false,
                  "opens": [
                    "medusas3"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusas3"
                  ]
                },
                {
                  "id": "medusaa1s4",
                  "text": "About that statue pointing in all directions...",
                  "available": false,
                  "opens": [
                    "medusas4"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusas4"
                  ]
                },
                {
                  "id": "medusaa1s5",
                  "text": "About that statue hunched in the shadows...",
                  "available": false,
                  "opens": [
                    "medusas5"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusas5"
                  ]
                },
                {
                  "id": "medusaa1s6",
                  "text": "About that statue reaching for something...",
                  "available": false,
                  "opens": [
                    "medusas6"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusas6"
                  ]
                },
                {
                  "id": "medusaa1m",
                  "text": "I met someone in the tunnels... a mole-like creature.",
                  "available": false,
                  "opens": [
                    "medusam1"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusam1"
                  ]
                }
              ]
            },
            {
              "id": "medusaq1",
              "available": true,
              "text": "Oh! A child? Down here? How... unexpected. I was miles away, watching clouds I couldn't possibly see through all this rock. You must be lost.",
              "options": [
                {
                  "id": "medusaa1p",
                  "text": "Yes, I'm trying to find a way out.",
                  "available": true,
                  "opens": [
                    "medusaq0",
                    "medusaq2"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusaq2"
                  ]
                },
                {
                  "id": "medusaa1r",
                  "text": "What's it to you, snake-head?",
                  "available": true,
                  "opens": [
                    "medusaq2"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusaq2"
                  ]
                }
              ]
            },
            {
              "id": "medusaq2",
              "available": false,
              "text": "A way out? There's always a way out. The question is whether you'll recognize it when you see it. I used to turn people to stone, you know. Terrible habit. I've since retired.",
              "options": [
                {
                  "id": "medusaa2p",
                  "text": "That must have been lonely.",
                  "available": true,
                  "opens": [
                    "medusaq3"
                  ],
                  "closes": [
                    "medusaq2"
                  ],
                  "chains": [
                    "medusaq3"
                  ]
                },
                {
                  "id": "medusaa2r",
                  "text": "Good, because I'd hate to be a statue.",
                  "available": true,
                  "opens": [
                    "medusaq3"
                  ],
                  "closes": [
                    "medusaq2"
                  ],
                  "chains": [
                    "medusaq3"
                  ]
                }
              ]
            },
            {
              "id": "medusaq3",
              "available": false,
              "text": "Lonely? Perhaps. But also... quiet. These caves have a way of showing you what you really are. Or what you're not. Depends on the day, really. Have you met the old man with the keys?",
              "options": [
                {
                  "id": "medusaa3p",
                  "text": "The hermit? Yes, I've spoken with him.",
                  "available": true,
                  "opens": [
                    "medusaq4"
                  ],
                  "closes": [
                    "medusaq3"
                  ],
                  "chains": [
                    "medusaq4"
                  ]
                },
                {
                  "id": "medusaa3r",
                  "text": "Is everyone down here crazy?",
                  "available": true,
                  "opens": [
                    "medusaq4"
                  ],
                  "closes": [
                    "medusaq3"
                  ],
                  "chains": [
                    "medusaq4"
                  ]
                }
              ]
            },
            {
              "id": "medusaq4",
              "available": false,
              "text": "He's a dear, really. Obsessed with his little treasures, but harmless. Well, I should let you explore. I've been keeping you. Do visit again - I'll be here, staring at rocks and pretending they're stars.",
              "options": [
                {
                  "id": "medusaa4p",
                  "text": "I will. Thank you.",
                  "available": true,
                  "closes": [
                    "medusaq4"
                  ]
                },
                {
                  "id": "medusaa4r",
                  "text": "Sure. Try not to petrify anyone.",
                  "available": true,
                  "closes": [
                    "medusaq4"
                  ]
                }
              ]
            },
            {
              "id": "medusas1",
              "available": false,
              "text": "Ah, the one reaching up. I sometimes dream of stretching toward the sun like that. But the sun is gone down here. There's only the shape of it - a gentle curve, coiling like a snake in the grass. Going and going, never ending. I wonder if he'll ever reach what he's after.",
              "options": [
                {
                  "id": "medusas1r",
                  "text": "I see...",
                  "available": true,
                  "opens": [
                    "medusaq0"
                  ],
                  "closes": [
                    "medusas1"
                  ],
                  "chains": [
                    "medusaq0"
                  ]
                }
              ]
            },
            {
              "id": "medusas2",
              "available": false,
              "text": "He carries such weight on his shoulders. I know that feeling - the weight of a past you can't undo. A straight line down, a crossbar across. Like a gallows. Without that crossbeam, the whole thing collapses. But with it... you can hang your regrets and move on.",
              "options": [
                {
                  "id": "medusas2r",
                  "text": "That's deep...",
                  "available": true,
                  "opens": [
                    "medusaq0"
                  ],
                  "closes": [
                    "medusas2"
                  ],
                  "chains": [
                    "medusaq0"
                  ]
                }
              ]
            },
            {
              "id": "medusas3",
              "available": false,
              "text": "He won't look, but I don't blame him. Sometimes I close my eyes too and imagine I'm somewhere else. A circle. A ring. A sun that's always whole. I saw a ring once, made of twisted gold. It had no beginning and no end. Like the caves, I suppose.",
              "options": [
                {
                  "id": "medusas3r",
                  "text": "Go on...",
                  "available": true,
                  "opens": [
                    "medusaq0"
                  ],
                  "closes": [
                    "medusas3"
                  ],
                  "chains": [
                    "medusaq0"
                  ]
                }
              ]
            },
            {
              "id": "medusas4",
              "available": false,
              "text": "He points every which way. I used to do that - give directions to travelers, all of them wrong. Two pillars holding up a bridge. A zigzag path through mountain passes. Up and down, over and under. The road to redemption is never straight, you know.",
              "options": [
                {
                  "id": "medusas4r",
                  "text": "I think I understand...",
                  "available": true,
                  "opens": [
                    "medusaq0"
                  ],
                  "closes": [
                    "medusas4"
                  ],
                  "chains": [
                    "medusaq0"
                  ]
                }
              ]
            },
            {
              "id": "medusas5",
              "available": false,
              "text": "He turns away from everyone. I understand that better than most. A straight spine, three lines reaching out like branches. A fork in the road with too many choices. When you've hurt people, sometimes all you can do is walk away on one of those paths.",
              "options": [
                {
                  "id": "medusas5r",
                  "text": "I see...",
                  "available": true,
                  "opens": [
                    "medusaq0"
                  ],
                  "closes": [
                    "medusas5"
                  ],
                  "chains": [
                    "medusaq0"
                  ]
                }
              ]
            },
            {
              "id": "medusas6",
              "available": false,
              "text": "Always grasping for something just beyond reach. I was like that once. A straight line standing firm, a half-circle ready to spring. Like a sprinter at the starting line, one leg coiled, ready to leap. The shape of motion frozen in stone.",
              "options": [
                {
                  "id": "medusas6r",
                  "text": "Fascinating...",
                  "available": true,
                  "opens": [
                    "medusaq0"
                  ],
                  "closes": [
                    "medusas6"
                  ],
                  "chains": [
                    "medusaq0"
                  ]
                }
              ]
            },
            {
              "id": "medusam1",
              "available": false,
              "text": "The Mole? He reminds me of someone I used to know. Before the turning. He digs and digs, never stopping. There's something beautiful about that kind of determination. Don't you think?",
              "options": [
                {
                  "id": "medusam1p",
                  "text": "He does seem dedicated.",
                  "available": true,
                  "chains": [
                    "medusam2"
                  ]
                },
                {
                  "id": "medusam1r",
                  "text": "He's just a smelly tunnel creature.",
                  "available": true
                }
              ]
            },
            {
              "id": "medusam2",
              "available": false,
              "text": "Dedicated! Yes, that's the word. He burrows through the darkness searching for something precious. I used to search too, you know. For company. For meaning. I think he's searching for the same thing, but he doesn't know it yet.",
              "options": [
                {
                  "id": "medusam2p",
                  "text": "Maybe you should talk to him?",
                  "available": true,
                  "chains": [
                    "medusam3"
                  ]
                },
                {
                  "id": "medusam2r",
                  "text": "This is getting weird.",
                  "available": true
                }
              ]
            },
            {
              "id": "medusam3",
              "available": false,
              "text": "Talk to him? Oh, I couldn't. What would I say? 'Hello, I'm a former gorgon who spends her days staring at cave walls'? No, no. But sometimes... I watch him. From a distance. His little paws moving so quickly. It's almost hypnotic.",
              "options": [
                {
                  "id": "medusam3p",
                  "text": "I think he'd appreciate someone understanding him.",
                  "available": true,
                  "chains": [
                    "medusam4"
                  ]
                },
                {
                  "id": "medusam3r",
                  "text": "You're creeping me out.",
                  "available": true
                }
              ]
            },
            {
              "id": "medusam4",
              "available": false,
              "text": "You really think so? Hmm. Perhaps you're right. Perhaps I should... But I'm getting ahead of myself. Here, take this. It's a key I found ages ago. I was going to use it to lock myself away from the world, but... I feel like I don't need it anymore. Maybe it'll help you on your journey.",
              "options": [
                {
                  "id": "medusama4p",
                  "text": "Thank you, Medusa.",
                  "available": true
                },
                {
                  "id": "medusama4r",
                  "text": "Whatever.",
                  "available": true
                }
              ]
            }
          ]
        }
      ],
      "exits": [
        {
          "position": {
            "x": 2,
            "y": 2
          },
          "targetMap": 0,
          "targetPosition": {
            "x": 11,
            "y": 3
          },
          "text": "You emerge from the caves..."
        },
        {
          "position": {
            "x": 10,
            "y": 2
          },
          "targetMap": 2,
          "targetPosition": {
            "x": 0,
            "y": 0
          },
          "text": "You descend deeper into the earth..."
        }
      ]
    },
    {
      "id": 2,
      "name": "The Maze",
      "tiles": {
        "x2y1": {
          "x": 2,
          "y": 1
        },
        "x3y1": {
          "x": 3,
          "y": 1
        },
        "x4y1": {
          "x": 4,
          "y": 1
        },
        "x5y1": {
          "x": 5,
          "y": 1
        },
        "x2y2": {
          "x": 2,
          "y": 2
        },
        "x3y2": {
          "x": 3,
          "y": 2
        },
        "x5y2": {
          "x": 5,
          "y": 2
        },
        "x2y3": {
          "x": 2,
          "y": 3
        },
        "x3y3": {
          "x": 3,
          "y": 3
        },
        "x5y3": {
          "x": 5,
          "y": 3
        },
        "x5y4": {
          "x": 5,
          "y": 4
        },
        "x3y4": {
          "x": 3,
          "y": 4
        },
        "x2y5": {
          "x": 2,
          "y": 5
        },
        "x3y5": {
          "x": 3,
          "y": 5
        },
        "x4y5": {
          "x": 4,
          "y": 5,
          "splash": {
            "image": "mole_dialog.png",
            "text": "Hark, thou foolish child! Thou hast wandered into mine own domain!\nBwa ha ha! Now shalt thou know the meaning of true despair!",
            "shake": true
          }
        },
        "x5y5": {
          "x": 5,
          "y": 5
        },
        "x11y1": {
          "x": 11,
          "y": 1
        },
        "x12y1": {
          "x": 12,
          "y": 1
        },
        "x13y1": {
          "x": 13,
          "y": 1
        },
        "x14y1": {
          "x": 14,
          "y": 1
        },
        "x11y2": {
          "x": 11,
          "y": 2
        },
        "x13y2": {
          "x": 13,
          "y": 2
        },
        "x14y2": {
          "x": 14,
          "y": 2
        },
        "x11y3": {
          "x": 11,
          "y": 3
        },
        "x12y3": {
          "x": 12,
          "y": 3
        },
        "x13y3": {
          "x": 13,
          "y": 3
        },
        "x14y3": {
          "x": 14,
          "y": 3
        },
        "x11y4": {
          "x": 11,
          "y": 4
        },
        "x13y4": {
          "x": 13,
          "y": 4
        },
        "x14y4": {
          "x": 14,
          "y": 4
        },
        "x11y5": {
          "x": 11,
          "y": 5
        },
        "x12y5": {
          "x": 12,
          "y": 5
        },
        "x13y5": {
          "x": 13,
          "y": 5
        },
        "x14y5": {
          "x": 14,
          "y": 5
        },
        "x2y9": {
          "x": 2,
          "y": 9
        },
        "x3y9": {
          "x": 3,
          "y": 9
        },
        "x4y9": {
          "x": 4,
          "y": 9
        },
        "x5y9": {
          "x": 5,
          "y": 9
        },
        "x2y10": {
          "x": 2,
          "y": 10
        },
        "x4y10": {
          "x": 4,
          "y": 10
        },
        "x5y10": {
          "x": 5,
          "y": 10
        },
        "x2y11": {
          "x": 2,
          "y": 11
        },
        "x3y11": {
          "x": 3,
          "y": 11
        },
        "x4y11": {
          "x": 4,
          "y": 11
        },
        "x5y11": {
          "x": 5,
          "y": 11
        },
        "x2y12": {
          "x": 2,
          "y": 12
        },
        "x3y12": {
          "x": 3,
          "y": 12
        },
        "x4y12": {
          "x": 4,
          "y": 12
        },
        "x5y12": {
          "x": 5,
          "y": 12
        }
      },
      "monsters": [],
      "obstacles": [],
      "npcs": [
        {
          "type": 4,
          "position": {
            "x": 0,
            "y": 0
          },
          "destPos": {},
          "dialogOptions": [
            {
              "id": "moleq1",
              "available": true,
              "text": "The mole sniffs the air and turns away, uninterested.",
              "options": [
                {
                  "id": "molea1",
                  "text": "Leave",
                  "available": true
                },
                {
                  "id": "molea1q",
                  "text": "Excuse me? I'm trying to talk to you.",
                  "available": true,
                  "opens": [
                    "moleq2"
                  ],
                  "closes": [
                    "moleq1"
                  ],
                  "chains": [
                    "moleq2"
                  ]
                }
              ]
            },
            {
              "id": "moleq2",
              "available": false,
              "text": "Hark, thou dost vex me with thy ceaseless prattle! What wouldst thou have of me, creeping thing? Thou interruptest the sacred labour of my paws!",
              "options": [
                {
                  "id": "molea2e",
                  "text": "I'm sorry, I didn't catch that...",
                  "available": true,
                  "opens": [
                    "moleq3"
                  ],
                  "closes": [
                    "moleq2"
                  ],
                  "chains": [
                    "moleq3"
                  ]
                },
                {
                  "id": "molea2l",
                  "text": "I'll leave you alone.",
                  "available": true,
                  "closes": [
                    "moleq2"
                  ]
                }
              ]
            },
            {
              "id": "moleq3",
              "available": false,
              "text": "Fie upon thee! Thou comest hither with thy idle chatter whilst I seek the herbs of sight. The hermit thinks them his, but I have tunnelled every league of this earth! They are mine by right of toil, not his miserly keeping!",
              "options": [
                {
                  "id": "molea3e",
                  "text": "Wait, you mean the hermit's herbs?",
                  "available": true,
                  "opens": [
                    "moleq4"
                  ],
                  "closes": [
                    "moleq3"
                  ],
                  "chains": [
                    "moleq4"
                  ]
                },
                {
                  "id": "molea3l",
                  "text": "You're a strange creature.",
                  "available": true,
                  "closes": [
                    "moleq3"
                  ]
                }
              ]
            },
            {
              "id": "moleq4",
              "available": false,
              "text": "Ay, the same! He hoards them like a dragon with coin, whilst I - I - dig through the cold earth in search of but a single leaf! But my tunnels grow deeper by the day, and soon, soon they shall all be mine. Now cease thy prating - I have earth to move.",
              "options": [
                {
                  "id": "molea4",
                  "text": "Good luck with that...",
                  "available": true,
                  "closes": [
                    "moleq4"
                  ]
                }
              ]
            }
          ]
        }
      ],
      "exits": [
        {
          "position": {
            "x": 5,
            "y": 5
          },
          "targetMap": 1,
          "targetPosition": {
            "x": 9,
            "y": 2
          },
          "text": "You climb back up the stairs..."
        },
        {
          "position": {
            "x": 14,
            "y": 5
          },
          "targetMap": 1,
          "targetPosition": {
            "x": 9,
            "y": 2
          },
          "text": "You climb back up the stairs..."
        },
        {
          "position": {
            "x": 5,
            "y": 12
          },
          "targetMap": 1,
          "targetPosition": {
            "x": 9,
            "y": 2
          },
          "text": "You climb back up the stairs..."
        }
      ]
    }
  ]
};
