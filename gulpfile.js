var gulp = require("gulp");

var less = require("gulp-less");

var htmlmin = require("gulp-htmlmin");

var concat = require("gulp-concat");

var uglify = require("gulp-uglify");

var minifyCss = require("gulp-minify-css");

var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

var del = require('del');

gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js','dist/*.html'], cb)
});


gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html') //该任务针对的文件
        .pipe(htmlmin(options)) //该任务调用的模块
        .pipe(gulp.dest('dist')); //将会在dist/html下生成压缩后的detail.html和index.html
});


gulp.task("testMinJS",function(){
	gulp.src("src/js/*.js")
		.pipe(concat("index.js"))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch',['testMinJS'],browserSync.reload);

gulp.task("testMinCSS",function(){
	gulp.src("src/less/*.less")
		.pipe(less())
		.pipe(minifyCss())
		.pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}));
	
});

gulp.task("start",['testMinCSS','testHtmlmin','testMinJS'],function(){
    browserSync.init({
        server:{
            baseDir:'dist'
        }
    })

    gulp.watch('src/less/*.less',["testMinCSS"]);
    gulp.watch('src/js/*.js',['js-watch']);
    gulp.watch('src/html/*.html',['testHtmlmin']).on('change',reload);
});


gulp.task("default",['start']);

/*
    gulp+react
    gulp+vue
    gulp+ng

*/ 

