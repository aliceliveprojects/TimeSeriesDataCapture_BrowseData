'use strict';

var service = require('./browseService');

module.exports = {
   
    addComponentAnnotations: function(componentID,annotations){
        return service.addComponentAnnotations(componentID,annotations);
    },

    addComponentTags: function(componentID,tags){
        return service.addComponentTags(componentID,tags);
    },

    componentSearch: function(query,page,pagesize,authorized){
        return service.componentSearch(query,page,pagesize,authorized);
    },

    deleteComponent: function(componentID){
        return service.deleteComponent(componentID);
    },

    deleteComponentAnnotation: function(componentID,annotationID){
        return service.deleteComponentAnnotation(componentID,annotationID);
    },

    getAuthenticate: function(){
        return service.getAuthentication();
    },

    getComponent: function(componentID,authorized){
        return service.getComponent(componentID,authorized)
    },


    getComponentPreview: function(componentID){
        return service.getComponentPreview(componentID)
    },

    getComponentIDs: function(folderID){
        return service.getComponentIDs(folderID);
    },

    getAlgorithms: function(){
        return service.getAlgorithms();
    },

    getTags: function(tags){
        return service.getTags(tags);
    },

    postAuthenticate: function(fileStorageToken){
        return service.postAuthenticate(fileStorageToken);
    },

    postComponentIDs : function(componentIDs){
        return service.postComponentIDs(componentIDs);
    },

    updateComponentAnnotation: function(componentID,annotationID,annotation){
        return service.updateComponentAnnotation(componentID,annotationID,annotation);
    },

    deleteComponentTag: function(componentID,tagID){
        return service.deleteComponentTag(componentID,tagID);
    },

    deleteAuthenticate: function(profileId){
        return service.deleteAuthenticate(profileId);
    },

    getExportComponents : function(componentIds,exportRequestId,res){
        return service.getExportComponents(componentIds,exportRequestId,res);
    },

    getExportProgress : function(exportRequestId){
        return service.getExportProgress(exportRequestId);
    },

    postReserveExport : function(){
        return service.postReserveExport();
    },

    getPalette : function(palette){
        return service.getPalette(palette);
    }

}