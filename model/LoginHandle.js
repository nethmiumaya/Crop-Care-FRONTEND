const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5050;

app.use(bodyParser.json());

const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

app.post("http/api/v1/auth/signIn", (req, res) => {
  const { username, password } = req.body;

  // Replace with your actual authentication logic
  if (username === "admin" && password === "password") {
    // Generate a JWT
    const token = jwt.sign({ username: username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token: token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
