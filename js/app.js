define([
    "config",
    "router",
    "views/app",
    "collections/cars"

], function(config, Router, AppView, CarsCollection) {

    var App = function() {
        this.router = new Router();
        this.views = {};
        this.collections = {};

        this.collections.cars = new CarsCollection();

        this.views.app = new AppView();

        this.views.app.render();
    };

    return App;
});
