import React from "react";
import "../styles/global.css";

const SettingCard = ({ title, description, toggleId, isEnabled, onToggle }) => {
  return (
    <div className="card">
      <div
        className="card-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 id={`${toggleId}-title`} className="card-title">
          {title}
        </h2>

        <div className="toggle-container">
          <input
            type="checkbox"
            id={toggleId}
            className="toggle-checkbox"
            checked={isEnabled}
            onChange={onToggle}
            aria-labelledby={`${toggleId}-title`}
          />
          <label
            htmlFor={toggleId}
            className="toggle-label"
            tabIndex="0"
            role="switch"
            aria-checked={isEnabled}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle();
              }
            }}
          >
            <span className="toggle-slider" />
          </label>
        </div>
      </div>

      <p className="card-description">{description}</p>
    </div>
  );
};

export default SettingCard;
