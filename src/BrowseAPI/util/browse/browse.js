'use strict';

var service = require('./browseService');

module.exports = {
    getAuthenticate1: function(){
        return service.getAuthentication1();
    }
}