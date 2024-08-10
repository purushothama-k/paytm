const express = require("express");
const rootRouter = require("./routes/index");

const cors = require("cors");
const { JWT_SECRET } = require("./config");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, function () {
  console.log("Server running at port 3000");
});
