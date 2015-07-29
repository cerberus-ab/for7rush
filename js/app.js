define([
    "router",
    "models/store",
    "views/app",
    "collections/cars",
    "storage/catalog",
    "storage/brands"

], function(Router, StoreModel, AppView, CarsCollection, catalog, brands) {

    var App = function() {
        var self = this;

        this.router = new Router();
        this.views = {};
        this.collections = {};

        // метаинформация о приложении
        this.meta = {};
        this.meta.brands = brands;

        // инициализация модели хранимых на клиенте данных
        this.store = new StoreModel({
            brands: brands
        });

        // пометить в каталоге автомобили, выбранные на этом клиенте
        catalog.forEach(function(currentCar) {
            currentCar.isFav = self.store.data.choiced.indexOf(currentCar.cid) > -1;
        });

        // инициализация коллекции автомобилей
        this.collections.catalog = new CarsCollection(catalog);
        this.collections.favorites = new CarsCollection(catalog.filter(function(currentCar) {
            return currentCar.isFav;
        }));

        // инициализация представления приложения
        this.views.app = new AppView({
            app: this
        });
        this.views.app.render();
    };

    return App;
});
