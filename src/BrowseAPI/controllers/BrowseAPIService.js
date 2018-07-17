'use strict';


/**
 * Searches for componenets
 * Searches database for components that match search string
 *
 * search String Search request
 * page Integer page number (optional)
 * pagesize Integer page size (number of components) (optional)
 * returns List
 **/
exports.componentSearch = function(search,page,pagesize) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "component_id", "component_id" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a specific component
 * Deletes a specific imported component by component ID
 *
 * componentID String Component ID specifies which component to download 
 * no response value expected for this operation
 **/
exports.deleteComponent = function(componentID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Gets file storage token
 * Retrieves file storage token login into file storage
 *
 * returns Integer
 **/
exports.getAuthenticate = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "token";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a specific component
 * Get a specific imported component by component ID
 *
 * componentID String Component ID specifies which component to download 
 * returns inline_response_200
 **/
exports.getComponent = function(componentID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "TagCollection" : [ "tag", "tag" ],
  "AnnotationCollection" : [ "annotation", "annotation" ],
  "Date&Timestamp" : 6,
  "Data" : {
    "Column" : [ "data_point", "data_point" ]
  },
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets IDs available for import
 * Gets all the component IDs available for import
 *
 * returns List
 **/
exports.getComponentIDs = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "component_id", "component_id" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Sends file storage auth token'
 * Sends storage auth token
 *
 * fileStorageToken FileStorageToken 
 * no response value expected for this operation
 **/
exports.postAuthenticate = function(fileStorageToken) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Posts component IDs for import
 * Posts all the component IDs for import
 *
 * componentIDs List 
 * no response value expected for this operation
 **/
exports.postComponentIDs = function(componentIDs) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Deletes a specific component
 * Deletes a specific imported component by component ID
 *
 * componentID String Component ID specifies which component to download 
 * component List 
 * no response value expected for this operation
 **/
exports.updateComponent = function(componentID,component) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

