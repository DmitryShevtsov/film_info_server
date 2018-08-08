var express = require('express');
var router = express.Router();
var models = require('../models');
var Film = models.Film;
var FilmStar = models.FilmStar;
var Star = models.Star;
var Op = Sequelize.Op

//Looking for a template in req
//If (template was found) find films with template
//Else find all films
router.get('/films', function(req, res, next) {
  if (req.body.template) {
    Film.findAll({
      where: ["title LIKE ?", "%" + req.body.template + "%"]
    })
      .then((films) => {
        if (!films) {
          Film.findAll({
            where: ["firstName LIKE ?", "%" + req.body.template + "%"]
          })
            .then((films) => {
              if (!films) res.json({"message": "No matches found"})
              else
                res.status(200).json(films);
            })
        }
        else
          res.status(200).json(films);
      }
    )
  }
  else
    Film.findAll().then((films) => {
      res.status(200).json(films);
    })
});

//Find single film by id
router.get('/films/:id', (req, res) => {
  Film.find({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: FilmStar,
        include:[{
          model: Star
        }]
      }
    ]
  }).then((film) => {
    res.status(200).json(film);
  })
});

router.post('/films', (req, res) => {
  if (req.body.title && req.body.release && req.body.stars) {
    Film.find({
      where: {
        [Op.or]: [{title: req.body.title}, {release: req.body.release}]
      }
    }).then((film) => {
      if (film) {
        res.json({"message": "Film already exist in base"})
      }
      else
        Film.create({
          title: req.body.title,
          release: req.body.release,
          image: req.body.image
        }).then();
    })
  }
  else
    res.json({"message": "Fields cant be blank"});
});

module.exports = router;
