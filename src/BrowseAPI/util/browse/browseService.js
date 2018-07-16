'use strict';

const errorApi = require('../error/error');

var auth_token = '1a67f6f4-db2a-4298-8cf8-72946ac50669';

exports.getAuthentication1 = async function(){
    if(auth_token.length > 0){
        return {
            auth_token: auth_token
        };
    }else{
        throw(errorApi.create400Error("test error"));
    }
}
    
