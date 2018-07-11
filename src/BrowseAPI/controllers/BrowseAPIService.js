'use strict';

var https = require('https');
var httpUtil = require('../util/http/http');
var browseAPI = require('../util/browse/browse');

var auth_token = '1a67f6f4-db2a-4298-8cf8-72946ac50669';
var oneToken = '';

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
 * Searches for componenets
 * Retrieves OneDrive clientID needed for OneDrive Login
 *
 * returns inline_response_200_3
 **/
exports.getAuthenticate = function() {
  return new Promise(function(resolve, reject) {
    if(auth_token.length > 0){
      resolve({
        auth_token: auth_token
      })
    }else{
      reject({
        auth_token: 'error'
      });
    }
  });
}

exports.getAuthenticate1 = function(args,res,next){
  browseAPI.getAuthenticate1()
  .then((result) => {
    httpUtil.endHttpOK(result,res);
  }).catch((error) => {
    httpUtil.endHttpErr(error,res);
  })
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
 * 
 * https://graph.microsoft.com/v1.0/me/drive/root/children
 **/
exports.getComponentIDs = function() {
  return new Promise(function(resolve, reject) {

    var options = {
      protocol: 'https:',
    host: 'graph.microsoft.com',
      path:'/v1.0/me/drive/root/children',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + oneToken
  }
  };
    var str = ''
    var req = https.request(options, function(res) {
     
      res.on('data', function (chunk) {
        str += chunk
        
      });

      res.on('end', function () {
        console.log(str);
        resolve({
          ComponentIDs:[str]
        })
      });
    });
    
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.end();


  });
}


/**
 * Sends OneDrive auth token'
 * Sends OneDrive auth token
 *
 * oneDriveToken OneDriveToken 
 * no response value expected for this operation
 **/
exports.postAuthenticate = function(oneDriveToken) {
  return new Promise(function(resolve, reject) {
    console.log(oneDriveToken);
    console.log(JSON.stringify(oneDriveToken));
    oneToken = oneDriveToken.token;
    console.log(oneToken);
    resolve();
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




