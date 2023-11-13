const jwt = require("jsonwebtoken");
const dbUtils = require("../services/dbUtils");
const bcrypt = require("bcrypt");
const fs = require("fs");

const privateKey = fs.readFileSync("private.key", "utf-8");

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
module.exports = authenticate;
