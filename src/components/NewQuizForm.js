import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { addQuizId } from '../features/topics/topicsSlice';
import { addQuiz } from '../features/quizzes/quizzesSlice';
import { addCard } from '../features/cards/cardsSlice';
import { selectTopics } from '../features/topics/topicsSlice';

export default function NewQuizForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topics = useSelector(selectTopics);
  const [name, setName] = useState("");
  const [topicId, setTopicId] = useState("");
  const [cards, setCards] = useState([{ front: "", back: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || !topicId) {
      return;
    }

    const quizId = uuidv4();
    const cardIds = [];

    // Create cards and collect their IDs
    cards.forEach(card => {
      if (card.front && card.back) {
        const cardId = uuidv4();
        dispatch(addCard({
          id: cardId,
          front: card.front,
          back: card.back
        }));
        cardIds.push(cardId);
      }
    });

    // Create the quiz with the card IDs
    dispatch(addQuiz({
      id: quizId,
      name,
      topicId,
      cardIds
    }));
    dispatch(addQuizId({ topicId, quizId }));
    navigate(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="center">Create a new quiz</h1>
        <div className="form-section">
          <input
            id="quiz-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Quiz Name"
          />
          <select
            onChange={(e) => setTopicId(e.currentTarget.value)}
            required
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Choose a topic
            </option>
            {Object.values(topics).map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) => updateCardState(index, "front", e.currentTarget.value)}
              placeholder="Front"
            />
            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) => updateCardState(index, "back", e.currentTarget.value)}
              placeholder="Back"
            />
            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}

        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
