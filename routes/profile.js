const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const Address = require("../models/Address");
const auth = require("../middleware/auth");
const { ConnectionStates } = require("mongoose");

//@route GET /api/profile/
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

//@route PUT /api/profile/
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

//@route GET /api/profile/addresses
//@desc get profile addresses
//@access Private
router.get("/addresses", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne(
      { _id: req.profile.id },
      { addresses: 1, _id: 0 }
    ).populate("addresses");

    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    let { addresses } = profile;

    res.status(200).json(addresses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route POST /api/profile/address
//@desc post address
//@access Private
router.post(
  "/address",
  auth,
  [
    check("name", "Name is required").not().isEmpty(),
    check("mobile", "Mobile number is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("city", "City is required").not().isEmpty(),
    check("state", "State is required").not().isEmpty(),
    check("pincode", "Pincode is required").not().isEmpty(),
  ],

  async (req, res) => {
    const { name, mobile, city, state, pincode } = req.body;
    let addr = req.body.address;

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let profile = await Profile.findOne({ _id: req.profile.id });

      if (!profile) return res.status(404).json({ msg: "Profile not found" });

      let address = new Address({
        name,
        mobile,
        address: addr,
        city,
        state,
        pincode,
      });
      await address.save();

      profile.addresses.push(address._id);
      await profile.save();

      res.status(200).json(address);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route PUT /api/profile/address
//@desc update address
//@access Private
router.put(
  "/address",
  auth,
  [
    check("id", "Id is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("mobile", "Mobile number is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("city", "City is required").not().isEmpty(),
    check("state", "State is required").not().isEmpty(),
    check("pincode", "Pincode is required").not().isEmpty(),
  ],

  async (req, res) => {
    const { name, mobile, city, state, pincode, id } = req.body;
    let addr = req.body.address;

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let profile = await Profile.findOne({ _id: req.profile.id });

      if (!profile) return res.status(404).json({ msg: "Profile not found" });

      let address = await Address.findOne({ _id: id });

      if (!address) return res.status(404).json({ msg: "Address not found" });

      address.name = name;
      address.mobile = mobile;
      address.address = addr;
      address.city = city;
      address.state = state;
      address.pincode = pincode;

      await address.save();

      res.status(200).json(address);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route DELETE /api/profile/address/:id
//@desc delete address
//@access Private
router.delete("/address/:id", auth, async (req, res) => {
  try {
    let id = req.params.id;

    let profile = await Profile.findOne({ _id: req.profile.id });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    let addressId = profile.addresses.find((addressId) => addressId == id);
    if (!addressId)
      return res.status(404).json({ msg: "Address ID not found" });

    await Address.deleteOne({ _id: id });

    let addresses = profile.addresses.filter((addressId) => addressId != id);
    profile.addresses = addresses;
    await profile.save();

    return res.status(404).json(addressId);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
