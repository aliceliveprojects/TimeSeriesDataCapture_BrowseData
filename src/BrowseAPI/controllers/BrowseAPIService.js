'use strict';


/**
 * Searches for componenets
 * Searches database for components that match search string
 *
 * search String Search request
 * page Integer page number (optional)
 * pagesize Integer page size (number of components) (optional)
 * returns inline_response_200_2
 **/
exports.componentSearch = function(search,page,pagesize) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Components" : [ "{}", "{}" ]
};
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
 * returns inline_response_200_1
 **/
exports.getComponent = function(componentID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Component" : "{}"
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
 * returns inline_response_200
 **/
exports.getComponentIDs = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ComponentIDs" : [ "ComponentIDs", "ComponentIDs" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Posts component IDs for import
 * Posts all the component IDs for import
 *
 * componentIDs ComponentIDs  (optional)
 * no response value expected for this operation
 **/
exports.postComponentIDs = function(componentIDs) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

