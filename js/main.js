requirejs.config({
    baseUrl: "js",
    paths: {
        "jquery": "lib/jquery-1.11.3-min",
        "underscore": "lib/underscore-min",
        "backbone": "lib/backbone-min",
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
        "app": {
            deps: ["backbone"]
        }
    }
});

require(["app"], function(App) {
    window.bAuto = new App();
});
