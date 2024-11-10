import { db } from "./assets/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

export const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "Tyonantajat"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

function Results({ data }) {
  return (
    <div className="card-container">
      {data.map(item => (
        <div className="card" key={item.id}>
          <div className="card-content">
            <div className="heart-icon"><a href="#">&#10084;</a></div>
            {item.nimi && <h2 className="card-title">{item.nimi}</h2>}
            {item.toimiala && <h4 className="card-subtitle">{item.toimiala}</h4>}
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
  );
}

export default Results;

