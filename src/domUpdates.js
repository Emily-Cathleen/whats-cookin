const domUpdates = {
  hide(...views) {
    views.forEach.add("hidden");
  },
  show(...views) {
    views.forEach.remove("hidden");
  },
  userGreeting(currUser) {
    document.querySelector(
      ".user-name"
    ).innerText = `Hello, ${currUser.getFirstName()}! What do you want to cook today?`;
  },
  //     userName.innerHTML = `<h3 class="user-name">Hello, ${user.getFirstName()}! What do you want to cook today?</h3>`},
  //     addHidden(element) {element.classList.add("hidden")},
  //     removeHidden(element) {element.classList.remove("hidden")},
  //     function populateRecipes(element, getRecipes) {
  //         const recipes = getRecipes();
  //         element.innerHTML = recipes
  //           .map((recipe) => {
  //             const isFavorite = user.favoriteRecipes.includes(recipe);
  //             return `
  //             <article class="recipe-card recipe-title" data-recipe-id='${recipe.id}'>
  //               <img class="recipe-image" data-recipe-id='${recipe.id}' src="${
  //               recipe.image
  //             }" alt="Image of ${recipe.name}" width=400>
  //               <h1 class="recipe-title" data-recipe-id="${recipe.id}">${
  //               recipe.name
  //             }</h1>
  //               <div>
  //                 <button class="fav-button-${recipe.id}">${
  //               isFavorite ? "Remove from " : "Add to "
  //             }Favorites</button>
  //                 <p data-recipe-id="${recipe.id}">Tags: ${recipe.tags.join(", ")}</p>
  //               </div>
  //             </article>`;
  //           })
  //           .join("");
  //         element.querySelectorAll(".recipe-card").forEach((recipeCard) => {
  //           recipeCard.addEventListener("click", (event) => {
  //             const recipeId = parseInt(event.target.dataset.recipeId);

  //             const selectedRecipe = recipes.find(({ id }) => id === recipeId);
  //             if (selectedRecipe) {
  //               displayRecipeView(selectedRecipe);
  //             }
  //           });
  //         });
  //         recipes.forEach((recipe) => {
  //           const favButton = element.querySelectorAll(`.fav-button-${recipe.id}`);
  //           favButton.forEach((button) => {
  //             button.addEventListener("click", clickFavoriteButton(recipe));
  //           });
  //         });
  //       },
  //        showRecipeCard(selectedRecipe) {
  //         const isFavorite = user.favoriteRecipes.includes(selectedRecipe);
  //         const inRecipesToCook = user.recipesToCook.includes(selectedRecipe);

  //         recipeView.innerHTML = `
  //           <div>
  //             <img class="recipe-image" id="" src="${selectedRecipe.image}" alt="${
  //           selectedRecipe.name
  //         }">
  //             <button class="favorite-button">${
  //               isFavorite ? "Unf" : "F"
  //             }avorite</button>
  //             <button class="add-to-recipes-to-cook-button" ${
  //               inRecipesToCook ? "disabled" : ""
  //             }>${
  //           inRecipesToCook ? "Already in List" : "Add to Recipes to Cook"
  //         }</button>
  //           </div>
  //           <section class="recipe-info">
  //             <div>
  //               <h1 class="recipe-title">${selectedRecipe.name}</h1>
  //             </div>
  //             <div>
  //             <h1 class="">Ingredients</h1>
  //             <ul>
  //             ${selectedRecipe.ingredients
  //               .map(({ name, amount, unit }) => {
  //                 return `<li>${amount} ${unit} ${name}</li>`;
  //               })
  //               .join("")}
  //             </ul>
  //             </div>
  //             <div>
  //               <h3>Total Cost of Ingredients: $${(
  //                 selectedRecipe.getCostOfIngredients() / 100
  //               ).toFixed(2)}</h3>
  //             </div>
  //             <div>
  //               <h1 class="">Recipe Instructions</h1>
  //               ${selectedRecipe.instructions
  //                 .map(({ number, instruction }) => {
  //                   return `<p>${number}. ${instruction}</p>`;
  //                 })
  //                 .join("")}
  //             </div>
  //             </section>`;
  //         document.querySelectorAll(".favorite-button").forEach((button) => {
  //           button.addEventListener("click", () => {
  //             clickFavoriteButton(selectedRecipe)();
  //             showRecipeCard(selectedRecipe);
  //           });
  //         });

  //         document
  //           .querySelector(".add-to-recipes-to-cook-button")
  //           .addEventListener("click", () => {
  //             user.addRecipesToCook(selectedRecipe);
  //             renderRecipePages();
  //             showRecipeCard(selectedRecipe);
  //           });
  //       }
};

// //function domUpdates.show(view)
// //function domUpdates.hide(view)

export default domUpdates;
