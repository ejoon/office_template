
'use strict';

const gulp  = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', ()=>{
    gulp.src('test/*.js')
        .pipe(mocha());
});