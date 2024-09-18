import "./App.css";
import { useState } from "react";

export default function App() {
  const [gameTitle, setGameTitle] = useState("");

  const videogameApiLink =
    "https://www.cheapshark.com/api/1.0/games?title=batman";

  const searchGame = () => {
    fetch(videogameApiLink).then((response) =>
      response.json().then((data) => console.log(data))
    );
  };

  return (
    <div className="app">
      <div className="searchSection">
        <h1>Search For A Game</h1>
        <input
          type="text"
          placeholder="World of Warcraft..."
          onChange={(event) => {
            setGameTitle(event.target.value);
          }}
        />
        <button onClick={searchGame}>Search Game Title</button>
      </div>
      <div className="dealsSection">
        <h1>Latest Deals 🔥</h1>
      </div>
    </div>
  );
}
