const { Schema, model } = require("mongoose");
const eventSchema = new Schema({
	title: {
		type: String,
		required: [true, "Titulo obligatorio"]
	},
	description: {
		type:String,
		required: [true, "Descripción obligatoria."]
	},
	date: {
		type: Date,
		required: [true, "Fecha obligatoria"]
	},
	time: {
		type: String,
		required: [true, "El horario es obligatorio"]
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: "User"
	}]
})

eventSchema.set("toJSON", {
	transform: function(doc, retorno){
		retorno.eventId = retorno._id,
		delete retorno._id,
		delete retorno.__v
	}
})
module.exports = model("Event", eventSchema);