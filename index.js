const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const dbUtils = require("./services/dbUtils");
const app = express();
const modelRouter = require("./routes/modelRouter");
const vfdRouter = require("./routes/vfdRouter");

const jsonServerRouter = jsonServer.router(path.join(__dirname, "db.json"));
const port = process.env.PORT || 3000;

const privateKey = fs.readFileSync("private.key", "utf-8");

app.use(bodyParser.json());
app.use(cors());
app.use("/model", authenticate, modelRouter);
app.use("/vfd", authenticate, vfdRouter);
// Authentication middleware
function authenticate(req, res, next) {
  const token = req.header("Authorization");
  if (token) {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Authentication failed. Invalid token." });
      }

      req.user = decoded; // Attach the user information to the request object
      next();
    });
  } else if (req.body && req.body.username && req.body.password) {
    const { username, password } = req.body;
    const users = dbUtils.getUsersFromDb();

    const user = users.find(
      (u) => u.username === username && bcrypt.compareSync(password, u.password)
    );

    if (user) {
      // Attach the authenticated user to the request object
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
}

// Route for user login
app.post("/login", authenticate, (req, res) => {
  const token = jwt.sign({ username: req.body.username }, privateKey, {
    algorithm: "RS256",
  });
  res.json({ token });
});

// Route for user registration (sign up)
app.post("/register", (req, res) => {
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

// Use JSON Server for user management endpoints
app.use("/users", jsonServerRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
