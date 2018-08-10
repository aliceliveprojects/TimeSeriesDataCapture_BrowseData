'use strict'

var service = require('./databaseServiceWrapper');

module.exports = {
    insertRun: function (run) {
        return service.insertRun(run);
    },

    updateRuns: function (query, updateRun) {
        return service.updateRuns(query, updateRun);
    },

    deleteRun: function (run) {
        return service.deleteRun(run);
    },

    queryRun: function (query) {
        return service.queryRun(query);
    },

    filterIds: function(runIds){
        return service.filterIds(runIds);
    },

    getAuthentication: function(profileID){
        return service.getAuthentication(profileID);
    },

    setAuthentication: function(authentication){
        return service.setAuthentication(authentication);
    },

    getTag: function(tag){
        return service.getTag(tag);
    },

    addTag: function(tag){
        return service.addTag(tag,filter);
    },

    insertAlgorithm: function (algorithm) {
        return service.insertAlgorithm(algorithm);
    },

    getAllAlgorithms: function(){
        return service.getAllAlgorithms();
    },

    getAlgorithm: function(id){
        return service.getAlgorithm(id);
    },

    getDefaultAlgorithm : function(){
        return service.getDefaultAlgorithm();
    }
}