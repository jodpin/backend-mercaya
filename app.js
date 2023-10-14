// en esta funcion se maneja todo lo que es de express

import express from "express";
import morgan from "morgan";
import cors from "cors";

// cors se usa para indicar que se puede conectar a otros servidores

import routerProducts from "./routes/products.js";
import blogRouter from "./routes/blogs.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
//El siguiente middleware se usa para que express
// Entienda el lenguaje json()
app.use(express.json());

// si ponemos esta porcion de codigo aqui siempre que se haga una peticion (delete o post ola quesea)
// va a subir un archivo a la carpeta uploads, entonces la ponemos en post
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "./uploads",
//   })
// );

app.use(routerProducts);
app.use(userRouter);
app.use("/api", blogRouter);


export default app;
