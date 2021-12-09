import "./styles.css";
import { recipeData } from "./data/recipes.js";
import { ingredientsData } from "./data/ingredients.js";
import Ingredient from "./classes/Ingredient.js";
import apiCalls from "./apiCalls";
import Cookbook from "./classes/Cookbook.js";
import Recipe from "./classes/Recipe.js";

/* QUERY SELECTORS */

const recipeTitle = document.querySelector("#openRecipe");
const homePage = document.querySelector(".home-page");
const recipeView = document.querySelector(".recipe-view");
const homeButton = document.querySelector(".home-button");
const savedRecipesButton = document.querySelector(".saved-recipes-button");
const shoppingListButton = document.querySelector(".shopping-list-button");
const recipeCard = document.querySelector(".recipe-card");
const searchBar = document.querySelector(".search-bar");
const filterBar = document.querySelector(".filter-bar");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector(".search-button");
let cookbook = new Cookbook(recipes);

/* Event Listeners */

homeButton.addEventListener("click", returnHome);

// filterBar.addEventListener("keyup", filterRecipes);

function searchRecipes(event) {
  event.preventDefault();
  let currentInput = searchInput.value;
}

searchButton.addEventListener("click", searchRecipes);

// function filterRecipes(event) {
//   let ;
//   if (userInput.value !== "") {
//     userInput = userInput.value;
//   }
//   console.log(userInput);
// }

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

function returnHome() {
  addHidden(homeButton);
  removeHidden(homePage);
  addHidden(recipeView);
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
          <button class="${recipe.name}-fav-button">Favorite Button</button>
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
      <h1 class="">Ingredients</h1>
      <ul>
      ${selectedRecipe.ingredients
        .map(({ name, amount, unit }) => {
          return `<li>${amount} ${unit} ${name}</li>`;
        })
        .join("")}
      </ul>
      </div>
      <div>
        <h3>Total Cost of Ingredients: $${(
          selectedRecipe.getCostOfIngredients() / 100
        ).toFixed(2)}</h3>
      </div>
      <div>
        <h1 class="">Recipe Instructions</h1>
        ${selectedRecipe.instructions
          .map(({ number, instruction }) => {
            return `<p>${number}. ${instruction}</p>`;
          })
          .join("")}
      </div>`;
}

console.log("Hello world");
