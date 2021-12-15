import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  // ce state contiendra toutes les data récupérees par l'appel axios
  const [data, setData] = useState(null);

  // * * * * * * * ASYNC / AWAIT * * * * * * *
  // on définit la fonction fetchData comme ASYNCHRONE avec le mot reservé async.
  // ça signifie qu'elle contient à l'intérieur des instructions qui prennent beaucoup de temps, des instructions qui "vivent leur vie". Typiquement : une requete http (un appel à une api) dont on attend la réponse ( cela peut prendre plusieurs secondes si notre internet est lent). Autre exemple typique : consultation d'une base de données.
  // Pour dire au moteur javascript de stopper le cours des executions tant qu'on a pas reçu la réponse, on met AWAIT devant l'instruction d'appel.
  // On ne peut utiliser AWAIT QUE DANS UNE FONCTION DECLAREE AVEC ASYNC
  const fetchData = async () => {
    const response = await axios.get(
      "https://api-allocine.herokuapp.com/api/movies/upcoming"
    );
    console.log(
      "DATAS RECUPEREES APRES ATTENTE DU AWAIT:",
      response.data.results
    );
    setData(response.data.results);
  };

  // * * * * * * * USEEFFECT  * * * * * * *
  // useEffect est un hooks fourni par react qui contient 2 arguements : UNE FONCTION A EXECUTER, et UN TABLEAU.
  // Si le tableau est vide, la fonction ne sera executée que 1 fois au chargement. Et donc qu'elle ne soit pas ré éxécutée à chaque rechargement du à une mise à jour de tous les states créés dans la page
  // on peut remplir le tableau avec states. dans ce cas, la fonction sera éxécutée au chargement ET à chaque mise à jour de ce(s) state(s)

  // Ici on a besoin de useEffect pour nous eviter de tomber dans une boucle infinie qui ferait
  // fetchData() => mise A jour du state data => rechargement de la page => fetchData() => mise A jour du state data => rechargement de la page etc ... etc ...
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ fontSize: "30px" }}>
      BONJOUR
      <span>PAGE</span>
      {/* Cette ternaire nous permet de n'afficher data QUE si il est rempli.
      Donc au chargement de la page, pendant 0.5 secondes d'attente de retour de l'appel axios, on affiche "en attente". En bonus, affichez une roue de chargement `a la place de ce "EN ATTENTE" */}
      {data
        ? data.map((film, i) => {
            // ne pas oublier d'associer une key à chaque element, meme si ça semble ne pas nous etre utile, sinon react nous sort un warning
            // i représente la position du film courant dans le tableau
            return <div key={i}>{film.original_title}</div>;
          })
        : "EN ATTENTE"}
    </div>
  );
};

export default App;
