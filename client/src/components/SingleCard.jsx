import "./style.css";
import { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import ColorPalette from "./ColorPalette";

const SingleCard = (props) => {
  const [currentText, setCurrentText] = useState("");
  const [setTextId, setSetTextId] = useState(-1);
  const [openColorChangeId, setOpenColorChangeId] = useState(-1);

  // Http requests
  const deleteCardRequest = (cardId) => {
    axios
      .delete(`http://localhost:5000/delete-card/${cardId}`)
      .then((response) => {
        console.log(response.data);
        props.getCardsRequest();
      })
      .catch((e) => console.error(e.message));
  };

  // Sends an object that is updated to the text received to the card update function (http request)
  const setCardText = (event, cardId, cardColor) => {
    const updatedCard = { text: currentText, color: cardColor };
    if (event.key === "Enter") {
      setSetTextId(-1);
      props.updateCardRequest(cardId, updatedCard);
    }
  };

  return (
    <>
      {setTextId === props.card.id ? (
        // Text editing mode
        <input
          type="text"
          className="text-input"
          maxLength="50"
          value={currentText}
          placeholder="Add Text Here"
          onChange={(e) => setCurrentText(e.target.value)}
          onKeyDown={(e) => setCardText(e, props.card.id, props.card.color)}
        />
      ) : (
        <p
          // Switch to text editing mode by clicking on the text
          onClick={() => {
            setSetTextId(props.card.id);
            setCurrentText(props.card.text);
          }}
        >
          {props.card.text}
        </p>
      )}
      {openColorChangeId === props.card.id ? (
        // Show color palette by clicking the color change icon
        <ColorPalette
          card={props.card}
          colors={props.colors}
          setOpenColorChangeId={setOpenColorChangeId}
          updateCardRequest={props.updateCardRequest}
        ></ColorPalette>
      ) : (
        <span className="icons-container">
          <span onClick={() => setOpenColorChangeId(props.card.id)}>
            <Icon className="color-change-icn" icon="mdi-light:circle" />
          </span>
          <span onClick={() => deleteCardRequest(props.card.id)}>
            <Icon icon="bxs:trash" className="delete-icn" />
          </span>
        </span>
      )}
    </>
  );
};

export default SingleCard;
