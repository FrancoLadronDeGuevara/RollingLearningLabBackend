const { Schema, model } = require("mongoose");
const workshopSchema = new Schema({
  title: {
    type: String,
    required: [true, "Titulo obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
  },
  speaker: {
    type: String,
    required: [true, "Nombre de disertante obligatorio"],
  },
  date: {
    type: Date,
    required: [true, "La fecha es obligatoria"],
  },
  image: String,
  video: String,
  createdAt: {
    type: Date,
    defualt: Date.now(),
  },
  finalized: {
    type: Boolean,
    default: false,
  },
  virtualDelete: {
    type: Boolean,
    default: false,
  },
});

workshopSchema.set("toJSON", {
	transform: function(doc, retorno){
    retorno.workshopId = retorno._id,
    delete retorno._id,
    delete retorno.__v
  }
})
module.exports = model("Workshop", workshopSchema);