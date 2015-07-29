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
                choiced: [2,3],
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
         * @param  {CarModel} car модель автомобиля
         */
        choiceCar: function(car) {
            if (this.data.indexOf(car.cid) <0) {
                this.data.push(car.cid);
                typeof this.data.statistics[car.brand] !== "undefined"
                    ? this.data.statistics[car.brand]++
                    : this.data.statistics[car.brand] = 1;
                storage.save(this.data);
            };
        },

        /**
         * Отмена выбора автомобиля
         * @param  {CarModel} car модель автомобиля
         */
        cancelCar: function(car) {
            var index = this.data.indexOf(car.cid);
            if (index +1) {
                this.data.choiced.splice(index, 1);
            };
        }
    });
});
