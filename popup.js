// Переключение вкладок
document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Выделение карточки скина
function selectOption(group, value) {
    document.querySelectorAll('.option[data-group="' + group + '"]').forEach(function(el) {
        var isSelected = el.dataset.value === value;
        el.classList.toggle('selected', isSelected);
        var radio = el.querySelector('input[type="radio"]');
        if (radio) radio.checked = isSelected;
    });
}

document.querySelectorAll('.option').forEach(function(label) {
    label.addEventListener('click', function() {
        selectOption(label.dataset.group, label.dataset.value);
    });
});

// Загрузка сохранённых настроек
chrome.storage.local.get(['activePieceSkin', 'activeBoardSkin'], function(res) {
    selectOption('pieceSkin', res.activePieceSkin || 'custom1');
    selectOption('boardSkin', res.activeBoardSkin || 'default');
});

// Сохранение
document.getElementById('save').addEventListener('click', function() {
    var pieceEl = document.querySelector('.option[data-group="pieceSkin"].selected');
    var boardEl = document.querySelector('.option[data-group="boardSkin"].selected');

    var pieceSkin = pieceEl ? pieceEl.dataset.value : 'custom1';
    var boardSkin = boardEl ? boardEl.dataset.value : 'default';

    chrome.storage.local.set({ activePieceSkin: pieceSkin, activeBoardSkin: boardSkin }, function() {
        var status = document.getElementById('status');
        status.textContent = '✓ Saved!';
        setTimeout(function() { status.textContent = ''; }, 1500);

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs && tabs[0]) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    });
});