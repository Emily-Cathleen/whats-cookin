import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from './classes/Cookbook.js';


const recipeTitle = document.querySelector('#openRecipe');
const homePage = document.querySelector('.home-page');
const recipeView = document.querySelector('.recipe-view');
const homeButton = document.querySelector('.home-button');
const recipeCard = document.querySelector('.recipe-card');
let cookbook = new CookBook();


function addHidden(element) {
  element.classList.add('hidden');
};


function removeHidden(element) {
  element.classList.remove('hidden');
};

function displayRecipeView() {
  addHidden(homePage);
  removeHidden(recipeView);
  removeHidden(homeButton);
};

function populateRecipes() {
  let recipeCardsHTML = '';
  cookbook.recipes.forEach(recipe => {
    recipeCardsHTML += `
    <img class="" id="" src="${recipe.image}" alt="recipe image">
    <h1 class="recipe-title" id="openRecipe">${recipe.name}</h1>`
  });
  recipeCard.innerHTML = recipeCardsHTML;
};
populateRecipes();


recipeTitle.addEventListener('click', displayRecipeView);








console.log('Hello world');
