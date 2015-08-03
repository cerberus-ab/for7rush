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

    /**
     * Функция-конструктор обработчика всплывающей подсказки
     * для отображения полного изображения по превью в таблицах
     * @param {jQuery} $container контейнер подсказки
     * @param {object} options настройки
     */
    function TooltipImage($container, options) {
        // настройки по умолчанию
        options = _.extend({
            /** @type {number:integer} ожидание (мс) */
            waiting: 500,
            /** @type {number:integer} время анимации (мс) */
            aspeed: 200,
            /** @type {string} используемый атрибут для получения пути к изображению */
            img_src_attr: "data-img",
            /** @type {string} селектор изображения в контейнере */
            img_selector: "img"
        }, options);

        /** @type {jQuery} элемент изображения в контейнере */
        var $image = $container.find(options.img_selector);

        // дискриптор таймера и флаг состояния
        var timer = null,
            isHidden = true;

        /**
         * Открыть подсказку
         * @param  {jQuery} $target целевой элемент
         */
        this.show = function($target) {
            timer = setTimeout(function() {
                isHidden = false;
                $image.attr("src", $target.attr(options.img_src_attr));
                $container.appendTo($target.parent()).fadeIn(options.aspeed);
            }, options.waiting);
        };

        /**
         * Закрыть подсказку
         */
        this.hide = function() {
            clearTimeout(timer);
            if (!isHidden) {
                isHidden = true;
                $container.fadeOut(options.aspeed);
            }
        };
    }

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
            /** @type {TooltipImage} обработчик всплывающей подсказки */
            this._ttimg = new TooltipImage(this.$el.find(".td_image_tt"));
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
            this._ttimg.show($(e.currentTarget));
        },

        /**
         * Скрыть всплывающую подсказку
         * @param  {Event} e событие отвода курсора
         */
        imageHide: function(e) {
            e.preventDefault();
            this._ttimg.hide();
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
