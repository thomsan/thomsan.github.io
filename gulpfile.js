var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var del = require('del');
var es = require('event-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var minifycss = require('gulp-minify-css');
var run = require('gulp-run');
var size = require('gulp-size');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify-es').default;

var config = require('./_app/gulp/config');
var paths = require('./_app/gulp/paths');
const { createVerify } = require('crypto');
const { appFontFiles } = require('./_app/gulp/paths');

// Uses Sass compiler to process styles, adds vendor prefixes, minifies,
// and then outputs file to appropriate location(s)
gulp.task('build:styles-main', function () {
    var cssFiles = gulp.src(paths.appMainCssFilesGlob);
    var scssFiles = sass(paths.appMainScssFilesGlob, { style: 'compressed', trace: true })
        .on('error', gutil.log);

    return es.concat(cssFiles, scssFiles)
        .pipe(concat('main.css'))
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(gulp.dest(paths.jekyllDir))
        .pipe(gulp.dest(paths.siteDir))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});
gulp.task('build:styles-map', function () {
    var cssFiles = gulp.src(paths.appMapCssFilesGlob);
    var scssFiles = sass(paths.appMapScssFilesGlob, { style: 'compressed', trace: true })
        .on('error', gutil.log);

    return es.concat(cssFiles, scssFiles)
        .pipe(concat('map.css'))
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(gulp.dest(paths.jekyllDir))
        .pipe(gulp.dest(paths.siteDir))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});
gulp.task('build:styles', gulp.series('build:styles-main', 'build:styles-map'))

gulp.task('clean:styles', function (cb) {
    del([paths.jekyllDir + 'main.css', paths.siteDir + 'main.css']);
    del([paths.jekyllDir + 'map.css', paths.siteDir + 'map.css']);
    cb();
});

// Places awesome fonts in proper location
gulp.task('build:fonts', function () {
    return gulp.src(paths.appFontFiles + '/*')
        .pipe(gulp.dest(paths.jekyllFontFiles))
        .pipe(gulp.dest(paths.siteFontFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

gulp.task('clean:fonts', function (cb) {
    del([paths.jekyllFontFiles, paths.siteFontFiles]);
    cb();
});

gulp.task('build:icons', function() {
    return gulp.src([
            'node_modules/@fortawesome/fontawesome-free/**',
            '!node_modules/@fortawesome/fontawesome-free/**/*.map',
            '!node_modules/@fortawesome/fontawesome-free/.npmignore',
            '!node_modules/@fortawesome/fontawesome-free/*.txt',
            '!node_modules/@fortawesome/fontawesome-free//*.md',
            '!node_modules/@fortawesome/fontawesome-free/*.json'
        ])
        .pipe(gulp.dest(paths.jekyllFontFiles))
        .pipe(gulp.dest(paths.siteFontFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

// Copies assets to appropriate location(s)
gulp.task('build:assets', function () {
    return gulp.src(paths.appAssetFilesGlob)
        .pipe(gulp.dest(paths.jekyllAssetFiles))
        .pipe(gulp.dest(paths.siteAssetFiles))
        .pipe(browserSync.stream())
        .pipe(size({ showFiles: true }))
        .on('error', gutil.log);
});

gulp.task('clean:assets',
    function (cb) {
        del([paths.jekyllAssetFiles, paths.siteAssetFiles]);
        cb();
    });

// Creates optimized versions of images,
// then outputs to appropriate location(s)
gulp.task('build:images', function () {
    return gulp.src(paths.appImageFilesGlob)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream())
        .pipe(size({ showFiles: true }))
        .on('error', gutil.log);
});

gulp.task('clean:images',
    function (cb) {
        del([paths.jekyllImageFiles, paths.siteImageFiles]);
        cb();
    });

// Concatenates and uglifies JS files and outputs result to
// the appropriate location(s).
gulp.task('build:scripts-main', function () {
    return gulp.src(paths.appMainJsFilesGlob)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jekyllDir))
        .pipe(gulp.dest(paths.siteDir))
        .on('error', gutil.log);
});
gulp.task('build:scripts-map', function () {
    return gulp.src(paths.appMapJsFilesGlob)
        .pipe(concat('map.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jekyllDir))
        .pipe(gulp.dest(paths.siteDir))
        .on('error', gutil.log);
});
gulp.task('build:scripts-firebase', function () {
    return gulp.src(paths.appFirebaseJsFilesGlob)
        .pipe(concat('firebase.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jekyllDir))
        .pipe(gulp.dest(paths.siteDir))
        .on('error', gutil.log);
});
gulp.task('build:scripts', gulp.series('build:scripts-main', 'build:scripts-map', 'build:scripts-firebase'))

gulp.task('clean:scripts', function (cb) {
    del([paths.jekyllDir + 'main.js', paths.siteDir + 'main.js', paths.jekyllDir + 'map.js', paths.siteDir + 'map.js', paths.jekyllDir + 'firebase.js', paths.siteDir + 'firebase.js']);
    cb();
});

// Runs Jekyll build
gulp.task('build:jekyll', function () {
    var shellCommand = 'jekyll build --config _config.yml,_app/localhost_config.yml';
    if (config.drafts) { shellCommand += ' --drafts'; };

    return gulp.src(paths.jekyllDir)
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Only deletes what's in the site folder
gulp.task('clean:jekyll', function (cb) {
    del([paths.siteDir]);
    cb();
});

gulp.task('clean', gulp.series('clean:jekyll',
    'clean:fonts',
    'clean:images',
    'clean:scripts',
    'clean:styles',
    'clean:assets'));

// Builds site
// Optionally pass the --drafts flag to enable including drafts
gulp.task('build',
    gulp.series('clean',
        'build:scripts',
        'build:images',
        'build:fonts',
        'build:icons',
        'build:styles',
        'build:jekyll',
        'build:assets',
        function (cb) {
            cb();
        })
);

/* Sass and image file changes can be streamed directly to BrowserSync without
reloading the entire page. Other changes, such as changing JavaScript or
needing to run jekyll build require reloading the page, which BrowserSync
recommends doing by setting up special watch tasks.*/
// Special tasks for building and then reloading BrowserSync
gulp.task('build:jekyll:watch', gulp.series('build:jekyll', function (cb) {
    browserSync.reload();
    cb();
}));
gulp.task('build:scripts:watch', gulp.series('build:scripts', function (cb) {
    browserSync.reload();
    cb();
}));

// Static Server + watching files
// WARNING: passing anything besides hard-coded literal paths with globs doesn't
//          seem to work with the gulp.watch()
gulp.task('serve', gulp.series('build', function () {

    browserSync.init({
        server: paths.siteDir,
        ghostMode: false, // do not mirror clicks, reloads, etc. (performance optimization)
        logFileChanges: true,
        open: false       // do not open the browser (annoying)
    });

    // Watch site settings
    gulp.watch(['_config.yml', '_app/localhost_config.yml'], gulp.series('build:jekyll:watch'));

    // Watch app .scss files, changes are piped to browserSync
    gulp.watch('_app/styles/**/*.scss', gulp.series('build:styles'));

    // Watch app .css files, changes are piped to browserSync
    gulp.watch('_app/styles/**/*.css', gulp.series('build:styles'));

    // Watch app .js files
    gulp.watch('_app/scripts/**/*.js', gulp.series('build:scripts:watch'));

    // Watch Jekyll blog posts
    gulp.watch(paths.jekyllDir + 'Blog/**/*.+(md|markdown|MD)', gulp.series('build:jekyll:watch'));

    // Watch Jekyll drafts if --drafts flag was passed
    if (config.drafts) {
        gulp.watch(paths.jekyllDir + '_drafts/*.+(md|markdown|MD)', gulp.series('build:jekyll:watch'));
    }

    // Watch Jekyll html & md files
    gulp.watch([paths.jekyllDir + '**/*.html', paths.jekyllDir + '**/*.md', '!_site/**/*.*'], gulp.series('build:jekyll:watch'));

    // Watch Jekyll RSS feed XML file
    gulp.watch(paths.jekyllDir + 'feed.xml', gulp.series('build:jekyll:watch'));

    // Watch Jekyll data files
    gulp.watch(paths.jekyllDir + '_data/**.*+(yml|yaml|csv|json)', gulp.series('build:jekyll:watch'));

    // Watch Jekyll favicon.ico
    gulp.watch(paths.jekyllDir + 'favicon.ico', gulp.series('build:jekyll:watch'));

    // Watch gulpfile
    gulp.watch('gulpfile.js', gulp.series('build:jekyll:watch'));
}));

// Default Task: builds site
gulp.task('default', gulp.series('build'));
