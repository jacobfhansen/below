// below-music.js — C64-style background music engine
// Song data lives in below-songs.js (belowSongs).
// Engine reads belowSongs["songName"] to play a named song.

var belowMusic = (function() {
    var ctx = null;
    var masterGain = null;
    var playing = false;
    var muted = false;
    var timerId = null;
    var stepDuration = 0;
    var voices = [];
    var totalSteps = 0;
    var currentStep = 0;
    var startedAt = 0;
    var currentSongName = null;

    var NOTE_SEMI = { 'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'Fb':4,'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11 };

    function noteToFreq(str) {
        if (!str || str === 'r' || str === 'rest') return 0;
        var m = str.match(/^([A-G][#b]?)(\d)$/);
        if (!m) return 0;
        var n = m[1];
        if (n.length === 2 && n[1] === 'b') {
            n = { 'Db':'C#','Eb':'D#','Gb':'F#','Ab':'G#','Bb':'A#' }[n] || n;
        }
        var semi = NOTE_SEMI[n];
        if (semi === undefined) return 0;
        var midi = semi + (parseInt(m[2]) + 1) * 12;
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    function ensureContext() {
        if (!ctx) {
            try {
                ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch(e) {
                return false;
            }
        }
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        return true;
    }

    function buildEvents(song) {
        var events = [];
        for (var v = 0; v < song.voices.length; v++) {
            events[v] = [];
            var step = 0;
            var seq = song.voices[v].seq;
            for (var i = 0; i < seq.length; i++) {
                var noteName = seq[i][0];
                var dur = seq[i][1];
                var legato = seq[i][2] || false;
                var freq = noteToFreq(noteName);
                for (var s = 0; s < dur; s++) {
                    events[v][step + s] = { freq: freq, step: step + s, legato: legato };
                }
                step += dur;
            }
            if (v === 0) totalSteps = step;
        }
        return events;
    }

    function scheduleLoop() {
        if (!playing) return;
        if (!ctx) return;
        var now = ctx.currentTime;
        var lookAhead = 0.5;

        for (var v = 0; v < voices.length; v++) {
            if (!voices[v]) continue;
            var events = voices[v].events;
            var vol = voices[v].volume;
            var osc = voices[v].osc;
            var gain = voices[v].gain;
            var scheduledUntil = voices[v].scheduledUntil || 0;

            if (now + lookAhead > scheduledUntil) {
                var t = Math.max(now, scheduledUntil);

                while (t < now + lookAhead) {
                    var localStep = Math.floor((t - startedAt) / stepDuration) % totalSteps;
                    var ev = events[localStep];
                    if (ev) {
                        osc.frequency.setValueAtTime(ev.freq, t);
                        var prevEv = localStep > 0 ? events[localStep - 1] : null;
                        var isLegatoContinuation = ev.legato && ev.freq > 0 && prevEv && prevEv.freq === ev.freq;
                        if (!isLegatoContinuation) {
                            var attack = 0.005;
                            gain.gain.cancelScheduledValues(t);
                            if (ev.freq > 0) {
                                gain.gain.setValueAtTime(0, t);
                                gain.gain.linearRampToValueAtTime(vol, t + attack);
                                if (ev.legato) {
                                    gain.gain.setValueAtTime(vol, t + stepDuration + 0.01);
                                } else {
                                    var release = stepDuration * 0.8;
                                    gain.gain.setValueAtTime(vol, t + release - 0.01);
                                    gain.gain.linearRampToValueAtTime(0, t + release);
                                }
                            } else {
                                gain.gain.setValueAtTime(0, t);
                            }
                        }
                    }
                    t += stepDuration;
                }
                voices[v].scheduledUntil = t;
            }
        }
    }

    function schedulerTick() {
        scheduleLoop();
        if (playing) {
            timerId = setTimeout(schedulerTick, 100);
        }
    }

    return {
        currentSongName: function() { return currentSongName; },

        start: function(songName) {
            if (!songName) songName = "song0";
            var song = (typeof belowSongs !== 'undefined') ? belowSongs[songName] : null;
            if (!song) {
                songName = "song0";
                song = (typeof belowSongs !== 'undefined') ? belowSongs[songName] : null;
            }
            if (!song) return;
            if (playing) {
                if (currentSongName === songName) return;
                this.stop();
            }
            if (!ensureContext()) return;

            currentSongName = songName;

            if (masterGain) {
                masterGain.disconnect();
            }
            masterGain = ctx.createGain();
            masterGain.gain.value = muted ? 0 : 0.4;
            masterGain.connect(ctx.destination);

            stepDuration = (60 / song.tempo) / 4;
            var events = buildEvents(song);
            voices = [];
            startedAt = ctx.currentTime + 0.1;

            for (var v = 0; v < song.voices.length; v++) {
                var data = song.voices[v];
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.type = data.waveform;
                osc.frequency.value = 200;
                gain.gain.value = 0;
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(startedAt);
                voices[v] = {
                    osc: osc,
                    gain: gain,
                    volume: data.volume,
                    waveform: data.waveform,
                    events: events[v],
                    scheduledUntil: startedAt
                };
            }

            currentStep = 0;
            playing = true;

            if (timerId) clearTimeout(timerId);
            scheduleLoop();
            timerId = setTimeout(schedulerTick, 100);
        },

        changeSong: function(songName) {
            if (!songName || songName === currentSongName) return;
            this.stop();
            this.start(songName);
        },

        stop: function() {
            playing = false;
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            for (var v = 0; v < voices.length; v++) {
                if (voices[v]) {
                    try { voices[v].osc.stop(); } catch(e) {}
                    try { voices[v].gain.disconnect(); } catch(e) {}
                }
            }
            voices = [];
        },

        toggleMute: function() {
            muted = !muted;
            if (masterGain) {
                masterGain.gain.value = muted ? 0 : 0.4;
            }
            return muted;
        },

        isMuted: function() {
            return muted;
        },

        isPlaying: function() {
            return playing;
        },

        resume: function() {
            if (ctx && ctx.state === 'suspended') {
                ctx.resume();
            }
        }
    };
})();
