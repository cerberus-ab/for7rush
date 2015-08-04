describe("Browser Env", function() {

    it("LocalStorage Support", function() {
        assert(window.localStorage);
    });

    it("jQuery & Highcharts avaliabe", function() {
        assert(window.jQuery);
        assert(window.jQuery.fn.highcharts);
    });

    it("Backbone avaliabe", function() {
        assert(window.Backbone);
    });

});

describe("Application Common", function() {

    describe("Экземпляр приложения", function() {

        it("определен глобально", function() {
            assert(window.bAuto);
        });

        it("является синглтоном", function() {
            assert.equal(bAuto, new bAuto.__proto__.constructor);
        });

    });

    describe("Компоненты экземпляра приложения", function() {

        it("представление экземпляра приложения", function() {
            assert(bAuto.views.app);
            assert.isFunction(bAuto.views.app.render);
        });

        it("коллекция автомобилей", function() {
            assert(bAuto.collections.catalog);
            assert.property(bAuto.collections.catalog, "length");
        });

        it("коллекция выбранных автомобилей", function() {
            assert(bAuto.collections.favorites);
            assert.property(bAuto.collections.favorites, "length");
        });

        it("роутер", function() {
            assert(bAuto.router);
        });

        it("управление локальными данными", function() {
            assert(bAuto.store);
        });

        it("метаинформация о приложении", function() {
            assert(bAuto._meta);
            assert.typeOf(bAuto._meta, "object");
        });

    });

});

describe("App View", function() {

    it("имеет ссылку на используемый экземпляр приложения", function() {
        assert.equal(bAuto.views.app._app, bAuto);
    });

    describe("Компоненты представления", function() {

        describe("Дочерние представления", function() {

            it("представление коллекции автомобилей", function() {
                assert(bAuto.views.app.childs.catalog);
                assert.isFunction(bAuto.views.app.childs.catalog.render);
                assert.equal(bAuto.views.app.childs.catalog.collection, bAuto.collections.catalog);
            });

            it("представление коллекции выбранных автомобилей", function() {
                assert(bAuto.views.app.childs.favorites);
                assert.isFunction(bAuto.views.app.childs.favorites.render);
                assert.equal(bAuto.views.app.childs.favorites.collection, bAuto.collections.favorites);
            });

            it("представление статистики (использует модель хранилища)", function() {
                assert(bAuto.views.app.childs.statistics);
                assert.equal(bAuto.views.app.childs.statistics.model, bAuto.store)
                assert.isFunction(bAuto.views.app.childs.statistics.render);
            });

        });

        describe("Навигация по представлению", function() {

            it("элемент определен", function() {
                assert(bAuto.views.app._navi);
            });

            it("имеет метод формирования url", function() {
                assert.typeOf(bAuto.views.app._navi.attributes._url, "string");
                assert.isFunction(bAuto.views.app._navi.__proto__.makeUrl);
            });

            it("публикует событие об изменении url", function() {
                assert(bAuto.views.app._navi._events["change:_url"].length);
            });

        });

    });

    describe("Методы представления", function() {

        it("добавление автомобиля в список выбранных", function() {
            assert.isFunction(bAuto.views.app.__proto__.setFavorite);
        });

        it("удаление автомобиля из списка выбранных", function() {
            assert.isFunction(bAuto.views.app.__proto__.resetFavorite);
        });

        it("выбор вкладки", function() {
            assert(bAuto.views.app.$insets);
            assert(bAuto.views.app.$subpages);
            assert.isFunction(bAuto.views.app.__proto__.openInset);
            assert.isFunction(bAuto.views.app.__proto__.openInsetByClick);
            assert.isFunction(bAuto.views.app.__proto__.openInsetByName);
        });

        it("выбор брэнда", function() {
            assert(bAuto.views.app.$brands);
            assert.isFunction(bAuto.views.app.__proto__.openBrand);
            assert.isFunction(bAuto.views.app.__proto__.openBrandByClick);
            assert.isFunction(bAuto.views.app.__proto__.openBrandByName);
        });

    });

});

