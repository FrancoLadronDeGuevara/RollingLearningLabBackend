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
  return User.findById(id);
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
