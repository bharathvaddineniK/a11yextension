// components/ContrastOptions.js
import React from "react";
import "./ContrastOptions.css";

const contrastOptions = [
  { id: "theme-1", label: "Soft Yellow", theme: "yellow" },
  { id: "theme-2", label: "High Black", theme: "black" },
  { id: "theme-3", label: "Warm Blue", theme: "blue" },
  { id: "theme-4", label: "Classic White", theme: "white" },
];

export default function ContrastOptions({ currentTheme, onSelect }) {
  return (
    <div className="contrast-options" role="radiogroup" aria-label="Contrast Themes">
      {contrastOptions.map((opt) => (
        <button
          key={opt.id}
          className={`contrast-btn ${opt.theme} ${currentTheme === opt.theme ? "selected" : ""}`}
          onClick={() => onSelect(opt.theme)}
          aria-pressed={currentTheme === opt.theme}
          aria-label={`Select ${opt.label} Theme`}
        />
      ))}
    </div>
  );
}
