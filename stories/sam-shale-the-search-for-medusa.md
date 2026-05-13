# Sam Shale: The Search For Medusa

## Overview
A linear detective story across the noir underworld of map 3. The player helps Sam Shale follow leads in his search for Medusa. Sam walks the player from location to location. The Jester plays all supporting roles (police sergeant, bartender, pawn broker, waitress, dock master). The ending is melancholic — Sam never finds her.

## Tone
- Classic film noir dialogue
- The Jester's characters are comedically bad impressions (he's clearly doing voices, hamming it up)
- Sam is deadly serious — he doesn't notice the Jester's antics because he's too caught up in his own noir narrative
- The player is a silent witness to Sam's obsession

## The Walking Pattern
Each story beat follows the same structure:
1. Dialog at current location ends with Sam saying he needs to check the next place
2. Player chooses "Let's go" (or similar)
3. Sam walks to next location
4. `onPathComplete` pushes map log message and opens next dialog
5. Player follows and talks to Sam

---

## Act 1: The Setup

### Location: Entry square → Sam's office

#### Detective_arrival dialog (already exists, needs content)

**Sam:** "Alright, kid. We're alone now. Well, as alone as anyone gets in a joint like this. Pull up a crate."

"I've been on this case for longer than I care to admit. Medusa. The dame with the snake eyes. She's the key to this whole underground maze — I can feel it in my bones."

"Every lead I get turns to dust. But I've got a few threads left to pull. You in?"

**Options:**
- "I'm in. Where do we start?" → [chains to `detective_police_intro`]
- "I don't know, Sam. This seems dangerous." → "Kid, everything down here is dangerous. The difference is, I've got a plan. Stick with me."

---

## Act 2: The Investigation

### Beat 1: Police Precinct (-6,-10 to -4,-8)

#### Walk there: office → precinct
**Sam:** "First stop — the precinct. The sergeant owes me a favor. From a thing. Don't ask about the thing."

*(Sam walks from office to police precinct, player follows)*

**Map log on arrival:** "Sam pushes through the creaking door of the precinct. A single bulb swings over a desk cluttered with cold coffee cups."

#### Dialog: Sam talks to the Sergeant (Jester playing Sergeant)

**Sam:** "Sergeant. Got a minute?"

**Sergeant/Jester** (attempting a gruff cop voice): "Shale. You're still alive. That's either good police work or bad luck. What do you want?"

**Sam:** "Medusa. I got word she was seen near the docks last week. Any reports?"

**Sergeant/Jester:** "Reports. Right. Let me check my... uh... my report file." *(rummages noisily)* "Yeah, I got something. A guy was brought in — vagrant — kept rambling about 'the snake woman.' Said she was heading west. Through the maintenance tunnels."

**Sam:** "Maintenance tunnels. That's a dead end. They collapsed ten years ago."

**Sergeant/Jester:** "Hey, I don't write the intel, I just... file it. In my files. That's where it was. In a file."

**Player option:**
- "Is he reliable?" (Sam: "About as reliable as a three-dollar watch. But it's all we got.")
- "Let's check it out." → [chains to next beat]

**Sam:** "Thanks, Sergeant. You've been... helpful."

**Sergeant/Jester:** "That's what I'm here for. Serving. Protecting. Filing."

**Sam (to player):** "The maintenance tunnels are a bust, but if she was heading west, she'd have passed through the old market district. There's a guy there who sees everything — Abe. Runs a pawn shop."

