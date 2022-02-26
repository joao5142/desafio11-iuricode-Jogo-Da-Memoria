import Card from "../Card";
import styles from "./CardsContainer.module.css";
import { useState, useEffect, useRef } from "react";

export default function CardsContainer(props) {
  const [arrayPositions, setArrayPositions] = useState(new Array());
  const [gameBegin, setGameBegin] = useState(false);
  const [isFill, setIsFill] = useState(false);
  const [renderCard, setRenderCard] = useState(false);
  let firstClickRef = useRef();
  let secondClickRef = useRef();

  useEffect(() => {
    if (props.nivel) {
      if (props.nivel == "easy") {
        changeEasyLevel();
      } else if (props.nivel == "medium") {
        changeMediumLevel();
      } else if (props.nivel == "hard") {
        changeHardLevel();
      }
    }
    setGameBegin(true);
    console.log("Renderizou os cards");
  }, [props.nivel]);

  useEffect(() => {
    console.log("ARRAY POSITIONS : " + arrayPositions);
    setRenderCard(!renderCard);
    if (gameBegin) {
      verifyWin();
    }
  }, [arrayPositions]);

  useEffect(() => {
    //dependencia para reiniciar o jogo quando acabar
    console.log("CARDCONTAINER REINICIADO");
    changeEasyLevel();
    console.log("MUDOU AQUI");
  }, [props.reRender]);

  return (
    <>
      <div className={styles.card_container}>
        {arrayPositions.map((position, idx) => {
          if (position == 2) {
            return (
              <Card
                onClickCard={(number, key) => {
                  checkCardsEqualArray(number, key);
                }}
                number={position}
                key={idx}
                myKey={idx}
                src={`/assets/img/card_image${position}.svg`}
                fill={false}
                reRender={renderCard}
              />
            );
          } else {
            return (
              <Card
                onClickCard={(number, key) => {
                  checkCardsEqualArray(number, key);
                }}
                number={position}
                key={idx}
                myKey={idx}
                src={`/assets/img/card_image${position}.svg`}
                fill={true}
                reRender={renderCard}
              />
            );
          }
        })}
      </div>
    </>
  );

  function checkCardsEqualArray(number, key) {
    console.log("NUMBER AND KEY : " + number + " " + key);
    if (!firstClickRef.current) {
      firstClickRef.current = [number, key];
    } else {
      secondClickRef.current = [number, key];
    }

    console.log(firstClickRef.current);
    console.log(secondClickRef.current);

    if (firstClickRef.current && secondClickRef.current) {
      if (
        firstClickRef.current[0] === secondClickRef.current[0] &&
        firstClickRef.current[1] !== secondClickRef.current[1]
      ) {
        let number = firstClickRef.current[0];
        console.log("ENTROU AQUI EM SET CARD EQUAL ");
        const filtredArray = arrayPositions.filter(
          (position) => position != number
        );
        setTimeout(() => {
          setArrayPositions(() => filtredArray);

          firstClickRef.current = null;
          secondClickRef.current = null;
        }, 2000);
      } else {
        const newArray = [...arrayPositions];
        setTimeout(() => {
          setArrayPositions(() => newArray);

          firstClickRef.current = null;
          secondClickRef.current = null;
        }, 2000);
      }
    }
  }

  function changeHardLevel() {
    let arr = new Array(16);

    let finalArr = genarateParsCards(arr.length);

    console.log("Final array é : " + finalArr);
    setArrayPositions(finalArr);
  }
  function changeMediumLevel() {
    let arr = new Array(12);

    let finalArr = genarateParsCards(arr.length);

    console.log("Final array é : " + finalArr);
    setArrayPositions(finalArr);
  }
  function changeEasyLevel() {
    let arr = new Array(8);

    let finalArr = genarateParsCards(arr.length);

    console.log("Final array é : " + finalArr);
    setArrayPositions(finalArr);
  }

  function genarateParsCards(lengthArr) {
    let arr = [];

    arr = fillArray(lengthArr);
    return arr;
  }
  function verifyWin() {
    if (arrayPositions.length == 0) {
      console.log("WIN GAME");
      if (props.onWinGame) {
        props.onWinGame();
      }
    }
  }

  function fillArray(lengthArr) {
    let dividedArray = lengthArr / 2;
    let arr = new Array(dividedArray);
    for (let i = 0; i < dividedArray; i++) {
      let number = getRandomIntegers(dividedArray, 1);

      if (arr.includes(number)) {
        while (arr.includes(number)) {
          number = getRandomIntegers(dividedArray, 1);
        }
      }
      arr[i] = number;
    }

    let arrAux = new Array(dividedArray);
    console.log("Arr aux lenght: " + arrAux.length);

    for (let i = 0; i < arrAux.length; i++) {
      let number = getRandomIntegers(arrAux.length, 1);

      if (arrAux.includes(number)) {
        while (arrAux.includes(number)) {
          number = getRandomIntegers(dividedArray, 1);
        }
      }
      arrAux[i] = number;
    }
    console.log("Arr aux : " + arrAux);
    console.log(arr);

    setIsFill(true);
    return [...arr, ...arrAux];
  }
  function getRandomIntegers(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
