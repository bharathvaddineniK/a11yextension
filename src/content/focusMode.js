const focusStyleId = "youaccess-focus-style";

export function applyFocusMode({ blurOpacity = 0.6, borderColor = "#FFD700" } = {}) {
  removeFocusMode();

  const overlay = document.createElement("div");
  overlay.id = "youaccess-focus-overlay";
  overlay.style.cssText = `
    position: fixed;
    z-index: 2147483646;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, ${blurOpacity || 0.8});
    pointer-events: none;
  `;
  overlay.style.mixBlendMode = "multiply"; // fixes blur hiding under contrast
  overlay.style.isolation = "isolate";


  document.body.appendChild(overlay);

  const style = document.createElement("style");
  style.id = "youaccess-focus-style";
  style.textContent = `
  ytd-watch-flexy[theater] #player,
  ytd-watch-flexy[fullscreen] #player,
  ytd-watch-flexy #player,
  #movie_player {
    position: relative !important;
    z-index: 2147483647 !important;
    box-shadow: 0 0 0 4px ${borderColor}, 0 0 30px ${borderColor}80;
    transition: all 0.3s ease-in-out;
  }

  ytd-watch-flexy #player:focus {
    outline: 3px dashed ${borderColor};
    outline-offset: 5px;
  }
`;

  document.head.appendChild(style);
}






export function removeFocusMode() {
  const overlay = document.getElementById("youaccess-focus-overlay");
  if (overlay) overlay.remove();

  const style = document.getElementById("youaccess-focus-style");
  if (style) style.remove();
}


