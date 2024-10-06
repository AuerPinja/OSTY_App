import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Olen...</h1>
        <button>Työnantaja</button>
        <button>Työnhakija</button>
      </div>
    </>
  )
}

export default App
