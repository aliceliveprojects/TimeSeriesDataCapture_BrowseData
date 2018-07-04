'use strict';

var utils = require('../util/writer.js');
var BrowseAPI = require('./BrowseAPIService');

module.exports.componentSearch = function componentSearch (req, res, next) {
  var search = req.swagger.params['search'].value;
  var offset = req.swagger.params['offset'].value;
  BrowseAPI.componentSearch(search,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getComponent = function getComponent (req, res, next) {
  var componentID = req.swagger.params['componentID'].value;
  BrowseAPI.getComponent(componentID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getComponentIDs = function getComponentIDs (req, res, next) {
  BrowseAPI.getComponentIDs()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postComponentIDs = function postComponentIDs (req, res, next) {
  var componentIDs = req.swagger.params['componentIDs'].value;
  BrowseAPI.postComponentIDs(componentIDs)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
