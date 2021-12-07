import { expect } from 'chai';
import Cookbook from '../src/classes/Cookbook';
const Recipe = require("../src/classes/Recipe.js");


describe('Cookbook', () => {
let cookbook;
let recipe1;
let recipe2;
let recipe3;

beforeEach(() => {
  recipe1 = new Recipe(
    456,
    "https://spoonacular.com/recipeImages/595736-556x370.jpg",
    [
      { id: 22027, quantity: { amount: 1, unit: "c" } },
      { id: 12941, quantity: { amount: 2.5, unit: "tsp" } },
    ],
    [
      {
        instruction:
          "In a large bowl, whisk together the ingredients and bake at 350",
        number: 2,
      },
    ],
    "Chocolate Cake",
    ["dessert", "chocolate"]
  );
  recipe2 = new Recipe(
    789,
    "https://spoonacular.com/recipeImages/595736-556x370.jpg",
    [
      { id: 12921, quantity: { amount: 11, unit: "c" } },
      { id: 65645, quantity: { amount: 0.5, unit: "c" } },
    ],
    [
      {
        instruction:
          "Fry on stove",
        number: 3,
      },
    ],
    "Steak",
    ["dinner", "main course"]
  );
  recipe3 = new Recipe(
    112,
    "https://spoonacular.com/recipeImages/595736-556x370.jpg",
    [
      { id: 12908, quantity: { amount: 9, unit: "c" } },
      { id: 12145, quantity: { amount: 5, unit: "tbsp" } },
    ],
    [
      {
        instruction:
          "Bake at 435",
        number: 4,
      },
    ],
    "Bread",
    ["snack", "appetizer"]
  );
});
  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });
})
