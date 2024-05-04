import { useEffect } from "react";
import light from "./light.png";
import night from "./night.png";
import "./style.css";
const Theme = (props) => {
  const { darkMode, setDarkMode } = props;

  const handleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    localStorage.setItem("theme", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);
  return (
    <div className="change-theme">
      <button onClick={handleTheme} className="theme-icon">
        <img src={!darkMode ? night : light} alt="theme" />
      </button>
    </div>
  );
};

export default Theme;
