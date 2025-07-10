// ==UserScript==
// @name         Junk Buyer
// @namespace    http://tampermonkey.net/
// @version      2025-03-19
// @description  Auto buys junk items
// @author       Karla
// @match        https://www.neopets.com/inventory.phtml
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

GM_addStyle(`
.karla_loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #FFF #FFF transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.karla_loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent #FF3D00 #FF3D00;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  animation: rotationBack 0.5s linear infinite;
  transform-origin: center center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}


      @keyframes prixClipFix {
          0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
          25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
          50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
          75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
          100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
      }
.start_button {
    display: flex;
    align-items: center;
    gap: 0.3em;
}
.karla_message {
    width: 95%;
    margin: 10px auto;
    text-align: center;
    font-weight: bold;
    font-family: "MuseoSansRounded700", 'Arial', sans-serif;
}
.karla_success {
    color: #4BB543;
}
.karla_error {
    color: #ff0033;
}
.karla_setting {
    position: fixed;
    width: 90%;
    max-width: 600px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 9999;
}
.karla_setting .popup-body__2020 {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    padding: 12px;
}
.karla_setting .button-default__2020 {
    min-height: 40px;
}
`);

const defaultJunkItems = [
  "Shiny Obsidian",
  "Unidentifiable Weak Bottled Faerie",
  "Weak Bottled Air Faerie",
  "Weak Bottled Dark Faerie",
  "Weak Bottled Earth Faerie",
  "Weak Bottled Fire Faerie",
  "Weak Bottled Water Faerie",
  "Battle Faerie Dagger",
  "Brain Muffin",
  "Cursed Wand of Shadow",
  "Darigan Muffin",
  "Golden Muffin",
  "Robot Muffin",
  "Maraquan Charger Plushie",
  "Maraquan Shieldmaiden Plushie",
  "Maraquan Grackle Bug",
  "Maraquan Defenders Stamp",
  "Maraquan Troops Stamp",
  "Necklace of the Water Faerie",
  "Water Faerie Halberd",
  "Galaxy Energy Drink",
  "Rocket Fizzy Drink",
  "Space Spice",
  "Remote Control Virtupets Snowball",
  "Nova",
  "Supernova",
  "Ultranova",
  "Dark Nova",
  "Flutter",
  "Gorunda the Wise",
  "Space Faerie Cereal",
  "Space Faerie Cupcake",
  "Starry Cookie Pile",
  "Starry Crunch",
  "Triple Tier Space Faerie Cake",
  "Starry Biscuit Jar",
];

const random_in_range = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

