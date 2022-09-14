import Categories from "./Categories";

const GameStart = ({ handleCategoryChange }) => {
  return (
    <>
      <h1 className="title">Quizzify</h1>
      <p className="description">Select the category you want</p>
      <Categories handleCategoryChange={handleCategoryChange} />
    </>
  );
};

export default GameStart;
