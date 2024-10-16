import { useState } from 'react'
import './App.css'

function tyonhakijaApp() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="main-container">
        <h2>Olen...</h2>
        <div className="main-button-container"><button>Työnantaja</button></div>
        <div className="main-button-container"><button>Työnhakija</button></div>
      </div>
    </>
  )
}

export default App