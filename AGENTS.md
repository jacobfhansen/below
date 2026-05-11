# below
Below game. A child falls through a hole in the ground and find itself trapped in a strange underground world
populated by excentric characters with bizare agendas. The purpose of the game is to eacape the maze solving
puzzles and playing the various NPC characters against each other and themselves.
There is no real combat, meaning when player attack nobody dies but their perception of the player might change. 

# NPC's
Jester: Annoying and rude. Gives misleading clues and conveys half-thruths and outright lies.
    Dont give much about the Hermit, fears Medusa, finds the Mole boring and loves to fool Sam Shale.
Hermit: A lost soul consumed in his own delusions. Trades keys for herbs. The real keys are the herbs.
    Is amused and Befuddled by the Medusa taking interest in his hobby. Despises The Mole for his evil ways.
    finds the Jester annoying for teasing him all the time. Do not get Sam Shale.
Medusa: Aloof and dreaming. A former "stoner", turning people to stone with her gaze, but she has reformed
    and are not doing that anymore.
    She pitty The Mole, herself a former evildoer. Mostly ignores the Jester, Find the Hermit amusing.
    Avoids Sam Shale for her own personal reasons.
The Mole: He lives in "The Maze", a series of tunnels he have dug to find the Herbs the Hermit have. 
    The Hermit do not like the mole and will not give him any herbs because the mole is Evil. The Mole
    speaks like he is in a Shaekspeare play. Dont have anyt interest in Sam Shale.
Sam Shale: Film noir detective. Endlessly searching for Medusa, lost in his fake Chicago like cave chasing shadows.
    Believes the Jester is his contact in the underworld.
    
# Developer
Please refer to me as mrFlemming. You can call yourself Big Pickle. This might make it easier for me when building the
game where we refer to player/user/agents I hope.

# Code
Below should be developed with vanilla HTML. No external libraries or frameworks. Only what the latest HTML standard
includes and allows.

Separate logic from data.

# To run locally
To run in web server, do for example
python3 -m http.server 8000

# Architecture

## File roles
- `gamedata.js` — Pure data. Defines global `belowGameData` with all initial state (maps, NPCs, dialogs, monsters, obstacles, items, player defaults). No logic.
- `below.js` — All game logic, rendering, input, save/load. Reads `belowGameData` at DOMContentLoaded via `JSON.parse(JSON.stringify(belowGameData))` into `below.gameData`.
- `below.html` — Minimal HTML shell with menu screens, game div (canvas + log panel), inventory modal.
- `tools/dialog-editor.html` — Standalone dev tool for editing dialog trees, reads `gamedata.js` directly.
- `tools/map-editor.html` — Standalone dev tool for editing maps, reads `gamedata.js` directly.

## State management
- `below.gameData` is the single mutable source of truth — a deep clone of `belowGameData`, modified in place.
- `below` namespace holds runtime state: `choiceEvent`, `tick`, `currentSlot`, etc.
- Deep cloning pattern (`JSON.parse(JSON.stringify(obj))`) used throughout for init, save/load, and dialog merging.

## Dialog system
- NPCs have `dialogOptions[]` — each dialog has `id`, `available`, `text`, `requiresItems?`, `options[]`.
- Each option has `id`, `text`, `available`, and optional `opens[]`, `closes[]`, `chains[]`.
- Flow: `handleBlockedInteraction` → finds first available dialog → `renderChoiceEvent` → `showDialogMessage` → `showDialogOptions` → `selectChoiceOption` → processes opens/chains/closes.
- `chains` keeps previous messages visible via `isChain: true` flag, only replaces title/options/dots.
- `opens/closes` set `dialog.available` flags for future conversations.
- `requiresItems` (on dialog) checks player inventory at interaction time — player must have at least one listed itemTypeId.
- `setDialogAvailable(dialogIds, bool)` is the generic external trigger (called on key pickup, etc.).
- Player responses shown as yellow italic lines prefixed with "> ".
- NPC dialog image shown when `npcType.dialogImg` is set (64x64, flex container left of text).

## Choice events (old system)
- Numeric IDs mapping to hardcoded actions in `getChoiceEventOptions()`.
- id=6 ("Search") handles item pickup from obstacles with `itemType`.
- id=11 ("Intimidate") sets `npc.agitated = true`.
- id=5 ("Attack") sets `monster.aloof = false` (changes perception, no death).

## Monsters
- `blocking: true` + `aloof: true` → blocks player path.
- Attack sets `aloof = false` → monster becomes non-blocking and aggressive.
- Monsters move randomly via game loop, can bump into player if not aloof.
- `isMonsterAloof()` checks instance flag first, falls back to type default.

## NPCs
- `dialogImg` for dialog portrait, `icon` for map sprite.
- `dialog.greeting` / `dialog.agitated` for old-style Talk action.
- `agitated` instance flag set by Intimidate.
- `choiceEvents` array determines which old-style actions are available.

## Save/Load
- localStorage `below` object has `saves: [slot0, slot1, slot2]`.
- Each slot is full `below.gameData` deep clone plus `saveDate`.
- `mergeDialogOptions()` called on continue — merges new dialogs from source into saved data, preserving `available` flags and adding missing properties.
- Auto-save every ~60 seconds in game loop.

## UI rendering
- `drawMapCanvas()` renders map, monsters, NPCs, obstacles, player with vision overlay.
- `maintainMapLog()` renders game log from `below.gameData.mapLog`.
- Dialogs rendered in `gameLogDiv` (left panel, 30% width).
- Map dimmed (opacity 0.5) during choice events.

## Keyboard
- `checkKey()` routes to `handleMenuKey`, `handleChoiceEventKey`, or `moveOnMap` based on active div.
- Arrow keys/WASD for movement, Enter/E for confirm, Escape for close/cancel.
- Q toggles inventory.

### FOV / Shadow system
- `isVisionBlocked(x, y)` checks only obstacles with `blocking: true` (not NPCs/monsters — creatures don't cast vision shadows)
- `computeVisibleTiles()` runs BFS from player position (4-direction), max distance = `player.vision` tiles
- BFS expands through tiles that `foundTile()` exists for; blocking obstacles stop further expansion (player sees the obstacle but not through it)
- `drawMapCanvas()` pre-fills canvas black, computes visible tiles once, draws only visible tiles + entities
- Tiles/entities behind blocking obstacles (doors, walls, statues, cupboards) are hidden — shown as solid black
- Blank areas (no tile data) are solid black via the pre-fill
- Radial gradient overlay (transparent → black) still provides soft edge at vision radius boundary
- Vision recomputed every frame — opening a door or pushing a rock updates LOS on the next frame

## Gotchas
- Chain-cleaning in `renderChoiceEvent` removes nodes with class containing `below-game-left-paragraph` but NOT `below-game-left-paragraph-current`. Custom classes (like `below-player-response`, `below-dialog-message`) must NOT contain `below-game-left-paragraph` to survive chaining.
- `npcPos` is passed by reference through chains — mutating it would break NPC lookup in `selectChoiceOption`.
- Dialog option `chains` can be string or array; code takes first element.
- When adding new properties to dialog/option data, update `mergeDialogOptions` to propagate them to old saves.
