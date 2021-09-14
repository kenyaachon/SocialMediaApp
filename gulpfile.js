var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var del = require('del');




// gulp.task('js', function () {
//     gulp.src('./src/**/*.js')
//     .pipe(concat('scripts.js'))
//     .pipe(gulp.dest('./build/'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('./build/'))
// });

// gulp.task('watchers', function() {
//     gulp.watch('src/**/*.js', ['js']);
// });

// gulp.task('default', ['js', 'watchers']);

var paths = {
    styles: {
      src: 'src/styles/**/*.less',
      dest: 'assets/styles/'
    },
    scripts: {
      src: 'src/scripts/**/*.js',
      dest: 'assets/scripts/'
    }
  };


function clean() {
    // You can use multiple globbing patterns as you would with `gulp.src`,
    // for example if you are using del 2.0 or above, return its promise
    return del([ 'assets' ]);
  }
   

// gulp task for styles
function styles() {
    return gulp.src(paths.styles.src)
    .pipe(babel())
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
      }))
    .pipe(gulp.dest(paths.styles.dest));
}
// gulp task for scripts
function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}

// specify if tasks run in series or parallel usingn gulp.series
const build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;

exports.default = build;

