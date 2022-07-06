const express = require('express')
const router = express.Router()

router.post("/login", async (res, req, next) => {
    try {
        //Take users email and password and authenticate them
    } catch(error) {
        next(error)
    }
})
router.post("/register", async (res, req, next) => {
    try {
        //Take users email and password and register them
        //Creates new user in database
    } catch(error) {
        next(error)
    }
})

module.exports = router