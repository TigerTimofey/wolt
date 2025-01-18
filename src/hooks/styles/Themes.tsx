import React from "react";
import dark from "/images/dark-light-theme/dark.png";
import light from "/images/dark-light-theme/light.png";
import highContrast from "/images/contrast/high-contrast.png";
import lowContrast from "/images/contrast/low-contrast.png";

const themes: Record<string, Record<string, string>> = {
  light: {
    "--table-info-calculator-color": "#333",
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
    "--brand-darkblue-border-button-color": "none",
    "--error-font-color": "#ffffff",
    "--error-color": "#e03330c9",
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
    "--brand-darkblue-border-button-color": "2px solid #0092d0",
  },
  highContrast: {
    "--main-component-info-color": "#000000",
    "--main-dark-grey-color": "#000000",
    "--main-light-gray-color": "#000000",
    "--error-color": "#e03330",
  },
  lowContrast: {
    "--main-light-gray-color": "#888",
    "--error-color": "#2b1110c8",
  },
  highContrastDark: {
    "--main-light-gray-color": "#ffffff",
    "--brand-white-font-button-color": "#ffffff",
    "--brand-blue-button-color": "#000000",
    "--brand-blue-button-color-hover": "#333333",
    "--brand-darkblue-border-button-color": "2px solid #ffffff",
    "--error-color": "#e03330",
  },
};

const ThemeManager: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = React.useState<boolean>(false);
  React.useEffect(() => {
    const root = document.documentElement;

    const baseTheme = isDarkMode ? "dark" : "light";
    const baseThemeVariables = themes[baseTheme];

    Object.keys(baseThemeVariables).forEach((key) => {
      root.style.setProperty(key, baseThemeVariables[key]);
    });

    if (!isDarkMode && isHighContrast) {
      const contrastVariables = themes["highContrast"];
      Object.keys(contrastVariables).forEach((key) => {
        root.style.setProperty(key, contrastVariables[key]);
      });
    }

    if (isDarkMode && isHighContrast) {
      const contrastVariablesDark = themes["highContrastDark"];
      Object.keys(contrastVariablesDark).forEach((key) => {
        root.style.setProperty(key, contrastVariablesDark[key]);
      });
    }
  }, [isDarkMode, isHighContrast]);

  return (
    <div className="theme-toggle-container">
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
      <button
        className="theme-toggle"
        onClick={() => setIsHighContrast((prevState) => !prevState)}
      >
        {isHighContrast ? (
          <img className="mode-style" src={highContrast} alt="high contrast" />
        ) : (
          <img className="mode-style" src={lowContrast} alt="low contrast" />
        )}
      </button>
    </div>
  );
};

export { ThemeManager };
