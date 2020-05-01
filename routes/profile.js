const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const auth = require("../middleware/auth");

//@route GET /profile/
//@desc get profile
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ _id: req.profile.id });
    const { name, email, mobile } = profile;
    res.status(200).json({ name, email, mobile });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
