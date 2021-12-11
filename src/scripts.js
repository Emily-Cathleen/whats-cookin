import "./styles.css";
import { recipeData } from "./data/recipes.js";
import { ingredientsData } from "./data/ingredients.js";
import { userData } from "./data/users.js"
import Ingredient from "./classes/Ingredient.js";
import apiCalls from "./apiCalls";
import Cookbook from "./classes/Cookbook.js";
import Recipe from "./classes/Recipe.js";
import User from "./classes/User.js"

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

/* Event Listeners */

homeButton.addEventListener("click", returnHome);

// filterBar.addEventListener("keyup", filterRecipes);

function searchRecipes(event) {
  event.preventDefault();
  let input = searchInput.value;
  cookbook.filteredName(input);
  console.log(searchInput.value);
  console.log(cookbook);
}

searchButton.addEventListener("click", searchRecipes);



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
  recipeView.innerHTML = `
    <div>
      <img class="recipe-image" id="" src="${selectedRecipe.image}" alt="">
      <button class="favorite-button">Favorite</button>
      <button class="add-to-cart-button">Add to Cart</button>
    </div>
    <section class="recipe-info">
      <div>
        <h1 class="recipe-title">${selectedRecipe.name}</h1>
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
      </div>;
    </section>`;
};

console.log("Hello world");
