var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    zip = require('gulp-zip'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    notify = require('gulp-notify');

/* 设置源码位置 */
function InitSrc(src) {
    //设置主目录
    this.main = src;
    //设置图片目录
    this.images = this.main + '/images';
    this.images_all = this.images + '/**';
    //设置页面目录
    this.pages = this.main + '/pages';
    this.pages_all = this.pages + '/**';
    this.pages_scss = this.pages + '/**/*.scss';
    //设置模板目录
    this.templates = this.main + '/templates';
    this.templates_all = this.templates + '/**';
    //设置样式目录
    this.styles = this.main + '/styles';
    this.styles_all = this.styles + '/**';
    //设置工具类目录
    this.utils = this.main + '/utils';
    this.utils_all = this.utils + '/**';
}
/* 设置输出位置 */
function InitDist(dist) {
    this.main = dist;
    this.images = this.main + '/images';
    this.pages = this.main + '/pages';
    this.templates = this.main + '/templates';
    this.utils = this.main + '/utils';
}

var src = new InitSrc('src');
var dist = new InitDist('dist');

/* 处理样式表 */
gulp.task('build:style', function() {
    return gulp.src([src.pages_scss, src.main + '/app.scss'], {
            base: "src"
        })
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(rename(function(path) {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest(dist.main))
        .pipe(notify({
            onLast: true,
            message: '样式表处理完成!'
        }));
});
gulp.task('watch:style', function() {
    gulp.watch([src.styles_all, src.pages_scss, src.main + '/app.scss'], ['build:style']);
});

/* 复制其他文件 */
gulp.task('copy:all', ['copy:main', 'copy:pages', 'copy:templates', 'copy:utils'], function() {
    return;
});
gulp.task('copy:main', function() {
    return gulp.src([src.main + '/app.js', src.main + '/app.json'], {
            base: "src"
        })
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            onLast: true,
            message: '复制主文件完成!'
        }));
});
gulp.task('copy:pages', function() {
    return gulp.src([src.pages_all, '!' + src.pages_scss], {
            base: "src"
        })
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            onLast: true,
            message: '复制页面完成!'
        }));
});
gulp.task('copy:templates', function() {
    return gulp.src(src.templates_all, {
            base: "src"
        })
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            onLast: true,
            message: '复制模板完成!'
        }));
});
gulp.task('copy:utils', function() {
    return gulp.src(src.utils_all, {
            base: "src"
        })
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            onLast: true,
            message: '复制工具类理完成!'
        }));
});
gulp.task('watch:copy', function() {
    gulp.watch([src.main + '/app.js', src.main + '/app.json'], ['copy:main']);
    gulp.watch([src.pages_all, '!' + src.pages_scss], ['copy:pages']);
    gulp.watch(src.templates_all, ['copy:templates']);
    gulp.watch(src.utils_all, ['copy:utils']);
});

/* 图片压缩 */
gulp.task('build:images', function() {
    return gulp.src([src.images_all], {
            base: src.images
        })
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(dist.images))
        .pipe(notify({
            onLast: true,
            message: '图片处理完成!'
        }));
});
gulp.task('watch:images', function() {
    gulp.watch([src.images_all], ['build:images']);
});

/* 清除图片缓存 */
gulp.task('clean:cache', function(done) {
    return cache.clearAll(done);
});
/* 清理部署目录 */
gulp.task('clean:all', ['clean:cache'], function(done) {
    return gulp.src(dist.main + '/*')
        .pipe(clean())
        .pipe(notify({
            onLast: true,
            message: '清理部署目录完成!'
        }));
});

/* 打包压缩 */
gulp.task('zip', function() {
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    var d = new Date();
    var year = d.getFullYear();
    var month = checkTime(d.getMonth() + 1);
    var day = checkTime(d.getDate());
    var hour = checkTime(d.getHours());
    var minute = checkTime(d.getMinutes());
    runSequence('clean:all', 'build:all', function() {
        return gulp.src([dist.main + '/**'])
            .pipe(zip('build-' + year + month + day + hour + minute + '.zip'))
            .pipe(gulp.dest(''))
            .pipe(notify({
                message: '压缩打包完成!'
            }));
    });
});

gulp.task('build:all', ['build:style', 'build:images', 'copy:all'], function() {
    return;
});

gulp.task('default', ['watch:style', 'watch:copy', 'watch:images'], function() {
    return;
});
