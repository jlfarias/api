var express = require("express");
var router = express.Router();
var models = require("../models");

// GET
router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.profesor
    .findAll({
      attributes: ["id", "nombre", "id_materia"],
      
      /////////se agrega la asociacion 
       include:[{as:'Materia-Relacionada', model:models.materia, attributes: ["id","nombre", "id_carrera"]}]
      ////////////////////////////////

    })
    .then(profesor => res.send(profesor))
    .catch(() => res.sendStatus(500));
});


// POST
router.post("/", (req, res) => {
  models.profesor
    .create({ nombre: req.body.nombre, id_materia: req.body.id_materia})
    .then(profesor => res.status(201).send({ id: profesor.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otro profesor con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

// ENCONTRAR PROFESOR
const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ["id", "nombre", "id_materia"],
      where: { id }
    })
    .then(profesor => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};


// GET POR ID
router.get("/:id", (req, res) => {
  findProfesor(req.params.id, {
    onSuccess: profesor => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


// ACTUALIZAR PROFESOR 
router.put("/:id", (req, res) => {
  const onSuccess = profesor =>
  profesor
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otro profesor con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


// BORRAR PROFESOR
router.delete("/:id", (req, res) => {
  const onSuccess = profesor =>
  profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
