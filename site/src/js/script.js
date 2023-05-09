// Галерея

$('[data-fancybox]:not(.slick-cloned)').fancybox();

$('.gallery').slick({
    slidesToShow: 4 || 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 1350,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 1050,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 630,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
});

// маска для телефона

$('.phone').mask('+7(999) 999 99-99');
