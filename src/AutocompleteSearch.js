import React, { useState, useEffect } from "react";

const AutocompleteSearch = ({ data }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    filterOptions(e.target.value);
  };

  const filterOptions = (value) => {
    const filtered = Object.keys(data).reduce((acc, country) => {
      const states = Object.keys(data[country]);
      const filteredStates = states.filter((state) =>
        state.toLowerCase().includes(value.toLowerCase())
      );
      if (filteredStates.length > 0) {
        acc.push({ country, states: filteredStates });
      }
      return acc;
    }, []);
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (country, state) => {
    setSelectedCountry(country);
    setInputValue("");
    setSelectedOptions([...selectedOptions, state]);
  };

  const handleSelectedOptionRemove = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(index, 1);
    setSelectedOptions(newSelectedOptions);

  };
  useEffect(() => {
    if (selectedOptions.length === 0) {
      setSelectedCountry("");

    }
  }, [selectedOptions])
  return (
    <div>
      <div style={{ border: "2px solid" }}>
        {selectedOptions.map((option, index) => (
          <span key={index}>
            {option}{" "}
            <button onClick={() => handleSelectedOptionRemove(index)}>x</button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
          style={{ border: "none" }}
        />
      </div>
      {inputValue && (
        <div>
          {filteredOptions.map((item, index) => {
            if (item.country === selectedCountry || selectedCountry === "") {
              return (
                <div key={index}>
                  <h4>{item.country}</h4>

                  {item.states.map((state, i) => (
                    <p key={i} onClick={() => handleOptionClick(item.country, state)}>
                      {state}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
