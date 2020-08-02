(function(){

    const LIGHT_SETTINGS = {
        length: 8,
        symbols: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    };
    const OPTIMAL_SETTINGS = {
        length: 12,
        symbols: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$%^:&*'
    };
    const STRONG_SETTINGS = {
        length: 16,
        symbols: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$%^:&*'
    };

    const MORE_OPTIONS_COUNT = 10;

    let textbox = document.getElementById('password-text');
    let refreshBtn = document.getElementById('refresh-btn');
    let moreValues = document.querySelectorAll('.more-options-values');

    textbox.addEventListener('click', selectTextbox);
    refreshBtn.addEventListener('click', refreshAll);
    window.addEventListener('load', refreshAll);

    function refreshAll() {
        refreshPassword();
        selectTextbox();
        refreshAdditionalValues();
    }

    function refreshPassword() {
        let password = generatePassword(OPTIMAL_SETTINGS);
        textbox.value = password;
    }

    function refreshAdditionalValues() {
        moreValues.forEach((node, idx) => {
            let i = 0;
            let currentSettings = [LIGHT_SETTINGS, OPTIMAL_SETTINGS, STRONG_SETTINGS][idx];
            let html = '';
            for (i = 0; i < MORE_OPTIONS_COUNT; i++) {
                html += `<p>${generatePassword(currentSettings)}</p>`;
            }
            node.innerHTML = html;
        });
    }

    function selectTextbox() {
        textbox.select();
        textbox.focus();
    }

    function generatePassword(settings) {
        settings = settings || OPTIMAL_SETTINGS;

        let result = Array.from(crypto.getRandomValues(new Uint32Array(settings.length)));
        return result.map(x => settings.symbols[x % settings.symbols.length]).join('');
    }

})();