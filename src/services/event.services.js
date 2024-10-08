const Event = require("../models/event.model");
const addEventService = async (event) => {
  const eventCreated = await Event(data);
  if (!eventCreated)
    return res.status(400).json({ message: "No se pudo crear el evento" });
  await eventCreated.save();
  return eventCreated;
};
const editEventService = async (id, body) => {
  const updateEvent = await Event.findByIdAndUpdate(id, body, { new: true });
  if (!updateEvent)
    return res
      .status(400)
      .json({ message: "hubo un error al actualizar los datos" });
  return updateEvent;
};

const getEventByIdService = async (id) => {
  const broughtEvent = await Event.findById(id);
  if (!broughtEvent)
    return res.status(404).json({ message: "Evento no encontrado" });
  return broughtEvent;
};

const getAllEventsService = async (page, maxElements) => {
  const events = await Event.find({})
    .skip(maxElements * (page - 1))
    .limit(maxElements);
  if (!events)
    return res.status(404).json({ message: "No se encontraron eventos" });
  return events;
};

const deleteEventService = async (id) => {
  const deletedEvent = await Event.findByIdAndDelete(id);
  if (!deletedEvent)
    return res.status(400).json({ message: "No se pudo eliminar el evento" });
  return deletedEvent;
};
module.exports = {
  addEventService,
  editEventService,
  getEventByIdService,
  getAllEventsService,
  deleteEventService,
};
