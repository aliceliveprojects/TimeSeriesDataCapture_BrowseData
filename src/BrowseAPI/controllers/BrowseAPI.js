'use strict';

var utils = require('../util/writer.js');
var BrowseAPI = require('./BrowseAPIService');

module.exports.componentSearch = function componentSearch (req, res, next) {

  BrowseAPI.componentSearch(req.swagger.params,res,next);
    
};

module.exports.deleteComponent = function deleteComponent (req, res, next) {
  BrowseAPI.deleteComponent(req.swagger.params,res,next);
};

module.exports.getAuthenticate = function getAuthenticate (req, res, next) {
  BrowseAPI.getAuthenticate(req.swagger.params,res,next);
};

module.exports.getComponent = function getComponent (req, res, next) {
  BrowseAPI.getComponent(req.swagger.params,res,next);
};

module.exports.getComponentIDs = function getComponentIDs (req, res, next) {
  BrowseAPI.getComponentIDs(req.swagger.params,res,next);
};

module.exports.postAuthenticate = function postAuthenticate (req, res, next) {
  BrowseAPI.postAuthenticate(req.swagger.params,res,next);
};

module.exports.postComponentIDs = function postComponentIDs (req, res, next) {
  BrowseAPI.postComponentIDs(req.swagger.params,res,next);
};

module.exports.updateComponent = function updateComponent (req, res, next) {
  BrowseAPI.updateComponent(req.swagger.params,res,next);
};
