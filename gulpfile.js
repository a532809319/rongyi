var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var fileinclude = require('gulp-file-include'); //html include and saveas
var minifyHtml = require("gulp-minify-html");

var paths = {
    sass: ['./scss/**/*.scss'],
    htmls: ['./app/**/*.html'],
};

gulp.task('default', ['sass', 'fileinclude-htmls']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.htmls, ['fileinclude-htmls'])
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});


//用于在html文件中直接copy或处理include文件(在HTML文件中通过@@include(filenames) 方式加入)
gulp.task('fileinclude-htmls', function(done) {
    gulp.src(['app/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        })) //拷贝
        .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest('dist/build')) //存储
        .on('end', done);
    // .pipe(connect.reload())
});