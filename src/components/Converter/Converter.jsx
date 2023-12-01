import { useState, useEffect } from "react";
import "./Converter.css";

const Converter = ({ currencies }) => {
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);
  const [selectedValueFirst, setSelectedValueFirst] = useState("UAH");
  const [selectedValueSecond, setSelectedValueSecond] = useState("USD");

  // I get all currencies from UAH, and need to add UAH with a value -> 1 into array
  const allCurrencies = [{ rate: 1, cc: "UAH", r030: 10 }, ...currencies];

  const findCurrencyRate = (cc) => {
    const currency = allCurrencies.find((c) => c.cc === cc);
    return currency ? currency.rate : 1;
  };

  const calculateOutput = (input, fromRate, toRate) =>
    input * (fromRate / toRate).toFixed(2);

  const handleChange = (exchange) => (e) => {
    const inputValue = Number(e.target.value);
    const firstCurrencyRate = findCurrencyRate(selectedValueFirst);
    const secondCurrencyRate = findCurrencyRate(selectedValueSecond);

    if (inputValue >= 0) {
      if (exchange === "from") {
        setInputValue(inputValue);
        setOutputValue(
          calculateOutput(inputValue, firstCurrencyRate, secondCurrencyRate)
        );
      }
      if (exchange === "to") {
        setOutputValue(inputValue);
        setInputValue(
          calculateOutput(inputValue, secondCurrencyRate, firstCurrencyRate)
        );
      }
    }
  };

  useEffect(() => {
    handleChange("from")({ target: { value: inputValue } });
    // eslint-disable-next-line
  }, [selectedValueFirst, selectedValueSecond]);

  return (
    <div className="converter">
      <div className="converter__box">
        <input
          className="converter__input"
          type="text"
          value={inputValue}
          onChange={handleChange("from")}
        />
        <select
          className="converter__select"
          onChange={(e) => {
            setSelectedValueFirst(e.target.value);
            handleChange("from")(e);
          }}
          value={selectedValueFirst}
        >
          {allCurrencies.map((item) => (
            <option value={item.cc} key={item.r030}>
              {item.cc}
            </option>
          ))}
        </select>
      </div>
      <div className="converter__box">
        <input
          className="converter__input"
          type="text"
          value={outputValue}
          onChange={handleChange("to")}
        />
        <select
          className="converter__select"
          value={selectedValueSecond}
          onChange={(e) => {
            setSelectedValueSecond(e.target.value);
            handleChange("to")(e);
          }}
        >
          {allCurrencies.map((item) => (
            <option value={item.cc} key={item.r030}>
              {item.cc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Converter;
