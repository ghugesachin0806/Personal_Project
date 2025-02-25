const express = require("express");
const router = express.Router();

const loggingMiddleware = function (req, res, next) {
  console.log("inside loggingMiddleware - user");
  next();
};

const authMiddleware = function (req, res, next) {
  console.log("inside authMiddleware - user");
  next();
};

const validationMiddleware = function (req, res, next) {
  console.log("inside validationMiddleware - user");
  next();
};

router.use(loggingMiddleware);
router.use(authMiddleware);
router.use(validationMiddleware);

// GET request - Retrieve data
router.get("/", (req, res) => {
  res.send("Hello World--users!");
});

// GET request - Retrieve data
router.get("/users", (req, res) => {
  res.send("GET request: Fetch all users");
});

// POST request - Create new data
router.post("/users", (req, res) => {
  const newUser = req.body;
  res.send(`POST request: User ${JSON.stringify(newUser)} added`);
});

// PUT request - Update existing data
router.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  res.send(
    `PUT request: User ${userId} updated with ${JSON.stringify(updatedUser)}`
  );
});

// DELETE request - Remove data
router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`DELETE request: User ${userId} deleted`);
});

module.exports = router;