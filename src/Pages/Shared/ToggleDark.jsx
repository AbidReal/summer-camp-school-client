import { useEffect, useState } from "react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { setTheme } from "../../theme";

const ToggleDark = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    setIsDarkMode(currentTheme === "light");
    setTheme(currentTheme); // Set initial theme from local storage
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme = newMode ? "light" : "dark";
      localStorage.setItem("theme", theme);
      setTheme(theme); // Update theme dynamically
      return newMode;
    });
  };
  return (
    <div
      className={` rounded-full p-2 hover:cursor-pointer ${
        isDarkMode ? "text-white bg-gray-700" : "bg-gray-200 text-black"
      }`}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <BsMoonStarsFill /> : <BsSun />}
    </div>
  );
};

export default ToggleDark;
