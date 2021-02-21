const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//Create a post
router.post("/post", async (req, res) => {
  try {
    const { description, image, user } = req.body;

    const post = await Post.create({
      description,
      image,
      user,
    });

    res.send(post);
    console.log(post);
  } catch (error) {
    console.log(error);
  }
});
//Fetch all post
router.get("/post", async (req, res) => {
  try {
    const post = await Post.find({});

    res.send(post);
    console.log(post._id);
  } catch (error) {
    console.log(error);
  }
});

//Update a post
router.put("/post/:id", async (req, res) => {
  try {
    const { _id } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    res.send(updatedPost);
    console.log(updatedPost);
  } catch (error) {
    console.log(error);
  }
});

//Update a post
router.put("/post/:id", async (req, res) => {
  try {
    const { _id } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    res.send(updatedPost);
    console.log(updatedPost);
  } catch (error) {
    console.log(error);
  }
});

//Delete a post
router.delete("/post/:id", async (req, res) => {
  try {

    const deletePost = await Post.findByIdAndDelete(req.params.id);

    res.send(deletePost);
    console.log(req.params.id);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
