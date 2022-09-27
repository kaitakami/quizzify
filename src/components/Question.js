import React from "react";
import { nanoid } from "nanoid";

const Question = ({ question, answers, handleAnswerClicked }) => {
  console.log(answers);
  const renderAnswers = (allAnswers) =>
    allAnswers.map((questionAnswers) => (
      <button
        key={questionAnswers.id}
        onClick={() => handleAnswerClicked(questionAnswers.id)}
      >
        {questionAnswers.value}
      </button>
    ));

  return (
    <div className="question">
      <h3>{question}</h3>
      <div className="answers">{answers && renderAnswers(answers)}</div>
    </div>
  );
};

export default Question;
