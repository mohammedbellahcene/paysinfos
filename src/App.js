
import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
const App = () => {
  // ce state contiendra toutes les data récupérees par l'appel axios
  //const url2 = "https://api-allocine.herokuapp.com/api/movies/popular";
  const url1 = "https://restcountries.com/v3.1/all";
  //const url3 = "https://api-allocine.herokuapp.com/api/movies/top_rated";
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  //const [url, setUrl] = useState(url1);
  const [onmodal, setOnmodal] = useState(false)
  const [position, setPosition] = useState(-1)
 



  // * * * * * * * ASYNC / AWAIT * * * * * * *
  // on définit la fonction fetchData comme ASYNCHRONE avec le mot reservé async.
  // ça signifie qu'elle contient à l'intérieur des instructions qui prennent beaucoup de temps, des instructions qui "vivent leur vie". Typiquement : une requete http (un appel à une api) dont on attend la réponse ( cela peut prendre plusieurs secondes si notre internet est lent). Autre exemple typique : consultation d'une base de données.
  // Pour dire au moteur javascript de stopper le cours des executions tant qu'on a pas reçu la réponse, on met AWAIT devant l'instruction d'appel.
  // On ne peut utiliser AWAIT QUE DANS UNE FONCTION DECLAREE AVEC ASYNC
  const fetchData = async () => {
    const response = await axios.get(
      url1
    );

    console.log(
      "DATAS RECUPEREES APRES ATTENTE DU AWAIT:",
      response.data);
    setData(response.data);

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
    <div className="pageprincipal">
      bonjour le monde
      <div className="pagination">

        <button onClick={() => !(page > 62) && setPage(page + 1)}>+</button>
        <span>{page}</span>
        <button onClick={() => !(page < 2) && setPage(page - 1)} >-</button>
      </div>

      <div onClick={() => { setOnmodal(false) }} className={onmodal ? "on" : "off"} >
        <span className="close" onClick={() => { setOnmodal(false) }}>X</span>
        <div className="modalimagecontainer">
          <img src={!(position === -1) &&  data[position].flags.png} alt="" />
        </div>
        <span className="titre">{!(position === -1) && data[position].name.common}</span>
        <span className="titre">Capital : {!(position === -1) && data[position].capital}</span>
        <span className="titre">Region : {!(position === -1) && data[position].region}</span>
        <span className="titre">Area : {!(position === -1) && data[position].area} Km2</span>
        <span className="titre">Population : {!(position === -1) && data[position].population} habitants </span>
        
        <a href={!(position === -1) && data[position].maps.googleMaps} target="" >{!(position === -1) && data[position].maps.googleMaps}</a>
        

        
        
      </div>
        

      <div className="container">



        {/* Cette ternaire nous permet de n'afficher data QUE si il est rempli.
      Donc au chargement de la page, pendant 0.5 secondes d'attente de retour de l'appel axios, on affiche "en attente". En bonus, affichez une roue de chargement `a la place de ce "EN ATTENTE" */}
        {data
          ? data.slice(4*page-4,4*page).map((pays, i) => {
            // ne pas oublier d'associer une key à chaque element, meme si ça semble ne pas nous etre utile, sinon react nous sort un warning
            // i représente la position du film courant dans le tableau

            return <div key={i} className="cardfilm" onClick={() => { setOnmodal(true); setPosition(i+(page*4-4)) }} >

              
              <div className="poster_path"><img src={pays.flags.png} alt="" /></div>
              <div className="original_title">{pays.name.common}{ pays.maps.googleMaps } </div>
               

              


              



            </div>;

          })
          : "EN ATTENTE"}
          
      </div>
    </div>

  );
};

export default App;
