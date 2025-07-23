import { useState } from "react";
import FacialExpression from "./components/FacialExpression";
import "./App.css";
import MoodSongs from "./components/MoodSongs";

function App() {
  const [Songs, setSongs] = useState([]);
  

  return (
    <div className="page">
      <h1 className="main-heading">🎶 Emotion-Based Music Recommender</h1>
      <p className="sub-heading">Let your expressions pick the playlist</p>
      <div className="card-container">
        <FacialExpression setSongs={setSongs} />
        
      </div>

      <div className="card-container">
        <MoodSongs Songs={Songs} />
      </div>
    </div>
  );
}

export default App;
