// ==UserScript==
// @name         Karla's Inventory Everywhere
// @namespace    karla@neopointskarla
// @license      GPL3
// @version      0.0.3
// @description  Open inventory/SDB/Closet/Bank from every page! No need to navigate back and forth
// @author       Karla
// @homepage     https://neopointskarla.com
// @match        *://*.neopets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        GM_addStyle
// @downloadURL  https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/inventory_everywhere.user.js
// @updateURL    https://github.com/karlaneo/neopets-scripts/raw/refs/heads/main/inventory_everywhere.user.js
// ==/UserScript==

GM_addStyle(`
@charset "UTF-8";
/* CSS ITEM GRID ADDITIONS */


#inventory .itemgrid2__2020,.itemgrid3__2020,.itemgrid4__2020,.itemgrid5__2020,.itemgrid6__2020,.itemgrid7__2020 {
    display:grid;
    grid-template-rows:auto;
	grid-gap: 10px;
    width:90%;
    margin:10px auto;
}

#inventory .itemgrid2__2020 .item-img,.itemgrid3__2020 .item-img,.itemgrid4__2020 .item-img,.itemgrid5__2020 .item-img,.itemgrid6__2020 .item-img,.itemgrid7__2020 .item-img {
	background-position:center;
	background-repeat:no-repeat;
	background-size:100%;
	margin:auto;
    /*cursor:pointer;*/
    height:0;
    width:90%;
    padding-bottom:90%;
}

/*
To calculate breakpoints:
((80 * number of columns)+(number of gutters * grid-gap size)*(10/9))
80 because this is the current maximum size we should be displaying items at.
*/

@media screen and (max-width:189px) { /* 2 Columns */
    #inventory .itemgrid2__2020,.itemgrid3__2020,.itemgrid4__2020,.itemgrid5__2020,.itemgrid6__2020,.itemgrid7__2020 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    #inventory .itemgrid2__2020 .item-name {
        font-size:8pt !important;
    }
    #inventory .itemgrid2__2020 .item-subname {
        font-size:6pt !important;
    }
}

@media screen and (min-width:190px) and (max-width:289px) { /* 3 Columns */
	#inventory .itemgrid3__2020,.itemgrid4__2020,.itemgrid5__2020,.itemgrid6__2020,.itemgrid7__2020 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media screen and (min-width:290px) and (max-width:389px) { /* 4 Columns */
	.itemgrid4__2020,.itemgrid5__2020,.itemgrid6__2020,.itemgrid7__2020 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

@media screen and (min-width:390px) and (max-width:489px) { /* 5 Columns */
	#inventory .itemgrid5__2020,.itemgrid6__2020,.itemgrid7__2020 {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
}

@media screen and (min-width:490px) and (max-width:589px) { /* 6 Columns */
	#inventory .itemgrid6__2020,.itemgrid7__2020 {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
}

@media screen and (min-width:590px) { /* 7 Columns */
	#inventory .itemgrid7__2020 {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
}

/*
To calculate grid max-width, add (30px * maximum number of columns) to breakpoint to provide extra space for text beyond the maximum size of the item images.
*/

/* 2 item grid */
#inventory .itemgrid2__2020 {
    max-width:250px;
}

@media screen and (min-width:190px) {
    #inventory .itemgrid2__2020 .item-img {
		width:80px;
		height:80px;
		padding-bottom:0;
	}
    #inventory .itemgrid2__2020 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    #inventory .itemgrid2__2020 .item-subname {
        font-size:8pt !important;
    }
}

/* 3 item grid */
#inventory .itemgrid3__2020 {
    max-width:380px;
}
@media screen and (max-width:289px) {
    #inventory .itemgrid3__2020 .item-name {
        font-size:8pt !important;
    }
    #inventory .itemgrid3__2020 .item-subname {
        font-size:6pt !important;
    }
}
@media screen and (min-width:290px) {
    #inventory .itemgrid3__2020 .item-img {
		width:80px;
		height:80px;
		padding-bottom:0;
	}
    #inventory .itemgrid3__2020 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    #inventory .itemgrid3__2020 .item-subname {
        font-size:8pt !important;
    }
}

/* 4 item grid */
#inventory .itemgrid4__2020 {
    max-width:510px;
}
@media screen and (max-width:389px) {
    #inventory .itemgrid4__2020 .item-name {
        font-size:8pt !important;
    }
    #inventory .itemgrid4__2020 .item-subname {
        font-size:6pt !important;
    }
}
@media screen and (min-width:390px) {
    #inventory .itemgrid4__2020 .item-img {
		width:80px;
		height:80px;
		padding-bottom:0;
	}
    #inventory .itemgrid4__2020 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    #inventory .itemgrid4__2020 .item-subname {
        font-size:8pt !important;
    }
}

/* 5 item grid */
#inventory .itemgrid5__2020 {
    max-width:640px;
}
@media screen and (max-width:489px) {
    #inventory .itemgrid5__2020 .item-name {
        font-size:8pt !important;
    }
    #inventory .itemgrid5__2020 .item-subname {
        font-size:6pt !important;
    }
}
@media screen and (min-width:490px) {
    #inventory .itemgrid5__2020 .item-img {
		width:80px;
		height:80px;
		padding-bottom:0;
	}
    #inventory .itemgrid5__2020 {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    #inventory .itemgrid5__2020 .item-subname {
        font-size:8pt !important;
    }
}

/* 6 item grid */
#inventory .itemgrid6__2020 {
    max-width:770px;
}
@media screen and (max-width:589px) {
    #inventory .itemgrid6__2020 .item-name {
        font-size:8pt !important;
    }
    #inventory .itemgrid6__2020 .item-subname {
        font-size:6pt !important;
    }
}
@media screen and (min-width:590px) {
    #inventory .itemgrid6__2020 .item-img {
		width:80px;
		height:80px;
		padding-bottom:0;
	}
    #inventory .itemgrid6__2020 {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    #inventory .itemgrid6__2020 .item-subname {
        font-size:8pt !important;
    }
}

/* 7 item grid */
#inventory .itemgrid7__2020 {
    max-width:900px;
}
@media screen and (max-width:689px) {
    #inventory .itemgrid7__2020 .item-name {
        font-size:8pt !important;
    }
    #inventory .itemgrid7__2020 .item-subname {
        font-size:6pt !important;
    }
}
@media screen and (min-width:690px) {
    #inventory .itemgrid7__2020 .item-img {
		width:80px;
		height:80px;
		padding-bottom:0;
	}
    #inventory .itemgrid7__2020 .item-subname {
        font-size:8pt !important;
    }
}


/* For grids of 8 or more items, use shoptemplate.css */
#inventory .button-default__2020 {
	display: block;
	height:auto;
	position:relative;
	box-sizing:border-box;
	width:100%;
	padding:5px 5px 10px 5px;
	border: #fff solid 1px;
	text-align:center;
	font-family: "Cafeteria", 'Arial Bold', sans-serif;
	font-size:14pt;
    overflow:hidden;
	cursor:pointer;
	outline:none;
}
#inventory .button-yellow__2020 {
	color:#363636;
	background: #f6e250;
	background: -webkit-linear-gradient(#f6e250,#ebb233);
	background: -moz-linear-gradient(#f6e250,#ebb233);
	background: linear-gradient(#f6e250,#ebb233);
	border-radius: 15px;
	-webkit-box-shadow: inset 0 0 0 1px rgba(246,226,80,1), /* Same as top of gradient */
		inset 0 -3px 2px 3px rgba(196,124,25,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(253,249,220,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
	-moz-box-shadow: inset 0 0 0 1px rgba(246,226,80,1), /* Same as top of gradient */
		inset 0 -3px 2px 3px rgba(196,124,25,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(253,249,220,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
	box-shadow: inset 0 0 0 1px rgba(246,226,80,1), /* Same as top of gradient */
		inset 0 -3px 2px 3px rgba(196,124,25,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(253,249,220,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
}
#inventory .button-yellow__2020:hover, .button-yellow__2020:focus, a:focus > .button-yellow__2020 {
	color:#363636;
	background: #ffff54;
	background: -webkit-linear-gradient(#ffff54,#ffd328);
	background: -moz-linear-gradient(#ffff54,#ffd328);
	background: linear-gradient(#ffff54,#ffd328);
	border-radius: 15px;
	-webkit-box-shadow: inset 0 0 0 1px rgba(255,255,84,1), /* Same as top of gradient */
		inset 0 -3px 2px 3px rgba(234,143,9,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(255,255,243,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
	-moz-box-shadow: inset 0 0 0 1px rgba(255,255,84,1), /* Same as top of gradient */
		inset 0 -3px 2px 3px rgba(234,143,9,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(255,255,243,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
	box-shadow: inset 0 0 0 1px rgba(255,255,84,1), /* Same as top of gradient */
		inset 0 -3px 2px 3px rgba(234,143,9,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(255,255,243,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
}
#inventory .button-yellow__2020:active {
	color:#363636;
	background: #ebb233;
	background: -webkit-linear-gradient(#ebb233,#f6e250);
	background: -moz-linear-gradient(#ebb233,#f6e250);
	background: linear-gradient(#ebb233,#f6e250);
	border-radius: 15px;
	-webkit-box-shadow: inset 0 0 0 1px rgba(235,178,51,1), /* Same as top of gradient */
		inset 0 -1px 2px 3px rgba(196,124,25,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(253,249,220,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
	-moz-box-shadow: inset 0 0 0 1px rgba(246,226,80,1), /* Same as top of gradient */
		inset 0 -1px 2px 3px rgba(196,124,25,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(253,249,220,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
	box-shadow: inset 0 0 0 1px rgba(246,226,80,1), /* Same as top of gradient */
		inset 0 -1px 2px 3px rgba(196,124,25,1), /* Bottom Shadow */
		inset 0 2px 0 1px rgba(253,249,220,1), /* Top Shine */
		0 0 0 2px rgba(0,0,0,1); /* black outside border */
}
`);

