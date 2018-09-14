'use strict';
var httpUtil = require('../util/http/http');
var browseService = require('../util/browse/browse');



/**
 * adds new annotations tag
 * adds new annotations tag for a specific component
 *
 * componentID String Component ID specifies a component
 * annotations List 
 * returns String
 **/
exports.addComponentAnnotations = function(args,res,next) {
  let componentID = args.componentID.value;
  let annotations = args.annotations.value;

  browseService.addComponentAnnotations(componentID,annotations)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  }) 
}

/**
 * adds new tags to a specific component
 * Sends tag IDs to be added to a specific component
 *
 * componentID String Component ID specifies a component
 * tags List 
 * returns List
 **/
exports.addComponentTags = function(args,res,next) {
  let componentID = args.componentID.value;
  let tags = args.tags.value;

  browseService.addComponentTags(componentID,tags)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  }) 
}



/**
 * Searches for componenets
 * Searches database for components that match search string
 *
 * tags searched tags
 * dateTimeStamp searched date and time
 * page Integer page number (optional)
 * pagesize Integer page size (number of components) (optional)
 * returns List
 **/
exports.componentSearch = function(args,res,next) {
  
  let tags = args.tags.value;
  let date = args.date.value;
  let timeStamp = args.timeStamp.value;
  let page = args.page.value;
  let pagesize = args.pagesize.value;
  let authorized = args.authorized.value;


  browseService.componentSearch(tags,date,timeStamp,page,pagesize,authorized)
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
 * Deletes a specific annotation
 * Deletes a specific annotation by annotation ID
 *
 * componentID String Component ID specifies a component
 * annotationID String Annotation ID specifies a annotation
 * returns String
 **/
exports.deleteComponentAnnotation = function(args,res,next) {
  let componentID = args.componentID.value;
  let annotationID = args.annotationID.value;

  browseService.deleteComponentAnnotation(componentID,annotationID)
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
  let authorized = args.authorized.value;

  browseService.getComponent(componentID,authorized)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    console.log(error);
    httpUtil.endHttpErr(error,res);
  })  

}

exports.getComponentPreview = function(args,res,next){
  let componentID = args.componentID.value;

  browseService.getComponentPreview(componentID)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    console.log(error);
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
 * Posts component IDs for import
 * Posts all the component IDs for import
 *
 * returns List
 **/
exports.getAlgorithms =  function(args,res,next){
  browseService.getAlgorithms()
  .then((result) => {
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })
}


/**
 * Searches for componenets
 * Searches database for components that match search string
 *
 * returns List
 **/
exports.getTags = function(args,res,next) {
  var tags = args.tags.value;
  browseService.getTags(tags)
  .then((result) => {
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
 * adds new annotations tag
 * adds new annotations tag for a specific component
 *
 * componentID String Component ID specifies a component
 * annotationID String Annotation ID specifies a annotation
 * annotation Annotation 
 * returns String
 **/
exports.updateComponentAnnotation = function(args,res,next) {
  let componentID = args.componentID.value;
  let annotationID = args.annotationID.value;
  let annotation = args.annotation.value;

  browseService.updateComponentAnnotation(componentID,annotationID,annotation)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  }) 
}

/**
 * deletes tag from a specific component
 * deletes a tag from a specific component
 *
 * componentID String Component ID specifies a component
 * tagID String tag ID specifies a tag
 * returns String
 **/
exports.deleteComponentTag = function(args,res,next) {
  let componentID = args.componentID.value;
  let tagID = args.tagID.value;

  browseService.deleteComponentTag(componentID,tagID)
  .then((result) =>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  }) 
}

/**
 * Removes file storage auth token
 * Removes storage auth token
 * 
 * profileID Object contains string profileID
 */

exports.deleteAuthenticate = function(args,res,next){
  let profileId = args.profileID.value;

  browseService.deleteAuthenticate(profileId)
  .then((result) => {
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })
}

exports.getExportComponents = function(args,res,next){
  let componentIds = args.componentIds.value;
  let exportRequestId = args.exportRequestId.value;

  browseService.getExportComponents(componentIds,exportRequestId,res)
  .then((result) => {
    //httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })
}

exports.getExportProgress = function(args,res,next){
  let exportRequestId = args.exportRequestId.value;

  browseService.getExportProgress(exportRequestId)
  .then((result) => {
    httpUtil.endHttpOK(result,res);
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })
}

exports.postReserveExport = function(args,res,next){
  browseService.postReserveExport()
  .then((result) => {
    httpUtil.endHttpOK(result,res)
  })
  .catch((error) => {
    httpUtil.endHttpErr(error,res);
  })
}

exports.getPalette = function(args,res,next){
  let palette = args.paletteID.value;

  browseService.getPalette(palette)
  .then((result)=>{
    httpUtil.endHttpOK(result,res);
  })
  .catch((error)=>{
    httpUtil.endHttpErr(error,res);
  })
}



