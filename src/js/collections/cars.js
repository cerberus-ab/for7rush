/**
 * @module Коллекция автомобилей
 *
 * @description
 * При изменении мета-информации о коллекции,
 * инициирует соответствующий сигнал на представления.
 *
 */
define([
    "models/car"    // модель автомобиля

], function(CarModel) {

    return Backbone.Collection.extend({
        model: CarModel,

        initialize: function() {
            this._meta = {
                brand: "_all"
            };
        },

        meta: function(prop, value) {
            if (typeof value !== "undefined") {
                if (this._meta[prop] !== value) {
                    this._meta[prop] = value;
                    this.trigger("meta", prop, value);
                }
            }
            else {
                return this._meta[prop];
            }
        }
    });
});
