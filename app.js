// Importing required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { appendFile } = require("fs");

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Express!");
});

// Example POST route
app.post("/log", (req, res) => {

  const { logData } = req.body;

  appendFile("logs.txt", "\n" + logData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File written successfully.");
    }
  });

  res.json({ message: "Log Created: " + logData });
});

// Handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route does not exist.");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
