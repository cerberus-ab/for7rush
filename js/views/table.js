/**
 * @module Представление таблицы коллекций
 *
 * @description
 * Возвращает два класса представлений:
 * Catalog - представление таблицы для списка автомобилей
 * Favorites - представление таблицы для списка выбранных автомобилей
 *
 */
define([
    "text!templates/table.html",    // шаблон таблицы
    "views/car"                     // представление автомобиля

], function(template, CarView) {

    // дискриптор таймера и флаг для всплывающей подсказки
    var tooltip_timer = null,
        tooltip_hidden = true;

    // Абстрактный класс представления таблицы
    var TableView = Backbone.View.extend({
        template: _.template(template),

        initialize: function() {
            this.collection.on("add remove", this.render, this);
            this.collection.on("meta", this.metaChanged, this);
        },

        render: function() {
            this.$el.html(this.template());
            this.$tbody = this.$el.find("tbody");
            this.$amount = this.$el.find(".table_amount");
            this.$imgtt = this.$el.find(".td_image_tt");
            // рендеринг с учетом брэнда
            this.renderFiltered(this.collection.meta("brand"));
            return this;
        },

        /**
         * Рендеринг коллекции с учетом фильтра по брэнду
         * @param  {string} brand используемый брэнд
         */
        renderFiltered: function(brand) {
            var self = this,
                showAll = brand === "_all";
            this.list = this.collection.models.filter(function(currentModel) {
                return showAll || currentModel.get("brand") === brand;
            });
            this.list.forEach(function(currentModel) {
                self.$tbody.append(self.getRenderModelEl(currentModel));
            });
            this.$amount.text(this.list.length);
        },

        // собственные события представления
        events: {
            "mouseover .td_image": "imageShow",
            "mouseleave .td_image": "imageHide"
        },

        /**
         * Отобразить всплывающую подсказку
         * @param  {Event} e событие наведения курсора
         */
        imageShow: function(e) {
            e.preventDefault();
            var self = this;
            tooltip_timer = setTimeout(function() {
                tooltip_hidden = false;
                var $target = $(e.currentTarget),
                    img_src = $target.attr("data-img");
                self.$imgtt.find("img").attr("src", img_src);
                self.$imgtt.appendTo($target.parent()).fadeIn(200);
            }, 500);
        },

        /**
         * Скрыть всплывающую подсказку
         * @param  {Event} e событие отвода курсора
         */
        imageHide: function(e) {
            e.preventDefault();
            clearTimeout(tooltip_timer);
            if (!tooltip_hidden) {
                tooltip_hidden = true;
                this.$imgtt.fadeOut(200);
            }
        },

        /**
         * Изменилась мета-информация о коллекции
         * @param  {string} prop свойство
         * @param  {Mixed} value новое значение
         */
        metaChanged: function(prop, value) {
            if (prop === "brand") {
                this.render();
            }
        }
    });

    // Класс представления каталога автомобилей
    var CatalogView = TableView.extend({
        getRenderModelEl: function(model) {
            return new CarView.Catalog({ model: model }).render().el;
        }
    });

    // Класс представления списка избранных автомобилей
    var FavoritesView = TableView.extend({
        getRenderModelEl: function(model) {
            return new CarView.Favorites({ model: model }).render().el;
        }
    });

    return {
        Catalog: CatalogView,
        Favorites: FavoritesView
    }
});
