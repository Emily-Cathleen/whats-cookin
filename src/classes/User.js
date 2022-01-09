const Recipe = require("../classes/Recipe.js");

class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.neededIngredients = [];
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
    return this.returnNeededIngredients(recipe).length === 0;
  }

  returnNeededIngredients(recipe) {
    const result = recipe.ingredients.reduce(
      (neededIngredients, recipeIngredient) => {
        const inc = this.pantry.find((ingredient) => {
          return recipeIngredient.id === ingredient.ingredient;
        });
        if (!inc) {
          neededIngredients.push({
            id: recipeIngredient.id,
            name: recipeIngredient.name,
            difference: recipeIngredient.amount,
            unit: recipeIngredient.unit,
          });
        } else if (inc && recipeIngredient.amount > inc.amount) {
          neededIngredients.push({
            id: recipeIngredient.id,
            name: recipeIngredient.name,
            difference: recipeIngredient.amount - inc.amount,
            unit: recipeIngredient.unit,
          });
        }
        return neededIngredients;
      },
      []
    );
    this.neededIngredients = result;
    return result;
  }

  buyMissingIngredients(neededIngredients) {
    neededIngredients.forEach((ingredient) => {
      const pantryIng = this.pantry.find(
        (pantryIngredient) => pantryIngredient.ingredient === ingredient.id
      );
      if (!pantryIng) {
        this.pantry.push({
          ingredient: ingredient.id,
          amount: ingredient.difference,
        });
      } else {
        pantryIng.amount += ingredient.difference;
      }
    });
  }

  subtractUsedIngredients(recipe) {
    recipe.ingredients.forEach((ingredient) => {
      const pantryIng = this.pantry.find(
        (pantryIngredient) => pantryIngredient.ingredient === ingredient.id
      );
      console.log("pantry ing", pantryIng);
      pantryIng.amount -= ingredient.amount;
      console.log("secondlog", pantryIng);
      if (pantryIng.amount === 0) {
        this.pantry = this.pantry.filter(
          (ingredient) => ingredient !== pantryIng
        );
      }
    });
  }
}

module.exports = User;
