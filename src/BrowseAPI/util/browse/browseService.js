'use strict';

const errorApi = require('../error/error');
const httpRequest = require('../http/httpRequest')
const uuidv4 = require('uuid/v4');
const databaseService = require('../database/database');
const searchService = require('../search/search');
const exportService = require('../export/export');


//TODO : add to database
exports.addComponentAnnotations = async function (componentId, annotations) {
    return new Promise(async function (resolve, reject) {
        try {
            const insertPromises = annotations.map(updateRun, {
                componentId: componentId
            })
            var result = await Promise.all(insertPromises);
            console.log(result);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })

}

async function updateRun(annotation) {

    var annotationId;
    if (!(annotation.hasOwnProperty('id'))) {
        annotationId = uuidv4();
    } else {
        annotationId = annotation.id
    }


    var updateObject = {
        ['annotations.' + annotationId]: annotation
    }
    try {
        var result = await databaseService.updateRuns(this.componentId, updateObject)
        return result
    } catch (error) {
        throw (error)
    }
}

//TODO : add to database
exports.addComponentTags = async function (componentId, tags) {
    return new Promise(async function (resolve, reject) {
        try {
            const getTagsPromises = tags.map(updateRunTags, { componentId: componentId })
            Promise.all(getTagsPromises);



            resolve(tags);
        } catch (error) {
            reject(error);
        }
    })



}

async function updateRunTags(tag, ) {
    var componentId = this.componentId
    try {
        var result = await databaseService.getTag(tag);
        console.log(result);
        if (result.length > 0) {
            var updateObject = {
                ['tags.' + result[0]._id]: result[0].tag
            }
            databaseService.updateRuns(componentId, updateObject)
        } else {
            await databaseService.createTag(tag);
            var result = await databaseService.getTag(tag);
            var updateObject = {
                ['tags.' + result[0]._id]: result[0].tag
            }
            databaseService.updateRuns(componentId, updateObject)
        }

    } catch (error) {
        throw (error);
    }
}


//20180812
// TODO: query database
exports.componentSearch = async function (tags, date, timeStamp, page, pagesize) {

    /*  var query = {}
     if (tags != undefined) {
         query['tags'] = tags.split(",");
     }
 
     if (date != undefined) {
         query['date'] = date.toString();
     }
 
     if (timeStamp != undefined) {
         query['time'] = timeStamp.toString();
     } */

    var query = tags;
    query = searchService.parseSearch(query);

    var queryObject = {}

    for (var i = 0, n = query.length; i < n; i++) {
        if (query[i].name === 'timeStamp') {
            queryObject['time'] = query[i].value[0]
        }

        if (query[i].name === 'date') {
            queryObject['date'] = query[i].value[0]
        }
    }


    var result = await databaseService.queryRun(queryObject)
    console.log(result);
    return (result);
}

// TODO: delete from database
exports.deleteComponent = async function (componentID) {
    return {
        componentID: componentID
    }
}

//TODO : delete from annotation
exports.deleteComponentAnnotation = async function (componentID, annotationID) {
    return new Promise(async function (resolve, reject) {
        var result = await databaseService.deleteAnnotation(componentID, annotationID);
        console.log(result);
        resolve(result);
    })
}

//TODO : delete annotation from database
exports.deleteComponentTag = async function (componentId, tagId) {
    return new Promise(async function (resolve, reject) {
        var result = await databaseService.deleteTagById(componentId, tagId);
        console.log(result);
        resolve(result);
    })

}

// TODO: get auth token from database
exports.getAuthentication = async function () {
    throw (errorApi.create400Error("error test"));
}

//TODO: download component from database
exports.getComponent = async function (componentID, authorized) {
    return new Promise(async function (resolve, reject) {
        var result = await databaseService.getRun(componentID, authorized);
        console.log(result);
        resolve(result[0]);
    })
}

exports.getComponentPreview = async function (componentID) {
    return new Promise(async function (resolve, reject) {
        console.log(componentID);
        var path = '/apis/component/' + encodeURI(componentID) + '/preview';

        console.log(path);
        var options = {
            protocol: 'https:',
            host: 'timeseriesdatacapture-import.herokuapp.com',
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            var response = await httpRequest.httpRequest(options);
            response = JSON.parse(response);
            console.log(response);
            resolve(response);

        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//TODO: connect to import API to get component difference
exports.getComponentIDs = async function (folderID) {
    return new Promise(async function (resolve, reject) {

        var path = '/apis/Components'
        if (folderID != undefined) {
            path = '/apis/Components?folderID=' + encodeURI(folderID);
        }
        console.log(path);
        var options = {
            protocol: 'https:',
            host: 'timeseriesdatacapture-import.herokuapp.com',
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            var response = await httpRequest.httpRequest(options);
            response = JSON.parse(response);
            response.folders = await filterComponentIds(response.folders);

            console.log(response);
            resolve(response);

        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

exports.getAlgorithms = async function () {
    try {
        var response = await databaseService.getAllAlgorithms();
        return (response);
    } catch (error) {
        throw (error);
    }
}

//TODO: query database
exports.getTags = async function (tag) {
    return new Promise(async function (resolve, reject) {
        try {
            var response = await databaseService.queryTag(tag);
            console.log(tag);
            resolve(response);
        } catch (error) {
            throw (error);
        }
    })


}



//TODO store file storage token
exports.postAuthenticate = async function (fileStorageToken) {
    return new Promise(async function (resolve, reject) {
        await databaseService.deleteFileStorageAuthentication({})
        databaseService.createFileStorageAuthentication(fileStorageToken);



        console.log(fileStorageToken + ' set');
        resolve(fileStorageToken + ' set');
    })
}

//TODO request components from import api
exports.postComponentIDs = async function (componentIDs) {
    return new Promise(function (resolve, reject) {
        var postComponentIdPromises = componentIDs.map(postComponentId);
        Promise.all(postComponentIdPromises).then(function (result) {
            resolve(result);
        })
    })
}

exports.updateComponentAnnotation = async function (componentId, annotationId, annotation) {
    return new Promise(async function (resolve, reject) {

        var updateObject = {
            ['annotations.' + annotationId]: annotation
        }
        try {
            var result = await databaseService.updateRuns(componentId, updateObject)
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })

}

exports.deleteAuthenticate = async function (profileId) {
    return new Promise(async function (resolve, reject) {
        try {
            var result = await databaseService.deleteFileStorageAuthentication(profileId);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

//f9f666e8-b965-4997-b925-9c420cdc3420
exports.getExportComponents = async function (componentIds,exportRequestId,res) {
    var componentIdsArray = componentIds.split(',');
        try {
            var exportIdObject = await exportService.reserveExport('password');
            var fileIdObject = await exportService.requestExport(exportIdObject.exportRequestId,componentIdsArray);
            console.log('Downloading Data')
            exportService.getExport(fileIdObject.fileId,res);
        } catch (error) {
            reject(error);
        }
}

exports.getExportProgress = async function(exportRequestId){
    return new Promise(async function(resolve,reject){
        try{
            var exportProgress = await exportService.getExportProgress(exportRequestId);
            resolve(exportProgress);
        }catch(error){
            console.log(error);
            reject(error);
        }
    });
    
}

exports.postReserveExport = async function (){
    return new Promise(async function(resolve,reject){
        try{
            var exportIdObject = await exportService.reserveExport('password');
            resolve(exportIdObject);
        }catch(error){
            reject(error);
        }
    })
}

exports.getPalette = async function(palette){
    return new Promise(async function(resolve,reject){
        
        try {
           /*  var paletteObject = await databaseService.getPalette(palette);
            if(paletteObject == null){
                paletteObject = await databaseService.getDefaultPalette();
            } */

            var paletteObject = await databaseService.getDefaultPalette();
            resolve(paletteObject);

        } catch (error) {
            console.log(error);
            reject(error);
        } 
    })
}



function postComponentId(componentObject) {
    return new Promise(async function (resolve, reject) {
        var path = '/apis/component/' + encodeURI(componentObject.id);
        if (componentObject.hasOwnProperty('algorithm')) {
            path += '?algorithm=' + encodeURI(componentObject.algorithm);
        }

        console.log(path);
        var options = {
            protocol: 'https:',
            host: 'timeseriesdatacapture-import.herokuapp.com',
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            var response = await httpRequest.httpRequest(options);
            console.log(response);
            resolve(response);

        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}



async function filterComponentIds(folderArray) {
    var i = 0;
    var cutArray = [];
    for (const component of folderArray) {
        if (detectRun(component.name)) {
            var idsInDatabase = await databaseService.filterIds([component.id]);
            if (idsInDatabase.length > 0) {
                cutArray.push(i);
            } else {
                component.type = 'run';
            }
        } else {
            component.type = 'folder';
        }
        i++;
    }

    folderArray = spliceArray(folderArray, cutArray);
    return folderArray;
}

function detectRun(name) {
    var dateRegex = /(20\d{2})(\d{2})(\d{2})/;
    var matches = name.match(dateRegex);
    if (matches != null) {
        return true;
    }

    return false;
}

function spliceArray(arrayToSplice, splicingIds) {
    var offset = 0;
    for (var i = 0, n = splicingIds.length; i < n; i++) {
        arrayToSplice.splice(splicingIds[i] - offset, 1);
        offset++;
    }

    return arrayToSplice;
}