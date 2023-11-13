const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const cors = require("cors");

router.use(cors());
router.use(express.json());

const privateKey = fs.readFileSync("private.key", "utf-8");

router.post("/login", authenticate, (req, res) => {
  const token = jwt.sign({ username: req.body.username }, privateKey, {
    algorithm: "RS256",
  });
  res.json({ token });
});

// Route for user registration (sign up)
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const users = getUsersFromDb();

  // Check if the username is already in use
  if (users.some((u) => u.username === username)) {
    res.status(400).json({ message: "Username already in use" });
    return;
  }

  // Hash the password before storing it
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Add the new user to the array
  users.push({ username, email, password: hashedPassword });

  // Update the user data in the db.json file
  dbUtils.writeUsersToDb(users);

  res.status(201).json({ message: "User registered successfully" });
});

module.exports = router;
