const { text } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      text: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    birthDate: {
      type: String,
    },
    gender: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    request: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    search: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          text: true,
        },
        createdAt: {
          type: Date,
          require: true,
        },
      },
    ],
    details: {
      currentCity: {
        type: String,
      },
      workplace: {
        type: String,
      },
      university: {
        type: String,
      },
      hometown: {
        type: String,
      },
    },
    savedPost: [
      {
        post: {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
