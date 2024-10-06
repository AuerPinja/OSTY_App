import { useState } from 'react'
import './header.css'

function Header() {
  const [count, setCount] = useState(0)

  return (
    <>
     <header>
        <h1 className="header-logo">OSTY</h1>
     </header>
    </>
  )
}

export default Header