import "./App.css";
import { useState } from "react";
import useSWR from "swr";

interface Game {
  external: string;
  thumb: string;
  cheapest: string;
}

interface Deal {
  title: string;
  thumb: string;
  normalPrice: string;
  salePrice: string;
  savings: string;
}

function longTitle(title: string, limitCharacter = 30) {
  if (title.length > limitCharacter) {
    return title.slice(0, limitCharacter) + "...";
  }
  return title;
}

const fetcher = async (url: string): Promise<Deal[]> => {
  const res = await fetch(url);
  return res.json();

  // return fetch(url).then((res) => res.json());
};

export default function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState<Game[]>([]);

  const { data, error, isLoading } = useSWR(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3",
    fetcher
  );

  const videogameApiLink = `https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`;

  const searchGame = () => {
    fetch(videogameApiLink)
      .then((response) => response.json())
      .then((data) => {
        setSearchedGames(data);
      });
  };

  /*const lastDealsLink = `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`;

  useEffect(() => {
    fetch(lastDealsLink)
      .then((response) => response.json())
      .then((data) => {
        setGameDeals(data);
      });
  }, []);*/

  let latestDeals = null;
  if (isLoading) {
    latestDeals = <p>Loading...</p>;
  } else if (error) {
    latestDeals = <p>There was an error</p>;
  } else if (data) {
    latestDeals = data.map((game, key) => {
      return (
        <div className="deal" key={key}>
          <h3>{longTitle(game.title)}</h3>
          <img src={game.thumb} />
          <p>Before: </p>
          <p className="normalPrice">{game.normalPrice}$</p>
          <p>Now: </p>
          <p>{game.salePrice}$</p>
          <h3>YOU SAVE {game.savings.slice(0, 2)}%</h3>
        </div>
      );
    });
  }

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
            if (event.code === "Enter") {
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
        <div className="dealsContainer">{latestDeals}</div>
      </div>
    </div>
  );
}
