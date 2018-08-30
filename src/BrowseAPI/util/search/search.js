'use strict'

var service = require('./searchService');

module.exports = {
    parseSearch : function(query){
        return service.parseSearch(query);
    }
}