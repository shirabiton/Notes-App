import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

// DB
const cards = [
  { id: 0, text: "Text a", color: "#6AA84F" },
  { id: 1, text: "Text b", color: "#A4C2F4" },
  { id: 2, text: "Text c", color: "#8E7CC3" },
  { id: 3, text: "Text d", color: "#E69138" },
];

// Get
app.get("/", (req, res) => {
  try {
    if (cards.length === 0) {
      return res.status(404).json({ message: "No cards found" });
    }
    res.status(200).json(cards);
    console.log("Retrieving cards successfully", cards);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error retrieving cards");
  }
});

// Get by id
app.get("/get-card/:id", (req, res) => {
  try {
    if (cards.length === 0) {
      return res.status(404).json({ message: "No cards found" });
    }
    const cardId = req.params.id;
    const response = cards.find((item) => item.id == cardId);
    if (!response) {
      return res.status(400).json({ message: "Card not found" });
    }
    res.status(200).json(response);
    console.log("Retrieving card successfully", response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error retrieving card");
  }
});

// Post
app.post("/add-card", (req, res) => {
  const newCard = { id: cards[cards.length - 1].id + 1, ...req.body };
  if (!newCard.text || !newCard.color) {
    return res.status(400).json({ message: "Text and color are required" });
  }
  if (typeof newCard.text !== "string" || typeof newCard.color !== "string") {
    return res.status(400).json({ message: "Text and color are required" });
  }
  try {
    cards.push(newCard);
    res.status(200).json(cards);
    console.log("Adding card successfully", newCard);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error adding card");
  }
});

// Put
app.put("/update-card/:id", (req, res) => {
  const cardId = req.params.id;
  const updatedcard = req.body;
  if (!updatedcard.text || !updatedcard.color) {
    return res.status(400).json({ message: "Text and color are required" });
  }
  if (
    typeof updatedcard.text !== "string" ||
    typeof updatedcard.color !== "string"
  ) {
    return res.status(400).json({ message: "Text and color must be strings" });
  }
  try {
    const cardIndex = cards.findIndex((item) => item.id == cardId);
    if (cardIndex < 0) {
      return res.status(404).json({ message: "Card not found" });
    }
    const finalCard = (cards[cardIndex] = {
      ...cards[cardIndex],
      ...updatedcard,
    });
    console.log("Updating card successfully", finalCard);
    res.status(200).json(finalCard);
  } catch (error) {
    console.error(error, "Error updating card");
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete
app.delete("/delete-card/:id", (req, res) => {
  try {
    const cardId = req.params.id;
    const cardIndex = cards.findIndex((item) => item.id == cardId);
    if (cardIndex < 0) {
      return res.status(404).json({ message: "Card not found" });
    }
    cards.splice(cardIndex, 1);
    res.status(200).json(cards);
    console.log("Card deleted successfully", cardId);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error deleting card");
  }
});

// Sets the server to listen on the port, and the function to be run after the server starts listening successfully
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
