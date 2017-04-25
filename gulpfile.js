var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    ngAnnotate  = require('gulp-ng-annotate'),
    uglify      = require('gulp-uglify'),
    minifyCss   = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'), 
    clean       = require('gulp-clean'),
    moment      = require('moment'),
    notify      = require('gulp-notify');
    serve       = require('gulp-serve');



    gulp.task('js-hint', function(){

        gulp.src(['app/js/app.js','app/js/controllers.js','app/js/services.js'])
            .pipe(jshint({
                lookup: true, 
                linter: 'jshint'
            }))
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));


    });


    gulp.task('uglify-js', function() {

        gulp.src(['app/bower_components/jquery/dist/jquery.min.js', 'app/assets/chico/dist/ui/chico.js',
             'app/bower_components/angular/angular.js','app/bower_components/angular-route/angular-route.js',
             'app/bower_components/angular-resource/angular-resource.js','app/js/app.js','app/js/controllers.js','app/js/services.js'])
            .pipe(concat('app'))
            .pipe(ngAnnotate())
            .on('error', notify.onError("Error: <%= error.message %>"))
            .pipe(uglify())
            .on('error', notify.onError("Error: <%= error.message %>"))
            .pipe(rename({
                extname: ".min.js"
             }))
            .pipe(gulp.dest('dist/js'))
            .pipe(notify('Uglified JavaScript (' + moment().format('MMM Do h:mm:ss A') + ')'));
    });


    gulp.task('uglify-css', function() {
           return gulp.src(['app/bower_components/mesh/index.css','app/assets/chico/dist/ui/chico.css','app/assets/css/app.css'])
            .pipe(concat('app'))
            .pipe(minifyCss())
            .pipe(rename({
                extname: ".min.css"
             }))
            .pipe(gulp.dest('dist/css'))
            .pipe(notify('Uglified Css (' + moment().format('MMM Do h:mm:ss A') + ')'));
    });

    gulp.task('clean', function() {
            return  gulp.src(['dist/js/*','dist/css/*'], {read: false})
              .pipe(clean());
    });



    gulp.task('default', ['clean','js-hint'], function(){
       
       gulp.run('uglify-css');
       gulp.run('uglify-js');

    });