const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  if (process.env.MODE.toLowerCase() === "dev") {
    console.log(`Server is running at http://localhost:${port}`);
  }
});
