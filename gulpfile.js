const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('node-sass'))
sass.compiler = require('node-sass')
const uglify = require('gulp-uglify-es').default

gulp.task('default', () => {
	return gulp
		.src('./src/public/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: 'last 2 version',
			})
		)
		.pipe(gulp.dest('./src/public/stylesheets'))
})

gulp.task('uglifyJs', () => {
	return gulp
		.src('./src/public/scripts/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./src/public/js'))
})
