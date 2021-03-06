////Dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Wine = require("./models/wine");
const wineSeedData = require("./models/wineSeedData");
const { PORT = 3001, DATABASE_URL } = process.env;

///Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(DATABASE_URL);
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error));
//Routes

//Seed
app.get("/seed", async (req, res) => {
  try {
    Wine.deleteMany({}, (error, deleteWines) => {
      Wine.create(wineSeedData, (error, data) => {
        res.redirect("/");
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//Index Route
app.get("/", (req, res) => {
  res.redirect("/vineyard");
});

app.get("/vineyard", async (req, res) => {
  try {
    res.json(await Wine.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/wine", async (req, res) => {
  try {
    res.json(await Wine.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

//  CREATE ROUTE
app.post("/wine", async (req, res) => {
  try {
    res.json(await Wine.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

//  DELETE ROUTE
app.delete("/wine/:id", async (req, res) => {
  try {
    res.json(await Wine.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

//  UPDATE ROUTE
app.put("/wine/:id", async (req, res) => {
  try {
    res.json(
      await Wine.findByIdAndUpdate(req.params.id, req.body, { new: true }),
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`The vineyard on PORT ${PORT}`);
});
