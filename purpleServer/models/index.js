'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var express = require('express');
var bodyParser = require('body-parser');
var api = express();
var app = express.Router();

var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  //console.log(modelName,'modelName');
  //console.log(db[modelName].associate,'associate');
  if (db[modelName].associate) {
    db[modelName].associate(db);
    
  }

});


sequelize.sync({
  //force: true
}).then(function(err) {
  console.log('It worked!');
}, function(err) { 
  console.log('An error occurred while creating the table:', err);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
