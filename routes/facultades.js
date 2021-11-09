var express = require("express");
var router = express.Router();
var models = require("../models");

// GET
router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  const paginaActual = parseInt(req.query.numeroDePagina);
  const limite = parseInt(req.query.limitePorPag);
  models.facultad
    .findAll({
      attributes: ["id", "nombre", "id_carrera"],
      /////////se agrega la asociacion 
        include:[
                {as:'Carrera-Relacionada', model:models.carrera, attributes: ["id","nombre"]}
                ],
      //////////////////////////////
      offset: (paginaActual-1) * limite,
      limit: limite
    }).then(facultad => res.send(facultad))
    .catch(() => res.sendStatus(500));
});


// POST
router.post("/", (req, res) => {
  models.facultad
    .create({ nombre: req.body.nombre, id_carrera: req.body.id_carrera})
    .then(facultad => res.status(201).send({ id: facultad.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otro facultad con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

// ENCONTRAR facultad
const findFacultad = (id, { onSuccess, onNotFound, onError }) => {
  models.facultad
    .findOne({
      attributes: ["id", "nombre", "id_carrera"],
      where: { id }
    })
    .then(facultad => (facultad ? onSuccess(facultad) : onNotFound()))
    .catch(() => onError());
};


// GET POR ID
router.get("/:id", (req, res) => {
  findFacultad(req.params.id, {
    onSuccess: facultad => res.send(facultad),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


// ACTUALIZAR MATERIA 
router.put("/:id", (req, res) => {
  const onSuccess = facultad =>
    facultad
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra materia con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findFacultad(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


// BORRAR MATERIA
router.delete("/:id", (req, res) => {
  const onSuccess = facultad =>
    facultad
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findFacultad(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
