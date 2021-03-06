/**
 * @module Список брэндов
 *
 * @arrayof
 * @param  {integer} bid идентификатор
 * @param  {string} value название брэнда (используется)
 * @param  {string} label название брэнда (отображается)
 *
 */
define(function() {
    return [
        { bid: 1,
            value: "volvo",
            label: "Volvo" },
        { bid: 2,
            value: "ford",
            label: "Ford" },
        { bid: 3,
            value: "mitsubishi",
            label: "Mitsubishi" },
        { bid: 4,
            value: "nissan",
            label: "Nissan" }
    ];
});
