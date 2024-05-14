import { useEffect, useState } from "react";
import { Themes } from "./theme";

function App() {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    if (theme !== "") {
      alert(theme);
    }
  }, [theme]);
  const themes = Themes;
  return (
    <div>
      {themes.map((item) => (
        <div
          onClick={() => setTheme(item)}
          className="pl-5 font-semibold cursor-pointer hover:bg-zinc-200 max-h-14 min-h-8 h-min  w-full max-w-xs flex items-center"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default App;
