
const {Client} = require("pg")
const {getDatabaseUri} = require("./config")
require("colors")

//New instance of client 
const db = new Client({connectionString: getDatabaseUri()})

db.connect((err) => {
    if (err){
        console.error("connection error".red, err.stack)
    } else {
        console.log("Successfully connect to postgres db!".blue)
    }
    
})

module.exports = db;
