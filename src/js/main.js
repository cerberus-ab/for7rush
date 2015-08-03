/**
 * @module Главный файл приложения
 *
 * @description
 * Создает экземпляр приложения.
 *
 */
define([
    "app"   // класс приложения

], function(App) {
    window.bAuto = new App;

    $(document).ready(function() {
        Backbone.history.start({ root: "/" });
    });
});
