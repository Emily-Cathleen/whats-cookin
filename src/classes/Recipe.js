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
    return this.ingredients.map((ingredient) => {
      return ingredient.name;
    });
  }
  getCostOfIngredients() {
    const totalCost = this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.calculateCost();
    }, 0);
    return totalCost;
  }
  getInstructions() {
    return this.instructions;
  }
}

export default Recipe;
