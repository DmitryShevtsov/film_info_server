'use strict';
module.exports = (sequelize, DataTypes) => {
  var FilmStar = sequelize.define('FilmStar', {
    filmId: DataTypes.INTEGER,
    starId: DataTypes.INTEGER
  }, {});
  FilmStar.associate = function(models) {
    FilmStar.belongsTo(models.Film, {foreignKey: 'filmId'});
    FilmStar.belongsTo(models.Star, {foreignKey: 'starId'});
    // associations can be defined here
  };
  return FilmStar;
};