**Option:**
- "Let's go see Abe." → [Sam walks to Honest Abe's]

---

### Beat 2: Honest Abe's Pawn Shop (-1,-10 to 2,-8)

**Map log on arrival:** "A bell jingles as Sam ducks through the bead curtain of Honest Abe's. The shop is packed floor to ceiling with junk and treasures."

#### Dialog: Abe (Jester playing a sleazy pawn broker)

**Abe/Jester** (bad Yiddish-coded accent, clearly the Jester having fun): "Sammy Shale! Long time no pawn! You here to sell or to stare at my magnificent collection of... *gestures vaguely at junk* ...stuff?"

**Sam:** "I need information, Abe. A woman passed through here — snake-eyed, stone-cold look. Medusa."

**Abe/Jester:** "Medusa! The name I know, the face I don't. Very mysterious. Very dangerous. Very... overrated, if you ask me. But she did come through. Bought a compass. Old-fashioned one. Paid with a gold coin that was *definitely* not minted anywhere official."

**Sam:** "A compass. Where was she headed?"

**Abe/Jester:** "Didn't say. But she asked about the Rooftop. Specifically. Said she needed to 'see the stars.' Don't ask me why — there ain't no stars down here. That's like asking for a beach in a coal mine."

**Sam:** "The Rooftop. That's... that's actually somewhere."

**Abe/Jester:** "I know! I was being metaphorical and then it turned out literal! Life's funny like that." *(laughs at his own joke)*

**Player option:**
- "What's on the Rooftop?" (Sam: "A meeting spot. Old smugglers' lookout. If she was headed there, she was meeting someone.")
- "Let's head to the Rooftop." → [chains to next beat]

**Sam (to player):** "The Rooftop. That's... that's a lead. A real one. Come on, kid. We're taking the service alley."

---

### Beat 3: Garbage-Strewn Alley / Back Way (4,2 to 10,3)

*Can be a transition zone with its own mini-dialog, or just a walk-through area.*

#### Optional dialog (if player talks to Sam mid-walk):
**Sam:** "This alley's seen things. Bodies. Deals. Dirty deals *about* bodies. Stay close and don't touch anything. Actually, don't even look at anything. Just... look at my back. That's safe."

**Player option:**
- "You've been here before?" (Sam: "Once. Came out with a bullet hole in my coat and a story I can't tell in polite company. Not that there's any polite company down here.")
- "..."
  (Sam: "Yeah. That's the right response to this place.")

---

### Beat 4: The Rooftop (14,-5 to 16,-3)

**Map log on arrival:** "Sam climbs the rusted ladder to a high ledge overlooking the cavern. Stalactites hang low like a stone sky. The wind howls from somewhere deep below."

#### Dialog: Meeting a contact — The Informant (Jester playing a nervous snitch)

**Sam:** "He said he'd be here. The informant. Jittery guy — goes by 'Mouse.'"

*(The Jester appears, hunched over, doing a squeaky rat-like voice)*

**Informant/Jester:** "Shale! Man, you're late! I been standing here for like... a really long time. I got a life, you know! I got... I got things!"

**Sam:** "You got information. That's all I care about."

**Informant/Jester:** "Yeah, yeah. Okay. The snake woman. I saw her. Three nights ago. She was heading toward the diner — 'The Last Stop.' Met with somebody there. Couldn't see who. But they talked for a long time. And when she left... she was crying."

**Sam** *(quietly)*: "Crying."

**Informant/Jester:** "Yeah. Snakes and all. Weird, right? What's a dame with snakes for hair got to cry about? Anyway, I'm out. Don't find me again." *(scampers off)*

**Player option:**
- "Medusa was crying?" (Sam: "That don't sound like the dame I knew. She wasn't the crying type. Something's wrong.")
- "Let's check the diner." → [chains to next beat]

**Sam:** "The Last Stop. If she was meeting someone there, maybe the waitress saw something. She runs that place like a CIA black site — notices everything."

---

### Beat 5: The Last Stop Diner (6,-10 to 8,-8)

**Map log on arrival:** "A neon sign buzzes 'THE LAST STOP' in flickering pink. Inside, the counter is cracked formica. The coffee pot is older than everyone in the room."

#### Dialog: Flo the Waitress (Jester in a wig, falsetto)

**Flo/Jester** (exaggerated diner waitress voice): "Well, well, well. Sam Shale. If it ain't my favorite customer who never orders anything. Sit down, honey. Coffee's fresh. By which I mean it was made today. This week, even."

**Sam:** "Flo. I need to know about the woman who came in three nights ago. Snake eyes. Long hair. Sat with someone."

**Flo/Jester:** "Ohhh, honey. You mean *her*. Yeah, she came in. Looked like she hadn't slept in a week. Ordered pie. Didn't eat it. Just pushed it around the plate with her fork. Talked to some fella in a long coat. Private booth. Couldn't hear nothing — but I saw her face when she left. Looked like someone told her the world was ending and she was the only one who didn't get the memo."

**Sam:** "The man she met — you know him?"

**Flo/Jester:** "Wish I did. Would've made better conversation. But I got something for you. She left this behind." *(slides a photograph across the counter)*

*(Sam picks it up. It's a photo of Medusa — younger, smiling, standing next to a man whose face is torn off)*

**Sam:** "...Thanks, Flo."

**Flo/Jester:** "Don't mention it. And I mean that literally. Don't mention it. I don't need cops sniffing around my pie cooler."

**Player option:**
- "Who's the man in the photo?" → chains to dialog where Sam explains it's her brother, missing
- "What now?" → chains to next beat

**Sam:** "The Dock Master. He's been here longer than anyone. If anybody knows where Medusa went after that meeting, it's him."

---

### Beat 6: Jazz Club (11,-10 to 14,-8)

*A detour — Sam stops outside*

**Sam:** "Hold up. I know a guy in here. Plays piano. Might've heard something."

**Map log on arrival:** "Red curtains. A piano playing three notes over and over. A woman at the bar watches everyone."

#### Dialog: The Pianist (Jester, in character as a beatnik jazz musician)

**Pianist/Jester** (doesn't stop playing, talks in a rambling stream): "Sam Shale. Heard you was asking around about the Gorgon. She came through. Told me something funny. Said she was looking for 'a way out.' Not the tunnels, not the surface. A way out of something inside her head. Then she ordered a drink. Paid for it. Didn't drink it. Just left. People pay for drinks and don't drink 'em all the time. But she looked at me when she left. Like she was saying goodbye. Weird, right?"

**Sam:** "Goodbye to who?"

**Pianist/Jester:** "To everybody, man. To the whole scene. She had that look. The look of someone who's about to do something they can't take back. Dig?"

**Player option:**
- "We need to find her before she does something drastic."
- "Let's get to the docks."

---

## Act 3: The Docks

### Beat 7: Dock Master's Office (17,8 to 19,10)

**Map log on arrival:** "The Dock Master's office is a cratewood shack overlooking the black water. A brass telescope points into the dark."

#### Dialog: Dock Master (Jester, doing a gruff old sailor voice)

**Dock Master/Jester:** "Shale. Figured you'd turn up eventually. She said you would."

**Sam:** "She talked about me?"

**Dock Master/Jester:** "Talked about nothing *but* you, for about twenty minutes. Said if anyone came looking, it'd be you. Gave me this. Said to give it to the detective with the tired eyes." *(hands Sam a letter)*

*(Sam reads it silently. His face doesn't change, but his hand trembles slightly)*

**Player option:**
- "What does it say?"
- *(Sam, to player)* "I'll show you."

**Sam** (reading aloud, voice rough):
> "Sam. If you're reading this, I'm already gone. Not from the tunnels — from everything. I found what I was looking for. Not escape. Not treasure. Just... peace. There's a tunnel beneath Pier C3 that opens into a place the light don't reach. I'm going there. Don't follow. You've got a good heart, Sam Shale. Even if you pretend you don't. — Medusa."

**Player option:**
- "We can still catch her." (Sam: "No, kid. She don't want to be caught. Never did.")
- "I'm sorry, Sam."
  **Sam:** "Yeah. Me too."

---

### Beat 8: Pier C3 (12,12 to 13,13)

*(Sam walks to the end of the pier. The player follows)*

**Sam:** "She went down there. Through that tunnel. Into the dark."

"A year I've been chasing her. A year of dead ends and false leads. And now I find her... and she don't want to be found."

"I've got a choice. I can follow her down there. Into whatever's at the bottom. Or I can let her go."

**Player option:**
- "Let her go, Sam. She's made her peace."
- "We go after her."
- *(say nothing)*

**If "Let her go":**
**Sam:** "...Yeah. You're right. Some dames don't wanna be saved. They just wanna be left alone in the dark with their ghosts."
*(long pause)*
"Come on, kid. I'll buy you a cup of coffee. The Last Stop's still open."
*(Sam turns and walks back toward the diner. He doesn't look back.)*

**If "We go after her":**
**Sam:** "No. She said don't follow. And I've spent my whole life not listening to what people tell me. Maybe it's time I started."
*(he crumples the letter)*
"Let her have her peace. It's more than most of us get down here."

**If "say nothing":**
**Sam:** "...Yeah. I know. There ain't nothing to say."
*(He stares at the dark water for a long time)*
"Let's go, kid."

---

## End Credits Vibe

Sam walks back through the empty streets. The neon signs buzz. The fog rolls in. Somewhere, the Jester's laugh echoes through the tunnels — but for once, it sounds almost sad.

The player follows Sam in silence.

The search for Medusa is over.

---

## Technical Implementation Notes

### Walk targets (in order)
1. Office → Police precinct: office (-2,-3) to police (-5,-8)
2. Police → Honest Abe's: (-5,-8) to (-1,-10)
3. Abe's → The Rooftop: (-1,-10) to (14,-5) — long walk, maybe via alley
4. Rooftop → The Last Stop: (14,-5) to (6,-10)
5. Last Stop → Dock Master: (6,-10) to (17,8)
6. Dock Master → Pier C3: (17,8) to (12,12)

### Jester's characters
| Location | Character | Jester's Schtick |
|---|---|---|
| Precinct | Sergeant | Bad cop voice, shuffling papers, saying "file" too many times |
| Pawn Shop | Abe | Sleazy pawn broker, bad accent, clearly ad-libbing |
| Rooftop | Mouse | Nervous snitch, squeaky voice, wants to leave immediately |
| Diner | Flo | Falsetto waitress, overfamiliar, protective of the diner |
| Jazz Club | Pianist | Beatnik jazz rambling, never stops playing, philosophical |
| Dock Master | Dock Master | Gruff sailor voice, but with moments of surprising gentleness |

The key comedic through-line: Sam never once acknowledges that all these characters are the same person doing bad voices. He treats each one with the same dead-serious respect.

### Dialog data structure
Each location needs:
- A dialog node (id: `detective_{location}`) with `available: false`
- The walk option chains to the next dialog
- `onPathComplete` callback sets the next dialog to available and pushes map log

### New dialog IDs needed
- `detective_police` — at precinct
- `detective_abe` — at pawn shop
- `detective_rooftop` — at the Rooftop
- `detective_diner` — at The Last Stop
- `detective_jazz` — at the jazz club
- `detective_dockmaster` — at the dock office
- `detective_pier` — at Pier C3 (ending)
