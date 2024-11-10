import { useState } from 'react';
import './App.css';
import TyonhakijaForm from './TyonhakijaForm'; 

function App() {
  const [showTyonhakija, setShowTyonhakija] = useState(false); 

  const handleTyonhakijaClick = () => {
    setShowTyonhakija(true); 
  };

  return (
    <>
      <div className="main-container">
        {showTyonhakija ? (
          <TyonhakijaForm /> 
        ) : (
          <>
            <h2>Olen...</h2>
            <div className="main-button-container">
              <button>Työnantaja</button>
            </div>
            <div className="main-button-container">
              <button onClick={handleTyonhakijaClick}>Työnhakija</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;