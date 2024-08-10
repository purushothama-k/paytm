const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://purushothamak269:DHHweyQByTGup5zW@cluster0.fimn9.mongodb.net/"
);

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
  },

  firstName: {
    type: String,
    required: true,
    maxLength: 25,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    maxLength: 25,
    trim: true,
  },
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Account };
