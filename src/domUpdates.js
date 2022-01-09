/* QUERY SELECTORS */

const homePage = document.querySelector(".home-page");
const recipeView = document.querySelector(".recipe-view");
const homeButton = document.querySelector(".home-button");
const favoriteRecipesPageButton = document.querySelector(
  ".favorite-recipes-page-button"
);
const recipesToCookButton = document.querySelector(".recipes-to-cook-button");
const nameSearchInput = document.querySelector("#nameSearchInput");
const ingredientSearchInput = document.querySelector("#ingredientSearchInput");
const tagsDropDown = document.querySelector("#tags");
const favoriteRecipePage = document.querySelector(".favorite-recipe-page");
const recipesToCookPage = document.querySelector(".recipes-to-cook-page");



const domUpdates = {
  hide(...views) {
    views.forEach(view => {
      view.classList.add("hidden")
    })
  },
  show(...views) {
    views.forEach(view=> {
    view.classList.remove("hidden");
    })
  },

  userGreeting(currUser) {
    document.querySelector(
      ".user-name"
    ).innerText = `Hello, ${currUser.getFirstName()}! What do you want to cook today?`;
  },
  //     addHidden(element) {element.classList.add("hidden")},
  //     removeHidden(element) {element.classList.remove("hidden")},
  populateRecipes(element, getRecipes) {
    const recipes = getRecipes();
    element.innerHTML = recipes
      .map((recipe) => {
        const isFavorite = user.favoriteRecipes.includes(recipe);
        return `
              <article class="recipe-card recipe-title" data-recipe-id='${
                recipe.id
              }'>
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
                  <p data-recipe-id="${recipe.id}">Tags: ${recipe.tags.join(
          ", "
        )}</p>
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
  },


  // function createButton(classList, text, disabled = false) {
  //   const button = document.createElement("button");
  //   classList.forEach((className) => {
  //     button.classList.add(className);
  //   });
  //   button.innerText = text;
  //   button.disabled = disabled;
  //   return button;
  // }
  
  // function createRecipeInfoSection(selectedRecipe) {
  //   const section = document.createElement("section");
  //   section.classList.add("recipe-info");
  
  //   const titleDiv = document.createElement("div");
  //   const titleH1 = document.createElement("h1");
  //   titleH1.classList.add("recipe-title");
  //   titleH1.innerText = selectedRecipe.name;
  //   titleDiv.appendChild(titleH1);
  //   section.appendChild(titleDiv);
  
  //   const ingredientsDiv = document.createElement("div");
  //   const ingredientsUl = document.createElement("ul");
  //   selectedRecipe.ingredients.forEach(({ name, amount, unit }) => {
  //     const ingredientLi = document.createElement("li");
  //     ingredientLi.innerText = `${amount} ${unit} ${name}`;
  //     ingredientsUl.appendChild(ingredientLi);
  //   });
  //   ingredientsDiv.appendChild(ingredientsUl);
  //   section.appendChild(ingredientsDiv);
  
  //   const costDiv = document.createElement("div");
  //   const costH3 = document.createElement("h3");
  //   costH3.innerText = `Total Cost of Ingredients: $${(
  //     selectedRecipe.getCostOfIngredients() / 100
  //   ).toFixed(2)}`;
  //   costDiv.appendChild(costH3);
  //   section.appendChild(costDiv);
  
  //   const neededIngredientsDiv = document.createElement("div");
  //   neededIngredientsDiv.classList.add("needed-ingredients");
  //   const missingIngredientsHeader = document.createElement("h3");
  //   missingIngredientsHeader.innerText = "Missing Ingredients:";
  //   neededIngredientsDiv.appendChild(missingIngredientsHeader);
  //   if (user.checkPantry(selectedRecipe)) {
  //     const p = document.createElement("p");
  //     p.innerText = "You're ready to cook!";
  //     neededIngredientsDiv.appendChild(p);
  //   } else {
  //     const missingList = document.createElement("ul");
  //     user.returnNeededIngredients(selectedRecipe).forEach((ingredient) => {
  //       const li = document.createElement("li");
  //       li.innerText = `${ingredient.difference} ${ingredient.unit} ${ingredient.name}`;
  //       missingList.appendChild(li);
  //     });
  //     neededIngredientsDiv.appendChild(missingList);
  //   }
  //   section.appendChild(neededIngredientsDiv);
  
  //   const instructionsDiv = document.createElement("div");
  //   const instructionsH1 = document.createElement("h1");
  //   instructionsH1.innerText = "Recipe Instructions";
  //   instructionsDiv.appendChild(instructionsH1);
  //   selectedRecipe.instructions.forEach(({ number, instruction }) => {
  //     const p = document.createElement("p");
  //     p.innerText = `${number}. ${instruction}`;
  //     instructionsDiv.appendChild(p);
  //   });
  //   section.appendChild(instructionsDiv);
  //   return section;
  // }
  
  // function createRecipeCard(selectedRecipe) {
  //   recipeView.innerHTML = "";
  //   const isFavorite = user.favoriteRecipes.includes(selectedRecipe);
  //   const inRecipesToCook = user.recipesToCook.includes(selectedRecipe);
  
  //   const lhsDiv = document.createElement("div");
  //   const lhsImg = document.createElement("img");
  //   lhsImg.classList.add("recipe-image");
  //   lhsImg.src = selectedRecipe.image;
  //   lhsImg.alt = selectedRecipe.name;
  //   lhsDiv.appendChild(lhsImg);
  
  //   const favoriteButton = createButton(
  //     ["favorite-button"],
  //     isFavorite ? "Unfavorite" : "Favorite"
  //   );
  //   lhsDiv.appendChild(favoriteButton);
  
  //   const addToRecipesToCookButton = createButton(
  //     ["add-to-recipes-to-cook-button"],
  //     inRecipesToCook ? "Already in List" : "Add to Recipes to Cook",
  //     inRecipesToCook
  //   );
  //   lhsDiv.appendChild(addToRecipesToCookButton);
  
  //   const cookButton = createButton(
  //     ["cook-recipe-button"],
  //     "Cook Recipe",
  //     !user.checkPantry(selectedRecipe)
  //   );
  //   lhsDiv.appendChild(cookButton);
  
  //   const buyIngButton = createButton(
  //     ["buy-ingredients-button"],
  //     "Buy Ingredients",
  //     user.checkPantry(selectedRecipe)
  //   );
  //   lhsDiv.appendChild(buyIngButton);
  
  //   const lhsPantry = document.createElement("div");
  //   lhsPantry.classList.add("pantry-div");
  //   const pantryHeader = document.createElement("h2");
  //   pantryHeader.innerText = `${user.name}'s Pantry:`;
  //   lhsPantry.appendChild(pantryHeader);
  //   const pantryList = document.createElement("ul");
  //   user.translateIngredients(ingredientsData).forEach(({ name, amount }) => {
  //     let li = document.createElement("li");
  //     li.innerText = `${amount} ${name}`;
  //     pantryList.appendChild(li);
  //   });
  //   lhsPantry.appendChild(pantryList);
  //   lhsDiv.appendChild(lhsPantry);
  
  //   recipeView.appendChild(lhsDiv);
  //   recipeView.appendChild(createRecipeInfoSection(selectedRecipe));
  
  //   buyIngButton.addEventListener("click", () => {
  //     buyOurIngredients(selectedRecipe);
  //   });
  //   cookButton.addEventListener("click", () => {
  //     cookOurRecipe(selectedRecipe);
  //   });
  // }

  // function showRecipeCard(selectedRecipe) {
  //   createRecipeCard(selectedRecipe);
  
  //   document.querySelectorAll(".favorite-button").forEach((button) => {
  //     button.addEventListener("click", () => {
  //       clickFavoriteButton(selectedRecipe)();
  //       showRecipeCard(selectedRecipe);
  //     });
  //   });
  
  //   document
  //     .querySelector(".add-to-recipes-to-cook-button")
  //     .addEventListener("click", () => {
  //       user.addRecipesToCook(selectedRecipe);
  //       // REPLACE WITH DOMUPDATES
  //       renderRecipePages();
  //       showRecipeCard(selectedRecipe);
  //     });
  // }

// // REPLACE WITH DOMUPDATES?
// function showFavoritesPage() {
//   displayElements([favoriteRecipePage, homeButton, recipesToCookButton]);
//   renderRecipePages();
// }

// // REPLACE WITH DOMUPDATES?
// function showRecipesToCookPage() {
//   displayElements([recipesToCookPage, homeButton, favoriteRecipesPageButton]);
//   renderRecipePages();
// }



};

export default domUpdates;
