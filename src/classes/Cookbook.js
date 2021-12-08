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
  filteredIngredients() {

  }
  filteredName(searchedName) {
    const filteredName = this.recipes.filter(recipe => { return recipe.name.includes(searchedName)
    })
    return filteredName

  }
}

export default Cookbook;


/*
It should have methods to determine:

A filtered list of recipes based on its name or ingredients.
//based on what is searched for in the search bar only
*/
