
// Галерея
import $ from 'jquery';
import 'slick-carousel/slick/slick';
import 'jquery.maskedinput/src/jquery.maskedinput';


$('.gallery').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});

$(".phone").mask("+7(999) 999 99-99");