const express = require("express");
const router = express.Router();

const {getUserData , getUserFriends , removeFriend , addFriend ,getUserById} = require("../controllers/User");
const {auth} = require("../middlewares/auth");

router.get("/",auth,getUserData);
router.get("/friend", auth , getUserFriends);
router.get('/friend/:friendid',auth,getUserById);
router.put("/addfriend/:friend",auth,addFriend);
router.delete("/removefriend/:friend",auth,removeFriend);

module.exports = router;
