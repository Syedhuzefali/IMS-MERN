require('dotenv').config();

const connectToMongo = require("./config/db");
connectToMongo();

const express = require("express");
const cors = require("cors");

const app = express();


// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json({
  limit: "50mb"
}));

app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));


// ===============================
// Debug Middleware
// ===============================
app.use((req, res, next) => {

  console.log("Incoming Request:", {
    method: req.method,
    path: req.path
  });

  next();

});


// ===============================
// Routes
// ===============================
app.use('/api/auth', require('./Routes/Auth'));        // Add authentication routes
app.use('/api/products', require('./Routes/router'));  // Existing product routes


// ===============================
// Default Route
// ===============================
app.get("/", (req, res) => {

  res.send("Backend Running");

});


// ===============================
// Server Start
// ===============================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(`Server Running on Port ${PORT}`);

});