export function handleToggle({
  state,
  setState,
  storageKey,
  messageType,
}) {
  const newState = !state;
  setState(newState);
  chrome.storage.local.set({ [storageKey]: newState });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: messageType,
        enabled: newState,
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Failed to send message:", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent successfully");
        }
      });
    } else {
      console.error("No active tab found");
    }
  });
}
