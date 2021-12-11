const Ingredient = require("../src/classes/Ingredient.js");

const expect = require("chai").expect;

describe("Ingredient", () => {
  let ingredient;
  beforeEach(() => {
    ingredient = new Ingredient({
      id: 20081,
      name: "wheat flour",
      estimatedCostInCents: 142,
      quantity: { amount: 2, unit: "tsp" },
    });
  });
  it("should be a function", () => {
    expect(Ingredient).to.be.a("function");
  });

  it("should be an instance of Ingredient", () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it("should have an id", () => {
    expect(ingredient.id).to.equal(20081);
  });

  it("should have a name", () => {
    expect(ingredient.name).to.equal("wheat flour");
  });

  it("should have an estimated cost in cents", () => {
    expect(ingredient.estimatedCostInCents).to.equal(142);
  });

  it("should be ale to calculate ingredient cost", () => {
    expect(ingredient.calculateCost()).to.equal(284);
  });
});

module.exports = Ingredient;
