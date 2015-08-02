define(function() {

    var storage = function() {
        /** @type {String} используемая переменная */
        var use_name = "bAutoLS";

        /**
         * Инициализация данных по умолчанию
         * @param  {array} brands доступные бренды
         * @return {object} данные как объект (по умолчанию)
         */
        function getDefault(brands) {
            var statistics = {};
            brands.forEach(function(currentBrand) {
                statistics[currentBrand.value] = 0;
            });
            return {
                /** @type {array} массив идентификаторов выбранных авто */
                choiced: [],
                /** @type {object} статистика по брендам */
                statistics: statistics
            };
        }

        return {
            /**
             * Загрузить данные из локального хранилища
             * @param  {array} brands доступные бренды
             * @return {object} данные как объект
             */
            load: function(brands) {
                var data = localStorage.getItem(use_name);
                return data !== null ? JSON.parse(data) : getDefault(brands);
            },
            /**
             * Сохранить дынные в локальное хранилище
             * @param  {object} data данные как объект
             */
            save: function(data) {
                localStorage.setItem(use_name, JSON.stringify(data));
            }
        }
    }();

    return Backbone.Model.extend({

        initialize: function(attributes) {
            // attributes.brands - используемые брэнды
            var data = storage.load(attributes.brands);
            this.set("choiced", data.choiced);
            this.set("statistics", data.statistics);
        },

        save: function() {
            storage.save({
                choiced: this.get("choiced"),
                statistics: this.get("statistics")
            });
        },

        /**
         * Выбор автомобиля
         * @param  {Model} model модель автомобиля
         */
        setFavorite: function(model) {
            var cid = model.get("cid"),
                brand = model.get("brand"),
                choiced = this.get("choiced"),
                statistics = this.get("statistics");

            if (choiced.indexOf(cid) < 0) {
                choiced.unshift(cid);
                statistics[brand]++;

                this.set("choiced", choiced);
                this.set("statistics", statistics);
                this.trigger("changeStat");

                this.save();
            };
        },

        /**
         * Отмена выбора автомобиля
         * @param  {Model} model модель автомобиля
         */
        resetFavorite: function(model) {
            var choiced = this.get("choiced"),
                index = choiced.indexOf(model.get("cid"));

            if (index +1) {
                choiced.splice(index, 1);

                this.set("choiced", choiced);
                this.save();
            };
        }
    });
});
