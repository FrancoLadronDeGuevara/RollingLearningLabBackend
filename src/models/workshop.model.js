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
  date: {
    type: Date,
    required: [true, "La fecha es obligatoria"],
  },
  time: {
    type:String,
    required: [true, "El horario es obligatorio"]
  },
  imageBanner: {
    type:String,
    required:[true, "Banner workshop es obligatoria"]
  },
  speakers: [{
    type: Schema.Types.ObjectId,
    ref:"User"
  }],
  attendees: [{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  status: {
    type:String,
    enum:["pending", "completed", "canceled"],
    default:"pending"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref:"Comment"
  }],
  urlVideo: String,
  urlZoom: {
    type:String,
    required: [true, "Enlace para workshop obligatorio"]
  },
  createdAt: {
    type: Date,
    defualt: Date.now(),
  },
  updatedAt: {
    type:Date,
    default: Date.now()
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