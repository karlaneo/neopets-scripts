// ==UserScript==
// @name         Neopets - Karla's Auto Fill Shop Till
// @namespace    karla@neopointskarla
// @license      GPL3
// @version      0.0.1
// @description  Automatically fills shop till withdraw amount for you
// @author       Karla
// @match        *://*.neopets.com/market.phtml?type=till*
// @icon         https://github.com/karlaneo/neopets-scripts/blob/main/favicon-32x32.png?raw=true
// @grant        none
// @downloadURL  https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/auto_fill_till.user.js
// @updateURL    https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/auto_fill_till.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const npInTill = document.querySelector('p b').textContent.replace(/,/g, '').replace(' NP', '');
    document.querySelector('[name="amount"]').value = npInTill;
})();
