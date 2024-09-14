$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        margin: 35,
        items: 2,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,

        responsive : {
            850: {
                items: 3,
            },
        },
    });
 });
