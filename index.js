const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models");

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

const dictionary = {};

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CREATE
app.post("/", async (request, response) => {
  const jsonContent = request.body;
  // User -> objeto responsável por acessar o banco de dados.
  const user = await User.create(jsonContent);
  response.status(201).send(user);
});

// READ
app.get("/:id", async (request, response) => {

  const id = request.params.id;
  try {
    const result = await User.findById(id);
    response.status(200).send(result);
    
  } catch{
    response.status(401).json({
      "Unauthorized":"incorrect id"
      
    });
  }; 

});

// UPDATE
app.put("/:id", async (request, response) => {
  
  const id = request.params.id;
  const body = request.body;
  console.log(body);
  try {
    const result = await User.findByIdAndUpdate(id, {
      
      username: body.username,
      password: body.password

    });
    response.status(200).send(body);
    
  } catch{
    response.status(401).json({
      "Unauthorized":"incorrect id"
      
    });
  }; 

});

// DELETE
app.delete("/:id", (request, response) => {
  
  const id = request.params.id;

  User.findByIdAndRemove(id, (err, doc) => {
    if(!err) {
      response.status(204).end();
    } else {
      response.status(401).json({ "Unauthorized":"incorrect id"});
    }
  });

});

const port = 8090;
app.listen(port, () => console.log(`Rodando em localhost:${port}`));
