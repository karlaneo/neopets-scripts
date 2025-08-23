// ==UserScript==
// @name         Neopets - Karla's Lunar Temple Answer
// @namespace    karla@neopointskarla
// @license      GPL3
// @version      0.0.1
// @description  Highlights the correct answer for Lunar Temple
// @author       Karla
// @match        *://*.neopets.com/shenkuu/lunar/?show=puzzle*
// @homepage     https://neopointskarla.com
// @icon         https://github.com/karlaneo/neopets-scripts/blob/main/favicon-32x32.png?raw=true
// @downloadURL  https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/lunar_temple_highlighter.user.js
// @updateURL    https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/lunar_temple_highlighter.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if (!document.body.innerHTML.includes('Please try again tomorrow')) {
        const angle = document.body.innerHTML.match(/angleKreludor=(\d+)/)[1];
        const angleList = [
            0, 12, 34, 57, 79, 102, 124, 147, 169, 192, 214, 237, 259, 282, 304, 327,
            349, 361,
        ];
        let answer = null;
        for (let i = 0; i < angleList.length; i++) {
            if (i <= 7) {
                if (angle >= angleList[i] && angle < angleList[i + 1]) {
                    answer = i + 8;
                    break;
                }
            } else if (i <= 15) {
                if (angle >= angleList[i] && angle < angleList[i + 1]) {
                    answer = i - 8;
                    break;
                }
            } else if (i <= 17) {
                answer = 8;
                break;
            }
        }

        const input = document.querySelectorAll('input[name="phase_choice"]')[answer];
        console.log(input);
        input.parentNode.style.background = 'green';
    }
})();
