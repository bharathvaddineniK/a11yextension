// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TOGGLE_DYSLEXIA_FONT") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length) return;
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content/dyslexiaFont.js"],
      }, () => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: request.enabled ? enableDyslexiaFont : disableDyslexiaFont
        });
      });
    });
  }
});
