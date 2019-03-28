'use strict'

const keywordFiltersService = require('./keywordFilters');

exports.parseSearch = function(query){
    var result = extractQueries(query);

    for(var i=0,n=result.length;i<n;i++){
        if(result[i].name === 'timeStamp'){
            result[i].value = keywordFiltersService.timeFilter(result[i].value,'database');
        }

        if(result[i].name === 'date'){
            result[i].value = keywordFiltersService.dateFilter(result[i].value,'database');
        }
    }
    return result;
   
}



var queryTypes = [];

function query(name, regex) {
    this.name = name;
    this.regex = regex;
}


//date
var date = new query('date',  /\d{1,2}\/\d{1,2}\/\d{4}/g);
queryTypes.push(date);

//time
var time = new query('timeStamp', /(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]/g);
queryTypes.push(time);

//tags
var tag = new query('tag',/.{2,}/g);
queryTypes.push(tag);



function extractQueries(query){
    var queries = query.split(" ");
    var tags = [];
    queries.map(function(q){
        for(var i=0,n=queryTypes.length;i<n;i++){
            // unknowm but test and exec fails sometimes... (whilst testing with tag "population")
            // switched to match for now
            var match = q.match(queryTypes[i].regex);

            if(match){
                tags.push({
                    name : queryTypes[i].name,
                    value: q
                })
            }
        }
    })

    return tags;
}



