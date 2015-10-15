"use strict";

var CSVM = require('../app.js'),
    should = require('chai').should()

describe("Testing if the object is corect according csv string", function () {

    var fromString = "name;tel;end;value\r\n" +
        "Anita 1;352345;Street 23, ap34;55\r\n" +
        "Anita 2;352346;Street 23, ap35;56\r\n" +
        "Anita 3;352347;Street 23, ap36;57\r\n" +
        "Anita 4;352348;Street 23, ap37;58\r\n" +
        "Anita 5;352349;Street 23, ap38;59\r\n" +
        "Anita 6;352350;Street 23, ap39;60\r\n" +
        "Anita 7;352351;Street 23, ap40;61\r\n" +
        "Anita 8;352352;Street 23, ap41;62\r\n" +
        "Anita 9;352353;Street 23, ap42;63\r\n" +
        "Anita 10;352354;Street 23, ap43;64\r\n" +
        "Anita 11;352355;Street 23, ap44;65\r\n" +
        "Anita 12;352356;Street 23, ap45;66\r\n" +
        "Anita 13;352357;Street 23, ap46;67";

    var fromStringHeaderSpace = "Name of Consumer;tel of consumer;ends;value\r\n" +
        "Anita 1;352345;Street 23, ap34;55\r\n" +
        "Anita 2;352346;Street 23, ap35;56\r\n" +
        "Anita 3;352347;Street 23, ap36;57\r\n" +
        "Anita 4;352348;Street 23, ap37;58\r\n" +
        "Anita 5;352349;Street 23, ap38;59\r\n" +
        "Anita 6;352350;Street 23, ap39;60\r\n" +
        "Anita 7;352351;Street 23, ap40;61\r\n" +
        "Anita 8;352352;Street 23, ap41;62\r\n" +
        "Anita 9;352353;Street 23, ap42;63\r\n" +
        "Anita 10;352354;Street 23, ap43;64\r\n" +
        "Anita 11;352355;Street 23, ap44;65\r\n" +
        "Anita 12;352356;Street 23, ap45;66\r\n" +
        "Anita 13;352357;Street 23, ap46;67";

    var fromStringWithoutHeader =
        "Anita 1;352345;Street 23, ap34;55\r\n" +
        "Anita 2;352346;Street 23, ap35;56\r\n" +
        "Anita 3;352347;Street 23, ap36;57\r\n" +
        "Anita 4;352348;Street 23, ap37;58\r\n" +
        "Anita 5;352349;Street 23, ap38;59\r\n" +
        "Anita 6;352350;Street 23, ap39;60\r\n" +
        "Anita 7;352351;Street 23, ap40;61\r\n" +
        "Anita 8;352352;Street 23, ap41;62\r\n" +
        "Anita 9;352353;Street 23, ap42;63\r\n" +
        "Anita 10;352354;Street 23, ap43;64\r\n" +
        "Anita 11;352355;Street 23, ap44;65\r\n" +
        "Anita 12;352356;Street 23, ap45;66\r\n" +
        "Anita 13;352357;Street 23, ap46;67";

    it("The size of array model is correct", function (done) {
        var arrayModel = CSVM.fromString(fromString);
        arrayModel.length.should.be.equal(13);
        done();
    });

    it("Compare value field name position aleatory", function (done) {
        var arrayModel = CSVM.fromString(fromString);
        arrayModel[4].name.should.be.equal('Anita 5');
        done();
    });

    it("Header with spaces is replaced with _", function (done) {
        var arrayModel = CSVM.fromString(fromStringHeaderSpace);
        arrayModel[4].name_of_consumer.should.be.equal('Anita 5');
        done();
    });

    it("Header passing in function", function (done) {
        var arrayModel = CSVM.fromString(fromStringWithoutHeader, {header: 'name;tel;end;value'});
        arrayModel[4].end.should.be.equal('Street 23, ap38');
        done();
    });

    it("Another object passing in function", function (done) {
        var arrayModel = CSVM.fromString(fromStringWithoutHeader, {test: 'name;tel;end;value'});
        arrayModel.message.should.be.equal('invalid object passing in the function.');
        done();
    });
});


describe("Testing if the object is corect according csv file", function () {
    var file = 'tests/test.csv';

    it("The size of array model is correct", function (done) {
        CSVM.fromFile(file, null, function (err, arrayModel) {
            arrayModel.length.should.be.equal(13);
            done();
        });
    });

    it("Compare value field name position aleatory", function (done) {
        CSVM.fromFile(file, null, function (err, arrayModel) {
            arrayModel[4].name.should.be.equal('Anita 5');
            done();
        });
    });

    it("Header with spaces is replaced with _", function (done) {

        CSVM.fromFile(file, {header: 'name of consumer;tel of consumer;end value'}, function (err, arrayModel) {
            arrayModel[4].name_of_consumer.should.be.equal('Anita 4');
            done();
        });
    });

    it("Header passing in function", function (done) {
        CSVM.fromFile(file, null, function (err, arrayModel) {
            arrayModel[4].end.should.be.equal('Street 23, ap38');
            done();
        });
    });

    it("Another object passing in function", function (done) {
        CSVM.fromFile(file, {test: 'name;tel;end;value'}, function (err, arrayModel) {
            arrayModel.message.should.be.equal('invalid object passing in the function.');
            done();
        });
    });
});