const skins = {
    "custom1": {
        "antiqueen_white": "images/my_anti_queen_white.png",
        "antiqueen_black": "images/my_anti_queen_black.png",
        "underage_pawn_white": "images/underage_pawn_white.png",
        "underage_pawn_black": "images/underage_pawn_black.png",
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
    "custom1": "icons/board1.png",
    "custom2": "icons/board2.png",
    "custom3": "icons/board3.png",
    "default": "icons/default0.png"
};

function applyBoard(boardSkinName) {
    const boardPath = boardSkins[boardSkinName];
    const chessboards = document.querySelectorAll('div[data-testid="chessboard"]');

    if (chessboards.length === 0) return;

    chessboards.forEach(board => {
        const svg = board.querySelector('svg');
        const boardEffects = board.querySelector('div[data-testid="boardEffects"]');
        if (boardEffects) {
            boardEffects.style.removeProperty('background');
        }

        if (boardPath) { 
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

function applyPieces(pieceSkinName) {
    const skinMap = skins[pieceSkinName];
    if (!skinMap || Object.keys(skinMap).length === 0) return;
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


function run() {
    chrome.storage.local.get(['activePieceSkin', 'activeBoardSkin'], (res) => {
        applyBoard(res.activeBoardSkin || 'default');
        applyPieces(res.activePieceSkin || 'custom1');
        hideCoordinates();
    });
}

run();

const observer = new MutationObserver(run);
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style', 'class']
});
