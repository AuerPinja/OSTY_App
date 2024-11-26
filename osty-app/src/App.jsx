import { useState } from "react";
import "./App.css";
import TyonhakijaForm from "./TyonhakijaLomake";
import TyonantajaForm from "./TyonantajaLomake";

function App() {
  /* Muuttuja, jonka avulla voidaan vaihtaa näkymiä */
  const [currentView, setCurrentView] = useState("home");

  /* Vaihtaa näkymän työnhakijaan*/
  const handleTyonhakijaClick = () => {
    setCurrentView("tyonhakija");
  };

  
/*Vaihtaa näkymän työnantajaan*/
  const handleTyonantajaClick = () => {
    setCurrentView("tyonantaja");
  };

  /* Kirjoittaa työpaikkailmoituksen tietokantaan*/

  const handlePostJobClick = () => {
    setCurrentView("postJob");
  };

  /*Vaihtaa näkymän takaisin kotiin*/
  const goBackToHome = () => {
    setCurrentView("home");
  };

  /*Pääohjelma*/

  return (
    <div className="main-container">
      {currentView === "home" && (
        <>
          <h2>Olen...</h2>
          <div className="main-button-container">
            <button onClick={handleTyonantajaClick}>Työnantaja</button>
          </div>
          <div className="main-button-container">
            <button onClick={handleTyonhakijaClick}>Työnhakija</button>
          </div>
        </>
      )}

      {currentView === "tyonantaja" && (
        <>
          <div className="main-button-container-tyonantaja">
            <button onClick={handlePostJobClick}>Jätä uusi työpaikkailmoitus</button>
          </div>
          <button className="back-button" onClick={goBackToHome}>
            Takaisin etusivulle
          </button>
        </>
      )}

      {currentView === "postJob" && <TyonantajaForm resetForm={goBackToHome} />}

      {currentView === "tyonhakija" && <TyonhakijaForm resetForm={goBackToHome} />}
    </div>
  );
}

export default App;
