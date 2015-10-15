"use strict";
var fs = require('fs');

module.exports = {
    fromString: function (csvContent, data) {
        var resultObj = [],
            arrCsv = replaceAll('\r', '', csvContent.trim()).split('\n'),
            header;

        if (data && data.header) {
            header = data.header;
        }
        else if (data && !data.header) {
           return {message: 'invalid object passing in the function.'};
        }
        else {
            header = arrCsv[0];
            arrCsv.shift();
        }
        var fieldsSize = arrCsv.length,
            attrHeader = replaceAll(',', ';', header).split(';');

        var obj = {};
        for (var i = 0; i < attrHeader.length; i++) {
            attrHeader[i] = replaceAll(' ', '_', attrHeader[i]).toLowerCase();
            obj[attrHeader[i]] = '';
        }

        for (var j = 0; j < fieldsSize; j++) {
            var line = arrCsv[j].split(';'),
                obj2 = JSON.parse(JSON.stringify(obj));
            for (var k = 0; k < line.length; k++) {
                if (attrHeader[k]) {
                    obj2[attrHeader[k]] = line[k];
                }
            }

            resultObj.push(obj2);
        }
        return resultObj

    },
    fromFile: function (file, obj, next) {
        var self = this;
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                next(err);
            }
            else {
                var arrContent = self.fromString(data, obj);
                next(null, arrContent);
            }
        });
    }
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}
