/* eslint-disable max-len */
import "./styles/index.scss";
// import "./styles.css";
import Ingredient from "./classes/Ingredient.js";
import Cookbook from "./classes/Cookbook.js";
import Recipe from "./classes/Recipe.js";
import User from "./classes/User.js";
import {
  fetchUsers,
  fetchIngredients,
  fetchRecipes,
  updateIngredients,
} from "./apiCalls.js";
import domUpdates from "./domUpdates.js";

/* QUERY SELECTORS */

// const recipeTitle = document.querySelector("#openRecipe");
const homePage = document.querySelector(".home-page");
const recipeView = document.querySelector(".recipe-view");
const homeButton = document.querySelector(".home-button");
const favoriteRecipesPageButton = document.querySelector(
  ".favorite-recipes-page-button"
);
const recipesToCookButton = document.querySelector(".recipes-to-cook-button");
const recipeCard = document.querySelector(".recipe-card");
// const filterBar = document.querySelector(".filter-bar");
const nameSearchInput = document.querySelector("#nameSearchInput");
const ingredientSearchInput = document.querySelector("#ingredientSearchInput");
const tagsDropDown = document.querySelector("#tags");
const favoriteRecipePage = document.querySelector(".favorite-recipe-page");
// const favoriteButtons = document.querySelectorAll(".favorite-button");
const recipesToCookPage = document.querySelector(".recipes-to-cook-page");
const userName = document.querySelector(".user-name");

/* GLOBAL VARIABLES */
const hidableElements = [
  homePage,
  recipeView,
  homeButton,
  favoriteRecipesPageButton,
  favoriteRecipePage,
  recipesToCookPage,
  recipesToCookButton,
];
let user;
let ingredients;
let recipes;
let cookbook;
let usersData;
let ingredientsData;
let recipesData;
let randomUser;

/* FUNCTIONS */
// domUpdates.hide(elementsToDisplay);
function displayElements(elementsToDisplay) {
  elementsToDisplay.forEach(removeHidden);
  hidableElements
    .filter((element) => !elementsToDisplay.includes(element))
    .forEach(addHidden);
}

function loadAPIs() {
  Promise.all([fetchUsers(), fetchIngredients(), fetchRecipes()]).then(
    (data) => {
      usersData = data[0];
      ingredientsData = data[1];
      recipesData = data[2];
      randomUser = Math.floor(Math.random() * usersData.length);
      user = new User(usersData[randomUser]);
      domUpdates.userGreeting(user);
      recipes = recipesData.map(
        ({ id, image, ingredients, instructions, name, tags }) => {
          const ingredientObjects = ingredients.map(({ id, quantity }) => {
            const { name, estimatedCostInCents } = ingredientsData.find(
              (ingredientData) => ingredientData.id === id
            );
            return new Ingredient({ id, name, estimatedCostInCents, quantity });
          });
          return new Recipe(
            id,
            image,
            ingredientObjects,
            instructions,
            name,
            tags
          );
        }
      );
      cookbook = new Cookbook(recipes);
      // REPLACE WITH DOMUPDATES
      renderRecipePages();
    }
  );
}

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

