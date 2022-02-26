import styles from "./Game.module.css";
import Image from "next/image";
import CardsContainer from "../CardsContainer";
import { useState, useEffect } from "react";
import ModalWin from "../ModalWin";

export default function Game() {
  const [gameWin, setGameWin] = useState(false);
  const [nivel, setNivel] = useState("easy");
  const [renderCardContainer, setRenderContainer] = useState(false);

  useEffect(() => {
    console.log("Nivel mudou " + nivel);
  }, [nivel]);
  useEffect(() => {
    if (gameWin) {
      setNivel(() => "easy");
      console.log("GAME WIN GAME CONTAINEr");
      setRenderContainer(!renderCardContainer);
    }
  }, [gameWin]);
  return (
    <>
      <div className={styles.container_background}></div>
      <div className={styles.container_game}>
        <div className={`${styles.title_game} title`}>Jogo da memoria</div>
        <div className={styles.select_container}>
          <select
            onChange={(e) => {
              console.log(e);
              let idx = e.target.options.selectedIndex;

              setNivel(e.target[idx].value);
            }}
            title="Selected Dificult"
            name="select"
          >
            <option value="easy">Nível fácil</option>
            <option value="medium">Nível médio</option>
            <option value="hard">Nível difícil</option>
          </select>
        </div>

        <CardsContainer
          onWinGame={() => setGameWin(true)}
          nivel={nivel}
          reRender={renderCardContainer}
        />

        {gameWin && <ModalWin restartGame={() => setGameWin(false)} />}
      </div>
    </>
  );
}
