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
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      value: Number,
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      value: String,
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  share: { type: Number, default: 0 },
});

ThreadSchema.index({ _id: 1, "likes.user": 1 }, { unique: true });

module.exports = mongoose.model("Thread", ThreadSchema);
