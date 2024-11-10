import { useState } from 'react'
import './App.css'

function tyonhakijaApp() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="main-container">
        <h1>Mitkä näistä kiinnostaisivat sinua?</h1>
        <form>
          <input type="checkbox">Ohjelmointi</input>
          <input type="checkbox">Vuorovaikutus</input>
          <input type="checkbox">Tiimityöskentely</input>
          <input type="checkbox">Luovuus</input>
          <input type="checkbox">Sertifikaatit</input>
          <button>Jatka</button>
        </form>
      </div>
    </>
  )
}

export default tyonhakijaApp;