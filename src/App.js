import "./App.css";
import Loader from "./loader/Loader.js";
import DenseAppBar from "./statusbar/Statusbar.js";
import CharacterPanel from "./character/character.js";
import React, { useState, useEffect } from "react";

// test loading screen
const DelayedMessage = () => {
  const [loader, setLoader] = useState("");

  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    setLoader(<Loader />);
    const timeoutId = setTimeout(() => {
      setLoader();
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

  return <div>{loader}</div>;
};

function App() {
  return (
    <div className="App">
      <DenseAppBar />
      <div className="bodyDiv">
        <CharacterPanel />
      </div>
    </div>
  );
}

export default App;
