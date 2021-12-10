import { expect } from "chai";
import Cookbook from "../src/classes/Cookbook.js";
const Recipe = require("../src/classes/Recipe.js");
const Ingredient = require("../src/classes/Ingredient.js");
const User = require("../src/classes/User.js");

describe("User", () => {
  let user;
  let ingredient1;
  let ingredient2;
  let recipe1;
  let recipe2;

    beforeEach(() => {
    user = new User({
        name: "Saige O'Kon",
        id: 1,
        pantry: [
        {ingredient: 11297,
        amount: 4},
        {ingredient: 1082047,
        amount: 10},
        {ingredient: 20081,
        amount: 5}]
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
  });

    it("Should be a function", () => {
      expect(User).to.be.a("function");
    });

    it("should be an instance of User", () => {
      expect(user).to.be.an.instanceOf(User);
    });

    it("should have a name", () => {
      expect(user.name).to.equal("Saige O'Kon")
    });

    it("should have an id", () => {
      expect(user.id).to.equal(1)
    });

    it("should have a pantry", () => {
      expect(user.pantry).to.deep.equal([
      {ingredient: 11297,
      amount: 4},
      {ingredient: 1082047,
      amount: 10},
      {ingredient: 20081,
      amount: 5}])
    });

    it("should start with zero favorite recipes", () => {
      expect(user.favoriteRecipes).to.deep.equal([])
    });

    it("should be able to add a recipe to favorite recipes", () => {
      user.addFavoriteRecipe(recipe1);
      expect(user.favoriteRecipes).to.deep.equal([recipe1])
    });

    it("should start with zero recipes to cook", () => {
      expect(user.recipesToCook).to.deep.equal([])
    });

    it("should be able to add a recipe to recipes to cook", () => {
      user.addRecipesToCook(recipe1);
      expect(user.recipesToCook).to.deep.equal([recipe1])
    })

});
