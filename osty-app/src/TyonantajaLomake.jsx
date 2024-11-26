import { useState } from "react";
import { db } from "./assets/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./App.css";

function TyonantajaForm({ resetForm }) {
  /*Kertoo missä kohtaa lomaketta ollaan menossa*/
  const [currentStep, setCurrentStep] = useState(1);
  
  const [nimi, setNimi] = useState("");
  const [toimiala, setToimiala] = useState("");

  /*Tänne tallennetaan kaikki käyttäjän valinnat string-muodossa*/
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  /*Kertoo käyttäjälle, että tietoja tallennetaan*/
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*Tarkistaa onko checkboc aktiivinen ja lisää sen arvon listaan*/
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    /*poistetaan isot alkukirjaimet*/
    const normalizedValue = value.toLowerCase();
    /*Joka kerta, kun käyttäjä laittaa checkboxin aktiiviseksi, se lisätään selectedKeywords listaan, ja kun käyttäjä ottaa ruksin pois, sen arvo poistetaan listasta*/
    setSelectedKeywords((prev) =>
      checked ? [...prev, normalizedValue] : prev.filter((item) => item !== normalizedValue)
    );
  };

  /*Määrittää mitä tapahtuu, kun painetaan Tallenna*/
  const handleSubmit = async (e) => {
    /*Estetään oletustapahtuma*/
    e.preventDefault();
    /*Kerrotaan käyttäjälle, että datansiirto aloitetaan, vaihtaa Tallenna-näppäimen tekstin muotoon Tallennetaan...*/
    setIsSubmitting(true);
    /* valmistellaan tietokantaan kirjoitettava data*/
    try {
      const newData = {
        nimi,
        toimiala,
        avainsanat: selectedKeywords,
      };

      /*Otetaan yhteys tietokantaan ja koitetaan kirjoittaa data tietokantaan*/
      await addDoc(collection(db, "Tyonantajat"), newData);
      /*Näyttää käyttäjälle ilmoituksen, että datansiirto onnistui*/
      alert("Työpaikkailmoitus tallennettu onnistuneesti!");
      /*Palautetaan kotinäkymä*/
      resetForm();

      /*Virhetilanteita varten*/
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Virhe tallennettaessa ilmoitusta.");
    } finally {
      /*Datansiirtotila otetaan pois päältä, kun data on siirretty*/
      setIsSubmitting(false);
    }
  };

  /*Työpaikkailmoituslomake*/

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <button className="takaisin-etusivulle" type="button" onClick={resetForm}>Takaisin etusivulle</button>
        {currentStep === 1 && (
          <div>
            <h2>Työpaikan tiedot</h2>
            <div>
              /*Laitetaan käyttäjän syöte Nimi-muuttujaan*/
              <label>Nimi:</label>
              <input className="tyonantaja-input" type="text" value={nimi} onChange={(e) => setNimi(e.target.value)} placeholder="Yrityksen nimi" required/>
            </div>
            <div>
              /*Laitetaan käyttäjän syöte Toimiala-muuttujaan*/
              <label>Toimiala:</label>
              <input className="tyonantaja-input" type="text" value={toimiala} onChange={(e) => setToimiala(e.target.value)} placeholder="Toimiala" required/>
            </div>

            /*Asetetaan seuraava vaihe, kun Seuraava-painiketta painetaan*/
            <button className="form-button" type="button" onClick={() => setCurrentStep(2)}>
              Jatka
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2>Mitä osaamista yrityksesi tarvitsisi?</h2>
            <label>
              <input type="checkbox" value="Ohjelmointi" onChange={handleCheckboxChange} /> Ohjelmointi
            </label>
            <label>
              <input type="checkbox" value="Vuorovaikutus" onChange={handleCheckboxChange} /> Vuorovaikutus
            </label>
            <label>
              <input type="checkbox" value="Tiimityöskentely" onChange={handleCheckboxChange} /> Tiimityöskentely
            </label>
            <label>
              <input type="checkbox" value="Luovuus" onChange={handleCheckboxChange} /> Luovuus
            </label>
            <label>
              <input type="checkbox" value="Sertifikaatit" onChange={handleCheckboxChange} /> Sertifikaatit
            </label>
            <div>
              <button className="form-button" type="button" onClick={() => setCurrentStep(1)}>
                Edellinen
              </button>
              <button className="form-button" type="button" onClick={() => setCurrentStep(3)}>
              Jatka
            </button>
            </div>
          </div>
        )}

