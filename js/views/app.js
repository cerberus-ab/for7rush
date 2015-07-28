define([
    "text!templates/app.html",
    "views/cars"

], function(template, CarsView) {

    return Backbone.View.extend({
        el: "#bauto_app",
        template: _.template(template),

        initialize: function(options) {
            console.log(options);
        },

        render: function() {
            this.$el.html(this.template());
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
