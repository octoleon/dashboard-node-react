var express = require("express");
var app = express();
require("./mongoose/db");

const twilioConfig = require("./config/twilioConfig");
var authy = require("authy")("lAI8vE769tjZYzAidxBVn9o8eqmvWwWh");

const Profiles = require("./models/profiles");

var bodyParser = require("body-parser");
var cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes);

app.post("/addProfile", async (req, res) => {
  let { name, email, password, phone, authy_id, otp } = req.body;
  console.log("add Profile route");
  await authy.verify(authy_id, token = otp, async function(err, authRes) {
    console.log("==================================================");
    console.log(authRes);
    console.log("==================================================");

    if (err) {
      console.log("Error =======" ,err);
      // return res.send("otp error");
      return res.status(200).json({ error : "something went wrong" });
    }
    else {
      console.log(name, email, password, phone);
      try {
        var profile = await new Profiles({ name, email, password, phone }); // It returns new record according to data provided even without db connection?
        let newRec = await profile.save();
        let user = { name, email, phone };
        const token = await profile.generateAuthToken();
        return res.send({ user, token });
      } catch (error) {
        console.log(error);
        return res.status(400).send("Error Occurred." + error);
      }
    }
  });
 
});

app.post("/getOtp", async (req, res) => {
  console.log("get otp");
  let { email, phone } = req.body;
  let countryCode = phone.substring(0, 2);
  let phoneNo = phone.substring(2, phone.length);
  try {
    authy.register_user(email, phoneNo, countryCode, function(err, resp) {
      if (!err) {
        let authy_id = resp.user.id;
        authy.request_sms(authy_id, function(smsErr, smsRes) {
          if (!smsErr) {
            console.log({ smsRes, authy_id });
            res.send({ smsRes, authy_id });
          } else {
            console.log(smsErr);
            res.status(400).send("something went wrong");
          }
        });
      } else {
        console.log(err);
        res.status(500).send("something went wrong");
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("something went wrong");
  }
});

var port = 5000;

app.listen(port, function() {
  console.log("Server listening at port %d", port);
});
