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

module.exports = Ingredient;

/* This class is helping bridge the gap between
our recipe class (and the ingredients passed in),
and our ingredient dataset (so that we can access cost of ingredient)
*/
