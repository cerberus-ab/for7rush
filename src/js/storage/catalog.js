/**
 * @module Каталог автомобилей
 *
 * @arrayof
 * @param  {integer} cid идентификатор
 * @param  {string} name название автомобиля
 * @param  {string} brand брэнд
 * @param  {string|null} desc описание автомобиля
 * @param  {string} img путь к изображению
 * @param  {string|null} img_preview путь к превью изображения
 *
 */
define(function() {
    var img_root = "img/cars/full/",
        img_preview_root = "img/cars/preview/";

    return [
        { cid: 1,
            name: "XC70",
            brand: "volvo",
            desc: "Способный на многое роскошный универсал для тех, кто любит приключения с ноткой изящества.",
            img: img_root + "volvo_xc70.jpg",
            img_preview: img_preview_root + "volvo_xc70.jpg"
        },
        { cid: 2,
            name: "Lancer",
            brand: "mitsubishi",
            desc: "Mitsubishi Lancer X с первых секунд оказывается в центре внимания. Его выразительный и слегка агрессивный дизайн, спортивный дух и впечатляющая динамика заставляют провожать взглядом и следить за каждым движением этого необычного седана. Под стильным и исключительно прочным капотом притаился мощный двигатель, а надежная конструкция и идеально выверенная подвеска позволяют добиться невозможного.",
            img: img_root + "mitsubishi_lancer.jpg",
            img_preview: null
        },
        { cid: 3,
            name: "Juke",
            brand: "nissan",
            desc: null,
            img: img_root + "nissan_juke.jpg",
            img_preview: null
        },
        { cid: 4,
            name: "XC60",
            brand: "volvo",
            desc: "Идеальный автомобиль для требовательных водителей в поисках приключений — в городе и за его пределами.",
            img: img_root + "volvo_xc60.jpg",
            img_preview: null
        },
        { cid: 5,
            name: "S60",
            brand: "volvo",
            desc: "Способный на многое роскошный универсал для тех, кто любит приключения с ноткой изящества.",
            img: img_root + "volvo_s60.jpg",
            img_preview: null
        },
        { cid: 6,
            name: "Tiida",
            brand: "nissan",
            desc: null,
            img: img_root + "nissan_tiida.jpg",
            img_preview: null
        },
        { cid: 7,
            name: "Focus",
            brand: "ford",
            desc: "Новый Focus обладает поистине стильным и выразительным дизайном. Скульптурные линии кузова в сочетании с узнаваемой новой решеткой Ford придают автомобилю вид настоящего хозяина дорог.",
            img: img_root + "ford_focus.jpg",
            img_preview: null
        },
        { cid: 8,
            name: "L200",
            brand: "mitsubishi",
            desc: "Mitsubishi L200 интересен при рассмотрении под любым углом. Практичный и неприхотливый дизельный двигатель, просторный, комфортабельный салон и яркий, стильный дизайн. Высокое качество и надежность культового пикапа преумножалось с каждым годом, поэтому последняя модель Mitsubishi L 200 – это практически безупречный автомобиль во всех отношениях.",
            img: img_root + "mitsubishi_l200.jpg",
            img_preview: null
        },
        { cid: 9,
            name: "XC90",
            brand: "volvo",
            desc: "Гармоничный дизайн, чистая и лаконичная роскошь — и самые современные функции безопасности и комфорта для всех пассажиров.",
            img: img_root + "volvo_xc90.jpg",
            img_preview: img_preview_root + "volvo_xc90.jpg"
        },
        { cid: 10,
            name: "Fiesta",
            brand: "ford",
            desc: "Новый Ford Fiesta сочетает продуманный стиль и передовые технологии. Все функции автомобиля спроектированы так, чтобы Вы могли получать максимум положительных эмоций каждый день.",
            img: img_root + "ford_fiesta.jpg",
            img_preview: null
        },
        { cid: 11,
            name: "S80",
            brand: "volvo",
            desc: "Компактный хэтчбэк с мужественным дизайном и увеличенным дорожным просветом. Создан для спонтанных приключений.",
            img: img_root + "volvo_s80.jpg",
            img_preview: null
        },
        { cid: 12,
            name: "Ecosport",
            brand: "ford",
            desc: "Новый Ford EcoSport – компактный, функциональный и экономичный автомобиль с мультимедийной системой SYNC, управляющей функциями автомобиля при помощи голосовых команд.",
            img: img_root + "ford_ecosport.jpg",
            img_preview: null
        },
        { cid: 13,
            name: "Explorer",
            brand: "ford",
            desc: "Легендарный внедорожник, сочетающий премиальный европейский стиль и уникальную американскую харизму – современное воплощение мощности и высокой технологичности.",
            img: img_root + "ford_explorer.jpg",
            img_preview: null
        },
        { cid: 14,
            name: "ASX",
            brand: "mitsubishi",
            desc: "Mitsubishi ASX - это автомобиль, созданный под Ваш стиль жизни. Привлекательный и энергичный, он всегда на одной волне с Вами. Инновационные технические решения приятно удивляют и позволяют идти в ногу со временем. Просторный салон и стильный интерьер соответствуют потребностям современного успешного человека.",
            img: img_root + "mitsubishi_asx.jpg",
            img_preview: null
        },
        { cid: 15,
            name: "Teana",
            brand: "nissan",
            desc: null,
            img: img_root + "nissan_teana.jpg",
            img_preview: null
        },
        { cid: 16,
            name: "Mondeo",
            brand: "ford",
            desc: "Оснащенный интеллектуальными технологиями, изысканный, потрясающий: автомобиль, созданный для того, чтобы Вы получили незабываемые впечатления от вождения.",
            img: img_root + "ford_mondeo.jpg",
            img_preview: null
        },
        { cid: 17,
            name: "Outlander",
            brand: "mitsubishi",
            desc: "Обновленный Mitsubishi Outlander 2016 года - это первый серийный автомобиль Mitsubishi, в котором воплощена новая концепция дизайна бренда. Модель Outlander 2016 года является не просто обновленной версией модели текущего поколения. Она включает в себя невероятное количество конструктивных и дизайнерских усовершенствований, призванных повысить уровень утонченности и общего удовольствия от вождения.",
            img: img_root + "mitsubishi_outlander.jpg",
            img_preview: null
        },
        { cid: 18,
            name: "Pajero",
            brand: "mitsubishi",
            desc: "Более 70 лет компания Mitsubishi посвятила тому, чтобы разрабатывать и внедрять самые передовые технологии в области полноприводных автомобилей. Первая модель – PX33 – вышла еще в 1934 году. С тех пор внедряемые нами технологии непрерывно развивались и совершенствовались. Сегодня самым впечатляющим их воплощением является известная каждому автолюбителю трансмиссия Super Select 4WD.",
            img: img_root + "mitsubishi_pajero.jpg",
            img_preview: null
        },
        { cid: 19,
            name: "Almera",
            brand: "nissan",
            desc: null,
            img: img_root + "nissan_almera.jpg",
            img_preview: null
        },
        { cid: 20,
            name: "Senta",
            brand: "nissan",
            desc: null,
            img: img_root + "nissan_senta.jpg",
            img_preview: null
        }
    ];
});
