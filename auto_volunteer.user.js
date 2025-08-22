// ==UserScript==
// @name         Neopets - Karla's TVW Auto Volunteer
// @namespace    karla@neopointskarla
// @license      GPL3
// @version      0.1.0
// @description  Automatically sends your pets to volunteer
// @author       Karla
// @match        *://*.neopets.com/hospital/volunteer*
// @icon         https://github.com/karlaneo/neopets-scripts/blob/main/favicon-32x32.png?raw=true
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

function parseTimeToMs(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return ((hours * 3600) + (minutes * 60) + seconds) * 1000;
}

function parseMsToTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}:${minutes}:${seconds}`;
}

async function loop(battlePet) {
    while (document.querySelector('[onclick="completeShift(this)"]')) {
        await sleep(random_in_range(1000, 1500));
        document.querySelector('[onclick="completeShift(this)"]').click();
        await sleep(random_in_range(1000, 1500));
        while (document.querySelector('#VolunteerFinishPopup').style.display !== 'block') {
            await sleep(500);
        }
        console.log("Finishing volunteer");
        document.querySelector('#VolunteerFinishPopup .popup-exit').click();
        await sleep(random_in_range(500, 1000));
    }

    console.log("Choosing fight");
    await sleep(random_in_range(1000, 1500));
    const volunteerButtons = document.querySelectorAll('[onclick^="selectFight"]');
    if (volunteerButtons.length > 0) {
        const volunteerButton = volunteerButtons[volunteerButtons.length - 1];
        const fightId = volunteerButton.getAttribute('onclick').replace('selectFight(', '').replace(')', '');
        console.log("fight", fightId);
        selectFight(fightId);
        while (document.querySelector('#VolunteerJoinPopup').style.display !== 'block') {
            await sleep(100);
        }
        await sleep(random_in_range(1000, 1500));
        showPets();
        while (document.querySelector('#VolunteerPetLoading') !== null) {
            console.log(document.querySelector('#VolunteerPetLoading'));
            await sleep(500);
        }
        await sleep(random_in_range(1000, 1500));
        const availablePets = document.querySelectorAll(`#VolunteerPetList [onclick="selectPet(this)"]:not([data-petname="${battlePet}"]`);
        if (availablePets.length === 0) {
            console.log("No available pets");
            showFights();
        } else {
            const startButton = document.querySelector('#VolunteerJoinButton');
            console.log("Sending pet", availablePets[0].dataset.petname);
            startButton.setAttribute("data-pet", availablePets[0].dataset.petname);
            startButton.removeAttribute("disabled");
            startShift(document.querySelector('#VolunteerJoinButton'));
            await sleep(500);
            if (document.querySelector('#VolunteerJoinedPopup').style.display === 'block') {
                document.querySelector('#VolunteerJoinedPopup .popup-exit').click();
            }
            // page should automatically reload when sending pet to volunteer after 3 seconds
            console.log("Waiting for page reload");
            return;
        }
    } else {
        console.log("All fights used");
    }

    const statusEls = document.querySelectorAll('.vc-fight-timer');
    let maxTime = 0;
    for (let i = 0; i < statusEls.length; i += 1) {
        if (statusEls[i].querySelector('.vc-status').textContent === 'Time Remaining: ') {
            const time = statusEls[i].querySelector('.vc-fight-time').textContent.split('\t')[0];
            maxTime = Math.max(parseTimeToMs(time), maxTime);
        }
    }
    setInterval(function() {
        document.querySelector('#auto_volunteer').innerHTML = `Waiting: ${parseMsToTime(maxTime)}`;
        maxTime -= 1000;
        if (maxTime <= 0) {
            window.location.reload();
        }
    }, 1000);
}

(async function() {
    'use strict';

    // Your code here...
    const autoplay = GM_getValue("auto_volunteer");
    let battlePet = GM_getValue("battle_pet") || '';
    try {
        if (document.querySelector('#VolunteerFightInfo')) {
            while (document.querySelector('.vc-act.minimize .vc-pane-btn')) {
                document.querySelector('.vc-act.minimize .vc-pane-btn').click();
                await sleep(random_in_range(100, 150));
            }
            const button = document.createElement('button');
            button.id = 'auto_volunteer';
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
                    loop(battlePet);
                }
            });
            if (autoplay) {
                loop(battlePet);
            }
        }
    } catch (e) {
        console.log(e);
    }
})();
