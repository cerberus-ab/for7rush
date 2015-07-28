define([
    "text!templates/car.html"

], function(template) {

    return Backbone.View.extend({
        tagName: "tr",
        template: _.template(template),

        initialize: function() {
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
