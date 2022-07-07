const { UnauthorizedError } = require("../utils/errors");
const db = require("../db")
class User {
  static async login(credentials) {
    //User submits email and password
    //throw error if both fields are not filled
    //Check if user exists by email
    //If user found check if password matches from db

    throw new UnauthorizedError("Invalid credentials");
  }

  static async register(credentials) {
    //user should enter email and password
    //throw error if both fields are not filled
    //check if user exists by email
    //if user found throw error
    //take user password and encrypt it/hash it
    //take email and lowercase it
    //create new user in database
    //return user object
  }
}

module.exports = User;
