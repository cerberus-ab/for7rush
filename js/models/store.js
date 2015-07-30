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

        initialize: function(options) {
            this.data = storage.load(options.brands);
        },

        /**
         * Выбор автомобиля
         * @param  {Model} model модель автомобиля
         */
        setFavorite: function(model) {
            var cid = model.get("cid"),
                brand = model.get("brand");
            if (this.data.choiced.indexOf(cid) < 0) {
                this.data.choiced.push(cid);
                typeof this.data.statistics[brand] !== "undefined"
                    ? this.data.statistics[brand]++
                    : this.data.statistics[brand] = 1;
                storage.save(this.data);
            };
        },

        /**
         * Отмена выбора автомобиля
         * @param  {Model} model модель автомобиля
         */
        resetFavorite: function(model) {
            var index = this.data.choiced.indexOf(model.get("cid"));
            if (index +1) {
                this.data.choiced.splice(index, 1);
                storage.save(this.data);
            };
        }
    });
});
