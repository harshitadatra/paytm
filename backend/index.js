// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("server is running");
});
