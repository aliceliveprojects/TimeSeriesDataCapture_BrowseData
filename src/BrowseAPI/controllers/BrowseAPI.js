'use strict';

var utils = require('../util/writer.js');
var BrowseAPIService = require('./BrowseAPIService');


module.exports.componentSearch = function componentSearch (req, res, next) {
  var search = req.swagger.params['search'].value;
  var page = req.swagger.params['page'].value;
  var pagesize = req.swagger.params['pagesize'].value;
  BrowseAPI.componentSearch(search,page,pagesize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/* module.exports.getAuthenticate = function getAuthenticate (req, res, next) {
  BrowseAPI.getAuthenticate()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}; */

module.exports.getAuthenticate = function getAuthenticate1 (req, res, next) {
  BrowseAPIService.getAuthenticate1(req.swagger.params, res, next);
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

module.exports.postAuthenticate = function postAuthenticate (req, res, next) {
  var oneDriveToken = req.swagger.params['oneDriveToken'].value;
  BrowseAPI.postAuthenticate(oneDriveToken)
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
