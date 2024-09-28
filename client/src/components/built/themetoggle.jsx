// ThemeToggle.jsx
import React from "react";
import { SunIcon, MoonIcon } from "lucide-react"; 
import { useTheme } from "../context/themecontext";


const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6 text-gray-600" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
