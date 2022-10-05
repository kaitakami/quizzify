import { useState } from "react";
import Message from "./components/Message";
import Quiz from "./components/Quiz";
import GameStart from "./components/GameStart";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [displayingError, setDisplayingError] = useState(false);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function startGame() {
    // validate if a category is selected
    if (Object.keys(selectedCategory).length > 0) {
      setIsGameStarted(true);
      setDisplayingError(false);
    } else {
      setDisplayingError(true);
      // The time should be the same to the animation applied to the classname message in index.css
      setTimeout(() => setDisplayingError(false), 5000);
    }
  }

  return (
    <div className="container">
      {displayingError && (
        <Message children={"Select a category to get started"} />
      )}
      {isGameStarted ? (
        <Quiz category={selectedCategory} setIsGameStarted={setIsGameStarted} />
      ) : (
        <GameStart
          handleCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          startGame={startGame}
        />
      )}
    </div>
  );
}

export default App;
