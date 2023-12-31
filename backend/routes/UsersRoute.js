const express = require("express");
const {authController, getUserProfile, registerUser, updateUserProfile} = require("../controllers/usersController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
//post email and password auth
router.post("/login", authController);

//get user profile Private Route
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);

module.exports = router;