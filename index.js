const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/user");

// const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/Node_project").then(() =>
  console.log("MongoDB Connected")
);
// .catch((err) => console.log("Mongo Error", err));

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
