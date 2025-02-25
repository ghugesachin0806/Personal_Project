    const express = require("express");
    const app = express();
    const port = 3000;

    // Middleware to parse JSON request bodies
    app.use(express.json());

    const itemsRouter = require("./Routers/items"); // Import users routes
    const usersRouter = require("./Routers/users"); // Import items routes


    const loggingMiddleware = function (req, res, next) {
        console.log("inside loggingMiddleware - app");
        next();
    };

    const authMiddleware = function (req, res, next) {
        console.log("inside authMiddleware - app");
        next();
    };

    const validationMiddleware = function (req, res, next) {
        console.log("inside validationMiddleware - app");
        next();
    };

    app.use(loggingMiddleware);
    app.use(authMiddleware);
    app.use(validationMiddleware);

    app.use("/route-items", itemsRouter); // Handles /users routes
    app.use("/route-users", usersRouter); // Handles /items routes


    app.get("/", (req, res) => {
    res.send("Hello World!");
    });

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    });
