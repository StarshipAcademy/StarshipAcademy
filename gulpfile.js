'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const glob = require('glob');
const es = require('event-stream');
const runSeq = require('run-sequence');
const rename = require('gulp-rename');
const chalk = require('chalk');

gulp.task('reload', () => {
  livereload.reload();
});

gulp.task('reloadCSS', () => gulp.src('./browser/style.css').pipe(livereload()));

gulp.task('lintJS', () => {
  return gulp.src(['./browser/**/*.js', './server/**/*.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('buildJS', ['lintJS'], () => {
  return gulp.src(['./browser/module.js', './browser/**/*.js'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel({ presets: ['es2015']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'));
});

gulp.task('buildCSS', () => {
  const sassComp = sass();
  sassComp.on('error', console.error.bind(console));

  return gulp.src('./browser/style/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassComp)
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', () => {
  runSeq(['buildJS', 'buildCSS']);
});

gulp.task('default', () => {
  gulp.start('build');

  gulp.watch('browser/**', () => {
    runSeq('buildCSS', 'reloadCSS', 'buildJS', 'reload');
  });

  gulp.watch('server/**', ['lintJS']);

  livereload.listen();
});
