const {
  createRoleRequestService,
  createWorkshopRequestService,
  editRequestService,
  cancelRequestService,
  getRoleRequestService,
  deleteRequestService,
  getAllRequestsService,
  resendRequestService,
} = require("../services/request.services");

const getAllRequests = async (req, res) => {
  try {
    const requests = await getAllRequestsService();
    return res.status(200).json(requests);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener las solicitudes", error });
  }
};

const requestSpeaker = async (req, res) => {
  try {
    const request = req.body;

    const newRequest = {
      user: request.user,
      roleRequest: {
        status: "PENDIENTE",
        request: true,
        note: request.note,
      },
    };
    const createdRequest = await createRoleRequestService(newRequest);
    return res.status(201).json(createdRequest);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear la solicitud de rol", error });
  }
};

const requestWorkshop = async (req, res) => {
  try {
    const request = req.body;
    const createdRequest = await createWorkshopRequestService(request);
    return res.status(201).json(createdRequest);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear la solicitud de taller", error });
  }
};

const editRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = req.body;
console.log(request)
    const updatedRequest = await editRequestService(id, request);

    return res.status(200).json(updatedRequest);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al editar la solicitud", error });
  }
};

const cancelRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const canceledRequest = await cancelRequestService(id);
    return res.status(200).json(canceledRequest);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al cancelar la solicitud", error });
  }
};

const getRoleRequest = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const request = await getRoleRequestService(id);
    return res.status(200).json(request);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener la solicitud", error });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await deleteRequestService(id);
    return res.status(200).json(deletedRequest);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar la solicitud", error });
  }
};

const resendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = req.body;
    const sentRequest = await resendRequestService(id, request);
    return res.status(200).json(sentRequest);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al reenviar la solicitud", error });
  }
};

module.exports = {
  getAllRequests,
  requestSpeaker,
  requestWorkshop,
  editRequest,
  cancelRequest,
  getRoleRequest,
  deleteRequest,
  resendRequest
};
