const express = require("express");
const mongoose = require("mongoose");
const { ErrorHandlerMiddleware } = require("./middlewares");
const { userRouter } = require("./routers");
//const https = require('https')
const http = require('http');
const cors = require('cors');//isso e obrigatorio para o axios funfar 

mongoose.connect(
  "mongodb+srv://unifeso:unifeso-password@unifeso.kwuxv.gcp.mongodb.net/nathan?retryWrites=true&w=majority",
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

app.use(require('cors')());//isso tbm
app.use(cors({//isso aqui tbm
  origin: [
    "http://localhost:8090",
    "http://localhost:8090/users",
    "http://localhost:8090/users/login",
    "http://localhost:8090/users/singin",
    "http://localhost:8090/users/update_password"
  ],//e isso tbm, mas acho q so a primeira ja funciona mas vai q ne kkkk
  credentials: true
}));
app.use("/users", userRouter);
app.use(ErrorHandlerMiddleware);

const port = 8090;
//app.listen(port, () => console.log(`Rodando em localhost:${port}`));
http.createServer(app).listen(port, "0.0.0.0", () => console.log(`Rodando em localhost:${port}`));//host de um server local (n sei se e necessario para o axios)