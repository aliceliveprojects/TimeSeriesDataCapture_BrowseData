'use strict';

var service = require('./browseService');

module.exports = {
   
    addComponentAnnotations: function(componentID,annotations){
        return service.addComponentAnnotations(componentID,annotations);
    },

    addComponentTags: function(componentID,tags){
        return service.addComponentTags(componentID,tags);
    },

    componentSearch: function(search,page,pagesize){
        return service.componentSearch(search,page,pagesize);
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

    getComponent: function(componentID){
        return service.getComponent(componentID)
    },

    getComponentIDs: function(folderID){
        return service.getComponentIDs(folderID);
    },

    getTags: function(tags){
        return service.getTags();
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
    }

}