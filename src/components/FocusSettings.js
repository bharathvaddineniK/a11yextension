import React from "react";

export default function FocusSettings({ options, onChange }) {
  return (
    <div className="focus-settings">
      <label>
        Background Dim (Blur Level):
        <input
          type="range"
          min="0.2"
          max="0.9"
          step="0.1"
          value={options.blurOpacity}
          onChange={(e) => onChange("blurOpacity", parseFloat(e.target.value))}
          aria-label="Adjust background dim level"
        />
      </label>

      <label>
        Highlight Border Color:
        <input
          type="color"
          value={options.borderColor}
          onChange={(e) => onChange("borderColor", e.target.value)}
          aria-label="Select highlight border color"
        />
      </label>
    </div>
  );
}
