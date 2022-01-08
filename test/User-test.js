import { expect } from "chai";
import Cookbook from "../src/classes/Cookbook.js";
const Recipe = require("../src/classes/Recipe.js");
const Ingredient = require("../src/classes/Ingredient.js");
const User = require("../src/classes/User.js");

describe("User", () => {
  let user1;
  let user2;
  let ingredient1;
  let ingredient2;
  let ingredient3;
  let recipe1;
  let recipe2;
  let recipe3;

  beforeEach(() => {
    user1 = new User({
      name: "Saige O'Kon",
      id: 1,
      pantry: [
        { ingredient: 11297, amount: 15 },
        { ingredient: 1082047, amount: 15 },
        { ingredient: 20081, amount: 15 },
        { ingredient: 18372, amount: 15 },
      ],
    });
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
      [ingredient1, ingredient2],
      [
        {
          instruction: "Fry on stove",
          number: 3,
        },
      ],
      "Steak",
      ["dinner", "main course"]
    );
    user2 = new User({
      id: 2,
    });
    recipe3 = new Recipe(
      490,
      "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      [ingredient1, ingredient3],
      [
        {
          instruction:
            "In a large bowl, whisk together the ingredients and bake at 350",
          number: 6,
        },
      ],
      "Chocolate Cake",
      ["dessert", "chocolate", "snack"]
    );
  });

  it("Should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("should be an instance of User", () => {
    expect(user1).to.be.an.instanceOf(User);
  });

  it("should have a name", () => {
    expect(user1.name).to.equal("Saige O'Kon");
    expect(user2.name).to.equal(undefined);
  });

  it("should have a first name", () => {
    expect(user1.getFirstName()).to.equal("Saige");
  });

  it("should have an id", () => {
    expect(user1.id).to.equal(1);
  });

  it("should have a pantry", () => {
    expect(user1.pantry).to.deep.equal([
      { ingredient: 11297, amount: 15 },
      { ingredient: 1082047, amount: 15 },
      { ingredient: 20081, amount: 15 },
      { ingredient: 18372, amount: 15 },
    ]);
    expect(user2.pantry).to.deep.equal(undefined);
  });

  it("should start with zero favorite recipes", () => {
    expect(user1.favoriteRecipes).to.deep.equal([]);
  });

  it("should be able to add a recipe to favorite recipes", () => {
    user1.addFavoriteRecipe(recipe1);
    expect(user1.favoriteRecipes).to.deep.equal([recipe1]);
    expect(user2.favoriteRecipes).to.deep.equal([]);
  });

  it("should start with zero recipes to cook", () => {
    expect(user1.recipesToCook).to.deep.equal([]);
  });

  it("should be able to add a recipe to recipes to cook", () => {
    user1.addRecipesToCook(recipe1);
    expect(user1.recipesToCook).to.deep.equal([recipe1]);
  });

  it("should be able to remove a recipe from favorites", () => {
    user1.addFavoriteRecipe(recipe1);
    user1.addFavoriteRecipe(recipe2);
    user1.removeRecipeFromFavorites(recipe1);
    expect(user1.favoriteRecipes).to.deep.equal([recipe2]);
  });

  it("should be able to remove a recipe from recipes from cook list", () => {
    user1.addRecipesToCook(recipe1);
    user1.addRecipesToCook(recipe2);
    user1.removeRecipesToBeCooked(recipe1);
    expect(user1.recipesToCook).to.deep.equal([recipe2]);
  });

  it("should be able to filter favorite recipes by one or more tags", () => {
    user1.addFavoriteRecipe(recipe1);
    user1.addFavoriteRecipe(recipe2);
    expect(user1.filterTags(["dessert", "snack"])).to.deep.equal([recipe1]);
  });

  it("should be able to filter favorite recipes by ingredient name", () => {
    user1.addFavoriteRecipe(recipe1);
    user1.addFavoriteRecipe(recipe2);
    expect(user1.filterByNameAndIngredient("", "wheat flour")).to.deep.equal([
      recipe1,
      recipe2,
    ]);
  });

  it("should be able to filter favorite recipes by name", () => {
    user1.addFavoriteRecipe(recipe1);
    user1.addFavoriteRecipe(recipe2);
    expect(user1.filterByNameAndIngredient("steak", "")).to.deep.equal([
      recipe2,
    ]);
  });

  it("should compare ingredients in recipe with with ingedients in user pantry", () => {
    expect(user1.checkPantry(recipe1)).to.equal(true);
  });

  it("should return missing ingredients for a recipe", () => {
    expect(user1.returnNeededIngredients(recipe1)).to.deep.equal([]);
  });
  // Add test to show missing ingredients
});
