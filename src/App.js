import { useState } from "react";
import GameStart from "./components/GameStart";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({})

  function handleCategoryChange (category) {
    // setSelectedCategory
    console.log(category)
  }

  return (
    <div className="container">
      {isGameStarted ? null : <GameStart setIsGameStarted={setIsGameStarted} handleCategoryChange={handleCategoryChange} />}
    </div>
  );
}

export default App;
