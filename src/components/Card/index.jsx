import Image from "next/image";
import styles from "./Card.module.css";
import { useState, useEffect } from "react";

export default function Card(props) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("NUMBER : " + props.number);
    console.log("KEY : " + props.myKey);
    console.log("CARD RENDERIZADO");
  }, []);

  useEffect(() => {
    setClicked(() => false);
  }, [props.reRender]);

  return (
    <div
      onClick={() => {
        if (props.onClickCard) {
          props.onClickCard(props.number, props.myKey);
          handleClick();
        }
      }}
      className={`${styles.card} ${props.fill ? styles.fill : ""} ${
        !clicked ? styles.wildcard : styles.active_card
      }`}
    >
      <div className={styles.image_content}>
        <Image src={props.src} layout="fill" alt="Image card" />
      </div>
    </div>
  );

  function handleClick() {
    console.log("entrou aqui");
    setClicked(!clicked);
  }
}
