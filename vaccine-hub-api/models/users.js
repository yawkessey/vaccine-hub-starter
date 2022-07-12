const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const bcrypt = require("bcrypt");

class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      location: user.location,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  }

  static async login(credentials) {

    const requiredFields = ["password", "email"];
    console.log(credentials);

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }
    throw new UnauthorizedError("Invalid email/password combination");
  }

  static async register(credentials) {
    //user should enter email and password
    //throw error if both fields are not filled
    const requiredFields = [
      "password",
      "first_name",
      "last_name",
      "email",
      "location",
    ];
    console.log(credentials);

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email");
    }
    //check if user exists by email
    //if user found throw error
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }

    //take user password and encrypt it/hash it
    //take email and lowercase it
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );
    const lowercasedEmail = credentials.email.toLowerCase();

    const result = await db.query(
      `


    INSERT INTO users (

      password,
      first_name,
      last_name,
      email,
      location



    )

    VALUES ($1,$2,$3,$4,$5)
    RETURNING id, password, first_name, last_name, email, location;
    
    
    
    `,
      [
        hashedPassword,
        credentials.first_name,
        credentials.last_name,
        credentials.email,
        credentials.location,
      ]
    );

    const user = result.rows[0];

    return User.makePublicUser(user);
  }

  // Looks up user in database by email
  // $ Query parameter for sorting variables inserting variables into
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    const query = `SELECT * FROM users WHERE email = $1 `;

    //db.query(query select, all parameters we want substituted)
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0]; //Grabs first row

    return user;
  }
}

module.exports = User;
