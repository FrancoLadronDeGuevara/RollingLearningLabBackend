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

module.exports = {
  createUserService,
  getUserService,
  getUserByIdService,
  getByEmailService,
  getUserByUsernameService,
  getAllUsersService,
  deleteUserService,
  editUserService,
};
