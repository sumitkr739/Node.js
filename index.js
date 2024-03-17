const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Connection
mongoose.connect("mongodb://localhost:27017/NodeProject");

//Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

//Routes
app.get("/users", (req, res) => {
  const HTML = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(HTML);
});

//REST APIs
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//Middleware
app.use(express.urlencoded({ extended: false }));

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .patch((req, res) => {
    //Edit user with id
    res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //Delete user with id
    res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  //Create new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(PORT, (req, res) => {
  console.log(`server started at port ${PORT}`);
});
