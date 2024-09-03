const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;

function compileSass() {
  return src('src/sass/**/*.scss') 
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'));
}

function compressImages() {
  return src('src/images/*') 
    .pipe(imagemin())
    .pipe(dest('dist/images'));
}

function compressJs() {
  return pipeline(
    src('src/js/**/*.js'), 
    uglify(),
    dest('dist/js')
  );
}

exports.default = series(compileSass, compressImages, compressJs);