function filterByTags() {
  nameSearchInput.value = "";
  ingredientSearchInput.value = "";
  renderRecipePages();
}
function displayRecipeView(selectedRecipe) {
  // domUpdates.show(recipeView, homeButton, favoriteRecipesPageButton, recipesToCookButton)
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
// REPLACE WITH DOMUPDATES
function populateRecipes(element, getRecipes) {
  const recipes = getRecipes();
  element.innerHTML = recipes
    .map((recipe) => {
      const isFavorite = user.favoriteRecipes.includes(recipe);
      return `
      <article class="recipe-card recipe-title" data-recipe-id='${recipe.id}'>
        <img class="recipe-image" data-recipe-id='${recipe.id}' src="${
        recipe.image
      }" alt="Image of ${recipe.name}" width=400>
        <h1 class="recipe-title" data-recipe-id="${recipe.id}">${
        recipe.name
      }</h1>
        <div>
          <button class="fav-button-${recipe.id}">${
        isFavorite ? "Remove from " : "Add to "
      }Favorites</button>
          <p data-recipe-id="${recipe.id}">Tags: ${recipe.tags.join(", ")}</p>
        </div>
      </article>`;
    })
    .join("");
  element.querySelectorAll(".recipe-card").forEach((recipeCard) => {
    recipeCard.addEventListener("click", (event) => {
      const recipeId = parseInt(event.target.dataset.recipeId);

      const selectedRecipe = recipes.find(({ id }) => id === recipeId);
      if (selectedRecipe) {
        displayRecipeView(selectedRecipe);
      }
    });
  });
  recipes.forEach((recipe) => {
    const favButton = element.querySelectorAll(`.fav-button-${recipe.id}`);
    favButton.forEach((button) => {
      button.addEventListener("click", clickFavoriteButton(recipe));
    });
  });
}

function createButton(classList, text, disabled = false) {
  const button = document.createElement("button");
  classList.forEach((className) => {
    button.classList.add(className);
  });
  button.innerText = text;
  button.disabled = disabled;
  return button;
}

function createRecipeInfoSection(selectedRecipe) {
  const section = document.createElement("section");
  section.classList.add("recipe-info");

  const titleDiv = document.createElement("div");
  const titleH1 = document.createElement("h1");
  titleH1.classList.add("recipe-title");
  titleH1.innerText = selectedRecipe.name;
  titleDiv.appendChild(titleH1);
  section.appendChild(titleDiv);

  const ingredientsDiv = document.createElement("div");
  const ingredientsUl = document.createElement("ul");
  selectedRecipe.ingredients.forEach(({ name, amount, unit }) => {
    const ingredientLi = document.createElement("li");
    ingredientLi.innerText = `${amount} ${unit} ${name}`;
    ingredientsUl.appendChild(ingredientLi);
  });
  ingredientsDiv.appendChild(ingredientsUl);
  section.appendChild(ingredientsDiv);

  const costDiv = document.createElement("div");
  const costH3 = document.createElement("h3");
  costH3.innerText = `Total Cost of Ingredients: $${(
    selectedRecipe.getCostOfIngredients() / 100
  ).toFixed(2)}`;
  costDiv.appendChild(costH3);
  section.appendChild(costDiv);

  const neededIngredientsDiv = document.createElement("div");
  neededIngredientsDiv.classList.add("needed-ingredients");
  const missingIngredientsHeader = document.createElement("h3");
  missingIngredientsHeader.innerText = "Missing Ingredients:";
  neededIngredientsDiv.appendChild(missingIngredientsHeader);
  if (user.checkPantry(selectedRecipe)) {
    const p = document.createElement("p");
    p.innerText = "You're ready to cook!";
    neededIngredientsDiv.appendChild(p);
  } else {
    const missingList = document.createElement("ul");
    user.returnNeededIngredients(selectedRecipe).forEach((ingredient) => {
      const li = document.createElement("li");
      li.innerText = `${ingredient.difference} ${ingredient.unit} ${ingredient.name}`;
      missingList.appendChild(li);
    });
    neededIngredientsDiv.appendChild(missingList);
  }
  section.appendChild(neededIngredientsDiv);

  const instructionsDiv = document.createElement("div");
  const instructionsH1 = document.createElement("h1");
  instructionsH1.innerText = "Recipe Instructions";
  instructionsDiv.appendChild(instructionsH1);
  selectedRecipe.instructions.forEach(({ number, instruction }) => {
    const p = document.createElement("p");
    p.innerText = `${number}. ${instruction}`;
    instructionsDiv.appendChild(p);
  });
  section.appendChild(instructionsDiv);
  return section;
}

function createRecipeCard(selectedRecipe) {
  recipeView.innerHTML = "";
  const isFavorite = user.favoriteRecipes.includes(selectedRecipe);
  const inRecipesToCook = user.recipesToCook.includes(selectedRecipe);

  const lhsDiv = document.createElement("div");
  const lhsImg = document.createElement("img");
  lhsImg.classList.add("recipe-image");
  lhsImg.src = selectedRecipe.image;
  lhsImg.alt = selectedRecipe.name;
  lhsDiv.appendChild(lhsImg);

  const favoriteButton = createButton(
    ["favorite-button"],
    isFavorite ? "Unfavorite" : "Favorite"
  );
  lhsDiv.appendChild(favoriteButton);

  const addToRecipesToCookButton = createButton(
    ["add-to-recipes-to-cook-button"],
    inRecipesToCook ? "Already in List" : "Add to Recipes to Cook",
    inRecipesToCook
  );
  lhsDiv.appendChild(addToRecipesToCookButton);

  const cookButton = createButton(
    ["cook-recipe-button"],
    "Cook Recipe",
    !user.checkPantry(selectedRecipe)
  );
  lhsDiv.appendChild(cookButton);

  const buyIngButton = createButton(
    ["buy-ingredients-button"],
    "Buy Ingredients",
    user.checkPantry(selectedRecipe)
  );
  lhsDiv.appendChild(buyIngButton);

  recipeView.appendChild(lhsDiv);
  recipeView.appendChild(createRecipeInfoSection(selectedRecipe));

  buyIngButton.addEventListener("click", () => {
    buyOurIngredients(selectedRecipe);
  });
  cookButton.addEventListener('click', () => {
    // eslint-disable-next-line no-undef
    cookOurRecipe(selectedRecipe);
  })
}

function buyOurIngredients(recipe) {
  // console.log(user.pantry);
  const neededIngs = user.returnNeededIngredients(recipe);
  user.buyMissingIngredients(neededIngs);
  // console.log(user.pantry);
  showRecipeCard(recipe);
  neededIngs.forEach((ingredient) => {
    updateIngredients(user.id, ingredient.id, ingredient.difference).then(
      (result) => console.log(result)
    );
  });
}

function cookOurRecipe(recipe) {
  const usedIngs = user.returnNeededIngredients(recipe);
  
}


// REPLACE WITH DOMUPDATES
function showRecipeCard(selectedRecipe) {
  createRecipeCard(selectedRecipe);

  document.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", () => {
      clickFavoriteButton(selectedRecipe)();
      showRecipeCard(selectedRecipe);
    });
  });

  document
    .querySelector(".add-to-recipes-to-cook-button")
    .addEventListener("click", () => {
      user.addRecipesToCook(selectedRecipe);
      // REPLACE WITH DOMUPDATES
      renderRecipePages();
      showRecipeCard(selectedRecipe);
    });
}
// REPLACE WITH DOMUPDATES?
function showFavoritesPage() {
  displayElements([favoriteRecipePage, homeButton, recipesToCookButton]);
  renderRecipePages();
}

// REPLACE WITH DOMUPDATES?
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

function addHidden(element) {
  element.classList.add("hidden");
}

function removeHidden(element) {
  element.classList.remove("hidden");
}

/* Event Listeners */
window.addEventListener("load", loadAPIs);
homeButton.addEventListener("click", returnHome);
tagsDropDown.addEventListener("change", filterByTags);
recipesToCookButton.addEventListener("click", showRecipesToCookPage);
favoriteRecipesPageButton.addEventListener("click", showFavoritesPage);
nameSearchInput.addEventListener("input", searchRecipes);
ingredientSearchInput.addEventListener("input", searchRecipes);
