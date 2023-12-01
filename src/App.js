import "./App.css";
import { getCurrencies } from "./services/api";
import { useState, useEffect } from "react";
import Converter from "./components/Converter/Converter";

function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const currenciesData = await getCurrencies();
        setCurrencies(currenciesData);
      } catch (error) {
        console.log("error");
      }
    }
    fetchData();
  }, []);

  const filteredCurrencies = currencies.filter(
    (item) => item.cc === "EUR" || item.cc === "USD"
  );

  return (
    <div>
      <div className="header">
        {filteredCurrencies.map(({ r030, cc, rate }) => (
          <div key={r030}>
            <p className="header__currencies">
              {cc} <span>{rate.toFixed(2)}</span>
            </p>
          </div>
        ))}
      </div>
      <Converter currencies={currencies} />
    </div>
  );
}

export default App;
