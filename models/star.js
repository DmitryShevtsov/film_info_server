'use strict';
module.exports = (sequelize, DataTypes) => {
  var Star = sequelize.define('Star', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  Star.associate = function(models) {
    Star.hasMany(models.FilmStar, {foreignKey: 'starId'});
    // associations can be defined here
  };
  return Star;
};