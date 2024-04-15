// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//         text: "OFF",
//     });
// });

chrome.action.onClicked.addListener(async (tab) => {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    if (nextState === "ON") {

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files : [ "rum.js" ],
            })
        await chrome.scripting.insertCSS({
             files: ["rum.css"],
             target: { tabId: tab.id },
        });

        performance.getEntriesByType("navigation").forEach((navigation) => {
            console.log(navigation);
        });
    } else if (nextState === "OFF") {
        
        await chrome.scripting.removeCSS({
            files: ["rum.css"],
            target: { tabId: tab.id },
        });
    }

    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });
});