async function fetchNPInventory() {
    await fetch("https://www.neopets.com/inventory.phtml", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6,es;q=0.5",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=0, i",
        },
        "referrer": "https://www.neopets.com/inventory.phtml",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });
    return fetch("https://www.neopets.com/np-templates/ajax/inventory.php?itemType=np&alpha=&itemStack=0&action=", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6,es;q=0.5",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.neopets.com/inventory.phtml",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then((res) => res.text()).then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll("script, link").forEach(el => el.remove());
        return doc.body.innerHTML;
    });
}

async function fetchNCInventory() {
    return fetch("https://www.neopets.com/np-templates/ajax/inventory.php?itemType=nc&alpha=&itemStack=0&action=", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6,es;q=0.5",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.neopets.com/inventory.phtml",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then((res) => res.text()).then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll("script, link").forEach(el => el.remove());
        return doc.body.innerHTML;
    });
}

async function buildNPInventoryPopup(npSection, actionPanel) {
    npSection.innerHTML = await fetchNPInventory();
    const itemEls = Array.from(npSection.querySelectorAll('.item-img'));
    for (let i = 0; i < itemEls.length; i += 1) {
        itemEls[i].classList.remove('lazy');
        itemEls[i].style.backgroundImage = `url(${itemEls[i].dataset.image})`;
        itemEls[i].style.cursor = 'pointer';
        itemEls[i].addEventListener('click', async function(event) {
            actionPanel.innerHTML = 'loading...';
            const objId = event.target.dataset.objid;
            actionPanel.innerHTML = await loadItemOptions(objId);
            actionPanel.querySelector('.inv-itemStat-grid').style.display = 'none';
            actionPanel.querySelector('#iteminfo_select_action').style.display = 'flex';
            actionPanel.querySelector('#iteminfo_select_action').style.justifyContent = 'center';
            actionPanel.querySelector('.invitem-submit').style.width = '100px';
            actionPanel.querySelector('.invitem-submit').removeAttribute("onclick");
            actionPanel.querySelector('.invitem-submit').addEventListener('click', async function() {
                if (actionPanel.querySelector('select').value) {
                    event.target.disabled = true;
                    actionPanel.querySelector('.invitem-submit').innerHTML = 'loading...';
                    actionPanel.innerHTML = await useItemOption(objId, actionPanel.querySelector('select').value);
                    if (!actionPanel.querySelector('.invitem-submit')) {
                        const refreshButton = document.createElement('button');
                        refreshButton.className = 'button-default__2020 button-yellow__2020';
                        refreshButton.innerHTML = 'Refresh Inventory';
                        refreshButton.style.width = '200px';
                        refreshButton.style.margin = 'auto';
                        refreshButton.addEventListener('click', async function() {
                            actionPanel.innerHTML = '';
                            npSection.innerHTML = 'Loading';
                            npSection.innerHTML = await buildNPInventoryPopup(npSection, actionPanel);
                        });
                        actionPanel.appendChild(refreshButton);
                    }
                }
            });
        });
    }
    const itemEls2 = Array.from(ncSection.querySelectorAll('.item-img'));
    for (let i = 0; i < itemEls2.length; i += 1) {
        itemEls[i].classList.remove('lazy');
        itemEls2[i].style.backgroundImage = `url(${itemEls2[i].dataset.image})`;
    }
}

