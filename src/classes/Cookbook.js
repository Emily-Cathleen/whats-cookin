const Recipe = require('../data/recipes.js');

class Cookbook {
  constructor(recipes) {
    this.recipes = recipes;

    // One class to get you started!
  }
  filterTags(selectedTag) {
    const filteredRecipesByTag = this.recipes.filter(recipe => { return recipe.tags.includes(selectedTag)
    })
    return filteredRecipesByTag
  }
  filterNamesandIngredients() {

  }
}

export default Cookbook;


/*
It should have methods to determine:
TAGS ONLY: A filtered list of recipes based on one or more tags.
//if on filtered drop down (ex we are the snacks on dropdown / we would want our filtered array of snacks)


A filtered list of recipes based on its name or ingredients.
//based on what is searched for in the search bar only
*/
