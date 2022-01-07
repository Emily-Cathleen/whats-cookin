let domUpdates = {
  displayElements(elementsToDisplay) {
    elementsToDisplay.forEach(removeHidden);
    hidableElements
      .filter((element) => !elementsToDisplay.includes(element))
      .forEach(addHidden);
  },
    userName.innerHTML = `<h3 class="user-name">Hello, ${user.getFirstName()}! What do you want to cook today?</h3>`},
     addHidden(element) {
        element.classList.add("hidden")
      }
};

export default domUpdates;
