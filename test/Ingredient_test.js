const Ingredient = require("../src/classes/Ingredient.js");

const expect = require("chai").expect;

describe("Ingredient", () => {
  let ingredient;
  ingredient = new Ingredient;
  beforeEach(() => {
    ingredient = new Ingredient(20081, "wheat flour", 142);
  });
  it("should be a function", () => {
    expect(Ingredent).to.be.a("function");
  });
});
