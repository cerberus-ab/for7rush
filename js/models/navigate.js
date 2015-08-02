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
 */
define(function() {

    var url = "";

    return Backbone.Model.extend({
        initialize: function() {
            this.on("change:subpage change:brand", this.makeUrl, this);
            this.makeUrl();
        },
        makeUrl: function() {
            var subpage = this.get("subpage"),
                brand = this.get("brand"),
                _url = "";
            switch (subpage) {
                case "catalog":
                case "favorites":
                    _url = subpage + (brand && brand !== "_all"
                        ? "/" + brand : "");
                    break;
                default:
                    _url = subpage || "";
                    break;
            }
            if (url !== _url) {
                url = _url;
                this.trigger("changeUrl", url);
            }
        }
    });
});
