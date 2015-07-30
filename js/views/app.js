define([
    "text!templates/app.html",
    "views/table"

], function(template, TableView) {

    return Backbone.View.extend({
        el: "#bauto_app",
        template: _.template(template),

        initialize: function(options) {
            this.app = options.app;
            this.childs = {};
            // срабатывание события toggle в моделях каталога - добавление в избранное
            this.app.collections.catalog.on("toggle", this.choicedCar, this);
            // срабатывание события toggle в моделях списка избранных - удаление из списка
            this.app.collections.favorites.on("toggle", this.canceledCar, this);
        },

        render: function() {
            // рендеринг каркаса
            this.$el.html(this.template({
                filters: this.app.meta.brands
            }));
            this.$insets = this.$el.find("#navigate .inset");
            this.$subpages = this.$el.find("#content .subpage");
            this.$coltables = this.$el.find("#subpage_col .table_container");
            this.$filters = this.$el.find("#filter_brand .tab");
            // таблицы автомобилей и избранного как дочерние представления
            this.childs.catalog = new TableView.Catalog({
                collection: this.app.collections.catalog,
                el: "#table_catalog"
            }).render();
            this.childs.favorites = new TableView.Favorites({
                collection: this.app.collections.favorites,
                el: "#table_favorites"
            }).render();

            // статистика как дочернее представление

            return this;
        },

        /**
         * Добавление автомобиля в избранное
         * @param  {Model} model модель автомобиля
         */
        choicedCar: function(model) {
            console.log(model.toJSON());
            this.app.collections.favorites.add(model);
        },

        /**
         * Удаление автомобиля из списка избранных
         * @param  {Model} model модель удаляемого автомобиля
         */
        canceledCar: function(model) {
            console.log(model.toJSON());
        },

        events: {
            "click #navigate .inset:not(.selected)": "openInset",
            "click #filter_brand .tab:not(.selected)": "useFilter"
        },

        /**
         * Открытие вкладки по клику в строке навигации
         * @param  {Event} e событие клика
         */
        openInset: function(e) {
            e.preventDefault();
            // получить элемент, id страницы и id таблицы (если нужно)
            var $inset = $(e.currentTarget),
                subpageid = $inset.attr("data-subpageid"),
                tableid = $inset.attr("data-tableid");
            // обработка вкладки в строке навигации
            this.$insets.toggleClass("selected", false);
            $inset.toggleClass("selected", true);
            // открытие страницы
            this.$subpages.each(function() {
                var $subpage = $(this);
                $subpage.toggle($subpage.attr("id") === subpageid);
            });
            // дополнительная обработка (нужная таблица каталога)
            if (typeof tableid !== "undefined") {
                this.$coltables.each(function() {
                    var $coltable = $(this);
                    $coltable.toggle($coltable.attr("id") === tableid);
                });
            }
        },

        /**
         * Использовать фильтр по бренду для коллекций
         * @param  {Event} e событие клика
         */
        useFilter: function(e) {
            e.preventDefault();
            // получить элемент и название фильтра
            var $filter = $(e.currentTarget),
                brand = $filter.attr("data-filter");
            // обработка списка фильтров
            this.$filters.toggleClass("selected", false);
            $filter.toggleClass("selected", true);
            // рендеринг коллекций
            this.app.collections.catalog.meta("brand", brand);
            this.app.collections.favorites.meta("brand", brand);
        }
    });
});
