const Request = require("../models/request.model");
const User = require("../models/user.model");
const Workshop = require("../models/workshop.model");

const getAllRequestsService = async () => {
  const requests = await Request.find({}).populate("user", "username role");
  return requests;
};

const createRoleRequestService = async (request) => {
  const newRoleRequest = new Request(request);
  await newRoleRequest.save();
  return newRoleRequest;
};

const createWorkshopRequestService = async (request) => {
  const newWorkshopRequest = new Request(request);
  await newWorkshopRequest.save();
  return newWorkshopRequest;
};

const getWorkshopRequestService = async (userId) => {
  try {
    const requestsFound = await Request.find({
      user: userId,
      workshopRequest: { $exists: true },
    });

    return requestsFound;
  } catch (error) {
    console.error("Error al obtener las requests del usuario", error);
    throw new Error("Error al obtener las requests");
  }
};

const editRequestService = async (id, request) => {
  if (request.roleRequest?.status === "ACEPTADA") {
    await User.findByIdAndUpdate(
      request.referenceId,
      { role: "speaker" },
      { new: true }
    );
  } else if (request.workshopRequest?.status === "ACEPTADA") {
    await Workshop.findByIdAndUpdate(
      request.referenceId,
      { active: true },
      { new: true }
    );
  }

  const updatedRequest = await Request.findByIdAndUpdate(id, request, {
    new: true,
  }).populate("user", "username role");
  return updatedRequest;
};

const cancelRequestService = async (id) => {
  const canceledRequest = await Request.findByIdAndUpdate(
    id,
    { canceled: true },
    { new: true }
  );
  return canceledRequest;
};

const getRoleRequestService = async (id) => {
  const request = await Request.findOne({ user: id });
  return request;
};

const deleteRequestService = async (id) => {
  const deletedRequest = await Request.findByIdAndDelete(id);
  return deletedRequest;
};

const resendRequestService = async (id, request) => {
  if (request.roleRequest?.request) {
    await Request.findByIdAndUpdate(
      id,
      {
        ...request,
        roleRequest: {
          status: "PENDIENTE",
          note: request.roleRequest.note,
          request: true,
        },
        adminNote: null,
      },
      { new: true }
    );
    return request;
  } else {
    await Request.findByIdAndUpdate(
      id,
      {
        ...request,
        workshopRequest: {
          status: "PENDIENTE",
          note: request.workshopRequest.note,
          request: true,
        },
        adminNote: null,
      },
      { new: true }
    );
    return request;
  }
};

module.exports = {
  getAllRequestsService,
  createRoleRequestService,
  createWorkshopRequestService,
  editRequestService,
  cancelRequestService,
  getRoleRequestService,
  deleteRequestService,
  resendRequestService,
  getWorkshopRequestService,
};
