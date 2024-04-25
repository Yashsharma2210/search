import "./styles.css";
import AutocompleteSearch from "./AutocompleteSearch";
import jsonData from "./data.json";
export default function App() {
  return (
    <div className="App">
      <h1>Autocomplete Search</h1>
      <AutocompleteSearch data={jsonData} />
    </div>
  );
}
