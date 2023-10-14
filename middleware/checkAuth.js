import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// este checkout verifica que el jwt exista, sea valido
// que este en el header
const checkAuth = async(req, res, next) => {
  let token;
  console.log("desde check auth")
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // cuando creamos el token lo firmamos con .sign pero aqui es necesario "desencriptarlo"
      // con verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password -confirmed -token -createdAt -updatedAt -__v");
      // le decimos que traiga los datos del usuario menos la contraseña y demas datos especificados
      return next();
    } catch (error) {
      return res.status(404).json({msg: "hubo un error"})
    }
  }

  if(!token){
    const error = new Error("Token no valido");
    return res.status(401).json({msg: error.message})
  }
  //  detecta este next y luego se va a ejecutar el profile que esta en routes
  next();
};

export default checkAuth;
