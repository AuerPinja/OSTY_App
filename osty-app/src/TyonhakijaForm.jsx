import { useState } from 'react';
import { fetchData } from './fetchedData'; 
import Results from './fetchedData'; 
import './App.css';

function TyonhakijaForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const nextStep = () => setCurrentStep(prevStep => prevStep + 1);
  const prevStep = () => setCurrentStep(prevStep => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const data = await fetchData(); 
      console.log("Fetched data:", data); 
      setResults(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div>
            <h2>Mitkä näistä kiinnostavat sinua?</h2>
            <label><input type="checkbox" /> Ohjelmointi</label>
            <label><input type="checkbox" /> Vuorovaikutus</label>
            <label><input type="checkbox" /> Tiimityöskentely</label>
            <label><input type="checkbox" /> Luovuus</label>
            <label><input type="checkbox" /> Sertifikaatit</label>
            <button className="form-button" type="button" onClick={nextStep}>Jatka</button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2>Mitkä näistä voisivat auttaa sinua menestymään työssäsi?</h2>
            <label><input type="checkbox" /> Etätyö</label>
            <label><input type="checkbox" /> Osapäiväisyys</label>
            <label><input type="checkbox" /> Hiljainen työympäristö</label>
            <label><input type="checkbox" /> Työergonomiaan vaikuttaminen</label>
            <label><input type="checkbox" /> Rauhallinen työtahti</label>
            <div>
              <button className="form-button" type="button" onClick={prevStep}>Edellinen</button>
              <button className="form-button" type="button" onClick={nextStep}>Jatka</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2>Mitä sertifikaatteja sinulla on?</h2>
            <label><input type="checkbox" /> Google Digimarkkinointi</label>
            <label><input type="checkbox" /> MongoDB</label>
            <label><input type="checkbox" /> AWS</label>
            <label><input type="checkbox" /> Microsoft Power Automate</label>
            <label><input type="checkbox" /> Linux</label>
            <div>
              <button className="form-button" type="button" onClick={prevStep}>Edellinen</button>
              <button className="form-button" type="button" onClick={nextStep}>Jatka</button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2>Minkätyyppistä työtä etsit?</h2>
            <label><input type="checkbox" /> Freelance</label>
            <label><input type="checkbox" /> Keikkatyö</label>
            <label><input type="checkbox" /> Harjoittelu</label>
            <label><input type="checkbox" /> Vakituinen</label>
            <label><input type="checkbox" /> Vuorotyö</label>
            <label><input type="checkbox" /> Kesätyö</label>
            <label><input type="checkbox" /> Ilta- tai viikonlopputyö</label>
            <div>
              <button className="form-button" type="button" onClick={prevStep}>Edellinen</button>
              <button className="form-button" type="submit">Näytä tulokset</button>
            </div>
          </div>
        )}
        
      </form>

      {results && (
        <div>
        <Results data={results} />
        </div>
      )}
    </div>
  );
}

export default TyonhakijaForm;
