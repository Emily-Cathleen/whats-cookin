const Recipe = require("../src/classes/Recipe.js");
const expect = require("chai").expect;

describe("Recipe", () => {
  let recipe;
  //   let id;
  //   let image;
  //   let ingredients;
  //   let instructions;
  //   let name;
  //   let tags;
  beforeEach(() => {
    recipe = new Recipe(
      123,
      "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      [
        { id: 20081, quantity: { amount: 1.5, unit: "c" } },
        { id: 18372, quantity: { amount: 0.5, unit: "tsp" } },
      ],
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
  });
  it("should be a function", () => {
    expect(Recipe).to.be.a("function");
  });

  it("should be an instance of Recipe", () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it("should have an id", () => {
    expect(recipe.id).to.equal(123);
  });
  it("should have an image", () => {
    expect(recipe.image).to.equal(
      "https://spoonacular.com/recipeImages/595736-556x370.jpg"
    );
  });
  it("should have some ingredients", () => {
    expect(recipe.ingredients).to.deep.equal([
      { id: 20081, quantity: { amount: 1.5, unit: "c" } },
      { id: 18372, quantity: { amount: 0.5, unit: "tsp" } },
    ]);
  });
  it("should have some instructions", () => {
    expect(recipe.instructions).to.deep.equal([
      {
        instruction:
          "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        number: 1,
      },
    ]);
  });
  it("should have a name", () => {
    expect(recipe.name).to.equal("Eggs");
  });
  it("should have tags", () => {
    expect(recipe.tags).to.deep.equal(["breakfast", "dairy"]);
  });
  it("should be able to determine required ingredients", () => {
    expect(recipe.determineIngredients()).to.deep.equal([
      { id: 20081, quantity: { amount: 1.5, unit: "c" } },
      { id: 18372, quantity: { amount: 0.5, unit: "tsp" } },
    ]);
  });
  it("should be able to get cost of ingredients", () => {
    expect(recipe.getCostOfIngredients()).to.equal(504);
  });
});
