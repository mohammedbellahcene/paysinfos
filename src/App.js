
import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
const App = () => {
  
  
  const url = "https://restcountries.com/v3.1/all";

  // ce state contiendra toutes les data récupérees par l'appel axios
  
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [onmodal, setOnmodal] = useState(false)
  const [position, setPosition] = useState(-1)
  const [term, setTerm] = useState("");



  // * * * * * * * ASYNC / AWAIT * * * * * * *
  // on définit la fonction fetchData comme ASYNCHRONE avec le mot reservé async.
  // ça signifie qu'elle contient à l'intérieur des instructions qui prennent beaucoup de temps, des instructions qui "vivent leur vie". Typiquement : une requete http (un appel à une api) dont on attend la réponse ( cela peut prendre plusieurs secondes si notre internet est lent). Autre exemple typique : consultation d'une base de données.
  // Pour dire au moteur javascript de stopper le cours des executions tant qu'on a pas reçu la réponse, on met AWAIT devant l'instruction d'appel.
  // On ne peut utiliser AWAIT QUE DANS UNE FONCTION DECLAREE AVEC ASYNC
  const fetchData = async () => {
    const response = await axios.get(
      url
    );

    console.log(
      "DATAS RECUPEREES APRES ATTENTE DU AWAIT:",
      response.data);
    setData(response.data.sort((a,b)=>a.name.common.localeCompare(b.name.common)));

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
      
      <div className="pagination">
        <h1><span className="globe">🌏</span>Pays infos</h1>
        
        
        <input  type="text"  value={term} class="search" placeholder="rechercher un pays &#128269; " onChange={event => {
          
          setTerm(event.target.value);
          console.log(term);
          setPage(1);
        }} ></input>
      </div>
      <div className="pagenumber">
          <button onClick={() => !(page < 2) && setPage(page - 1)} >&lt;</button>
          <span>{page}</span>
          
          <button onClick={() => !(page > 62) && setPage(page + 1)}>&gt;</button>
        </div>

      <div onClick={() => { setOnmodal(false) }} className={onmodal ? "on" : "off"} >
        <span className="close" onClick={() => { setOnmodal(false) }}>X</span>
        <div className="modalimagecontainer">
          <img src={!(position === -1) &&  data[position].flags.png} alt="" />
        </div>
        <span className="pays">{!(position === -1) && data[position].name.common}</span>
        <span className="pays">Capital : {!(position === -1) && data[position].capital}</span>
        <span className="pays">Region : {!(position === -1) && data[position].region}</span>
        <span className="pays">Area : {!(position === -1) && data[position].area} Km2</span>
        <span className="pays">Population : {!(position === -1) && data[position].population} habitants </span>
        <span className="pays">CountryCode : {!(position === -1) && data[position].cca2}  </span>
        
        <a href={!(position === -1) && data[position].maps.googleMaps} target="_blank"  >{!(position === -1) && data[position].maps.googleMaps}</a>
        

        
        
      </div>
        

      <div className="container">



        {/* Cette ternaire nous permet de n'afficher data QUE si il est rempli.
      Donc au chargement de la page, pendant 0.5 secondes d'attente de retour de l'appel axios, on affiche "en attente". En bonus, affichez une roue de chargement `a la place de ce "EN ATTENTE" */}
        {data
          ? data.filter(data=>data.name.common.toLowerCase().includes(term.toLowerCase())).slice(4*page-4,4*page).map((pays, i) => {
            // ne pas oublier d'associer une key à chaque element, meme si ça semble ne pas nous etre utile, sinon react nous sort un warning
            // i représente la position du film courant dans le tableau

            return <div key={i} className="cardpays" onClick={() => { setOnmodal(true); data.filter(data=>data.name.common.includes(term))? setPosition(data.indexOf(pays)): setPosition(i+(page*4-4)) }} >

              
              <div className="pays_flags"><img src={pays.flags.png} alt="" /></div>
              <div className="pays_name">{pays.name.common} </div>
               

              


              



            </div>;

          })
          : "EN ATTENTE"}
          
      </div>
    </div>

  );
};

export default App;
