const express = require("express");
const router = express.Router();

// GET request - Root route
router.get("/", (req, res) => {
  res.send("Hello World--items!");
});

// GET request - Retrieve all items
router.get("/items", (req, res) => {
  res.send("GET request: Fetch all items");
});

// POST request - Create a new item
router.post("/items", (req, res) => {
  const newItem = req.body;
  res.send(`POST request: Item ${JSON.stringify(newItem)} added`);
});

// PUT request - Update an existing item
router.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  res.send(
    `PUT request: Item ${itemId} updated with ${JSON.stringify(updatedItem)}`
  );
});

// DELETE request - Remove an item
router.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  res.send(`DELETE request: Item ${itemId} deleted`);
});

module.exports = router;
