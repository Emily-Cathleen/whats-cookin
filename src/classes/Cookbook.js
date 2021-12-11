class Cookbook {
  constructor(recipes) {
    this.recipes = recipes;
    this.matchingRecipes;
    this.matchingTags = [];
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
      // We want to see if the searched ingredient is a substring of some
      // ingredient and the searched name is a substring of the recipe name.
      return (
        (searchedIngredient == "" ||
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

// Method to clear all matching arrays?
// Fix tests to use "filteredRecipes" instead of individual methods for name and ingredient.
