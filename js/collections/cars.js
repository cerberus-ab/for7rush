define([
    "models/car"

], function(CarModel) {

    return Backbone.Collection.extend({
        model: CarModel,
        url: "catalog",

        filterBrand: function(brand) {
            return brand !== "all" ? this.filter(function(currentCar){
                return currentCar.get("brand") === brand;
            }) : this;
        },

        filterFavorites: function() {

        }
    });
});
