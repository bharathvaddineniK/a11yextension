const focusStyleId = "youaccess-focus-style";
let rafId = null;
let currentlyFocusedShort = null;

export function applyFocusMode({ blurOpacity = 0.6, borderColor = "#FFD700" } = {}) {
  removeFocusMode(); // Cleanup before applying again

  // 1. Add the dimming overlay
  const overlay = document.createElement("div");
  overlay.id = "youaccess-focus-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, ${blurOpacity});
    z-index: 2147483646;
    pointer-events: none;
    mix-blend-mode: multiply;
    isolation: isolate;
  `;
  document.body.appendChild(overlay);

  // 2. Add persistent style block
  const style = document.createElement("style");
  style.id = focusStyleId;
  style.textContent = `
    /* Main YouTube Video Player */
    ytd-watch-flexy[theater] #player,
    ytd-watch-flexy[fullscreen] #player,
    ytd-watch-flexy #player,
    #movie_player {
      position: relative !important;
      z-index: 2147483647 !important;
      box-shadow: 0 0 0 4px ${borderColor}, 0 0 30px ${borderColor}80 !important;
      transition: all 0.3s ease-in-out;
    }

    /* Shorts player if injected class is used */
    .youaccess-focus-shorts {
        padding: 4px !important;
      position: relative !important;
      z-index: 2147483647 !important;
      box-shadow: 0 0 0 4px ${borderColor}, 0 0 30px ${borderColor}80 !important;
        /* Add this for rounded corners */
  border-radius: 16px !important; 

  /* Add this to clip the video inside the rounded corners */
  overflow: hidden !important;
    }
  `;
  document.head.appendChild(style);

  // 3. Apply class to Shorts repeatedly to resist overwrite
  function maintainShortsHighlight() {

    const activeRenderer = document.querySelector('ytd-reel-video-renderer[is-active]');
    if (activeRenderer) {
        const parentDivToFocus = activeRenderer.parentElement;
        console.log('parentDivToFocus:', parentDivToFocus)
        if (parentDivToFocus && parentDivToFocus !== currentlyFocusedShort) {
      
      // Remove the class from the previously focused parent
      if (currentlyFocusedShort) {
        currentlyFocusedShort.classList.remove('youaccess-focus-shorts');
      }

      // Add the class to the new parent div
      parentDivToFocus.classList.add('youaccess-focus-shorts');

      // Update our tracker to this parent div
      currentlyFocusedShort = parentDivToFocus;
    }
    }
    // if (shorts) shorts.classList.add('youaccess-focus-shorts');
    rafId = requestAnimationFrame(maintainShortsHighlight);
  }

  maintainShortsHighlight();
}

export function removeFocusMode() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;

  const overlay = document.getElementById("youaccess-focus-overlay");
  if (overlay) overlay.remove();

  const style = document.getElementById(focusStyleId);
  if (style) style.remove();

  const shorts = document.querySelector('[id="shorts-player"]');
  if (shorts) shorts.classList.remove('youaccess-focus-shorts');
}
