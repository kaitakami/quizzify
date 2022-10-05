const Category = ({ category, handleCategoryClick }) => {
  return (
    <button
      className={`category-button ${category.selected && "category-selected"}`}
      onClick={() => handleCategoryClick(category)}
    >
      {category.value}
    </button>
  );
};

export default Category;
