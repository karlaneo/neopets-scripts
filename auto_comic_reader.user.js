// ==UserScript==
// @name         Neopets - Karla's TVW Auto Comic Reader
// @namespace    karla@neopointskarla
// @license      GPL3
// @version      0.0.3
// @description  Automatically marks comic as read without hovering
// @author       Karla
// @match        *://*.neopets.com/tvw/story*
// @icon         https://github.com/karlaneo/neopets-scripts/blob/main/favicon-32x32.png?raw=true
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL  https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/auto_comic_reader.user.js
// @updateURL    https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/auto_comic_reader.user.js
// ==/UserScript==


const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

const random_in_range = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1) + start);
};

(async function() {
    'use strict';

    // Your code here...
    await sleep(1000);
    try {
        if (typeof dialogueSceneH5 !== 'undefined') {
            await sleep(random_in_range(1000, 2000));
            dialogueSceneH5.end();
        } else if (typeof numPanels !== 'undefined') {
            for (let i = 1; i <= numPanels; i += 1) {
                await sleep(random_in_range(200, 500));
                PlotHub.readPanel(i);
            }
        }

        while (!document.querySelector('#PlotNextButton:not(:disabled)')) {
            await sleep(500);
        }

        document.querySelector('#PlotNextButton:not(:disabled)').click();
    } catch (e) {
        console.log(e);
    }
})();
