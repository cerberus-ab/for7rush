define(function() {
    return Backbone.Router.extend({
        routes: {
            "": "openCatalog",
            "catalog(/:brand)": "openCatalog",
            "favorites(/:brand)": "openFavorites",
            "statistics": "openStatistics"
        }
    });
});
