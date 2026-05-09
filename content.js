const skins = {
    "custom1": {
        "antiqueen_white": "images/my_anti_queen_white.png",
        "antiqueen_black": "images/my_anti_queen_black.png",
        "underage_pawn_white": "images/underage_pawn_white.png",
        "underage_pawn_black": "images/underage_pawn_black.png",
        "sterile_pawn_white": "images/sterile_pawn_white.png",
        "sterile_pawn_black": "images/sterile_pawn_black.png",
        "traitor_rook_neutral": "images/traitor_rook_neutral.png",
        "rook_white": "images/rook_white.png",
        "rook_black": "images/rook_black.png",
        "queen_white": "images/queen_white.png",
        "queen_black": "images/queen_black.png",
        "pawn_white": "images/pawn_white.png",
        "pawn_black": "images/pawn_black.png",
        "knook_white": "images/knook_white.png",
        "knook_black": "images/knook_black.png",
        "king_white": "images/king_white.png",
        "king_black": "images/king_black.png",
        "horsey_white": "images/horsey_white.png",
        "horsey_black": "images/horsey_black.png",
        "checker_white": "images/checker_white.png",
        "checker_black": "images/checker_black.png",
        "bishop_white": "images/bishop_white.png",
        "bishop_black": "images/bishop_black.png"
    },
    "custom2": {
        "antiqueen_white": "images2/my_anti_queen_white.png",
        "antiqueen_black": "images2/my_anti_queen_black.png",
        "underage_pawn_white": "images2/underage_pawn_white.png",
        "underage_pawn_black": "images2/underage_pawn_black.png",
        "sterile_pawn_white": "images2/sterile_pawn_white.png",
        "sterile_pawn_black": "images2/sterile_pawn_black.png",
        "traitor_rook_neutral": "images2/traitor_rook_neutral.png",
        "rook_white": "images2/rook_white.png",
        "rook_black": "images2/rook_black.png",
        "queen_white": "images2/queen_white.png",
        "queen_black": "images2/queen_black.png",
        "pawn_white": "images2/pawn_white.png",
        "pawn_black": "images2/pawn_black.png",
        "knook_white": "images2/knook_white.png",
        "knook_black": "images2/knook_black.png",
        "king_white": "images2/king_white.png",
        "king_black": "images2/king_black.png",
        "horsey_white": "images2/horsey_white.png",
        "horsey_black": "images2/horsey_black.png",
        "checker_white": "images2/checker_white.png",
        "checker_black": "images2/checker_black.png",
        "bishop_white": "images2/bishop_white.png",
        "bishop_black": "images2/bishop_black.png"
    },
    "custom3": {
        "antiqueen_white": "images3/blindfolded.png",
        "antiqueen_black": "images3/blindfolded.png",
        "underage_pawn_white": "images3/blindfolded.png",
        "underage_pawn_black": "images3/blindfolded.png",
        "sterile_pawn_white": "images3/blindfolded.png",
        "sterile_pawn_black": "images3/blindfolded.png",
        "traitor_rook_neutral": "images3/blindfolded.png",
        "rook_white": "images3/blindfolded.png",
        "rook_black": "images3/blindfolded.png",
        "queen_white": "images3/blindfolded.png",
        "queen_black": "images3/blindfolded.png",
        "pawn_white": "images3/blindfolded.png",
        "pawn_black": "images3/blindfolded.png",
        "knook_white": "images3/blindfolded.png",
        "knook_black": "images3/blindfolded.png",
        "king_white": "images3/blindfolded.png",
        "king_black": "images3/blindfolded.png",
        "horsey_white": "images3/blindfolded.png",
        "horsey_black": "images3/blindfolded.png",
        "checker_white": "images3/blindfolded.png",
        "checker_black": "images3/blindfolded.png",
        "bishop_white": "images3/blindfolded.png",
        "bishop_black": "images3/blindfolded.png"
    },
    "default": {}
};

const boardSkins = {
    "custom1": { "white": "boards/board1.png",  "black": "boards/board11.png" },
    "custom2": { "white": "boards/board2.png",  "black": "boards/board22.png" },
    "custom3": { "white": "boards/board3.png",  "black": "boards/board33.png" },
    "default": { "white": "boards/default0.png","black": "boards/default0.png" }
};

