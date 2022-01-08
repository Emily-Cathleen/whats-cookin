export const fetchUsers = () => {
  return fetch("http://localhost:3001/api/v1/users")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const fetchIngredients = () => {
  return fetch("http://localhost:3001/api/v1/ingredients")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const fetchRecipes = () => {
  return fetch("http://localhost:3001/api/v1/recipes")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

//POST request

export const updateIngredients = (
  userID,
  ingredientID,
  ingredientModification
) => {
  return fetch("http://localhost:3001/api/v1/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: userID,
      ingredientID: ingredientID,
      ingredientModification: ingredientModification,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
