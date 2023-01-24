import gulp from "gulp";
import plumber from "gulp-plumber";
import less from "gulp-less";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgo";
import svgstore from "gulp-svgstore";
import { deleteAsync as del } from "del";
import browser from "browser-sync";

// Styles

export const styles = () => {
  return gulp
    .src("source/less/style.less", { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css/", { sourcemaps: "." }))
    .pipe(browser.stream());
};

//Html

const minify = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build/"));
};

//Script

const script = () => {
  return gulp.src("source/js/*.js").pipe(terser()).pipe(gulp.dest("build/js/"));
};

//Images

const optimizeImages = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img/"));
};

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}").pipe(gulp.dest("build/img/"));
};

//Webp

const createWebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}", "!source/img/favicons")
    .pipe(squoosh({ webp: {} }))
    .pipe(gulp.dest("build/img/"));
};

//SVG

const svg = () => {
  return gulp
    .src(["source/img/**/*.svg", "!source/img/icons/*.svg"])
    .pipe(svgo())
    .pipe(gulp.dest("build/img/"));
};

const sprite = () => {
  return gulp
    .src("source/img/icons/*.svg")
    .pipe(svgo())
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/"));
};

const copy = (done) => {
  gulp
    .src(["source/fonts/*.{woff2,woff}", "source/*.ico"], { base: "source" })
    .pipe(gulp.dest("build/"));
  done();
};

//Clean

const clean = () => {
  return del("build/");
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build/",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

//Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/*.html").on("change", browser.reload);
  gulp.watch("source/js*.js").on("change", browser.reload);
};

//Build

export const build = gulp.series(
  clean,
  optimizeImages,
  createWebp,
  gulp.parallel(styles, minify, script, svg, sprite)
);

// //Default

export default gulp.series(
  clean,
  copyImages,
  gulp.parallel(styles, minify, script, svg, sprite),
  gulp.series(server, watcher)
);
