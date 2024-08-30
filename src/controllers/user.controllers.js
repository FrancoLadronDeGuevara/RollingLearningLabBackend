const {
  hashingPassword,
  passwordChecking,
} = require("../helpers/passwordHashing");
const {
  getUserService,
  getUserByIdService,
  createUserService,
  getByEmailService,
  getAllUsersService,
  editUserService,
  deleteUserService,
  getUserByUsernameService,
} = require("../services/user.services");
const sendToken = require("../helpers/jwtToken");
const sgMail = require("@sendgrid/mail");

const strongPasswordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const strongEmailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;

const createUser = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    const user = req.body;

    const userExist = await getByEmailService(user.email);

    const usernameExist = await getUserByUsernameService(user.username);

    if (usernameExist)
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya se encuentra ocupado" });

    if (userExist)
      return res
        .status(400)
        .json({ message: "El email ya se encuentra registrado" });

    if (!user.password || !user.email || !user.username)
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });

    if (!strongPasswordRegex.test(user.password))
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 8 carácteres y contener al menos una letra mayúscula, una letra minúscula y un número",
      });

    if (!strongEmailRegex.test(user.email))
      return res
        .status(400)
        .json({ message: "El correo ingresado no es valido" });

    if (!usernameRegex.test(user.username))
      return res
        .status(400)
        .json({ message: "El nombre de usuario no es valido" });

    const userWithPassHash = await hashingPassword(user);

    const userCreated = await createUserService(userWithPassHash);

    const verificationLink = `http://localhost:5173/verify-user/${userCreated._id}`;

    const msg = {
      to: user.email,
      from: "rollingcodesupp@gmail.com",
      subject: "¡Bienvenido a RollingCode Learning Lab!",
      html: `<b>¡Hola email!</b>
        <br/>
          <br/>
        <i>¡Bienvenido a RollingCode Learning Lab! Estamos emocionados de tenerte como parte de nuestra comunidad. 
        Esperamos que disfrutes explorando nuestra plataforma y que te diviertas aprendiendo.
          <br/>
          <br/>
          Para verificar tu cuenta => <a href="${verificationLink}">
          <button style="padding: 8px 16px; color: #fff; background-color: #d81d26; border-radius:30px; cursor:pointer" >HAZ CLICK AQUÍ
          </button>
            </a>
          <br/>
          <br/>
        ¡Gracias por ser parte de nuestra comunidad!
          <br/>
          <br/>
        El equipo de RollingCode
           `,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email enviado correctamente");
      })
      .catch((error) => {
        console.error(error);
      });

    res
      .status(201)
      .json({ message: "Usuario creado con exito", user: userCreated });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

const getUserToVerify = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserService(id);

    if (!user) return res.status(400).json({ message: "El usuario no existe" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserService(id);

    if (!user) return res.status(400).json({ message: "El usuario no existe" });

    if (user.verified)
      return res
        .status(400)
        .json({ message: "El usuario ya ha sido verificado" });

    user.verified = true;

    await user.save();

    res
      .status(200)
      .json({ message: "El usuario ha sido verificado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al verificar el usuario", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const payload = req.body;

    const user = await getByEmailService(payload.email);

    if (!user)
      return res.status(400).json({ message: "El usuario no esta registrado" });

    if (!user.verified)
      return res
        .status(400)
        .json({ message: "El usuario no ha sido verificado" });

    if (!user.active)
      return res
        .status(400)
        .json({
          message:
            "El usuario ha sido dado de baja por no cumplir con las politicas",
        });

    const passMatch = await passwordChecking(payload.password, user.password);

    if (!passMatch)
      return res
        .status(400)
        .json({ message: "La contraseña ingresada no es valida" });

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({ message: "Error al loguearse", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      message: "Cerraste sesion con exito!",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error al cerrar sesión", error });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await getUserService(req.user.id);

    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario", error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id)
    const user = await getUserByIdService(id);

    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    if (!users) {
      return res.status(400).json({ message: "No hay usuarios registrados" });
    }

    res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id == req.user.id)
      return res
        .status(400)
        .json({ message: "No puedes editar tu propio usuario" });

    const payload = req.body;

    const userEdited = await editUserService(id, payload);
    if (!userEdited) return res.status(404).json("Usuario no encontrado");
    res.status(200).json(userEdited);
  } catch (error) {
    res.status(500).json({ message: "Error al editar el usuario", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id == req.user.id)
      return res
        .status(400)
        .json({ message: "No puedes eliminar tu propio usuario" });

    const userDeleted = await deleteUserService(id);

    if (!userDeleted) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    res.status(200).json(userDeleted);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

module.exports = {
  createUser,
  getUserToVerify,
  verifyUser,
  getUser,
  getUserById,
  loginUser,
  logoutUser,
  getAllUsers,
  editUser,
  deleteUser,
};
