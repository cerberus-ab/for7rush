requirejs.config({
    baseUrl: "js",
    paths: {
        "jquery": "lib/jquery-1.11.3-min",
        "underscore": "lib/underscore-min",
        "backbone": "lib/backbone-min",
        "highcharts": "lib/highcharts-min",
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

require(["app"], function(App) {
    window.bAuto = new App;

    $(document).ready(function() {
        Backbone.history.start({ root: "/semrush/" });
    });
});
