const Pantry = require("../src/classes/Pantry.js");
const User = require("../src/classes/User.js");
const Recipe = require("../src/classes/Recipe.js");
const Ingredient = require("../src/classes/Ingredient.js");

const expect = require("chai").expect;

describe("Pantry", () => {
  let user1;
  let pantry1;
  let ingredient1;
  let ingredient2;
  let ingredientList;
  beforeEach(() => {
    user1 = new User({
      name: "Saige O'Kon",
      id: 1,
      pantry: [
        { ingredient: 11297, amount: 4 },
        { ingredient: 20081, amount: 5 },
      ],
    });
    ingredient1 = new Ingredient({
      id: 20081,
      name: "wheat flour",
      estimatedCostInCents: 142,
      quantity: { amount: 1.5, unit: "c" },
    });
    ingredient2 = new Ingredient({
      id: 11297,
      name: "flat leaf parsley leaves",
      estimatedCostInCents: 1030,
      quantity: { amount: 2, unit: "leaves" },
    });
    ingredientList = [ingredient1, ingredient2];
    pantry1 = new Pantry(user1.pantry, ingredientList);
  });
  it("should be a function", () => {
    expect(Pantry).to.be.a("function");
  });

  it("should be an instance of Pantry", () => {
    expect(pantry1).to.be.an.instanceOf(Pantry);
  });
});
