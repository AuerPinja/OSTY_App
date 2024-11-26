import { useState } from 'react';
import { fetchData } from './fetchedData';
import Results from './fetchedData';
import './App.css';

function TyonhakijaForm({resetForm}) {

  /*Kertoo missä vaiheessa lomaketta mennään*/
  const [currentStep, setCurrentStep] = useState(1);

  /*Tänne tallennetaan käyttäjän lomakevalinnat*/
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  /*Tänne asetetaan tietokannasta haettu ja suodatettu data*/
  const [results, setResults] = useState(null);

  
/*Näiden muuttujien avulla käyttäjä ohjaa lomakkeen kulkua*/
  const nextStep = () => setCurrentStep(prevStep => prevStep + 1);
  const prevStep = () => setCurrentStep(prevStep => prevStep - 1);

  /*Hallitsee valintaruutujen toimintaa*/
  const handleCheckboxChange = (e) => {
    /*Laitetaan valittu valintaruutu omaan muuttujaansa*/
    const { value, checked } = e.target;
    /*muuntaa valintaruudun arvon kirjaimet pieniksi*/
    const normalizedValue = value.toLowerCase(); 
    /*Tarkistetaan onko valintaruudun arvoa jo olemassa listassa. jos ei ole, se lisätään listaan, ja jos on, niin se poistetaan listasta*/
    setSelectedKeywords(prev =>
      checked ? [...prev, normalizedValue] : prev.filter(item => item !== normalizedValue)
    );
  };

  
  /*Näytä tulokset- painikkeen hallinta*/
  const handleSubmit = async (e) => {
    /*Estetään oletustapahtuma*/
    e.preventDefault();
    /*Viedään selectedKeywords-lista fetchedData-luokkaan, ja samalla haetaan tietokanta sieltä*/
    try {
      const data = await fetchData(selectedKeywords);
      /*Laitetaan haettu data results-muuttujaan*/
      setResults(data); 
      /*Laitetaan tulokset näkymään omana näkymänään*/
      setCurrentStep(6); 
      /*Virheentarkistus*/
    } catch (error) {
      console.error("Tapahtui virhe:", error);
    }
  };

  /*Työnhakulomale*/

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

