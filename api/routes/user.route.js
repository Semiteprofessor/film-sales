const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

// CREATE USER ROUTE
router.post("/register", createUser);

// LOGIN USER ROUTE
router.post("/login", loginUser);

module.exports = router;
