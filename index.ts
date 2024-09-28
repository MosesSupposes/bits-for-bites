import type { Alchemy } from "alchemy-sdk";
import express from "express";
import type { Express } from "express";
import path from "path";
import createAlchemyInstance from "./alchemy.ts";

/**
 * Environment logged for debugging purposes
 */
switch (process.env.NODE_ENV?.toLowerCase()) {
  case "development":
  case "dev":
    console.log("App is running in development mode");
    break;
  case "production":
  case "prod":
    console.log("App is running in production mode");
    break;
  case "test":
    console.log("App is running in test mode");
    break;
  case "staging":
    console.log("App is running in staging mode");
    break;
  default:
    console.log("NODE_ENV not set. App is running in development mode. ");
    break;
}

const app: Express = express();
const port = process.env.PORT || 8888;
const alchemy: Alchemy = createAlchemyInstance();

/**
 * Routes
 */

// Serve static files from the public directory
app.use(express.static(path.join(import.meta.dirname, "public")));

// Make the base domain point to the index.html file by default
app.get("/", (req, res) => {
  res.send(path.join(import.meta.dirname, "public", "index.html"));
});

/**
 * Data Layer
 */

const api = express.Router();
// Remove the "/api" prefix from all routes
app.use("/api", api);

api.get("/", (req, res) => {
  res.send("API is working");
});

api.get("/block-number", async (req, res) => {
  try {
    const blockNumber = await alchemy.core.getBlockNumber();
    res.json({ blockNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch block number" });
  }
});

api.post("/buy-product", async (req, res) => {
  try {
    res.status(200).send("TODO: Implement buy-product route");
    // Get the product ID from the request body
    // Get the user's encrypted private key from the request body
    // Sign the transaction on the user's behalf
    // Wait until the transaction finalizes, then send a response
  } catch (err) {
    res.send("Error purchasing product. Try again later." + "Details: " + err);
  }
});

/**
 * Fallback Middleware
 */

app.use(function NotFound(req, res, next) {
  console.log(req.url);
  res.status(404).send("Page Not found");
});

app.use(function ErrorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

/**
 * Main
 * */

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
