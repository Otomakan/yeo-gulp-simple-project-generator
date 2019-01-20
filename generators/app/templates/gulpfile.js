const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const cleanCSS= require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const transform = require('vinyl-transform')
const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const imagemin = require('gulp-imagemin');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch('src/js/*.js',['compress']).on('change',browserSync.reload)
    gulp.watch('src/styles/*.scss',['clean-css']).on('change',browserSync.reload)
    // gulp.watch('src/js/*.js',['browserify']).on('change',browserSync.reload)
    gulp.watch('*').on('change',browserSync.reload)

})
gulp.task('compress', ()=>
        gulp.src('src/js/*.js')
        .pipe(concat('bundle.js'))
         .pipe(babel({
            presets: ['@babel/env']
        }).on('error', function(e){
            console.log(e);}))
         .pipe(uglify().on('error', function(e){
            console.log(e);}))
        .pipe(gulp.dest('./dist/'))
);

// DONT MIND THIS FOR NOW, MIGHT USE FOR BROWSERIFY LATER
// gulp.task('browserify', function () {
//   // return browserify({entries: './src/js/main1.js', debug: true})
//   //       .transform("babelify", {presets: ["@babel/preset-env"]})
//   //       .bundle()
//   //       .pipe(source('main1.js'))
//   //       .pipe(buffer())
//   //       // .pipe(uglify())
//   //       .pipe(gulp.dest('./dist/'));;
//    gulp.src('src/js/*.js')
//          .pipe(babel({
//             presets: ['@babel/env']
//         }))
//          .pipe(uglify().on('error', function(e){
//             console.log(e);}))
//         .pipe(gulp.dest('./dist/'))
// });


gulp.task('clean-css',()=>
  gulp.src('src/styles/*.scss')
  // .pipe(concat('bundle.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/'))
  )

gulp.task('imagemin', () =>
    gulp.src('src/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images/'))
);
gulp.task('default',['serve','compress','clean-css','imagemin'])

