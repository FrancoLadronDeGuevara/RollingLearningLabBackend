const { Schema, model } = require("mongoose");

const workshopSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Titulo obligatorio"],
    },
    description: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
    },
    date: {
      type: String,
      required: [true, "La fecha es obligatoria"],
    },
    startTime: {
      type: String,
      required: [true, "El horario de inicio es obligatorio"],
    },
    endTime: {
      type: String,
      required: [true, "El horario de finalización es obligatorio"],
    },
    imageBanner: {
      type: String,
      required: [true, "Banner workshop es obligatoria"],
    },
    speakers: [
      {
        type: String,
        required: [true, "Debes ingresar al menos un Speaker"],
      },
    ],
    attendees: [
      {
        type: String,
        required: [true, "Debes registrar al menos un asistente"],
      },
    ],
    status: {
      type: String,
      enum: ["PENDIENTE", "COMPLETADO", "CANCELADO"],
      default: "PENDIENTE",
    },
    urlVideo: {
      type: String,
    },
    urlZoom: {
      type: String,
      required: [true, "Enlace para workshop obligatorio"],
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: Boolean,
      default: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    registeredUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        confirmedWorkshop: {
          type: Boolean,
          default: false,
        },
        hasEnteredWorkshop: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Workshop", workshopSchema);
