import express from "express";




let configViewEngnine = (app) => {
    app.use(express.static("../public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

module.exports = configViewEngnine;