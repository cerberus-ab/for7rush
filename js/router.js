define(function() {
    return Backbone.Router.extend({

        initialize: function() {
            this.route("catalog", "open");
            this.route("favorites", "open");
            this.route("statistics", "open");
            this.route("*/:brand", "choice");
        }

        /*
        routes: {
            'catalog': 'showCatalog',
            'favorites': 'showFavorites',
            'catalog/:brand': 'showCatalog',
            'favorites/:brand': 'showFavorites',
            'statistics': 'showStatistics'
        },

        showCatalog: function(brand) {
            bAuto.views.app.openInsetByName("catalog");
            bAuto.views.app.openBrandByName(brand);
        },

        showFavorites: function(brand) {
            bAuto.views.app.openInsetByName("favorites");
            bAuto.views.app.openBrandByName(brand);
        },

        showStatistics: function() {
            bAuto.views.app.openInsetByName("statistics");
        }

        */

    });
});
