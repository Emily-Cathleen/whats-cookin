class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.estimatedCostInCents = ingredient.estimatedCostInCents;
    this.amount = ingredient.quantity.amount;
    this.unit = ingredient.quantity.unit;
  }

  calculateCost() {
    return this.estimatedCostInCents * this.amount;
  }
}

export default Ingredient;
