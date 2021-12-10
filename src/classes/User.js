import Cookbook from "../src/classes/Cookbook";
const Recipe = require("../src/classes/Recipe.js");
const Ingredient = require("../src/classes/Ingredient.js");
const User = require("../src/classes/User.js");

class User {
  constructor(user) {
    this.user = user;
    this.recipesToCook = [];
    //or should it just be this.recipesToCook = recipesToCook;
    this.favoriteRecipes = [];
    //or should it just be this.favoriteRecipes = favoriteRecipes;
  }

  filterFavoriteTags(selectedTags) {
    const filteredRecipesByTag = this.favoriteRecipes.filter((recipe) => {
      return selectedTags.every((selectedTag) =>
        recipe.tags.includes(selectedTag)
      );
    });
    return filteredRecipesByTag;
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
