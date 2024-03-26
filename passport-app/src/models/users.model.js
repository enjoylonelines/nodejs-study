const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // email, google 로그인을 위함
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
