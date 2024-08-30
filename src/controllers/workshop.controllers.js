const validators = require("../helpers/validators");
const {
  addWorkshopService,
  editWorkshopService,
  getWorkshopService,
  getAllWorkshopsService,
  deleteWorkshopService,
} = require("../services/workshop.services");

const addWorkshop = async (req, res) => {
  try {
    const {id} = req.user
    const workshop = req.body;

    if (
      !workshop.title ||
      !workshop.description ||
      !workshop.date ||
      !workshop.imageBanner ||
      !workshop.startTime ||
      !workshop.endTime ||
      !workshop.speakers ||
      !workshop.attendees ||
      !workshop.urlZoom
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const workshopCreated = await addWorkshopService(workshop, id);

    return res.status(200).json(workshopCreated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el workshop ", error});
  }
};
const editWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedWorkshop = await editWorkshopService(id, data);

    return res.status(200).json(updatedWorkshop);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Hubo un error al actualizar datos: ${error}` });
  }
};

const getWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    
    const workshop = await getWorkshopService(id);
    return res
      .status(200)
      .json(workshop);
  } catch (error) {
    return res.status(500).json({ message: `Ha ocurrido un error: ${error}` });
  }
};

const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await getAllWorkshopsService();

    if (workshops.length === 0) {
      return res.status(404).json({ message: "No hay workshops creados" });
    }

    res.status(200).json(workshops);
  } catch (error) {
    return res.status(500).json({ message: `Hubo un error: ${error}` });
  }
};

const deleteWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWorkshop = await deleteWorkshopService(id);
    return res
      .status(200)
      .json({ message: "Workshop eliminado con exito", data: deleteWorkshop });
  } catch (error) {
    return res.status(500).json({ message: `Ha ocurrido un error: ${error}` });
  }
};
module.exports = {
  addWorkshop,
  editWorkshop,
  getWorkshop,
  getAllWorkshops,
  deleteWorkshop,
};
