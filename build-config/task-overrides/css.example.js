const requireCached = require(`${process.env.PWD}/gulpfile.js/src/gulp/require-cached`)

const gulp = requireCached('gulp')

gulp.task('css', () => {
  console.log('This is an example task.')
})
