const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Titulo obligatorio"],
    },
    description: {
      type: String,
      required: [true, "Descripción obligatoria."],
    },
    date: {
      type: String,
      required: [true, "Fecha obligatoria"],
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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["PENDIENTE", "COMPLETADO", "CANCELADO"],
      default: "PENDIENTE",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = model("Event", eventSchema);
