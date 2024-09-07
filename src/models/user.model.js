const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const avatars = require("../helpers/userAvatars");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true,
    },
    profileImage: {
      type: String,
      default: function () {
        const randomIndex = Math.floor(Math.random() * avatars.length);
        return avatars[randomIndex];
      },
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    role: {
      type: String,
      enum: ["admin", "speaker", "user"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    favoriteWorkshops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workshop",
      },
    ],
    favoriteEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    registeredWorkshops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workshop",
      },
    ],
    likedWorkshops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workshop",
      },
    ],
    likedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    createdWorkshops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workshop",
      },
    ],
    attendanceHistory: [
      {
        workshop: {
          type: Schema.Types.ObjectId,
          ref: "Workshop",
          required: true,
        },
        status: {
          type: String,
          enum: ["confirmado", "cancelado"],
          required: true,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
};

module.exports = model("User", userSchema);
