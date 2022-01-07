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
