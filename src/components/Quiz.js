import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { getQuestionsAPI } from "../services/getQuestionsAPI";
import Question from "./Question";
import Message from "./Message";

const Quiz = ({ category }) => {
  const { id } = category;
  const [trivia, setTrivia] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [lastSelectedQuestion, setLastSelectedQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (trivia.length === 0) {
      getQuestionsAPI(id).then((result) => {
        setTrivia(result);
      });
    } else {
      setCorrectAnswers(trivia.map((question) => question.correct_answer));
      const createAnswersObject = () =>
        trivia.map((question) => {
          const allAnswers = [
            question.correct_answer,
            ...question.incorrect_answers,
          ];

          const arr = allAnswers.map((answer) => ({
            value: answer,
            selected: false,
            id: nanoid(),
          }));
          return arr;
        });
      setAnswers(createAnswersObject);
    }
  }, [id, trivia]);

  const handleAnswerClicked = (sameQuestionAnswers, clickedAns) => {
    // starting from 0
    const questionNumber = answers.indexOf(sameQuestionAnswers);
    const tempAnswers = answers;
    tempAnswers[questionNumber].map((answer) => {
      if (answer === clickedAns) {
        setLastSelectedQuestion(answer);
        answer.selected = true;
        return null;
      } else {
        answer.selected = false;
        return null;
      }
    });
    setAnswers(tempAnswers);
  };

  const checkResults = () => {};

  const renderQuestions = () =>
    trivia.map((question, index) => (
      <Question
        key={nanoid()}
        question={question.question}
        answers={answers[index]}
        handleAnswerClicked={handleAnswerClicked}
      />
    ));

  return (
    <div>
      {!(trivia.length > 0) && <p className="loading-text">Loading...</p>}
      {trivia.length > 0 ? (
        <>
          <h1 className="title">Quizzify</h1>
          {answers && renderQuestions()}
          <button onClick={checkResults}>Update</button>
        </>
      ) : null}
    </div>
  );
};

export default Quiz;
