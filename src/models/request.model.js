const { Schema, model } = require("mongoose");

const requestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workshop: {
      type: Schema.Types.ObjectId,
      ref: "Workshop"
    },
    roleRequest: {
      status: {
        type: String,
        enum: ["PENDIENTE", "APROBADA", "RECHAZADA"],
        default: null,
      },
      request: {
        type: Boolean,
        default: false,
      },
      note: {
        type: String,
        default: null,
      },
    },
    workshopRequest: {
      status: {
        type: String,
        enum: ["PENDIENTE", "APROBADA", "RECHAZADA"],
        default: null,
      },
      request: {
        type: Boolean,
        default: false,
      },
      note: {
        type: String,
        default: null,
      },
    },
    adminNote: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Request", requestSchema);
