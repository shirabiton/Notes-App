import "./CardList.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import SingleCard from "../SingleCard/SingleCard";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [openColorSwitchId, setOpenColorSwitchId] = useState(-1);
  const [isOpenAddCard, setIsOpenAddCard] = useState(false);
  const [isOpenAddCardColorSwitch, setIsOpenAddCardColorSwitch] =
    useState(false);
  const [text, setText] = useState("");
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

  const getCardsRequest = () => {
    axios
      .get("http://localhost:5000")
      .then((response) => {
        setCards(response.data);
        console.log(response.data);
      })
      .catch((e) => console.error(e.message));
  };

  const getCardByIdRequest = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/get-card/${id}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e.message);
    }
  };

  const addCardHandle = (event) => {
    const newCard = { text: text, color: color };
    if (event.key === "Enter") {
      setIsOpenAddCard(false);
      setText("");
      setColor("#333333");
      addCardRequest(newCard);
    }
  };

  // Close insert mode when clicking on the page background
  const closeAddCardHandle = (event) => {
    if (!event.target.closest("li")) {
      setIsOpenAddCard(false);
    }
  };

  const addCardRequest = (newCard) => {
    axios
      .post(`http://localhost:5000/add-card`, newCard)
      .then((response) => {
        console.log(response);
        getCardsRequest();
      })
      .catch((e) => console.error(e.message));
  };

  const setCardColor = async (cardId, color) => {
    let card = await getCardByIdRequest(cardId);
    let updatedCard = { text: card.text, color: color };
    setOpenColorSwitchId(-1);
    updateCardRequest(cardId, updatedCard);
  };

  const updateCardRequest = async (cardId, updatedCard) => {
    await axios
      .put(`http://localhost:5000/update-card/${cardId}`, updatedCard)
      .then((response) => {
        console.log(response.data);
        getCardsRequest();
      })
      .catch((e) => console.error(e.message));
  };

  const deleteCardRequest = (cardId) => {
    axios
      .delete(`http://localhost:5000/delete-card/${cardId}`)
      .then((response) => {
        console.log(response.data);
        getCardsRequest();
      })
      .catch((e) => console.error(e.message));
  };

  return (
    <div onClick={closeAddCardHandle}>
      <ul id="card-list">
        {cards.map((card) => (
          <li
            className="single-card"
            key={card.id}
            style={{ backgroundColor: card.color }}
          >
            <SingleCard
              card={card}
              getCardsRequest={getCardsRequest}
              updateCardRequest={updateCardRequest}
              setCards={setCards}
            ></SingleCard>
            {openColorSwitchId === card.id ? (
              <span className="color-switch">
                {colors.map((c) => (
                  <Icon
                    key={c.id}
                    icon="material-symbols-light:circle"
                    style={{ color: c.color }}
                    className="color-switch-icn"
                    onClick={() => setCardColor(card.id, c.color)}
                  />
                ))}
              </span>
            ) : (
              <span className="icons-container">
                <span onClick={() => setOpenColorSwitchId(card.id)}>
                  <Icon className="color-switch-icn" icon="mdi-light:circle" />
                </span>
                <span onClick={() => deleteCardRequest(card.id)}>
                  <Icon icon="bxs:trash" className="delete-icn" />
                </span>
              </span>
            )}
          </li>
        ))}

        {isOpenAddCard ? (
          <li className="single-card" style={{ backgroundColor: color }}>
            <input
              type="text"
              maxLength="50"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add Text Here"
              onKeyDown={addCardHandle}
              className="text-input"
            />
            {isOpenAddCardColorSwitch ? (
              <span className="color-switch">
                {colors.map((c) => (
                  <Icon
                    key={c.id}
                    icon="material-symbols-light:circle"
                    style={{ color: c.color }}
                    className="color-switch-icn"
                    onClick={() => {
                      setColor(c.color);
                      setIsOpenAddCardColorSwitch(false);
                    }}
                  />
                ))}
              </span>
            ) : (
              <span className="icons-container">
                <span onClick={() => setIsOpenAddCardColorSwitch(true)}>
                  <Icon className="color-switch-icn" icon="mdi-light:circle" />
                </span>
              </span>
            )}
          </li>
        ) : (
          <li id="plus-icn" onClick={() => setIsOpenAddCard(true)}>
            <Icon icon="rivet-icons:plus" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default CardList;
