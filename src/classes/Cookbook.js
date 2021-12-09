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
  filteredIngredients(searchedIngredient) {
    const filteredIngredient = this.recipes.filter((recipe) => {
      return recipe.determineIngredients().includes(searchedIngredient);
    });
    return filteredIngredient;
  }
  filteredName(searchedName) {
    const filteredName = this.recipes.filter((recipe) => {
      return recipe.name.includes(searchedName);
    });
    return filteredName;
  }
}

export default Cookbook;

/*
It should have methods to determine:

A filtered list of recipes based on its name or ingredients.
//based on what is searched for in the search bar only
*/
