// Your fetch requests will live here!

export const fetchUsers = () => {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
    .then((response) => response.json())
    .then((data) => data.usersData)
    .catch((error) => console.log(error));
};
