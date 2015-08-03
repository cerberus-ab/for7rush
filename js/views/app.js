/**
 * @module Представление приложения
 *
 * @description
 * Главный файл представления;
 * имеет дочерние представления для коллекций и статистики;
 * описывает основную бизнес-логику приложения;
 * имеет ссылку на экземпляр приложения.
 *
 */
define([
    "text!templates/app.html",  // шаблон представления
    "models/navigate",          // модель элемента навигации
    "views/table",              // представление таблицы для коллекций
    "views/statistics"          // представление статистики

], function(template, AppViewNavigateModel, TableView, StatiscticsView) {

    // ссылка на используемое приложение
    var app = null;

    // навигация по приложению
    var navi = new AppViewNavigateModel();

    return Backbone.View.extend({
        el: "#bauto_app",
        template: _.template(template),

        initialize: function(_app) {
            var self = this;
            app = _app;
            this.childs = {};
            // события коллекций
            app.collections.catalog.on("setFavorite", this.setFavorite, this);
            app.collections.favorites.on("resetFavorite", this.resetFavorite, this);
            // роутинг
            app.router.on("route:openCatalog", function(brand) {
                self.openInsetByName("catalog");
                self.openBrandByName(brand);
            });
            app.router.on("route:openFavorites", function(brand) {
                self.openInsetByName("favorites");
                self.openBrandByName(brand);
            });
            app.router.on("route:openStatistics", function() {
                self.openInsetByName("statistics");
            });
            // навигация
            navi.on("changeUrl", app.router.navigate);
        },

        render: function() {
            // рендеринг каркаса
            this.$el.html(this.template({
                filters: app._meta.brands
            }));
            // сохранить ссылки на используемые элементы
            this.$insets = this.$el.find("#navigate .inset");
            this.$subpages = this.$el.find("#content .subpage");
            this.$brands = this.$el.find("#filter_brand .tab");
            // таблицы автомобилей и избранного как дочерние представления
            this.childs.catalog = new TableView.Catalog({
                collection: app.collections.catalog,
                el: "#table_catalog"
            }).render();
            this.childs.favorites = new TableView.Favorites({
                collection: app.collections.favorites,
                el: "#table_favorites"
            }).render();
            // статистика как дочернее представление
            this.childs.statistics = new StatiscticsView({
                model: app.store,
                id: "statistics_container"
            });
            $("#subpage_sta").append(this.childs.statistics.render().el);
            return this;
        },

        /**
         * Добавление автомобиля в избранное
         * @param  {Model} model модель автомобиля
         */
        setFavorite: function(model) {
            app.store.setFavorite(model);
            // добавление в начало коллекции
            app.collections.favorites.add(model, { at: 0 });
        },

        /**
         * Удаление автомобиля из списка избранных
         * @param  {Model} model модель удаляемого автомобиля
         */
        resetFavorite: function(model) {
            app.store.resetFavorite(model);
            app.collections.favorites.remove(model);
        },

        // собственные события представления
        events: {
            "click #navigate .inset:not(.selected)": "openInsetByClick",
            "click #filter_brand .tab:not(.selected)": "openBrandByClick"
        },

        /**
         * Открыть вкладку
         * @param  {jQuery} $tab элемент таба
         */
        openInset: function($tab) {
            var subpageid = $tab.attr("data-subpageid"),
                spp_class = $tab.attr("data-partcl");
            // обработка таба
            this.$insets.toggleClass("selected", false);
            $tab.toggleClass("selected", true);
            // открыть нужную страницу по id
            var $subpage = this.$subpages.filter(function() {
                var $this = $(this),
                    isPage = $this.attr("id") === subpageid;
                $this.toggle(isPage);
                return isPage;
            });
            // дополнительно открыть элементы страницы по классу
            if (typeof spp_class !== "undefined") {
                $subpage.find(".subpage_part").each(function() {
                    var $this = $(this);
                    $this.toggle($this.hasClass(spp_class));
                });
            }
            navi.set("subpage", $tab.attr("name"));
        },

        /**
         * Выбрать брэнд
         * @param  {jQuery} $tab элемент таба
         */
        openBrand: function($tab) {
            var brand = $tab.attr("data-brand");
            // обработка таба
            this.$brands.toggleClass("selected", false);
            $tab.toggleClass("selected", true);
            // сигнал о смене брэнда для коллекций
            app.collections.catalog.meta("brand", brand);
            app.collections.favorites.meta("brand", brand);
            navi.set("brand", brand);
        },

        /**
         * Открытие вкладки по клику на табе
         * @param  {Event} e событие клика
         */
        openInsetByClick: function(e) {
            e.preventDefault();
            this.openInset($(e.currentTarget));
        },

        /**
         * Использовать фильтр по бренду для коллекций
         * @param  {Event} e событие клика
         */
        openBrandByClick: function(e) {
            e.preventDefault();
            this.openBrand($(e.currentTarget));
        },

        /**
         * Открыть вкладку по имени
         * @param  {string} name название вкладки
         */
        openInsetByName: function(name) {
            var $inset = this.$insets.filter("[name='" + name + "']");
            if ($inset.length) this.openInset($inset);
            else console.error("Undefined inset with name '" + name + "'!");
        },

        /**
         * Открыть брэнд по имени
         * @param  {string} name название брэнда
         */
        openBrandByName: function(name) {
            var $brand = this.$brands.filter("[data-brand='" + name + "']");
            // если брэнд не существует, то показать все
            if (!$brand.length) {
                $brand = this.$brands.filter("[data-brand='_all']");
                //console.error("Undefined brand with name '" + name + "'!");
            }
            this.openBrand($brand);
        }
    });
});
