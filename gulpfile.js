/**
 * Neoskop Gulpfile
 * Copyright (c) 2014 Neoskop GmbH
 */


/*-------------------------------------------------------------------
    Required plugins
-------------------------------------------------------------------*/

var gulp       = require('gulp'),
    bump       = require('gulp-bump'),
    clean      = require('gulp-clean'), // TODO: uss gulp-rimraf https://www.npmjs.org/package/gulp-rimraf
    concat     = require('gulp-concat'),
    connect    = require('gulp-connect'),
    cssmin     = require('gulp-cssmin'),
    filter     = require('gulp-filter'),
    git        = require('gulp-git'),
    gulpif     = require('gulp-if'),
    imagemin   = require('gulp-imagemin'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-sass'),
    shell      = require('gulp-shell'),
    tagversion = require('gulp-tag-version'),
    uglify     = require('gulp-uglify');


/*-------------------------------------------------------------------
    Configuration
-------------------------------------------------------------------*/

// Deployment Parameters
// Description: Set parameters for deployment and rsync
// Note: rsync has to be installed on remote host
var deployment = {
  local: {
    path: 'public'
  },
  remote: {
    host: 'YOUR HOST',
  },
  rsync: {
    options: '-avzh --delete -e ssh'
  }
}

// Production Handling
// Description: Use 'production' variable with 'gulpif'
// to minify and optimize assets for production
var production;

// Base Paths
// Description: Set base and destination paths
var basePaths = {
  assets: {
    base: 'source/assets/',
    dest: 'public/assets/'
  },
  scripts: {
    base: 'source/assets/javascripts/',
    dest: 'public/assets/javascripts/'
  },
  components: {
    base: 'source/assets/components/',
  },
  scss: {
    base: 'source/assets/scss/',
    dest: 'public/assets/stylesheets/'
  },
  fonts: {
    base: 'source/assets/fonts/',
    dest: 'public/assets/fonts/'
  },
  images: {
    base: 'source/assets/images/',
    dest: 'public/assets/images/'
  },
  dummies: {
    base: 'source/dummies/',
    dest: 'public/dummies/'
  }
};


// Application Files
// Description: Set applications files and paths
var appFiles = {
  versioning: [
    './package.json',
    './bower.json'
  ],
  scripts:
    basePaths.scripts.base + '**/*.js',

  components:[

  ],

  scss: [
    basePaths.scss.base + '**/*.scss'
  ],

  fonts:
    basePaths.fonts.base + '**/*',

  images:
    basePaths.images.base + '**/*',

  dummies:
    basePaths.dummies.base + '**/*',

  patternlab: [
    'source/_patterns/**/*.mustache',
    'source/_patterns/**/*.json',
    'source/_data/*.json'
  ]
};


/*-------------------------------------------------------------------
    Tasks
-------------------------------------------------------------------*/

// Task: Clean:before
// Description: Removing assets files before running other tasks
gulp.task('clean:before', function () {
  return gulp.src(
    basePaths.assets.dest
  )
    .pipe(clean({
      force: true
    }))
});


// Task: Handle scripts
gulp.task('scripts', function () {
  return gulp.src(appFiles.scripts)
    .pipe(concat(
      'application.js'
    ))
    .pipe(gulpif(production, uglify()))
    .pipe(gulpif(production, rename({
      suffix: '.min'
    })))
    .pipe(gulp.dest(
      basePaths.scripts.dest
    ))
    .pipe(connect.reload());
});


// Task: Handle fonts
gulp.task('fonts', function () {
  return gulp.src(appFiles.fonts)
    .pipe(gulp.dest(
      basePaths.fonts.dest
    ))
    .pipe(connect.reload());
});


// Task: Handle images
gulp.task('images', function () {
  return gulp.src(appFiles.images)
    .pipe(gulpif(production, imagemin()))
    .pipe(gulp.dest(
      basePaths.images.dest
    ))
    .pipe(connect.reload());
});

// Task: Handle images
gulp.task('dummies', function () {
  return gulp.src(appFiles.dummies)
    .pipe(gulpif(production, imagemin()))
    .pipe(gulp.dest(
      basePaths.dummies.dest
    ))
    .pipe(connect.reload());
});


// Task: Handle Sass and CSS
gulp.task('sass', function () {
  return gulp.src(appFiles.scss)
    .pipe(sass())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulpif(production, rename({
      suffix: '.min'
    })))
    .pipe(gulp.dest(
      basePaths.scss.dest
    ))
    .pipe(connect.reload());
});


// Task: Pattern Lab
// Description: Build static Pattern Lab files via PHP script
gulp.task('patternlab', function () {
  return gulp.src('', {read: false})
    .pipe(shell([
      'php core/builder.php -gpn'
    ]))
    .pipe(connect.reload());
});


// Task: Server
// Description: Run web server at localhost:8080
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});


// Task: Watch files
gulp.task('watch', function () {

  // Watch Pattern Lab files
  gulp.watch(
    appFiles.patternlab,
    ['patternlab']
  );

  // Watch scripts
  gulp.watch(
    appFiles.scripts,
    ['scripts']
  );

  // Watch images
  gulp.watch(
    appFiles.images,
    ['images']
  );

  // Watch Sass
  gulp.watch(
    appFiles.scss,
    ['sass']
  );

  // Watch fonts
  gulp.watch(
    appFiles.fonts,
    ['fonts']
  );
});


// Task: Default
// Description: Build all stuff of the project once
gulp.task('default', ['clean:before'], function () {
  production = false;

  gulp.start(
    'patternlab',
    'fonts',
    'sass',
    'images',
    'dummies',
    'scripts'
  );
});


// Task: Start your production-process
// Description: Typ 'gulp' in the terminal
gulp.task('serve', function () {
  production = false;

  gulp.start(
    'connect',
    'default',
    'watch'
  );
});



/*-------------------------------------------------------------------
    Release and Deploy
-------------------------------------------------------------------*/

// Task: Deploy static content
// Description: Deploy static content using rsync shell command
gulp.task('deploy', function () {
  return gulp.src(deployment.local.path, {read: false})
    .pipe(shell([
      'rsync '+ deployment.rsync.options +' '+ deployment.local.path +'/ '+ deployment.remote.host
    ]))
});

// Function: Releasing (Bump & Tagging)
// Description: Bump npm versions, create Git tag and push to origin
gulp.task('release', function () {
  return gulp.src(appFiles.versioning)
    .pipe(bump({
      type: gulp.env.type || 'patch'
    }))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Release a ' + gulp.env.type + '-update'))

    // read only one file to get version number
    .pipe(filter('package.json'))

    // Tag it
    .pipe(tagversion())

    // Publish files and tags to endpoint
    .pipe(shell([
      'git push origin develop',
      'git push origin --tags'
    ]));

    // Start Deployment
    gulp.start('deploy');
});
