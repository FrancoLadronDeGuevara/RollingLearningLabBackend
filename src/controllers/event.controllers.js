const Event = require("../models/event.model");
const {addEventService, editEventService, getEventByIdService, getAllEventsService, deleteEventService}= require('../services/event.services');
const addEvent = async (req, res) => {
  try {
    const data = req.body;
    const eventCreated = await addEventService(data);
		return res.status(200).json({message:"Evento creado con éxito", data: eventCreated});
  } catch (error) {
    return res.status(500).json({ message: "Hubo un problema", error });
  }
};

const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateEvent = await editEventService(id, body)
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
    const broughtEvent = await getEventByIdService(id)
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
    const events = await getAllEventsService(page, maxElements)
    return res.status(200).json({ message: "Petición exitosa", data: events });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await deleteEventService(id)
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
