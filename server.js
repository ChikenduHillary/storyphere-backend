// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://hillary:rC3C3qebnb4vtnzr@cluster0.k85pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Comment Schema
const commentSchema = new mongoose.Schema({
  storyId: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

// Routes
app.get("/api/comments/:storyId", async (req, res) => {
  try {
    const comments = await Comment.find({ storyId: req.params.storyId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/comments", async (req, res) => {
  const comment = new Comment({
    storyId: req.body.storyId,
    content: req.body.content,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
