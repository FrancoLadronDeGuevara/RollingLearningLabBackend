const Workshop = require("../models/workshop.model");

const addWorkshop = async (req, res) => {
  try {
    const { title, description, speaker, date, image } = req.body;
		if(!title.length || !description.length || !speaker.length || !date.length || !image.length) return res.status(500).json({message: 'Todos los campos deben completarse'});
    const newWorkshop = new Workshop({title, description, speaker, date, image});
    if(!newWorkshop) return res.status(400).json({message:"no se pudo crear el workshop"})
    const workshopCreated = await newWorkshop.save();
    return res
      .status(200)
      .json({ message: "Workshop creado con éxito", data: workshopCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el workshop ", error });
  }
};

const updateWorkshop = async (req,res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const updatedWorkshop = await Workshop.findByIdAndUpdate(id, data, {new: true});
    if(!updatedWorkshop){
      return res.status(404).json({message: "Workshop no encontrado"})
    }
    return res.status(200).json({message:"Workshop actualizado con éxito", data: updatedWorkshop})
  } catch (error) {
    return res.status(500).json({message:`Hubo un error al actualizar datos: ${error}`})
  }
}

const getWorkshop = async (req, res) => {
  try {
    const {id} = req.params;
    const workshop = await Workshop.findById(id)
    if(!workshop){
      return res.status(404).json({message:"Workshop no encontrado"})
    }
    return res.status(200).json({message:"Petición exitosa", data: workshop})
  } catch (error) {
    return res.status(500).json({message:`Ha ocurrido un error: ${error}`})
  }
}

const getAllWorkshops = async (req, res) => {
  const maxElements = 10
  try {
    const page = parseInt(req.query.page) || 1;
    const workshops = await Workshop.find({}).skip(maxElements * (page - 1))
    .limit(maxElements);
    if(!workshops.length){
      return res.status(404).json({message:"No hay workshops disponibles"})
    }
    return res.status(200).json({message:"Peticion exitosa", data: workshops})
  } catch (error) {
    return res.status(500).json({message:`Hubo un error: ${error}`})
  }
}
module.exports = {
  addWorkshop,
  updateWorkshop,
  getWorkshop,
  getAllWorkshops
};
