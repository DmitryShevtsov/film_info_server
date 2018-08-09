var express = require('express');
var router = express.Router();
var models = require('../models');
var Film = models.Film;


//Доделать проверки, ошибки, парсинг джейсонов для актеров

router.post('/films', (req, res) => {
  let stars = req.body.stars;
  if (req.body.title && req.body.release && req.body.format && req.body.stars) {
    Film.find({
      where: {
        title: req.body.title
      }
    }).then((film) => {
      if (film) res.json({"message": "Film already exist"})
      else {
        Film.create({
          title: req.body.title,
          release: req.body.release,
          format: req.body.format,
          stars: stars,
          image: req.body.image
        }).then((film) => {
          res.status(200).json(film);
        });
      }
    })

  }
});

router.get('/films', (req, res) => {
  Film.findAll().then((films) => {
    res.status(200).json(films);
  })
});

router.get('/films/:id', (req, res) => {
  Film.findById(req.params.id).then((film) => {
    res.status(200).json(film);
  })
});


module.exports = router;
