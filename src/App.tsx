import { useEffect, useState } from "react";
import { Themes } from "./theme";
import axios from "axios";

type Phrase = {
  id: number;
  rus: string;
  ing: string; 
  trscp: string;
};

function App() {
  const [theme, setTheme] = useState("ПРИВЕТСТВИЕ");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phrases, setPhrases] = useState<Phrase[]>();
  const themes = Themes;
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://e62d26507a8d1382.mokky.dev/words?subject=${theme}`
        );
        setPhrases(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (theme !== "") {
      getData();
    }
  }, [theme]);
  return (
    <>
      <header>
        <button onClick={() => setOpen(!open)}>open</button>
        {open && (
          <div className="">
            {themes.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setTheme(item);
                  setOpen(false);
                }}
                className="pl-5 font-semibold cursor-pointer hover:bg-zinc-200 max-h-14 min-h-8 h-min  w-full max-w-xs flex items-center"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </header>

      <div className="flex">
        <div className="hidden lg:w-1/4 lg:block">
          {themes.map((item, i) => (
            <div
              key={i}
              onClick={() => setTheme(item)}
              className="pl-5 font-semibold cursor-pointer hover:bg-zinc-200 max-h-14 min-h-8 h-min  w-full max-w-xs flex items-center"
            >
              {item}
            </div>
          ))}
        </div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="px-3 w-screen overscroll-x-none">
            {phrases?.map((item) => (
              <div
                key={item.id}
                className={
                  item.id % 2 === 0
                    ? "flex items-center gap-1 text-sm min-h-10 bg-slate-100"
                    : "flex items-center gap-1 text-sm min-h-10"
                }
              >
                <div className="w-1/3 lg:w-1/4">{item.rus}</div>
                <div className="w-1/3 lg:w-1/4">{item.ing}</div>
                <div className="w-1/3 lg:w-1/4">{item.trscp}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
