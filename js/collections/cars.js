define([
    "models/car"

], function(CarModel) {

    return Backbone.Collection.extend({
        model: CarModel
    });
});
