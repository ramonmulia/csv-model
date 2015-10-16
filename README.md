# csv-model

Convert your file or string csv to javascript object.

### Usage
```sh
var CSVM = require('csv-model');
var str = 'name;value;\nNicolas;146\nRichard;665';

//By string
var obj = CSVM.fromString(str);
console.log(obj);
/*
obj = [{
            name: Nicolas,
            value:146
        },
        {
            name:Richard,
            value:665
        }]
*/

//By file
CSVM.fromFile('file.csv', null, function (err, obj) {
    console.log(obj);
    /*
    obj = [{
                name: Nicolas,
                value:146
            },
            {
                name:Richard,
                value:665
            }]
    */
});

```
### Installation
```sh
npm install csv-model
```

### Options
- header: String

```sh
var CSVM = require('csv-model');
var str = 'Nicolas;146\nRichard;665\nJhony;965\nRonald;887';

//By string
var obj = CSVM.fromString(str, {header: 'name;value'});
/*
obj = [{
            name: Nicolas,
            value:146
        },
        {
            name:Richard,
            value:665
        },
        {
            name:Ronald,
            value:887
        }]
*/

//By file
var obj = CSVM.fromString('file.csv', {header: 'name;value'},
                function (err, obj) {
                  console.log(obj);
                  /*
                  obj = [{
                              name: Nicolas,
                              value:146
                          },
                          {
                              name:Richard,
                              value:665
                          }]
                  */
              });
```

 
