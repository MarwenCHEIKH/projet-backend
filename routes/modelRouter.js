const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const router = express.Router();
router.use(express.json());
router.use(cors());
const publicKey = fs.readFileSync("public.key", "utf-8");
router.post("/createModel", (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. No token provided." });
  }

  // Verify and decode the token to retrieve user information
  jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err) {
      console.log("JWT Verification Error:", err.message);
      console.log("JWT Header:", err.header);
      console.log("JWT Payload:", err.payload);
      console.log("JWT Signature:", err.signature);
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid token." });
    }

    // Attach the user information to the request object
    req.user = decoded;
  });
});
module.exports = router;
