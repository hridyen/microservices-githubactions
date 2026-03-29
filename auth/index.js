const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Auth Service Running 🔐");
});

app.listen(3000, () => {
    console.log("Auth service on port 3000");
});// change
