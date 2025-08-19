// ==UserScript==
// @name         Karla's TVW Lost in the dark helper
// @namespace    karla@neopointskarla
// @license      GPL3
// @version      0.0.2
// @description  Shows the correct path for lost in the dark
// @author       Karla
// @match        *://*.neopets.com/games/lostinthedark/index.phtml*
// @icon         https://github.com/karlaneo/neopets-scripts/blob/main/favicon-32x32.png?raw=true
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL  https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/lost_in_the_dark_helper.user.js
// @updateURL    https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/lost_in_the_dark_helper.user.js
// ==/UserScript==


(async function() {
    'use strict';

    // Your code here...
    if (document.querySelector('[src="https://images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-right.png"]')) {
        document.querySelector('[type="submit"][value="Right"]').classList.add('button-green__2020');
        document.querySelector('[type="submit"][value="Right"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Right"]').value = 'Exit';
    }
    if (document.querySelector('[src="https://images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-left.png"]')) {
        document.querySelector('[type="submit"][value="Left"]').classList.add('button-green__2020');
        document.querySelector('[type="submit"][value="Left"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Right"]').value = 'Exit';
    }
    if (document.querySelector('[src="https://images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-left-straight.png"]')) {
        document.querySelector('[type="submit"][value="Left"]').classList.add('button-blue__2020');
        document.querySelector('[type="submit"][value="Left"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Left"]').value = 'Chest';
        document.querySelector('[type="submit"][value="Straight"]').classList.add('button-green__2020');
        document.querySelector('[type="submit"][value="Straight"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Straight"]').value = 'Exit';
    }
    if (document.querySelector('[src="https://images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-left-right.png"]')) {
        document.querySelector('[type="submit"][value="Left"]').classList.add('button-blue__2020');
        document.querySelector('[type="submit"][value="Left"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Left"]').value = 'Chest';
        document.querySelector('[type="submit"][value="Right"]').classList.add('button-green__2020');
        document.querySelector('[type="submit"][value="Right"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Right"]').value = 'Exit';
    }
    if (document.querySelector('[src="https://images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-right-straight.png"]')) {
        document.querySelector('[type="submit"][value="Right"]').classList.add('button-blue__2020');
        document.querySelector('[type="submit"][value="Right"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Right"]').value = 'Chest';
        document.querySelector('[type="submit"][value="Straight"]').classList.add('button-green__2020');
        document.querySelector('[type="submit"][value="Straight"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Straight"]').value = 'Exit';
    }
    if (document.querySelector('[src="https://images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-straight-left.png"]')) {
        document.querySelector('[type="submit"][value="Straight"]').classList.add('button-blue__2020');
        document.querySelector('[type="submit"][value="Straight"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Straight"]').value = 'Chest';
        document.querySelector('[type="submit"][value="Left"]').classList.add('button-green__2020');
        document.querySelector('[type="submit"][value="Left"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Left"]').value = 'Exit';
    }
    if (document.querySelector('[src="https://images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-right-left.png"]')) {
        document.querySelector('[type="submit"][value="Right"]').classList.add('button-blue__2020');
        document.querySelector('[type="submit"][value="Right"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Right"]').value = 'Chest';
        document.querySelector('[type="submit"][value="Left"]').classList.add('button-green__2020');
        document.querySelector('[type="submit"][value="Left"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Left"]').value = 'Exit';
    }
    if (document.querySelector('[src="https://images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-straight-right.png"]')) {
        document.querySelector('[type="submit"][value="Straight"]').classList.add('button-blue__2020');
        document.querySelector('[type="submit"][value="Straight"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Straight"]').value = 'Chest';
        document.querySelector('[type="submit"][value="Right"]').classList.add('button-green__2020');
        document.querySelector('[type="submit"][value="Right"]').classList.remove('button-yellow__2020');
        document.querySelector('[type="submit"][value="Right"]').value = 'Exit';
    }
})();
