import { useState } from "react";
import { nanoid } from "nanoid";
import { categoriesData } from "../services/data";
import Category from "./Category";

const Categories = ({ handleCategoryChange }) => {
  const [categoriesState, setCategoriesState] = useState(categoriesData);

  const handleCategoryClick = (clickedCategory) => {
    setCategoriesState((oldCategories) =>
      oldCategories.map((category) => {
        return clickedCategory.id !== category.id
          ? { ...category, selected: false }
          : { ...category, selected: true };
      })
    );

    // due to state being asynchronous, the key (Boolean) selected has to be changed manually parameter clickedCategory
    handleCategoryChange({ ...clickedCategory, selected: true });
  };

  const categoriesElement = categoriesState.map((category) => (
    <Category
      key={nanoid()}
      category={category}
      handleCategoryClick={handleCategoryClick}
    />
  ));

  return <div className="categories-container">{categoriesElement}</div>;
};

export default Categories;
