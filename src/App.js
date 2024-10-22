import "./App.css";
import DenseAppBar from "./statusbar/Statusbar.js";
import CharacterPanel from "./character/Character.js";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
