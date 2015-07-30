define([
    "text!templates/car.html",
    "text!templates/carf.html"

], function(template_car, template_carf) {

    var CarView = Backbone.View.extend({
        tagName: "tr",
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var CarBasicView = CarView.extend({
        className: "car_model",
        template: _.template(template_car),
        initialize: function() {
            this.model.on("toggle", this.render, this);
        },
        events: {
            "click .button.but_choice": "choicedCar"
        },
        choicedCar: function(e) {
            e.preventDefault();
            this.model.toggle();
        }
    });

    var CarFavoritesView = CarView.extend({
        className: "car_model favorites",
        template: _.template(template_carf),
        initialize: function() {

        },
        events: {
            "click .button.but_cancel": "canceledCar"
        },
        canceledCar: function(e) {
            e.preventDefault();
            this.model.toggle();
        }
    });

    return {
        Basic: CarBasicView,
        Favorites: CarFavoritesView
    };
});
