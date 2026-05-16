var belowGameData = {
  "mapZoom": 50,
  "mapLog": [],
  "showCoordinates": true,
  "dialogInterval": 1000,
  "dialogDots": "...",
  "tileTypes": {
    "0": {
      "name": "floor",
      "fill": "#6C6C6C",
      "border": "#959595"
    },
    "1": {
      "name": "water",
      "fill": "#1a3050",
      "border": "#2a5080",
      "blocking": true
    },
    "2": {
      "name": "carpet",
      "fill": "#4a2020",
      "border": "#7a3030"
    },
    "3": {
      "name": "grass",
      "fill": "#2a4a20",
      "border": "#4a7a30"
    },
    "4": {
      "name": "stone",
      "fill": "#505050",
      "border": "#707070"
    },
    "5": {
      "name": "wood",
      "fill": "#4a2a10",
      "border": "#7a4a20"
    },
    "6": {
      "name": "sand",
      "fill": "#C9C16E",
      "border": "#C18A4B"
    },
    "7": {
      "name": "dirt",
      "fill": "#7B5C3E",
      "border": "#5B5B5B"
    },
    "8": {
      "name": "ice",
      "fill": "#6DC2CA",
      "border": "#7F9FC9"
    },
    "9": {
      "name": "marble",
      "fill": "#B5B5B5",
      "border": "#8B8B8B"
    },
    "10": {
      "name": "mud",
      "fill": "#5FAB5F",
      "border": "#4A6B9A"
    },
    "11": {
      "name": "blood",
      "fill": "#CB4B4B",
      "border": "#8B8B8B"
    }
  },
  "player": {
    "currentMap": 0,
    "currentLocation": {
      "x": 1,
      "y": 2
    },
    "destinationLocation": {},
    "icon": null,
    "vision": 3,
    "inventory": []
  },
  "cutScenes": {
    "after_map0": {
      "cuts": [
        { "type": "image", "src": "hermit_cut.png", "x": 15, "y": 15, "width": 280,
          "fadeIn": 1000, "hold": 4000, "fadeOut": 1000, "driftX": 5, "driftY": -2 },
        { "type": "text", "text": "In the darkness below, you found Alistair the Hermit — a reclusive old man surrounded by herbs and keys. He needed help clearing his home of pests.", "x": 55, "y": 20, "fontSize": 22,
          "fadeIn": 1500, "hold": 3500, "fadeOut": 1000, "driftX": -3, "driftY": -1 },
        { "type": "image", "src": "rats_cut.png", "x": 30, "y": 35, "width": 120,
          "fadeIn": 400, "hold": 1200, "fadeOut": 400, "driftX": 0, "driftY": 3 },
        { "type": "image", "src": "rats_cut.png", "x": 45, "y": 38, "width": 120,
          "fadeIn": 600, "hold": 1200, "fadeOut": 400, "driftX": 0, "driftY": 3 },
        { "type": "image", "src": "rats_cut.png", "x": 60, "y": 35, "width": 120,
          "fadeIn": 800, "hold": 1200, "fadeOut": 400, "driftX": 0, "driftY": 3 },
        { "type": "text", "text": "...to clear out the rats from his storeroom...", "x": 30, "y": 65, "fontSize": 20,
          "fadeIn": 1000, "hold": 2000, "fadeOut": 800 },
        { "type": "image", "src": "bats_cut.png", "x": 25, "y": 32, "width": 100,
          "fadeIn": 300, "hold": 800, "fadeOut": 300, "driftX": 15, "driftY": -5 },
        { "type": "image", "src": "bats_cut.png", "x": 40, "y": 35, "width": 100,
          "fadeIn": 400, "hold": 900, "fadeOut": 300, "driftX": 15, "driftY": -5 },
        { "type": "image", "src": "bats_cut.png", "x": 55, "y": 33, "width": 100,
          "fadeIn": 500, "hold": 1000, "fadeOut": 300, "driftX": 15, "driftY": -5 },
        { "type": "image", "src": "bats_cut.png", "x": 70, "y": 36, "width": 100,
          "fadeIn": 600, "hold": 1000, "fadeOut": 300, "driftX": 15, "driftY": -5 },
        { "type": "image", "src": "bats_cut.png", "x": 30, "y": 38, "width": 100,
          "fadeIn": 700, "hold": 900, "fadeOut": 300, "driftX": 15, "driftY": -5 },
        { "type": "text", "text": "...then the bats from the marble passage...", "x": 30, "y": 65, "fontSize": 20,
          "fadeIn": 800, "hold": 2000, "fadeOut": 800 },
        { "type": "image", "src": "centipedes_cut.png", "x": 40, "y": 30, "width": 160,
          "fadeIn": 1000, "hold": 2500, "fadeOut": 1000, "driftX": 3, "driftY": 2 },
        { "type": "text", "text": "...and the centipedes await below.", "x": 40, "y": 65, "fontSize": 20,
          "fadeIn": 1200, "hold": 2300, "fadeOut": 800 },
        { "type": "fade", "color": "#000000",
          "fadeIn": 800, "hold": 500, "fadeOut": 200 },
        { "type": "image", "src": "jester_cut.png", "x": 30, "y": 15, "width": 260,
          "fadeIn": 1500, "hold": 5000, "fadeOut": 1000, "driftX": 4, "driftY": -2 },
        { "type": "text", "text": "But the Jester has been watching. He finds your obedience amusing — for now.", "x": 55, "y": 22, "fontSize": 22,
          "fadeIn": 2000, "hold": 4500, "fadeOut": 1000 },
        { "type": "text", "text": "\"Not everything is as it seems in these caves, little helper...\"", "x": 55, "y": 50, "fontSize": 20, "fontStyle": "italic",
          "fadeIn": 2500, "hold": 4000, "fadeOut": 1500 }
      ]
    }
  },
  "monsterTypes": {
    "1": {
      "name": "Giant rat",
      "fraction": 2,
      "movement": 0.3,
      "color": "#9A6759",
      "icon": "rat.png",
      "blocking": false,
      "restChance": 0.3
    },
    "2": {
      "name": "Bat",
      "fraction": 1,
      "movement": 0.6,
      "color": "#433900",
      "icon": "bat.png",
      "blocking": false,
      "restChance": 0
    },
    "3": {
      "name": "Centipede",
      "fraction": 1,
      "movement": 0.1,
      "icon": "centipede.png",
      "blocking": false,
      "restChance": 0.2
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
      "visionBlocking": false,
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
      "visionBlocking": false,
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
      "lightRadius": 1,
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
    },
    "11": {
      "name": "Stone Door",
      "description": "A heavy stone door carved with ancient symbols",
      "color": "#666666",
      "icon": "door_closed.png",
      "blocking": true,
      "closed": true,
      "keyId": 7,
      "choiceEvents": [
        7,
        3
      ],
      "openChoiceEvents": [
        8,
        3
      ]
    },
    "12": {
      "name": "Shimmering Wall",
      "description": "A wall of shimmering energy pulses with a faint blue light",
      "color": "#70A4B2",
      "icon": "shimmer_wall_closed.png",
      "blocking": true,
      "closed": true,
      "choiceEvents": [
        8,
        3
      ],
      "openChoiceEvents": [
        8,
        3
      ]
    },
    "13": {
      "name": "Lamppost",
      "description": "A dim street lamp",
      "color": "#FFFF00",
      "icon": "lamppost.png",
      "blocking": false,
      "drawOrder": 2,
      "opacity": 0.5,
      "lightRadius": 1,
      "choiceEvents": [
        6,
        3
      ]
    },
    "14": {
      "name": "Crate",
      "description": "A sturdy wooden crate",
      "color": "#8B5E3C",
      "icon": "crate.png",
      "blocking": true,
      "visionBlocking": false,
      "choiceEvents": [
        6,
        3
      ]
    },
    "15": {
      "name": "Barrel",
      "description": "A weathered wooden barrel",
      "color": "#6B4226",
      "icon": "barrel.png",
      "blocking": true,
      "visionBlocking": false,
      "choiceEvents": [
        6,
        3
      ]
    },
    "16": {
      "name": "Bed",
      "description": "A rickety old bed",
      "color": "#8B5E3C",
      "icon": "bed.png",
      "blocking": true,
      "visionBlocking": false,
      "choiceEvents": [
        6,
        3
      ]
    },
    "17": {
      "name": "Chair",
      "description": "A wooden chair",
      "color": "#6B4226",
      "icon": "chair.png",
      "blocking": true,
      "visionBlocking": false,
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
      "choiceEvents": [],
      "useText": "You fumble with the silver key, but there's nothing here to unlock."
    },
    "5": {
      "name": "Key",
      "description": "A bronze key",
      "icon": "key2.png",
      "choiceEvents": [],
      "useText": "You turn the bronze key over in your hand, looking for a lock."
    },
    "6": {
      "name": "Herbs",
      "description": "A bundle of dried cave herbs. Smells awful, dont look very tasty",
      "icon": "herbs.png",
      "choiceEvents": [],
      "useText": "You sniff the herbs. They smell awful. You put them away."
    },
    "7": {
      "name": "Stone Key",
      "description": "A heavy key carved from solid rock",
      "icon": "stone_key.png",
      "choiceEvents": [],
      "useText": "The stone key is too heavy to swing effectively."
    },
    "8": {
      "name": "Rudder",
      "description": "A wooden rudder from a small boat",
      "icon": "rudder.png",
      "choiceEvents": [],
      "useText": "You brandish the rudder like a club, but there's nothing to strike."
    },
    "9": {
      "name": "Mast",
      "description": "A short mast with frayed rope",
      "icon": "mast.png",
      "choiceEvents": [],
      "useText": "The mast is too long and awkward to use as a weapon."
    },
    "10": {
      "name": "Steering Wheel",
      "description": "A small brass steering wheel",
      "icon": "steering_wheel.png",
      "choiceEvents": [],
      "useText": "You spin the steering wheel. Nothing happens."
    },
    "11": {
      "name": "Sail",
      "description": "A patched canvas sail",
      "icon": "sail.png",
      "choiceEvents": [],
      "useText": "You wave the sail like a flag. No effect."
    },
    "12": {
      "name": "Antidote",
      "description": "A small vial of bitter-smelling liquid. The Hermit's handwriting on the label reads: 'For internal poisoning. One dose only.'",
      "icon": "antidote.png",
      "choiceEvents": [],
      "useText": "You're not poisoned. Drinking this would be a waste."
    },
    "13": {
      "name": "Rat Spray",
      "description": "A rusty canister marked 'RAT-A-WAY — Guaranteed to clear any rodent infestation'",
      "icon": "rat_spray.png",
      "choiceEvents": [],
      "useText": "You give the canister a quick spray. Nothing but stale air."
    },
    "14": {
      "name": "Bat Swatter",
      "description": "A sturdy swatter with a reinforced mesh head and a long handle",
      "icon": "bat_swatter.png",
      "choiceEvents": [],
      "useText": "You swing the bat swatter. Nothing to hit here."
    },
    "15": {
      "name": "Centipede Cleaner",
      "description": "A bottle of thick, foul-smelling liquid. 'CRAWL-END — For all your centipede problems'",
      "icon": "centipede_cleaner.png",
      "choiceEvents": [],
      "useText": "You sniff the bottle. Your eyes water. You put it away."
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
    },
    "5": {
      "name": "Sam Shale",
      "description": "A hard-boiled detective in trenchcoat and fedora",
      "icon": "detective.png",
      "dialogImg": "detective_dialog.png",
      "dialog": {
        "greeting": "A shadowy figure in a trenchcoat tips his fedora. 'Name's Shale. Sam Shale. You look like you've seen things, kid.'",
        "agitated": "He holds up a hand. 'Let's keep this professional, pal.'"
      },
      "choiceEvents": [
        9
      ],
      "agenda": "A noir detective in the Depths. Speaks like Philip Marlowe.",
      "personality": "mysterious"
    },
    "6": {
      "name": "Derelict Ship",
      "description": "A weathered ship anchored at the dock",
      "icon": "ship.png",
      "dialogImg": "ship_dialog.png",
      "dialog": {
        "greeting": "The ship groans softly as it rocks in the dark water.",
        "agitated": "The ship creaks and shifts."
      },
      "choiceEvents": [
        9
      ],
      "agenda": "A derelict ship waiting to be repaired.",
      "personality": "derelict"
    },
    "7": {
      "name": "Charon",
      "description": "An ancient boatman sitting on the dark shore of an underground lake",
      "icon": "charon.png",
      "dialogImg": "charon_dialog.png",
      "dialog": {
        "greeting": "The old man stares at the water and does not seem to notice you.",
        "agitated": "Do not pester me, wanderer! My memory is my own!"
      },
      "choiceEvents": [
        9
      ],
      "agenda": "A very old and forgetful boatman who has no short term memory. Speaks in dactylic hexameter.",
      "personality": "forgetful"
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
        },
        {
          "x1": 7,
          "y1": -4,
          "x2": 9,
          "y2": 0,
          "description": "A cosy room with a red carpet on the floor"
        },
        {
          "x1": -6,
          "y1": 1,
          "x2": -4,
          "y2": 3,
          "description": "A dim chamber. A rickety table stands in the corner, its surface streaked with grime. Shadows shift beneath it — rats."
        },
        {
          "x1": -12,
          "y1": -3,
          "x2": -3,
          "y2": -1,
          "description": "A wide marble corridor stretches west. Faint squeaking echoes from above — bats dart through the darkness, their leathery wings stirring the stale air. A draft tickles your face from somewhere further west."
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
          "y": -2,
          "type": 2
        },
        "x8ym2": {
          "x": 8,
          "y": -2,
          "type": 2
        },
        "x7ym2": {
          "x": 7,
          "y": -2,
          "type": 2
        },
        "x9ym1": {
          "x": 9,
          "y": -1,
          "type": 2
        },
        "x8ym1": {
          "x": 8,
          "y": -1,
          "type": 2
        },
        "x7ym1": {
          "x": 7,
          "y": -1,
          "type": 2
        },
        "x9y0": {
          "x": 9,
          "y": 0,
          "type": 2
        },
        "x8y0": {
          "x": 8,
          "y": 0,
          "type": 2
        },
        "x7y0": {
          "x": 7,
          "y": 0,
          "type": 2
        },
        "x9ym3": {
          "x": 9,
          "y": -3,
          "type": 2
        },
        "x8ym3": {
          "x": 8,
          "y": -3,
          "type": 2
        },
        "x7ym3": {
          "x": 7,
          "y": -3,
          "type": 2
        },
        "x3ym3": {
          "x": 3,
          "y": -3
        },
        "x9ym4": {
          "x": 9,
          "y": -4,
          "type": 2
        },
        "x8ym4": {
          "x": 8,
          "y": -4,
          "type": 2
        },
        "x7ym4": {
          "x": 7,
          "y": -4,
          "type": 2
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
          "y": -6,
          "type": 0
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
        "xm8ym3": {
          "x": -8,
          "y": -3,
          "type": 9
        },
        "xm7ym3": {
          "x": -7,
          "y": -3,
          "type": 9
        },
        "xm6ym3": {
          "x": -6,
          "y": -3,
          "type": 9
        },
        "xm3ym5": {
          "x": -3,
          "y": -5
        },
        "xm3ym4": {
          "x": -3,
          "y": -4
        },
        "xm5ym3": {
          "x": -5,
          "y": -3,
          "type": 9
        },
        "xm4ym3": {
          "x": -4,
          "y": -3,
          "type": 9
        },
        "xm3ym3": {
          "x": -3,
          "y": -3,
          "type": 9
        },
        "xm3ym2": {
          "x": -3,
          "y": -2,
          "type": 9
        },
        "xm3ym1": {
          "x": -3,
          "y": -1,
          "type": 9
        },
        "xm5ym1": {
          "x": -5,
          "y": -1,
          "type": 9
        },
        "xm4ym1": {
          "x": -4,
          "y": -1,
          "type": 9
        },
        "xm4ym2": {
          "x": -4,
          "y": -2,
          "type": 9
        },
        "xm5ym2": {
          "x": -5,
          "y": -2,
          "type": 9
        },
        "xm6ym2": {
          "x": -6,
          "y": -2,
          "type": 9
        },
        "xm6ym1": {
          "x": -6,
          "y": -1,
          "type": 9
        },
        "xm7ym2": {
          "x": -7,
          "y": -2,
          "type": 9
        },
        "xm8ym2": {
          "x": -8,
          "y": -2,
          "type": 9
        },
        "xm8ym1": {
          "x": -8,
          "y": -1,
          "type": 9
        },
        "xm7ym1": {
          "x": -7,
          "y": -1,
          "type": 9
        },
        "xm9ym2": {
          "x": -9,
          "y": -2,
          "type": 9
        },
        "xm10ym2": {
          "x": -10,
          "y": -2,
          "type": 9
        },
        "xm11ym2": {
          "x": -11,
          "y": -2,
          "type": 9
        },
        "xm12ym2": {
          "x": -12,
          "y": -2,
          "type": 9
        }
      },
      "monsters": [
        {
          "type": 1,
          "position": {
            "x": -6,
            "y": 3
          },
          "speed": 0.03,
          "status": 1,
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
          "type": 1,
          "position": {
            "x": -4,
            "y": 2
          },
          "speed": 0.04,
          "status": 1,
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
          "type": 1,
          "position": {
            "x": -4,
            "y": 1
          },
          "speed": 0.06,
          "status": 1,
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
            "x": -5,
            "y": -2
          },
          "speed": 0.06,
          "status": 1,
          "allowedTiles": [
            {
              "x": -8,
              "y": -3
            },
            {
              "x": -7,
              "y": -3
            },
            {
              "x": -6,
              "y": -3
            },
            {
              "x": -5,
              "y": -3
            },
            {
              "x": -4,
              "y": -3
            },
            {
              "x": -3,
              "y": -3
            },
            {
              "x": -8,
              "y": -2
            },
            {
              "x": -7,
              "y": -2
            },
            {
              "x": -6,
              "y": -2
            },
            {
              "x": -5,
              "y": -2
            },
            {
              "x": -4,
              "y": -2
            },
            {
              "x": -3,
              "y": -2
            },
            {
              "x": -8,
              "y": -1
            },
            {
              "x": -7,
              "y": -1
            },
            {
              "x": -6,
              "y": -1
            },
            {
              "x": -5,
              "y": -1
            },
            {
              "x": -4,
              "y": -1
            },
            {
              "x": -3,
              "y": -1
            }
          ]
        },
        {
          "type": 2,
          "position": {
            "x": -7,
            "y": -3
          },
          "speed": 0.05,
          "status": 1,
          "allowedTiles": [
            {
              "x": -8,
              "y": -3
            },
            {
              "x": -7,
              "y": -3
            },
            {
              "x": -6,
              "y": -3
            },
            {
              "x": -5,
              "y": -3
            },
            {
              "x": -4,
              "y": -3
            },
            {
              "x": -3,
              "y": -3
            },
            {
              "x": -8,
              "y": -2
            },
            {
              "x": -7,
              "y": -2
            },
            {
              "x": -6,
              "y": -2
            },
            {
              "x": -5,
              "y": -2
            },
            {
              "x": -4,
              "y": -2
            },
            {
              "x": -3,
              "y": -2
            },
            {
              "x": -8,
              "y": -1
            },
            {
              "x": -7,
              "y": -1
            },
            {
              "x": -6,
              "y": -1
            },
            {
              "x": -5,
              "y": -1
            },
            {
              "x": -4,
              "y": -1
            },
            {
              "x": -3,
              "y": -1
            }
          ]
        },
        {
          "type": 2,
          "position": {
            "x": -4,
            "y": -1
          },
          "speed": 0.04,
          "status": 1,
          "allowedTiles": [
            {
              "x": -8,
              "y": -3
            },
            {
              "x": -7,
              "y": -3
            },
            {
              "x": -6,
              "y": -3
            },
            {
              "x": -5,
              "y": -3
            },
            {
              "x": -4,
              "y": -3
            },
            {
              "x": -3,
              "y": -3
            },
            {
              "x": -8,
              "y": -2
            },
            {
              "x": -7,
              "y": -2
            },
            {
              "x": -6,
              "y": -2
            },
            {
              "x": -5,
              "y": -2
            },
            {
              "x": -4,
              "y": -2
            },
            {
              "x": -3,
              "y": -2
            },
            {
              "x": -8,
              "y": -1
            },
            {
              "x": -7,
              "y": -1
            },
            {
              "x": -6,
              "y": -1
            },
            {
              "x": -5,
              "y": -1
            },
            {
              "x": -4,
              "y": -1
            },
            {
              "x": -3,
              "y": -1
            }
          ]
        },
        {
          "type": 2,
          "position": {
            "x": -8,
            "y": -1
          },
          "speed": 0.07,
          "status": 1,
          "allowedTiles": [
            {
              "x": -8,
              "y": -3
            },
            {
              "x": -7,
              "y": -3
            },
            {
              "x": -6,
              "y": -3
            },
            {
              "x": -5,
              "y": -3
            },
            {
              "x": -4,
              "y": -3
            },
            {
              "x": -3,
              "y": -3
            },
            {
              "x": -8,
              "y": -2
            },
            {
              "x": -7,
              "y": -2
            },
            {
              "x": -6,
              "y": -2
            },
            {
              "x": -5,
              "y": -2
            },
            {
              "x": -4,
              "y": -2
            },
            {
              "x": -3,
              "y": -2
            },
            {
              "x": -8,
              "y": -1
            },
            {
              "x": -7,
              "y": -1
            },
            {
              "x": -6,
              "y": -1
            },
            {
              "x": -5,
              "y": -1
            },
            {
              "x": -4,
              "y": -1
            },
            {
              "x": -3,
              "y": -1
            }
          ]
        },
        {
          "type": 2,
          "position": {
            "x": -3,
            "y": -3
          },
          "speed": 0.03,
          "status": 1,
          "allowedTiles": [
            {
              "x": -8,
              "y": -3
            },
            {
              "x": -7,
              "y": -3
            },
            {
              "x": -6,
              "y": -3
            },
            {
              "x": -5,
              "y": -3
            },
            {
              "x": -4,
              "y": -3
            },
            {
              "x": -3,
              "y": -3
            },
            {
              "x": -8,
              "y": -2
            },
            {
              "x": -7,
              "y": -2
            },
            {
              "x": -6,
              "y": -2
            },
            {
              "x": -5,
              "y": -2
            },
            {
              "x": -4,
              "y": -2
            },
            {
              "x": -3,
              "y": -2
            },
            {
              "x": -8,
              "y": -1
            },
            {
              "x": -7,
              "y": -1
            },
            {
              "x": -6,
              "y": -1
            },
            {
              "x": -5,
              "y": -1
            },
            {
              "x": -4,
              "y": -1
            },
            {
              "x": -3,
              "y": -1
            }
          ]
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
          },
          "itemType": 14
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
        },
        {
          "type": 3,
          "position": {
            "x": 8,
            "y": -2
          }
        },
        {
          "type": 1,
          "position": {
            "x": 8,
            "y": 2
          }
        },
        {
          "type": 4,
          "position": {
            "x": -7,
            "y": 3
          },
          "closed": true,
          "blocking": true
        },
        {
          "type": 6,
          "position": {
            "x": -1,
            "y": 1
          }
        },
        {
          "type": 4,
          "position": {
            "x": -2,
            "y": 2
          },
          "closed": true
        },
        {
          "type": 4,
          "position": {
            "x": 11,
            "y": 1
          },
          "closed": true
        },
        {
          "type": 16,
          "position": {
            "x": 7,
            "y": -4
          }
        },
        {
          "type": 5,
          "position": {
            "x": 7,
            "y": 0
          },
          "itemType": 13
        },
        {
          "type": 17,
          "position": {
            "x": 7,
            "y": -2
          }
        },
        {
          "type": 4,
          "position": {
            "x": -9,
            "y": -2
          },
          "closed": true,
          "blocking": true
        },
        {
          "type": 6,
          "position": {
            "x": -12,
            "y": -2
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
                  "id": "hermit_ask_jester",
                  "text": "I met a jester in the caves.",
                  "available": false,
                  "chains": [
                    "hermit_jester1"
                  ]
                },
                {
                  "id": "hermit_ask_antidote",
                  "text": "The Mole is sick from your herbs. Do you have an antidote?",
                  "available": false,
                  "chains": [
                    "hermit_antidote_intro"
                  ]
                },
                {
                  "id": "hermit_ask_wayout",
                  "text": "Can you tell me the way out of here?",
                  "available": true,
                  "chains": [
                    "hermit_intro1"
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
              "text": "Strangers? Down here everyone is a stranger, child. But opportunity - that's rarer than sunlight. That key could be your ticket out. I'm offering a fair exchange: cave herbs for your key. What do you say?",
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
              "text": "Dedicated? He's obsessed! But I'll admit - he's clever. He's been digging new tunnels, stockpiling stones. Mark my words, he's planning something. Probably to trap someone in that maze of his.",
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
              "text": "That thing? Put it away, child. I want nothing to do with it. Some keys are not meant to turn locks - they're meant to stay lost. That key carries... a presence. An old hunger.",
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
              "text": "I've seen its kind before. Crafted not by hands but by want - by need so deep it took form in stone. That key wants to be used, but using it will cost more than you'd ever pay.",
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
              "text": "I'll trade you my special cave herbs for it. They have remarkable properties.",
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
            },
            {
              "id": "hermit_intro1",
              "available": false,
              "text": "The old man chuckles softly. 'The way out? Heh. I've been trying to find that for... oh, must be years now. The name's Alistair. Alistair Wormwood. I was a botanist once. Before the cave-in.'",
              "options": [
                {
                  "id": "hermit_intro1a",
                  "text": "A botanist? What happened?",
                  "available": true,
                  "chains": [
                    "hermit_intro2"
                  ]
                },
                {
                  "id": "hermit_intro1l",
                  "text": "You're not very helpful.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_intro2",
              "available": false,
              "text": "'I was exploring a promising fissure in the old quarry. Found some remarkable specimens - luminescent moss, crystal formations unlike any I'd seen. Then the earth moved. When I woke, the passage was sealed. I've been here ever since.' He gestures vaguely at his trinkets.",
              "options": [
                {
                  "id": "hermit_intro2a",
                  "text": "So you've been surviving down here all this time?",
                  "available": true,
                  "chains": [
                    "hermit_intro3"
                  ]
                },
                {
                  "id": "hermit_intro2b",
                  "text": "That's a sad story.",
                  "available": true,
                  "chains": [
                    "hermit_intro3"
                  ]
                }
              ]
            },
            {
              "id": "hermit_intro3",
              "available": false,
              "text": "'Surviving? Ha! This is no mere survival, child - this is a lifetime's work! Every key tells a story. Every herb holds a secret. The moss in these caves can cure wounds that would fester above ground. The crystals hum with energy if you hold them just right. There's a whole world down here that surface-dwellers know nothing about.'",
              "options": [
                {
                  "id": "hermit_intro3a",
                  "text": "What about the way out?",
                  "available": true,
                  "chains": [
                    "hermit_intro4"
                  ]
                },
                {
                  "id": "hermit_intro3l",
                  "text": "Fascinating, but I need to go.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_intro4",
              "available": false,
              "text": "'The way out...' He strokes his beard thoughtfully. 'There are layers to this place, child. You came from the surface. Below these caves lies a maze. Below that... deeper chambers, sealed by ancient doors. The secret isn't in finding the way up - it's in how far down you're willing to go.'",
              "options": [
                {
                  "id": "hermit_intro4b",
                  "text": "I just want to escape.",
                  "available": true,
                  "chains": [
                    "hermit_intro5"
                  ]
                }
              ]
            },
            {
              "id": "hermit_intro5",
              "available": false,
              "text": "'Then you'll need to descend. Through the caves, into the maze, past the old stone doors. Seek the woman with snakes for hair - Medusa, they call her. She's been here longest. If anyone knows the way, it's her.' He turns back to his herbs. 'Now if you'll excuse me, my work awaits.'",
              "options": [
                {
                  "id": "hermit_intro_end",
                  "text": "Thank you, Alistair.",
                  "available": true,
                  "closes": [
                    "hermit_intro1",
                    "hermit_intro2",
                    "hermit_intro3",
                    "hermit_intro4",
                    "hermit_intro5"
                  ]
                },
                {
                  "id": "hermit_insist_help",
                  "text": "Please, I need your help. Show me the way.",
                  "available": true,
                  "chains": [
                    "hermit_insist_response"
                  ],
                  "closes": [
                    "hermit_intro1",
                    "hermit_intro2",
                    "hermit_intro3",
                    "hermit_intro4",
                    "hermit_intro5"
                  ]
                }
              ]
            },
            {
              "id": "hermit_insist_response",
              "available": false,
              "text": "He sighs heavily, setting down his herbs. 'You're not going to let this go, are you?' He pauses, studying you. 'Very well. Follow me to the old storeroom, there might be something useful. Follow me.'",
              "options": [
                {
                  "id": "hermit_insist_follow",
                  "text": "Follow the Hermit",
                  "available": true,
                  "closes": [
                    "hermit_insist_response"
                  ]
                }
              ]
            },
            {
              "id": "hermit_rat_spray",
              "available": false,
              "text": "'The rats have overrun the place,' he mutters, peering through the doorway. 'I used to keep a spray for them — my own recipe. Strong enough to drive 'em out for good. Fetch it for me, would you? It should be somewhere in my old chambers. Here take this key to unlock the door. I have to stay here and guard my herbs.'",
              "options": [
                {
                  "id": "hermit_rat_spray_accept",
                  "text": "I'll find your spray.",
                  "available": true
                },
                {
                  "id": "hermit_rat_spray_decline",
                  "text": "Maybe later.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_rat_spray_wait",
              "available": false,
              "text": "'Well? Did you find it?' He taps his foot impatiently.",
              "options": [
                {
                  "id": "hermit_rat_spray_hand_over",
                  "text": "I have the spray right here.",
                  "available": true,
                  "requiresItems": [
                    13
                  ],
                  "chains": [
                    "hermit_rat_spray_give"
                  ]
                },
                {
                  "id": "hermit_rat_spray_still_looking",
                  "text": "Not yet. I'm still looking.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_rat_spray_give",
              "available": false,
              "text": "'Finally! Give it here!' He snatches the canister from your hands, his eyes lighting up with a manic gleam. 'Those thieving vermin have been feasting on my herb stores for weeks! Time to return the favor!' He storms toward the storeroom door, rat spray held high.",
              "options": [
                {
                  "id": "hermit_rat_spray_give_hand",
                  "text": "Here, take it.",
                  "available": true,
                  "closes": [
                    "hermit_rat_spray_give",
                    "hermit_rat_spray_wait"
                  ]
                }
              ]
            },
            {
              "id": "hermit_bat_swatter",
              "available": false,
              "text": "'Ah, there you are!' He dusts off his hands. 'Now that the rats are dealt with, there's another matter. I used to keep a bat swatter around here — the bats in the western caves have been getting bold. It should be somewhere in this room. Fetch it for me, would you?'",
              "options": [
                {
                  "id": "hermit_bat_swatter_accept",
                  "text": "I'll find the swatter.",
                  "available": true,
                  "chains": [
                    "hermit_bat_swatter_wait"
                  ]
                },
                {
                  "id": "hermit_bat_swatter_decline",
                  "text": "Maybe later.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_bat_swatter_wait",
              "available": false,
              "text": "'Found it yet? The bats grow bolder by the hour.'",
              "options": [
                {
                  "id": "hermit_bat_swatter_hand_over",
                  "text": "I have the swatter right here.",
                  "available": true,
                  "requiresItems": [
                    14
                  ],
                  "chains": [
                    "hermit_bat_swatter_give"
                  ]
                },
                {
                  "id": "hermit_bat_swatter_still_looking",
                  "text": "Not yet. Still looking.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_bat_swatter_give",
              "available": false,
              "text": "'Ah, you found it! Let me —' He reaches for it, then winces, clutching his lower back. 'Oof. I've gotten too stiff for this. My backhand swings aren't what they used to be.' He sighs. 'You keep it. I've unlocked the old door to the west. Go clear those bats out. I'll be at my post if you need me.' He shuffles back toward the main chamber.",
              "options": [
                {
                  "id": "hermit_bat_swatter_give_hand",
                  "text": "I'll take care of it.",
                  "available": true,
                  "closes": [
                    "hermit_bat_swatter_give",
                    "hermit_bat_swatter_wait"
                  ]
                }
              ]
            },
            {
              "id": "hermit_bat_intro",
              "available": false,
              "text": "'The western door is open. The bats won't clear themselves, you know. Take that swatter and show them who's boss.'",
              "options": []
            },
            {
              "id": "hermit_jester1",
              "available": false,
              "text": "'That insufferable fool? Ha! He thinks himself clever with his riddles and pranks. He's been mocking me for as long as I can remember - hiding my herbs, swapping my keys, leaving whoopee cushions on my stone chair. The man has no respect for solitude or science!'",
              "options": [
                {
                  "id": "hermit_jester1a",
                  "text": "Sounds annoying.",
                  "available": true
                },
                {
                  "id": "hermit_jester1b",
                  "text": "Why does he tease you?",
                  "available": true,
                  "chains": [
                    "hermit_jester2"
                  ]
                }
              ]
            },
            {
              "id": "hermit_jester2",
              "available": false,
              "text": "'Because he's a man-child with nothing better to do! He's not dangerous, mind you - just exhausting. Like a fly that keeps buzzing around your head. Ignore him and he'll eventually get bored. That's my strategy anyway.'",
              "options": [
                {
                  "id": "hermit_jester2a",
                  "text": "I'll keep that in mind.",
                  "available": true
                }
              ]
            },
            {
              "id": "hermit_antidote_intro",
              "available": false,
              "text": "The Hermit's eyes narrow. He folds his arms.\n'The Mole? Sick from my herbs? Hah! Serves him right for thieving from my stores! I've spent years cultivating those roots - they're not meant to be eaten raw, the fool!'\nHe pauses, stroking his beard.\n'I... do have an antidote. Why should I give it to you?'",
              "options": [
                {
                  "id": "hermit_antidote_plead",
                  "text": "He'll die without it.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_sympathy"
                  ]
                },
                {
                  "id": "hermit_antidote_trade",
                  "text": "I can trade you something for it.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_trade_try"
                  ]
                },
                {
                  "id": "hermit_antidote_medusa",
                  "text": "He can dig through rubble to find Medusa.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_medusa_react"
                  ]
                },
                {
                  "id": "hermit_antidote_leave",
                  "text": "Never mind.",
                  "available": true,
                  "closes": [
                    "hermit_antidote_intro"
                  ]
                }
              ]
            },
            {
              "id": "hermit_antidote_sympathy",
              "available": false,
              "text": "'Good riddance!' He catches your look and sighs. 'Fine. Why should I care what happens to that tunnel-grubbing wretch?'",
              "options": [
                {
                  "id": "hermit_antidote_sympathy_p1",
                  "text": "No one deserves to die like that.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_give"
                  ]
                },
                {
                  "id": "hermit_antidote_sympathy_p2",
                  "text": "Because I need him. He can help me reach Medusa.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_medusa_react"
                  ]
                }
              ]
            },
            {
              "id": "hermit_antidote_trade_try",
              "available": false,
              "text": "He raises an eyebrow. 'Trade? What could you possibly offer that I'd want more than the satisfaction of watching that whiskered fool squirm?'",
              "options": [
                {
                  "id": "hermit_antidote_trade_try_p1",
                  "text": "I have herbs... wait, no. The Mole ate them all.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_need"
                  ]
                },
                {
                  "id": "hermit_antidote_trade_try_p2",
                  "text": "Information about the surface. I'll tell you what's changed up there.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_give"
                  ]
                }
              ]
            },
            {
              "id": "hermit_antidote_need",
              "available": false,
              "text": "The Hermit chuckles dryly. 'Need him? For what? The only thing that creature's good for is digging holes and stealing my stock.'",
              "options": [
                {
                  "id": "hermit_antidote_need_p1",
                  "text": "He can dig through rubble blocking the path to Medusa.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_medusa_react"
                  ]
                },
                {
                  "id": "hermit_antidote_need_p2",
                  "text": "Just trust me. It's important.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_give"
                  ]
                }
              ]
            },
            {
              "id": "hermit_antidote_medusa_react",
              "available": false,
              "text": "The Hermit's face shifts. The irritation melts into something softer - concern, perhaps even fondness. He adjusts his spectacles.\n'Medusa? What of her? She came to me once, you know. Wandered into my cave and asked about my herbs. I expected her to steal them. Instead, she laughed. A warm, genuine laugh. She said my little collection reminded her of the gardens she tended... before.'\nHe trails off, then shakes his head.\n'What has happened? Where has she gone?'",
              "options": [
                {
                  "id": "hermit_antidote_medusa_react_p1",
                  "text": "She ran off in despair. The Mole can dig through the rocks to reach her.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_medusa_convince"
                  ]
                },
                {
                  "id": "hermit_antidote_medusa_react_p2",
                  "text": "She's in trouble. I need to find her before it's too late.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_medusa_convince"
                  ]
                }
              ]
            },
            {
              "id": "hermit_antidote_medusa_convince",
              "available": false,
              "text": "The Hermit is silent for a long moment. He turns to a cluttered shelf and picks up a small vial, holding it up to the faint light.\n'Medusa does not deserve to be lost. She has suffered enough.'\nHe presses the vial into your hand.\n'Take it. Save the Mole. Send him to dig through whatever rubble blocks your path. Find her. Tell her the old hermit remembers her laugh. Tell her... there is always a garden waiting, even in the dark.'\nHe turns away quickly, but not before you see him wipe his eyes.",
              "options": [
                {
                  "id": "hermit_antidote_medusa_convince_a1",
                  "text": "I will. Thank you.",
                  "available": true,
                  "chains": [
                    "hermit_antidote_give"
                  ]
                }
              ]
            },
            {
              "id": "hermit_antidote_give",
              "available": false,
              "text": "The Hermit grumbles, shuffles to a dusty corner, and retrieves a small vial. He holds it up to the light before handing it over.\n'Fine. Take it. But tell that tunneling pest he owes me. And if he dares show his whiskered face near my cave again, I'll be brewing something far less pleasant.'\nHe drops the vial into your hand and turns away, muttering about ungrateful rodents.",
              "options": [
                {
                  "id": "hermit_antidote_give_a1",
                  "text": "...",
                  "available": true,
                  "closes": [
                    "hermit_antidote_intro",
                    "hermit_antidote_sympathy",
                    "hermit_antidote_trade_try",
                    "hermit_antidote_need",
                    "hermit_antidote_medusa_react",
                    "hermit_antidote_medusa_convince",
                    "hermit_antidote_give"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": 2,
          "position": {
            "x": 10,
            "y": 3
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
      "defaultDescription": "A dark dusty place",
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
          "status": 1
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
          "statueDesc": "A marble figure with one hand shielding its eyes and the other pointing into the dark. A small sign reads: The regretable third.",
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
                },
                {
                  "id": "medusaa1j",
                  "text": "I met a jester in the caves above.",
                  "available": false,
                  "opens": [
                    "medusaj1"
                  ],
                  "closes": [
                    "medusaq1"
                  ],
                  "chains": [
                    "medusaj1"
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
                  "chains": []
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
                  "chains": []
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
                  "chains": []
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
                  "chains": []
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
                  "chains": []
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
                  "chains": []
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
            },
            {
              "id": "medusaj1",
              "available": false,
              "text": "The Jester. He talks enough for both of us. I find it soothing, like rain on stone. He thinks he's being clever, but I've known true cleverness - it doesn't announce itself. Still, he means no harm. Mostly.",
              "options": [
                {
                  "id": "medusaj1a",
                  "text": "I see...",
                  "available": true,
                  "closes": [
                    "medusaj1"
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
      "defaultDescription": "A dark and damp place",
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
            "text": "Hark, thou foolish child! Thou hast wandered into mine own domain! Bwa ha ha! Now shalt thou know the meaning of true despair!",
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
        "x24y11": {
          "x": 24,
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
        "x9y14": {
          "x": 9,
          "y": 14
        },
        "x26y14": {
          "x": 26,
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
        },
        "x22y10": {
          "x": 22,
          "y": 10
        },
        "x23y10": {
          "x": 23,
          "y": 10
        },
        "x22y11": {
          "x": 22,
          "y": 11
        },
        "x23y11": {
          "x": 23,
          "y": 11
        },
        "x22y12": {
          "x": 22,
          "y": 12
        },
        "x23y12": {
          "x": 23,
          "y": 12
        },
        "x24y12": {
          "x": 24,
          "y": 12
        },
        "x23y13": {
          "x": 23,
          "y": 13
        },
        "x23y14": {
          "x": 23,
          "y": 14
        },
        "x23y15": {
          "x": 23,
          "y": 15
        },
        "x23y16": {
          "x": 23,
          "y": 16
        },
        "x23y17": {
          "x": 23,
          "y": 17
        },
        "x23y18": {
          "x": 23,
          "y": 18
        },
        "x23y19": {
          "x": 23,
          "y": 19
        },
        "x23y20": {
          "x": 23,
          "y": 20
        },
        "x23y21": {
          "x": 23,
          "y": 21
        },
        "x23y22": {
          "x": 23,
          "y": 22
        },
        "x23y23": {
          "x": 23,
          "y": 23
        },
        "x23y24": {
          "x": 23,
          "y": 24
        },
        "x23y25": {
          "x": 23,
          "y": 25
        },
        "x23y26": {
          "x": 23,
          "y": 26
        },
        "x23y27": {
          "x": 23,
          "y": 27
        },
        "x23y28": {
          "x": 23,
          "y": 28
        },
        "x23y29": {
          "x": 23,
          "y": 29
        },
        "x23y30": {
          "x": 23,
          "y": 30
        },
        "x23y31": {
          "x": 23,
          "y": 31
        },
        "x22y32": {
          "x": 22,
          "y": 32
        },
        "x23y32": {
          "x": 23,
          "y": 32
        },
        "x27y14": {
          "x": 27,
          "y": 14
        },
        "x24y18": {
          "x": 24,
          "y": 18
        },
        "x31y19": {
          "x": 31,
          "y": 19
        },
        "x14y4": {
          "x": 14,
          "y": 4
        },
        "x11y3": {
          "x": 11,
          "y": 3
        },
        "x13y6": {
          "x": 13,
          "y": 6
        },
        "x39y9": {
          "x": 39,
          "y": 9,
          "type": 0
        },
        "x39y15": {
          "x": 39,
          "y": 15,
          "type": 0
        },
        "x39y14": {
          "x": 39,
          "y": 14,
          "type": 0
        },
        "x39y13": {
          "x": 39,
          "y": 13,
          "type": 0
        },
        "x39y12": {
          "x": 39,
          "y": 12,
          "type": 0
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
        },
        {
          "type": 11,
          "position": {
            "x": 21,
            "y": 10
          }
        },
        {
          "type": 11,
          "position": {
            "x": 25,
            "y": 10
          }
        },
        {
          "type": 11,
          "position": {
            "x": 22,
            "y": 32
          }
        },
        {
          "type": 12,
          "position": {
            "x": 20,
            "y": 10
          }
        },
        {
          "type": 12,
          "position": {
            "x": 26,
            "y": 10
          }
        },
        {
          "type": 12,
          "position": {
            "x": 21,
            "y": 32
          }
        },
        {
          "type": 1,
          "position": {
            "x": 6,
            "y": 10
          }
        },
        {
          "type": 1,
          "position": {
            "x": 7,
            "y": 10
          }
        },
        {
          "type": 1,
          "position": {
            "x": 6,
            "y": 11
          }
        },
        {
          "type": 1,
          "position": {
            "x": 7,
            "y": 11
          }
        },
        {
          "type": 1,
          "position": {
            "x": 40,
            "y": 10
          }
        },
        {
          "type": 1,
          "position": {
            "x": 39,
            "y": 10
          }
        },
        {
          "type": 1,
          "position": {
            "x": 39,
            "y": 11
          }
        },
        {
          "type": 1,
          "position": {
            "x": 40,
            "y": 11
          }
        },
        {
          "type": 1,
          "position": {
            "x": 6,
            "y": 32
          }
        },
        {
          "type": 1,
          "position": {
            "x": 7,
            "y": 32
          }
        },
        {
          "type": 1,
          "position": {
            "x": 6,
            "y": 33
          }
        },
        {
          "type": 1,
          "position": {
            "x": 7,
            "y": 33
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
              "id": "mole_sick",
              "available": false,
              "text": "The Mole is doubled over, clutching his stomach. His whiskers droop and his voice comes in pained gasps.\n'Oh, wretched fortune! Accursed herbs!\nThe Hermit's green poison doth consume me from within!\nMy belly burns like the fires of the underworld!\nI thought them a cure for all my ills,\nBut they are a plague! A pestilence!\nI need an antidote, or I am surely doomed!'\nHe collapses against the tunnel wall, groaning.",
              "options": [
                {
                  "id": "mole_sick_help",
                  "text": "I'll find help.",
                  "available": true
                },
                {
                  "id": "mole_sick_give",
                  "text": "I have the antidote here.",
                  "available": true,
                  "requiresItems": [
                    12
                  ],
                  "chains": [
                    "mole_cured"
                  ]
                }
              ]
            },
            {
              "id": "mole_cured",
              "available": false,
              "text": "The Mole grabs the vial with trembling paws and drinks it in one desperate gulp. He shudders, then lets out a long, relieved sigh.\n'Ahhh... Sweet relief!\nThe fire in my gut doth fade at last!\nThou hast saved me, stranger - saved me from a grave\nI dug with mine own greed.\nI owe thee a debt I cannot soon repay.\nIf ever thou needest a tunnel dug,\nOr a passage cleared, call upon me.'",
              "options": [
                {
                  "id": "mole_cured_leave",
                  "text": "Get some rest.",
                  "available": true,
                  "closes": [
                    "mole_sick",
                    "mole_cured"
                  ]
                }
              ]
            },
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
            },
            {
              "id": "mole_post1",
              "available": false,
              "text": "Alas! Fortune hath turned her back on me once more! The very stones I meant to cage thee have become thy shelter! Woe is me, for my grand scheme hath come to naught!",
              "options": [
                {
                  "id": "mole_post_a1",
                  "text": "You wanted to trap me down here - to starve to death?",
                  "available": true,
                  "chains": [
                    "mole_post2"
                  ]
                }
              ]
            },
            {
              "id": "mole_post2",
              "available": false,
              "text": "Aye, 'twas my design! To see thee wither, to watch the light fade from thine eyes! For then would I take the Hermit's precious herbs for mine own! But fate hath mocked me - thou art too clever by half!",
              "options": [
                {
                  "id": "mole_post_a2",
                  "text": "You mean the herbs the Hermit collects?",
                  "available": true,
                  "chains": [
                    "mole_post3"
                  ]
                }
              ]
            },
            {
              "id": "mole_post3",
              "available": false,
              "text": "The very same! The Hermit hoards 'em in his cave, thinkin' them to be nothin' but baubles. But I know their true worth! With 'em, I could... well, 'tis no matter now. Thou hast bested me, and the herbs are beyond my reach.",
              "options": [
                {
                  "id": "mole_post_a3_give",
                  "text": "I have the Hermit's herbs. Here, take them.",
                  "available": true,
                  "requiresItems": [
                    6
                  ],
                  "chains": [
                    "mole_post4_give"
                  ]
                },
                {
                  "id": "mole_post_a3_none",
                  "text": "Sorry, I don't have them.",
                  "available": true,
                  "closes": [
                    "mole_post3"
                  ]
                }
              ]
            },
            {
              "id": "mole_post4_give",
              "available": false,
              "text": "Thou... thou wouldst give them to me? After all I have done? Thou art either a fool or a saint! But I shall not look a gift horse in the mouth! Accept my gratitude, and in return, I shall share a secret. Between the cracks of these very tunnels lie passages unknown!",
              "options": [
                {
                  "id": "mole_post4_give_a",
                  "text": "Show me this secret passage.",
                  "available": true,
                  "chains": [
                    "mole_post5_reveal"
                  ]
                }
              ]
            },
            {
              "id": "mole_post5_reveal",
              "available": false,
              "text": "Dost thou see the shimmerin' walls? Beyond 'em lie chambers sealed by ancient stone doors. The Stone Key the Medusa guards shall open 'em, but only if thou hast earned her trust. Behind those doors, a stair awaits - one that leads deeper still, to wonders - or horrors - unknown. Seek it, if thou dare!",
              "options": [
                {
                  "id": "mole_post5_a",
                  "text": "I'll find this place.",
                  "available": true,
                  "closes": [
                    "mole_post1",
                    "mole_post2",
                    "mole_post3",
                    "mole_post4_give",
                    "mole_post5_reveal"
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
            "x": 2,
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
            "x": 43,
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
            "x": 2,
            "y": 32
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
            "x": 23,
            "y": 11
          },
          "targetMap": 3,
          "targetPosition": {
            "x": 3,
            "y": 0
          },
          "text": "You descend deeper into the ancient passage..."
        }
      ]
    },
    {
      "id": 3,
      "name": "The Depths",
      "defaultDescription": "A black and white depiction of a 1950s underground city. Dark alleys, dim street lamps, and the faint sound of distant dripping water.",
      "areaDescriptions": [
        {
          "x1": -3,
          "y1": 0,
          "x2": 3,
          "y2": 5,
          "description": "An empty square where the ancient stairs from the maze empty out. Faint light flickers from the street ahead."
        },
        {
          "x1": -6,
          "y1": -6,
          "x2": -5,
          "y2": 8,
          "description": "West Main Street. Dilapidated storefronts line the street, their windows dark and dusty. A flickering neon sign buzzes somewhere above."
        },
        {
          "x1": 11,
          "y1": -6,
          "x2": 12,
          "y2": 6,
          "description": "East Main Street. The road widens here, leading toward the docks. Crates and barrels are stacked against the walls."
        },
        {
          "x1": -10,
          "y1": -1,
          "x2": -9,
          "y2": 1,
          "description": "A narrow side street cutting north-south. Puddles of water reflect the dim glow of a single lamp."
        },
        {
          "x1": -10,
          "y1": 7,
          "x2": -7,
          "y2": 8,
          "description": "An eastern alley used by merchants to haul goods to and from the docks."
        },
        {
          "x1": -2,
          "y1": 12,
          "x2": -1,
          "y2": 13,
          "description": "Pier A1."
        },
        {
          "x1": 5,
          "y1": 12,
          "x2": 6,
          "y2": 13,
          "description": "Pier B2."
        },
        {
          "x1": 12,
          "y1": 12,
          "x2": 13,
          "y2": 13,
          "description": "Pier C3."
        },
        {
          "x1": 4,
          "y1": 2,
          "x2": 10,
          "y2": 3,
          "description": "A garbage-strewn alley. The walls are covered in old posters advertising circuses and miracle tonics."
        },
        {
          "x1": -4,
          "y1": 7,
          "x2": 15,
          "y2": 11,
          "description": "The Docks. An underground lake stretches into darkness, its waters still and black. A number of rickety wooden piers extends over the water."
        },
        {
          "x1": -2,
          "y1": -3,
          "x2": 1,
          "y2": -2,
          "description": "Sam Shales 'office'. A hollowed-out crevice with a crate desk and a candle stub. A single photograph's tacked to the wall - a woman's silhouette. Medusa, you'd guess."
        },
        {
          "x1": -4,
          "y1": -6,
          "x2": 10,
          "y2": -5,
          "description": "The 'business district' of this underground city - a row of hollowed-out alcoves that pass for storefronts. Sam Shale's office sits next to a dimly lit bar. A payphone rings. Nobody answers."
        },
        {
          "x1": 6,
          "y1": -3,
          "x2": 9,
          "y2": -1,
          "description": "A low-ceilinged joint carved out of a natural fissure. The bar is a plank across two barrels. A single bulb buzzes over a game of cards that never finishes. The special today is 'don't ask.'"
        },
        {
          "x1": -10,
          "y1": -7,
          "x2": -8,
          "y2": 4,
          "description": "'The Majestic.' A dusty room with peeling wallpaper, a single bed, a sink, and a window that looks out on a brick wall three inches away. The neon sign buzzes. The lock is broken. The previous guest left in a hurry."
        },
        {
          "x1": -6,
          "y1": -10,
          "x2": -4,
          "y2": -8,
          "description": " A desk, a cage, a sergeant who's seen too much. The 'station' here is a hollowed-out guard post with wanted posters from the surface world. A single bulb swings over a booking desk that's never booked anyone."
        },
        {
          "x1": -1,
          "y1": -10,
          "x2": 2,
          "y2": -8,
          "description": "'Honest Abe's.' Every item in the window was stolen twice. The owner knows everything but tells nothing - unless you know what to ask."
        },
        {
          "x1": 6,
          "y1": -10,
          "x2": 8,
          "y2": -8,
          "description": "'The Last Stop.' A formica counter, a coffee pot that's been on since 1952, and a waitress who calls everybody 'sugar.' The pie is awful. The coffee is worse. The info is golden."
        },
        {
          "x1": 11,
          "y1": -10,
          "x2": 14,
          "y2": -8,
          "description": "The basement of a basement. Red curtains, a piano player who only knows three songs, and a woman at the bar who's watching everyone."
        },
        {
          "x1": 14,
          "y1": -5,
          "x2": 16,
          "y2": -3,
          "description": "The Rooftop. The 'sky' is stalactites. The wind comes from somewhere deep below. A good place for a meet that nobody's supposed to see."
        },
        {
          "x1": 17,
          "y1": 8,
          "x2": 19,
          "y2": 10,
          "description": "A dusty office built from reclaimed crate wood. A ledger sits open on the desk - every page blank. A mug of cold coffee rests beside a compass that spins in circles. Through the grimy window, the black water lapping at the dock is the only thing that moves."
        }
      ],
      "tiles": {
        "xm10y2": {
          "x": -10,
          "y": 2
        },
        "xm10y3": {
          "x": -10,
          "y": 3
        },
        "xm9y2": {
          "x": -9,
          "y": 2
        },
        "xm9y3": {
          "x": -9,
          "y": 3
        },
        "xm8y2": {
          "x": -8,
          "y": 2
        },
        "xm8y3": {
          "x": -8,
          "y": 3
        },
        "xm7y2": {
          "x": -7,
          "y": 2
        },
        "xm7y3": {
          "x": -7,
          "y": 3
        },
        "xm6y2": {
          "x": -6,
          "y": 2
        },
        "xm6y3": {
          "x": -6,
          "y": 3
        },
        "xm5y2": {
          "x": -5,
          "y": 2
        },
        "xm5y3": {
          "x": -5,
          "y": 3
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
        "xm3y3": {
          "x": -3,
          "y": 3
        },
        "xm2y2": {
          "x": -2,
          "y": 2
        },
        "xm2y3": {
          "x": -2,
          "y": 3
        },
        "xm1y2": {
          "x": -1,
          "y": 2
        },
        "xm1y3": {
          "x": -1,
          "y": 3
        },
        "x0y2": {
          "x": 0,
          "y": 2
        },
        "x0y3": {
          "x": 0,
          "y": 3
        },
        "x1y2": {
          "x": 1,
          "y": 2
        },
        "x1y3": {
          "x": 1,
          "y": 3
        },
        "x2y2": {
          "x": 2,
          "y": 2
        },
        "x2y3": {
          "x": 2,
          "y": 3
        },
        "x3y2": {
          "x": 3,
          "y": 2
        },
        "x3y3": {
          "x": 3,
          "y": 3
        },
        "x4y2": {
          "x": 4,
          "y": 2
        },
        "x4y3": {
          "x": 4,
          "y": 3
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
        "x6y3": {
          "x": 6,
          "y": 3
        },
        "x7y2": {
          "x": 7,
          "y": 2
        },
        "x7y3": {
          "x": 7,
          "y": 3
        },
        "x8y2": {
          "x": 8,
          "y": 2
        },
        "x8y3": {
          "x": 8,
          "y": 3
        },
        "x9y2": {
          "x": 9,
          "y": 2
        },
        "x9y3": {
          "x": 9,
          "y": 3
        },
        "x10y2": {
          "x": 10,
          "y": 2
        },
        "x10y3": {
          "x": 10,
          "y": 3
        },
        "x11y2": {
          "x": 11,
          "y": 2
        },
        "x11y3": {
          "x": 11,
          "y": 3
        },
        "x12y2": {
          "x": 12,
          "y": 2
        },
        "x12y3": {
          "x": 12,
          "y": 3
        },
        "x13y2": {
          "x": 13,
          "y": 2
        },
        "x13y3": {
          "x": 13,
          "y": 3
        },
        "x14y2": {
          "x": 14,
          "y": 2
        },
        "x14y3": {
          "x": 14,
          "y": 3
        },
        "xm5ym1": {
          "x": -5,
          "y": -1
        },
        "xm5y0": {
          "x": -5,
          "y": 0
        },
        "xm5y1": {
          "x": -5,
          "y": 1
        },
        "xm5y4": {
          "x": -5,
          "y": 4
        },
        "xm5y5": {
          "x": -5,
          "y": 5
        },
        "xm5y6": {
          "x": -5,
          "y": 6
        },
        "xm5y7": {
          "x": -5,
          "y": 7
        },
        "xm5y8": {
          "x": -5,
          "y": 8
        },
        "x2y0": {
          "x": 2,
          "y": 0
        },
        "x2y1": {
          "x": 2,
          "y": 1
        },
        "x2y4": {
          "x": 2,
          "y": 4
        },
        "x2y5": {
          "x": 2,
          "y": 5
        },
        "x2y7": {
          "x": 2,
          "y": 7
        },
        "x2y8": {
          "x": 2,
          "y": 8
        },
        "x9y7": {
          "x": 9,
          "y": 7
        },
        "x9y8": {
          "x": 9,
          "y": 8
        },
        "x3y0": {
          "x": 3,
          "y": 0
        },
        "x3y1": {
          "x": 3,
          "y": 1
        },
        "xm3y0": {
          "x": -3,
          "y": 0
        },
        "xm3y1": {
          "x": -3,
          "y": 1
        },
        "xm2y0": {
          "x": -2,
          "y": 0
        },
        "xm2y1": {
          "x": -2,
          "y": 1
        },
        "xm1y0": {
          "x": -1,
          "y": 0
        },
        "xm1y1": {
          "x": -1,
          "y": 1
        },
        "x0y0": {
          "x": 0,
          "y": 0
        },
        "x0y1": {
          "x": 0,
          "y": 1
        },
        "x1y0": {
          "x": 1,
          "y": 0
        },
        "x1y1": {
          "x": 1,
          "y": 1
        },
        "xm3y5": {
          "x": -3,
          "y": 5
        },
        "xm2y5": {
          "x": -2,
          "y": 5
        },
        "xm1y5": {
          "x": -1,
          "y": 5
        },
        "x0y5": {
          "x": 0,
          "y": 5
        },
        "x1y5": {
          "x": 1,
          "y": 5
        },
        "x11y0": {
          "x": 11,
          "y": 0
        },
        "x11y1": {
          "x": 11,
          "y": 1
        },
        "x12y0": {
          "x": 12,
          "y": 0
        },
        "x12y1": {
          "x": 12,
          "y": 1
        },
        "x11y4": {
          "x": 11,
          "y": 4
        },
        "x11y5": {
          "x": 11,
          "y": 5
        },
        "x12y4": {
          "x": 12,
          "y": 4
        },
        "x12y5": {
          "x": 12,
          "y": 5
        },
        "xm4y8": {
          "x": -4,
          "y": 8
        },
        "xm4y9": {
          "x": -4,
          "y": 9
        },
        "xm4y10": {
          "x": -4,
          "y": 10
        },
        "xm4y11": {
          "x": -4,
          "y": 11
        },
        "xm4y12": {
          "x": -4,
          "y": 12,
          "type": 1
        },
        "xm3y8": {
          "x": -3,
          "y": 8
        },
        "xm3y9": {
          "x": -3,
          "y": 9
        },
        "xm3y10": {
          "x": -3,
          "y": 10
        },
        "xm3y11": {
          "x": -3,
          "y": 11
        },
        "xm3y12": {
          "x": -3,
          "y": 12,
          "type": 1
        },
        "xm2y8": {
          "x": -2,
          "y": 8
        },
        "xm2y9": {
          "x": -2,
          "y": 9
        },
        "xm2y10": {
          "x": -2,
          "y": 10
        },
        "xm2y11": {
          "x": -2,
          "y": 11
        },
        "xm2y12": {
          "x": -2,
          "y": 12,
          "type": 5
        },
        "xm1y8": {
          "x": -1,
          "y": 8
        },
        "xm1y9": {
          "x": -1,
          "y": 9
        },
        "xm1y10": {
          "x": -1,
          "y": 10
        },
        "xm1y11": {
          "x": -1,
          "y": 11
        },
        "xm1y12": {
          "x": -1,
          "y": 12,
          "type": 5
        },
        "x0y8": {
          "x": 0,
          "y": 8
        },
        "x0y9": {
          "x": 0,
          "y": 9
        },
        "x0y10": {
          "x": 0,
          "y": 10
        },
        "x0y11": {
          "x": 0,
          "y": 11
        },
        "x0y12": {
          "x": 0,
          "y": 12,
          "type": 1
        },
        "x1y8": {
          "x": 1,
          "y": 8
        },
        "x1y9": {
          "x": 1,
          "y": 9
        },
        "x1y10": {
          "x": 1,
          "y": 10
        },
        "x1y11": {
          "x": 1,
          "y": 11
        },
        "x1y12": {
          "x": 1,
          "y": 12,
          "type": 1
        },
        "x2y9": {
          "x": 2,
          "y": 9
        },
        "x2y10": {
          "x": 2,
          "y": 10
        },
        "x2y11": {
          "x": 2,
          "y": 11
        },
        "x2y12": {
          "x": 2,
          "y": 12,
          "type": 1
        },
        "x3y8": {
          "x": 3,
          "y": 8
        },
        "x3y9": {
          "x": 3,
          "y": 9
        },
        "x3y10": {
          "x": 3,
          "y": 10
        },
        "x3y11": {
          "x": 3,
          "y": 11
        },
        "x3y12": {
          "x": 3,
          "y": 12,
          "type": 1
        },
        "x4y8": {
          "x": 4,
          "y": 8
        },
        "x4y9": {
          "x": 4,
          "y": 9
        },
        "x4y10": {
          "x": 4,
          "y": 10
        },
        "x4y11": {
          "x": 4,
          "y": 11
        },
        "x4y12": {
          "x": 4,
          "y": 12,
          "type": 1
        },
        "x5y8": {
          "x": 5,
          "y": 8
        },
        "x5y9": {
          "x": 5,
          "y": 9
        },
        "x5y10": {
          "x": 5,
          "y": 10
        },
        "x5y11": {
          "x": 5,
          "y": 11
        },
        "x5y12": {
          "x": 5,
          "y": 12,
          "type": 5
        },
        "x6y8": {
          "x": 6,
          "y": 8
        },
        "x6y9": {
          "x": 6,
          "y": 9
        },
        "x6y10": {
          "x": 6,
          "y": 10
        },
        "x6y11": {
          "x": 6,
          "y": 11
        },
        "x6y12": {
          "x": 6,
          "y": 12,
          "type": 5
        },
        "x7y8": {
          "x": 7,
          "y": 8
        },
        "x7y9": {
          "x": 7,
          "y": 9
        },
        "x7y10": {
          "x": 7,
          "y": 10
        },
        "x7y11": {
          "x": 7,
          "y": 11
        },
        "x7y12": {
          "x": 7,
          "y": 12,
          "type": 1
        },
        "x8y8": {
          "x": 8,
          "y": 8
        },
        "x8y9": {
          "x": 8,
          "y": 9
        },
        "x8y10": {
          "x": 8,
          "y": 10
        },
        "x8y11": {
          "x": 8,
          "y": 11
        },
        "x8y12": {
          "x": 8,
          "y": 12,
          "type": 1
        },
        "x9y9": {
          "x": 9,
          "y": 9
        },
        "x9y10": {
          "x": 9,
          "y": 10
        },
        "x9y11": {
          "x": 9,
          "y": 11
        },
        "x9y12": {
          "x": 9,
          "y": 12,
          "type": 1
        },
        "x10y8": {
          "x": 10,
          "y": 8
        },
        "x10y9": {
          "x": 10,
          "y": 9
        },
        "x10y10": {
          "x": 10,
          "y": 10
        },
        "x10y11": {
          "x": 10,
          "y": 11
        },
        "x10y12": {
          "x": 10,
          "y": 12,
          "type": 1
        },
        "x11y8": {
          "x": 11,
          "y": 8
        },
        "x11y9": {
          "x": 11,
          "y": 9
        },
        "x11y10": {
          "x": 11,
          "y": 10
        },
        "x11y11": {
          "x": 11,
          "y": 11
        },
        "x11y12": {
          "x": 11,
          "y": 12,
          "type": 1
        },
        "x12y8": {
          "x": 12,
          "y": 8
        },
        "x12y9": {
          "x": 12,
          "y": 9
        },
        "x12y10": {
          "x": 12,
          "y": 10
        },
        "x12y11": {
          "x": 12,
          "y": 11
        },
        "x12y12": {
          "x": 12,
          "y": 12,
          "type": 5
        },
        "x13y8": {
          "x": 13,
          "y": 8
        },
        "x13y9": {
          "x": 13,
          "y": 9
        },
        "x13y10": {
          "x": 13,
          "y": 10
        },
        "x13y11": {
          "x": 13,
          "y": 11
        },
        "x13y12": {
          "x": 13,
          "y": 12,
          "type": 5
        },
        "x14y8": {
          "x": 14,
          "y": 8
        },
        "x14y9": {
          "x": 14,
          "y": 9
        },
        "x14y10": {
          "x": 14,
          "y": 10
        },
        "x14y11": {
          "x": 14,
          "y": 11
        },
        "x14y12": {
          "x": 14,
          "y": 12,
          "type": 1
        },
        "xm4y7": {
          "x": -4,
          "y": 7
        },
        "xm3y7": {
          "x": -3,
          "y": 7
        },
        "xm2y7": {
          "x": -2,
          "y": 7
        },
        "xm1y7": {
          "x": -1,
          "y": 7
        },
        "x0y7": {
          "x": 0,
          "y": 7
        },
        "x1y7": {
          "x": 1,
          "y": 7
        },
        "x3y7": {
          "x": 3,
          "y": 7
        },
        "x4y7": {
          "x": 4,
          "y": 7
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
        "x10y7": {
          "x": 10,
          "y": 7
        },
        "x11y7": {
          "x": 11,
          "y": 7
        },
        "x12y7": {
          "x": 12,
          "y": 7
        },
        "x13y7": {
          "x": 13,
          "y": 7
        },
        "x14y7": {
          "x": 14,
          "y": 7
        },
        "xm3y4": {
          "x": -3,
          "y": 4
        },
        "xm2y4": {
          "x": -2,
          "y": 4
        },
        "xm1y4": {
          "x": -1,
          "y": 4
        },
        "x0y4": {
          "x": 0,
          "y": 4
        },
        "x1y4": {
          "x": 1,
          "y": 4
        },
        "x3y4": {
          "x": 3,
          "y": 4
        },
        "x3y5": {
          "x": 3,
          "y": 5
        },
        "xm6y1": {
          "x": -6,
          "y": 1
        },
        "xm6y0": {
          "x": -6,
          "y": 0
        },
        "xm6ym1": {
          "x": -6,
          "y": -1
        },
        "xm6y4": {
          "x": -6,
          "y": 4
        },
        "xm6y5": {
          "x": -6,
          "y": 5
        },
        "xm6y6": {
          "x": -6,
          "y": 6
        },
        "xm6y7": {
          "x": -6,
          "y": 7
        },
        "xm6y8": {
          "x": -6,
          "y": 8
        },
        "xm7y8": {
          "x": -7,
          "y": 8
        },
        "xm7y7": {
          "x": -7,
          "y": 7
        },
        "xm8y7": {
          "x": -8,
          "y": 7
        },
        "xm8y8": {
          "x": -8,
          "y": 8
        },
        "xm9y8": {
          "x": -9,
          "y": 8
        },
        "xm9y7": {
          "x": -9,
          "y": 7
        },
        "xm10y8": {
          "x": -10,
          "y": 8
        },
        "xm10y7": {
          "x": -10,
          "y": 7
        },
        "x11y6": {
          "x": 11,
          "y": 6
        },
        "x12y6": {
          "x": 12,
          "y": 6
        },
        "xm5ym2": {
          "x": -5,
          "y": -2
        },
        "xm5ym3": {
          "x": -5,
          "y": -3
        },
        "xm5ym4": {
          "x": -5,
          "y": -4
        },
        "xm5ym5": {
          "x": -5,
          "y": -5
        },
        "xm5ym6": {
          "x": -5,
          "y": -6
        },
        "xm6ym6": {
          "x": -6,
          "y": -6
        },
        "xm6ym5": {
          "x": -6,
          "y": -5
        },
        "xm6ym4": {
          "x": -6,
          "y": -4
        },
        "xm6ym3": {
          "x": -6,
          "y": -3
        },
        "xm6ym2": {
          "x": -6,
          "y": -2
        },
        "xm4ym5": {
          "x": -4,
          "y": -5
        },
        "xm3ym5": {
          "x": -3,
          "y": -5
        },
        "xm2ym5": {
          "x": -2,
          "y": -5
        },
        "xm2ym6": {
          "x": -2,
          "y": -6
        },
        "xm3ym6": {
          "x": -3,
          "y": -6
        },
        "xm4ym6": {
          "x": -4,
          "y": -6
        },
        "xm1ym4": {
          "x": -1,
          "y": -4
        },
        "xm1ym5": {
          "x": -1,
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
        "xm1ym6": {
          "x": -1,
          "y": -6
        },
        "x1ym5": {
          "x": 1,
          "y": -5
        },
        "x1ym6": {
          "x": 1,
          "y": -6
        },
        "x2ym6": {
          "x": 2,
          "y": -6
        },
        "x2ym5": {
          "x": 2,
          "y": -5
        },
        "x3ym5": {
          "x": 3,
          "y": -5
        },
        "x3ym6": {
          "x": 3,
          "y": -6
        },
        "x4ym6": {
          "x": 4,
          "y": -6
        },
        "x5ym5": {
          "x": 5,
          "y": -5
        },
        "x4ym5": {
          "x": 4,
          "y": -5
        },
        "x5ym6": {
          "x": 5,
          "y": -6
        },
        "x6ym6": {
          "x": 6,
          "y": -6
        },
        "x6ym5": {
          "x": 6,
          "y": -5
        },
        "x12ym1": {
          "x": 12,
          "y": -1
        },
        "x11ym1": {
          "x": 11,
          "y": -1
        },
        "x11ym2": {
          "x": 11,
          "y": -2
        },
        "x12ym2": {
          "x": 12,
          "y": -2
        },
        "x12ym3": {
          "x": 12,
          "y": -3
        },
        "x11ym3": {
          "x": 11,
          "y": -3
        },
        "x11ym4": {
          "x": 11,
          "y": -4
        },
        "x12ym4": {
          "x": 12,
          "y": -4
        },
        "x12ym5": {
          "x": 12,
          "y": -5
        },
        "x11ym5": {
          "x": 11,
          "y": -5
        },
        "x11ym6": {
          "x": 11,
          "y": -6
        },
        "x12ym6": {
          "x": 12,
          "y": -6
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
        "x7ym5": {
          "x": 7,
          "y": -5
        },
        "x7ym6": {
          "x": 7,
          "y": -6
        },
        "x8ym5": {
          "x": 8,
          "y": -5
        },
        "x9ym5": {
          "x": 9,
          "y": -5
        },
        "x10ym5": {
          "x": 10,
          "y": -5
        },
        "xm4y13": {
          "x": -4,
          "y": 13,
          "type": 1
        },
        "xm3y13": {
          "x": -3,
          "y": 13,
          "type": 1
        },
        "xm5y12": {
          "x": -5,
          "y": 12,
          "type": 1
        },
        "xm5y13": {
          "x": -5,
          "y": 13,
          "type": 1
        },
        "xm2y13": {
          "x": -2,
          "y": 13,
          "type": 5
        },
        "xm1y13": {
          "x": -1,
          "y": 13,
          "type": 5
        },
        "x0y13": {
          "x": 0,
          "y": 13,
          "type": 1
        },
        "x1y13": {
          "x": 1,
          "y": 13,
          "type": 1
        },
        "x2y13": {
          "x": 2,
          "y": 13,
          "type": 1
        },
        "x3y13": {
          "x": 3,
          "y": 13,
          "type": 1
        },
        "x4y13": {
          "x": 4,
          "y": 13,
          "type": 1
        },
        "x6y13": {
          "x": 6,
          "y": 13,
          "type": 5
        },
        "x5y13": {
          "x": 5,
          "y": 13,
          "type": 5
        },
        "x7y13": {
          "x": 7,
          "y": 13,
          "type": 1
        },
        "x8y13": {
          "x": 8,
          "y": 13,
          "type": 1
        },
        "x9y13": {
          "x": 9,
          "y": 13,
          "type": 1
        },
        "x10y13": {
          "x": 10,
          "y": 13,
          "type": 1
        },
        "x11y13": {
          "x": 11,
          "y": 13,
          "type": 1
        },
        "x12y13": {
          "x": 12,
          "y": 13,
          "type": 5
        },
        "x13y13": {
          "x": 13,
          "y": 13,
          "type": 5
        },
        "x15y12": {
          "x": 15,
          "y": 12,
          "type": 1
        },
        "x15y13": {
          "x": 15,
          "y": 13,
          "type": 1
        },
        "x14y13": {
          "x": 14,
          "y": 13,
          "type": 1
        },
        "xm6y13": {
          "x": -6,
          "y": 13,
          "type": 1
        },
        "x16y13": {
          "x": 16,
          "y": 13,
          "type": 1
        },
        "x16y14": {
          "x": 16,
          "y": 14,
          "type": 1
        },
        "x15y14": {
          "x": 15,
          "y": 14,
          "type": 1
        },
        "x14y14": {
          "x": 14,
          "y": 14,
          "type": 1
        },
        "x13y14": {
          "x": 13,
          "y": 14,
          "type": 1
        },
        "x12y14": {
          "x": 12,
          "y": 14,
          "type": 1
        },
        "x11y14": {
          "x": 11,
          "y": 14,
          "type": 1
        },
        "x9y14": {
          "x": 9,
          "y": 14,
          "type": 1
        },
        "x10y14": {
          "x": 10,
          "y": 14,
          "type": 1
        },
        "x8y14": {
          "x": 8,
          "y": 14,
          "type": 1
        },
        "x7y14": {
          "x": 7,
          "y": 14,
          "type": 1
        },
        "x6y14": {
          "x": 6,
          "y": 14,
          "type": 1
        },
        "x5y14": {
          "x": 5,
          "y": 14,
          "type": 1
        },
        "x4y14": {
          "x": 4,
          "y": 14,
          "type": 1
        },
        "x3y14": {
          "x": 3,
          "y": 14,
          "type": 1
        },
        "x1y14": {
          "x": 1,
          "y": 14,
          "type": 1
        },
        "x2y14": {
          "x": 2,
          "y": 14,
          "type": 1
        },
        "x0y14": {
          "x": 0,
          "y": 14,
          "type": 1
        },
        "xm1y14": {
          "x": -1,
          "y": 14,
          "type": 1
        },
        "xm3y14": {
          "x": -3,
          "y": 14,
          "type": 1
        },
        "xm2y14": {
          "x": -2,
          "y": 14,
          "type": 1
        },
        "xm4y14": {
          "x": -4,
          "y": 14,
          "type": 1
        },
        "xm5y14": {
          "x": -5,
          "y": 14,
          "type": 1
        },
        "xm6y14": {
          "x": -6,
          "y": 14,
          "type": 1
        },
        "x15y11": {
          "x": 15,
          "y": 11,
          "type": 0
        },
        "x15y10": {
          "x": 15,
          "y": 10,
          "type": 0
        },
        "x15y9": {
          "x": 15,
          "y": 9,
          "type": 0
        },
        "x15y8": {
          "x": 15,
          "y": 8,
          "type": 0
        },
        "x15y7": {
          "x": 15,
          "y": 7,
          "type": 0
        },
        "x15y15": {
          "x": 15,
          "y": 15,
          "type": 1
        },
        "x13y15": {
          "x": 13,
          "y": 15,
          "type": 1
        },
        "x14y15": {
          "x": 14,
          "y": 15,
          "type": 1
        },
        "x12y15": {
          "x": 12,
          "y": 15,
          "type": 1
        },
        "x11y15": {
          "x": 11,
          "y": 15,
          "type": 1
        },
        "x10y15": {
          "x": 10,
          "y": 15,
          "type": 1
        },
        "x9y15": {
          "x": 9,
          "y": 15,
          "type": 1
        },
        "x8y15": {
          "x": 8,
          "y": 15,
          "type": 1
        },
        "x7y15": {
          "x": 7,
          "y": 15,
          "type": 1
        },
        "x5y15": {
          "x": 5,
          "y": 15,
          "type": 1
        },
        "x6y15": {
          "x": 6,
          "y": 15,
          "type": 1
        },
        "xm4y15": {
          "x": -4,
          "y": 15,
          "type": 1
        },
        "xm3y15": {
          "x": -3,
          "y": 15,
          "type": 1
        },
        "xm2y15": {
          "x": -2,
          "y": 15,
          "type": 1
        },
        "xm1y15": {
          "x": -1,
          "y": 15,
          "type": 1
        },
        "x0y15": {
          "x": 0,
          "y": 15,
          "type": 1
        },
        "x1y15": {
          "x": 1,
          "y": 15,
          "type": 1
        },
        "x3y15": {
          "x": 3,
          "y": 15,
          "type": 1
        },
        "x4y15": {
          "x": 4,
          "y": 15,
          "type": 1
        },
        "x2y15": {
          "x": 2,
          "y": 15,
          "type": 1
        },
        "xm5y15": {
          "x": -5,
          "y": 15,
          "type": 1
        },
        "x16y12": {
          "x": 16,
          "y": 12,
          "type": 1
        },
        "x17y13": {
          "x": 17,
          "y": 13,
          "type": 1
        },
        "x17y14": {
          "x": 17,
          "y": 14,
          "type": 1
        },
        "x16y15": {
          "x": 16,
          "y": 15,
          "type": 1
        },
        "x0ym7": {
          "x": 0,
          "y": -7,
          "type": 0
        },
        "x2ym9": {
          "x": 2,
          "y": -9,
          "type": 2
        },
        "x1ym9": {
          "x": 1,
          "y": -9,
          "type": 2
        },
        "xm1ym10": {
          "x": -1,
          "y": -10,
          "type": 2
        },
        "x0ym10": {
          "x": 0,
          "y": -10,
          "type": 2
        },
        "x1ym10": {
          "x": 1,
          "y": -10,
          "type": 2
        },
        "x2ym10": {
          "x": 2,
          "y": -10,
          "type": 2
        },
        "x2ym8": {
          "x": 2,
          "y": -8,
          "type": 2
        },
        "x0ym8": {
          "x": 0,
          "y": -8,
          "type": 2
        },
        "xm1ym9": {
          "x": -1,
          "y": -9,
          "type": 2
        },
        "xm1ym8": {
          "x": -1,
          "y": -8,
          "type": 2
        },
        "x0ym9": {
          "x": 0,
          "y": -9,
          "type": 2
        },
        "x1ym8": {
          "x": 1,
          "y": -8,
          "type": 2
        },
        "xm2ym3": {
          "x": -2,
          "y": -3,
          "type": 2
        },
        "xm1ym3": {
          "x": -1,
          "y": -3,
          "type": 2
        },
        "x0ym3": {
          "x": 0,
          "y": -3,
          "type": 2
        },
        "x1ym3": {
          "x": 1,
          "y": -3,
          "type": 2
        },
        "x1ym2": {
          "x": 1,
          "y": -2,
          "type": 2
        },
        "xm1ym2": {
          "x": -1,
          "y": -2,
          "type": 2
        },
        "xm2ym2": {
          "x": -2,
          "y": -2,
          "type": 2
        },
        "x0ym2": {
          "x": 0,
          "y": -2,
          "type": 2
        },
        "x8ym4": {
          "x": 8,
          "y": -4,
          "type": 0
        },
        "x8ym3": {
          "x": 8,
          "y": -3,
          "type": 2
        },
        "x7ym3": {
          "x": 7,
          "y": -3,
          "type": 2
        },
        "x8ym2": {
          "x": 8,
          "y": -2,
          "type": 2
        },
        "x7ym2": {
          "x": 7,
          "y": -2,
          "type": 2
        },
        "x8ym1": {
          "x": 8,
          "y": -1,
          "type": 2
        },
        "x9ym3": {
          "x": 9,
          "y": -3,
          "type": 2
        },
        "x9ym2": {
          "x": 9,
          "y": -2,
          "type": 2
        },
        "x9ym1": {
          "x": 9,
          "y": -1,
          "type": 2
        },
        "x7ym1": {
          "x": 7,
          "y": -1,
          "type": 2
        },
        "x6ym3": {
          "x": 6,
          "y": -3,
          "type": 2
        },
        "x6ym2": {
          "x": 6,
          "y": -2,
          "type": 2
        },
        "x6ym1": {
          "x": 6,
          "y": -1,
          "type": 2
        },
        "x15y2": {
          "x": 15,
          "y": 2,
          "type": 0
        },
        "x15y1": {
          "x": 15,
          "y": 1,
          "type": 0
        },
        "x15y0": {
          "x": 15,
          "y": 0,
          "type": 0
        },
        "x15ym1": {
          "x": 15,
          "y": -1,
          "type": 0
        },
        "x16ym1": {
          "x": 16,
          "y": -1,
          "type": 0
        },
        "x16y0": {
          "x": 16,
          "y": 0,
          "type": 0
        },
        "x16y1": {
          "x": 16,
          "y": 1,
          "type": 0
        },
        "x16y2": {
          "x": 16,
          "y": 2,
          "type": 0
        },
        "x16y3": {
          "x": 16,
          "y": 3,
          "type": 0
        },
        "x15y3": {
          "x": 15,
          "y": 3,
          "type": 0
        },
        "xm10y1": {
          "x": -10,
          "y": 1,
          "type": 0
        },
        "xm9y1": {
          "x": -9,
          "y": 1,
          "type": 0
        },
        "xm9y0": {
          "x": -9,
          "y": 0,
          "type": 0
        },
        "xm10y0": {
          "x": -10,
          "y": 0,
          "type": 0
        },
        "xm9ym1": {
          "x": -9,
          "y": -1,
          "type": 0
        },
        "xm10ym1": {
          "x": -10,
          "y": -1,
          "type": 0
        },
        "x7ym7": {
          "x": 7,
          "y": -7,
          "type": 0
        },
        "x8ym10": {
          "x": 8,
          "y": -10,
          "type": 2
        },
        "x8ym9": {
          "x": 8,
          "y": -9,
          "type": 2
        },
        "x8ym8": {
          "x": 8,
          "y": -8,
          "type": 2
        },
        "x7ym9": {
          "x": 7,
          "y": -9,
          "type": 2
        },
        "x7ym10": {
          "x": 7,
          "y": -10,
          "type": 2
        },
        "x7ym8": {
          "x": 7,
          "y": -8,
          "type": 2
        },
        "x6ym8": {
          "x": 6,
          "y": -8,
          "type": 2
        },
        "x6ym9": {
          "x": 6,
          "y": -9,
          "type": 2
        },
        "x6ym10": {
          "x": 6,
          "y": -10,
          "type": 2
        },
        "xm8ym4": {
          "x": -8,
          "y": -4,
          "type": 2
        },
        "xm8ym5": {
          "x": -8,
          "y": -5,
          "type": 2
        },
        "xm8ym6": {
          "x": -8,
          "y": -6,
          "type": 2
        },
        "xm8ym7": {
          "x": -8,
          "y": -7,
          "type": 2
        },
        "xm9ym7": {
          "x": -9,
          "y": -7,
          "type": 2
        },
        "xm9ym6": {
          "x": -9,
          "y": -6,
          "type": 2
        },
        "xm9ym5": {
          "x": -9,
          "y": -5,
          "type": 2
        },
        "xm9ym4": {
          "x": -9,
          "y": -4,
          "type": 2
        },
        "xm10ym4": {
          "x": -10,
          "y": -4,
          "type": 2
        },
        "xm10ym5": {
          "x": -10,
          "y": -5,
          "type": 2
        },
        "xm10ym6": {
          "x": -10,
          "y": -6,
          "type": 2
        },
        "xm10ym7": {
          "x": -10,
          "y": -7,
          "type": 2
        },
        "xm7ym5": {
          "x": -7,
          "y": -5,
          "type": 0
        },
        "x13ym5": {
          "x": 13,
          "y": -5,
          "type": 0
        },
        "x14ym5": {
          "x": 14,
          "y": -5,
          "type": 2
        },
        "x14ym4": {
          "x": 14,
          "y": -4,
          "type": 2
        },
        "x14ym3": {
          "x": 14,
          "y": -3,
          "type": 2
        },
        "x15ym3": {
          "x": 15,
          "y": -3,
          "type": 2
        },
        "x15ym4": {
          "x": 15,
          "y": -4,
          "type": 2
        },
        "x15ym5": {
          "x": 15,
          "y": -5,
          "type": 2
        },
        "x16ym5": {
          "x": 16,
          "y": -5,
          "type": 2
        },
        "x16ym4": {
          "x": 16,
          "y": -4,
          "type": 2
        },
        "x16ym3": {
          "x": 16,
          "y": -3,
          "type": 2
        },
        "xm5ym7": {
          "x": -5,
          "y": -7,
          "type": 0
        },
        "xm5ym8": {
          "x": -5,
          "y": -8,
          "type": 2
        },
        "xm4ym8": {
          "x": -4,
          "y": -8,
          "type": 2
        },
        "xm4ym9": {
          "x": -4,
          "y": -9,
          "type": 2
        },
        "xm5ym9": {
          "x": -5,
          "y": -9,
          "type": 2
        },
        "xm6ym8": {
          "x": -6,
          "y": -8,
          "type": 2
        },
        "xm6ym9": {
          "x": -6,
          "y": -9,
          "type": 2
        },
        "xm6ym10": {
          "x": -6,
          "y": -10,
          "type": 2
        },
        "xm5ym10": {
          "x": -5,
          "y": -10,
          "type": 2
        },
        "xm4ym10": {
          "x": -4,
          "y": -10,
          "type": 2
        },
        "x11ym8": {
          "x": 11,
          "y": -8,
          "type": 2
        },
        "x11ym9": {
          "x": 11,
          "y": -9,
          "type": 2
        },
        "x11ym10": {
          "x": 11,
          "y": -10,
          "type": 2
        },
        "x12ym10": {
          "x": 12,
          "y": -10,
          "type": 2
        },
        "x12ym9": {
          "x": 12,
          "y": -9,
          "type": 2
        },
        "x12ym8": {
          "x": 12,
          "y": -8,
          "type": 2
        },
        "x11ym7": {
          "x": 11,
          "y": -7,
          "type": 0
        },
        "x13ym10": {
          "x": 13,
          "y": -10,
          "type": 2
        },
        "x13ym9": {
          "x": 13,
          "y": -9,
          "type": 2
        },
        "x13ym8": {
          "x": 13,
          "y": -8,
          "type": 2
        },
        "x14ym8": {
          "x": 14,
          "y": -8,
          "type": 2
        },
        "x14ym9": {
          "x": 14,
          "y": -9,
          "type": 2
        },
        "x14ym10": {
          "x": 14,
          "y": -10,
          "type": 2
        },
        "x16y9": {
          "x": 16,
          "y": 9,
          "type": 0
        },
        "x17y9": {
          "x": 17,
          "y": 9,
          "type": 2
        },
        "x17y8": {
          "x": 17,
          "y": 8,
          "type": 2
        },
        "x18y8": {
          "x": 18,
          "y": 8,
          "type": 2
        },
        "x19y9": {
          "x": 19,
          "y": 9,
          "type": 2
        },
        "x19y8": {
          "x": 19,
          "y": 8,
          "type": 2
        },
        "x18y9": {
          "x": 18,
          "y": 9,
          "type": 2
        },
        "x17y10": {
          "x": 17,
          "y": 10,
          "type": 2
        },
        "x18y10": {
          "x": 18,
          "y": 10,
          "type": 2
        },
        "x19y10": {
          "x": 19,
          "y": 10,
          "type": 2
        }
      },
      "monsters": [],
      "obstacles": [
        {
          "type": 13,
          "position": {
            "x": 6,
            "y": -5
          }
        },
        {
          "type": 13,
          "position": {
            "x": -5,
            "y": 0
          }
        },
        {
          "type": 13,
          "position": {
            "x": -8,
            "y": 3
          }
        },
        {
          "type": 13,
          "position": {
            "x": 2,
            "y": -5
          }
        },
        {
          "type": 13,
          "position": {
            "x": -5,
            "y": 5
          }
        },
        {
          "type": 13,
          "position": {
            "x": -9,
            "y": 8
          }
        },
        {
          "type": 13,
          "position": {
            "x": 14,
            "y": 10
          }
        },
        {
          "type": 13,
          "position": {
            "x": -6,
            "y": 8
          }
        },
        {
          "type": 13,
          "position": {
            "x": 2,
            "y": 1
          }
        },
        {
          "type": 13,
          "position": {
            "x": -2,
            "y": 1
          }
        },
        {
          "type": 13,
          "position": {
            "x": -5,
            "y": -3
          }
        },
        {
          "type": 13,
          "position": {
            "x": 2,
            "y": 3
          },
          "lightRadius": 2
        },
        {
          "type": 13,
          "position": {
            "x": 2,
            "y": 5
          }
        },
        {
          "type": 13,
          "position": {
            "x": -2,
            "y": 5
          }
        },
        {
          "type": 13,
          "position": {
            "x": -3,
            "y": -5
          }
        },
        {
          "type": 13,
          "position": {
            "x": 2,
            "y": 8
          }
        },
        {
          "type": 13,
          "position": {
            "x": 11,
            "y": 0
          }
        },
        {
          "type": 13,
          "position": {
            "x": 13,
            "y": 2
          }
        },
        {
          "type": 13,
          "position": {
            "x": 9,
            "y": 3
          }
        },
        {
          "type": 13,
          "position": {
            "x": 11,
            "y": 5
          }
        },
        {
          "type": 13,
          "position": {
            "x": 14,
            "y": 8
          }
        },
        {
          "type": 13,
          "position": {
            "x": 16,
            "y": 3
          }
        },
        {
          "type": 13,
          "position": {
            "x": -10,
            "y": 0
          }
        },
        {
          "type": 13,
          "position": {
            "x": -6,
            "y": -6
          }
        },
        {
          "type": 13,
          "position": {
            "x": 16,
            "y": 0
          },
          "lightRadius": 2
        },
        {
          "type": 13,
          "position": {
            "x": 0,
            "y": 3
          }
        },
        {
          "type": 13,
          "position": {
            "x": 2,
            "y": 10
          }
        },
        {
          "type": 13,
          "position": {
            "x": 5,
            "y": 3
          }
        },
        {
          "type": 13,
          "position": {
            "x": 6,
            "y": 10
          }
        },
        {
          "type": 13,
          "position": {
            "x": 10,
            "y": -5
          }
        },
        {
          "type": 13,
          "position": {
            "x": -2,
            "y": 8
          }
        },
        {
          "type": 13,
          "position": {
            "x": 6,
            "y": 8
          }
        },
        {
          "type": 13,
          "position": {
            "x": 10,
            "y": 8
          },
          "lightRadius": 2
        },
        {
          "type": 13,
          "position": {
            "x": 12,
            "y": -3
          }
        },
        {
          "type": 13,
          "position": {
            "x": -2,
            "y": 10
          }
        },
        {
          "type": 13,
          "position": {
            "x": 10,
            "y": 10
          }
        },
        {
          "type": 14,
          "position": {
            "x": -10,
            "y": -1
          }
        },
        {
          "type": 14,
          "position": {
            "x": 15,
            "y": -1
          },
          "itemType": 8
        },
        {
          "type": 14,
          "position": {
            "x": 6,
            "y": 12
          }
        },
        {
          "type": 14,
          "position": {
            "x": 4,
            "y": 7
          }
        },
        {
          "type": 14,
          "position": {
            "x": -10,
            "y": 7
          }
        },
        {
          "type": 14,
          "position": {
            "x": -8,
            "y": -7
          },
          "itemType": 10
        },
        {
          "type": 15,
          "position": {
            "x": -6,
            "y": -8
          }
        },
        {
          "type": 15,
          "position": {
            "x": -4,
            "y": 11
          }
        },
        {
          "type": 15,
          "position": {
            "x": 14,
            "y": -3
          },
          "itemType": 9
        },
        {
          "type": 15,
          "position": {
            "x": 6,
            "y": -10
          }
        },
        {
          "type": 15,
          "position": {
            "x": 15,
            "y": 7
          }
        },
        {
          "type": 15,
          "position": {
            "x": -3,
            "y": 0
          },
          "itemType": 11
        }
      ],
      "npcs": [
        {
          "type": 5,
          "position": {
            "x": 2,
            "y": 2
          },
          "movement": 0.15,
          "dialogOptions": [
            {
              "id": "detectiveq0",
              "available": true,
              "text": "A shadowy figure in a trenchcoat leans against the damp wall, his fedora casting his face in shadow. He takes a long drag from a cigarette that isn't lit. 'The name's Sam Shale. I'm looking for a dame. Long legs, scales, hair full of snakes. Goes by Medusa. You seen her?'",
              "options": [
                {
                  "id": "detectivea0y",
                  "text": "Yeah, she's back in the caves above.",
                  "available": true,
                  "opens": [
                    "detectiveq1"
                  ],
                  "closes": [
                    "detectiveq0"
                  ],
                  "chains": [
                    "detective_jester"
                  ]
                },
                {
                  "id": "detectivea0n",
                  "text": "No, I haven't seen anyone like that.",
                  "available": true,
                  "closes": [
                    "detectiveq0"
                  ]
                }
              ]
            },
            {
              "id": "detectiveq1",
              "available": false,
              "text": "As if he did not notice the Jester he nods slowly. 'Figured as much. That dame's been around longer than these tunnels. She knows things. If you're looking to get out of this hole, she's your best bet. But be careful - she's got a past that follows her like a shadow.' He tips his hat. 'I'm done here. Watch your back, kid.'",
              "options": [
                {
                  "id": "detectivea1",
                  "text": "Thanks for the tip.",
                  "available": true,
                  "closes": [
                    "detectiveq1"
                  ],
                  "opens": [
                    "detective_help_intro"
                  ]
                }
              ]
            },
            {
              "id": "detective_jester",
              "available": false,
              "speaker": 2,
              "text": "A cackling laugh echoes from the shadows. The Jester steps forward, twirling his bauble. 'The great Sam Shale! Still chasing dames through the underworld! He's been looking for Medusa since before these tunnels were dug. Won't ever find her, but it's fun to watch!' He winks and vanishes back into the darkness.",
              "options": [
                {
                  "id": "detective_jester_a",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detectiveq1"
                  ],
                  "closes": [
                    "detective_jester"
                  ]
                }
              ]
            },
            {
              "id": "detective_help_intro",
              "available": false,
              "text": "Sam's eyes narrow. He glances over his shoulder at the flickering shadows. 'Kid, I need your help. But these tunnels got ears in the walls and eyes in the floor. I know a place we can talk without an audience. Tell me when you're ready'",
              "options": [
                {
                  "id": "detective_help_intro_ready",
                  "text": "I'm ready. Let's go.",
                  "available": true,
                  "closes": [
                    "detective_help_intro"
                  ]
                },
                {
                  "id": "detective_help_intro_later",
                  "text": "Maybe later.",
                  "available": true,
                  "closes": [
                    "detective_help_intro"
                  ]
                }
              ]
            },
            {
              "id": "detective_ready",
              "available": false,
              "text": "'Alright, follow my lead. And try to look like you belong - not that anyone down here does.' He pushes off the wall and jerks his head toward the darkness.",
              "options": [
                {
                  "id": "detective_ready_go",
                  "text": "Let's go.",
                  "available": true
                },
                {
                  "id": "detective_ready_notyet",
                  "text": "Not ready yet. Give me a minute.",
                  "available": true,
                  "closes": [
                    "detective_ready"
                  ],
                  "opens": [
                    "detective_help_intro"
                  ]
                }
              ]
            },
            {
              "id": "detective_arrival",
              "available": false,
              "text": "Sam settles onto a crate and gestures for you to sit. 'Alright, kid. We're alone now. Well, as alone as anyone gets in a joint like this. I've been on this case for longer than I care to admit. Medusa. The dame with the snake eyes. She's the key to this whole underground maze - I can feel it in my bones. Every lead I get turns to dust. But I've got a few threads left to pull. You in?'",
              "options": [
                {
                  "id": "detective_arrival_in",
                  "text": "I'm in. Where do we start?",
                  "available": true
                },
                {
                  "id": "detective_arrival_out",
                  "text": "I don't know, Sam. This seems dangerous.",
                  "available": true,
                  "chains": [
                    "detective_arrival_doubt"
                  ]
                }
              ]
            },
            {
              "id": "detective_arrival_doubt",
              "available": false,
              "text": "Sam chuckles dryly. 'Kid, everything down here is dangerous. The difference is, I've got a plan. Stick with me.'",
              "options": [
                {
                  "id": "detective_arrival_doubt_in",
                  "text": "Alright, I'm in.",
                  "available": true
                }
              ]
            },
            {
              "id": "detective_precinct",
              "available": false,
              "text": "Sam pushes through the creaking door of the precinct and approaches the desk. 'Sergeant. Got a minute?'",
              "options": [
                {
                  "id": "detective_precinct_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_precinct_sgt"
                  ]
                }
              ]
            },
            {
              "id": "detective_precinct_sgt",
              "available": false,
              "speaker": 2,
              "text": "'(Jester attempting a gruff cop voice) Shale! You're still alive. That's either good police work or bad luck.' The Sergeant shuffles a stack of papers noisily. 'What do you want?'",
              "options": [
                {
                  "id": "detective_precinct_sgt_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_precinct_info"
                  ]
                }
              ]
            },
            {
              "id": "detective_precinct_info",
              "available": false,
              "speaker": 2,
              "text": "'Let me check my... uh... report file.' More shuffling. 'Yeah, I got something. A guy was brought in - vagrant - kept rambling about the snake woman. Said she was heading west. Through the maintenance tunnels.'",
              "options": [
                {
                  "id": "detective_precinct_info_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_precinct_thanks"
                  ]
                }
              ]
            },
            {
              "id": "detective_precinct_thanks",
              "available": false,
              "text": "'Thanks, Sergeant. You've been... helpful.'",
              "options": [
                {
                  "id": "detective_precinct_thanks_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_precinct_sgt_final"
                  ]
                }
              ]
            },
            {
              "id": "detective_precinct_sgt_final",
              "available": false,
              "speaker": 2,
              "text": "'That's what I'm here for. Serving. Protecting. Filing.'",
              "options": [
                {
                  "id": "detective_precinct_sgt_final_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_precinct_after"
                  ]
                }
              ]
            },
            {
              "id": "detective_precinct_after",
              "available": false,
              "text": "Sam turns to you, lowering his voice. 'The maintenance tunnels are a bust, but if she was heading west, she'd have passed through the old market district. There's a guy there who sees everything - Abe. Runs a pawn shop.'",
              "options": [
                {
                  "id": "detective_precinct_go",
                  "text": "Let's go see Abe.",
                  "available": true
                },
                {
                  "id": "detective_precinct_doubt",
                  "text": "Is the Sergeant reliable?",
                  "available": true,
                  "chains": [
                    "detective_precinct_reliable"
                  ]
                }
              ]
            },
            {
              "id": "detective_precinct_reliable",
              "available": false,
              "text": "Sam shrugs. 'About as reliable as a three-dollar watch. But it's all we got.'",
              "options": [
                {
                  "id": "detective_precinct_go2",
                  "text": "Let's go see Abe.",
                  "available": true
                }
              ]
            },
            {
              "id": "detective_abe",
              "available": false,
              "text": "A bell jingles as Sam ducks through the bead curtain of Honest Abe's. The shop is packed floor to ceiling with junk and treasures. 'Abe. You in?'",
              "options": [
                {
                  "id": "detective_abe_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_abe_char"
                  ]
                }
              ]
            },
            {
              "id": "detective_abe_char",
              "available": false,
              "speaker": 2,
              "text": "From behind a mountain of mismatched lamps, a voice replies in a bad Yiddish-coded accent, clearly the Jester having fun: 'Sammy Shale! Long time no pawn! You here to sell or to stare at my magnificent collection of stuff?' Abe emerges, grinning too wide. 'I got information. I got misinformation. I got stuff that looks like information but is actually just a potato. You gotta be specific.'",
              "options": [
                {
                  "id": "detective_abe_char_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_abe_medusa"
                  ]
                }
              ]
            },
            {
              "id": "detective_abe_medusa",
              "available": false,
              "speaker": 2,
              "text": "'Medusa! The name I know, the face I don't. Very mysterious. Very dangerous. Very overrated, if you ask me.' Abe leans on the counter conspiratorially. 'She came through. Bought a compass. Old-fashioned one. Paid with a gold coin that was definitely not minted anywhere official. Asked about the Rooftop. Specifically. Said she needed to see the stars.' He laughs. 'Don't ask me why - there ain't no stars down here.'",
              "options": [
                {
                  "id": "detective_abe_medusa_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_abe_after"
                  ]
                }
              ]
            },
            {
              "id": "detective_abe_after",
              "available": false,
              "text": "Sam nods slowly. 'The Rooftop. That's an old smugglers' lookout. If she was headed there, she was meeting someone.' He turns to you. 'We're taking the service alley.'",
              "options": [
                {
                  "id": "detective_abe_go",
                  "text": "Let's head to the Rooftop.",
                  "available": true
                },
                {
                  "id": "detective_abe_what",
                  "text": "What's on the Rooftop?",
                  "available": true,
                  "chains": [
                    "detective_abe_explain"
                  ]
                }
              ]
            },
            {
              "id": "detective_abe_explain",
              "available": false,
              "text": "'A meeting spot. Old smugglers used it to watch for heat coming through the tunnels. If she was headed there, she was waiting for somebody - or something.'",
              "options": [
                {
                  "id": "detective_abe_go2",
                  "text": "Let's go.",
                  "available": true
                }
              ]
            },
            {
              "id": "detective_rooftop",
              "available": false,
              "text": "Sam climbs the rusted ladder to a high ledge overlooking the cavern. Stalactites hang low like a stone sky. The wind howls from somewhere deep below. 'He said he'd be here. The informant. Jittery guy - goes by Mouse.'",
              "options": [
                {
                  "id": "detective_rooftop_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_rooftop_mouse"
                  ]
                }
              ]
            },
            {
              "id": "detective_rooftop_mouse",
              "available": false,
              "speaker": 2,
              "text": "A figure emerges from behind a crate, hunched and twitchy, doing a squeaky voice. 'Shale! Man, you're late! I been standing here for like... a really long time! I got a life, you know!' He glances around nervously. 'The snake woman. I saw her. Three nights ago. She was heading toward the diner - The Last Stop. Met with somebody there. Couldn't see who. But when she left... she was crying.' He shivers. 'Weird, right? What's a dame with snakes for hair got to cry about? I'm out. Don't find me again.' He scurries off.",
              "options": [
                {
                  "id": "detective_rooftop_mouse_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_rooftop_after"
                  ]
                }
              ]
            },
            {
              "id": "detective_rooftop_after",
              "available": false,
              "text": "Sam stares at the spot where Mouse disappeared. 'Crying. That don't sound like the dame I knew. She wasn't the crying type. Something's wrong.' He turns to you. 'The Last Stop. If she was meeting someone there, maybe the waitress saw something. Flo runs that place like a CIA black site - notices everything.'",
              "options": [
                {
                  "id": "detective_rooftop_go",
                  "text": "Let's check the diner.",
                  "available": true
                }
              ]
            },
            {
              "id": "detective_diner",
              "available": false,
              "text": "A neon sign buzzes 'THE LAST STOP' in flickering pink. Inside, the counter is cracked formica. Sam slides into a booth. 'Flo. You working?'",
              "options": [
                {
                  "id": "detective_diner_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_diner_flo"
                  ]
                }
              ]
            },
            {
              "id": "detective_diner_flo",
              "available": false,
              "speaker": 2,
              "text": "A figure in a stained apron appears, wiping the counter with a rag that's seen better days. 'Sam Shale. If it ain't my favorite customer who never orders anything. Coffee's fresh. By which I mean it was made sometime this week.' She leans in. 'You're here about her, ain't you? The snake-eyed dame. Came in three nights ago. Looked like she hadn't slept in a week. Ordered pie. Didn't eat it. Just pushed it around with her fork. Talked to some fella in a long coat. Private booth.' She pulls a photograph from her apron. 'Left this behind.'",
              "options": [
                {
                  "id": "detective_diner_flo_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_diner_after"
                  ]
                }
              ]
            },
            {
              "id": "detective_diner_after",
              "available": false,
              "text": "Sam takes the photograph. It's Medusa - younger, smiling, standing next to a man whose face is torn off. He stares at it for a long moment, then pockets it. 'Thanks, Flo. The man she met - you know him?' Flo shakes her head. 'Wish I did. Would've made better conversation.' Sam turns to you. 'The Dock Master. He's been here longer than anyone. If anybody knows where she went after that meeting, it's him.'",
              "options": [
                {
                  "id": "detective_diner_go",
                  "text": "Let's go see the Dock Master.",
                  "available": true
                }
              ]
            },
            {
              "id": "detective_jazz",
              "available": false,
              "text": "Sam stops outside a doorway draped in red curtains. Muffled piano notes drift through. 'Hold up. I know a guy in here. Plays piano. Might've heard something.'",
              "options": [
                {
                  "id": "detective_jazz_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_jazz_piano"
                  ]
                }
              ]
            },
            {
              "id": "detective_jazz_piano",
              "available": false,
              "speaker": 2,
              "text": "Inside, a figure in a beret plays a upright piano without ever looking up. He speaks in a rambling stream, never missing a note. 'Sam Shale. Heard you was asking around about the Gorgon. She came through. Told me something funny. Said she was looking for a way out. Not the tunnels, not the surface. A way out of something inside her head. Then she ordered a drink. Paid for it. Didn't drink it. Just left. Looked at me when she left. Like she was saying goodbye to everybody, man. To the whole scene.' He finally glances up. 'She had that look. The look of someone who's about to do something they can't take back. Dig?'",
              "options": [
                {
                  "id": "detective_jazz_piano_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_jazz_after"
                  ]
                }
              ]
            },
            {
              "id": "detective_jazz_after",
              "available": false,
              "text": "Sam stands in the doorway, the piano still playing behind him. 'Saying goodbye. To everybody.' He rubs his jaw. 'We need to get to the docks. Now.'",
              "options": [
                {
                  "id": "detective_jazz_go",
                  "text": "Let's move.",
                  "available": true
                }
              ]
            },
            {
              "id": "detective_dockmaster",
              "available": false,
              "text": "The Dock Master's office is a cratewood shack overlooking black water. A brass telescope points into the dark. A grizzled figure sits with his boots up on the desk. 'Shale. Figured you'd turn up eventually. She said you would.'",
              "options": [
                {
                  "id": "detective_dockmaster_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_dockmaster_char"
                  ]
                }
              ]
            },
            {
              "id": "detective_dockmaster_char",
              "available": false,
              "speaker": 2,
              "text": "The Dock Master swings his boots off the desk and reaches into a drawer. 'She talked about nothing but you for about twenty minutes. Said if anyone came looking, it'd be you. Knew you'd follow. Knew you'd never give up.' He slides a folded letter across the desk. 'Gave me this. Said to give it to the detective with the tired eyes.'",
              "options": [
                {
                  "id": "detective_dockmaster_char_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_dockmaster_letter"
                  ]
                }
              ]
            },
            {
              "id": "detective_dockmaster_letter",
              "available": false,
              "text": "Sam takes the letter. His hand trembles slightly as he unfolds it. He reads silently, then reads aloud, his voice rough:",
              "options": [
                {
                  "id": "detective_dockmaster_letter_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_dockmaster_after"
                  ]
                }
              ]
            },
            {
              "id": "detective_dockmaster_after",
              "available": false,
              "text": "Sam, if you're reading this, I'm already gone. Not from the tunnels - from everything. I found what I was looking for. Not escape. Not treasure. Just peace. A will be crossing the lake to the Beach. There's a tunnel there that opens into a place the light don't reach. I'm going there. Don't follow. You've got a good heart, Sam Shale. Even if you pretend you don't. - Medusa.",
              "options": [
                {
                  "id": "detective_dockmaster_go",
                  "text": "We can still catch her.",
                  "available": true
                },
                {
                  "id": "detective_dockmaster_leave",
                  "text": "Let her go, Sam.",
                  "available": true
                }
              ]
            },
            {
              "id": "detective_dockmaster_catch",
              "available": false,
              "text": "Sam shakes his head slowly. 'No, kid. She don't want to be caught. Never did.' He folds the letter carefully and puts it in his pocket. 'Let her have her peace. It's more than most of us get down here.'",
              "options": [
                {
                  "id": "detective_dockmaster_catch_c",
                  "text": "...",
                  "available": true,
                  "chains": [
                    "detective_pier"
                  ]
                }
              ]
            },
            {
              "id": "detective_pier",
              "available": false,
              "text": "Sam walks to the end of Pier C3. The black water laps against the wooden pilings. He stands there for a long time, staring into it the darkness. Then he turns away. He slowly walks back toward the city without looking back. The search for Medusa is over. At the edge of the pier he pauses and looks back. 'I'll be in my office if you need me.' Then he disappears into the shadows.",
              "options": [
                {
                  "id": "detective_pier_a1",
                  "text": "...",
                  "available": true,
                  "closes": [
                    "detective_pier"
                  ]
                }
              ]
            },
            {
              "id": "detective_office",
              "available": false,
              "text": "Sam is sitting at his crate desk, staring at the photograph of Medusa's silhouette. He doesn't look up when you enter. 'I've been sitting here trying to process it all. Medusa was never the dame I was chasing. She was running from something. From herself, I reckon.' He finally looks at you. 'I spent so long chasing shadows down here that I forgot to ask why she left in the first place.' He offers a faint smile. 'Thanks, kid. For sticking with me to the end. I need some time to figure out what comes next.' He turns the photograph face down on the desk. 'But if you ever need a hand, you know where to find me.'",
              "options": [
                {
                  "id": "detective_office_a1",
                  "text": "...",
                  "available": true,
                  "closes": []
                }
              ]
            }
          ]
        },
        {
          "type": 6,
          "position": {
            "x": 0,
            "y": 13
          },
          "movement": 0,
          "dialogOptions": [
            {
              "id": "ship_intro",
              "available": true,
              "text": "A derelict ship lies anchored at the dock, its hull weathered and listing. The vessel is in disrepair - the rudder is gone, the mast is snapped, the steering wheel is missing, and the sail is tattered to shreds. It looks barely seaworthy, but perhaps with the right parts...",
              "options": [
                {
                  "id": "ship_attach_rudder",
                  "text": "Attach the rudder",
                  "available": true,
                  "requiresItems": [
                    8
                  ]
                },
                {
                  "id": "ship_attach_mast",
                  "text": "Attach the mast",
                  "available": true,
                  "requiresItems": [
                    9
                  ]
                },
                {
                  "id": "ship_attach_wheel",
                  "text": "Attach the steering wheel",
                  "available": true,
                  "requiresItems": [
                    10
                  ]
                },
                {
                  "id": "ship_attach_sail",
                  "text": "Attach the sail",
                  "available": true,
                  "requiresItems": [
                    11
                  ]
                },
                {
                  "id": "ship_leave",
                  "text": "Leave",
                  "available": true
                }
              ]
            },
            {
              "id": "ship_ready",
              "available": false,
              "text": "The ship is now fully repaired. The rudder is secured, the mast stands tall, the steering wheel is in place, and the sail catches the faint underground breeze. The derelict vessel looks seaworthy at last.",
              "options": [
                {
                  "id": "ship_depart",
                  "text": "Depart",
                  "available": false,
                  "chains": [
                    "ship_departure"
                  ]
                },
                {
                  "id": "ship_ready_leave",
                  "text": "Leave",
                  "available": true
                }
              ]
            },
            {
              "id": "ship_departure",
              "available": false,
              "text": "The ship groans as it pulls away from the dock. The dark water of the underground lake ripples beneath you as the vessel glides forward into the unknown...",
              "options": [
                {
                  "id": "ship_departure_go",
                  "text": "...",
                  "available": true,
                  "closes": [
                    "ship_departure"
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
            "x": 2,
            "y": 0
          },
          "targetMap": 2,
          "targetPosition": {
            "x": 23,
            "y": 11
          },
          "text": "You climb back up the ancient stairs..."
        }
      ]
    },
    {
      "id": 4,
      "name": "The Beach",
      "defaultDescription": "A vast underground lake stretches before you. The water is still and black, but there is a sandy shore here - the Beach.",
      "tiles": {
        "x0y0": {
          "x": 0,
          "y": 0,
          "type": 0
        },
        "x1y0": {
          "x": 1,
          "y": 0,
          "type": 6
        },
        "x1y1": {
          "x": 1,
          "y": 1,
          "type": 6
        },
        "x2y0": {
          "x": 2,
          "y": 0,
          "type": 6
        },
        "x2y1": {
          "x": 2,
          "y": 1,
          "type": 6
        },
        "x2y2": {
          "x": 2,
          "y": 2,
          "type": 6
        },
        "x3y0": {
          "x": 3,
          "y": 0,
          "type": 1
        },
        "x3y1": {
          "x": 3,
          "y": 1,
          "type": 1
        },
        "x3y2": {
          "x": 3,
          "y": 2,
          "type": 1
        },
        "x4y3": {
          "x": 4,
          "y": 3,
          "type": 1
        },
        "x4y2": {
          "x": 4,
          "y": 2,
          "type": 1
        },
        "x4y1": {
          "x": 4,
          "y": 1,
          "type": 1
        },
        "x4y0": {
          "x": 4,
          "y": 0,
          "type": 1
        },
        "x2ym1": {
          "x": 2,
          "y": -1,
          "type": 1
        },
        "x2ym2": {
          "x": 2,
          "y": -2,
          "type": 1
        },
        "x3ym2": {
          "x": 3,
          "y": -2,
          "type": 1
        },
        "x4ym1": {
          "x": 4,
          "y": -1,
          "type": 1
        },
        "x4ym2": {
          "x": 4,
          "y": -2,
          "type": 1
        },
        "x3ym1": {
          "x": 3,
          "y": -1,
          "type": 1
        },
        "x1ym1": {
          "x": 1,
          "y": -1,
          "type": 6
        },
        "x1ym2": {
          "x": 1,
          "y": -2,
          "type": 6
        },
        "x0ym2": {
          "x": 0,
          "y": -2,
          "type": 6
        },
        "x0ym1": {
          "x": 0,
          "y": -1,
          "type": 6
        },
        "x3y3": {
          "x": 3,
          "y": 3,
          "type": 6
        },
        "x2y3": {
          "x": 2,
          "y": 3,
          "type": 6
        },
        "x1y3": {
          "x": 1,
          "y": 3,
          "type": 6
        },
        "x1y2": {
          "x": 1,
          "y": 2,
          "type": 6
        },
        "x0y2": {
          "x": 0,
          "y": 2,
          "type": 0
        },
        "x0y1": {
          "x": 0,
          "y": 1,
          "type": 0
        },
        "x0y3": {
          "x": 0,
          "y": 3,
          "type": 0
        },
        "x3y4": {
          "x": 3,
          "y": 4,
          "type": 6
        },
        "x2y4": {
          "x": 2,
          "y": 4,
          "type": 6
        },
        "x0y4": {
          "x": 0,
          "y": 4,
          "type": 0
        },
        "x1y4": {
          "x": 1,
          "y": 4,
          "type": 6
        },
        "x4y4": {
          "x": 4,
          "y": 4,
          "type": 1
        },
        "x5y4": {
          "x": 5,
          "y": 4,
          "type": 1
        },
        "x5y3": {
          "x": 5,
          "y": 3,
          "type": 1
        },
        "x5y1": {
          "x": 5,
          "y": 1,
          "type": 1
        },
        "x5y0": {
          "x": 5,
          "y": 0,
          "type": 1
        },
        "x5ym1": {
          "x": 5,
          "y": -1,
          "type": 1
        },
        "x5ym2": {
          "x": 5,
          "y": -2,
          "type": 1
        },
        "x5y2": {
          "x": 5,
          "y": 2,
          "type": 1
        },
        "x4y5": {
          "x": 4,
          "y": 5,
          "type": 1
        },
        "x5y5": {
          "x": 5,
          "y": 5,
          "type": 1
        },
        "x3y5": {
          "x": 3,
          "y": 5,
          "type": 1
        },
        "x2y5": {
          "x": 2,
          "y": 5,
          "type": 6
        },
        "x1y5": {
          "x": 1,
          "y": 5,
          "type": 6
        },
        "x0y5": {
          "x": 0,
          "y": 5,
          "type": 0
        },
        "x2y6": {
          "x": 2,
          "y": 6,
          "type": 6
        },
        "x1y7": {
          "x": 1,
          "y": 7,
          "type": 6
        },
        "x1y6": {
          "x": 1,
          "y": 6,
          "type": 6
        },
        "x0y7": {
          "x": 0,
          "y": 7,
          "type": 6
        },
        "x0y8": {
          "x": 0,
          "y": 8,
          "type": 6
        },
        "x0y6": {
          "x": 0,
          "y": 6,
          "type": 0
        },
        "x3y6": {
          "x": 3,
          "y": 6,
          "type": 1
        },
        "x4y6": {
          "x": 4,
          "y": 6,
          "type": 1
        },
        "x5y6": {
          "x": 5,
          "y": 6,
          "type": 1
        },
        "x5y7": {
          "x": 5,
          "y": 7,
          "type": 1
        },
        "x4y7": {
          "x": 4,
          "y": 7,
          "type": 1
        },
        "x3y7": {
          "x": 3,
          "y": 7,
          "type": 1
        },
        "x2y7": {
          "x": 2,
          "y": 7,
          "type": 1
        },
        "x1y8": {
          "x": 1,
          "y": 8,
          "type": 1
        },
        "x2y8": {
          "x": 2,
          "y": 8,
          "type": 1
        },
        "x3y8": {
          "x": 3,
          "y": 8,
          "type": 1
        },
        "x4y8": {
          "x": 4,
          "y": 8,
          "type": 1
        },
        "x5y8": {
          "x": 5,
          "y": 8,
          "type": 1
        },
        "x1ym3": {
          "x": 1,
          "y": -3,
          "type": 6
        },
        "x0ym3": {
          "x": 0,
          "y": -3,
          "type": 6
        },
        "x0ym4": {
          "x": 0,
          "y": -4,
          "type": 6
        },
        "x1ym4": {
          "x": 1,
          "y": -4,
          "type": 1
        },
        "x2ym4": {
          "x": 2,
          "y": -4,
          "type": 1
        },
        "x2ym3": {
          "x": 2,
          "y": -3,
          "type": 1
        },
        "x3ym3": {
          "x": 3,
          "y": -3,
          "type": 1
        },
        "x3ym4": {
          "x": 3,
          "y": -4,
          "type": 1
        },
        "x4ym4": {
          "x": 4,
          "y": -4,
          "type": 1
        },
        "x4ym3": {
          "x": 4,
          "y": -3,
          "type": 1
        },
        "x5ym3": {
          "x": 5,
          "y": -3,
          "type": 1
        },
        "x5ym4": {
          "x": 5,
          "y": -4,
          "type": 1
        }
      },
      "monsters": [],
      "obstacles": [],
      "npcs": [
        {
          "type": 6,
          "position": {
            "x": 3,
            "y": 0
          },
          "movement": 0,
          "dialogOptions": [
            {
              "id": "ship_beach",
              "available": true,
              "text": "The ship rests at the water's edge, its repaired hull creaking softly. The dark lake stretches into the distance, still and black, leading back toward the docks you came from.",
              "options": [
                {
                  "id": "ship_beach_leave",
                  "text": "Board the ship and return to the docks.",
                  "available": true,
                  "closes": [
                    "ship_beach"
                  ]
                },
                {
                  "id": "ship_beach_stay",
                  "text": "Not yet. I want to look around.",
                  "available": true,
                  "closes": [
                    "ship_beach"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": 7,
          "position": {
            "x": 2,
            "y": 2
          },
          "movement": 0,
          "dialogOptions": [
            {
              "id": "charon_intro",
              "available": true,
              "text": "An ancient figure sits upon the sand, wrapped in a tattered cloak and gripping a long wooden pole. His eyes are milky, fixed on the black water. He does not turn as you approach, but his voice rumbles like distant thunder:\n'Stranger who walks on this desolate strand,\nSpeak now your name or your purpose,\nFor Charon am I - or so I have been told -\nThe ferryman of these dark and forgotten waters.\nI have carried the lost from one shadow to another\nFor longer than memory serves me.\nI know faces - the Jester, the Hermit, the Mole,\nMedusa with her serpentine crown,\nAnd Shale, that hound of the lost.\nAll have crossed my boat at some time or another.\nBut when? And why? Ah, that I cannot say.\nThe past is a fog that thickens by the moment.\nWhat is it you seek, wanderer, on this lonely shore?'",
              "options": [
                {
                  "id": "charon_intro_ask",
                  "text": "Ask about someone you know.",
                  "available": true,
                  "chains": [
                    "charon_ask"
                  ]
                },
                {
                  "id": "charon_intro_self",
                  "text": "Tell me about yourself.",
                  "available": true,
                  "chains": [
                    "charon_self"
                  ]
                },
                {
                  "id": "charon_intro_exit",
                  "text": "How do I get off this beach?",
                  "available": true,
                  "chains": [
                    "charon_exit"
                  ]
                },
                {
                  "id": "charon_intro_leave",
                  "text": "Goodbye.",
                  "available": true,
                  "closes": [
                    "charon_intro"
                  ]
                }
              ]
            },
            {
              "id": "charon_self",
              "available": false,
              "text": "He squints at you, then at his hands, then back at the water.\n'Myself? A question I have not considered\nIn a great many crossings of this black lake.\nI am Charon, they say - the boatman.\nI carry souls from shore to distant shore\nIn a vessel that groans like the dying.\nThe oar remembers the way even when I do not.\nI remember a time before the tunnels,\nWhen the sky was a thing above, not a roof of stone.\nBut that was another age, another Charon.\nThis one sits and waits and ferries.\nWhat else is there for an old man with a boat?'\nHe trails off, staring into the dark water, and seems to forget you asked.",
              "options": [
                {
                  "id": "charon_self_back",
                  "text": "Fascinating. What else?",
                  "available": true,
                  "chains": [
                    "charon_self"
                  ]
                },
                {
                  "id": "charon_self_ask",
                  "text": "Ask about someone you know.",
                  "available": true,
                  "chains": [
                    "charon_ask"
                  ]
                },
                {
                  "id": "charon_self_leave",
                  "text": "I'll leave you to your thoughts.",
                  "available": true,
                  "closes": [
                    "charon_self",
                    "charon_intro"
                  ]
                }
              ]
            },
            {
              "id": "charon_ask",
              "available": false,
              "text": "He taps his pole on the sand, stirring faint ripples.\n'Which of them would you know about?\nI will tell you what I remember - or what I think I remember.\nChoose, and I shall speak.'",
              "options": [
                {
                  "id": "charon_ask_hermit",
                  "text": "Tell me about the Hermit.",
                  "available": true,
                  "chains": [
                    "charon_hermit"
                  ]
                },
                {
                  "id": "charon_ask_jester",
                  "text": "Tell me about the Jester.",
                  "available": true,
                  "chains": [
                    "charon_jester"
                  ]
                },
                {
                  "id": "charon_ask_medusa",
                  "text": "Tell me about Medusa.",
                  "available": true,
                  "chains": [
                    "charon_medusa"
                  ]
                },
                {
                  "id": "charon_ask_mole",
                  "text": "Tell me about the Mole.",
                  "available": true,
                  "chains": [
                    "charon_mole"
                  ]
                },
                {
                  "id": "charon_ask_sam",
                  "text": "Tell me about Sam Shale.",
                  "available": true,
                  "chains": [
                    "charon_sam"
                  ]
                },
                {
                  "id": "charon_ask_leave",
                  "text": "Never mind.",
                  "available": true,
                  "closes": [
                    "charon_ask"
                  ]
                }
              ]
            },
            {
              "id": "charon_hermit",
              "available": false,
              "text": "The old boatman leans on his pole, staring into the darkness.\n'The Hermit - ah, the hoarder of green.\nHe has sat in his cave so long\nThat the stones have learned his breathing.\nHe trades what he should keep\nAnd keeps what he should trade.\nA fool and a scholar in one skin.\nHe crossed my boat once, clutching a bundle of herbs\nAs if they were made of gold itself.\nI asked him where he was going.\nHe said: \"Deeper.\"\nThat is all he ever says. Deeper.'",
              "options": [
                {
                  "id": "charon_hermit_back",
                  "text": "Ask about someone else.",
                  "available": true,
                  "chains": [
                    "charon_ask"
                  ]
                },
                {
                  "id": "charon_hermit_self",
                  "text": "Tell me about yourself.",
                  "available": true,
                  "chains": [
                    "charon_self"
                  ]
                },
                {
                  "id": "charon_hermit_exit",
                  "text": "How do I leave this place?",
                  "available": true,
                  "chains": [
                    "charon_exit"
                  ]
                },
                {
                  "id": "charon_hermit_leave",
                  "text": "Goodbye.",
                  "available": true,
                  "closes": [
                    "charon_hermit",
                    "charon_ask",
                    "charon_intro",
                    "charon_self"
                  ]
                }
              ]
            },
            {
              "id": "charon_jester",
              "available": false,
              "text": "Charon chuckles - a dry, rasping sound.\n'The Jester - a creature of noise and mischief.\nHe crossed with me once, singing a song\nThat had no beginning and certainly no end.\nHe spoke of the Hermit with cruel affection,\nAnd of Medusa as if she were a riddle to solve.\nHe fears nothing and forgets less than I - a rare gift.\nWhen he stepped ashore, he tipped his hat\nAnd said: \"Same time tomorrow, old man!\"\nThen he vanished into the dark, laughing.\nI have not seen him since.\nOr perhaps I have. I cannot recall.'",
              "options": [
                {
                  "id": "charon_jester_back",
                  "text": "Ask about someone else.",
                  "available": true,
                  "chains": [
                    "charon_ask"
                  ]
                },
                {
                  "id": "charon_jester_self",
                  "text": "Tell me about yourself.",
                  "available": true,
                  "chains": [
                    "charon_self"
                  ]
                },
                {
                  "id": "charon_jester_exit",
                  "text": "How do I leave this place?",
                  "available": true,
                  "chains": [
                    "charon_exit"
                  ]
                },
                {
                  "id": "charon_jester_leave",
                  "text": "Goodbye.",
                  "available": true,
                  "closes": [
                    "charon_jester",
                    "charon_ask",
                    "charon_intro",
                    "charon_self"
                  ]
                }
              ]
            },
            {
              "id": "charon_medusa",
              "available": false,
              "text": "Charon's grip tightens on his pole. His voice drops.\n'Medusa - ah, the serpent-crowned one.\nI ferried her across this very lake\nNot long ago - or was it long ago?\nTime slips from me like water from this oar.\nShe spoke of peace. Of finding an end.\nBut there was a shadow in her eyes when she said it -\nAs if she was running from something.\nSomething older than these tunnels.\nA presence that dwells below all other depths.\nShe asked me once if I had ever carried\nA passenger who left no ripple in the water.\nI said the water always remembers.\nShe said: \"No. Some things pass through\nWithout leaving a trace. I have met one.\"\nThen she fell silent and would not speak\nAgain until I reached the shore.\nI do not know what she meant.\nBut I have felt it too - a coldness in the deep.\nA name I cannot grasp.'\nHe stares at the black water, shivering.",
              "options": [
                {
                  "id": "charon_medusa_back",
                  "text": "Ask about someone else.",
                  "available": true,
                  "chains": [
                    "charon_ask"
                  ]
                },
                {
                  "id": "charon_medusa_self",
                  "text": "Tell me about yourself.",
                  "available": true,
                  "chains": [
                    "charon_self"
                  ]
                },
                {
                  "id": "charon_medusa_exit",
                  "text": "How do I leave this place?",
                  "available": true,
                  "chains": [
                    "charon_exit"
                  ]
                },
                {
                  "id": "charon_medusa_leave",
                  "text": "Goodbye.",
                  "available": true,
                  "closes": [
                    "charon_medusa",
                    "charon_ask",
                    "charon_intro",
                    "charon_self"
                  ]
                }
              ]
            },
            {
              "id": "charon_mole",
              "available": false,
              "text": "Charon wrinkles his nose as if catching a bad smell.\n'The Mole - a creature of darkness deep.\nHe digs not for treasure but for purpose,\nCarving his maze in the earth's belly.\nHis words are old and twisted as roots.\nI do not trust him, but I respect his patience.\nWhen I carried him across, he sat in silence\nAnd stared at the water the whole way.\nAs he stepped off, he said:\n\"The earth remembers every tunnel.\nIt remembers the things that crawl in them too.\"\nThen he was gone, into the dark.'",
              "options": [
                {
                  "id": "charon_mole_back",
                  "text": "Ask about someone else.",
                  "available": true,
                  "chains": [
                    "charon_ask"
                  ]
                },
                {
                  "id": "charon_mole_self",
                  "text": "Tell me about yourself.",
                  "available": true,
                  "chains": [
                    "charon_self"
                  ]
                },
                {
                  "id": "charon_mole_exit",
                  "text": "How do I leave this place?",
                  "available": true,
                  "chains": [
                    "charon_exit"
                  ]
                },
                {
                  "id": "charon_mole_leave",
                  "text": "Goodbye.",
                  "available": true,
                  "closes": [
                    "charon_mole",
                    "charon_ask",
                    "charon_intro",
                    "charon_self"
                  ]
                }
              ]
            },
            {
              "id": "charon_sam",
              "available": false,
              "text": "Charon squints as if trying to see through fog.\n'Sam Shale - the restless one.\nHe has never crossed my lake, but he has asked\nA thousand questions about the far shore.\nHe is looking for something he will not name.\nThat is the most dangerous kind of search.\nHe came to the water's edge once, alone,\nAnd stood there for an hour, staring across.\nI asked if he wanted to cross.\nHe said: \"Not yet. I'm not done looking.\"\nThen he walked away.\nI have not seen him since.\nHe is still looking. That much I know.'",
              "options": [
                {
                  "id": "charon_sam_back",
                  "text": "Ask about someone else.",
                  "available": true,
                  "chains": [
                    "charon_ask"
                  ]
                },
                {
                  "id": "charon_sam_self",
                  "text": "Tell me about yourself.",
                  "available": true,
                  "chains": [
                    "charon_self"
                  ]
                },
                {
                  "id": "charon_sam_exit",
                  "text": "How do I leave this place?",
                  "available": true,
                  "chains": [
                    "charon_exit"
                  ]
                },
                {
                  "id": "charon_sam_leave",
                  "text": "Goodbye.",
                  "available": true,
                  "closes": [
                    "charon_sam",
                    "charon_ask",
                    "charon_intro",
                    "charon_self"
                  ]
                }
              ]
            },
            {
              "id": "charon_exit",
              "available": false,
              "text": "He gestures vaguely at the cave wall behind him.\n'Leave? The word itself has lost its meaning here.\nThere is no exit that I have found in my crossings.\nOnly deeper shores, darker waters.\nIf you seek a way from this underground world,\nYou must go down before you can go up.\nSpeak to the Mole - he knows the cracks in the stone.\nSpeak to Medusa - she has walked where few dare follow.\nSpeak to the Hermit - he has keys you have not imagined.\nAs for me, I will be here when you return.\nI am always here.\nAlways.'\nHe turns back to the water and does not speak again.",
              "options": [
                {
                  "id": "charon_exit_self",
                  "text": "Tell me about yourself.",
                  "available": true,
                  "chains": [
                    "charon_self"
                  ]
                },
                {
                  "id": "charon_exit_ask",
                  "text": "Ask about someone you know.",
                  "available": true,
                  "chains": [
                    "charon_ask"
                  ]
                },
                {
                  "id": "charon_exit_leave",
                  "text": "I'll be going.",
                  "available": true,
                  "closes": [
                    "charon_exit",
                    "charon_intro",
                    "charon_self",
                    "charon_ask"
                  ]
                }
              ]
            }
          ]
        }
      ],
      "exits": []
    }
  ]
};
