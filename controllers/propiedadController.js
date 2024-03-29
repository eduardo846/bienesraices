import { validationResult } from "express-validator";
import { Precio, Categoria, Propiedad } from "../models/index.js";
const admin = (req, res) => {
  res.render("propiedades/admin", {
    pagina: "Mis propiedades"
  });
};

//! Formulario para crear una propiedad
const crear = async (req, res) => {
  //Consultar modelo de precio y  categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);
  res.render("propiedades/crear", {
    pagina: "Crear Propiedad",
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    datos: {},
  });
};
const guardar = async (req, res) => {
  //validacion
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);
    return res.render("propiedades/crear", {
      pagina: " Crear Propiedad",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body,
    });
  }
  //Crear un registro
  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    lat,
    lng,
    precio: precioId,
    categoria: categoriaId,
  } = req.body;
  const { id: usuarioId } = req.usuario;
  try {
    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId,
      categoriaId,
      usuarioId,
      imagen: "",
    });
    const { id } = propiedadGuardada;
    res.redirect(`/propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};
const agregarImagen = async (req, res) => {
  res.render('propiedades/agregar-imagen', {
    pagina:'Agregar imagen'

  })
};

export { admin, crear, guardar, agregarImagen };
