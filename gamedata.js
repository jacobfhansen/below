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
    },
    "12": {
      "name": "phosphorescent moss",
      "fill": "#70A4B2",
      "border": "#6C6C6C"
    },
    "13": {
      "name": "violet mycelium",
      "fill": "#6F3D86",
      "border": "#352879"
    },
    "14": {
      "name": "glowing fungus bed",
      "fill": "#B8C76F",
      "border": "#588D43"
    },
    "15": {
      "name": "cyan slime",
      "fill": "#6DC2CA",
      "border": "#2a5080"
    },
    "16": {
      "name": "pink crystal",
      "fill": "#9A6759",
      "border": "#6F4F25"
    },
    "17": {
      "name": "dark soil",
      "fill": "#6F4F25",
      "border": "#433900"
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
    "cutScenePlayed": {},
    "direction": "down",
    "inventory": []
  },
  "cutScenes": belowCutSceneData.cutScenes,
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
    },
    "4": {
      "name": "Living Shadow",
      "movement": 0.4,
      "icon": "shadow.png",
      "chaseIcon": "shadow_chase.png",
      "chaseDistance": 3,
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
      "visionBlocking": false,
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
      "icon": "stone_door_closed.png",
      "blocking": true,
      "closed": true,
      "keyId": 7,
      "choiceEvents": [7, 3],
      "openChoiceEvents": [8, 3]
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
    },
    "18": {
      "name": "Blue Mushroom",
      "description": "A cluster of phosphorescent blue mushrooms",
      "color": "#70A4B2",
      "icon": "mushroom_blue.png",
      "blocking": true,
      "visionBlocking": false,
      "lightRadius": 2,
      "lightColor": "rgba(112, 164, 178, 0.30)"
    },
    "19": {
      "name": "Purple Mushroom",
      "description": "A cluster of glowing purple mushrooms",
      "color": "#6F3D86",
      "icon": "mushroom_purple.png",
      "blocking": true,
      "visionBlocking": false,
      "lightRadius": 2,
      "lightColor": "rgba(111, 61, 134, 0.30)"
    },
    "20": {
      "name": "Yellow Mushroom",
      "description": "A cluster of luminous yellow mushrooms",
      "color": "#B8C76F",
      "icon": "mushroom_yellow.png",
      "blocking": true,
      "visionBlocking": false,
      "lightRadius": 2,
      "lightColor": "rgba(184, 199, 111, 0.30)"
    },
    "21": {
      "name": "Pink Crystal",
      "description": "A jagged pink crystal formation",
      "color": "#9A6759",
      "icon": "crystal_pink.png",
      "blocking": true,
      "visionBlocking": false,
      "lightRadius": 1,
      "lightColor": "rgba(154, 103, 89, 0.30)"
    },
    "22": {
      "name": "Floor Item",
      "description": "An item lying on the ground.",
      "icon": "medusa_hair.png",
      "blocking": false,
      "visionBlocking": false
    },
    "23": {
      "name": "Shadow Wall",
      "description": "A wall of living shadow",
      "blocking": true,
      "visionBlocking": true
    }
  },
  "itemTypes": {
    "4": {
      "name": "Silver Key",
      "description": "A silver key",
      "icon": "key1.png",
      "choiceEvents": [],
      "useText": "You fumble with the silver key, but there's nothing here to unlock."
    },
    "5": {
      "name": "Bronze Key",
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
      "description": "A rusty canister marked 'RAT-A-WAY - Guaranteed to clear any rodent infestation'",
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
      "description": "A bottle of thick, foul-smelling liquid. 'CRAWL-END - For all your centipede problems'",
      "icon": "centipede_cleaner.png",
      "choiceEvents": [],
      "useText": "You sniff the bottle. Your eyes water. You put it away."
    },
    "16": {
      "name": "Medusa Hair",
      "description": "A lock of Medusa's hair. The snakes are still writhing...",
      "icon": "medusa_hair.png",
      "choiceEvents": [],
      "useText": "The snakes writhe in your hand. You quickly put them away."
    },
    "17": {
      "name": "Flashlight",
      "description": "Casts a focused beam of light when equipped.",
      "icon": "flashlight.png",
      "choiceEvents": [],
      "useText": "You shine the flashlight around. Equip it to light your way."
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
    },
    "8": {
      "name": "The Rotten Sisters",
      "description": "Two decaying figures lounging in the fissure",
      "icon": "sisters1.png",
      "dialogImg": "sisters_dialog.png",
      "dialog": {
        "greeting": "Two sets of hollow eyes turn toward you. 'A visitor? How... tedious.'",
        "agitated": "'Oh, do shut up. You're disturbing the quiet.'"
      },
      "choiceEvents": [
        9,
        10,
        11
      ],
      "agenda": "Dead so long they've forgotten why they haven't moved on. Bored beyond measure.",
      "personality": "bored and apathetic"
    }
  },
  "mapData": [map0Data, map1Data, map2Data, map3Data, map4Data, map5Data, map6Data, map7Data]
};
