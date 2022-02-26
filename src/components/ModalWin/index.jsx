import Image from "next/image";
import styles from "./ModalWin.module.css";

export default function ModalWin(props) {
  return (
    <div className={styles.container_win}>
      <div className={styles.modal}>
        <div className={styles.modal_container_web}>
          <Image src={"/assets/img/web.svg"} layout="fill" />
        </div>
        <p className={`title ${styles.title_win}`}>Buuh!!</p>
        <p className={styles.text_win}>
          Parabéns, você terminou esse jogo da memória. Experimente jogar uma
          outra dificuldade ou jogue na mesma novamente.
        </p>
        <button
          onClick={() => {
            if (props.restartGame) {
              props.restartGame();
            }
          }}
          className={styles.button_win}
        >
          Jogar novamente
        </button>
      </div>
    </div>
  );
}
