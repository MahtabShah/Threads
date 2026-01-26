const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  thread: { type: String, required: true },
  dp: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvgEAwTMf9Gnfo35EuDrBpmAUXHD6fkmwLQ&s",
  },
  created_at: {
    type: Date,
    default: Date(),
  },
  like: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  share: { type: Number, default: 0 },
});

module.exports = mongoose.model("Thread", ThreadSchema);
