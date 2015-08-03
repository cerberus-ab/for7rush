/**
 * @module Класс приложения
 * @singlton
 *
 * @property {Router} router роутер
 * @property {object} views набор представлений
 * @property {object} collections набор коллекций
 * @property {Model} store модель хранимых на клиенте данных
 * @property {object} _meta мета-информация о приложении
 *
 */
define([
    "router",               // роутер
    "models/store",         // модель хранимых на клиенте данных
    "views/app",            // представление приложения
    "collections/cars",     // коллекция автомобилей
    "storage/catalog",      // используемый список автомобилей (бд)
    "storage/brands"        // используемый список брэндов (бд)

], function(Router, StoreModel, AppView, CarsCollection, catalog, brands) {

    var instance = null;

    return function AppConstructorSinglton() {
        if (instance) {
            return instance;
        }
        if (this && this.constructor === AppConstructorSinglton) {

            instance = this;

            this.router = new Router();
            this.views = {};
            this.collections = {};

            // мета-информация о приложении
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
            this.collections.catalog = new CarsCollection(catalog);
            // инициализация списка выбранных в сохраненном порядке (те же модели)
            this.collections.favorites = new CarsCollection(_.compact(choiced.map(function(currentId) {
                return instance.collections.catalog.find(function(currentCar) {
                    return currentCar.get("cid") === currentId;
                });
            })));

            // инициализация представления приложения
            this.views.app = new AppView(this);
            this.views.app.render();

        }
        else {
            return new AppConstructor();
        }
    }
});
