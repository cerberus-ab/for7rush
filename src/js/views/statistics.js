/**
 * @module Представление статистики
 *
 * @description
 * Отрисовка графика статистики выбора автомобилей;
 * в качестве модели используются хранимые на клиенте данные.
 *
 * @param  {array} brands используемые брэнды
 * @param  {object} statistics статистика по брэндам
 *
 */
define(function() {

    return Backbone.View.extend({
        tagName: "div",

        initialize: function() {
            this.model.on("changeStat", this.render, this);

            var brands = this.model.get("brands");
            this.$el.highcharts({
                chart: {
                    type: "column"
                },
                title: {
                    text: "Статистика выбора автомобилей по брэндам"
                },
                xAxis: {
                    categories: brands.map(function(currentBrand) {
                        return currentBrand.label;
                    })
                },
                yAxis: {
                    min: 0,
                    allowDecimals: false,
                    title: {
                        text: "Сколько раз брэнд выбирался"
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: "Всего",
                    data: Array.apply(null, {length: brands.length}).map(Number.prototype.valueOf, 0)
                }]
            });
        },

        render: function() {
            var statistics = this.model.get("statistics");
            this.$el.highcharts().series[0].setData(this.model.get("brands").map(function(currentBrand) {
                return statistics[currentBrand.value] || 0;
            }));
            return this;
        }
    });
});
