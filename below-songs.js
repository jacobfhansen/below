// below-songs.js — Aggregates individual song files from songs/ folder
// Song files define var songNData = { tempo, voices }.
// Each map references a song via its "music" property.

var belowSongs = {};

// Register all known song data files here when adding new songs
[
    { name: "song0", data: typeof song0Data !== 'undefined' ? song0Data : null },
    { name: "song1", data: typeof song1Data !== 'undefined' ? song1Data : null },
    { name: "song2", data: typeof song2Data !== 'undefined' ? song2Data : null }
].forEach(function(item) {
    if (item.data && item.data.tempo && item.data.voices) {
        belowSongs[item.name] = JSON.parse(JSON.stringify(item.data));
    }
});
