const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Login Service Running 🔑");
});

app.listen(3002, () => {
    console.log("Login service on port 3002");
});// test log
