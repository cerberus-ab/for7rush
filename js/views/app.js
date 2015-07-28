define([
    "text!templates/app.html",
    "views/cars"

], function(template, CarsView) {

    return Backbone.View.extend({
        el: "#bauto_app",
        template: _.template(template),

        initialize: function(options) {
            this.childs = {};
            this.collections = {};
            this.collections.cars = options.cars;
        },

        render: function() {
            this.$el.html(this.template());
            this.childs.cars = new CarsView({ collection: this.collections.cars });
            this.childs.cars.render();
            return this;
        },

        events: {
            "click #inset_cat": "showCatalog",
            "click #inset_fav": "showFavorites",
            "click #inset_sta": "showStatistics"
        },

        showCatalog: function() {

        },

        showFavorites: function() {

        },

        showStatistics: function() {

        }
    });
});
