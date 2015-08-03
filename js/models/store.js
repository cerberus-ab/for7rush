/**
 * @module Модель локального хранилища
 *
 * @description
 * Сохранение и загрузка локальных данных;
 * статистика работы пользователя с приложением;
 * в случае первого обращения инициируется дефолтная статистика
 * с использованием переданного в конструктор списка брэндов.
 *
 * @param  {array} brands используемые брэнды (initialize)
 * @param  {array} choiced идентификаторы выбранных автомобилей (LS)
 * @param  {object} statistics статистика по брэндам (LS)
 *
 */
define(function() {

    /**
     * @class Базовый класс использования LocalStorage
     * @description Немного нативного js-кода вместо моделей =)
     * @param {string} itemName используемое имя
     * @param {function} cbDefault колбэк значений по умолчанию
     */
    function Storage(itemName, cbDefault) {
        this._item = itemName;
        this._cbDefault = cbDefault;
    }

    /**
     * Загрузить данные из локального хранилища
     * @return {object} данные как объект
     */
    Storage.prototype.load = function() {
        var data = localStorage.getItem(this._item);
        if (data !== null) {
            return JSON.parse(data);
        }
        if (typeof this._cbDefault === "function") {
            return this._cbDefault.apply(this, arguments);
        }
        return null;
    };

    /**
     * Сохранить дынные в локальное хранилище
     * @param  {object} data данные как объект
     */
    Storage.prototype.save = function(data) {
        localStorage.setItem(this._item, JSON.stringify(data));
    };

    /**
     * @class Дочерний класс, используемый модулем
     * @param {string} itemName используемое имя
     */
    function StorageBrands(itemName) {
        StorageBrands.superclass.constructor.call(this, itemName, function(brands) {
            var statistics = {};
            brands.forEach(function(currentBrand) {
                statistics[currentBrand.value] = 0;
            });
            return {
                /** @type {array} массив идентификаторов выбранных авто */
                choiced: [],
                /** @type {object} статистика по брендам */
                statistics: statistics
            };
        });
    }
    StorageBrands.prototype = Object.create(Storage.prototype);
    StorageBrands.prototype.constructor = StorageBrands;
    StorageBrands.superclass = Storage.prototype;


    return Backbone.Model.extend({
        initialize: function(attributes, options) {
            /** @type {StorageBrands} используемое хранилище */
            this._storage = new StorageBrands(options.itemName);
            // инициализация (load)
            var data = this._storage.load(attributes.brands);
            this.set("choiced", data.choiced);
            this.set("statistics", data.statistics);
        },

        save: function() {
            this._storage.save({
                choiced: this.get("choiced"),
                statistics: this.get("statistics")
            });
        },

        /**
         * Выбор автомобиля
         * @param  {Model} model модель автомобиля
         */
        setFavorite: function(model) {
            var cid = model.get("cid"),
                brand = model.get("brand"),
                choiced = this.get("choiced"),
                statistics = this.get("statistics");

            if (choiced.indexOf(cid) < 0) {
                choiced.unshift(cid);
                statistics[brand]++;

                this.set("choiced", choiced);
                this.set("statistics", statistics);
                this.trigger("changeStat");

                this.save();
            };
        },

        /**
         * Отмена выбора автомобиля
         * @param  {Model} model модель автомобиля
         */
        resetFavorite: function(model) {
            var choiced = this.get("choiced"),
                index = choiced.indexOf(model.get("cid"));

            if (index +1) {
                choiced.splice(index, 1);

                this.set("choiced", choiced);
                this.save();
            };
        }
    });
});
