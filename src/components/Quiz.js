import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { getQuestionsAPI } from "../services/getQuestionsAPI";
import Question from "./Question";

const Quiz = ({ category }) => {
  const { id } = category;
  const [trivia, setTrivia] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
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

  const handleAnswerClicked = (clickedAns) => {
    console.log(clickedAns);
  };
  const renderQuestions = trivia.map((question,index) => (
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
      {trivia.length > 0 ? renderQuestions : null}
    </div>
  );
};

export default Quiz;
