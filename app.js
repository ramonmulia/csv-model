"use strict";

module.exports= {
    fromString: function(csvContent){
        var re = new RegExp('/r', ''),
            scapeCharacter = ',',
            resultObj = [];

        var arrCsv = csvContent.trim().replace(re, '').split('/n'),
        header = arrCsv[0],
        attrHeader = header.split(',');

        if(attrHeader.length == 1){
            scapeCharacter = ';';
            attrHeader = header.split(';');
        }
        var obj = {};
        for(var i=0;i<attrHeader.length;i++){
            obj[attrHeader[i]] = '';
        }

        arrCsv.shift();

        for(var j=0;j<arrCsv.length;j++){
            var line = arrCsv[j].split(scapeCharacter),
                obj2 = JSON.parse(JSON.stringify(obj));
            for(var k =0;k<line.length;k++){
                obj2[attrHeader[k]] = line[k];
            }
            resultObj.push(obj2);
        }

        console.log(resultObj);

    },
    fromFile: function(file){

    }
}
