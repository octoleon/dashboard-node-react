const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      // unique: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          console.log("email is invalid.");
          throw new Error("email provided is invalid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      validate: value => {}
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate: value => {}
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
    // avatar : {
    //     type:Buffer
    // }
  },
  {
    toObject: { virtuals: true },
    timestamps: true
  }
);

profileSchema.pre("save", async function(next) {
  let profile = this;
  // console.log(profile.password , " updated password");
  if (profile.isModified("password")) {
    profile.password = await bcrypt.hash(profile.password, 8);
  }
  // console.log(profile.password , " hashed password");
  next();
});

profileSchema.statics.findByCredentials = async (email, password) => {
  const profile = await Profiles.findOne({ email });
  if (!profile) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, profile.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return profile;
};

profileSchema.methods.generateAuthToken = async function() {
  const profile = this;
  const token = jwt.sign({ _id: profile._id.toString() }, "thisIsMySecretKey");
  profile.tokens = profile.tokens.concat({ token });
  await profile.save();
  return token;
};

profileSchema.methods.sendPublicDataOnly = async function() {
  const profile = this;
  const publicProfileData = profile.toObject();

  delete publicProfileData.tokens;
  delete publicProfileData.password;

  return publicProfileData;
};

const Profiles = mongoose.model("profiles", profileSchema);

module.exports = Profiles;
