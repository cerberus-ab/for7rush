/**
 * @module Корневой файл
 *
 * @description
 * Одновременно является файлом конфигурации require;
 * в билде содержит весь минифицированный js-код приложения.
 *
 */
require.config({
    baseUrl: "js",
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
    },
    deps: ["main"]
});