function getPlayerColor() {
    const fileA = document.querySelector('[data-testid="coordsFile-a"]');
    if (fileA) {
        const style = fileA.getAttribute("style") || "";
        const percents = style.match(/(\d+)%\s*\+\s*0px/g);
        if (percents && percents.length >= 2) {
            const xPercent = parseFloat(percents[0]);
            if (xPercent < 50) return "white";
            return "black";
        }
    }
    return "white";
}

function buildFlippedSkin(skinMap, flipColors) {
    if (!flipColors || !skinMap || Object.keys(skinMap).length === 0) return skinMap;

    const flipped = {};
    for (const key of Object.keys(skinMap)) {
        let newKey = key;
        if (key.endsWith("_white")) {
            newKey = key.slice(0, -6) + "_black";
        } else if (key.endsWith("_black")) {
            newKey = key.slice(0, -6) + "_white";
        }
        flipped[newKey] = skinMap[key];
    }

    if (skinMap["traitor_rook_neutral"]) {
        flipped["traitor_rook_neutral"] = skinMap["traitor_rook_neutral"];
    }

    return flipped;
}

function applyBoard(boardSkinName) {
    const skinEntry = boardSkins[boardSkinName];
    if (!skinEntry) return;

    const playerColor = getPlayerColor();
    const boardPath = skinEntry[playerColor] || skinEntry["white"];

    const chessboards = document.querySelectorAll('div[data-testid="chessboard"]');
    if (chessboards.length === 0) return;

    chessboards.forEach(board => {
        const svg = board.querySelector('svg');
        const boardEffects = board.querySelector('div[data-testid="boardEffects"]');

        if (boardEffects) {
            boardEffects.style.removeProperty('background');
        }

        if (boardSkinName !== "default") {
            const boardUrl = chrome.runtime.getURL(boardPath);

            if (svg) {
                svg.style.setProperty('display', 'none', 'important');
            }

            board.style.setProperty('background', `url("${boardUrl}") center/cover no-repeat`, 'important');
        } else {
            if (svg) {
                svg.style.removeProperty('display');
            }
            board.style.removeProperty('background');
        }
    });
}

function hideCoordinates() {
    document.querySelectorAll('div[data-testid^="coordsFile-"], div[data-testid^="coordsRank-"]').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
    });

    document.querySelectorAll('svg text').forEach(el => {
        const val = el.textContent.trim();
        if (/^([1-9]|10)$/.test(val) || /^[a-jA-J]$/.test(val)) {
            el.style.setProperty('display', 'none', 'important');
        }
    });
}

function applyPieces(pieceSkinName, flipColors) {
    const rawSkinMap = skins[pieceSkinName];
    if (!rawSkinMap || Object.keys(rawSkinMap).length === 0) return;

    const skinMap = buildFlippedSkin(rawSkinMap, flipColors);
    const pieceKeys = Object.keys(skinMap);

    document.querySelectorAll('div[data-testid="piece"]').forEach(el => {
        const bg = el.style.backgroundImage;
        if (!bg || bg.includes('chrome-extension://')) return;

        for (const piece of pieceKeys) {
            if (bg.includes(piece)) {
                el.style.setProperty('background-image', `url("${chrome.runtime.getURL(skinMap[piece])}")`, 'important');
                break;
            }
        }
    });

    document.querySelectorAll('img').forEach(el => {
        const src = el.src;
        if (!src || src.includes('chrome-extension://')) return;
        for (const piece of pieceKeys) {
            if (src.includes(piece)) {
                const newUrl = chrome.runtime.getURL(skinMap[piece]);
                if (el.src !== newUrl) { el.src = newUrl; el.removeAttribute('srcset'); }
                break;
            }
        }
    });
}

let runTimer = null;

function scheduleRun() {
    clearTimeout(runTimer);
    runTimer = setTimeout(run, 40);
}

function run() {
    chrome.storage.local.get(['activePieceSkin', 'activeBoardSkin', 'flipColors'], (res) => {
        applyBoard(res.activeBoardSkin || 'default');
        applyPieces(res.activePieceSkin || 'custom1', res.flipColors || false);
        hideCoordinates();
    });
}

run();

const observer = new MutationObserver(function(mutations) {
    for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
            const el = mutation.target;
            const testid = el.getAttribute ? el.getAttribute("data-testid") : "";
            if (testid && testid.startsWith("coordsFile-")) {
                scheduleRun();
                return;
            }
        }
        scheduleRun();
        return;
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style', 'class']
});