import "./App.css";
import { useState } from "react";

interface Game {
  external: string;
  thumb: string;
  cheapest: string;
}

function longTitle(title: string) {
  const limitCharacter = 40;
  if (title.length > limitCharacter) {
    return title.slice(0, limitCharacter) + "...";
  }
  return title;
}

export default function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState<Game[]>([]);

  const videogameApiLink = `https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`;

  const searchGame = () => {
    fetch(videogameApiLink)
      .then((response) => response.json())
      .then((data) => {
        setSearchedGames(data);
      });
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
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              return searchGame();
            }
          }}
        />
        <button onClick={searchGame}>Search Game Title</button>
        <div className="searchedGames">
          {searchedGames.map((game, key) => {
            return (
              <div className="games" key={key}>
                <h3>{longTitle(game.external)}</h3>
                <img src={game.thumb} />
                <p>{game.cheapest}$</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>Latest Deals 🔥</h1>
      </div>
    </div>
  );
}
