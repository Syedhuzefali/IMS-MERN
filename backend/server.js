const connectToMongo = require("./config/db");
connectToMongo();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log("Incoming Request:", { method: req.method, path: req.path, body: req.body });
  next();
});

const productRoutes = require("./Routes/router");

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(3001, () => {
  console.log("Server Running on Port 3001");
});