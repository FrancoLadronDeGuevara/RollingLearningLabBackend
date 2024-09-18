const Workshop = require("../models/workshop.model");
const User = require("../models/user.model");

const addWorkshopService = async (workshop, id) => {
  const newWorkshop = new Workshop({ ...workshop, createdBy: id });
  if (!newWorkshop)
    return res.status(400).json({ message: "No se pudo agregar el workshop" });
  await newWorkshop.save();
  await User.findByIdAndUpdate(id, {
    $push: { createdWorkshops: newWorkshop._id },
  });
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
  const workshop = await Workshop.findById(id).populate(
    "createdBy",
    "username email"
  )
  if (!workshop) {
    return res.status(404).json({ message: "Workshop no encontrado" });
  }
  return workshop;
};

const getAllWorkshopsService = async () => {
  const workshops = await Workshop.find()
    .populate("createdBy", "username email role")
    .populate("likes", "username")
    .populate("registeredUsers", "username");
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
  deleteWorkshopService,
};
