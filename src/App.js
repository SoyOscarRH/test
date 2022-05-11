import { useState, createContext, useContext, useEffect } from "react";

const Page = ({ children }) => {
  return (
    <div>
      <Quote />
      {children}
    </div>
  );
};

const ThemeContext = createContext("light");

const Quote = () => {
  const mode = useContext(ThemeContext);
  const [quote, setQuote] = useState("");

  const fetchQuote = async () => {
    setQuote("...");
    const url = "https://www.breakingbadapi.com/api/quote/random";
    const response = await fetch(url);
    const data = await response.json();

    setQuote(data[0].quote);
  };

  useEffect(() => {
    fetchQuote();
  }, [mode]);

  if (quote === "") return null;

  return (
    <h3
      style={{
        color: mode === "light" ? "#000" : "#fff",
      }}
    >
      {quote}
    </h3>
  );
};

const App = () => {
  const [mode, setMode] = useState("light");

  return (
    <div style={{ backgroundColor: mode === "light" ? "#fff" : "#000" }}>
      <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        {mode === "light" ? "Dark Mode" : "Light Mode"}
      </button>

      <h1
        style={{
          color: mode === "light" ? "#000" : "#fff",
        }}
      >
        Primer app
      </h1>

      <ThemeContext.Provider value={mode}>
        <Page />
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
