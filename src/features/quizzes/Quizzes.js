import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectQuizzes } from './quizzesSlice';
import { useSelector } from 'react-redux';

export default function Quizzes() {
  const quizzes = useSelector(selectQuizzes);

  return (
    <section className="center">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)} className="quiz-link">
              <div className="quiz-container">
                <h2>{quiz.name}</h2>
                <p>{quiz.cardIds.length} Cards</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={ROUTES.newQuizRoute()}
        className="button create-new-quiz-button"
      >
        Create New Quiz
      </Link>
    </section>
  );
}
