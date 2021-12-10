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
  filteredIngredients(searchedIngredient) {
    const filteredIngredient = this.recipes.filter((recipe) => {
      return recipe.determineIngredients().includes(searchedIngredient);
    });
    return filteredIngredient;
  }
  filteredName(searchedName) {
    this.matchingRecipes = this.recipes.filter((recipe) => {
      return recipe.name.includes(searchedName);
    });
    return this.matchingRecipes;
  }
}

export default Cookbook;

// Method to clear all matching arrays?
