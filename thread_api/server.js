const server = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const Thread = require("./models/thread");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
server.use(bodyParser.json({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");

const coreOptions = {
  allowedOrigin: "http://localhost:5173/",
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
server.get("/", async (req, res) => {
  await Thread.deleteMany({});
  res.send("api root");
});

server.post("/upload", async (req, res) => {
  const { text } = req.body;

  const newThread = new Thread({
    thread: text,
    like: 20 + Math.floor(Math.random() * 400),
    comments: 10 + Math.floor(Math.random() * 200),
    share: 5 + Math.floor(Math.random() * 100),
  });
  console.log("upload is hitting", newThread);

  await newThread.save();

  res.status(200).json(newThread);
});

server.get("/threads", async (req, res) => {
  const threads = await Thread.find({});
  // console.log("threads: ", threads);
  res.status(200).json(threads);
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
  await Thread.findByIdAndDelete({ id });
  res.json({ ok: "sucess" });
});

server.listen(8081, (req, res) => {
  if (!connceted) connectDatabase();

  console.log("server is listening at port 8081");
});
