const express =  require("express");
const router = express.Router();


const {auth } = require("../middlewares/auth");
const {searchByEmail} = require("../controllers/SearchApi");

router.get("/user/:email",auth,searchByEmail);


module.exports = router;