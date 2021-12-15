import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  let response = "hello";

  const fetchData = async () => {
    response = await axios.get(
      "https://api-allocine.herokuapp.com/api/movies/upcoming"
    );
    // ATTENTE
    // ICI REPONSE EST BIEN REMPLI
  };

  fetchData();

  console.log("LA REPONSE SANS ATTENTE", response);

  return (
    <div>
      BONJOUR
      {response}
    </div>
  );
}

export default App;
