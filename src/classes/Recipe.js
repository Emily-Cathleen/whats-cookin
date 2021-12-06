class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image || "";
    this.ingredients = ingredients || [];
    this.instructions = instructions || [];
    this.name = name || "";
    this.tags = tags || [];
  }
  determineIngredients() {
    return this.ingredients;
  }
  getCostOfIngredients() {}
  getInstructions() {}
}

export default Recipe;
