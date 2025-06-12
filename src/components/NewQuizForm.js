import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { ALL_ICONS } from "../data/icons";
import { addTopic, addQuizId } from '../features/topics/topicsSlice';
import { addQuiz } from '../features/quizzes/quizzesSlice';
import { selectTopics } from '../features/topics/topicsSlice';

export default function NewQuizForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topics = useSelector(selectTopics);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [topicId, setTopicId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || !topicId) {
      return;
    }

    const quizId = uuidv4();
    dispatch(addQuiz({
      id: quizId,
      name,
      topicId,
      cardIds: []
    }));
    dispatch(addQuizId({ topicId, quizId }));
    navigate(ROUTES.quizzesRoute());
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
        <button className="center" type="submit">Add Quiz</button>
      </form>
    </section>
  );
}
