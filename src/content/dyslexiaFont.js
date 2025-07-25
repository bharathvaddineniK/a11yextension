const dyslexiaStyleId = "youaccess-dyslexia-font-style";

export function applyDyslexiaFont({ fontFamily, fontSize, letterSpacing, lineHeight }) {
    console.log('fontFamily: ', fontFamily)
  removeDyslexiaFont(); // Always reset before applying new styles

  const style = document.createElement("style");
  style.id = dyslexiaStyleId;

  const fontPath = chrome.runtime.getURL(`public/fonts/${fontFamily}.ttf`);

  style.textContent = `
    @font-face {
      font-family: '${fontFamily}';
      src: url('${fontPath}') format("truetype");
      font-display: swap;
    }

    /* Global fallback and specificity */
    html, body, ytd-app, ytd-watch-flexy, .ytp-caption-segment, .title, #container, span, div {
      font-family: '${fontFamily}', sans-serif !important;
      font-size: ${fontSize}px !important;
      letter-spacing: ${letterSpacing}em !important;
      line-height: ${lineHeight} !important;
    }

    /* Captions */
    .ytp-caption-segment {
      background-color: rgba(0, 0, 0, 0.75) !important;
      color: white !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
    }

    /* Scrollable long text (titles, labels) */
    h1, h2, h3, h4, h5, h6,
    ytd-video-primary-info-renderer h1.title,
    .style-scope.ytd-video-primary-info-renderer {
      overflow-x: auto !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      display: block !important;
    }
  `;

  document.head.appendChild(style);
}

export function removeDyslexiaFont() {
  const existing = document.getElementById(dyslexiaStyleId);
  if (existing) existing.remove();
}
