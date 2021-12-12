const Recipe = require("../src/classes/Recipe.js");
const Ingredient = require("../src/classes/Ingredient.js");

const expect = require("chai").expect;

describe("Recipe", () => {
  let recipe1;
  let recipe2;
  let ingredient1;
  let ingredient2;
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

    recipe1 = new Recipe(
      123,
      "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      [ingredient1, ingredient2],
      [
        {
          instruction:
            "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          number: 1,
        },
      ],
      "Eggs",
      ["breakfast", "dairy"]
    );
    recipe2 = new Recipe(
      545,
      "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      [ingredient1, ingredient2],
      [
        {
          instruction:
            "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          number: 2,
        },
      ],
      "Waffles"
    );
  });
  it("should be a function", () => {
    expect(Recipe).to.be.a("function");
  });

  it("should be an instance of Recipe", () => {
    expect(recipe1).to.be.an.instanceOf(Recipe);
  });

  it("should have an id", () => {
    expect(recipe1.id).to.equal(123);
  });

  it("should have an image", () => {
    expect(recipe1.image).to.equal(
      "https://spoonacular.com/recipeImages/595736-556x370.jpg"
    );
  });

  it("should have some ingredients", () => {
    expect(recipe1.ingredients).to.deep.equal([ingredient1, ingredient2]);
  });
  it("should have some instructions", () => {
    expect(recipe1.instructions).to.deep.equal([
      {
        instruction:
          "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        number: 1,
      },
    ]);
  });

  it("should have a name", () => {
    expect(recipe1.name).to.equal("Eggs");
  });
  it("should have tags", () => {
    expect(recipe1.tags).to.deep.equal(["breakfast", "dairy"]);
    expect(recipe2.tags).to.deep.equal(undefined);
  });

  it("should be able to determine required ingredients", () => {
    expect(recipe1.determineIngredients()).to.deep.equal([
      "wheat flour",
      "bicarbonate of soda",
    ]);
  });

  it("should be able to get cost of ingredients", () => {
    expect(recipe1.getCostOfIngredients()).to.equal(504);
  });
  it("should be able to return a recipe's instructions", () => {
    expect(recipe1.getInstructions()).to.deep.equal([
      {
        instruction:
          "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        number: 1,
      },
    ]);
  });
});
