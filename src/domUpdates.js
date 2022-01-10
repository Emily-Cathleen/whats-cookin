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
};

export default domUpdates;
