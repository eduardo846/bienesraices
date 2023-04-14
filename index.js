import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import propiedadesRoutes from "./routes/propiedadesRoutes.js";
import db from "./config/db.js";

//! Crear la app
const app = express();

//! Conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log("Conexion correcta a la Base de datos");
} catch (error) {
  console.log(error);
}
//! Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

//! Habilitar Cookier Parser
app.use(cookieParser());

//! Hbailitar CSRF
app.use(csrf({ cookie: true }));

//! habilitar PUG
app.set("view engine", "pug");
app.set("views", "./views");
//Carpeta publica
app.use(express.static("public"));
//Routing
app.use("/auth", usuarioRoutes);
app.use("/", propiedadesRoutes);

// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor esta funionando en el puerto  ${port}`);
});
