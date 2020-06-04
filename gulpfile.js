// 移入需要的模块
const gulp=require("gulp");//引入gulp模块
const sass=require("gulp-sass");//sass编译模块
const connect =require("gulp-connect");//定义web服务
const sourcemaps=require("gulp-sourcemaps");//出错的时候，除错工具将直接显示原始代码，而不是转换后的代码）
// const babel=require("gulp-babel");//用来将es6转化为es5
// const css = require('gulp-clean-css'); //引入css压缩插件  css函数方法
// const html = require('gulp-minify-html'); //引入html压缩插件  html函数方法

//gulp：流式操作  
//pipe：管道流
//gulp.task():新建一个任务
//gulp.src():引入文件
//gulp.dest():输出目录或输出路径
//watch():监听方法
//gulp.parallel():并行运行任务

//搭建web服务器
// gulp.task("server",done=>{
//     connect.server({//让dist的页面在服务器运行
//         root:"dist",
//         livereload:true//自动刷新
//     })
//     done();
// });

//html
gulp.task("html",done=>{//将html文件拷贝到dist
    gulp.src("src/html/*.html")
        .pipe(gulp.dest("dist/html"))
        .pipe(connect.reload())
        done();
});

// sass最终输出的样式包括下面几种样式风格：
// 嵌套输出方式 nested
// 展开输出方式 expanded 
// 紧凑输出方式 compact 
// 压缩输出方式 compressed
//sass
gulp.task("sass",done=>{//将scss文件转换成css，拷贝到dist
    gulp.src("src/sass/*.scss")
    .pipe(sourcemaps.init())//浏览器调试代码时，让浏览器展示的代码和源代码发生关联 
    .pipe(sass({outputStyle:"compressed "}))//sass的紧凑输出方式 
    .pipe(sourcemaps.write())//输出.map文件
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());//游览器自动刷新
    done();
});

//js
gulp.task("js",done=>{
    gulp.src("src/js/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
    done();
});

//img
gulp.task("img",done=>{
    gulp.src("src/img/**")
    .pipe(gulp.dest("dist/img"))
    .pipe(connect.reload())
    done();
});

// gulp.series 用于串行（顺序）执行
// gulp.parallel 用于并行执行
//事件监听
gulp.task("watch",done=>{
    gulp.watch("src/sass/*.scss",gulp.series("sass"));
    gulp.watch("src/html/*.html",gulp.series("html"));
    gulp.watch("src/img/**",gulp.series("img"));
    gulp.watch("src/js/*.js",gulp.series("js"));
    done();
});

//最后的监听 
gulp.task("default",gulp.parallel("watch"));//建立默认任务，同时执行sever和watch两个任务
