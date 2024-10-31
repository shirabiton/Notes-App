import "./style.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import React, { useState } from "react";

const AddCard = (props) => {
  const [isOpenAddCardColorChange, setIsOpenAddCardColorChange] =
    useState(false);
  const [text, setText] = useState("");

  // Http requests
  const addCardRequest = (newCard) => {
    axios
      .post(`http://localhost:5000/add-card`, newCard)
      .then((response) => {
        console.log(response);
        props.getCardsRequest();
      })
      .catch((e) => console.error(e.message));
  };

  // Calls add card http request by clicking enter after text entering
  const addCardHandle = (event) => {
    const newCard = { text: text, color: props.color };
    if (event.key === "Enter") {
      setText("");
      props.setColor("#333333");
      addCardRequest(newCard);
      props.setIsOpenAddCard(false);
    }
  };

  return (
    <>
      {/* Card text input */}
      <input
        type="text"
        maxLength="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add Text Here"
        onKeyDown={addCardHandle}
        className="text-input"
      />

      {isOpenAddCardColorChange ? (
        // Color text input
        <span className="color-palette">
          {props.colors.map((c) => (
            <Icon
              key={c.id}
              icon="material-symbols-light:circle"
              style={{ color: c.color }}
              className="color-change-icn"
              onClick={() => {
                props.setColor(c.color);
                setIsOpenAddCardColorChange(false);
              }}
            />
          ))}
        </span>
      ) : (
        <span className="icons-container" style={{ marginTop: "auto" }}>
          <span onClick={() => setIsOpenAddCardColorChange(true)}>
            <Icon className="color-change-icn" icon="mdi-light:circle" />
          </span>
        </span>
      )}
    </>
  );
};

export default AddCard;
