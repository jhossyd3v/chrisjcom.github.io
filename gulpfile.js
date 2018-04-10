const   gulp    = require('gulp'),
        pug     = require('gulp-pug'),
        uglify  = require('gulp-uglify'),
        sass    = require('gulp-ruby-sass'),
        connect = require('gulp-connect');

//Servidor web de desarrollo
gulp.task('server',() =>
{
    connect.server({
        root: 'dev',
        livereload: true
    });
});

//Servidor web para probar en produccion
gulp.task('server-dist',()=>
{
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('pug', () => {
    gulp.src('dev/pug/*.pug')
        .pipe(pug(
            {
                pretty: true
            }
        ))
        .pipe(gulp.dest('dev/'))
        .pipe(connect.reload());
});

gulp.task('scripts', () => {
    gulp.src('./dev/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('styles', () => {
    gulp.src('./dev/scss/**/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./dev/css/'))
        .pipe(connect.reload());
});

gulp.task('compress-css', () => {
    gulp.src('./dev/scss/**/*.scss')
        .pipe(sass({
            style : 'compressed'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch('./dev/pug/**/*.pug', ['pug']);
    // gulp.watch('./dev/js/*.js', ['scripts']);
    gulp.watch('./dev/scss/**/*.scss', ['styles']);
})

gulp.task('default', ['server','watch']);
gulp.task('build', ['scripts','compress-css','server-dist']);