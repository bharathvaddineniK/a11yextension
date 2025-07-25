const contrastStyleId = "youaccess-contrast-style";

/**
 * Available contrast themes based on WCAG recommendations
 * Each theme contains background and foreground colors
 */
const contrastThemes = {
  yellow: {
    background: "#1a1a1a",   // Very dark gray
    text: "#ffeb3b",         // Softer yellow (AAA contrast)
    link: "#00bcd4",
  },
  black: {
    background: "#000000",
    text: "#FFFFFF",
    link: "#90caf9",         // Lighter blue
  },
  blue: {
    background: "#0f172a",   // Navy blue
    text: "#e2e8f0",         // Light gray-blue
    link: "#38bdf8",         // Sky blue
  },
  white: {
    background: "#FFFFFF",
    text: "#1f2937",         // Dark gray-blue (not pure black)
    link: "#2563eb",         // Accessible blue
  },
};


/**
 * Apply contrast style by theme key
 */
export function applyContrastTheme(themeKey = "default") {

    // Avoid applying custom contrast if Dark Reader is active
if (
  document.querySelector("style.darkreader") ||
  document.documentElement.hasAttribute("data-darkreader-mode")
) {
  console.warn("Dark Reader detected — skipping contrast theme");
  return;
}

  removeContrastTheme(); // Reset before applying new

  const { background, text, link } = contrastThemes[themeKey] || contrastThemes["yellow"];


  const style = document.createElement("style");
  style.id = contrastStyleId;
  style.textContent = `
  html, body, ytd-app {
    background-color: ${background} !important;
    color: ${text} !important;
  }

  body *:not(#youaccess-focus-overlay):not(#youaccess-focus-overlay *):not(script):not(style) {
  color: ${text} !important;
  border-color: ${text} !important;
  background-color: transparent !important;
}



  a, a:visited {
    color: ${link} !important;
  }
`;


  document.head.appendChild(style);
}

/**
 * Remove any contrast theme
 */
export function removeContrastTheme() {
  const existing = document.getElementById(contrastStyleId);
  if (existing) existing.remove();
}
