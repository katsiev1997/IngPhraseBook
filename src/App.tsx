import { useEffect, useState } from "react";
import { Themes } from "./theme";
import axios from "axios";
import { PhraseBlock } from "./components/PhraseBlock";
import { Header } from "./components/Header";
import "./App.css";
import { Loader } from "./components/Loader";

type Phrase = {
  id: number;
  rus: string;
  ing: string;
  trscp: string;
};

function App() {
  const [theme, setTheme] = useState("ПРИВЕТСТВИЕ");
  const [activeId, setActiveId] = useState(0);
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
        setLoading(false);
        console.log(error);
      }
    };
    if (theme !== "") {
      getData();
    }
  }, [theme]);
  return (
    <>
      <Header />
      <div>
        <button
          className=" bg-slate-500 text-white w-full p-2 lg:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          Тема:{" "}
          <span className="first-letter:uppercase lowercase text-lg">{theme}</span>
        </button>
        {open && (
          <div className="absolute w-full bg-white">
            {themes.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setTheme(item);
                  setOpen(false);
                }}
                className="pl-5 font-semibold cursor-pointer hover:bg-zinc-200 max-h-14 min-h-10 h-min  w-full flex items-center border-b"
              >
                <span
                  className={`first-letter:uppercase lowercase text-lg ${
                    item === theme ? "text-cyan-600" : ""
                  }`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex">
        <div className="hidden lg:w-1/4 lg:block">
          {themes.map((item, i) => (
            <div
              key={i}
              onClick={() => setTheme(item)}
              className="pl-5 font-semibold cursor-pointer hover:bg-zinc-200 max-h-20 min-h-8 h-min  w-full max-w-xs flex items-center border-b"
            >
              <span
                className={`first-letter:uppercase lowercase text-lg ${
                  item === theme ? "text-cyan-600" : ""
                }`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="px-3 w-screen overscroll-x-none">
            {phrases?.map((item) => (
              <PhraseBlock
                onClick={() => setActiveId(item.id)}
                key={item.id}
                rus={item.rus}
                ing={item.ing}
                trscp={item.trscp}
                active={item.id === activeId}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
