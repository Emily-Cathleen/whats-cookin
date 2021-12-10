import { expect } from "chai";
import Cookbook from "../src/classes/Cookbook.js";
const Recipe = require("../src/classes/Recipe.js");
const Ingredient = require("../src/classes/Ingredient.js");
const User = require("../src/classes/User.js");

describe("User", () => {
  let user1;
  let user2;
  let user3;
  let userSelectedTags;
  let recipe1;
  let recipe 2;

    beforeEach(() => {
    user1 = new User({
        name: "Saige O'Kon",
        id: 1,
        pantry: [
        {ingredient: 11297,
        amount: 4},
        {ingredient: 1082047,
        amount: 10},
        {ingredient: 20081,
        amount: 5}]
      });
        user2 = new User({
        name: "Ephraim Goyette",
        id: 2,
        pantry: [
        { ingredient: 6150,
          amount: 3},
        {ingredient: 1032009,
          amount: 7},
        {ingredient: 1082047,
          amount: 8}]
    });
    user3 = new User({
      name: "Clinton Goodwin",
      id: 4,
      pantry: [
        { ingredient: 9152,
          amount: 8},
        { ingredient: 1002014,
          amount: 4},
        {ingredient: 1012010,
          amount: 5}]
    });
    userSelectedTags = ["snack", "chocolate"];
  });

    it("Should be a function", () => {
      expect(User).to.be.a("function");
    });

    it("should be an instance of User", () => {
      expect(user1).to.be.an.instanceOf(User);
    });

    it("should return a list of recipes corresponding to selected tags", () => {
      expect(user1.filterFavoriteTags(["snack", "chocolate"])).to.deep.equal([
        recipe1,
      ]);
    });
});
