const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Routers
const foodRouter = require("./Routes/FoodRoute");
const cartRouter = require("./Routes/CartRoute");
const deliveryRouter = require("./Routes/DeliveryRoute");

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/foods", foodRouter); // localhost:5000/foods
app.use("/carts", cartRouter);// localhost:5000/carts 
app.use("/deliveries", deliveryRouter);


mongoose
  .connect("mongodb+srv://admin:68SvVjBKSYPNzckf@cluster0.e5amjlq.mongodb.net/yourDatabaseNameHere?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = app;
