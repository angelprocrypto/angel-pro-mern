const express = require("express");
const morgon = require("morgan");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const transactionRouter = require("./routers/transactionRouter");
dotenv.config("./.env");
// Declaration of express in the app instance
const app = express();

// all the necessory middlewares

app.use(express.json());
app.use(morgon("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://www.angelpro.online" || "www.angelpro.online",
    // origin: "http://localhost:5173",
  })
);

// all paths of required apis

app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});

dbConnect();
