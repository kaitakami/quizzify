const Category = ({category, handleCategoryClick}) => {
  return (
    <button className="category-button" onClick={() => handleCategoryClick(category)}>{category.value}</button>
  )
}

export default Category
