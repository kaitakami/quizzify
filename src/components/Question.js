import React from "react";

const Question = ({ question, answers, handleAnswerClicked }) => {
  const renderAnswers = (allAnswers) =>
    allAnswers.map((questionAnswer) => (
      <button
        className={`answer-button ${questionAnswer.selected ? "selected" : ""}`}
        key={questionAnswer.id}
        onClick={() => handleAnswerClicked(answers, questionAnswer)}
      >
        {questionAnswer.value}
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