async function loadItemOptions(objId) {
    return fetch(`https://www.neopets.com/np-templates/views/iteminfo.phtml?obj_id=${objId}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6,es;q=0.5",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.neopets.com/inventory.phtml",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then((res) => res.text()).then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll("script, link").forEach(el => el.remove());
        return doc.body.innerHTML;
    });
}

async function useItemOption(objId, action) {
    return fetch("https://www.neopets.com/np-templates/views/useobject.phtml", {
        "headers": {
            "accept": "text/html, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.neopets.com/inventory.phtml",
        "body": `obj_id=${objId}&action=${action}&petcare=0`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then((res) => res.text()).then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll("script, link").forEach(el => el.remove());
        return doc.body.innerHTML;
    });
}
// document.querySelectorAll('#invResult a.inv-refresh')

// sdb https://images.neopets.com/themes/h5/basic/images/v3/safetydeposit-icon.svg
// quick stock https://images.neopets.com/themes/h5/basic/images/v3/quickstock-icon.svg
// bank https://images.neopets.com/premium/portal/images/banktotal-icon.png

(async function() {
    'use strict';

    // Your code here...
    try {
        if (location.pathname.startsWith("/inventory.phtml")) return;

        const inventoryButton = document.createElement('div');
        inventoryButton.style.backgroundImage = 'url(https://images.neopets.com/themes/h5/basic/images/v3/inventory-icon.svg)';
        inventoryButton.style.backgroundSize = '50px 50px';
        inventoryButton.style.backgroundPosition = 'center center';
        inventoryButton.style.backgroundRepeat = 'no-repeat';
        inventoryButton.style.backgroundColor = 'rgb(242, 133, 0)';
        inventoryButton.style.position = 'fixed';
        inventoryButton.style.bottom = '50px';
        inventoryButton.style.right = '50px';
        inventoryButton.style.width = '70px';
        inventoryButton.style.height = '70px';
        inventoryButton.style.cursor = 'pointer';
        inventoryButton.style.zIndex = '98';
        inventoryButton.style.borderRadius = '100%';
        inventoryButton.addEventListener('click', function() {
            npSection.innerHTML = 'Loading...';
            ncSection.innerHTML = 'Coming Soon';
            buildNPInventoryPopup(npSection, actionPanel);
            inventoryPanel.style.display = 'flex';
        });
        document.querySelector('body').appendChild(inventoryButton);

        const inventoryPanel = document.createElement('div');
        inventoryPanel.id = 'inventory';
        inventoryPanel.style.position = 'fixed';
        inventoryPanel.style.top = '50%';
        inventoryPanel.style.left = '50%';
        inventoryPanel.style.transform = 'translate(-50%, -50%)';
        inventoryPanel.style.height = '90vh';
        inventoryPanel.style.width = '90vw';
        inventoryPanel.style.padding = '20px';
        inventoryPanel.style.backgroundColor = 'white';
        inventoryPanel.style.zIndex = '99';
        inventoryPanel.style.border = '2px solid rgb(242, 133, 0)';
        inventoryPanel.style.borderRadius = '10px';
        inventoryPanel.style.textAlign = 'center';
        inventoryPanel.style.background = 'rgba(242, 133, 0, 0.5)';
        inventoryPanel.style.display = 'flex';
        inventoryPanel.style.flexDirection = 'column';
        inventoryPanel.style.gap = '16px';
        inventoryPanel.style.display = 'none';
        const actionPanel = document.createElement('div');
        const items = document.createElement('div');
        items.style.flexGrow = '1';
        const npSection = document.createElement('div');
        const ncSection = document.createElement('div');
        npSection.style.margin = '16px 0';
        ncSection.style.margin = '16px 0';
        actionPanel.style.margin = '16px 0';
        npSection.style.backgroundColor = 'white';
        ncSection.style.backgroundColor = 'white';
        actionPanel.style.backgroundColor = 'white';
        npSection.style.borderRadius = '6px';
        ncSection.style.borderRadius = '6px';
        actionPanel.style.borderRadius = '6px';
        items.appendChild(actionPanel);
        items.appendChild(npSection);
        // items.appendChild(ncSection);
        inventoryPanel.appendChild(items);
        const closeButton = document.createElement('button');
        closeButton.innerHTML = 'Close';
        closeButton.className = 'button-default__2020 button-yellow__2020';
        closeButton.style.width = '100px';
        closeButton.style.margin = 'auto';
        closeButton.addEventListener('click', function() {
            actionPanel.innerHTML = '';
            inventoryPanel.style.display = 'none';
        });
        inventoryPanel.appendChild(closeButton);

        document.querySelector('body').appendChild(inventoryPanel);
    } catch (e) {
        console.log(e);
    }
})();
