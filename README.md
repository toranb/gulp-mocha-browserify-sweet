# gulp-mocha-browserify-sweet

Generates a suite file from `gulp.src` glob on the fly for Browserify/Mocha

## Installation

```shell
    npm install gulp-mocha-browserify-sweet --save-dev
```

## Usage

```javascript
    var gulp = require('gulp');
    var karma = require('gulp-karma');
    var concat = require('gulp-concat');
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var generateSuite = require('gulp-mocha-browserify-sweet');
    
    gulp.task('test-suite', function() {
        return gulp.src('build/test/**/*spec.js')
            .pipe(generateSuite({startWith: 'build'}))
            .pipe(concat('suite.js'))
            .pipe(gulp.dest('dist'));
    });
    
    gulp.task('test', ['test-suite'], function() {
        return browserify({entries: './dist/suite.js'})
            .bundle({ debug: true })
            .pipe(source('deps.min.js'))
            .pipe(gulp.dest('dist'))
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            }));
    });
```

## Optional Configuration

#### opts.suiteFile
Type: `String`
Default: `suite.js`

This optional param will let you set the filename for the generated output

#### opts.startWith
Type: `String`

This optional param will remove any unwanted fragments from the filename

For example:

If you don't add this param and the generated file returns something like this

```javascript
    require('./some/really/long/prefix/build/test/foo.spec.js');
```

You can instead get the following by adding {startWith: 'build'}

```javascript
    require('./../build/test/foo.spec.js');
```

#### opts.addPrefix
Type: `String`

This optional param will add any prefix string to the filename

For example:

If you want to add test to the generated file that starts out like this

```javascript
    require('./unit/example.spec.js');
```

You can add the test prefix by adding {addPrefix: '../test'}

```javascript
    require('./../test/unit/example.spec.js');
```
