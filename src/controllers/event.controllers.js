const Event = require("../models/event.model");
const addEvent = async (req, res) => {
  try {
    const data = req.body;
    const eventCreated = await Event(data);
    if (!eventCreated)
      return res.status(400).json({ message: "No se pudo crear el evento" });
    await eventCreated.save();
		return res.status(200).json({message:"Evento creado con éxito", data: eventCreated});
  } catch (error) {
    return res.status(500).json({ message: "Hubo un problema", error });
  }
};

const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateEvent = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!updateEvent)
      return res
        .status(400)
        .json({ message: "hubo un error al actualizar los datos" });
    return res
      .status(200)
      .json({ message: "Evento creado con exito", data: updateEvent });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error", error });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const broughtEvent = await Event.findById(id);
    if (!broughtEvent)
      return res.status(404).json({ message: "Evento no encontrado" });
    return res
      .status(200)
      .json({ message: "petición exitosa", data: broughtEvent });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error", error });
  }
};

const getAllEvents = async (req, res) => {
  const maxElements = 5;
  try {
    const page = parseInt(req.query.page) || 1;
    const events = await Event.find({})
      .skip(maxElements * (page - 1))
      .limit(maxElements);
    if (!events)
      return res.status(404).json({ message: "No se encontraron eventos" });
    return res.status(200).json({ message: "Petición exitosa", data: events });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent)
      return res.status(400).json({ message: "No se pudo eliminar el evento" });
    return res
      .status(200)
      .json({ message: "Evento elminado con exito", data: deletedEvent });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error", error });
  }
};
module.exports = {
  addEvent,
  editEvent,
  getEventById,
  getAllEvents,
  deleteEvent,
};
