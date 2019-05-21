$(document).ready(function() {
    // dropdown menu
    $('.menu .dropdown').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var thi = $(this);
        thi.siblings('.submenu').slideToggle(400);
        setTimeout(function() {
            thi.toggleClass('active');
        }, 400);
        thi.parent().siblings().find('.submenu').slideUp(400);
        setTimeout(function() {
            thi.parent().siblings().children('.dropdown').removeClass('active');
        }, 400);
    });
    $('html').click(function(event) {
        $('.submenu').slideUp(400);
        setTimeout(function() {
            $('.dropdown').removeClass('active');
        }, 400);
    });

    // swiper
    var mySwiper = new Swiper('.banner', {
        speed: 500,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        
    });

    // lightbox
    lightbox.option({
        showImageNumberLabel: false,
        positionFromTop: 100,
    })
    $('.course>ul>li a').click(function(event) {
        /* Act on the event */
        $(this).children('h2, p');
    });

    // top
    $('.top').click(function(event) {
        event.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, 500);
    });
});