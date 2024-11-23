import { db } from "./assets/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import './App.css';
import React, { useState } from 'react';

export const fetchData = async (selectedKeywords = []) => {
  const querySnapshot = await getDocs(collection(db, "Tyonantajat"));
  const matchResults = [];

  querySnapshot.docs.forEach(doc => {
    const data = doc.data();
    const avainsana = (data.avainsanat || []).map(keyword => keyword.toLowerCase());
    const matches = avainsana.filter(keyword => selectedKeywords.includes(keyword));
    const matchPercentage = selectedKeywords.length > 0 ? Math.floor((matches.length / selectedKeywords.length) * 100) : 0;

    matchResults.push({
      id: doc.id,
      ...data,
      matchPercentage: matchPercentage, 
    });
  });


  const filteredResults = matchResults.filter(item => item.matchPercentage > 0);


  filteredResults.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return filteredResults;
};

function Results({ data }) {
  const [clickedHearts, setClickedHearts] = useState({}); // Tracks which hearts are clicked

  const handleHeartClick = (id) => {
    const isConfirmed = window.confirm("Haluatko lähettää hakemuksen tähän yritykseen?");
    if (isConfirmed) {
      setClickedHearts((prev) => ({
        ...prev,
        [id]: true, // Mark the heart for this id as clicked
      }));
    }
  };

  return (
    <div className="card-container">
      {data.map(item => (
        <div className="card" key={item.id}>
          <div className="card-content">
            <div
              className={`heart-icon ${clickedHearts[item.id] ? 'clicked' : ''}`} 
              onClick={() => handleHeartClick(item.id)}
            >
              <a href="#" style={{ color: clickedHearts[item.id] ? 'red' : 'black' }}>
                &#10084;
              </a>
            </div>

            {item.nimi && <h2 className="card-title">{item.nimi}</h2>}

            {Object.keys(item).map(key => (
              Array.isArray(item[key]) && key !== 'toimiala' && (
                <div key={key} className="tags-container">
                  {item[key].map((arrayItem, index) => (
                    <span key={index} className="array-item">{arrayItem}</span>
                  ))}
                </div>
              )
            ))}

            {Object.keys(item).map(key => (
              key !== 'id' && key !== 'nimi' && key !== 'toimiala' && key !== 'matchPercentage' && !Array.isArray(item[key]) && (
                <div key={key}>
                  <strong>{key}:</strong> <span>{item[key]}</span>
                </div>
              )
            ))}

            {item.matchPercentage && (
              <div>
                <span className="match-percentage">{item.matchPercentage}% Match</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Results;