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

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CREATE
app.post("/", async (request, response) => {
  const jsonContent = request.body;
  const user = await User.create(jsonContent);
  response.status(201).send(user);
});

// READ
app.get("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const result = await User.findById(id);

    response.status(200).json({ 
      username: result.username, 
      password: result.password
    });
  } catch {
    response.status(401).json({'Unauthorized': 'Id is not valid'});
  }
});

// UPDATE
app.put("/:id", async (request, response) => {
  const { id } = request.params;

  const { username, password } = request.body;

  try {
    const result = await User.findByIdAndUpdate(id, { 
      username, password
    });

    response.status(200).json({ 
      username, password
    });
  } catch {
    response.status(401).json({'Unauthorized': 'Id is not valid'});
  }
});

// DELETE
app.delete("/:id", async (request, response) => {
  const { id } = request.params;

  User.findByIdAndRemove(id, (err, doc) => {
    if(!err) {
      response.status(204).end();
    } else {
      response.status(401).json({'Unauthorized': 'Id is not valid'});
    }
  });
});

const port = 8090;
app.listen(port, () => console.log(`Server started on localhost:${port}`));
