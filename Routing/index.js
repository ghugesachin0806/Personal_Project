const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const itemsRouter = require("./Routers/items"); // Import users routes
const usersRouter = require("./Routers/users"); // Import items routes

app.use("/route-items", itemsRouter); // Handles /users routes
app.use("/route-users", usersRouter); // Handles /items routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
