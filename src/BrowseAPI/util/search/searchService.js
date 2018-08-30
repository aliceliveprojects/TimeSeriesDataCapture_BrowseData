'use strict'

const keywordFiltersService = require('./keywordFilters');

exports.parseSearch = function(query){
    
   
    var result = extractQueries(query);
    

    for(var i=0,n=result.length;i<n;i++){
        if(result[i].name === 'timeStamp'){
            result[i].value[0] = keywordFiltersService.timeFilter(result[i].value[0],'database');
        }

        if(result[i].name === 'date'){
            result[i].value[0] = keywordFiltersService.dateFilter(result[i].value[0],'database');
        }
    }

    return result;
   
}



var queryTypes = [];

function query(name, regex, single = true) {
    this.name = name;
    this.regex = regex;
    this.single = single;
}


//date
var date = new query('date', /\d{8}/g, true);
queryTypes.push(date);

//time
var time = new query('timeStamp', /(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]/g, true);
queryTypes.push(time);



function extractQueries(query){
    var queryArray = [];
    for (var i = 0, n = queryTypes.length; i < n; i++) {
        var regexResult = query.match(queryTypes[i].regex);

       
        if (regexResult != null) {
            if (queryTypes[i].single) {
                regexResult = [regexResult[0]];
            }
            queryArray.push({
                name: queryTypes[i].name,
                value: regexResult
            })
        }
    }

    return queryArray;
}



