/**
 * @module Модель объекта навигации
 *
 * @description
 * Используется главным файлом представления
 * для формирования фрагмента url для текущего состояния;
 * при изменении url инициирует соответствующий сигнал.
 *
 * @param  {string} subpage открытая вкладка
 * @param  {string} brand используемый брэнд
 *
 */
define(function() {

    return Backbone.Model.extend({
        initialize: function() {
            this.set("_url", "");
            this.on("change:subpage change:brand", this.makeUrl, this);
            this.makeUrl();
        },
        makeUrl: function() {
            var subpage = this.get("subpage"),
                brand = this.get("brand"),
                url = "";
            switch (subpage) {
                case "catalog":
                case "favorites":
                    url = subpage + (brand && brand !== "_all"
                        ? "/" + brand : "");
                    break;
                default:
                    url = subpage || "";
                    break;
            }
            this.set("_url", url);
        }
    });
});
