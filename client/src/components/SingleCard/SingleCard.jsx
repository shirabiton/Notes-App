import { useState } from "react";
import "./SingleCard.css";

const SingleCard = (props) => {
  const [currentText, setCurrentText] = useState("");
  const [setTextId, setSetTextId] = useState(-1);

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
          onClick={() => {
            setSetTextId(props.card.id);
            setCurrentText(props.card.text);
          }}
        >
          {props.card.text}
        </p>
      )}
    </>
  );
};

export default SingleCard;
