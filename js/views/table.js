define([
    "text!templates/table.html",
    "views/car"


], function(template, CarView) {

    var TableView = Backbone.View.extend({
        template: _.template(template)
    });

    var CatalogView = TableView.extend({
        render: function() {
            var self = this;
            this.$el.html(this.template());
            this.$tbody = this.$el.find("tbody");
            this.collection.forEach(function(currentModel) {
                self.$tbody.append(new CarView.Basic({ model: currentModel }).render().el);
            });
        }
    });

    var FavoritesView = TableView.extend({
        render: function() {
            var self = this;
            this.$el.html(this.template());
            this.$tbody = this.$el.find("tbody");
            this.collection.forEach(function(currentModel) {
                self.$tbody.append(new CarView.Favorites({ model: currentModel }).render().el);
            });
        }
    });

    return {
        Catalog: CatalogView,
        Favorites: FavoritesView
    }
});
