class Cookbook {
  constructor(recipes) {
    this.recipes = recipes;
  }
  
  filterTags(selectedTags) {
    const filteredRecipesByTag = this.recipes.filter((recipe) => {
      return selectedTags.every((selectedTag) =>
        recipe.tags.includes(selectedTag)
      );
    });
    return filteredRecipesByTag;
  }

  filteredRecipes(searchedIngredient, searchedName) {
    const filteredIngredient = this.recipes.filter((recipe) => {
      return (
        (searchedIngredient === "" ||
          recipe
            .determineIngredients()
            .some((ingredient) =>
              ingredient
                .toLowerCase()
                .includes(searchedIngredient.toLowerCase())
            )) &&
        recipe.name.toLowerCase().includes(searchedName.toLowerCase())
      );
    });
    return filteredIngredient;
  }
}

export default Cookbook;
