define([
    "text!templates/table.html",
    "views/car"

], function(template, CarView) {

    var tooltip_timer = null,
        tooltip_hidden = true;

    // Абстрактный класс представления таблицы
    var TableView = Backbone.View.extend({
        template: _.template(template),

        initialize: function() {
            this.collection.on("add", this.addCar, this);
            this.collection.on("remove", this.removeCar, this);
            this.collection.on("meta", this.metaChanged, this);
        },

        render: function() {
            this.$el.html(this.template());
            this.$tbody = this.$el.find("tbody");
            this.$amount = this.$el.find(".table_amount");
            this.renderFiltered(this.collection.meta("brand"));
            return this;
        },

        /**
         * Рендеринг коллекции с учетом фильтра по бренду
         * @param  {string} brand используемый бренд
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

        events: {
            "mouseover .td_image": "imageShow",
            "mouseleave .td_image": "imageHide"
        },

        imageShow: function(e) {
            e.preventDefault();
            tooltip_timer = setTimeout(function() {
                tooltip_hidden = false;
                $(e.currentTarget).parent().find(".td_image_tt").fadeTo(200, 1);
            }, 500);
        },

        imageHide: function(e) {
            e.preventDefault();
            clearTimeout(tooltip_timer);
            if (!tooltip_hidden) {
                tooltip_hidden = true;
                $(e.currentTarget).parent().find(".td_image_tt").fadeTo(200, 0);
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
        },

        /**
         * Добавить представление нового автомобиля
         * @param  {Model} model модель автомобиля
         */
        addCar: function(model) {
            var brand = this.collection.meta("brand");
            if (brand === "_all" || model.get("brand") === brand) {
                this.$tbody.append(this.getRenderModelEl(model));
                this.$amount.text(this.$amount.text() -0 +1);
            }
        },

        /**
         * Удаление представления автомобиля из коллекции
         * @param  {Model} model модель автомобиля
         */
        removeCar: function(model) {
            this.render();
        }
    });

    // Класс представления каталога автомобилей
    var CatalogView = TableView.extend({
        getRenderModelEl: function(model) {
            return new CarView.Basic({ model: model }).render().el;
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
