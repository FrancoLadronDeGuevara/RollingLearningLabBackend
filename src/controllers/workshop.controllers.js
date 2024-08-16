const Workshop = require("../models/workshop.model");
const{addWorkshopService, editWorkshopService, getWorkshopService, getAllWorkshopsService, deleteWorkshopService} = require("../services/workshop.services");

const addWorkshop = async (req, res) => {
  try {
    const { title, description, date, imageBanner } = req.body;
    if (
      !title.length ||
      !description.length ||
      !date.length ||
      !imageBanner.length
    )
      return res
        .status(500)
        .json({ message: "Todos los campos deben completarse" });
    const workshopCreated = await addWorkshopService(req.body);
    return res
      .status(200)
      .json({ message: "Workshop creado con éxito", data: workshopCreated });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Error al crear el workshop ", error: error.errors });
  }
};
const editWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedWorkshop = await editWorkshopService(id,data)
    return res
		.status(200)
		.json({
			message: "Workshop actualizado con éxito",
			data: updatedWorkshop,
		});
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Hubo un error al actualizar datos: ${error}` });
  }
};

const getWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await getWorkshopService(id)
    return res
      .status(200)
      .json({ message: "Petición exitosa", data: workshop });
  } catch (error) {
    return res.status(500).json({ message: `Ha ocurrido un error: ${error}` });
  }
};

const getAllWorkshops = async (req, res) => {
  const maxElements = 10;
  try {
    const page = parseInt(req.query.page) || 1;
    const workshops = await getAllWorkshopsService(page, maxElements)
    return res
      .status(200)
      .json({ message: "Peticion exitosa", data: workshops });
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
