const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value);
      },
      message: 'Password must contain both alphabetic and numeric characters.',
    },
  },
});

module.exports = mongoose.model("User", userSchema);