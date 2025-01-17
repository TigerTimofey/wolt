import React, { useState, useEffect } from "react";
import dark from "/dark.png";
import light from "/light.png";

// Define CSS variables for themes
const themes: Record<string, Record<string, string>> = {
  light: {
    "--main-component-info-color": "#333",
    "--main-dark-grey-color": "#333",
    "--main-light-gray-color": "#888",
    "--brand-blue-color": "#07c4eb",
    "--form-bg-color": "#ffffff",
    "--brand-white-font-color": "#ffffff",
    "--brand-bg-font-color": "#f8f8fb",
    "--error-container-color": "none",
    "--brand-white-font-button-color": "#ffffff",
    "--brand-blue-button-color": "#07c4eb",
    "--brand-blue-button-color-hover": "#0ba7c6",
  },
  dark: {
    "--main-component-info-color": "#ffffff",
    "--main-dark-grey-color": "#ffffff",
    "--main-light-gray-color": "#d6d0d0",
    "--brand-blue-color": "#242424",
    "--form-bg-color": "#3d3d3d",
    "--brand-white-font-color": "#ffffff",
    "--brand-bg-font-color": "#000000",
    "--error-container-color": "#ffffff",
    "--brand-white-font-button-color": "#0092d0",
    "--brand-blue-button-color": "#001924",
    "--brand-blue-button-color-hover": "#002231",
  },
};

const ThemeManager: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Load the theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  // Update CSS variables based on the theme
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme); // persist theme in localStorage

    const root = document.documentElement;
    const themeVariables = themes[theme];

    // Apply the theme variables
    Object.keys(themeVariables).forEach((key) => {
      root.style.setProperty(key, themeVariables[key]);
    });
  }, [isDarkMode]);

  return (
    <>
      <button
        className="theme-toggle"
        onClick={() => setIsDarkMode((prevState) => !prevState)}
      >
        {isDarkMode ? (
          <img className="mode-style" src={light} alt="light mode" />
        ) : (
          <img className="mode-style" src={dark} alt="dark mode" />
        )}
      </button>
    </>
  );
};

export { ThemeManager };
