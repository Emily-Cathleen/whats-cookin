import './styles.css';
import apiCalls from './apiCalls';

const recipeTitle = document.querySelectorAll('#openRecipe');
const homePage = document.querySelector('.home-page');
const recipeView = document.querySelector('recipe-view');


function addHidden(element) {
  element.classList.add('hidden');
};


function removeHidden(element) {
  element.classList.remove('hidden');
};


function displayRecipeView() {
  addHidden(homePage);
  removeHidden(recipeView);
};



recipeTitle.addEventListener('click', displayRecipeView);





console.log('Hello world');
