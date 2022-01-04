const Ingredient = require("../src/classes/Ingredient.js");

const expect = require("chai").expect;

describe("Ingredient", () => {
  let ingredient;
  let ingredient2;
  beforeEach(() => {
    ingredient = new Ingredient({
      id: 20081,
      name: "wheat flour",
      estimatedCostInCents: 142,
      quantity: { amount: 2, unit: "tsp" },
    });
    ingredient2 = new Ingredient({
      quantity: { amount: 22, unit: "c" },
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
    expect(ingredient2.id).to.equal(undefined);

  });

  it("should have a name", () => {
    expect(ingredient.name).to.equal("wheat flour");
    expect(ingredient2.name).to.equal(undefined);

  });

  it("should have an estimated cost in cents", () => {
    expect(ingredient.estimatedCostInCents).to.equal(142);
    expect(ingredient2.estimatedCostInCents).to.equal(undefined);
  });

  it("should have an amount", () => {
    expect(ingredient.amount).to.equal(2);
  })

  it("should be ale to calculate ingredient cost", () => {
    expect(ingredient.calculateCost()).to.equal(284);
  });
});

module.exports = Ingredient;
