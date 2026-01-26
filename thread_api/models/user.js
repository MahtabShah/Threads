const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dp: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvgEAwTMf9Gnfo35EuDrBpmAUXHD6fkmwLQ&s",
  },
  created_at: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model("User", UserSchema);
