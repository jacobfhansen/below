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
      "blocking": true,
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
    }
  },
  "mapData": [
    {
      "id": 0,
      "name": "Start",
      "exits": [
        {
          "position": { "x": 11, "y": 4 },
          "targetMap": 1,
          "targetPosition": { "x": 4, "y": 1 },
          "text": "You descend into the caves..."
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
            "x": -5,
            "y": 2
          },
          "status": 1,
          "destPos": {},
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
            "x": 7,
            "y": 2
          },
          "status": 1,
          "destPos": {}
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
            "x": -7,
            "y": 3
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
              "id": "hermitq1",
              "available": true,
              "text": "What brings you to my humble abode",
              "options": [
                {
                  "id": "hermita1",
                  "text": "I do not know",
                  "available": true,
                  "closes": []
                },
                {
                  "id": "hermita10",
                  "text": "Wow, goodbye",
                  "opens": [
                    "hermit_trade"
                  ],
                  "closes": [
                    "hermitq10"
                  ]
                }
              ]
            },
             {
               "id": "hermitq2",
               "available": true,
               "requiresItems": [4, 5],
               "text": "Ah, I see you have a key",
              "options": [
                {
                  "id": "hermita3",
                  "text": "Yes, what about it?",
                  "available": true,
                  "closes": [
                    "hermitq2"
                  ],
                  "opens": [
                    "hermitq10"
                  ],
                  "chains": [
                    "hermitq10"
                  ]
                },
                {
                  "id": "hermita4",
                  "text": "I am not supposed to talk to strangers",
                  "closes": [
                    "hermitq2"
                  ],
                  "opens": [
                    "hermitq3"
                  ],
                  "chains": [
                    "hermitq3"
                  ]
                }
              ]
            },
            {
              "id": "hermitq3",
              "available": false,
              "text": "But are you not interested in getting out of here?",
              "options": [
                {
                  "id": "hermita5",
                  "text": "Not realy, I like it here.",
                  "available": true,
                  "closes": [
                    "hermitq3"
                  ],
                  "opens": [
                    "hermitq4"
                  ],
                  "chains": [
                    "hermitq4"
                  ]
                },
                {
                  "id": "hermita6",
                  "text": "I am not supposed to talk to strangers",
                  "closes": [
                    "hermitq3"
                  ],
                  "opens": [
                    "hermitq4"
                  ],
                  "chains": [
                    "hermitq4"
                  ]
                }
              ]
            },
            {
              "id": "hermitq4",
              "available": false,
              "text": "Hm, but keys open up for new opportunities. Is that not interesting?",
              "options": [
                {
                  "id": "hermita7",
                  "text": "You are maybe right. Enlighten me",
                  "available": true,
                  "closes": [
                    "hermitq4"
                  ],
                  "opens": [
                    "hermitq10"
                  ],
                  "chains": [
                    "hermitq10"
                  ]
                },
                {
                  "id": "hermita8",
                  "text": "I am not supposed to talk to strangers",
                  "closes": [
                    "hermitq4"
                  ],
                  "opens": [
                    "hermitq5"
                  ],
                  "chains": [
                    "hermitq5"
                  ]
                }
              ]
            },
            {
              "id": "hermitq5",
              "available": false,
              "text": "I used to say that a lot to. Maybe that is why I am still here after all those years.",
              "options": [
                {
                  "id": "hermita9",
                  "text": "...",
                  "available": true,
                  "closes": [
                    "hermitq5"
                  ],
                  "opens": [
                    "hermitq2"
                  ]
                }
              ]
            },
            {
              "id": "hermitq10",
              "available": false,
              "text": "Keys can open many doors. Some lead to escape, others to deeper mysteries. The choice is yours.",
              "options": [
                {
                  "id": "hermita10",
                  "text": "Wow, goodbye",
                  "opens": [
                    "hermit_trade"
                  ],
                  "closes": [
                    "hermitq10"
                  ]
                }
              ]
            },
            {
              "id": "hermit_trade",
              "available": false,
              "requiresItems": [4, 5],
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
                  "closes": [
                    "hermit_trade"
                  ]
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
                  "opens": ["jesterq2"],
                  "closes": ["jesterq1"],
                  "chains": ["jesterq2"]
                },
                {
                  "id": "jestera1r",
                  "text": "Shut it, jester. Not in the mood.",
                  "available": true,
                  "opens": ["jesterq1"],
                  "closes": ["jesterq2", "jesterq3", "jesterq4", "jesterq5", "jesterq6", "jesterq7", "jesterq8"]
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
                  "opens": ["jesterq3"],
                  "closes": ["jesterq2"],
                  "chains": ["jesterq3"]
                },
                {
                  "id": "jestera2r",
                  "text": "You're insufferable.",
                  "available": true,
                  "opens": ["jesterq1"],
                  "closes": ["jesterq2", "jesterq3", "jesterq4", "jesterq5", "jesterq6", "jesterq7", "jesterq8"]
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
                  "opens": ["jesterq4"],
                  "closes": ["jesterq3"],
                  "chains": ["jesterq4"]
                },
                {
                  "id": "jestera3r",
                  "text": "Why would I tell YOU anything?",
                  "available": true,
                  "opens": ["jesterq1"],
                  "closes": ["jesterq2", "jesterq3", "jesterq4", "jesterq5", "jesterq6", "jesterq7", "jesterq8"]
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
                  "opens": ["jesterq5"],
                  "closes": ["jesterq4"],
                  "chains": ["jesterq5"]
                },
                {
                  "id": "jestera4r",
                  "text": "Sounds more interesting than you.",
                  "available": true,
                  "opens": ["jesterq1"],
                  "closes": ["jesterq2", "jesterq3", "jesterq4", "jesterq5", "jesterq6", "jesterq7", "jesterq8"]
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
                  "opens": ["jesterq6"],
                  "closes": ["jesterq5"],
                  "chains": ["jesterq6"]
                },
                {
                  "id": "jestera5r",
                  "text": "You're lying.",
                  "available": true,
                  "opens": ["jesterq1"],
                  "closes": ["jesterq2", "jesterq3", "jesterq4", "jesterq5", "jesterq6", "jesterq7", "jesterq8"]
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
                  "opens": ["jesterq7"],
                  "closes": ["jesterq6"],
                  "chains": ["jesterq7"]
                },
                {
                  "id": "jestera6r",
                  "text": "Magic herbs? Please.",
                  "available": true,
                  "opens": ["jesterq1"],
                  "closes": ["jesterq2", "jesterq3", "jesterq4", "jesterq5", "jesterq6", "jesterq7", "jesterq8"]
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
                  "opens": ["jesterq8"],
                  "closes": ["jesterq7"],
                  "chains": ["jesterq8"]
                },
                {
                  "id": "jestera7r",
                  "text": "You're insane.",
                  "available": true,
                  "opens": ["jesterq1"],
                  "closes": ["jesterq2", "jesterq3", "jesterq4", "jesterq5", "jesterq6", "jesterq7", "jesterq8"]
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
                  "closes": ["jesterq8"]
                },
                {
                  "id": "jestera8r",
                  "text": "Finally, some silence.",
                  "available": true,
                  "closes": ["jesterq8"]
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
      "exits": [
        {
          "position": { "x": 4, "y": 2 },
          "targetMap": 0,
          "targetPosition": { "x": 11, "y": 3 },
          "text": "You emerge from the caves..."
        }
      ],
      "tiles": {
        "x0y2": { "x": 0, "y": 2 },
        "x1y1": { "x": 1, "y": 1 },
        "x1y2": { "x": 1, "y": 2 },
        "x1y3": { "x": 1, "y": 3 },
        "x2y1": { "x": 2, "y": 1 },
        "x2y2": { "x": 2, "y": 2 },
        "x2y3": { "x": 2, "y": 3 },
        "x3y1": { "x": 3, "y": 1 },
        "x3y2": { "x": 3, "y": 2 },
        "x3y3": { "x": 3, "y": 3 },
        "x4y1": { "x": 4, "y": 1 },
        "x4y2": { "x": 4, "y": 2 },
        "x4y3": { "x": 4, "y": 3 },
        "x0y1": { "x": 0, "y": 1 },
        "x0y3": { "x": 0, "y": 3 }
      },
      "monsters": [
        {
          "type": 3,
          "position": { "x": 2, "y": 2 },
          "status": 1,
          "destPos": {}
        }
      ],
      "obstacles": [
        {
          "type": 1,
          "position": { "x": 3, "y": 2 }
        }
      ],
      "npcs": []
    }
  ]
};