describe("Cars Collections", function() {

    it("знают об используемом брэнде (как фильтр)", function() {
        assert.typeOf(bAuto.collections.catalog._meta.brand, "string");
        assert.typeOf(bAuto.collections.favorites._meta.brand, "string");
    });

    it("имеют метод изменения своей метаинформации", function() {
        assert.isFunction(bAuto.collections.catalog.__proto__.meta);
        assert.isFunction(bAuto.collections.favorites.__proto__.meta);
    });

    it("публикуют события о добавлении/удалении элемента и изменении метаинформации", function() {
        assert(bAuto.collections.catalog._events.add.length);
        assert(bAuto.collections.catalog._events.remove.length);
        assert(bAuto.collections.catalog._events.meta.length);
        assert(bAuto.collections.favorites._events.add.length);
        assert(bAuto.collections.favorites._events.remove.length);
        assert(bAuto.collections.favorites._events.meta.length);
    });

    describe("Представление коллекций", function() {

        it("имеет метод рендеринга (делегат) с фильтром по брэнду", function() {
            assert.isFunction(bAuto.views.app.childs.catalog.__proto__.renderFiltered);
            assert.isFunction(bAuto.views.app.childs.favorites.__proto__.renderFiltered);
        });

        it("имеет метод обработки изменений метаинформации", function() {
            assert.isFunction(bAuto.views.app.childs.catalog.__proto__.metaChanged);
            assert.isFunction(bAuto.views.app.childs.favorites.__proto__.metaChanged);
        });

    });

    describe("Коллекция автомобилей", function() {

        it("имеет хотя бы одну модель", function() {
            assert(bAuto.collections.catalog.length);
        });

        it("публикует событие о выборе автомобиля", function() {
            assert(bAuto.collections.catalog._events.setFavorite.length);
        });

    });

    describe("Коллекция выбранных автомобилей", function() {

        it("публикует событие об исключении автомобиля", function() {
            assert(bAuto.collections.favorites._events.resetFavorite.length);
        });

    });

});

describe("Router", function() {

    var routes = [
        ["определен пустой роут", ""],
        ["определен роут перехода в список автомобилей с указанием брэнда", "catalog(/:brand)"],
        ["определен роут перехода в список выбранных автомобилей с указанием брэнда", "favorites(/:brand)"],
        ["определен роут перехода на страницу статистики", "statistics"]
    ];

    routes.forEach(function(currentRoute, index) {

        it(currentRoute[0] + " | " + currentRoute[1], function() {
            var route_to = bAuto.router.routes[currentRoute[1]],
                events = bAuto.router._events["route:" + route_to];

            assert(route_to, "Undefined route");
            assert(events.length, "Undefined events for this route");
        });

    });

});

describe("Storage", function() {

    it("знает о доступных брэндах", function() {
        assert(bAuto.store.attributes.brands);
        assert.isArray(bAuto.store.attributes.brands);
    });

    it("хранит информацию о выбранных пользователем автомобилях", function() {
        assert(bAuto.store.attributes.choiced);
        assert.isArray(bAuto.store.attributes.choiced);
    });

    it("хранит пользовательскую статистику по брэндам", function() {
        assert(bAuto.store.attributes.statistics);
        assert.typeOf(bAuto.store.attributes.statistics, "object");
    });

    it("имеет метод добавления автомобиля в список выбранных", function() {
        assert.isFunction(bAuto.store.__proto__.setFavorite);
    });

    it("имеет метод удаления автомобиля из списка выбранных", function() {
        assert.isFunction(bAuto.store.__proto__.resetFavorite);
    });

    it("имеет метод сохранения данных на клиенте", function() {
        assert.typeOf(bAuto.store._storage, "object");
        assert.isFunction(bAuto.store.__proto__.save);
    });

    it("публикует событие об изменении касающихся статистики данных", function() {
        assert(bAuto.store._events.changeStat.length);
    });

});
