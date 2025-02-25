const express = require("express");
const router = express.Router();

// Middleware functions
const loggingMiddleware = (req, res, next) => {
  console.log("inside loggingMiddleware - item");
  next();
};

const authMiddleware = (req, res, next) => {
  console.log("inside authMiddleware - item");
  next();
};

const validationMiddleware = (req, res, next) => {
  console.log("inside validationMiddleware - item");
  next();
};

// Apply middleware to all routes in this router
router.use(loggingMiddleware);
router.use(authMiddleware);
router.use(validationMiddleware);

// Root route
router.get("/", (req, res) => {
  res.send("Hello World--items!");
});

// Retrieve all items
router.get("/items", (req, res) => {
  res.send("GET request: Fetch all items");
});

// Create a new item
router.post("/items", (req, res) => {
  const newItem = req.body;
  res.json({ message: "Item added", item: newItem });
});

// Update an existing item
router.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  res.json({ message: `Item ${itemId} updated`, updatedItem });
});

// Remove an item
router.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  res.json({ message: `Item ${itemId} deleted` });
});

module.exports = router;
