var express = require("express");
var router = express.Router();
var models = require("../models");

// GET
router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  const paginaActual = parseInt(req.query.numeroDePagina);
  const limite = parseInt(req.query.limitePorPag);
  models.nota
    .findAll({
      attributes: ["id", "alumno", "id_materia", "parc_1", "parc_2", "recu_1", "recu_2", "integrador"],
      /////////se agrega la asociacion 
        include:[{as:'Materia-Relacionada', model:models.materia, attributes: ["id","nombre", "id_carrera", "id_profesor"]}],
      //////////////////////////////
      offset: (paginaActual-1) * limite,
      limit: limite
    }).then(nota => res.send(nota))
    .catch(() => res.sendStatus(500));
});


// POST
router.post("/", (req, res) => {
  models.nota
    .create({ alumno: req.body.alumno, id_materia: req.body.id_materia, parc_1: req.body.parc_1,
            parc_2: req.body.parc_2, recu_1: req.body.recu_1, recu_2: req.body.recu_2, integrador:req.body.integrador 
           })
    .then(nota => res.status(201).send({ id: nota.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otro nota con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

// ENCONTRAR NOTA
const findNota = (id, { onSuccess, onNotFound, onError }) => {
  models.nota
    .findOne({
      attributes: ["id", "alumno", "id_materia", "parc_1", "parc_2", "recu_1", "recu_2", "integrador"],
      where: { id }
    })
    .then(nota => (nota ? onSuccess(nota) : onNotFound()))
    .catch(() => onError());
};


// GET POR ID
router.get("/:id", (req, res) => {
  findNota(req.params.id, {
    onSuccess: nota => res.send(nota),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


// ACTUALIZAR NOTA 
router.put("/:id", (req, res) => {
  const onSuccess = nota =>
    nota
      .update({ parc_1: req.body.parc_1 }, { fields: ["parc_1"] })
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
    findNota(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


// BORRAR NOTA
router.delete("/:id", (req, res) => {
  const onSuccess = nota =>
    nota
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findNota(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
