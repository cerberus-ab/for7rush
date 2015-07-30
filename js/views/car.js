define([
    "text!templates/car.html",
    "text!templates/carf.html"

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
    var CarBasicView = CarView.extend({
        className: "car_model",
        template: _.template(template_car)
    });

    // Класс представления автомобиля в списке избранных
    var CarFavoritesView = CarView.extend({
        className: "car_model favorites",
        template: _.template(template_carf)
    });

    return {
        Basic: CarBasicView,
        Favorites: CarFavoritesView
    };
});
