// ==UserScript==
// @name         Neopets - Karla's TVW Auto Comic Reader
// @namespace    karla@neopointskarla
// @license      GPL3
// @version      0.0.6
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

        if (document.querySelector('.plothub-puzzle')) {
            while (document.querySelector('.plothub-puzzle.hide')) {
                await sleep(500);
            }
            if (document.querySelector('.plothub-puzzle:not(.hide) #PlotPuzzleAnswer')) {
                document.querySelector('#PlotPuzzleAnswer').value = 'OUR GOURMANDIZER UNIFIES ALL';
                await sleep(500);
                await document.querySelector('#PlotPuzzleButton').click();
            } else if (document.querySelector(".plothub-puzzle:not(.hide) #PlotPuzzleAnswer1")) {
                document.querySelector("#PlotPuzzleAnswer1").value = "V";
                document.querySelector("#PlotPuzzleAnswer2").value = "I";
                document.querySelector("#PlotPuzzleAnswer3").value = "G";
                document.querySelector("#PlotPuzzleAnswer4").value = "O";
                await sleep(500);
                await document.querySelector('#PlotPuzzleButton').click();
            } else if (document.querySelector('#PlotPuzzleForm.puzzle-3')) {
                document.querySelector('#PuzzleSelect1').value = '6';
                document.querySelector('#PuzzleSelect2').value = '33';
                document.querySelector('#PuzzleSelect3').value = '37';
                document.querySelector('#PuzzleSelect4').value = '29';
                await sleep(500);
                await document.querySelector('#PlotPuzzleButton').click();

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
