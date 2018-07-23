'use strict';

const errorApi = require('../error/error');
const httpRequest = require('../http/httpRequest')
var auth_token = '1a67f6f4-db2a-4298-8cf8-72946ac50669';

//TODO : add to database
exports.addComponentAnnotations = async function(componentID,annotations) {
    return {
        result: 'GOOD'
    }
}

//TODO : add to database
exports.addComponentTags = async function(componentID,tags) {
    return {
        result: 'GOOD'
    }
}

// TODO: query database
exports.componentSearch = async function (search, page, pagesize) {

    return {
        search: search,
        page: page,
        pagesize: pagesize
    }
}

// TODO: delete from database
exports.deleteComponent = async function (componentID) {
    return {
        componentID: componentID
    }
}

//TODO : delete from annotation
exports.deleteComponentAnnotation = async function(componentID,annotationID) {
    return {
        result: 'GOOD'
    }
}

//TODO : delete annotation from database
exports.deleteComponentTag = async function(componentID,tagID){
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
    return {
        componentID: componentID
    }


}

//TODO: connect to import API to get component difference
exports.getComponentIDs = async function (folderID) {
    return new Promise(function (resolve, reject) {


        var path = '/apis/Components'
        if (folderID != undefined) {
            path = '/apis/Components?folderID=' + folderID;
        }
        console.log(path);
        var options = {
            protocol: 'http:',
            host: '10.182.45.87',
            port: 8001,
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        httpRequest.httpRequest(options).then((result) => {
            result = parseResponse(result);
            resolve(JSON.parse(result[1]));
        }).catch((error) => {

            error = parseResponse(error);

            var errorResponse = 'Error';
            var errorCode = 500;
            if (error[0] != null)
                errorCode = error[0]

            if (error[1] != null) {
                errorResponse = JSON.parse(error[1]);
                errorResponse = errorResponse.message;

            }
            reject(errorApi.createError(errorCode, errorResponse));
        });
    });

}

//TODO: query database
exports.getTags = async function(tags){
    return {
        result: 'GOOD'
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
    return {
        componentIDs: componentIDs
    }

}

exports.updateComponentAnnotation = async function(componentID,annotationID,annotation){
    return {
        result: 'GOOD'
    }

}

function parseResponse(result) {
    result = JSON.parse(result);



    var response = null;
    var responseCode = null;

    if (result.hasOwnProperty('result')) {
        response = result.result;
    }

    if (result.hasOwnProperty('statusCode')) {
        responseCode = result.statusCode;
    }


    return [responseCode, response];

}