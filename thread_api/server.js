const server = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const Thread = require("./models/thread");
const User = require("./models/user");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
server.use(bodyParser.json({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");

const authRoute = require("./routes/auth");
const user = require("./models/user");

const coreOptions = {
  allowedOrigin: process.env.CLIENT_URL || "http://localhost:5173/",
};
server.use(cors(coreOptions));

let connceted = false;

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      connceted = true;
      console.log("===== db connected ===== \n", connceted);
    })
    .catch((err) => {
      console.log("===== connection error > ===== \n", err);
    });
};

// --------------------------------- path ---------------------- //
server.use("/auth", authRoute);
server.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

server.post("/upload", async (req, res) => {
  const { text, _id } = req.body;

  const newThread = new Thread({
    thread: text,
    user: _id,
    share: 5 + Math.floor(Math.random() * 100),
  });
  console.log("upload is hitting", newThread);

  await newThread.save();

  res.status(200).send(newThread);
});

server.get("/threads", async (req, res) => {
  const threads = await Thread.find({})
    .populate("user")
    .populate("comments.user");
  res.status(200).json(threads);
});

server.get("/user/threads/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const threads = await Thread.find({ user: userId })
    .populate("user")
    .populate("comments.user");
  res.status(200).json(threads);
});

server.put("/thread/like", async (req, res) => {
  const { _thread_id, _user_id } = req.body;

  const userId = _user_id.toString();
  const thread = await Thread.findById(_thread_id);
  const index = thread.likes.findIndex((l) => l.user.toString() == userId);

  if (index !== -1) {
    await Thread.updateOne(
      {
        _id: _thread_id,
      },
      {
        $pull: {
          likes: { user: _user_id },
        },
      },
    );
  } else {
    await Thread.updateOne(
      { _id: _thread_id, "likes.user": { $ne: _user_id } },
      {
        $push: {
          likes: {
            user: _user_id,
            value: 1,
          },
        },
      },
    );
  }

  res.status(200).json({ index: index });
});

server.post("/thread/comment", async (req, res) => {
  const { _thread_id, _user_id, _text } = req.body;

  await Thread.updateOne(
    { _id: _thread_id },
    {
      $push: {
        comments: {
          user: _user_id,
          value: _text,
        },
      },
    },
  );

  res.status(200).json("success");
});

server.use("/audio", express.static("uploads"));
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

server.post("/upload-audio", upload.single("audio"), (req, res) => {
  console.log("File received:", req.file);

  res.json({
    message: "Audio saved",
    url: `/audio/${req.file.filename}`,
  });
});

server.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Thread.findOneAndDelete({ _id: id });

  res.json({ ok: "sucess" });
});

server.delete("/thread/comment/delete", async (req, res) => {
  const { _thread_id, _cmt_id } = req.body;
  await Thread.updateOne(
    { _id: _thread_id },
    { $pull: { comments: { _id: _cmt_id } } },
  );

  res.json({ ok: "sucess" });
});

server.listen(8081, (req, res) => {
  if (!connceted) connectDatabase();

  console.log("server is listening at port 8081");
});
