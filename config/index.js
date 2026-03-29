const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Config Service Running ⚙️");
});

app.listen(3001, () => {
    console.log("Config service on port 3001");
});