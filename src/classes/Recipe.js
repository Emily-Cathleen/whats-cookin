const Ingredient = require("../src/data/ingredients.js");

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }
  determineIngredients() {
    return this.ingredients;
  }
  getCostOfIngredients() {
    // this.ingredients.estimatedCostInCents * this.ingredients.quantity["amount"];
    // get cost of each ingredient (estimatedCostInCents * amount)
    // add all ingredients final costs together
    // return total cost for recipe
  }
  getInstructions() {}
}

module.exports = Recipe;
