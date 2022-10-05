import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { getQuestionsAPI } from "../services/getQuestionsAPI";
import Question from "./Question";
import Message from "./Message";

const Quiz = ({ category, setIsGameStarted }) => {
  const { id } = category;
  const [trivia, setTrivia] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [result, setResult] = useState(0);

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
        setSelectedQuestion(answer);
        answer.selected = true;
        return null;
      } else {
        answer.selected = false;
        return null;
      }
    });
    setAnswers(tempAnswers);
  };

  const renderQuestions = () =>
    trivia.map((question, index) => (
      <Question
        key={nanoid()}
        question={question.question}
        answers={answers[index]}
        handleAnswerClicked={handleAnswerClicked}
      />
    ));

  const checkAnswers = () => {
    const selectedAnswers = answers
      .map((question) =>
        question
          .map((answer) => {
            if (answer.selected) {
              return answer.value;
            }
            return null;
          })
          .filter((answer) => answer !== null)
      )
      .flat();
    if (selectedAnswers.length === 5) {
      setGameEnded(true);
      const quizResult = correctAnswers.map(
        (correctAnswer, index) => correctAnswer === selectedAnswers[index]
      );
      setResult(quizResult.filter((result) => result).length);
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
  };

  const resetQuiz = () => {
    setIsGameStarted(false);
  };

  const showAnswers = () => {
    const tempAnswers = answers.map((questionAnswers, index) =>
      questionAnswers.map((answer) => {
        if (answer.value === correctAnswers[index]) {
          return { ...answer, correct: true };
        } else {
          return { ...answer, correct: false };
        }
      })
    );
    setAnswers(tempAnswers);
  };

  return (
    <div>
      {result > 3 && <Confetti />}
      {!(trivia.length > 0) && <p className="loading-text">Loading...</p>}
      {trivia.length > 0 ? (
        <>
          <h1 className="title">Quizzify</h1>
          {answers && renderQuestions()}
          {gameEnded && <p className="results">Result: {result} / 5</p>}
          <div className="button-containers">
            <button className="start-button" onClick={checkAnswers}>
              Check Answers
            </button>
            <button className="start-button" onClick={resetQuiz}>
              {gameEnded ? "Reset Quiz" : "Select Different Category"}
            </button>
            {gameEnded && (
              <button className="start-button" onClick={showAnswers}>
                Show Answers
              </button>
            )}
          </div>
          {errorMessage && (
            <div className="error-container">
              <Message
                children={"You have to choose an answer for each question"}
              />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Quiz;
