import { applyDyslexiaFont, removeDyslexiaFont } from "./content/dyslexiaFont.js";
import { applyContrastTheme, removeContrastTheme } from "./content/contrast.js"; // ✅ NEW
import { applyFocusMode, removeFocusMode } from "./content/focusMode.js";


function applyFontIfEnabled() {
  chrome.storage.local.get(["dyslexiaFont", "dyslexiaFontSettings"], (data) => {
    if (data.dyslexiaFont) {
      applyDyslexiaFont(data.dyslexiaFontSettings || {});
    } else {
      removeDyslexiaFont();
    }
  });
}

function applyContrastIfEnabled() {
  chrome.storage.local.get(["dyslexiaContrast", "contrastTheme"], (data) => {
    if (data.dyslexiaContrast) {
      applyContrastTheme(data.contrastTheme || "default");
    } else {
      removeContrastTheme();
    }
  });
}

function applyFocusIfEnabled() {
  chrome.storage.local.get(["focusMode", "focusSettings"], (data) => {
    if (data.focusMode) {
      const settings = data.focusSettings || {};
      applyFocusMode({
        blurOpacity: settings.blurOpacity ?? 0.6,
        borderColor: settings.borderColor ?? "#FFD700",
      });
    } else {
      removeFocusMode();
    }
  });
}




chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "TOGGLE_DYSLEXIA_FONT") {
    if (message.enabled) {
      chrome.storage.local.get("dyslexiaFontSettings", (data) => {
        applyDyslexiaFont(data.dyslexiaFontSettings || {});
      });
    } else {
      removeDyslexiaFont();
    }
  }

  if (message.type === "UPDATE_DYSLEXIA_STYLE") {
    applyDyslexiaFont(message.settings);
  }

  if (message.type === "TOGGLE_DYSLEXIA_CONTRAST") {
    if (message.enabled) {
      applyContrastTheme("default");
    } else {
      removeContrastTheme();
    }
  }

  if (message.type === "APPLY_CONTRAST_THEME") {
    applyContrastTheme(message.theme);
  }

  if (message.type === "RESET_ALL_SETTINGS") {
    removeDyslexiaFont();
    removeContrastTheme();
  }

  if (message.type === "TOGGLE_FOCUS_MODE") {
  if (message.enabled) {
    chrome.storage.local.get("focusSettings", (data) => {
      const settings = data.focusSettings || {};
      applyFocusMode({
        blurOpacity: settings.blurOpacity ?? 0.6,
        borderColor: settings.borderColor ?? "#FFD700",
      });
    });
  } else {
    removeFocusMode();
  }
}


if (message.type === "UPDATE_FOCUS_STYLE") {
  removeFocusMode(); // Remove old styles
  applyFocusMode(message.options); // Reapply new
}


});

// ✅ Reapply styles on SPA page load (YouTube)
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    applyFontIfEnabled();
    applyContrastIfEnabled();
    applyFocusIfEnabled();
  }
}).observe(document, { subtree: true, childList: true });

// ✅ On initial page load
applyFontIfEnabled();
applyContrastIfEnabled();
applyFocusIfEnabled();

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "f" && !e.ctrlKey && !e.metaKey && !e.altKey) {
    chrome.storage.local.get("focusModeEnabled", (data) => {
      const enabled = !data.focusModeEnabled;
      chrome.storage.local.set({ focusModeEnabled: enabled }, () => {
        if (enabled) {
          applyFocusMode();
        } else {
          removeFocusMode();
        }
      });
    });
  }
});

