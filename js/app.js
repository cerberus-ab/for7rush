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
        this._meta = {};
        this._meta.brands = brands;

        // инициализация модели хранимых на клиенте данных
        this.store = new StoreModel({
            brands: brands
        });

        // пометить в каталоге автомобили, выбранные на этом клиенте
        var choiced = this.store.get("choiced");
        catalog.forEach(function(currentCar) {
            currentCar.isFav = choiced.indexOf(currentCar.cid) > -1;
        });

        // инициализация коллекции автомобилей
        // используются один и те же модели
        this.collections.catalog = new CarsCollection(catalog);
        this.collections.favorites = new CarsCollection(this.collections.catalog.models.filter(function(currentCar) {
            return currentCar.get("isFav");
        }));

        // инициализация представления приложения
        this.views.app = new AppView({
            // использует коллекции автомобилей и модель статистики
            // для формирования дочерних представлений
            collections: this.collections,
            store: this.store,
            // использует метаинформацию о приложении
            _meta: this._meta
        });
        this.views.app.render();
    };

    return App;
});
