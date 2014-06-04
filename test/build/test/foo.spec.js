var Cat = require('../src/cat');
var chai = require('chai');
var expect = chai.expect;

describe("simple", function () {
    it("test", function () {
        var cat = new Cat("testing");
        var str = cat.yo();
        expect(str).eql("testing");
    });
});
