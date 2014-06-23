var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var join = path.join;
var chai = require('chai');
var expect = chai.expect;

describe("add prefix integration tests", function() {
    it("should generate suite file with the correct output", function(done) {
        var concat = require('gulp-concat');
        var generateSuite = require("../");
        gulp.task('basic', function(){
            return gulp.src('./test/unit/example.spec.js')
                .pipe(generateSuite({addPrefix: '../test'}))
                .pipe(concat('suite.js'))
                .pipe(gulp.dest('./test/dist'));
        });
        gulp.task('example', ['basic'], function() {
            var actual = fs.readFileSync("./test/dist/suite.js", "utf8");
            var expected = fs.readFileSync("./test/expected/examplesuite.js", "utf8");
            expect(actual).to.equal(expected);
            done();
        });
        gulp.start(['example']);
    });
});
