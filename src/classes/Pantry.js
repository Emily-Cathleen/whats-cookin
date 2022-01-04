function createDataEntry(pantryEntry, ingredientList) {
  const ingredientEntry = ingredientList.find((ingredientEntry) => {
    return ingredientEntry.id === pantryEntry.ingredient;
  });
  return {
    id: ingredientEntry.id,
    name: ingredientEntry.name,
    amount: pantryEntry.amount,
  };
}

class Pantry {
  constructor(pantryList, ingredientList) {
    this.ingredientList = ingredientList;
    this.pantryList = pantryList;
    this.data = pantryList.map((item) => {
      return createDataEntry(item, ingredientList);
    });
  }
  // getMissingIngredients(){}
  // cookAMeal(){}
  // getAllIngredients()
  // addIngredients(id, amount)
}

module.exports = Pantry;

// pantryList : [{ingredient: number, amount: number}]
// ingredientList: [{id: number, name: string, estimatedCostInCents: number}]
// what we want to store: [{id: number, name: string, amount: number}]

// WHAT DOES IT MEAN TO HAVE 5 FLOUR? 😩
