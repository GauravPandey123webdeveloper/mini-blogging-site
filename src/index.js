const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./route");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);
mongoose
  .connect(
    "mongodb+srv://gauravpandeyidforfunctionup:XvjHpLyNrIONLzb1@cluster0.a7th0vg.mongodb.net/group11Databse?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb has connected"))
  .catch((err) => console.log(err));
app.listen(process.env.PORT || 3000, function () {
  console.log("the server has started on the port:", process.env.PORT || 3000);
});
