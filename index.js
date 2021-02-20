const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
//middleware
app.use(cors());
app.use(express.json());

//momgoose connection

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`mongoose connection is running great`);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running great ${port}`);
});
