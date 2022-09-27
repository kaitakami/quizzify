import Categories from "./Categories";

const GameStart = ({ handleCategoryChange, selectedCategory, startGame }) => {
  return (
    <>
      <h1 className="title">Quizzify</h1>
      <p className="description">Select a category 👇</p>
      <Categories handleCategoryChange={handleCategoryChange} />
      <button className="start-button" onClick={startGame}>
        {Object.keys(selectedCategory).length > 0
          ? `Start quiz of ${selectedCategory.value}`
          : "Select a category first"}
      </button>
    </>
  );
};

export default GameStart;
