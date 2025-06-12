import React from "react";
import { useParams } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectQuizzes } from './quizzesSlice';
import { useSelector } from 'react-redux';
import Card from "../cards/Card";
import { Link, Navigate } from "react-router-dom";

export default function Quiz() {
  const { quizId } = useParams();
  const quizzes = useSelector(selectQuizzes);
  const quiz = quizzes[quizId];

  if (!quiz) {
    return <Navigate to={ROUTES.quizzesRoute()} replace />;
  }

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
