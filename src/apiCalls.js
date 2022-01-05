// Your fetch requests will live here!

 const fetchUsers = () => {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
    .then((response) => response.json())
    // .then((data) => data.usersData)
    // .catch((error) => console.log(error));
};

 const fetchIngredients = () => {
  return fetch(
    "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients"
  )
    .then((response) => response.json())
    // .then((data) => data.ingredientsData)
    // .catch((error) => console.log(error));
};

 const fetchRecipes = () => {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
    .then((response) => response.json())
    // .then((data) => data.recipeData)
    // .catch((error) => console.log(error));
};

export { fetchUsers, fetchIngredients, fetchRecipes }