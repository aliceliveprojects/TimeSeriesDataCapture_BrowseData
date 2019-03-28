'use strict'
const errorApi = require('../error/error');

var https = require('https');
var http = require('http');


exports.createOptionsFromUri = function(uri){
  
    var arrUri = uri.split("//");

    var protocol = arrUri[0];
    var host = arrUri[1].split(':');
    var port = null;
    if(host.length > 0){
        port = host[1];
    }
    host = host[0];


    var options = {
        protocol: protocol,
        host: host,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if(port){
        options.port = port; // if there was no port specified - leave it: a default will be assigned.
    }
    return options;

}

exports.httpRequest = function (options) {
    return new Promise(function (resolve, reject) {
     
        var result = ''

        var delegate = http;
 
        var protocol = String(options.protocol);
        if(protocol.includes('https')){
            delegate = https;
        }

        var request = delegate.request(options, function (res) {

            res.on('data', function (chunk) {
                result += chunk
            });

            res.on('end', function () {
            
                console.log(res.statusCode);
                if(res.statusCode >= 100 && res.statusCode < 400){
                    console.log('http request success, statusCode: ', res.statusCode);
                    resolve(result);
                }else{
                    var error;
                    console.log(result);
                    if(res.statusCode === 400){
                        console.log('400 error bad request')    
                        error = errorApi.create400Error('Bad Request');
                    }else if(res.statusCode === 401){
                        console.log('401 error un-authorized');
                        error = errorApi.create401Error('Un-authorized');
                    }else if(res.statusCode === 403){
                        console.log('403 error forbidden');
                        error = errorApi.create403Error('Forbidden');
                    }else{
                        console.log('500 error');
                        error = errorApi.create500Error('Error');
                    }
                    reject(error); 
                }
                
            });
        });

        request.on('error', function (error) {
            console.log('http requst error ', error);
            reject(errorApi.create500Error(error));
        });

        request.on('timeout', function(error){
            console.log('http request time-out ', error);
            reject(errorApi.create500Error(error));
        })

        request.end();
    });
}