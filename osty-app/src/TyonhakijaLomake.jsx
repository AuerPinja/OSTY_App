import { useState } from 'react';
import { fetchData } from './fetchedData';
import Results from './fetchedData';
import './App.css';

function TyonhakijaForm({resetForm}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [results, setResults] = useState(null);

  const nextStep = () => setCurrentStep(prevStep => prevStep + 1);
  const prevStep = () => setCurrentStep(prevStep => prevStep - 1);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const normalizedValue = value.toLowerCase(); // Normalize to lowercase
    setSelectedKeywords(prev =>
      checked ? [...prev, normalizedValue] : prev.filter(item => item !== normalizedValue)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchData(selectedKeywords); // Pass selected keywords
      setResults(data); 
      setCurrentStep(6); // Move to results step
    } catch (error) {
      console.error("Tapahtui virhe:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <button className="takaisin-etusivulle" type="button" onClick={resetForm}>Takaisin etusivulle</button>
        {currentStep === 1 && (
          <div>
            <h2>Mitkä näistä kiinnostavat sinua?</h2>
            <label><input type="checkbox" value="Ohjelmointi" onChange={handleCheckboxChange} /> Ohjelmointi</label>
            <label><input type="checkbox" value="Vuorovaikutus" onChange={handleCheckboxChange} /> Vuorovaikutus</label>
            <label><input type="checkbox" value="Tiimityöskentely" onChange={handleCheckboxChange} /> Tiimityöskentely</label>
            <label><input type="checkbox" value="Luovuus" onChange={handleCheckboxChange} /> Luovuus</label>
            <label><input type="checkbox" value="Sertifikaatit" onChange={handleCheckboxChange} /> Sertifikaatit</label>
            <button className="form-button" type="button" onClick={nextStep}>Jatka</button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2>Mitkä näistä voisivat auttaa sinua menestymään työssäsi?</h2>
            <label><input type="checkbox" value="Etätyö" onChange={handleCheckboxChange} /> Etätyö</label>
            <label><input type="checkbox" value="Osapäiväisyys" onChange={handleCheckboxChange} /> Osapäiväisyys</label>
            <label><input type="checkbox" value="Hiljainen työympäristö" onChange={handleCheckboxChange} /> Hiljainen työympäristö</label>
            <label><input type="checkbox" value="Hyvä työergonomia" onChange={handleCheckboxChange} /> Hyvä työergonomia</label>
            <label><input type="checkbox" value="Rauhallinen työtahti" onChange={handleCheckboxChange} /> Rauhallinen työtahti</label>
            <div>
              <button className="form-button" type="button" onClick={prevStep}>Edellinen</button>
              <button className="form-button" type="button" onClick={nextStep}>Jatka</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2>Mitä sertifikaatteja sinulla on?</h2>
            <label><input type="checkbox" value="Google Digimarkkinointi" onChange={handleCheckboxChange} /> Google Digimarkkinointi</label>
            <label><input type="checkbox" value="MongoDB" onChange={handleCheckboxChange} /> MongoDB</label>
            <label><input type="checkbox" value="AWS" onChange={handleCheckboxChange} /> AWS</label>
            <label><input type="checkbox" value="Microsoft Power Automate" onChange={handleCheckboxChange} /> Microsoft Power Automate</label>
            <label><input type="checkbox" value="Linux" onChange={handleCheckboxChange} /> Linux</label>
            <div>
              <button className="form-button" type="button" onClick={prevStep}>Edellinen</button>
              <button className="form-button" type="button" onClick={nextStep}>Jatka</button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2>Minkätyyppistä työtä etsit?</h2>
            <label><input type="checkbox" value="Freelance" onChange={handleCheckboxChange} /> Freelance</label>
            <label><input type="checkbox" value="Keikkatyö" onChange={handleCheckboxChange} /> Keikkatyö</label>
            <label><input type="checkbox" value="Harjoittelu" onChange={handleCheckboxChange} /> Harjoittelu</label>
            <label><input type="checkbox" value="Vakituinen" onChange={handleCheckboxChange} /> Vakituinen</label>
            <label><input type="checkbox" value="Vuorotyö" onChange={handleCheckboxChange} /> Vuorotyö</label>
            <label><input type="checkbox" value="Kesätyö" onChange={handleCheckboxChange} /> Kesätyö</label>
            <label><input type="checkbox" value="Ilta- tai viikonlopputyö" onChange={handleCheckboxChange} /> Ilta- tai viikonlopputyö</label>
            <div>
              <button className="form-button" type="button" onClick={prevStep}>Edellinen</button>
              <button className="form-button" type="button" onClick={nextStep}>Jatka</button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2>Mitä yheiskunnallisia arvoja toivoisit tulevalta työpaikaltasi?</h2>
            <label><input type="checkbox" value="Vastuulliset hankintaketjut" onChange={handleCheckboxChange} /> Vastuulliset hankintaketjut</label>
            <label><input type="checkbox" value="Avoin päätöksenteko" onChange={handleCheckboxChange} /> Avoin päätöksenteko</label>
            <label><input type="checkbox" value="Eettisyysraportointi" onChange={handleCheckboxChange} /> Eettisyysraportointi</label>
            <label><input type="checkbox" value="Oikeudenmukaisuus" onChange={handleCheckboxChange} /> Oikeudenmukaisuus</label>
            <label><input type="checkbox" value="Hyväntekeväisyys" onChange={handleCheckboxChange} /> Hyväntekeväisyys</label>
            <label><input type="checkbox" value="Toimialan kehittäminen" onChange={handleCheckboxChange} /> Toimialan kehittäminen</label>
            <div>
              <button className="form-button" type="button" onClick={prevStep}>Edellinen</button>
              <button className="form-button" type="submit">Näytä tulokset</button>
            </div>
          </div>
        )}

        {currentStep === 6 && results && (
          <div>
            
            <Results data={results} />
          </div>
        )}
        
      </form>
    </div>
  );
}

export default TyonhakijaForm;

