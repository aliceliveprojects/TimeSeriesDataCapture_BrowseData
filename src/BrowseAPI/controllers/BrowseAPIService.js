'use strict';
var httpUtil = require('../util/http/http');
var browseService = require('../util/browse/browse');

/**
 * Searches for componenets
 * Searches database for components that match search string
 *
 * search String Search request
 * page Integer page number (optional)
 * pagesize Integer page size (number of components) (optional)
 * returns List
 **/
exports.componentSearch = function(args,res,next) {
  
  let search = args.search.value;
  let page = args.page.value;
  let pagesize = args.pagesize.value;


  browseService.componentSearch(search,page,pagesize)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })  
  
}


/**
 * Deletes a specific component
 * Deletes a specific imported component by component ID
 *
 * componentID String Component ID specifies which component to download 
 * no response value expected for this operation
 **/
exports.deleteComponent = function(args,res,next) {

  let componentID = args.componentID.value;

  browseService.deleteComponent(componentID)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })  
}


/**
 * Gets file storage token
 * Retrieves file storage token login into file storage
 *
 * returns Integer
 **/
exports.getAuthenticate = function(args,res,next) {
  browseService.getAuthenticate()
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })  
}


/**
 * Get a specific component
 * Get a specific imported component by component ID
 *
 * componentID String Component ID specifies which component to download 
 * returns inline_response_200
 **/
exports.getComponent = function(args,res,next) {

  let componentID = args.componentID.value;

  browseService.getComponent(componentID)
  .then((result) =>{
   
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })  

}


/**
 * Gets IDs available for import
 * Gets all the component IDs available for import
 *
 * returns List
 **/
exports.getComponentIDs = function(args,res,next) {
  let folderID = args.folderID.value;
  
  browseService.getComponentIDs(folderID)
  .then((result) =>{
    
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })  
}


/**
 * Sends file storage auth token'
 * Sends storage auth token
 *
 * fileStorageToken FileStorageToken 
 * no response value expected for this operation
 **/
exports.postAuthenticate = function(args,res,next) {
  let fileStorageToken = args.fileStorageToken.value;
  
  browseService.postAuthenticate(fileStorageToken)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })  
}


/**
 * Posts component IDs for import
 * Posts all the component IDs for import
 *
 * componentIDs List 
 * no response value expected for this operation
 **/
exports.postComponentIDs = function(args,res,next) {
  let componentIDs = args.componentIDs.value;
  
  browseService.postComponentIDs(componentIDs)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  }) 
}


/**
 * Deletes a specific component
 * Deletes a specific imported component by component ID
 *
 * componentID String Component ID specifies which component to download 
 * component List 
 * no response value expected for this operation
 **/
exports.updateComponent = function(args,res,next) {
  let componentID = args.componentID.value;
  let component = args.component.value;
  
  browseService.updateComponent(componentID,component)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  }) 
}

