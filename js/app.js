define([
    "config",
    "router",
    "views/app"

], function(config, Router, AppView) {

    var App = function() {
        this.routes = new Router();
        this.views.app = new AppView();
    };

    return App;
});
