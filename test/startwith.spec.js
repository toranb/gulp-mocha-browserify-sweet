var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var join = path.join;
var chai = require('chai');
var expect = chai.expect;

describe("integration tests", function() {
    it("should generate suite file with the correct output", function(done) {
        var concat = require('gulp-concat');
        var generateSuite = require("../");
        gulp.task('basic', function(){
            return gulp.src('./test/build/test/foo.spec.js')
                .pipe(generateSuite({startWith: 'build'}))
                .pipe(concat('suite.js'))
                .pipe(gulp.dest('./test/dist'));
        });
        gulp.task('example', ['basic'], function() {
            var actual = fs.readFileSync("./test/dist/suite.js", "utf8");
            var expected = fs.readFileSync("./test/expected/suite.js", "utf8");
            expect(actual).to.equal(expected);
            done();
        });
        gulp.start(['example']);
    });
});
