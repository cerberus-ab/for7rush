define(function() {

    return Backbone.View.extend({
        tagName: "div",

        initialize: function() {
        },

        render: function() {
            var statistics = this.model.get("statistics"),
                brands = this.model.get("brands").map(function(currentBrand) {
                    return currentBrand.label;
                });

            this.$el.highcharts({
                chart: {
                    type: "column"
                },
                title: {
                    text: "Статистика выбора автомобилей по брэндам"
                },
                xAxis: {
                    categories: brands
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Брэнд выбирался"
                    }
                },
                series: [{
                    name: "Всего",
                    data: [5,0,2,1]
                }]
            });
            return this;
        }
    });
});
