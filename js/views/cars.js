define([
    "text!templates/cars.html",
    "storage/brands",
    "views/car"

], function(template, brands, CarView) {

    return Backbone.View.extend({
        el: "#subpage_col",
        template: _.template(template),

        initialize: function() {
            console.log(this.collection);
        },

        render: function() {
            var self = this;
            self.$el.html(self.template({
                filters: brands
            }));
            self.$list = self.$el.find("#catalog_list");
            self.collection.forEach(function(currentCar) {
                self.$list.append(new CarView({ model: currentCar }).render().el);
            });
            return self;
        },

        events: {

        }
    });
});
