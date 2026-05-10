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
    },
    "9": {
      "name": "Pushable Rock",
      "description": "A heavy rock that can be pushed",
      "color": "#433900",
      "icon": "rock.png",
      "blocking": true,
      "choiceEvents": [
        1,
        2,
        3
      ]
    },
    "10": {
      "name": "Gem",
      "description": "A sparkling gem",
      "color": "#70A4B2",
      "icon": "gem.png",
      "blocking": false,
      "choiceEvents": []
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
        "x8y3": {
          "x": 8,
          "y": 3
        },
        "x5y4": {
          "x": 5,
          "y": 4
        },
        "x6y4": {
          "x": 6,
          "y": 4
        },
        "x7y4": {
          "x": 7,
          "y": 4
        },
        "x8y4": {
          "x": 8,
          "y": 4,
          "text": "Just a glimmering rock."
        },
        "x9y4": {
          "x": 9,
          "y": 4
        },
        "x17y4": {
          "x": 17,
          "y": 4
        },
        "x18y4": {
          "x": 18,
          "y": 4
        },
        "x19y4": {
          "x": 19,
          "y": 4
        },
        "x20y4": {
          "x": 20,
          "y": 4
        },
        "x21y4": {
          "x": 21,
          "y": 4
        },
        "x27y4": {
          "x": 27,
          "y": 4,
          "text": "Just a glimmering rock."
        },
        "x28y4": {
          "x": 28,
          "y": 4
        },
        "x29y4": {
          "x": 29,
          "y": 4
        },
        "x30y4": {
          "x": 30,
          "y": 4
        },
        "x31y4": {
          "x": 31,
          "y": 4
        },
        "x39y4": {
          "x": 39,
          "y": 4
        },
        "x40y4": {
          "x": 40,
          "y": 4,
          "text": "Just a glimmering rock."
        },
        "x41y4": {
          "x": 41,
          "y": 4
        },
        "x42y4": {
          "x": 42,
          "y": 4
        },
        "x43y4": {
          "x": 43,
          "y": 4
        },
        "x5y5": {
          "x": 5,
          "y": 5
        },
        "x6y5": {
          "x": 6,
          "y": 5
        },
        "x7y5": {
          "x": 7,
          "y": 5
        },
        "x8y5": {
          "x": 8,
          "y": 5
        },
        "x9y5": {
          "x": 9,
          "y": 5,
          "text": "Just a glimmering rock."
        },
        "x17y5": {
          "x": 17,
          "y": 5
        },
        "x18y5": {
          "x": 18,
          "y": 5
        },
        "x19y5": {
          "x": 19,
          "y": 5
        },
        "x20y5": {
          "x": 20,
          "y": 5,
          "text": "Just a glimmering rock."
        },
        "x21y5": {
          "x": 21,
          "y": 5
        },
        "x27y5": {
          "x": 27,
          "y": 5
        },
        "x28y5": {
          "x": 28,
          "y": 5
        },
        "x29y5": {
          "x": 29,
          "y": 5
        },
        "x30y5": {
          "x": 30,
          "y": 5
        },
        "x31y5": {
          "x": 31,
          "y": 5
        },
        "x39y5": {
          "x": 39,
          "y": 5
        },
        "x40y5": {
          "x": 40,
          "y": 5
        },
        "x41y5": {
          "x": 41,
          "y": 5
        },
        "x42y5": {
          "x": 42,
          "y": 5
        },
        "x43y5": {
          "x": 43,
          "y": 5
        },
        "x5y6": {
          "x": 5,
          "y": 6
        },
        "x6y6": {
          "x": 6,
          "y": 6
        },
        "x7y6": {
          "x": 7,
          "y": 6,
          "text": "A sparkling gem draws you closer...",
          "splash": {
            "image": "mole_dialog.png",
            "text": "Hark, thou foolish child! Thou hast wandered into mine own domain!\\nBwa ha ha! Now shalt thou know the meaning of true despair!",
            "shake": true,
            "rockDrop": [
              {
                "dx": 0,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 0
              },
              {
                "dx": 0,
                "dy": 1
              },
              {
                "dx": -1,
                "dy": 0
              },
              {
                "dx": -1,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 1
              }
            ],
            "moleTeleport": {
              "x": 17,
              "y": 7
            }
          }
        },
        "x8y6": {
          "x": 8,
          "y": 6
        },
        "x9y6": {
          "x": 9,
          "y": 6
        },
        "x17y6": {
          "x": 17,
          "y": 6
        },
        "x18y6": {
          "x": 18,
          "y": 6
        },
        "x19y6": {
          "x": 19,
          "y": 6,
          "text": "A sparkling gem draws you closer...",
          "splash": {
            "image": "mole_dialog.png",
            "text": "Didst thou truly believe fortune would favour thee twice?\nThese walls of stone shall be thy cage!",
            "shake": true,
            "rockDrop": [
              {
                "dx": 0,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 0
              },
              {
                "dx": 0,
                "dy": 1
              },
              {
                "dx": -1,
                "dy": 0
              },
              {
                "dx": -1,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 1
              }
            ],
            "moleTeleport": {
              "x": 10,
              "y": 16
            }
          }
        },
        "x20y6": {
          "x": 20,
          "y": 6
        },
        "x21y6": {
          "x": 21,
          "y": 6
        },
        "x26y6": {
          "x": 26,
          "y": 6
        },
        "x27y6": {
          "x": 27,
          "y": 6
        },
        "x28y6": {
          "x": 28,
          "y": 6
        },
        "x29y6": {
          "x": 29,
          "y": 6,
          "text": "A sparkling gem draws you closer...",
          "splash": {
            "image": "mole_dialog.png",
            "text": "Thou art caught in my snare once more!\nThe stones shall hold thee fast, thou meddling imp!",
            "shake": true,
            "rockDrop": [
              {
                "dx": 0,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 0
              },
              {
                "dx": 0,
                "dy": 1
              },
              {
                "dx": -1,
                "dy": 0
              },
              {
                "dx": -1,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 1
              }
            ],
            "moleTeleport": {
              "x": 32,
              "y": 18
            }
          }
        },
        "x30y6": {
          "x": 30,
          "y": 6
        },
        "x31y6": {
          "x": 31,
          "y": 6
        },
        "x39y6": {
          "x": 39,
          "y": 6
        },
        "x40y6": {
          "x": 40,
          "y": 6
        },
        "x41y6": {
          "x": 41,
          "y": 6
        },
        "x42y6": {
          "x": 42,
          "y": 6
        },
        "x43y6": {
          "x": 43,
          "y": 6
        },
        "x5y7": {
          "x": 5,
          "y": 7
        },
        "x6y7": {
          "x": 6,
          "y": 7
        },
        "x7y7": {
          "x": 7,
          "y": 7
        },
        "x8y7": {
          "x": 8,
          "y": 7
        },
        "x9y7": {
          "x": 9,
          "y": 7
        },
        "x17y7": {
          "x": 17,
          "y": 7
        },
        "x18y7": {
          "x": 18,
          "y": 7
        },
        "x19y7": {
          "x": 19,
          "y": 7
        },
        "x20y7": {
          "x": 20,
          "y": 7
        },
        "x21y7": {
          "x": 21,
          "y": 7
        },
        "x27y7": {
          "x": 27,
          "y": 7
        },
        "x28y7": {
          "x": 28,
          "y": 7
        },
        "x29y7": {
          "x": 29,
          "y": 7
        },
        "x30y7": {
          "x": 30,
          "y": 7
        },
        "x31y7": {
          "x": 31,
          "y": 7
        },
        "x39y7": {
          "x": 39,
          "y": 7
        },
        "x40y7": {
          "x": 40,
          "y": 7
        },
        "x41y7": {
          "x": 41,
          "y": 7
        },
        "x42y7": {
          "x": 42,
          "y": 7
        },
        "x43y7": {
          "x": 43,
          "y": 7
        },
        "x5y8": {
          "x": 5,
          "y": 8
        },
        "x6y8": {
          "x": 6,
          "y": 8
        },
        "x7y8": {
          "x": 7,
          "y": 8
        },
        "x8y8": {
          "x": 8,
          "y": 8
        },
        "x9y8": {
          "x": 9,
          "y": 8
        },
        "x14y8": {
          "x": 14,
          "y": 8
        },
        "x15y8": {
          "x": 15,
          "y": 8
        },
        "x17y8": {
          "x": 17,
          "y": 8
        },
        "x18y8": {
          "x": 18,
          "y": 8
        },
        "x19y8": {
          "x": 19,
          "y": 8
        },
        "x20y8": {
          "x": 20,
          "y": 8
        },
        "x21y8": {
          "x": 21,
          "y": 8
        },
        "x27y8": {
          "x": 27,
          "y": 8
        },
        "x28y8": {
          "x": 28,
          "y": 8
        },
        "x29y8": {
          "x": 29,
          "y": 8
        },
        "x30y8": {
          "x": 30,
          "y": 8
        },
        "x31y8": {
          "x": 31,
          "y": 8
        },
        "x38y8": {
          "x": 38,
          "y": 8
        },
        "x39y8": {
          "x": 39,
          "y": 8
        },
        "x40y8": {
          "x": 40,
          "y": 8
        },
        "x41y8": {
          "x": 41,
          "y": 8
        },
        "x42y8": {
          "x": 42,
          "y": 8
        },
        "x43y8": {
          "x": 43,
          "y": 8
        },
        "x7y9": {
          "x": 7,
          "y": 9
        },
        "x12y9": {
          "x": 12,
          "y": 9
        },
        "x14y9": {
          "x": 14,
          "y": 9
        },
        "x19y9": {
          "x": 19,
          "y": 9
        },
        "x29y9": {
          "x": 29,
          "y": 9
        },
        "x41y9": {
          "x": 41,
          "y": 9
        },
        "x2y10": {
          "x": 2,
          "y": 10
        },
        "x3y10": {
          "x": 3,
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
        "x6y10": {
          "x": 6,
          "y": 10
        },
        "x7y10": {
          "x": 7,
          "y": 10
        },
        "x8y10": {
          "x": 8,
          "y": 10
        },
        "x9y10": {
          "x": 9,
          "y": 10
        },
        "x10y10": {
          "x": 10,
          "y": 10
        },
        "x11y10": {
          "x": 11,
          "y": 10
        },
        "x12y10": {
          "x": 12,
          "y": 10
        },
        "x13y10": {
          "x": 13,
          "y": 10
        },
        "x14y10": {
          "x": 14,
          "y": 10
        },
        "x15y10": {
          "x": 15,
          "y": 10
        },
        "x16y10": {
          "x": 16,
          "y": 10
        },
        "x17y10": {
          "x": 17,
          "y": 10
        },
        "x18y10": {
          "x": 18,
          "y": 10
        },
        "x19y10": {
          "x": 19,
          "y": 10
        },
        "x20y10": {
          "x": 20,
          "y": 10
        },
        "x21y10": {
          "x": 21,
          "y": 10
        },
        "x24y10": {
          "x": 24,
          "y": 10
        },
        "x25y10": {
          "x": 25,
          "y": 10
        },
        "x26y10": {
          "x": 26,
          "y": 10
        },
        "x27y10": {
          "x": 27,
          "y": 10
        },
        "x28y10": {
          "x": 28,
          "y": 10
        },
        "x29y10": {
          "x": 29,
          "y": 10
        },
        "x30y10": {
          "x": 30,
          "y": 10
        },
        "x31y10": {
          "x": 31,
          "y": 10
        },
        "x32y10": {
          "x": 32,
          "y": 10
        },
        "x33y10": {
          "x": 33,
          "y": 10
        },
        "x34y10": {
          "x": 34,
          "y": 10
        },
        "x35y10": {
          "x": 35,
          "y": 10
        },
        "x36y10": {
          "x": 36,
          "y": 10
        },
        "x37y10": {
          "x": 37,
          "y": 10
        },
        "x38y10": {
          "x": 38,
          "y": 10
        },
        "x39y10": {
          "x": 39,
          "y": 10
        },
        "x40y10": {
          "x": 40,
          "y": 10
        },
        "x41y10": {
          "x": 41,
          "y": 10
        },
        "x42y10": {
          "x": 42,
          "y": 10
        },
        "x43y10": {
          "x": 43,
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
        "x6y11": {
          "x": 6,
          "y": 11
        },
        "x7y11": {
          "x": 7,
          "y": 11
        },
        "x8y11": {
          "x": 8,
          "y": 11
        },
        "x9y11": {
          "x": 9,
          "y": 11
        },
        "x10y11": {
          "x": 10,
          "y": 11
        },
        "x11y11": {
          "x": 11,
          "y": 11
        },
        "x12y11": {
          "x": 12,
          "y": 11
        },
        "x13y11": {
          "x": 13,
          "y": 11
        },
        "x14y11": {
          "x": 14,
          "y": 11
        },
        "x15y11": {
          "x": 15,
          "y": 11
        },
        "x16y11": {
          "x": 16,
          "y": 11
        },
        "x17y11": {
          "x": 17,
          "y": 11
        },
        "x18y11": {
          "x": 18,
          "y": 11
        },
        "x19y11": {
          "x": 19,
          "y": 11
        },
        "x20y11": {
          "x": 20,
          "y": 11
        },
        "x21y11": {
          "x": 21,
          "y": 11
        },
        "x24y11": {
          "x": 24,
          "y": 11
        },
        "x25y11": {
          "x": 25,
          "y": 11
        },
        "x26y11": {
          "x": 26,
          "y": 11
        },
        "x27y11": {
          "x": 27,
          "y": 11
        },
        "x28y11": {
          "x": 28,
          "y": 11
        },
        "x29y11": {
          "x": 29,
          "y": 11
        },
        "x30y11": {
          "x": 30,
          "y": 11
        },
        "x31y11": {
          "x": 31,
          "y": 11
        },
        "x32y11": {
          "x": 32,
          "y": 11
        },
        "x33y11": {
          "x": 33,
          "y": 11
        },
        "x34y11": {
          "x": 34,
          "y": 11
        },
        "x35y11": {
          "x": 35,
          "y": 11
        },
        "x36y11": {
          "x": 36,
          "y": 11
        },
        "x37y11": {
          "x": 37,
          "y": 11
        },
        "x38y11": {
          "x": 38,
          "y": 11
        },
        "x39y11": {
          "x": 39,
          "y": 11
        },
        "x40y11": {
          "x": 40,
          "y": 11
        },
        "x41y11": {
          "x": 41,
          "y": 11
        },
        "x42y11": {
          "x": 42,
          "y": 11
        },
        "x43y11": {
          "x": 43,
          "y": 11
        },
        "x5y12": {
          "x": 5,
          "y": 12
        },
        "x7y12": {
          "x": 7,
          "y": 12
        },
        "x9y12": {
          "x": 9,
          "y": 12
        },
        "x16y12": {
          "x": 16,
          "y": 12
        },
        "x26y12": {
          "x": 26,
          "y": 12
        },
        "x41y12": {
          "x": 41,
          "y": 12
        },
        "x5y13": {
          "x": 5,
          "y": 13
        },
        "x9y13": {
          "x": 9,
          "y": 13
        },
        "x26y13": {
          "x": 26,
          "y": 13
        },
        "x41y13": {
          "x": 41,
          "y": 13
        },
        "x9y14": {
          "x": 9,
          "y": 14
        },
        "x26y14": {
          "x": 26,
          "y": 14
        },
        "x41y14": {
          "x": 41,
          "y": 14
        },
        "x9y15": {
          "x": 9,
          "y": 15
        },
        "x26y15": {
          "x": 26,
          "y": 15
        },
        "x32y15": {
          "x": 32,
          "y": 15
        },
        "x41y15": {
          "x": 41,
          "y": 15
        },
        "x10y16": {
          "x": 10,
          "y": 16
        },
        "x11y16": {
          "x": 11,
          "y": 16
        },
        "x12y16": {
          "x": 12,
          "y": 16
        },
        "x13y16": {
          "x": 13,
          "y": 16,
          "text": "Just a glimmering rock."
        },
        "x14y16": {
          "x": 14,
          "y": 16
        },
        "x26y16": {
          "x": 26,
          "y": 16
        },
        "x32y16": {
          "x": 32,
          "y": 16
        },
        "x33y16": {
          "x": 33,
          "y": 16
        },
        "x34y16": {
          "x": 34,
          "y": 16
        },
        "x35y16": {
          "x": 35,
          "y": 16
        },
        "x36y16": {
          "x": 36,
          "y": 16
        },
        "x37y16": {
          "x": 37,
          "y": 16
        },
        "x41y16": {
          "x": 41,
          "y": 16
        },
        "x10y17": {
          "x": 10,
          "y": 17
        },
        "x11y17": {
          "x": 11,
          "y": 17,
          "text": "Just a glimmering rock."
        },
        "x12y17": {
          "x": 12,
          "y": 17
        },
        "x13y17": {
          "x": 13,
          "y": 17,
          "text": "Just a glimmering rock."
        },
        "x14y17": {
          "x": 14,
          "y": 17,
          "text": "Just a glimmering rock."
        },
        "x32y17": {
          "x": 32,
          "y": 17
        },
        "x33y17": {
          "x": 33,
          "y": 17
        },
        "x34y17": {
          "x": 34,
          "y": 17
        },
        "x35y17": {
          "x": 35,
          "y": 17,
          "text": "Just a glimmering rock."
        },
        "x36y17": {
          "x": 36,
          "y": 17
        },
        "x10y18": {
          "x": 10,
          "y": 18,
          "text": "Just a glimmering rock."
        },
        "x11y18": {
          "x": 11,
          "y": 18
        },
        "x12y18": {
          "x": 12,
          "y": 18
        },
        "x13y18": {
          "x": 13,
          "y": 18
        },
        "x14y18": {
          "x": 14,
          "y": 18
        },
        "x32y18": {
          "x": 32,
          "y": 18
        },
        "x33y18": {
          "x": 33,
          "y": 18
        },
        "x34y18": {
          "x": 34,
          "y": 18,
          "text": "A sparkling gem draws you closer...",
          "splash": {
            "image": "mole_dialog.png",
            "text": "Forsooth, thou art persistent!\nBut grit alone shall not free thee from this prison!",
            "shake": true,
            "rockDrop": [
              {
                "dx": 0,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 0
              },
              {
                "dx": 0,
                "dy": 1
              },
              {
                "dx": -1,
                "dy": 0
              },
              {
                "dx": -1,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 1
              }
            ],
            "moleTeleport": {
              "x": 27,
              "y": 5
            }
          }
        },
        "x35y18": {
          "x": 35,
          "y": 18
        },
        "x36y18": {
          "x": 36,
          "y": 18
        },
        "x10y19": {
          "x": 10,
          "y": 19
        },
        "x11y19": {
          "x": 11,
          "y": 19
        },
        "x12y19": {
          "x": 12,
          "y": 19
        },
        "x13y19": {
          "x": 13,
          "y": 19
        },
        "x14y19": {
          "x": 14,
          "y": 19
        },
        "x32y19": {
          "x": 32,
          "y": 19
        },
        "x33y19": {
          "x": 33,
          "y": 19,
          "text": "Just a glimmering rock."
        },
        "x34y19": {
          "x": 34,
          "y": 19
        },
        "x35y19": {
          "x": 35,
          "y": 19
        },
        "x36y19": {
          "x": 36,
          "y": 19
        },
        "x10y20": {
          "x": 10,
          "y": 20
        },
        "x11y20": {
          "x": 11,
          "y": 20
        },
        "x12y20": {
          "x": 12,
          "y": 20
        },
        "x13y20": {
          "x": 13,
          "y": 20
        },
        "x14y20": {
          "x": 14,
          "y": 20
        },
        "x32y20": {
          "x": 32,
          "y": 20
        },
        "x33y20": {
          "x": 33,
          "y": 20,
          "text": "Just a glimmering rock."
        },
        "x34y20": {
          "x": 34,
          "y": 20
        },
        "x35y20": {
          "x": 35,
          "y": 20
        },
        "x36y20": {
          "x": 36,
          "y": 20
        },
        "x7y25": {
          "x": 7,
          "y": 25
        },
        "x21y25": {
          "x": 21,
          "y": 25
        },
        "x5y26": {
          "x": 5,
          "y": 26
        },
        "x6y26": {
          "x": 6,
          "y": 26
        },
        "x7y26": {
          "x": 7,
          "y": 26
        },
        "x8y26": {
          "x": 8,
          "y": 26
        },
        "x9y26": {
          "x": 9,
          "y": 26
        },
        "x17y26": {
          "x": 17,
          "y": 26
        },
        "x18y26": {
          "x": 18,
          "y": 26
        },
        "x19y26": {
          "x": 19,
          "y": 26
        },
        "x20y26": {
          "x": 20,
          "y": 26
        },
        "x21y26": {
          "x": 21,
          "y": 26
        },
        "x5y27": {
          "x": 5,
          "y": 27
        },
        "x6y27": {
          "x": 6,
          "y": 27
        },
        "x7y27": {
          "x": 7,
          "y": 27
        },
        "x8y27": {
          "x": 8,
          "y": 27
        },
        "x9y27": {
          "x": 9,
          "y": 27
        },
        "x17y27": {
          "x": 17,
          "y": 27
        },
        "x18y27": {
          "x": 18,
          "y": 27
        },
        "x19y27": {
          "x": 19,
          "y": 27
        },
        "x20y27": {
          "x": 20,
          "y": 27
        },
        "x21y27": {
          "x": 21,
          "y": 27
        },
        "x5y28": {
          "x": 5,
          "y": 28
        },
        "x6y28": {
          "x": 6,
          "y": 28
        },
        "x7y28": {
          "x": 7,
          "y": 28,
          "text": "A sparkling gem draws you closer...",
          "splash": {
            "image": "mole_dialog.png",
            "text": "Five times now thou dost trespass!\nMy tunnels grow weary of thy meddlesome feet!",
            "shake": true,
            "rockDrop": [
              {
                "dx": 0,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 0
              },
              {
                "dx": 0,
                "dy": 1
              },
              {
                "dx": -1,
                "dy": 0
              },
              {
                "dx": -1,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 1
              }
            ],
            "moleTeleport": {
              "x": 21,
              "y": 27
            }
          }
        },
        "x8y28": {
          "x": 8,
          "y": 28
        },
        "x9y28": {
          "x": 9,
          "y": 28
        },
        "x17y28": {
          "x": 17,
          "y": 28
        },
        "x18y28": {
          "x": 18,
          "y": 28
        },
        "x19y28": {
          "x": 19,
          "y": 28,
          "text": "A sparkling gem draws you closer...",
          "splash": {
            "image": "mole_dialog.png",
            "text": "One final snare awaits, child!\nLet us see if thou canst outwit the Mole himself!",
            "shake": true,
            "rockDrop": [
              {
                "dx": 0,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 0
              },
              {
                "dx": 0,
                "dy": 1
              },
              {
                "dx": -1,
                "dy": 0
              },
              {
                "dx": -1,
                "dy": -1
              },
              {
                "dx": 1,
                "dy": 1
              }
            ],
            "moleTeleport": {
              "x": 18,
              "y": 28
            }
          }
        },
        "x20y28": {
          "x": 20,
          "y": 28
        },
        "x21y28": {
          "x": 21,
          "y": 28
        },
        "x5y29": {
          "x": 5,
          "y": 29
        },
        "x6y29": {
          "x": 6,
          "y": 29
        },
        "x7y29": {
          "x": 7,
          "y": 29
        },
        "x8y29": {
          "x": 8,
          "y": 29
        },
        "x9y29": {
          "x": 9,
          "y": 29
        },
        "x16y29": {
          "x": 16,
          "y": 29
        },
        "x17y29": {
          "x": 17,
          "y": 29
        },
        "x18y29": {
          "x": 18,
          "y": 29
        },
        "x19y29": {
          "x": 19,
          "y": 29
        },
        "x20y29": {
          "x": 20,
          "y": 29
        },
        "x21y29": {
          "x": 21,
          "y": 29
        },
        "x4y30": {
          "x": 4,
          "y": 30
        },
        "x5y30": {
          "x": 5,
          "y": 30
        },
        "x6y30": {
          "x": 6,
          "y": 30
        },
        "x7y30": {
          "x": 7,
          "y": 30
        },
        "x8y30": {
          "x": 8,
          "y": 30
        },
        "x9y30": {
          "x": 9,
          "y": 30
        },
        "x14y30": {
          "x": 14,
          "y": 30
        },
        "x17y30": {
          "x": 17,
          "y": 30
        },
        "x18y30": {
          "x": 18,
          "y": 30
        },
        "x19y30": {
          "x": 19,
          "y": 30
        },
        "x20y30": {
          "x": 20,
          "y": 30
        },
        "x21y30": {
          "x": 21,
          "y": 30
        },
        "x7y31": {
          "x": 7,
          "y": 31
        },
        "x14y31": {
          "x": 14,
          "y": 31
        },
        "x19y31": {
          "x": 19,
          "y": 31
        },
        "x2y32": {
          "x": 2,
          "y": 32
        },
        "x3y32": {
          "x": 3,
          "y": 32
        },
        "x4y32": {
          "x": 4,
          "y": 32
        },
        "x5y32": {
          "x": 5,
          "y": 32
        },
        "x6y32": {
          "x": 6,
          "y": 32
        },
        "x7y32": {
          "x": 7,
          "y": 32
        },
        "x8y32": {
          "x": 8,
          "y": 32
        },
        "x9y32": {
          "x": 9,
          "y": 32
        },
        "x10y32": {
          "x": 10,
          "y": 32
        },
        "x11y32": {
          "x": 11,
          "y": 32
        },
        "x12y32": {
          "x": 12,
          "y": 32
        },
        "x13y32": {
          "x": 13,
          "y": 32
        },
        "x14y32": {
          "x": 14,
          "y": 32
        },
        "x15y32": {
          "x": 15,
          "y": 32
        },
        "x16y32": {
          "x": 16,
          "y": 32
        },
        "x17y32": {
          "x": 17,
          "y": 32
        },
        "x18y32": {
          "x": 18,
          "y": 32
        },
        "x19y32": {
          "x": 19,
          "y": 32
        },
        "x20y32": {
          "x": 20,
          "y": 32
        },
        "x21y32": {
          "x": 21,
          "y": 32
        },
        "x2y33": {
          "x": 2,
          "y": 33
        },
        "x3y33": {
          "x": 3,
          "y": 33
        },
        "x4y33": {
          "x": 4,
          "y": 33
        },
        "x5y33": {
          "x": 5,
          "y": 33
        },
        "x6y33": {
          "x": 6,
          "y": 33
        },
        "x7y33": {
          "x": 7,
          "y": 33
        },
        "x8y33": {
          "x": 8,
          "y": 33
        },
        "x9y33": {
          "x": 9,
          "y": 33
        },
        "x10y33": {
          "x": 10,
          "y": 33
        },
        "x11y33": {
          "x": 11,
          "y": 33
        },
        "x12y33": {
          "x": 12,
          "y": 33
        },
        "x13y33": {
          "x": 13,
          "y": 33
        },
        "x14y33": {
          "x": 14,
          "y": 33
        },
        "x15y33": {
          "x": 15,
          "y": 33
        },
        "x16y33": {
          "x": 16,
          "y": 33
        },
        "x17y33": {
          "x": 17,
          "y": 33
        },
        "x18y33": {
          "x": 18,
          "y": 33
        },
        "x19y33": {
          "x": 19,
          "y": 33
        },
        "x20y33": {
          "x": 20,
          "y": 33
        },
        "x21y33": {
          "x": 21,
          "y": 33
        },
        "x4y34": {
          "x": 4,
          "y": 34
        },
        "x8y34": {
          "x": 8,
          "y": 34
        },
        "x4y35": {
          "x": 4,
          "y": 35
        },
        "x4y36": {
          "x": 4,
          "y": 36
        },
        "x4y37": {
          "x": 4,
          "y": 37
        },
        "x4y38": {
          "x": 4,
          "y": 38
        },
        "x9y38": {
          "x": 9,
          "y": 38
        },
        "x10y38": {
          "x": 10,
          "y": 38
        },
        "x11y38": {
          "x": 11,
          "y": 38
        },
        "x12y38": {
          "x": 12,
          "y": 38
        },
        "x13y38": {
          "x": 13,
          "y": 38
        },
        "x14y38": {
          "x": 14,
          "y": 38
        },
        "x10y39": {
          "x": 10,
          "y": 39
        },
        "x11y39": {
          "x": 11,
          "y": 39
        },
        "x12y39": {
          "x": 12,
          "y": 39
        },
        "x13y39": {
          "x": 13,
          "y": 39
        },
        "x14y39": {
          "x": 14,
          "y": 39
        },
        "x10y40": {
          "x": 10,
          "y": 40
        },
        "x11y40": {
          "x": 11,
          "y": 40
        },
        "x12y40": {
          "x": 12,
          "y": 40
        },
        "x13y40": {
          "x": 13,
          "y": 40
        },
        "x14y40": {
          "x": 14,
          "y": 40
        },
        "x10y41": {
          "x": 10,
          "y": 41
        },
        "x11y41": {
          "x": 11,
          "y": 41
        },
        "x12y41": {
          "x": 12,
          "y": 41
        },
        "x13y41": {
          "x": 13,
          "y": 41
        },
        "x14y41": {
          "x": 14,
          "y": 41
        },
        "x15y41": {
          "x": 15,
          "y": 41
        },
        "x10y42": {
          "x": 10,
          "y": 42
        },
        "x11y42": {
          "x": 11,
          "y": 42
        },
        "x12y42": {
          "x": 12,
          "y": 42
        },
        "x13y42": {
          "x": 13,
          "y": 42
        },
        "x14y42": {
          "x": 14,
          "y": 42
        },
        "x10y15": {
          "x": 10,
          "y": 15
        },
        "x8y35": {
          "x": 8,
          "y": 35
        },
        "x8y36": {
          "x": 8,
          "y": 36
        },
        "x8y37": {
          "x": 8,
          "y": 37
        },
        "x8y38": {
          "x": 8,
          "y": 38
        },
        "x23y36": {
          "x": 23,
          "y": 36
        },
        "x27y16": {
          "x": 27,
          "y": 16
        },
        "x28y16": {
          "x": 28,
          "y": 16
        },
        "x29y16": {
          "x": 29,
          "y": 16
        },
        "x30y16": {
          "x": 30,
          "y": 16
        },
        "x31y16": {
          "x": 31,
          "y": 16
        },
        "x38y16": {
          "x": 38,
          "y": 16
        },
        "x40y16": {
          "x": 40,
          "y": 16
        },
        "x39y16": {
          "x": 39,
          "y": 16
        },
        "x32y14": {
          "x": 32,
          "y": 14
        },
        "x32y13": {
          "x": 32,
          "y": 13
        },
        "x32y12": {
          "x": 32,
          "y": 12
        },
        "x22y16": {
          "x": 22,
          "y": 16
        }
      },
      "monsters": [],
      "obstacles": [
        {
          "type": 10,
          "position": {
            "x": 8,
            "y": 4
          }
        },
        {
          "type": 10,
          "position": {
            "x": 9,
            "y": 5
          }
        },
        {
          "type": 10,
          "position": {
            "x": 20,
            "y": 5
          }
        },
        {
          "type": 10,
          "position": {
            "x": 7,
            "y": 6
          }
        },
        {
          "type": 10,
          "position": {
            "x": 19,
            "y": 6
          }
        },
        {
          "type": 10,
          "position": {
            "x": 13,
            "y": 16
          }
        },
        {
          "type": 10,
          "position": {
            "x": 11,
            "y": 17
          }
        },
        {
          "type": 10,
          "position": {
            "x": 13,
            "y": 17
          }
        },
        {
          "type": 10,
          "position": {
            "x": 14,
            "y": 17
          }
        },
        {
          "type": 10,
          "position": {
            "x": 10,
            "y": 18
          }
        },
        {
          "type": 10,
          "position": {
            "x": 27,
            "y": 4
          }
        },
        {
          "type": 10,
          "position": {
            "x": 40,
            "y": 4
          }
        },
        {
          "type": 10,
          "position": {
            "x": 29,
            "y": 6
          }
        },
        {
          "type": 10,
          "position": {
            "x": 35,
            "y": 17
          }
        },
        {
          "type": 10,
          "position": {
            "x": 34,
            "y": 18
          }
        },
        {
          "type": 10,
          "position": {
            "x": 33,
            "y": 19
          }
        },
        {
          "type": 10,
          "position": {
            "x": 33,
            "y": 20
          }
        },
        {
          "type": 10,
          "position": {
            "x": 7,
            "y": 28
          }
        },
        {
          "type": 10,
          "position": {
            "x": 19,
            "y": 28
          }
        }
      ],
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
            },
            {
              "id": "mole_trap",
              "available": false,
              "text": "What, thou hast escaped? By my whiskers! Thou art more cunning than I thought!",
              "options": [
                {
                  "id": "mole_trap_leave",
                  "text": "Your rocks won't stop me.",
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
            "x": 21,
            "y": 10
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
            "x": 24,
            "y": 10
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
            "x": 21,
            "y": 32
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
