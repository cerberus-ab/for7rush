/**
 * @module Представление автомобиля
 *
 * @description
 * Возвращает два класса представлений:
 * Catalog - представление автомобиля для списка автомобилей
 * Favorites - представление автомобиля для списка выбранных автомобилей
 *
 */
define([
    "text!templates/car.html",  // шаблон для обычного представления
    "text!templates/carf.html"  // шаблон для представления выбранного автомобиля

], function(template_car, template_carf) {

    // Абстрактный класс представления автомобиля
    var CarView = Backbone.View.extend({
        tagName: "tr",
        initialize: function() {
            this.model.on("change", this.render, this);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            "click .button": "toggle"
        },
        toggle: function(e) {
            e.preventDefault();
            this.model.toggle();
        }
    });

    // Класс представления автомобиля в каталоге
    var CarCatalogView = CarView.extend({
        className: "car_model",
        template: _.template(template_car)
    });

    // Класс представления автомобиля в списке избранных
    var CarFavoritesView = CarView.extend({
        className: "car_model favorites",
        template: _.template(template_carf)
    });

    return {
        Catalog: CarCatalogView,
        Favorites: CarFavoritesView
    };
});
