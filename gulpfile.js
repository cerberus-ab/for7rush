var gulp = require("gulp-param")(require("gulp"), process.argv),
    csso = require("gulp-csso"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    fs = require("fs"),
    mkdirp = require("mkdirp"),
    shell = require("gulp-shell");

/**
 * @task Обработка ресурсов: сжатие изображений
 */
gulp.task("buildResources", function() {
    gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("build/img"))
    ;
});

/**
 * @task Обработка индексного файла: копирование
 */
gulp.task("buildIndex", function() {
    gulp.src("src/index.html")
        .pipe(gulp.dest("build"))
    ;
});

/**
 * @task Обработка стилей: минификация
 */
gulp.task("buildStyles", function() {
    gulp.src("src/style/main.css")
        .pipe(csso())
        .pipe(gulp.dest("build/style"))
    ;
});

/**
 * @task Обработка библиотек: require
 */
gulp.task("buildLibs", function() {
    gulp.src(["src/js/lib/require.js"])
        .pipe(uglify())
        .pipe(gulp.dest("build/js/lib"))
    ;
});

/**
 * @task Обработка скриптов: конкатенация, минификация
 */
gulp.task("buildScripts", shell.task([
    "r.js -o buildjs.js"
]));

/**
 * @task Сборка проекта
 * @param {string} tag используемый таг
 * @param {boolean} info создать файл информации о сборке
 */
gulp.task("build", [
    "buildIndex",
    "buildResources",
    "buildStyles",
    "buildLibs",
    "buildScripts"

], function(tag, info) {
    if (info) {
        var info_content = "BUILD INFO FILE\n---\n";
            info_content += "Date: " + new Date().toString() + "\n";
            info_content += "Tag: " + (tag ? tag : "unassigned") + "\n";
            info_content += "---\n";

        fs.writeFile("build/build.info", info_content, function(err) {
            if (err) throw err;
        });
    }
});
