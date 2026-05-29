// ── Cut-scene system ─────────────────────────────────

function ensureCutsceneOverlay() {
    var overlay = document.getElementById("cutsceneOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "cutsceneOverlay";
        overlay.className = "cutscene-overlay";
        overlay.style.display = "none";
        overlay.innerHTML = '<div class="cutscene-stage" id="cutsceneStage"></div><div class="cutscene-skip-hint">Press Esc to skip</div>';
        document.body.appendChild(overlay);
    }
    return overlay;
}

function playCutScene(sceneId, callback) {
    var scene = below.gameData.cutScenes && below.gameData.cutScenes[sceneId];
    if (!scene || !scene.cuts || scene.cuts.length === 0) {
        if (callback) callback();
        return;
    }
    below.cutScene = sceneId;
    below.cutSceneCuts = scene.cuts;
    below.cutSceneIndex = 0;
    below.cutSceneStart = null;
    below.cutSceneCallback = callback || null;
    ensureCutsceneOverlay();
    var ce = document.getElementById("cutsceneOverlay");
    ce.style.display = "flex";
    ce.style.opacity = "1";
    ce.style.zIndex = "100000";
    ce.style.pointerEvents = "auto";
    cutSceneLoop();
}

function cutSceneLoop(timestamp) {
    if (!below.cutScene) return;
    if (!below.cutSceneStart) below.cutSceneStart = timestamp || performance.now();
    var now = timestamp || performance.now();
    var elapsed = now - below.cutSceneStart;

    var stage = document.getElementById("cutsceneStage");
    stage.innerHTML = "";

    var allDone = true;
    var maxEndTime = 0;

    for (var i = 0; i < below.cutSceneCuts.length; i++) {
        var cut = below.cutSceneCuts[i];
        var total = cut.fadeIn + cut.hold + cut.fadeOut;
        var cutStart = cut.start !== undefined ? cut.start : maxEndTime;
        var cutEnd = cutStart + total;
        var cutElapsed = elapsed - cutStart;

        if (cutElapsed < 0) { allDone = false; continue; }
        maxEndTime = Math.max(maxEndTime, cutEnd);

        if (cutElapsed >= total) continue;
        allDone = false;

        var opacity = 1;
        if (cutElapsed < cut.fadeIn) {
            opacity = cutElapsed / cut.fadeIn;
        } else if (cutElapsed < cut.fadeIn + cut.hold) {
            opacity = 1;
        } else {
            opacity = 1 - (cutElapsed - cut.fadeIn - cut.hold) / cut.fadeOut;
        }

        if (opacity <= 0) continue;

        var driftX = (cut.driftX || 0) * (cutElapsed / total);
        var driftY = (cut.driftY || 0) * (cutElapsed / total);

        if (cut.type === "fade") {
            var fadeDiv = document.createElement("div");
            fadeDiv.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:" + (cut.color || "#000") + ";opacity:" + opacity + ";z-index:4999;pointer-events:none;";
            document.body.appendChild(fadeDiv);
        } else if (cut.type === "image") {
            var img = document.createElement("img");
            img.src = "images/" + cut.src;
            img.style.cssText = "left:" + cut.x + "%;top:" + cut.y + "%;width:" + (cut.width || 200) + "px;opacity:" + opacity + ";transform:translate(" + driftX + "px," + driftY + "px);";
            stage.appendChild(img);
        } else if (cut.type === "text") {
            var textDiv = document.createElement("div");
            textDiv.className = "cutscene-text";
            textDiv.textContent = cut.text || "";
            textDiv.style.cssText = "left:" + cut.x + "%;top:" + cut.y + "%;font-size:" + (cut.fontSize || 18) + "px;opacity:" + opacity + ";transform:translate(" + driftX + "px," + driftY + "px);" + (cut.fontStyle ? "font-style:" + cut.fontStyle + ";" : "");
            stage.appendChild(textDiv);
        }
    }

    if (allDone) {
        endCutScene();
    } else {
        window.requestAnimationFrame(cutSceneLoop);
    }
}

function endCutScene() {
    below.cutScene = null;
    below.cutSceneCuts = null;
    below.cutSceneIndex = 0;
    below.cutSceneStart = null;
    var fades = document.querySelectorAll("div[style*='z-index:4999']");
    fades.forEach(function(f) { f.remove(); });
    var stage = document.getElementById("cutsceneStage");
    if (stage) stage.innerHTML = "";
    var overlay = document.getElementById("cutsceneOverlay");
    var cb = below.cutSceneCallback;
    below.cutSceneCallback = null;
    if (cb) { cb(); }
    if (overlay) overlay.remove();
    var gd = document.getElementById("gameDiv");
    if (gd) {
        gd.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;display:flex;";
    }
}
