const Workshop = require("../models/workshop.model");

const addWorkshopService = async (workshop) => {
  const newWorkshop = new Workshop(workshop);
  if (!newWorkshop)
    return res.status(400).json({ message: "No se pudo agregar el workshop" });
  await newWorkshop.save();
  return newWorkshop;
};

const editWorkshopService = async (id, data) => {
  const updatedWorkshop = await Workshop.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!updatedWorkshop) {
    return res.status(404).json({ message: "Workshop no encontrado" });
  }
  return updatedWorkshop;
};

const getWorkshopService = async (id) => {
  const workshop = await Workshop.findById(id);
  if (!workshop) {
    return res.status(404).json({ message: "Workshop no encontrado" });
  }
  return workshop;
};

const getAllWorkshopsService = async (page, maxElements) => {
  const workshops = await Workshop.find({})
    .skip(maxElements * (page - 1))
    .limit(maxElements);
  if (!workshops.length) {
    return res.status(404).json({ message: "No hay workshops disponibles" });
  }
  return workshops;
};

const deleteWorkshopService = async (id) => {
  const deleteWorkshop = await Workshop.findByIdAndDelete(id);
  if (!deleteWorkshop)
    return res.status(404).json({ message: "No ha encontrado el workshop" });
  return deleteWorkshop;
};
module.exports = {
  addWorkshopService,
  editWorkshopService,
  getWorkshopService,
  getAllWorkshopsService,
	deleteWorkshopService
};
