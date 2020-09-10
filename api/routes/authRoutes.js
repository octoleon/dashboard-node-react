const express = require("express");
const auth = require("../middlewares/auth");
const Profiles = require("../models/profiles");
const routes = express.Router();

routes.post("/profiles/login", async (req, res) => {
  try {
    console.log(req.body.email, req.body.password);
    const profile = await Profiles.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log("Profile ==", profile);
    const token = await profile.generateAuthToken();
    const publicData = await profile.sendPublicDataOnly();
    console.log(publicData);
    res.send({ publicData, token });
  } catch (error) {
    res.status(400).send("error occurred" + error);
  }
});

routes.post("/profiles/logout", auth, async (req, res) => {
  try {
    const { profile, token } = req;
    profile.tokens = profile.tokens.filter(t => t.token !== token);
    console.log(profile);

    await profile.save();
    res.send();
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = routes;
