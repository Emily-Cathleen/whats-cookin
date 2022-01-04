const Pantry = require("../src/classes/Pantry.js");
const Recipe = require("../src/classes/Recipe.js");

const expect = require("chai").expect;

describe("Pantry", () => {
  let pantry1;
  let ingredient1;
  let ingredient2;
  let ingredientList;
  let pantryList;
  beforeEach(() => {
    pantryList = [
      { ingredient: 11297, amount: 4 },
      { ingredient: 20081, amount: 5 },
    ];
    ingredient1 = {
      id: 20081,
      name: "wheat flour",
      estimatedCostInCents: 142,
    };
    ingredient2 = {
      id: 11297,
      name: "flat leaf parsley leaves",
      estimatedCostInCents: 1030,
    };
    ingredientList = [ingredient1, ingredient2];
    pantry1 = new Pantry(pantryList, ingredientList);
  });
  it("should be a function", () => {
    expect(Pantry).to.be.a("function");
  });

  it("should be an instance of Pantry", () => {
    expect(pantry1).to.be.an.instanceOf(Pantry);
  });
  it("should accept a pantry list", () => {
    expect(pantry1.pantryList).to.deep.equal([
      { ingredient: 11297, amount: 4 },
      { ingredient: 20081, amount: 5 },
    ]);
  });
});
