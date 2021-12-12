import "./styles.css";
import { recipeData } from "./data/recipes.js";
import { ingredientsData } from "./data/ingredients.js";
import { userData } from "./data/users.js";
import Ingredient from "./classes/Ingredient.js";
import apiCalls from "./apiCalls";
import Cookbook from "./classes/Cookbook.js";
import Recipe from "./classes/Recipe.js";
import User from "./classes/User.js";

/* QUERY SELECTORS */

const recipeTitle = document.querySelector("#openRecipe");
const homePage = document.querySelector(".home-page");
const recipeView = document.querySelector(".recipe-view");
const homeButton = document.querySelector(".home-button");
const favoriteRecipesPageButton = document.querySelector(
  ".favorite-recipes-page-button"
);
const recipesToCookButton = document.querySelector(".recipes-to-cook-button");
const recipeCard = document.querySelector(".recipe-card");
const filterBar = document.querySelector(".filter-bar");
const nameSearchInput = document.querySelector("#nameSearchInput");
const ingredientSearchInput = document.querySelector("#ingredientSearchInput");
const tagsDropDown = document.querySelector("#tags");
const favoriteRecipePage = document.querySelector(".favorite-recipe-page");
const favoriteButtons = document.querySelectorAll(".favorite-button");
const recipesToCookPage = document.querySelector(".recipes-to-cook-page");

const hidableElements = [
  homePage,
  recipeView,
  homeButton,
  favoriteRecipesPageButton,
  favoriteRecipePage,
  recipesToCookPage,
  recipesToCookButton,
];
function displayElements(elementsToDisplay) {
  elementsToDisplay.forEach(removeHidden);
  hidableElements
    .filter((element) => !elementsToDisplay.includes(element))
    .forEach(addHidden);
}

const user = new User(
  "Franny",
  2,
  [
    {
      ingredient: 11297,
      amount: 4,
    },
    {
      ingredient: 1082047,
      amount: 10,
    },
  ],
  [],
  []
);

/* Event Listeners */

homeButton.addEventListener("click", returnHome);
tagsDropDown.addEventListener("change", filterByTags);
recipesToCookButton.addEventListener("click", showRecipesToCookPage);

function getCookbookRecipes() {
  if (nameSearchInput.value || ingredientSearchInput.value) {
    const ingredientInput = ingredientSearchInput.value;
    const nameInput = nameSearchInput.value;
    return cookbook.filteredRecipes(ingredientInput, nameInput);
  } else if (tagsDropDown.value !== "none") {
    const tagInput = tagsDropDown.value;
    //written this way in case we want to try multiple tags at once in future. Should still work with dropdown
    return cookbook.filterTags(tagInput.split(",").map((tag) => tag.trim()));
  } else {
    return cookbook.recipes;
  }
}

function getUserRecipes() {
  if (nameSearchInput.value || ingredientSearchInput.value) {
    const ingredientInput = ingredientSearchInput.value;
    const nameInput = nameSearchInput.value;
    return user.filterByNameAndIngredient(nameInput, ingredientInput);
  } else if (tagsDropDown.value !== "none") {
    const tagInput = tagsDropDown.value;
    return user.filterTags(tagInput.split(",").map((tag) => tag.trim()));
  } else {
    return user.favoriteRecipes;
  }
}

function getRecipesToCook() {
  return user.recipesToCook;
}

function renderRecipePages() {
  populateRecipes(homePage, getCookbookRecipes);
  populateRecipes(favoriteRecipePage, getUserRecipes);
  populateRecipes(recipesToCookPage, getRecipesToCook);
}

function searchRecipes() {
  tagsDropDown.value = "none";
  renderRecipePages();
}

nameSearchInput.addEventListener("input", searchRecipes);
ingredientSearchInput.addEventListener("input", searchRecipes);

function filterByTags() {
  nameSearchInput.value = "";
  ingredientSearchInput.value = "";
  renderRecipePages();
}

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
  displayElements([
    recipeView,
    homeButton,
    favoriteRecipesPageButton,
    recipesToCookButton,
  ]);
  showRecipeCard(selectedRecipe);
}

function returnHome() {
  displayElements([homePage, favoriteRecipesPageButton, recipesToCookButton]);
  renderRecipePages();
}

function populateRecipes(element, getRecipes) {
  const recipes = getRecipes();
  element.innerHTML = recipes
    .map((recipe) => {
      const isFavorite = user.favoriteRecipes.includes(recipe);
      return `
    <article class="recipe-card">
        <img class="" src="${recipe.image}" alt="Image of ${
        recipe.name
      }" width=400>
        <h1 class="recipe-title" data-recipe-id="${recipe.id}">${
        recipe.name
      }</h1>
        <div>
          <button class="fav-button-${recipe.id}">${
        isFavorite ? "Remove from " : "Add to "
      }Favorites</button>
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
  recipes.forEach((recipe) => {
    const favButton = document.querySelectorAll(`.fav-button-${recipe.id}`);
    favButton.forEach((button) => {
      button.addEventListener(
        "click",
        clickFavoriteButton(recipe, getRecipes, element)
      );
    });
  });
}
renderRecipePages();

function showRecipeCard(selectedRecipe) {
  const isFavorite = user.favoriteRecipes.includes(selectedRecipe);
  const inRecipesToCook = user.recipesToCook.includes(selectedRecipe);
  recipeView.innerHTML = `
    <div>
      <img class="recipe-image" id="" src="${selectedRecipe.image}" alt="${
    selectedRecipe.name
  }">
      <button class="favorite-button">${
        isFavorite ? "Unf" : "F"
      }avorite</button>
      <button class="add-to-recipes-to-cook-button" ${
        inRecipesToCook ? "disabled" : ""
      }>${
    inRecipesToCook ? "Already in List" : "Add to Recipes to Cook"
  }</button>
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
      </div>
      </section>`;
  document
    .querySelector(".favorite-button")
    .addEventListener("click", (event) => {
      clickFavoriteButton(selectedRecipe)();
      showRecipeCard(selectedRecipe);
    });
  document
    .querySelector(".add-to-recipes-to-cook-button")
    .addEventListener("click", () => {
      user.addRecipesToCook(selectedRecipe);
      renderRecipePages();
      showRecipeCard(selectedRecipe);
    });
}

function showFavoritesPage() {
  displayElements([favoriteRecipePage, homeButton, recipesToCookButton]);
  renderRecipePages();
}

function showRecipesToCookPage() {
  displayElements([recipesToCookPage, homeButton, favoriteRecipesPageButton]);
  renderRecipePages();
}

function clickFavoriteButton(recipe) {
  return () => {
    const isFavorite = user.favoriteRecipes.includes(recipe);
    if (isFavorite) {
      user.removeRecipeFromFavorites(recipe);
    } else {
      user.addFavoriteRecipe(recipe);
    }
    renderRecipePages();
  };
}

favoriteRecipesPageButton.addEventListener("click", showFavoritesPage);
