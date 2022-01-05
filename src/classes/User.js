const Recipe = require("../classes/Recipe.js");

class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  getFirstName() {
    const firstName = this.name.split(" ");
    return firstName[0];
  }

  addFavoriteRecipe(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  addRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    }
  }

  removeRecipeFromFavorites(recipe) {
    this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1);
  }

  removeRecipesToBeCooked(recipe) {
    this.recipesToCook.splice(this.recipesToCook.indexOf(recipe), 1);
  }

  filterTags(tags) {
    return this.favoriteRecipes.filter((recipe) => {
      return tags.every((tag) => recipe.tags.includes(tag));
    });
  }

  filterByNameAndIngredient(searchedName, searchedIngredient) {
    const filteredIngredient = this.favoriteRecipes.filter((recipe) => {
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

checkPantry(recipe) {
  const comparedIngredients = [];
  recipe.ingredients.forEach(recipeIngredient => {
    this.pantry.forEach(userPantryIngredient => {
      if (recipeIngredient.id === userPantryIngredient.ingredient && userPantryIngredient.amount >= recipeIngredient.amount) {
        comparedIngredients.push(recipeIngredient.id)
      }
    });
  });
  return recipe.ingredients.length === comparedIngredients.length
}

returnNeededIngredients(recipe) {
  const result = recipe.ingredients.reduce((neededIngredients, recipeIngredient) => {
    this.pantry.forEach(userPantryIngredient => {
      if(recipe.ingredients){

      }

    })
    return neededIngredients
  }, {})
  return result
}

};

module.exports = User;
