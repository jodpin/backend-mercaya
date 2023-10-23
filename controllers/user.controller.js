import User from "../models/user.model.js";
// import generateId from "../helpers/generateId.js";
import generateJwt from "../helpers/generateJwt.js";

export const createUser = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    const error = new Error("Ya existe un usuario con este email");
    return res.status(400).json({
      msg: error.message,
    });
  }
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }


  // confirmar su password
  if (user.password === password) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      admin: user.admin,
      token: generateJwt(user._id),
    });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

export const profile = async (req, res) => {
  res.json(req.user);
};
