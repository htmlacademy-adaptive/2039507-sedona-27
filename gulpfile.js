<<<<<<< Updated upstream
=======
<<<<<<< HEAD
import gulp from "gulp";
import plumber from "gulp-plumber";
import less from "gulp-less";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import browser from "browser-sync";
=======
>>>>>>> Stashed changes
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
<<<<<<< Updated upstream
=======
>>>>>>> 1ce962949f0cf47c9972cfd71768aa8c65c77321
>>>>>>> Stashed changes

// Styles

export const styles = () => {
<<<<<<< Updated upstream
  return gulp.src('source/less/style.less', { sourcemaps: true })
=======
<<<<<<< HEAD
  return gulp
    .src("source/less/style.less", { sourcemaps: true })
>>>>>>> Stashed changes
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
<<<<<<< Updated upstream
}
=======
};
=======
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}
>>>>>>> 1ce962949f0cf47c9972cfd71768aa8c65c77321
>>>>>>> Stashed changes

// Server

const server = (done) => {
  browser.init({
    server: {
<<<<<<< Updated upstream
      baseDir: 'source'
=======
<<<<<<< HEAD
      baseDir: "source",
=======
      baseDir: 'source'
>>>>>>> 1ce962949f0cf47c9972cfd71768aa8c65c77321
>>>>>>> Stashed changes
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
<<<<<<< Updated upstream
}
=======
<<<<<<< HEAD
};
=======
}
>>>>>>> 1ce962949f0cf47c9972cfd71768aa8c65c77321
>>>>>>> Stashed changes

// Watcher

const watcher = () => {
<<<<<<< Updated upstream
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

=======
<<<<<<< HEAD
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/*.html").on("change", browser.reload);
};

export default gulp.series(styles, server, watcher);
=======
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

>>>>>>> Stashed changes

export default gulp.series(
  styles, server, watcher
);
<<<<<<< Updated upstream
=======
>>>>>>> 1ce962949f0cf47c9972cfd71768aa8c65c77321
>>>>>>> Stashed changes
