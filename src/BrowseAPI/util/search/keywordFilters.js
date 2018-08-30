'use strict'

exports.dateFilter = function (date, type) {

    if (type === 'database') {
        var dateArray = date.split("/");
        var date = ''
        for (var i = dateArray.length - 1; i >= 0; i--) {
            date += dateArray[i];
        }

        return date;

    } else {
        var year = date.slice(0, 4);
        var month = date.slice(4, 6);
        var day = date.slice(6);

        var date = day + '/' + month + '/' + year;
        return (date);

    }

}

exports.timeFilter = function (time, type) {
    if (type === 'database') {
        return (time.replace(/:/g, ''));

    } else {
        var decodeTime = ''
        for (var i = 0; i < 2; i++) {
            decodeTime += time.slice(i * 2, (i + 1) * 2) + ':';
        }
        decodeTime += time.slice(4, 6);
        return decodeTime;

    }
}