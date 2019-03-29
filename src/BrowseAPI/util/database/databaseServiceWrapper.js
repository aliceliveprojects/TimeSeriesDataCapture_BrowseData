'use strict'

var service = require('./databaseServices')
var ObjectID = require('mongodb').ObjectID;



/* =======================================================RUN QUERIES================================================ */
exports.createRun = async function createRun(run) {
    try {

        return (await service.mongodbInsert('runsCollection', run));
    } catch (error) {
        throw (error)
    }
}

exports.updateRuns = async function updateRuns(runId, updatedRun) {
    var updatedRunObject = {
        $set: updatedRun
    }
    var queryObject = {
        id: runId
    }
    try {
        return (await service.mongodbUpdate('runsCollection', queryObject, updatedRunObject));
    } catch (error) {
        console.log(error);
        throw (error);
    }
}

exports.deleteRun = async function deleteRun(run) {
    try {
        var deleteRunObject = {
            id : run
        }
        return (await service.mongodbDelete('runsCollection',deleteRunObject));
    } catch (error) {
        throw (error);
    }
}

exports.queryRun = async function queryRun(query,authorized) {
   
    var queryObject = {$and:[{$or:[]}]};
    
    var andContainer = queryObject.$and;

    var orContainer = andContainer[0].$or;

    // only public runs
    if(!authorized){

        var publicQuery = {};
        publicQuery['tags.5b9bd93249eebd6bd4a10a99'] = {$exists: true}
        andContainer.push(
            publicQuery
        );
    }

    // tags
    if (query.hasOwnProperty('tags')) {
         for (var i = 0, n = query['tags'].length; i < n; i++) {
            var tagQuery = {}
             tagQuery['tags.' + query['tags'][i]] = { $exists: true };
             orContainer.push(tagQuery);
         }
    }

    if (query.hasOwnProperty('date')) {
        orContainer.push({
            date: query['date']
        });
    }

    if (query.hasOwnProperty('time')) {
        orContainer.push({
            time: query['time']
        });
    }

    console.log(JSON.stringify(queryObject));

    try {
        return (await service.mongodbQuery('runsCollection', queryObject, ['id', 'time', 'date', 'tags']));
    } catch (error) {
        throw (error);
    }
}

exports.getRun = async function getRun(runId,authorized) {
    var queryObject = {
        id: runId
    }

    
    if(!authorized){
        queryObject['tags.5b9bd93249eebd6bd4a10a99'] = { $exists: true };
    }

    try {
        return (await service.mongodbQuery('runsCollection', queryObject));
    } catch (error) {

    }
}

exports.filterIds = async function filterIds(ids) {
    var queryObject = {
        id: {
            $in: ids
        }
    };
    try {
        return (await service.mongodbQuery('runsCollection', queryObject, ['id']))
    } catch (error) {
        throw (error);
    }
}
/* =================================================================================================================== */




/* ====================================================AUTHENTICATE QUERIES=========================================== */
exports.getAuthentication = async function getAuthentication() {

}

exports.createFileStorageAuthentication = async function createFileStorageAuthentication(authentication) {
    try {
        return (await service.mongodbInsert('authenticationCollection', authentication));
    } catch (error) {
        throw (error)
    }
}

exports.updateFileStorageAuthentication = async function updateFileStorageAuthentication(authentication) {
    var authenticationObject = {
        $set: authentication
    }

    var queryObject = {
        profileID: authentication.profileID
    }

    try {
        return (await service.mongodbUpdate('authenticationCollection', queryObject, authenticationObject));
    } catch (error) {

    }
}

exports.getFileStorageAuthentication = async function getFileStorageAuthentication() {
    try {
        return (await service.mongodbQuery('authenticationCollection',{}));
    } catch (error) {

    }
}

exports.deleteFileStorageAuthentication = async function deleteFileStorageAuthentication() {
    try {
        return (await service.mongodbRemove('authenticationCollection',{}))
    } catch (error) {
        throw (error);
    }
}

/* =================================================================================================================== */

/* ====================================================TAG QUERIES==================================================== */
exports.getTag = async function getTag(tag) {
    var query = {};

    query['tag'] = tag;

    try {
        return (await service.mongodbQuery('tagsCollection', query, undefined));
    } catch (error) {
        throw (error);
    }
}

exports.getTagById = async function getTagById(tagId) {
    var query = {};
    query['_id'] = tagId;

    try {
        return (await service.mongodbQuery('tagsCollection', query, undefined));
    } catch (error) {
        throw (error);
    }
}

exports.queryTag = async function queryTag(tag) {
    var query = {};
    query['tag'] = {
        $regex: '^' + tag,
        $options: 'i'
    };

    try {
        return (await service.mongodbQuery('tagsCollection', query, undefined));
    } catch (error) {
        throw (error);
    }
}

exports.createTag = async function createTag(tag) {
    try {
        var tagObject = {
            tag: tag
        }
        return (await service.mongodbInsert('tagsCollection', tagObject))

    } catch (error) {
        throw (error);
    }
}

exports.deleteTagbyId = async function deleteTagbyId(componentId, tagId) {
    try {
        var query = { id: componentId };

        var deletion = { $unset: {} };
        deletion['$unset']['tags.' + tagId] = 1;

        return (await service.mongodbUpdate('runsCollection', query, deletion));
    } catch (error) {

    }
}

/* =======================================================ANNOTATIONS QUERIES=========================================== */
exports.deleteAnnotation = async function deleteAnnotation(componentId, annotationId) {
    try {
        var query = { id: componentId }
        var deletion = { $unset: {} };
        deletion['$unset']['annotations.' + annotationId] = 1;
        return (await service.mongodbUpdate('runsCollection', query, deletion))
    } catch (error) {
        throw (error);
    }
}



/* =======================================================ALGORITHM QUERIES=========================================== */

exports.createAlgorithm = async function createAlgorithm(algorithm) {
    try {
        return (await service.mongodbInsert('algorithmsCollection', algorithm));
    } catch (error) {
        throw (error);
    }
}

exports.getAllAlgorithms = async function getAllAlgorithms() {
    try {
        return (await service.mongodbFindAll('algorithmsCollection', undefined));
    } catch (error) {
        throw (error);
    }
}

exports.getAlgorithm = async function getAlgorithm(id) {
    var query = {
        _id: new ObjectID(id)
    }
    try {
        return ((await service.mongodbQuery('algorithmsCollection', query, undefined))[0]);
    } catch (error) {
        throw (error);
    }
}

exports.getDefaultAlgorithm = async function getDefaultAlgorithm() {
    var query = {
        name: 'default'
    }

    try {
        return ((await service.mongodbQuery('algorithmsCollection', query, undefined))[0]);
    } catch (error) {
        throw (error);
    }
}

/* ========================================================================================================= */

/* ===============================================PALETTE QUERIES=========================================== */

exports.getPalette = async function getPalette(palette){
    var query = {
        name: palette
    }

    try {
        return ((await service.mongodbQuery('palettesCollection',query,undefined))[0]);
    } catch (error) {
        throw(error);
    }
}

exports.getDefaultPalette = async function getDefaultPalette(){
    var query = {
        name: 'default'
    }

    try {
        return ((await service.mongodbQuery('palettesCollection',query,undefined))[0]);
    } catch (error) {
        throw(error);
    }
}


/* ========================================================================================================= */