{currentStep === 3 && (
          <div>
            <h2>Mitä mukautuksia yrityksesi pystyisi tarjoamaan työntekijälleen?</h2>
            <label><input type="checkbox" value="Etätyö" onChange={handleCheckboxChange} /> Etätyö</label>
            <label><input type="checkbox" value="Osapäiväisyys" onChange={handleCheckboxChange} /> Osapäiväisyys</label>
            <label><input type="checkbox" value="Hiljainen työympäristö" onChange={handleCheckboxChange} /> Hiljainen työympäristö</label>
            <label><input type="checkbox" value="Hyvä työergonomia" onChange={handleCheckboxChange} /> Hyvä työergonomia</label>
            <label><input type="checkbox" value="Rauhallinen työtahti" onChange={handleCheckboxChange} /> Rauhallinen työtahti</label>
            <div>
              <button className="form-button" type="button" onClick={() => setCurrentStep(2)}>
                Edellinen
              </button>
              <button className="form-button" type="button" onClick={() => setCurrentStep(4)}>
              Jatka
            </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2>Mitä sertifikaatteja toivoisit työnhakijalla olevan?</h2>
            <label><input type="checkbox" value="Google Digimarkkinointi" onChange={handleCheckboxChange} /> Google Digimarkkinointi</label>
            <label><input type="checkbox" value="MongoDB" onChange={handleCheckboxChange} /> MongoDB</label>
            <label><input type="checkbox" value="AWS" onChange={handleCheckboxChange} /> AWS</label>
            <label><input type="checkbox" value="Microsoft Power Automate" onChange={handleCheckboxChange} /> Microsoft Power Automate</label>
            <label><input type="checkbox" value="Linux" onChange={handleCheckboxChange} /> Linux</label>
            <div>
              <button className="form-button" type="button" onClick={() => setCurrentStep(3)}>
                Edellinen
              </button>
              <button className="form-button" type="button" onClick={() => setCurrentStep(5)}>
              Jatka
            </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2>Millaisia työsuhteita yrityksesi pystyy tarjoamaan?</h2>
            <label><input type="checkbox" value="Freelance" onChange={handleCheckboxChange} /> Freelance</label>
            <label><input type="checkbox" value="Keikkatyö" onChange={handleCheckboxChange} /> Keikkatyö</label>
            <label><input type="checkbox" value="Harjoittelu" onChange={handleCheckboxChange} /> Harjoittelu</label>
            <label><input type="checkbox" value="Vakituinen" onChange={handleCheckboxChange} /> Vakituinen</label>
            <label><input type="checkbox" value="Vuorotyö" onChange={handleCheckboxChange} /> Vuorotyö</label>
            <label><input type="checkbox" value="Kesätyö" onChange={handleCheckboxChange} /> Kesätyö</label>
            <label><input type="checkbox" value="Ilta- tai viikonlopputyö" onChange={handleCheckboxChange} /> Ilta- tai viikonlopputyö</label>
            <div>
              <button className="form-button" type="button" onClick={() => setCurrentStep(3)}>
                Edellinen
              </button>
              <button className="form-button" type="button" onClick={() => setCurrentStep(6)}>
              Jatka
            </button>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h2>Mitä yhteiskunnallisia arvoja yritykselläsi on?</h2>
            <label><input type="checkbox" value="Vastuulliset hankintaketjut" onChange={handleCheckboxChange} /> Vastuulliset hankintaketjut</label>
            <label><input type="checkbox" value="Avoin päätöksenteko" onChange={handleCheckboxChange} /> Avoin päätöksenteko</label>
            <label><input type="checkbox" value="Eettisyysraportointi" onChange={handleCheckboxChange} /> Eettisyysraportointi</label>
            <label><input type="checkbox" value="Oikeudenmukaisuus" onChange={handleCheckboxChange} /> Oikeudenmukaisuus</label>
            <label><input type="checkbox" value="Hyväntekeväisyys" onChange={handleCheckboxChange} /> Hyväntekeväisyys</label>
            <label><input type="checkbox" value="Toimialan kehittäminen" onChange={handleCheckboxChange} /> Toimialan kehittäminen</label>
            <div>
            <button className="form-button" type="button" onClick={() => setCurrentStep(5)}>
                Edellinen
              </button>
              
              /* Tallenna-näppäin tarkistaa onko isSubmitting true vai false, ja kun se on true (mikä vaihtuu kun handeSubmit menee päälle), painike menee pois käytöstä ja vaihtaa tekstiksi Tallennetaan*/
              <button className="form-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Tallennetaan..." : "Tallenna"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default TyonantajaForm;
