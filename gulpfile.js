var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json");
var paths = {
    pages: ['index.js']
};
 
gulp.task("default", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
  });
 
gulp.task("build", gulp.parallel('js'), function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/ts/test0.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("src/js"));
});