import { useState } from 'react'
import './App.css'
import {db} from "./assets/firebase.js";
import {getDocs,collection} from "firebase/firestore"

function App() {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    // Fetch data from Firestore
    const querySnapshot = await getDocs(collection(db, "Tyonantajat"));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Update state with the fetched data
    setData(items);
  };

  return (
    <>
      <div className="main-container">
        <h2>Olen...</h2>
        <div className="main-button-container"><button>Työnantaja</button></div>
        <div className="main-button-container"><button>Työnhakija</button></div>
        <div className="main-button-container"><button onClick={fetchData}>Näytä tulokset</button></div>

        <div className="card-container">
  {data.map(item => (
    <div className="card" key={item.id}>
      <div className="card-content">
        <div className="heart-icon"><a href="#">&#10084;</a></div>
        {item.nimi && (
          <h2 className="card-title">{item.nimi}</h2>
        )}

        {item.toimiala && (
          <h4 className="card-subtitle">{item.toimiala}</h4>
        )}

        {Object.keys(item).map(key => (
          Array.isArray(item[key]) && (
            <div key={key} className="tags-container">
              {item[key].map((arrayItem, index) => (
                <span key={index} className="array-item">{arrayItem}</span>
              ))}
            </div>
          )
        ))}

        {Object.keys(item).map(key => (
          key !== 'id' && key !== 'nimi' && key !== 'toimiala' && !Array.isArray(item[key]) && (
            <div key={key}>
              <strong>{key}:</strong> <span>{item[key]}</span>
            </div>
          )
        ))}
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  )
}

export default App;