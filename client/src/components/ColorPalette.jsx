import "./style.css";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ColorPalette = (props) => {
  const setCardColor = (cardId, cardText, color) => {
    let updatedCard = { text: cardText, color: color };
    props.setOpenColorChangeId(-1);
    props.updateCardRequest(cardId, updatedCard);
  };

  return (
    <>
      <span className="color-palette">
        {props.colors.map((c) => (
          <Icon
            key={c.id}
            icon="material-symbols-light:circle"
            className="color-change-icn"
            style={{ color: c.color }}
            onClick={() =>
              setCardColor(props.card.id, props.card.text, c.color)
            }
          />
        ))}
      </span>
    </>
  );
};

export default ColorPalette;