(async function () {
  "use strict";

  if (!GM_getValue("itemsToBuy")) {
    GM_setValue("itemsToBuy", 50);
  }

  if (!GM_getValue("maxPrice")) {
    GM_setValue("maxPrice", 86);
  }

  if (!GM_getValue("junkItems")) {
    GM_setValue("junkItems", defaultJunkItems.join(","));
  }

  let itemsToBuy = Number(GM_getValue("itemsToBuy"));
  let maxPrice = Number(GM_getValue("maxPrice"));
  let junkItems = GM_getValue("junkItems").split(",");

  const anchor = document.querySelector(".inv-menubar");
  const panel = document.createElement("ul");
  panel.classList.add("inv-menulinks");
  panel.style.width = "95%";
  panel.style.margin = "10px auto";
  panel.style.display = "flex";
  panel.style.justifyContent = "center";
  panel.style.gap = "1em";
  panel.style.backgroundColor = "#f28500";
  anchor.parentNode.appendChild(panel);

  const header = document.createElement("li");
  header.innerHTML = "<a>Junk Buyer</a>";
  panel.appendChild(header);

  const startButtonAnchor = document.createElement("li");
  const startButton = document.createElement("a");
  startButton.href = "javascript:void(0)";
  startButton.innerText = "Start!";
  startButton.classList.add("start_button");
  const startButtonLoader = document.createElement("div");
  startButton.appendChild(startButtonLoader);
  startButtonAnchor.appendChild(startButton);
  panel.appendChild(startButtonAnchor);

  const settingsButtonAnchor = document.createElement("li");
  const settingsButton = document.createElement("a");
  settingsButton.href = "javascript:void(0)";
  settingsButton.innerText = "Settings";
  settingsButtonAnchor.appendChild(settingsButton);
  panel.appendChild(settingsButtonAnchor);

  const messagePanel = document.createElement("div");
  anchor.parentNode.appendChild(messagePanel);
  messagePanel.classList.add("karla_message");

  const settingPanel = document.createElement("div");
  const itemsToBuyEl = document.createElement("input");
  itemsToBuyEl.max = 50;
  itemsToBuyEl.min = 1;
  itemsToBuyEl.type = "number";
  itemsToBuyEl.value = itemsToBuy;
  itemsToBuyEl.addEventListener("input", (evt) => {
    GM_setValue("itemsToBuy", evt.target.value);
    itemsToBuy = evt.target.value;
  });
  const maxPriceEl = document.createElement("input");
  maxPriceEl.max = 999999;
  maxPriceEl.min = 1;
  maxPriceEl.type = "number";
  maxPriceEl.value = maxPrice;
  maxPriceEl.addEventListener("input", (evt) => {
    GM_setValue("maxPrice", evt.target.value);
    maxPrice = evt.target.value;
  });
  const junkItemsEl = document.createElement("textarea");
  junkItemsEl.value = junkItems.join("\n");
  junkItemsEl.style.height = "400px";
  junkItemsEl.addEventListener("input", (evt) => {
    GM_setValue("junkItems", evt.target.value.split("\n").join(","));
    junkItems = evt.target.value.split("\n");
  });
  const closeBtn = document.createElement("button");

  settingPanel.innerHTML = `<div style="display: block;">
	<div class="popup-header__2020">
		<h3>Junk Buyer Settings</h3>
		<div class="popup-header-pattern__2020"></div>
	</div>
	<div class="popup-body__2020" style="max-height: 673.6px;"></div>
		<div class="popup-footer__2020 popup-grid3__2020">
			<div class="button-default__2020 button-red__2020 popup-left-button__2020">
				<div class="button-x__2020"></div>
			</div>
			<div></div>
			<div class="popup-footer-pattern__2020"></div>
		</div>
    </div>`;

  settingPanel.classList.add("karla_setting");
  settingPanel.style.display = "none";
  settingPanel.querySelector(".popup-body__2020").append("Items To Buy ");
  settingPanel.querySelector(".popup-body__2020").append(itemsToBuyEl);
  settingPanel.querySelector(".popup-body__2020").append("Max Price");
  settingPanel.querySelector(".popup-body__2020").append(maxPriceEl);
  settingPanel.querySelector(".popup-body__2020").append("Junk Items");
  settingPanel.querySelector(".popup-body__2020").append(junkItemsEl);
  settingPanel
    .querySelector(".button-red__2020")
    .addEventListener("click", () => {
      settingPanel.style.display = "none";
    });
  settingsButton.addEventListener("click", () => {
    settingPanel.style.display = "block";
  });
  document.body.appendChild(settingPanel);

  const buyJunkFn = async () => {
    const inventory = await (
      await fetch(
        "https://www.neopets.com/np-templates/ajax/inventory.php?itemType=np&alpha=&itemStack=1&action=",
        {
          headers: {
            accept: "*/*",
            "accept-language":
              "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6,es;q=0.5",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
          referrer: "https://www.neopets.com/inventory.phtml",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "POST",
          mode: "cors",
          credentials: "include",
        },
      )
    ).text();

    if (inventory.includes("ory is emp")) {
      let itemsLeftToBuy = itemsToBuy;
      outer: while (true) {
        const junkItem = junkItems[random_in_range(0, junkItems.length - 1)];

        messagePanel.innerText = "Searching for " + junkItem + "...";
        const resultHTML = await fetch(
          "https://www.neopets.com/np-templates/ajax/wizard.php",
          {
            headers: {
              accept: "text/html, */*; q=0.01",
              "accept-language": "en-US",
              "content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "x-requested-with": "XMLHttpRequest",
            },
            referrer: "https://www.neopets.com/shops/wizard.phtml",
            referer: "https://www.neopets.com/shops/wizard.phtml",
            referrerPolicy: "strict-origin-when-cross-origin",
            body:
              "type=process_wizard&feedset=0&shopwizard=" +
              encodeURIComponent(junkItem) +
              "&table=shop&criteria=exact&min_price=0&max_price=" +
              maxPrice,
            method: "POST",
            mode: "cors",
            credentials: "include",
          },
        ).then((res) => res.text());

        const el = document.createElement("div");
        el.innerHTML = resultHTML;

        // check wizard ban
        if (resultHTML.includes("Whoa there, too many searches!")) {
          const pTag = el.querySelector(
            ".wizard-char.wizard-char-single.wizard-char-old + p + p",
          ).textContent;
          const minutes = Number(
            pTag
              .replace(
                "I am too busy right now, please come back in about ",
                "",
              )
              .replace(" minutes and I can help you out.", ""),
          );
          messagePanel.innerText =
            "Wizard banned for " + minutes + " minutes, try again later.";
          messagePanel.classList.add("karla_error");
          return;
        }

        const resultRows = el.querySelectorAll(
          ".wizard-results-grid li:not(.wizard-results-grid-header)",
        );
        messagePanel.innerText = "Found " + resultRows.length + " listings...";
        await sleep(random_in_range(900, 1500));

        for (let i = 0; i < resultRows.length; i += 1) {
          const resultRow = resultRows[i];
          const price = resultRow
            .querySelector(".wizard-results-price")
            .textContent.trim();
          const link = resultRow.querySelector("a").href;
          const count = Number(resultRow.querySelector("p").textContent.trim());

          const userShopHtml = await fetch(link, {
            headers: {
              accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "Accept-Language": "en-US",
            },
            referrer: "https://www.neopets.com/shops/wizard.phtml",
            referer: "https://www.neopets.com/shops/wizard.phtml",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
          })
            .then((res) => res.text())
            .catch((err) => ({ error: "error", err }));
          if (userShopHtml.includes("Item not found!")) {
            messagePanel.innerText = "Item not found, trying next listing...";
            continue;
          } else if (
            userShopHtml.includes(
              "Sorry - The owner of this shop has been frozen!",
            )
          ) {
            messagePanel.innerText = "Frozen shop, trying next listing...";
            continue;
          }

          const shopEl = document.createElement("div");
          shopEl.innerHTML = userShopHtml;

          const buyLink = shopEl.querySelector(
            'a[href^="buy_item.phtml"]',
          ).href;

          for (let j = 0; j < count; j += 1) {
            messagePanel.innerText =
              "Buying " +
              junkItem +
              " for " +
              price +
              "... (" +
              (itemsToBuy - itemsLeftToBuy + 1) +
              "/" +
              itemsToBuy +
              ")";
            const buyResultHtml = await fetch(buyLink, {
              headers: {
                accept:
                  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
              },
              referrer: link,
              referer: link,
              referrerPolicy: "strict-origin-when-cross-origin",
              body: null,
              method: "GET",
              mode: "cors",
              credentials: "include",
            })
              .then((res) => res.text())
              .catch((err) => ({ error: "error", err }));

            if (
              buyResultHtml.includes(
                "The item you are trying to buy does not exist in this shop!",
              )
            ) {
              messagePanel.innerText =
                "Item bought by other player, trying next listing...";
              break;
            }
            itemsLeftToBuy -= 1;
            if (itemsLeftToBuy <= 0) {
              break outer;
            }

            await sleep(random_in_range(900, 1500));
          }

          await sleep(random_in_range(900, 1500));
        }

        await sleep(random_in_range(900, 1500));
      }

      messagePanel.innerText =
        "Purchase complete! Please load shop. Thank you for choosing Karla's NP Shop";
      messagePanel.classList.add("karla_success");
    } else {
      messagePanel.innerText = "Please clear inventory before starting.";
      messagePanel.classList.add("karla_error");
    }
  };

  startButton.addEventListener("click", (evt) => {
    startButtonLoader.classList.add("karla_loader");
    messagePanel.innerText = "";
    messagePanel.classList.remove("karla_error");
    messagePanel.classList.remove("karla_success");
    buyJunkFn().then(() => {
      startButtonLoader.classList.remove("karla_loader");
    });
  });

  // Total Items:
})();
