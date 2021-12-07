class Ingredient {
  constructor(id, name, estimatedCostInCents) {
    this.id = id;
    this.name = name;
    this.estimatedCostInCents = estimatedCostInCents;
  }
}

module.exports = Ingredient;

/* This class is helping bridge the gap between
our recipe class (and the ingredients passed in),
and our ingredient dataset (so that we can access cost of ingredient)
*/
