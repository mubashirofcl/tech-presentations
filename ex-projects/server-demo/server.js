const express = require("express");
const mongoose = require("mongoose");
const app = express();

//1 connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/testDB");

//2 check
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

//3 create schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

//4 create model
const UserModel = new mongoose.model("User", userSchema);

app.get("/", async (req, res) => {

    const data = await UserModel.create({
        name: "Adhil",
        age: 19
    });

    console.log(data);
    res.send("Model created and data updated in database");
});

app.listen(3000, () => {
    console.log("server running on port 3000");
});