import React from "react";

export default function FontSettings({
  fontFamily,
  fontSize,
  letterSpacing,
  lineHeight,
  onChange
}) {



  return (
    <div className="font-settings">

      <div>
        <label htmlFor="fontSize">Font Size:</label>
        <div className="range-wrapper">
          <input
            id="fontSize"
            type="range"
            min="14"
            max="24"
            value={fontSize}
            onChange={(e) => onChange("fontSize", e.target.value)}
          />
          <output htmlFor="fontSize">{fontSize}px</output>
        </div>
      </div>

      <div>
        <label htmlFor="letterSpacing">Letter Spacing:</label>
        <div className="range-wrapper">
          <input
            id="letterSpacing"
            type="range"
            min="0.03"
            max="0.2"
            step="0.01"
            value={letterSpacing}
            onChange={(e) => onChange("letterSpacing", e.target.value)}
          />
          <output htmlFor="letterSpacing">{letterSpacing}em</output>
        </div>
      </div>

      <div>
        <label htmlFor="lineHeight">Line Height:</label>
        <div className="range-wrapper">
          <input
            id="lineHeight"
            type="range"
            min="1.4"
            max="2.0"
            step="0.1"
            value={lineHeight}
            onChange={(e) => onChange("lineHeight", e.target.value)}
          />
          <output htmlFor="lineHeight">{lineHeight}</output>
        </div>
      </div>
    </div>
  );
}
