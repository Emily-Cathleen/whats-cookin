const Ingredient = require("../src/classes/Ingredient.js");

const expect = require("chai").expect;

describe("Ingredient", () => {
  let ingredient;
  beforeEach(() => {
    // ingredient = new Ingredient;
    ingredient = new Ingredient(20081, "wheat flour", 142);
  });
  it("should be a function", () => {
    expect(Ingredient).to.be.a("function");
  });

  it("should be an instance of Ingredient", () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient)
  });

  it("should have an id", () => {
    expect(ingredient.id).to.equal(20081);
  });

  it("should have a name", () => {
    expect(ingredient.name).to.equal("wheat flour")
  });

  it("should have an estimated cost in centers", () => {
    expect(ingredient.estimatedCostInCents).to.equal(142)
  });
});

module.exports = Ingredient;
