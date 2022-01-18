import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import { NewGame } from "./NewGame";
import styles from './styles.module.scss';

export function GameList() {
  const [myGames, setMyGames] = useState([]);

  useEffect(() => {
    api.get('/games/myGames')
      .then(response => setMyGames(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <NewGame />
      { myGames }
    </div>
  )
}