'use strict';

const errorApi = require('../error/error');
const httpRequest = require('../http/httpRequest')
var auth_token = '1a67f6f4-db2a-4298-8cf8-72946ac50669';
const databaseService = require('../database/database');
const searchService = require('../search/search');

//TODO : add to database
exports.addComponentAnnotations = async function (componentID, annotations) {
    return {
        result: 'GOOD'
    }
}

//TODO : add to database
exports.addComponentTags = async function (componentID, tags) {
    return {
        result: 'GOOD'
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

    for(var i=0,n=query.length;i<n;i++){
        if(query[i].name === 'timeStamp'){
            queryObject['time'] = query[i].value[0]
        }

        if(query[i].name === 'date'){
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
    return {
        result: 'GOOD'
    }
}

//TODO : delete annotation from database
exports.deleteComponentTag = async function (componentID, tagID) {
    return {
        result: 'GOOD'
    }

}

// TODO: get auth token from database
exports.getAuthentication = async function () {
    throw (errorApi.create400Error("error test"));
}

//TODO: download component from database
exports.getComponent = async function (componentID) {
    return new Promise(async function (resolve, reject) {
        var result = await databaseService.getRun(componentID);
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
exports.getTags = async function (tags) {
    try {
        console.log(tags);
        var response = await databaseService.getTag(tags);
        console.log(response);
        return (response);
    } catch (error) {
        throw (error);
    }
}

//TODO store file storage token
exports.postAuthenticate = async function (fileStorageToken) {
    return {
        fileStorageToken: fileStorageToken
    }
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

exports.updateComponentAnnotation = async function (componentID, annotationID, annotation) {
    return new Promise(async function (resolve, reject) {
        var updateObject = {
            annotations : {}
        }
        updateObject.annotations[annotationID] = annotation;
        try {
            var result = await databaseService.updateRuns(componentID, updateObject)
            resolve(result);
        } catch (error) {

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

