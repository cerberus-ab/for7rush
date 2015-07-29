define([
    "text!templates/app.html",
    "views/table"

], function(template, TableView) {

    return Backbone.View.extend({
        el: "#bauto_app",
        template: _.template(template),

        initialize: function(options) {
            this.app = options.app;
            this.childs = {};
        },

        render: function() {
            // рендеринг каркаса
            this.$el.html(this.template({
                filters: this.app.meta.brands
            }));
            // таблицы автомобилей и избранного как дочерние представления
            this.childs.catalog = new TableView.Catalog({
                collection: this.app.collections.catalog,
                el: "#table_catalog"
            }).render();
            this.childs.faworites = new TableView.Favorites({
                collection: this.app.collections.favorites,
                el: "#table_favorites"
            }).render();
            // статистика как дочернее представление

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
