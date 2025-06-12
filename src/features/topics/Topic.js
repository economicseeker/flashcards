import React from "react";
import { useParams } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectTopics } from './topicsSlice';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export default function Topic() {
  const { topicId } = useParams();
  const topics = useSelector(selectTopics);
  const topic = topics[topicId];

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <section className="center">
      <h1>{topic.name}</h1>
      <ul className="quizzes-list">
        {topic.quizIds.map((quizId) => (
          <li key={quizId} className="quiz">
            <Link to={ROUTES.quizRoute(quizId)} className="quiz-link">
              <div className="quiz-container">
                <h2>Quiz ID: {quizId}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
