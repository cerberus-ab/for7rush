define(function() {

    return Backbone.Model.extend({
        toggle: function() {
            this.set("isFav", !this.get("isFav"));
            this.trigger("toggle", this);
        }
    });
});
