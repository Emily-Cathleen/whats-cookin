class User {
  constructor(user) {
    this.user = user;
    this.recipesToCook = [];
    //or should it just be this.recipesToCook = recipesToCook;
    this.favoriteRecipes = [];
    //or should it just be this.favoriteRecipes = favoriteRecipes;
  }
}

module.exports = User;

// Iteration 2 - Users
// User Data
// Create classes and methods that can:
//
// Allow a user to favorite or unfavorite recipes (add to / remove from the user’s favoriteRecipes)
// Decide to cook a recipe that week (add to my recipesToCook)
// Filter my favoriteRecipes by one or more tags.
// Filter my favoriteRecipes by its name or ingredients.
