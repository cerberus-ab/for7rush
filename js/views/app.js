define(["text!templates/app.html"], function(template) {
    return Backbone.View.extend({
        el: '#bauto_app',
        template: _.template(template)
    });
});
