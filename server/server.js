const express = require("express");
require("dotenv").config();
const setHttpHeaders = require("./setHttpHeaders");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(setHttpHeaders);
app.set("view engine", "ejs");
app.set("views", "views");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));