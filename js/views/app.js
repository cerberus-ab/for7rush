define([
    "text!templates/app.html",
    "views/table",
    "views/statistics"

], function(template, TableView, StatiscticsView) {

    return Backbone.View.extend({
        el: "#bauto_app",
        template: _.template(template),

        initialize: function(options) {
            this.childs = {};
            this.options.collections.catalog.on("setFavorite", this.setFavorite, this);
            this.options.collections.favorites.on("resetFavorite", this.resetFavorite, this);
        },

        render: function() {
            // рендеринг каркаса
            this.$el.html(this.template({
                filters: this.options._meta.brands
            }));
            // сохранить ссылки на используемые элементы
            this.$insets = this.$el.find("#navigate .inset");
            this.$subpages = this.$el.find("#content .subpage");
            this.$fbrand = this.$el.find("#filter_brand");
            this.$brands = this.$fbrand.find(".tab");
            // таблицы автомобилей и избранного как дочерние представления
            this.childs.catalog = new TableView.Catalog({
                collection: this.options.collections.catalog,
                el: "#table_catalog"
            }).render();
            this.childs.favorites = new TableView.Favorites({
                collection: this.options.collections.favorites,
                el: "#table_favorites"
            }).render();
            // статистика как дочернее представление
            this.childs.statistics = new StatiscticsView({
                model: this.options.store,
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
            this.options.store.setFavorite(model);
            this.options.collections.favorites.add(model, { at: 0 });
        },

        /**
         * Удаление автомобиля из списка избранных
         * @param  {Model} model модель удаляемого автомобиля
         */
        resetFavorite: function(model) {
            this.options.store.resetFavorite(model);
            this.options.collections.favorites.remove(model);
        },

        // собственные события представления
        events: {
            "click #navigate .inset:not(.selected)": "openInsetByClick",
            "click #filter_brand .tab:not(.selected)": "openBrandByClick"
        },

        saveNavigate: function() {
            var brand = this.$brands.filter(".selected").attr("data-brand"),
                fragment = this.$insets.filter(".selected").attr("name")
                    + (this.$fbrand.is(":visible") && brand !== "_all"
                        ? ("/" + brand) : "");
            bAuto.router.navigate(fragment);
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
            this.saveNavigate();
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
            this.options.collections.catalog.meta("brand", brand);
            this.options.collections.favorites.meta("brand", brand);
            this.saveNavigate();
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
            if ($inset.length) $inset.click();
            else console.error("Undefined inset with name '" + name + "'!");
        },

        /**
         * Открыть брэнд по названию
         * @param  {string} brand название брэнда
         */
        openBrandByName: function(name) {
            var $brand = this.$brands.filter("[data-brand='" + name + "']");
            if (!$brand.length) $brand = this.$brands.filter("[data-brand='_all']");
            $brand.click();
        }
    });
});
