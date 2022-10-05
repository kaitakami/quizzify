import React from "react";
import * as entities from "entities";

const Question = ({ question, answers, handleAnswerClicked }) => {
  const renderAnswers = (allAnswers) =>
    allAnswers.map((questionAnswer) => (
      <button
        className={`answer-button ${
          questionAnswer.selected ? "selected" : ""
        } ${questionAnswer.correct ? "correct-answer" : ""}`}
        key={questionAnswer.id}
        onClick={() => handleAnswerClicked(answers, questionAnswer)}
      >
        {entities.decodeHTML(questionAnswer.value)}
      </button>
    ));

  return (
    <div className="question">
      <h3>{entities.decodeHTML(question)}</h3>
      <div className="answers">{answers && renderAnswers(answers)}</div>
    </div>
  );
};

export default Question;
