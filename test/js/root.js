// конфигурация require
require.config({
    baseUrl: "../src/js",
    paths: {
        "jquery": "lib/jquery-1.11.3",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "highcharts": "lib/highcharts",
        "text": "lib/text"
    },
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore", "text"],
            exports: "Backbone"
        },
        "highcharts": {
            deps: ["jquery"]
        },
        "app": {
            deps: ["backbone", "highcharts"]
        }
    }
});

// определить приложение
define("main", ["app"], function(App) {
    window.bAuto = new App;
});

// запуск тестов
require(["main"], function() {
    mocha.run();
});
