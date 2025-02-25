const express = require('express');
const connectDB = require('./db');
const userRoutes = require("./routes/userRoutes");
const app = express()
const port = 3000

//body parse
app.use(express.json());

//connect to database
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Use the user routes
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})