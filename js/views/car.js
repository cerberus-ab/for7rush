define([
    "text!templates/car.html",
    "text!templates/carf.html"

], function(template_car, template_carf) {

    var CarView = Backbone.View.extend({
        tagName: "tr"
    });

    var CarBasicView = CarView.extend({
        className: "car_model",
        template: _.template(template_car),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var CarFavoritesView = CarView.extend({
        className: "car_model favorites",
        template: _.template(template_carf),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return {
        Basic: CarBasicView,
        Favorites: CarFavoritesView
    };
});
