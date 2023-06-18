const express = require("express");
const router = express.Router();


const {createPost,getFeedPost,getUserPosts} = require("../controllers/Posts");
const {createComment} = require("../controllers/comment");
const {createLike,removeLike} = require("../controllers/like");

const{auth} = require("../middlewares/auth");

router.post("/createPost",auth,createPost);
router.get("/getFeed",auth,getFeedPost);
router.post("/comment/:postid",auth,createComment);
router.post("/like/:postid",auth,createLike);
router.delete("/removeLike/:postid",auth,removeLike);
router.get("/user/:userid",auth,getUserPosts);


module.exports = router;