import light from "./light.png";
import night from "./night.png";
import "./style.css";
const Theme = (props) => {
  const { darkMode, setDarkMode } = props;

  const handleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="change-theme">
      <button onClick={handleTheme} className="theme-icon">
        <img src={!darkMode ? night : light} alt="theme" />
      </button>
    </div>
  );
};

export default Theme;
