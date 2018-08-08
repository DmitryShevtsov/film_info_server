'use strict';
module.exports = (sequelize, DataTypes) => {
  var Film = sequelize.define('Film', {
    title: DataTypes.STRING,
    release: DataTypes.STRING,
    format: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Film.associate = function(models) {
    // associations can be defined here
    Film.hasMany(models.FilmStar, {foreignKey: 'filmId'});
  };
  return Film;
};