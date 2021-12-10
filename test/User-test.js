import { expect } from "chai";
import Cookbook from "../src/classes/Cookbook.js";
const Recipe = require("../src/classes/Recipe.js");
const Ingredient = require("../src/classes/Ingredient.js");
const User = require("../src/classes/User.js");

describe("User", () => {
  let user;



    beforeEach(() => {
    user = new User({
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
  });

    it("Should be a function", () => {
      expect(User).to.be.a("function");
    });

    it("should be an instance of User", () => {
      expect(user).to.be.an.instanceOf(User);
    });

    it("should have a name", () => {
      expect(user.name).to.equal("Saige O'Kon")
    });

    it("should have an id", () => {
      expect(user.id).to.equal(1)
    });
});
