import './styles.css';
import apiCalls from './apiCalls';

const recipeTitles = document.querySelectorAll('#openRecipe');
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

function makeTitlesClickable() {
  recipeTitles.forEach(recipe, => {
    recipe.addEventListener('click', () => {
      console.log("clicked")
    });
  });
};


  // recipeTitles.forEach(recipe => {
  //   recipe.addEventListener('click', function() {
  //     console.log("clicked")
  //   });
  // )};



// recipeTitles.addEventListener('click', displayRecipeView);





console.log('Hello world');
