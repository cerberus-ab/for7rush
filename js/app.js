define([
    "router",
    "views/app",
    "collections/cars",
    "storage/catalog"

], function(Router, AppView, CarsCollection, catalog) {

    var App = function() {
        this.router = new Router();
        this.views = {};
        this.collections = {};

        this.collections.cars = new CarsCollection(catalog);

        this.views.app = new AppView({
            cars: this.collections.cars
        });

        this.views.app.render();
    };

    return App;
});
