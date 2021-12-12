import { expect } from "chai";
import Cookbook from "../src/classes/Cookbook";
const Recipe = require("../src/classes/Recipe.js");
const Ingredient = require("../src/classes/Ingredient.js");

describe("Cookbook", () => {
  let cookbook;
  let cookbook2;
  let recipe1;
  let recipe2;
  let recipe3;
  let ingredient1;
  let ingredient2;
  let ingredient3;
  let ingredient4;
  

  beforeEach(() => {
    ingredient1 = new Ingredient({
      id: 20081,
      name: "wheat flour",
      estimatedCostInCents: 142,
      quantity: { amount: 1.5, unit: "c" },
    });
    ingredient2 = new Ingredient({
      id: 18372,
      name: "bicarbonate of soda",
      estimatedCostInCents: 582,
      quantity: { amount: 0.5, unit: "tsp" },
    });
    ingredient3 = new Ingredient({
      id: 9079,
      name: "dried cranberries",
      estimatedCostInCents: 921,
      quantity: { amount: 1.5, unit: "c" },
    });
    ingredient4 = new Ingredient({
      id: 11821,
      name: "red sweet peppers",
      estimatedCostInCents: 1027,
      quantity: { amount: 1, unit: "pepper" },
    });
    recipe1 = new Recipe(
      456,
      "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      [ingredient1, ingredient2],
      [
        {
          instruction:
            "In a large bowl, whisk together the ingredients and bake at 350",
          number: 2,
        },
      ],
      "Chocolate Cake",
      ["dessert", "chocolate", "snack"]
    );
    recipe2 = new Recipe(
      789,
      "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      [ingredient3, ingredient4],
      [
        {
          instruction: "Fry on stove",
          number: 3,
        },
      ],
      "Steak",
      ["dinner", "main course"]
    );
    recipe3 = new Recipe(
      112,
      "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      [ingredient2, ingredient3],
      [
        {
          instruction: "Bake at 435",
          number: 4,
        },
      ],
      "Banana Bread Cake",
      ["snack", "appetizer"]
    );
    cookbook = new Cookbook([recipe1, recipe2, recipe3]);
    cookbook2 = new Cookbook([undefined]);
  });
  it("Should be a function", () => {
    expect(Cookbook).to.be.a("function");
  });

  it("should be an instance of Cookbook", () => {
    expect(cookbook).to.be.an.instanceOf(Cookbook);
  });

  it("should have recipes", () => {
    expect(cookbook.recipes).to.deep.equal([recipe1, recipe2, recipe3]);
    expect(cookbook2.recipes).to.deep.equal([undefined]);
  });

  it("should return a list of recipes corresponding to selected tags", () => {
    expect(cookbook.filterTags(["snack", "chocolate"])).to.deep.equal([
      recipe1,
    ]);
  });

  it("should return a list of recipes corresponding to searched ingredient and name", () => {
    expect(
      cookbook.filteredRecipes("dried cranberries", "banana")
    ).to.deep.equal([recipe3]);
  });
});
