const User = require("../models/user.model");

const createUserService = async (user) => {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

const getByEmailService = async (email) => {
  return User.findOne({ email });
};

const getUserByUsernameService = async (username) => {
  return User.findOne({ username });
};
const getUserService = async (id) => {
  return User.findById(id);
};

const getUserByIdService = async (id) => {
  try {
    const user = await User.findById(id)
      .populate("favoriteWorkshops")
      .populate("favoriteEvents")
      .populate("registeredWorkshops")
      .populate("createdWorkshops")
      .populate("attendanceHistory.workshop");

    return user;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw new Error("Error interno del servidor");
  }
};

const getAllUsersService = async () => {
  return User.find({});
};

const deleteUserService = async (id) => {
  return User.findByIdAndDelete(id);
};

const editUserService = async (id, user) => {
  return User.findByIdAndUpdate(id, user, { new: true });
};

const updateUserService = async (id, user) => {
  return User.findByIdAndUpdate(id, user, { new: true });
};

const addFavoriteWorkshopService = async (id, workshopId) => {
  const user = await User.findById(id);
  user.favoriteWorkshops.push(workshopId);
  await user.save();
  return workshopId;
}

const removeFavoriteWorkshopService = async (id, workshopId) => {
  const user = await User.findById(id);
  user.favoriteWorkshops.pull(workshopId);
  await user.save();
  return workshopId;
}

const addFavoriteEventService = async (id, eventId) => {
  const user = await User.findById(id);
  user.favoriteEvents.push(eventId);
  await user.save();
  return eventId;
}

const removeFavoriteEventService = async (id, eventId) => {
  const user = await User.findById(id);
  user.favoriteEvents.pull(eventId);
  await user.save();
  return eventId;
}

module.exports = {
  createUserService,
  getUserService,
  getUserByIdService,
  getByEmailService,
  getUserByUsernameService,
  getAllUsersService,
  deleteUserService,
  editUserService,
  updateUserService,
  addFavoriteWorkshopService,
  removeFavoriteWorkshopService,
  addFavoriteEventService,
  removeFavoriteEventService
};
