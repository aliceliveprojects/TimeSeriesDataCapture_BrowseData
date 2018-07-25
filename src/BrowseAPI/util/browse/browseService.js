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
exports.componentSearch = async function (tags,dateTimeStamp, page, pagesize) {

    return {
        tags: tags,
        dateTimeStamp: dateTimeStamp,
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
    return new Promise(async function (resolve, reject) {


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

        try {
            var response = await httpRequest.httpRequest(options);
            response = JSON.parse(response);
            resolve(response);
            
        } catch (error) {
            reject(error);
        }
    });

}

exports.getAlgorithms = async function(){
    return {
        good: 'GOOD'
    };
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

