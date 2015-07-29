define([
    "text!templates/cars.html",
    "views/car"

], function(template, CarView) {

    return Backbone.View.extend({
        el: "#subpage_col",
        template: _.template(template),

        initialize: function() {
        },

        render: function() {
            var self = this;
            self.$el.html(self.template({
                filters: self.collection.meta("brands")
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
