var gulp = require("gulp");
//var babel = require("gulp-babel");
var webpack = require("webpack-stream");
//var browserify = require("gulp-browserify");
//var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");
var less = require("gulp-less");
var del = require("del");
var Ractive = require("ractive");
var tap = require("gulp-tap");
var Buffer = require("buffer");
var plumber = require("gulp-plumber");
var path = require("path");

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
    src: "./frontend/less/**/*.less",
    dest: "./static/css/",
  },
  scripts: {
    src: "./frontend/js/**/*.js",
    dest: "./static/js/",
  },
  templates: {
    src: "./frontend/tpl/**/*.html",
    dest: "./frontend/tpl",
  },
};

async function onError(error) {
  console.log(error);
}

function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del(["assets"]);
}

// gulp task for styles
function styles() {
  return (
    gulp
      //.src(paths.styles.src)
      .src("./frontend/less/styles.less")
      .pipe(
        plumber({
          errorHandler: onError,
        })
      )
      .pipe(
        less({
          paths: [path.join(__dirname, "frontend/less", "includes")],
        })
      )
      .pipe(cleanCSS())
      .pipe(
        rename({
          suffix: ".min",
        })
      )
      .pipe(gulp.dest("./static/css"))
  );
  //.pipe(gulp.dest(path.styles.dest))
}

//gulp task for templates
function templates() {
  return gulp
    .src(paths.templates.src)
    .pipe(
      plumber({
        errorHandler: onError,
      })
    )
    .pipe(
      tap(function (file, t) {
        var precompiled = Ractive.parse(file.contents.toString());
        precompiled = JSON.stringify(precompiled);
        file.contents = new Buffer("module.exports = " + precompiled);
      })
    )
    .pipe(
      rename(function (path) {
        path.extname = ".js";
      })
    )
    .pipe(gulp.dest(paths.templates.dest));
}
// gulp task for scripts
function scripts() {
  return (
    gulp
      .src(paths.scripts.src, { sourcemaps: true })
      .pipe(
        plumber({
          errorHandler: onError,
        })
      )
      .pipe(webpack(require("./webpack.config")))
      //.pipe(babel())
      //.pipe(browserify())
      .pipe(uglify())
      .pipe(
        rename({
          suffix: ".min",
        })
      )
      .pipe(gulp.dest(paths.scripts.dest))
  );
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, [templates, scripts]);
}

// specify if tasks run in series or parallel usingn gulp.series
const build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.templates = templates;
exports.build = build;

// default task that can be called by just runninng gulp from cli
exports.default = build;
