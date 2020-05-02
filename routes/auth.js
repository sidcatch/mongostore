const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const MobileWithOTP = require("../models/MobileWithOTP");
const auth = require("../middleware/auth");
const sendSMS = require("../nexmo");
const getRandomInt = require("../util/getRandomInt");

//@route POST /auth/receiveotp
//@desc receiveotp
//@access Public
router.post(
  "/receiveotp",
  [
    // check("mobile", "Mobile number is required").not().isEmpty(),
    check("mobile", "Enter valid mobile number").isMobilePhone("en-IN", {
      strictMode: true,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { mobile } = req.body;

    try {
      let profile = await Profile.findOne({ mobile });

      if (profile) {
        return res.status(400).json({
          errors: [{ param: "mobile", msg: "Mobile number already in use" }],
        });
      }

      let oneTimePassword = getRandomInt(100, 999);
      console.log("Generated OTP: " + oneTimePassword);

      let mobileWithOTP = await MobileWithOTP.findOne({ mobile });

      if (mobileWithOTP) mobileWithOTP.oneTimePassword = oneTimePassword;
      else mobileWithOTP = new MobileWithOTP({ mobile, oneTimePassword });

      await mobileWithOTP.save();

      //sendSMS(parseInt(mobile), `Your OTP is ${oneTimePassword}`);

      res.status(200).json({ msg: "OTP sent" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route POST /auth/signup
//@desc Register user
//@access Public
router.post(
  "/signup",
  [
    //check("mobile", "Mobile number is required").not().isEmpty(),
    check("mobile", "Enter valid mobile number").isMobilePhone("en-IN", {
      strictMode: true,
    }),
    check("oneTimePassword", "OTP is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
    check(
      "password",
      "Password should contain at least one lowercase letter"
    ).matches(/[a-z]/),
    check("password", "Password should contain at least one digit").matches(
      /\d/
    ),
    check(
      "password",
      "Password should contain at least one special character"
    ).matches(/[^a-zA-Z0-9]/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mobile, oneTimePassword } = req.body;
    let { password } = req.body;

    try {
      let profile = await Profile.findOne({ mobile });

      if (profile) {
        return res.status(400).json({
          errors: [{ param: "mobile", msg: "Mobile number already in use" }],
        });
      }

      let mobileWithOTP = await MobileWithOTP.findOne({ mobile });

      if (!mobileWithOTP) {
        return res.status(400).json({
          errors: [{ param: "oneTimePassword", msg: "OTP not found" }],
        });
      }

      if (mobileWithOTP.oneTimePassword != oneTimePassword) {
        return res.status(400).json({
          errors: [{ param: "oneTimePassword", msg: "Invalid OTP" }],
        });
      }
      mobileWithOTP.remove();

      const salt = await bycrypt.genSalt(10);
      password = await bycrypt.hash(password, salt);

      profile = new Profile({ mobile, password });

      await profile.save();

      const payload = {
        profile: {
          id: profile.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route POST /auth/login
//@desc login user
//@access Public
router.post(
  "/login",
  [
    check("mobile", "Mobile number is required").not().isEmpty(),
    check("mobile", "Enter valid mobile number").isMobilePhone("en-IN", {
      strictMode: true,
    }),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mobile, password } = req.body;

    try {
      let profile = await Profile.findOne({ mobile });

      /* if (isNaN(mobile)) {
        const email = mobileOrEmail;

        profile = await Profile.findOne({ email });
      } else { 
        const mobile = mobileOrEmail;
      profile = await Profile.findOne({ mobile });
       }*/
      if (!profile)
        return res.status(400).json({
          errors: [{ param: "mobile", msg: "Invalid Credentials" }],
        });

      const isMatch = await bycrypt.compare(password, profile.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ param: "password", msg: "Invalid Password" }] });

      const payload = {
        profile: {
          id: profile.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route GET /auth/test
//@desc test if user is logged in
//@access Private
router.get("/test", auth, (req, res) => {
  try {
    res.json({ ID: req.profile.id });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
