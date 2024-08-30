const validators = {
  validateTitle: (title) => {
    if (title.length < 5) return "El titulo debe tener al menos 5 caracteres";
    if (title.length > 200)
      return "El titulo es demasiado extenso, no debe tener más de 200 caracteres";
    return null;
  },
  validateDescription: (description) => {
    if (description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (description.length > 500)
      return "Descripción tdemasiado extensa no debe tener más de 500 caraceres.";
    return null;
  },
  validateDate: (date) => {
    const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegexp.test(date))
      return "La fecha debe estar en formato dd-mm-yyyy";
    return null;
  },
  validateTime: (time) => {
		const timeRegexp = /^([01]\d|2[0-3]):([0-5]\d)$/;
		if(!timeRegexp.test(time)) return "El horario debe estar en formato HH:mm."
		return null;
	},
};
module.exports = validators