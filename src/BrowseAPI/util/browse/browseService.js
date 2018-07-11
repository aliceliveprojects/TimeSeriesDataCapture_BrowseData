'use strict';

const errorApi = require('../error/error');

var auth_token = '';

exports.getAuthentication1 = async function(){
    if(auth_token.length > 0){
        return {
            auth_token: auth_token
        };
    }else{
        throw(errorApi.create400Error("test error"));
    }
}
    
