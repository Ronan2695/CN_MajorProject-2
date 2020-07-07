const gulp  = require('gulp');
const sass= require('gulp-sass');
const cssnano= require('gulp-cssnano');
const rev = require('gulp-rev');


 gulp.task('css', function(done){

    console.log('minifying css.....');
    //** indicates all files under it.
    gulp.src('./assets/sass/**/*.scss')
    //.pipe calling the function of gulp
    .pipe(sass()) //files need to be pass through the gulp sass module.
    .pipe(cssnano())//compressing the files using css nano
    .pipe(gulp.dest ('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest({

        cwd:'public',
        merge:true

    }))

    .pipe(gulp.dest('./public/assets'));
     done();
 })