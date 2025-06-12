import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectQuizzes } from './quizzesSlice';
import { useSelector } from 'react-redux';
import Card from "../cards/Card";

export default function Quiz() {
  const { quizId } = useParams();
  const quizzes = useSelector(selectQuizzes);
  const quiz = quizzes[quizId];

  if (!quiz) {
    return <Navigate to={ROUTES.quizzesRoute()} replace />;
  }

  return (
    <section className="center">
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((cardId) => (
          <Card key={cardId} id={cardId} />
        ))}
      </ul>
    </section>
  );
}
