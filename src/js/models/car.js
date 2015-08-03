/**
 * @module Модель автомобиля
 *
 * @description
 * Инициирует события при добавлении и удалении из списка выбранных.
 *
 */
define(function() {

    return Backbone.Model.extend({
        toggle: function() {
            this.set("isFav", !this.get("isFav"));
            // сигнал о смене статуса модели
            this.trigger(this.get("isFav") ? "setFavorite" : "resetFavorite", this);
        }
    });
});
