import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import SettingCard from "./components/SettingCard";
import FontSettings from "./components/FontSettings";
import ContrastOptions from "./components/ContrastOptions";
import FocusSettings from "./components/FocusSettings";
import "./styles/global.css";
import { handleToggle } from "./utils/handleToggle";

function Popup() {
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [dyslexiaContrast, setDyslexiaContrast] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [contrastTheme, setContrastTheme] = useState("yellow");
  const [fontSettings, setFontSettings] = useState({
    fontSize: 18,
    letterSpacing: 0.03,
    lineHeight: 1.6,
  });

  function updateFocusSettings(settings) {
  chrome.storage.local.set({ focusSettings: settings }, () => {
    chrome.runtime.sendMessage({
      type: "UPDATE_FOCUS_STYLE",
      settings
    });
  });
}


  const defaultFontSettings = {
    fontSize: 18,
    letterSpacing: 0.03,
    lineHeight: 1.6,
  };

  const [focusOptions, setFocusOptions] = useState({
  blurOpacity: 0.6,
  borderColor: "#00BCD4",
});

const defaultFocusOptions = {
  blurOpacity: 0.6,
  borderColor: "#00BCD4",
};


  const sendMessageToActiveTab = (message) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      } else {
        console.warn("No active tab found to send message:", message);
      }
    });
  };

  const onFontSettingChange = (key, value) => {
    const updated = { ...fontSettings, [key]: value };
    setFontSettings(updated);
    chrome.storage.local.set({ dyslexiaFontSettings: updated });

    sendMessageToActiveTab({
      type: "UPDATE_DYSLEXIA_STYLE",
      settings: updated,
    });
  };

  const handleResetClick = () => {
    setDyslexiaFont(false);
    setDyslexiaContrast(false);
    setFocusMode(false);
    setContrastTheme("yellow");
    setFontSettings(defaultFontSettings);

    chrome.storage.local.set({
      dyslexiaFont: false,
      dyslexiaContrast: false,
      focusMode: false,
      contrastTheme: "yellow",
      dyslexiaFontSettings: defaultFontSettings,
      focusMode: false,
    });

    sendMessageToActiveTab({ type: "TOGGLE_DYSLEXIA_FONT", enabled: false });
    sendMessageToActiveTab({ type: "TOGGLE_DYSLEXIA_CONTRAST", enabled: false });
    sendMessageToActiveTab({ type: "TOGGLE_FOCUS_MODE", enabled: false });
    sendMessageToActiveTab({ type: "RESET_ALL_SETTINGS" });
    sendMessageToActiveTab({ type: "TOGGLE_FOCUS_MODE", enabled: false });

  };

  const handleContrastSelect = (theme) => {
  setContrastTheme(theme);
  chrome.storage.local.set({ contrastTheme: theme });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "APPLY_CONTRAST_THEME",
        theme,
      });
    }
  });
};


  useEffect(() => {
    chrome.storage.local.get([
      "dyslexiaFont",
      "dyslexiaContrast",
      "focusMode",
      "dyslexiaFontSettings",
      "contrastTheme",
    ], (result) => {
      if (typeof result.dyslexiaFont === "boolean") setDyslexiaFont(result.dyslexiaFont);
      if (typeof result.dyslexiaContrast === "boolean") setDyslexiaContrast(result.dyslexiaContrast);
      if (typeof result.focusMode === "boolean") setFocusMode(result.focusMode);
      if (result.dyslexiaFontSettings) setFontSettings(result.dyslexiaFontSettings);
      if (result.contrastTheme) setContrastTheme(result.contrastTheme);
      if (result.focusSettings) setFocusOptions(result.focusSettings);
    });
  }, []);

  return (
    <div>
      <h1>YouAccess Settings</h1>

      <SettingCard
        title="Dyslexia Font"
        description="Switch to a dyslexia-friendly font and optimized spacing for readability."
        toggleId="dyslexiaFont"
        isEnabled={dyslexiaFont}
        onToggle={() =>
          handleToggle({
            state: dyslexiaFont,
            setState: setDyslexiaFont,
            storageKey: "dyslexiaFont",
            messageType: "TOGGLE_DYSLEXIA_FONT",
            useTabs: true,
          })
        }
      />

      {dyslexiaFont && (
        <FontSettings
          {...fontSettings}
          onChange={onFontSettingChange}
        />
      )}

      <SettingCard
        title="Dyslexia Contrast"
        description="Use a high-contrast theme with WCAG-friendly colors."
        toggleId="dyslexiaContrast"
        isEnabled={dyslexiaContrast}
        onToggle={() =>
          handleToggle({
            state: dyslexiaContrast,
            setState: setDyslexiaContrast,
            storageKey: "dyslexiaContrast",
            messageType: "TOGGLE_DYSLEXIA_CONTRAST",
            useTabs: true,
          })
        }
      />

      {dyslexiaContrast && (
  <ContrastOptions
    currentTheme={contrastTheme}
    onSelect={handleContrastSelect}
  />
)}


      <SettingCard
        title="Focus Mode"
        description="Dim distractions and highlight the video area for better concentration."
        toggleId="focusMode"
        isEnabled={focusMode}
        onToggle={() =>
          handleToggle({
            state: focusMode,
            setState: setFocusMode,
            storageKey: "focusMode",
            messageType: "TOGGLE_FOCUS_MODE",
            useTabs: true,
          })
        }
      />

      {focusMode && (
  <FocusSettings
    options={focusOptions}
    onChange={(key, value) => {
      const updated = { ...focusOptions, [key]: value };
      setFocusOptions(updated);
      chrome.storage.local.set({ focusSettings: updated });

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "UPDATE_FOCUS_STYLE",
            options: updated,
          });
        }
      });
    }}
  />
)}

      <button
        onClick={handleResetClick}
        className="reset-button"
        aria-label="Reset all accessibility settings"
      >
        Reset to Default
      </button>
    </div>
  );
}

const container = document.getElementById("popup-root");
const root = createRoot(container);
root.render(<Popup />);
