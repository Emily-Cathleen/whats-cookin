// import Cookbook from "../src/classes/Cookbook";
const Recipe = require("../classes/Recipe.js");
// const Ingredient = require("../src/classes/Ingredient.js");
// const User = require("../src/classes/User.js");

class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.filteredByName = [];
  }

  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  addRecipesToCook(recipe) {
    this.recipesToCook.push(recipe);
  }
};

module.exports = User;

// Iteration 2 - Users
// User Data
// Create classes and methods that can:
//
// Allow a user to favorite or unfavorite recipes (add to / remove from the user’s favoriteRecipes)
// Decide to cook a recipe that week (add to my recipesToCook)
// Filter my favoriteRecipes by one or more tags.
// Filter my favoriteRecipes by its name or ingredients.