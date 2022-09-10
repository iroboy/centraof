$(document).ready(function(){
    $(".owl-carousel").owlCarousel({

        loop: true,
        center: true,
        mouseDrag: false,
        items: 3,
        margin: 40,
        
        
    });
    let owl = $('.owl-carousel');
    owl.owlCarousel();
    // Go to the next item
    $('.next--btn').click(function() {
        owl.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.prev--btn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [300]);
    })
  });


const videoBtn = document.querySelector('.video-btn')
const videoPicture = document.querySelector('.video-img')
const video = document.querySelector('.video-source')
const videoContent = document.querySelector('.video-video-content')

videoContent.addEventListener('click', function(){

    if (video.paused) {
        videoPicture.classList.add('none');
        videoBtn.classList.add('none');
        video.play();
    }
    else {
        video.pause();
        video.classList.toggle('none')
        videoPicture.classList.toggle('none');
        videoBtn.classList.toggle('none');

    }
});
