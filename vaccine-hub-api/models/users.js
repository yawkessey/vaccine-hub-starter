const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const db = require("../db");

class User {
  static async login(credentials) {
    //User submits email and password
    //throw error if both fields are not filled
    //Check if user exists by email
    //If user found check if password matches from db
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

    // if (credentials.email.indexOf("@") <= 0) {
    //   throw new BadRequestError("Invalid email");
    // }
    //check if user exists by email
    //if user found throw error
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }

    //take user password and encrypt it/hash it
    //take email and lowercase it
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
        credentials.password,
        credentials.first_name,
        credentials.last_name,
        credentials.email,
        credentials.location,
      ]
    );

    const user = result.rows[0];

    return user;
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
