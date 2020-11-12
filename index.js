const express = require("express");
const mongoose = require("mongoose");
const { ErrorHandlerMiddleware } = require("./middlewares");
const { userRouter } = require("./routers");

mongoose.connect(
  "mongodb+srv://unifeso:unifeso-password@unifeso.kwuxv.gcp.mongodb.net/unifeso-financial-control?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("MongoDB Connected.");
});

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/users", userRouter);
app.use(ErrorHandlerMiddleware);

const port = 8090;
app.listen(port, () => console.log(`Server started on localhost:${port}`));
