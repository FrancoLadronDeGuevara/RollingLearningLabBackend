const Event = require("../models/event.model");
const {
  addEventService,
  editEventService,
  getEventByIdService,
  getAllEventsService,
  deleteEventService,
} = require("../services/event.services");
const addEvent = async (req, res) => {
  try {
    const event = req.body;
    const eventCreated = await addEventService(event);
    return res.status(201).json(eventCreated);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el evento", error });
  }
};

const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateEvent = await editEventService(id, body);
    return res
      .status(200)
      .json(updateEvent);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el evento", error });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const broughtEvent = await getEventByIdService(id);
    return res
      .status(200)
      .json(broughtEvent);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el evento", error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await getAllEventsService();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los eventos", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await deleteEventService(id);
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
