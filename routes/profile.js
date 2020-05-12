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

//@route PUT /profile/
//@desc edit profile
//@access Private
router.put(
  "/",
  auth,
  [
    check("email", "Enter a valid email").isEmail(),
    check("name", "Name must not start with a number").matches(/^[^0-9]/),
    check("name", "Name should not contain any special characters").matches(
      /^[a-zA-Z0-9 ]*$/
    ),
  ],

  async (req, res) => {
    const { name, email } = req.body;

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors = errors.array();

      if (!email) {
        let filteredErros = errors.filter((error) => error.param !== "email");
        errors = filteredErros;
      }

      if (!name) {
        let filteredErros = errors.filter((error) => error.param !== "name");
        errors = filteredErros;
      }
      if (errors.length) {
        return res.status(400).json({ errors });
      }
    }

    try {
      let profile = await Profile.findOne({ _id: req.profile.id });

      if (name) profile.name = name;
      if (email) profile.email = email;

      await profile.save();

      res.status(200).json({ name: profile.name, email: profile.email });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
