import './styles.css';
import apiCalls from './apiCalls';

const recipeTitle = document.querySelector('#openRecipe');
const homePage = document.querySelector('.home-page');
const recipeView = document.querySelector('.recipe-view');
const homeButton = document.querySelector('.home-button');

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

function makeTitlesClickable() {

};






recipeTitle.addEventListener('click', displayRecipeView);








console.log('Hello world');
