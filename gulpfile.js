/*
Hana Project
 */
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');
// var templateCache = require('gulp-angular-templatecache');
// var angularFilesort = require('gulp-angular-filesort');
// var del = require('del');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var distPath = './build';
// css
gulp.task('css', function () {
    gulp.src('css/**/*.css')
        .pipe(stylus())
        .pipe(autoprefixer())
        // .pipe(concat('app.css'))
        .pipe(cssnano())
        // .pipe(rename(function (path) {
        //     path.basename += '.min';
        // }))
        .pipe(gulp.dest(distPath + '/css/'))
        .pipe(reload({
            stream: true
        }));
});
// js
gulp.task('js', function () {
    gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(distPath + '/app'))
        .pipe(reload({
            stream: true
        }));
});
// vender
gulp.task('vendor', function () {
    gulp.src('scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(distPath + '/scripts'));
});
// tpl
gulp.task('tpl', function () {
    gulp.src('app/**/*.tpl.html')
        // .pipe(htmlmin({
        //     collapseWhitespace: true
        // }))
        .pipe(gulp.dest(distPath + '/app'))
        .pipe(reload({
            stream: true
        }));
});
// Data
gulp.task('data', function () {
    gulp.src('app/**/*.json')
        .pipe(gulp.dest(distPath + '/app'))
        .pipe(reload({
            stream: true
        }));
});
// theme
gulp.task('theme', function () {
    gulp.src('css/themes/**/*.*')
        .pipe(gulp.dest(distPath + '/css/themes/'));
});
// Landing page
gulp.task('index', function () {
    var target = gulp.src('index.html');
    var sources = gulp.src([distPath + '/css/*.css'], {
        read: false
    });
    return target.pipe(inject(sources, {
            relative: true
        }))
        // .pipe(htmlmin({
        //     collapseWhitespace: true
        // }))
        .pipe(gulp.dest(distPath));
});
// Browser Sync
gulp.task('browser-sync', function () {
    browserSync({
        server: {},
        middleware: [historyApiFallback()],
        ghostMode: false
    });
});

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
}

function buildScript(file, watch) {
    var props = {
        entries: ['./app/' + file],
        debug: true,
        cache: {},
        packageCache: {}
    };
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulp.dest(distPath + '/'))
            // If you also want to uglify it
            // .pipe(buffer())
            // .pipe(uglify())
            // .pipe(rename('app.min.js'))
            // .pipe(gulp.dest(distPath))
            .pipe(reload({
                stream: true
            }));
    }
    bundler.on('update', function () {
        rebundle();
        gutil.log('Rebundle...');
    });
    return rebundle();
}
// gulp.task('app', function () {
//     return buildScript('app.js', false);
// });
gulp.task('default', ['index', 'css', 'js', 'tpl', 'vendor', 'data', 'theme', 'browser-sync'], function () {
    gulp.watch('index.html', ['index']);
    gulp.watch('css/**/*.css', ['css']);
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch('app/**/*.tpl.html', ['tpl']);
    // return buildScript('app.js', true);
});