// ==UserScript==
// @name         Karla's TVW Auto Volunteer
// @namespace    karla@neopointskarla
// @license      GPL3
// @version      0.0.1
// @description  Automatically sends your pets to volunteer
// @author       Karla
// @match        *://*.neopets.com/hospital/volunteer*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL  https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/auto_volunteer.user.js
// @updateURL    https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/auto_volunteer.user.js
// ==/UserScript==


const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

const random_in_range = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1) + start);
};

async function sendPet(battlePet) {
    while (document.querySelector('[onclick="completeShift(this)"]')) {
        await sleep(random_in_range(1000, 1500));
        document.querySelector('[onclick="completeShift(this)"]').click();
        await sleep(random_in_range(1000, 1500));
    }

    while (true) {
        await sleep(random_in_range(1000, 1500));
        const volunteerButtons = document.querySelectorAll('[onclick^="selectFight"]');
        if (volunteerButtons.length > 0) {
            volunteerButtons[volunteerButtons.length - 1].click();
            await sleep(random_in_range(1000, 1500));
            if (document.querySelector('[onclick="showPets()"]')) {
                document.querySelector('[onclick="showPets()"]').click();
            }
            while (!document.querySelector('#VolunteerSelectPet:not(.hide)')) {
                sleep(500);
            }
            await sleep(random_in_range(1000, 1500));
            if (!document.querySelector(`#VolunteerPetList [onclick="selectPet(this)"]:not([data-petname="${battlePet}"]`)) {
                showFights();
                return;
            }
            document.querySelector(`#VolunteerPetList [onclick="selectPet(this)"]:not([data-petname="${battlePet}"]`).click();
            await sleep(random_in_range(1000, 1500));
            document.querySelector('#VolunteerJoinButton').click();
            await sleep(random_in_range(1000, 1500));
            while (!document.querySelector('#VolunteerFightInfo')) {
                sleep(500);
            }
        } else {
            break;
        }
    }


}

(async function() {
    'use strict';

    // Your code here...
    const autoplay = GM_getValue("auto_volunteer");
    let battlePet = GM_getValue("battle_pet") || '';
    console.log(battlePet);
    try {
        if (document.querySelector('#VolunteerFightInfo')) {
            while (document.querySelector('.vc-act.minimize .vc-pane-btn')) {
                document.querySelector('.vc-act.minimize .vc-pane-btn').click();
                await sleep(random_in_range(100, 150));
            }
            const button = document.createElement('button');
            button.innerHTML = autoplay ? 'Sending Pets' : 'Send All Pets';
            button.className = 'button-default__2020 button-yellow__2020 btn-single__2020 plot-button vc-button';
            const ignoreEl = document.createElement('div');
            ignoreEl.style.textAlign = 'center';
            ignoreEl.innerHTML = '<label>Battle Pet Name: <input id="k-ignore" /></label>';
            document.querySelector('#VolunteerFightInfo').prepend(ignoreEl);
            document.querySelector('#VolunteerFightInfo').prepend(button);
            document.querySelector('#k-ignore').addEventListener('change', function(evt) {
                battlePet = evt.target.value;
                GM_setValue("battle_pet", battlePet);
            });
            if (battlePet) {
                document.querySelector('#k-ignore').value = battlePet;
            }

            button.addEventListener('click', function() {
                if (autoplay) {
                    button.innerHTML = 'Send All Pets';
                    GM_setValue("auto_volunteer", false);
                    window.location.reload();
                } else {
                    button.innerHTML = 'Sending Pets';
                    GM_setValue("auto_volunteer", true);
                    sendPet(battlePet);
                }
            });
            if (autoplay) {
                sendPet(battlePet);
            }
        }
    } catch (e) {
        console.log(e);
    }
})();
