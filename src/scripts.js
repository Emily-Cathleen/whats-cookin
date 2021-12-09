import "./styles.css";
import { recipeData } from "./data/recipes.js";
import { ingredientsData } from "./data/ingredients.js";
import Ingredient from "./classes/Ingredient.js";
import apiCalls from "./apiCalls";
import Cookbook from "./classes/Cookbook.js";
import Recipe from "./classes/Recipe.js";

const recipeTitle = document.querySelector("#openRecipe");
const homePage = document.querySelector(".home-page");
const recipeView = document.querySelector(".recipe-view");
const homeButton = document.querySelector(".home-button");
const recipeCard = document.querySelector(".recipe-card");

const recipes = recipeData.map(
  ({ id, image, ingredients, instructions, name, tags }) => {
    const ingredientObjects = ingredients.map(({ id, quantity }) => {
      const { name, estimatedCostInCents } = ingredientsData.find(
        (ingredientData) => ingredientData.id === id
      );
      return new Ingredient({ id, name, estimatedCostInCents, quantity });
    });
    return new Recipe(id, image, ingredientObjects, instructions, name, tags);
  }
);

let cookbook = new Cookbook(recipes);
// console.log(cookbook.filterTags(["snack"]));

function addHidden(element) {
  element.classList.add("hidden");
}

function removeHidden(element) {
  element.classList.remove("hidden");
}

function displayRecipeView(selectedRecipe) {
  addHidden(homePage);
  removeHidden(recipeView);
  removeHidden(homeButton);
  showRecipeCard(selectedRecipe);
}

function populateRecipes() {
  homePage.innerHTML = cookbook.recipes
    .map((recipe) => {
      return `
    <article class="recipe-card">
        <img class="" src="${recipe.image}" alt="Image of ${
        recipe.name
      }" width=400>
        <h1 class="recipe-title" data-recipe-id="${recipe.id}">${
        recipe.name
      }</h1>
        <div>
          <button class="">Favorite Button</button>
          <p>Tags: ${recipe.tags.join(", ")}</p>
        </div>
      </article>`;
    })
    .join("");
  document.querySelectorAll(".recipe-title").forEach((recipeTitle) => {
    recipeTitle.addEventListener("click", (event) => {
      const recipeId = parseInt(event.target.dataset.recipeId);
      const selectedRecipe = recipes.find(({ id }) => id === recipeId);
      displayRecipeView(selectedRecipe);
    });
  });
}
populateRecipes();

function showRecipeCard(selectedRecipe) {
  recipeView.innerHTML = `<div>
      <img class="" id="" src="${selectedRecipe.image}" alt="">
      <button class="">Favorite Button</button>
      <button class="">Add to Shopping Cart</button>
    </div>
    <section>
      <div>
        <h1 class="">${selectedRecipe.name}</h1>
      </div>
      <div>
        <h1 class="">Recipe Instructions</h1>
        <p>${selectedRecipe.instructions.map((instruction) => {
          return "";
        })}
      </div>`;
}

console.log("Hello world");
