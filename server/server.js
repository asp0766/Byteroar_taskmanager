const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// URL Conneciton of MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});


// User Schema ( user  para ) -> UID , name , Role  
const userSchema = new mongoose.Schema({

  UID: {
    type: Number,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  Role: {
    type: String,
    required: true
  }

});


// User Model
const User = mongoose.model("User", userSchema);


// Home Route when we start backend we see on the web backend and db is connected
app.get("/", (req, res) => {
  res.send("Connected");
});


// Create user
app.post("/users", async (req, res) => {
  try {

    if (!req.body.UID || !req.body.name || !req.body.Role) {
  return res.status(400).json({
    message: "Name and Role are required"
  });
}

// New user add 
const newUser = new User({

  UID: req.body.UID,
  name: req.body.name,
  Role: req.body.Role

});

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      newUser
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
});


// GET all users
app.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});



// GET user by UID
app.get("/users/:uid", async (req, res) => {

  try {

    const user = await User.findOne({
      UID: req.params.uid
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});



// UPDATE user by UID
app.put("/users/:uid", async (req, res) => {

  try {

    const updatedUser = await User.findOneAndUpdate(

      { UID: req.params.uid },

      {
        name: req.body.name,
        Role: req.body.Role
      },

      { new: true }

    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User updated successfully",
      updatedUser
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});



// DELETE user by UID
app.delete("/users/:uid", async (req, res) => {

  try {

    const deletedUser = await User.findOneAndDelete({
      UID: req.params.uid
    });

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});