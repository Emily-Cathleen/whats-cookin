
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
  } 
};

export default domUpdates;
