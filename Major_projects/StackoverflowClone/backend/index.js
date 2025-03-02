const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const dotenv = require("dotenv");

// Importing the route files
const authRoutes = require("./Routes/auth");
const userRoute = require("./Routes/userRoute");
const questionRoute = require("./Routes/questionRoute");
const answerRoute = require("./Routes/answerRoute");
const postRoute = require("./Routes/postRoute");

const { logRequest } = require("./Middlewares/logger");
const app = express();
dotenv.config();
const port = process.env.PORT;


// Enable CORS
app.use(cors({
  origin: "http://localhost:5173",  // Adjust if needed
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//body parse middleware
app.use(express.json());

// logger middleware
app.use(logRequest);

app.use("/api/auth", authRoutes); // handles auth route
app.use("/api/user", userRoute); //handles profile route
app.use("/api/question", questionRoute); // handles question route
app.use("/api/answer", answerRoute); //handle answer route
app.use("/api/post", postRoute); //handles post routes

//connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
