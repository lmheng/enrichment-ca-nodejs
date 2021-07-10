const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uuid = require("node-uuid");

const { Schema } = mongoose;
const salt = parseInt(process.env.SALT_WORK_FACTOR);

const userSchema = new Schema({
  _id: { type: String, default: (genUUID = () => uuid.v1()) },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password") === false) {
    return next();
  }
  bcrypt.genSalt(salt, function (err, salt) {
    if (err) {
      return next(err);
    }
    // the new salt hashes the new password
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) {
        return next(error);
      }

      // the clear text password overidden
      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

let userModel = mongoose.model("User", userSchema, "users");

module.exports = userModel;
