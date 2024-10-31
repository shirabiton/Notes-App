import "./style.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import SingleCard from "./SingleCard.jsx";
import AddCard from "./AddCard.jsx";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [isOpenAddCard, setIsOpenAddCard] = useState(false);
  const [color, setColor] = useState("#333333");

  const colors = [
    { id: 0, color: "#E69138" },
    { id: 1, color: "#6AA84F" },
    { id: 2, color: "#A4C2F4" },
    { id: 3, color: "#8E7CC3" },
  ];

  useEffect(() => {
    getCardsRequest();
  }, []);

  // Http requests

  const getCardsRequest = () => {
    axios
      .get("http://localhost:5000")
      .then((response) => {
        setCards(response.data);
        console.log(response.data);
      })
      .catch((e) => console.error(e.message));
  };

  const updateCardRequest = (cardId, updatedCard) => {
    axios
      .put(`http://localhost:5000/update-card/${cardId}`, updatedCard)
      .then((response) => {
        console.log(response.data);
        getCardsRequest();
      })
      .catch((e) => console.error(e.message));
  };

  // Closes add card mode when clicking on the background page
  const closeAddCardHandle = (event) => {
    if (!event.target.closest("li")) {
      setColor("#333333");
      setIsOpenAddCard(false);
    }
  };

  return (
    <div onClick={closeAddCardHandle}>
      <ul id="card-list">
        {cards.map((card) => (
          <li
            key={card.id}
            className="list-item"
            style={{ backgroundColor: card.color }}
          >
            <SingleCard
              card={card}
              getCardsRequest={getCardsRequest}
              updateCardRequest={updateCardRequest}
              setCards={setCards}
              colors={colors}
            ></SingleCard>
          </li>
        ))}

        {isOpenAddCard ? (
          // Add card mode
          <li className="list-item" style={{ backgroundColor: color }}>
            <AddCard
              color={color}
              setColor={setColor}
              colors={colors}
              getCardsRequest={getCardsRequest}
              setIsOpenAddCard={setIsOpenAddCard}
            ></AddCard>
          </li>
        ) : (
          // Show plus icon
          <li id="plus-icn" onClick={() => setIsOpenAddCard(true)}>
            <Icon icon="rivet-icons:plus" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default CardList;
