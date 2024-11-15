import "./App.css";
import DenseAppBar from "./statusbar/Statusbar.js";
import CharacterPanel from "./character/character.js";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (query) {
      try {
        const response = await fetch("http://127.0.0.1:8080/getRaiderIOData");
        const data = await response.json();
        setSearchResults(data);
        console.log(data);
      } catch (error) {
        console.error("Error while retrieving character data:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="App">
      <DenseAppBar onKeyUp={handleSearch}/>
      <div className="bodyDiv">
        <CharacterPanel data={searchResults}/>
      </div>
    </div>
  );
}

export default App;
