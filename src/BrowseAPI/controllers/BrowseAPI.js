'use strict';

var utils = require('../util/writer.js');
var BrowseAPI = require('./BrowseAPIService');

/* module.exports.componentSearch = function componentSearch (req, res, next) {

  BrowseAPI.componentSearch(req.swagger.params,res,next);
    
}; */


module.exports.addComponentAnnotations = function addComponentAnnotations(req, res, next) {
  BrowseAPI.addComponentAnnotations(req.swagger.params, res, next);
};

module.exports.addComponentTags = function addComponentTags(req, res, next) {
  BrowseAPI.addComponentTags(req.swagger.params, res, next);
};

module.exports.componentSearch = function componentSearch(req, res, next) {
  BrowseAPI.componentSearch(req.swagger.params, res, next);
};

module.exports.deleteComponent = function deleteComponent(req, res, next) {
  BrowseAPI.deleteComponent(req.swagger.params, res, next);
};

module.exports.deleteComponentAnnotation = function deleteComponentAnnotation(req, res, next) {
  
  BrowseAPI.deleteComponentAnnotation(req.swagger.params, res, next);
};

module.exports.getAlgorithms = function getAlgorithms(req,res,next){
  BrowseAPI.getAlgorithms(req.swagger.params,res,next);
}

module.exports.getTags = function getTags (req, res, next) {
  BrowseAPI.getTags(req.swagger.params, res, next);
};

module.exports.getAuthenticate = function getAuthenticate(req, res, next) {
  BrowseAPI.getAuthenticate(req.swagger.params, res, next);
};

module.exports.getComponent = function getComponent(req, res, next) {
  BrowseAPI.getComponent(req.swagger.params, res, next);
};

module.exports.getComponentPreview = function getComponentPreview(req,res,next){
  BrowseAPI.getComponentPreview(req.swagger.params, res, next);
}

module.exports.getComponentIDs = function getComponentIDs(req, res, next) {
  BrowseAPI.getComponentIDs(req.swagger.params, res, next);
};


module.exports.postAuthenticate = function postAuthenticate(req, res, next) {
  BrowseAPI.postAuthenticate(req.swagger.params, res, next);
};

module.exports.postComponentIDs = function postComponentIDs(req, res, next) {
  BrowseAPI.postComponentIDs(req.swagger.params, res, next);
};

module.exports.updateComponentAnnotation = function updateComponentAnnotation(req, res, next) {
  BrowseAPI.updateComponentAnnotation(req.swagger.params, res, next);
};

module.exports.deleteComponentTag = function  deleteComponentTag(req, res,next){

  BrowseAPI.deleteComponentTag(req.swagger.params,res,next);
}

