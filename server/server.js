const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require("./routes/bookings");





const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);

// Connect MongoDB & Start Server
mongoose.connect("mongodb+srv://dspcoder123:Dinesh%40123@cluster524.xavl3.mongodb.net/MyDatabase?retryWrites=true&w=majority&appName=Cluster524", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Database"))
  .catch((e) => console.log("Error connecting to MongoDB: ", e));


  app.listen(5000, () => {
  console.log("Server Started on port 5000");
});